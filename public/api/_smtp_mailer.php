<?php

declare(strict_types=1);

namespace Kaltbrunn\Contact;

if (!defined(__NAMESPACE__ . '\\INTERNAL_REQUEST')) {
    http_response_code(404);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;

const SMTP_HOST = 'w0220943.kasserver.com';
const SMTP_PORT = 465;
const SMTP_USERNAME = 'm081ae5d';
const SMTP_SENDER = 'info@ing-kaltbrunn.de';
const SMTP_CONFIG_FILENAME = 'ing-kaltbrunn-smtp.php';

function smtp_config_path(): string
{
    $configuredPath = getenv('KALTBRUNN_SMTP_CONFIG');
    if (is_string($configuredPath) && $configuredPath !== '') {
        return $configuredPath;
    }

    $documentRoot = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
    if ($documentRoot === false) {
        throw new \RuntimeException('SMTP-Konfiguration nicht verfügbar.');
    }

    return dirname($documentRoot)
        . DIRECTORY_SEPARATOR
        . 'private'
        . DIRECTORY_SEPARATOR
        . SMTP_CONFIG_FILENAME;
}

function smtp_password(): string
{
    $path = smtp_config_path();
    if (!is_file($path) || !is_readable($path)) {
        throw new \RuntimeException('SMTP-Konfiguration nicht verfügbar.');
    }

    $config = require $path;
    $password = is_array($config) ? ($config['password'] ?? null) : null;
    if (!is_string($password) || $password === '') {
        throw new \RuntimeException('SMTP-Konfiguration ist ungültig.');
    }

    return $password;
}

if (!function_exists(__NAMESPACE__ . '\\send_smtp_message')) {
    function send_smtp_message(
        string $recipient,
        string $subject,
        string $html,
        string $plain,
        string $replyTo,
        string $autoSubmitted
    ): bool {
        try {
            require_once __DIR__ . '/vendor/autoload.php';

            $mailer = new PHPMailer(true);
            $mailer->isSMTP();
            $mailer->Host = SMTP_HOST;
            $mailer->Port = SMTP_PORT;
            $mailer->SMTPAuth = true;
            $mailer->Username = SMTP_USERNAME;
            $mailer->Password = smtp_password();
            $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mailer->Timeout = 15;
            $mailer->CharSet = PHPMailer::CHARSET_UTF8;
            $mailer->XMailer = '';

            $mailer->setFrom(SMTP_SENDER, 'Ingenieurbüro Kaltbrunn');
            $mailer->addAddress($recipient);
            $mailer->addReplyTo($replyTo);
            $mailer->isHTML(true);
            $mailer->Subject = $subject;
            $mailer->Body = $html;
            $mailer->AltBody = $plain;
            $mailer->addCustomHeader('Auto-Submitted', $autoSubmitted);
            $mailer->addCustomHeader('X-Auto-Response-Suppress', 'All');

            return $mailer->send();
        } catch (\Throwable) {
            error_log('Kontaktformular: SMTP-Versand fehlgeschlagen.');
            return false;
        }
    }
}
