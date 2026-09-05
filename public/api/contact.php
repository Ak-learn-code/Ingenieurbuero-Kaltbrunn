<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');

function respond(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_single_line(string $value, int $maximumLength): string
{
    $value = trim(preg_replace('/[\r\n]+/u', ' ', $value) ?? '');
    return substr($value, 0, $maximumLength);
}

function clean_multiline(string $value, int $maximumLength): string
{
    $value = trim(str_replace("\0", '', $value));
    return substr($value, 0, $maximumLength);
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Diese Schnittstelle akzeptiert ausschließlich Formularanfragen.');
}

$fetchSite = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'same-site', 'none'], true)) {
    respond(403, 'Die Anfrage konnte nicht verifiziert werden.');
}

if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, 'Vielen Dank. Ihre Anfrage wurde übermittelt.');
}

$startedAt = filter_var($_POST['form_started_at'] ?? null, FILTER_VALIDATE_INT);
$currentTime = (int) floor(microtime(true) * 1000);
if ($startedAt === false || $startedAt > $currentTime || ($currentTime - $startedAt) < 2500 || ($currentTime - $startedAt) > 7200000) {
    respond(400, 'Bitte laden Sie das Formular neu und versuchen Sie es noch einmal.');
}

$name = clean_single_line((string) ($_POST['name'] ?? ''), 120);
$phone = clean_single_line((string) ($_POST['phone'] ?? ''), 60);
$email = clean_single_line((string) ($_POST['email'] ?? ''), 190);
$vehicle = clean_single_line((string) ($_POST['vehicle'] ?? ''), 160);
$message = clean_multiline((string) ($_POST['message'] ?? ''), 5000);
$consent = (string) ($_POST['consent'] ?? '');

if ($name === '' || $phone === '' || $message === '' || $consent !== 'accepted') {
    respond(422, 'Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutzerklärung.');
}

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
}

$recipient = 'info@ing-kaltbrunn.de';
$subject = 'Neue Gutachtenanfrage von ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$submittedAt = (new DateTimeImmutable('now', new DateTimeZone('Europe/Berlin')))->format('d.m.Y, H:i');

$rows = [
    ['Name', $name],
    ['Telefon', $phone],
    ['E-Mail', $email],
];

if ($vehicle !== '') {
    $rows[] = ['Kennzeichen / Fahrzeug', $vehicle];
}

$detailRows = '';
foreach ($rows as [$label, $value]) {
    $detailRows .= '<tr>'
        . '<td style="padding:10px 16px 10px 0;border-bottom:1px solid #e2e6ec;color:#626b79;font-size:13px;line-height:1.45;vertical-align:top;white-space:nowrap;">' . escape_html($label) . '</td>'
        . '<td style="padding:10px 0;border-bottom:1px solid #e2e6ec;color:#171d29;font-size:14px;font-weight:600;line-height:1.45;vertical-align:top;">' . nl2br(escape_html($value)) . '</td>'
        . '</tr>';
}

$html = '<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    . '<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;color:#171d29;">'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f4f7;"><tr><td align="center" style="padding:32px 16px;">'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;overflow:hidden;border:1px solid #dce1e8;border-radius:18px;background:#ffffff;">'
    . '<tr><td style="padding:28px 32px;background:#171d29;color:#ffffff;">'
    . '<div style="margin:0 0 10px;color:#8fb3f1;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Ingenieurbüro Kaltbrunn</div>'
    . '<h1 style="margin:0;font-size:26px;letter-spacing:-0.6px;line-height:1.15;">Neue Gutachtenanfrage</h1>'
    . '<p style="margin:10px 0 0;color:#bac2ce;font-size:13px;line-height:1.45;">Übermittelt am ' . escape_html($submittedAt) . ' Uhr</p>'
    . '</td></tr>'
    . '<tr><td style="padding:28px 32px 12px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' . $detailRows . '</table></td></tr>'
    . '<tr><td style="padding:20px 32px 30px;">'
    . '<div style="margin-bottom:8px;color:#003da5;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Nachricht</div>'
    . '<div style="padding:18px;border-left:3px solid #003da5;background:#f5f7fa;color:#303744;font-size:15px;line-height:1.6;">' . nl2br(escape_html($message)) . '</div>'
    . '</td></tr>'
    . '<tr><td style="padding:18px 32px;border-top:1px solid #e2e6ec;color:#7a8290;font-size:11px;line-height:1.5;">Diese Nachricht wurde über das Kontaktformular von ing-kaltbrunn.de übermittelt. Antworten Sie direkt auf diese E-Mail, um den Interessenten zu erreichen.</td></tr>'
    . '</table></td></tr></table></body></html>';

$plain = "Neue Gutachtenanfrage\n\n"
    . "Name: {$name}\n"
    . "Telefon: {$phone}\n"
    . "E-Mail: {$email}\n"
    . ($vehicle !== '' ? "Kennzeichen / Fahrzeug: {$vehicle}\n" : '')
    . "\nNachricht:\n{$message}\n";

try {
    $boundary = '=_Kaltbrunn_' . bin2hex(random_bytes(12));
} catch (Throwable) {
    $boundary = '=_Kaltbrunn_' . md5(uniqid('', true));
}

$headers = [
    'From: Ingenieurbüro Kaltbrunn <info@ing-kaltbrunn.de>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: Ingenieurbuero-Kaltbrunn-Website',
];

$mailBody = '--' . $boundary . "\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
    . quoted_printable_encode($plain) . "\r\n"
    . '--' . $boundary . "\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: quoted-printable\r\n\r\n"
    . quoted_printable_encode($html) . "\r\n"
    . '--' . $boundary . "--\r\n";

$sent = mail($recipient, $encodedSubject, $mailBody, implode("\r\n", $headers));

if (!$sent) {
    error_log('Kontaktformular: Die Nachricht konnte nicht an den Mailserver übergeben werden.');
    respond(500, 'Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es später erneut.');
}

respond(200, 'Vielen Dank. Ihre Anfrage wurde direkt übermittelt.');
