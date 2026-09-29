<?php

declare(strict_types=1);

namespace Kaltbrunn\Contact;

if (!defined(__NAMESPACE__ . '\\INTERNAL_REQUEST')) {
    http_response_code(404);
    exit;
}

const ALLOWED_ORIGINS = [
    'https://ing-kaltbrunn.de',
    'https://www.ing-kaltbrunn.de',
];
const CHALLENGE_MINIMUM_AGE = 2;
const CHALLENGE_MAXIMUM_AGE = 7200;
const MAXIMUM_REQUEST_BYTES = 16384;
const ATTEMPT_RATE_LIMIT_REQUESTS = 20;
const SUBMISSION_RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 600;
const STORAGE_DIRECTORY_NAME = 'ing-kaltbrunn-contact-v1';
const NAME_MINIMUM_LENGTH = 2;
const NAME_MAXIMUM_LENGTH = 120;
const PHONE_MINIMUM_LENGTH = 6;
const PHONE_MAXIMUM_LENGTH = 60;
const EMAIL_MINIMUM_LENGTH = 3;
const EMAIL_MAXIMUM_LENGTH = 190;
const VEHICLE_MINIMUM_LENGTH = 1;
const VEHICLE_MAXIMUM_LENGTH = 160;
const MESSAGE_MINIMUM_LENGTH = 10;
const MESSAGE_MAXIMUM_LENGTH = 5000;

function send_security_headers(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store, max-age=0');
    header('Pragma: no-cache');
    header('Vary: Origin, Sec-Fetch-Site');
}

function respond(int $status, string $message, array $additional = []): never
{
    http_response_code($status);
    $payload = array_merge(['message' => $message], $additional);
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $json === false ? '{"message":"Die Anfrage konnte nicht verarbeitet werden."}' : $json;
    exit;
}

function require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $method) {
        header('Allow: ' . $method);
        respond(405, 'Diese Anfrage wird nicht unterstützt.');
    }
}

function require_same_origin_request(): void
{
    $fetchSite = strtolower(trim((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '')));
    if ($fetchSite === 'cross-site') {
        respond(403, 'Die Anfrage konnte nicht verifiziert werden.');
    }

    if (($_SERVER['HTTP_X_CONTACT_FORM'] ?? '') !== '1') {
        respond(403, 'Die Anfrage konnte nicht verifiziert werden.');
    }

    $sourceOrigin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));

    if ($sourceOrigin === '') {
        $referer = trim((string) ($_SERVER['HTTP_REFERER'] ?? ''));
        if ($referer !== '') {
            $parts = parse_url($referer);
            if (is_array($parts) && isset($parts['scheme'], $parts['host'])) {
                $sourceOrigin = strtolower($parts['scheme']) . '://' . strtolower($parts['host']);
                if (isset($parts['port'])) {
                    $sourceOrigin .= ':' . (int) $parts['port'];
                }
            }
        }
    }

    $sourceOrigin = rtrim(strtolower($sourceOrigin), '/');
    if ($sourceOrigin === '' || !in_array($sourceOrigin, ALLOWED_ORIGINS, true)) {
        respond(403, 'Die Anfrage konnte nicht verifiziert werden.');
    }
}

function storage_directory(): string
{
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . STORAGE_DIRECTORY_NAME;

    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        error_log('Kontaktformular: Temporärer Schutzspeicher ist nicht verfügbar.');
        respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
    }

    @chmod($directory, 0700);
    return $directory;
}

function application_secret(): string
{
    $path = storage_directory() . DIRECTORY_SEPARATOR . '.key';
    $handle = @fopen($path, 'c+b');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        error_log('Kontaktformular: Schutzschlüssel konnte nicht geöffnet werden.');
        respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
    }

    rewind($handle);
    $secret = stream_get_contents($handle);

    if (!is_string($secret) || strlen($secret) < 32) {
        try {
            $secret = random_bytes(32);
        } catch (\Throwable) {
            flock($handle, LOCK_UN);
            fclose($handle);
            error_log('Kontaktformular: Schutzschlüssel konnte nicht erzeugt werden.');
            respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
        }

        ftruncate($handle, 0);
        rewind($handle);
        if (fwrite($handle, $secret) !== strlen($secret)) {
            flock($handle, LOCK_UN);
            fclose($handle);
            error_log('Kontaktformular: Schutzschlüssel konnte nicht gespeichert werden.');
            respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
        }
        fflush($handle);
        @chmod($path, 0600);
    }

    flock($handle, LOCK_UN);
    fclose($handle);
    return $secret;
}

function base64url_encode(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64url_decode(string $value): string|false
{
    if (!preg_match('/^[A-Za-z0-9_-]+$/D', $value)) {
        return false;
    }

    $padding = strlen($value) % 4;
    if ($padding !== 0) {
        $value .= str_repeat('=', 4 - $padding);
    }

    return base64_decode(strtr($value, '-_', '+/'), true);
}

function create_challenge(): string
{
    try {
        $nonce = bin2hex(random_bytes(12));
    } catch (\Throwable) {
        error_log('Kontaktformular: Challenge konnte nicht erzeugt werden.');
        respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
    }

    $payload = time() . '.' . $nonce;
    $signature = hash_hmac('sha256', $payload, application_secret());
    return base64url_encode($payload . '.' . $signature);
}

function verify_challenge(string $token): bool
{
    if ($token === '' || strlen($token) > 180) {
        return false;
    }

    $decoded = base64url_decode($token);
    if (
        $decoded === false
        || !preg_match('/^(\d{10})\.([a-f0-9]{24})\.([a-f0-9]{64})$/D', $decoded, $matches)
    ) {
        return false;
    }

    $payload = $matches[1] . '.' . $matches[2];
    $expected = hash_hmac('sha256', $payload, application_secret());
    if (!hash_equals($expected, $matches[3])) {
        return false;
    }

    $age = time() - (int) $matches[1];
    return $age >= CHALLENGE_MINIMUM_AGE && $age <= CHALLENGE_MAXIMUM_AGE;
}

function remote_address(): string
{
    $address = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
    return filter_var($address, FILTER_VALIDATE_IP) !== false ? $address : 'unknown';
}

function enforce_rate_limit(string $bucket, int $maximumRequests): void
{
    $now = time();
    $directory = storage_directory();
    $identifier = hash_hmac('sha256', remote_address(), application_secret());
    $path = $directory . DIRECTORY_SEPARATOR . 'rate-' . $bucket . '-' . $identifier . '.json';
    $handle = @fopen($path, 'c+b');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        error_log('Kontaktformular: Rate-Limit-Speicher ist nicht verfügbar.');
        respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
    }

    rewind($handle);
    $stored = stream_get_contents($handle);
    $decoded = is_string($stored) && $stored !== '' ? json_decode($stored, true) : [];
    $timestamps = is_array($decoded)
        ? array_values(array_filter(
            $decoded,
            static fn ($timestamp): bool => is_int($timestamp) && $timestamp > ($now - RATE_LIMIT_WINDOW)
        ))
        : [];

    if (count($timestamps) >= $maximumRequests) {
        $retryAfter = max(1, RATE_LIMIT_WINDOW - ($now - min($timestamps)));
        flock($handle, LOCK_UN);
        fclose($handle);
        header('Retry-After: ' . $retryAfter);
        respond(429, 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.');
    }

    $timestamps[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    $encoded = json_encode($timestamps);
    $written = is_string($encoded) ? fwrite($handle, $encoded) : false;
    fflush($handle);
    @chmod($path, 0600);
    flock($handle, LOCK_UN);
    fclose($handle);

    if ($written === false || !is_string($encoded) || $written !== strlen($encoded)) {
        error_log('Kontaktformular: Rate-Limit konnte nicht gespeichert werden.');
        respond(503, 'Der Dienst ist vorübergehend nicht verfügbar.');
    }

    try {
        $runCleanup = random_int(1, 50) === 1;
    } catch (\Throwable) {
        $runCleanup = false;
    }

    if ($runCleanup) {
        foreach (glob($directory . DIRECTORY_SEPARATOR . 'rate-*.json') ?: [] as $candidate) {
            if (is_file($candidate) && filemtime($candidate) < ($now - RATE_LIMIT_WINDOW - 60)) {
                @unlink($candidate);
            }
        }
    }
}

function require_scalar_field(array $source, string $key, bool $required = true): string
{
    if (!array_key_exists($key, $source)) {
        if ($required) {
            respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
        }
        return '';
    }

    if (!is_string($source[$key])) {
        respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
    }

    return $source[$key];
}

function normalize_utf8(string $value): string
{
    if (!preg_match('//u', $value)) {
        respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
    }

    return trim($value);
}

function utf8_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function validate_single_line(
    string $value,
    int $minimumLength,
    int $maximumLength,
    ?string $pattern = null
): string {
    $value = normalize_utf8($value);
    $length = utf8_length($value);

    if (
        $length < $minimumLength
        || $length > $maximumLength
        || preg_match('/[\x00-\x1F\x7F]/u', $value)
        || ($pattern !== null && !preg_match($pattern, $value))
    ) {
        respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
    }

    return $value;
}

function validate_message(string $value): string
{
    $value = normalize_utf8(str_replace(["\r\n", "\r"], "\n", $value));
    $length = utf8_length($value);

    if (
        $length < MESSAGE_MINIMUM_LENGTH
        || $length > MESSAGE_MAXIMUM_LENGTH
        || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', $value)
    ) {
        $message = $length < MESSAGE_MINIMUM_LENGTH
            ? 'Bitte geben Sie mindestens ' . MESSAGE_MINIMUM_LENGTH . ' Zeichen ein.'
            : 'Bitte prüfen Sie Ihre Eingaben.';
        respond(422, $message);
    }

    return $value;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8');
}
