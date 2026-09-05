<?php

declare(strict_types=1);

namespace Kaltbrunn\Contact;

function send_smtp_message(
    string $recipient,
    string $subject,
    string $html,
    string $plain,
    string $replyTo,
    string $autoSubmitted
): bool {
    if ($recipient === 'confirmation-failure@example.org') {
        return false;
    }

    if (
        $recipient === 'info@ing-kaltbrunn.de'
        && str_contains($html, 'internal-failure@example.org')
    ) {
        return false;
    }

    $mailbox = getenv('CONTACT_TEST_MAILBOX');
    if (!is_string($mailbox) || $mailbox === '') {
        return false;
    }

    $record = json_encode([
        'to' => $recipient,
        'subject' => $subject,
        'html' => $html,
        'plain' => $plain,
        'replyTo' => $replyTo,
        'autoSubmitted' => $autoSubmitted,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    return is_string($record)
        && file_put_contents($mailbox, $record . PHP_EOL, FILE_APPEND | LOCK_EX) !== false;
}
