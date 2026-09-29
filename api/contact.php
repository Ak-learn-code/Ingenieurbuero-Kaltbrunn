<?php

declare(strict_types=1);

namespace Kaltbrunn\Contact;

const INTERNAL_REQUEST = true;
require_once __DIR__ . '/_contact_core.php';
require_once __DIR__ . '/_smtp_mailer.php';

send_security_headers();
require_method('POST');

$contentLength = filter_var($_SERVER['CONTENT_LENGTH'] ?? null, FILTER_VALIDATE_INT);
if ($contentLength !== false && $contentLength > MAXIMUM_REQUEST_BYTES) {
    respond(413, 'Die Anfrage ist zu groß.');
}

$contentType = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''), 2)[0]));
if (!in_array($contentType, ['application/x-www-form-urlencoded', 'multipart/form-data'], true)) {
    respond(415, 'Das Datenformat wird nicht unterstützt.');
}

require_same_origin_request();
enforce_rate_limit('attempt', ATTEMPT_RATE_LIMIT_REQUESTS);

if ($_FILES !== []) {
    respond(422, 'Dateianhänge werden nicht unterstützt.');
}

$expectedFields = ['name', 'phone', 'email', 'vehicle', 'message', 'consent', 'website', 'challenge'];
if (array_diff(array_keys($_POST), $expectedFields) !== []) {
    respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
}

$website = require_scalar_field($_POST, 'website', false);
if ($website !== '') {
    respond(200, 'Vielen Dank. Ihre Anfrage wurde übermittelt.');
}

$challenge = require_scalar_field($_POST, 'challenge');
if (!verify_challenge($challenge)) {
    respond(403, 'Das Formular ist abgelaufen. Bitte laden Sie die Seite neu.');
}

$name = validate_single_line(
    require_scalar_field($_POST, 'name'),
    NAME_MINIMUM_LENGTH,
    NAME_MAXIMUM_LENGTH
);
$phone = validate_single_line(
    require_scalar_field($_POST, 'phone'),
    PHONE_MINIMUM_LENGTH,
    PHONE_MAXIMUM_LENGTH,
    '/^(?=(?:\D*\d){6,}\D*$)[+0-9()\/.\s-]+$/u'
);
$email = validate_single_line(
    require_scalar_field($_POST, 'email'),
    EMAIL_MINIMUM_LENGTH,
    EMAIL_MAXIMUM_LENGTH
);
$vehicleRaw = require_scalar_field($_POST, 'vehicle', false);
$vehicle = $vehicleRaw === ''
    ? ''
    : validate_single_line($vehicleRaw, VEHICLE_MINIMUM_LENGTH, VEHICLE_MAXIMUM_LENGTH);
$message = validate_message(require_scalar_field($_POST, 'message'));
$consent = require_scalar_field($_POST, 'consent');

if ($consent !== 'accepted' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, 'Bitte prüfen Sie Ihre Eingaben.');
}

enforce_rate_limit('submission', SUBMISSION_RATE_LIMIT_REQUESTS);

$recipient = 'info@ing-kaltbrunn.de';
$subject = 'Neue Gutachtenanfrage über die Website';
$submittedAt = (new \DateTimeImmutable('now', new \DateTimeZone('Europe/Berlin')))->format('d.m.Y, H:i');

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
        . '<td style="padding:10px 0;border-bottom:1px solid #e2e6ec;color:#171d29;font-size:14px;font-weight:600;line-height:1.45;vertical-align:top;">' . escape_html($value) . '</td>'
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

$sent = send_smtp_message($recipient, $subject, $html, $plain, $email, 'auto-generated');

if (!$sent) {
    error_log('Kontaktformular: Nachricht konnte nicht an den Mailserver übergeben werden.');
    respond(500, 'Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es später erneut.');
}

$confirmationSubject = 'Wir haben Ihre Anfrage erhalten | Ingenieurbüro Kaltbrunn';
$confirmationPlain = "Guten Tag {$name},\n\n"
    . "vielen Dank für Ihre Anfrage beim Ingenieurbüro Kaltbrunn.\n\n"
    . "Ihre Nachricht ist erfolgreich bei uns eingegangen. Wir prüfen Ihr Anliegen und melden uns schnellstmöglich bei Ihnen.\n\n"
    . "Bei dringenden Rückfragen erreichen Sie uns telefonisch unter +49 176 37998836 oder per E-Mail an info@ing-kaltbrunn.de.\n\n"
    . "Freundliche Grüße\nIngenieurbüro Kaltbrunn\n";

$confirmationHtml = '<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    . '<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;color:#171d29;">'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f4f7;"><tr><td align="center" style="padding:32px 16px;">'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;overflow:hidden;border:1px solid #dce1e8;border-radius:18px;background:#ffffff;">'
    . '<tr><td style="padding:28px 32px;background:#171d29;color:#ffffff;">'
    . '<div style="margin:0 0 10px;color:#8fb3f1;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Ingenieurbüro Kaltbrunn</div>'
    . '<h1 style="margin:0;font-size:26px;letter-spacing:-0.6px;line-height:1.15;">Ihre Anfrage ist eingegangen</h1>'
    . '</td></tr><tr><td style="padding:30px 32px;color:#303744;font-size:15px;line-height:1.65;">'
    . '<p style="margin:0 0 18px;">Guten Tag ' . escape_html($name) . ',</p>'
    . '<p style="margin:0 0 18px;">vielen Dank für Ihre Anfrage beim Ingenieurbüro Kaltbrunn.</p>'
    . '<p style="margin:0 0 18px;">Ihre Nachricht ist erfolgreich bei uns eingegangen. Wir prüfen Ihr Anliegen und melden uns schnellstmöglich bei Ihnen.</p>'
    . '<p style="margin:0 0 24px;">Bei dringenden Rückfragen erreichen Sie uns telefonisch unter <a href="tel:+4917637998836" style="color:#003da5;text-decoration:none;">+49 176 37998836</a> oder per E-Mail an <a href="mailto:info@ing-kaltbrunn.de" style="color:#003da5;text-decoration:none;">info@ing-kaltbrunn.de</a>.</p>'
    . '<p style="margin:0;">Freundliche Grüße<br><strong>Ingenieurbüro Kaltbrunn</strong></p>'
    . '</td></tr><tr><td style="padding:18px 32px;border-top:1px solid #e2e6ec;color:#7a8290;font-size:11px;line-height:1.5;">Dies ist eine automatische Eingangsbestätigung. Sie können auf diese E-Mail antworten.</td></tr>'
    . '</table></td></tr></table></body></html>';

if (!send_smtp_message(
    $email,
    $confirmationSubject,
    $confirmationHtml,
    $confirmationPlain,
    SMTP_SENDER,
    'auto-replied'
)) {
    error_log('Kontaktformular: Eingangsbestätigung konnte nicht versendet werden.');
}

respond(200, 'Vielen Dank. Ihre Anfrage wurde direkt übermittelt.');
