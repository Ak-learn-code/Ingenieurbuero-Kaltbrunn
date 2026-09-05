<?php

declare(strict_types=1);

namespace Kaltbrunn\Contact;

const INTERNAL_REQUEST = true;
require_once __DIR__ . '/_contact_core.php';

send_security_headers();
require_method('GET');
require_same_origin_request();

respond(200, 'OK', ['challenge' => create_challenge()]);

