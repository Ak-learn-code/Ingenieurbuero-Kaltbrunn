import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';

const projectRoot = resolve(import.meta.dirname, '../..');
const phpBinary = process.env.PHP_BINARY || '/opt/homebrew/opt/php@8.3/bin/php';
const runtimeRoot = await mkdtemp(join(tmpdir(), 'kaltbrunn-contact-tests-'));
const phpRuntime = join(runtimeRoot, 'runtime');
const mailbox = join(runtimeRoot, 'mailbox.jsonl');
const port = 19836;
const baseUrl = `http://127.0.0.1:${port}`;
const allowedOrigin = 'https://ing-kaltbrunn.de';

await mkdir(phpRuntime, { recursive: true });

const server = spawn(
  phpBinary,
  [
    '-d',
    `auto_prepend_file=${resolve(projectRoot, 'tests/contact/mock-mail.php')}`,
    '-d',
    `sys_temp_dir=${phpRuntime}`,
    '-d',
    'display_errors=0',
    '-S',
    `127.0.0.1:${port}`,
    '-t',
    resolve(projectRoot, 'dist'),
  ],
  {
    cwd: projectRoot,
    env: { ...process.env, CONTACT_TEST_MAILBOX: mailbox },
    stdio: ['ignore', 'ignore', 'pipe'],
  },
);

let serverErrors = '';
server.stderr.on('data', (chunk) => {
  serverErrors += String(chunk);
});

const securityHeaders = {
  Origin: allowedOrigin,
  'Sec-Fetch-Site': 'same-origin',
  'X-Contact-Form': '1',
};

const validFields = (challenge) => ({
  name: 'Erika Mustermann',
  phone: '+49 176 12345678',
  email: 'erika@example.org',
  vehicle: 'HP-AB 123 · BMW X1',
  message: 'Bitte melden Sie sich wegen meines Unfallschadens.',
  consent: 'accepted',
  website: '',
  challenge,
});

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      await fetch(`${baseUrl}/api/contact.php`);
      return;
    } catch {
      await new Promise((resolveWait) => setTimeout(resolveWait, 100));
    }
  }
  throw new Error(`PHP test server did not start. ${serverErrors}`);
}

async function requestChallenge(headers = securityHeaders) {
  const response = await fetch(`${baseUrl}/api/challenge.php`, {
    headers,
    cache: 'no-store',
  });
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(typeof data.challenge, 'string');
  return data.challenge;
}

async function submit(fields, { headers = securityHeaders, contentType } = {}) {
  let body;
  const requestHeaders = { ...headers };

  if (contentType === 'application/json') {
    requestHeaders['Content-Type'] = contentType;
    body = JSON.stringify(fields);
  } else {
    body = new URLSearchParams(fields);
  }

  const response = await fetch(`${baseUrl}/api/contact.php`, {
    method: 'POST',
    headers: requestHeaders,
    body,
  });

  return {
    status: response.status,
    headers: response.headers,
    body: await response.json(),
  };
}

async function clearRateLimits() {
  const storage = join(phpRuntime, 'ing-kaltbrunn-contact-v1');
  try {
    const entries = await readdir(storage);
    await Promise.all(
      entries
        .filter((entry) => entry.startsWith('rate-'))
        .map((entry) => rm(join(storage, entry), { force: true })),
    );
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

async function readMailbox() {
  try {
    const content = (await readFile(mailbox, 'utf8')).trim();
    return content === '' ? [] : content.split('\n').map(JSON.parse);
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

const results = [];
async function test(name, callback) {
  await callback();
  results.push(name);
}

try {
  await waitForServer();

  await test('GET statt POST', async () => {
    const response = await fetch(`${baseUrl}/api/contact.php`, {
      headers: securityHeaders,
    });
    assert.equal(response.status, 405);
  });

  await test('direkter POST ohne Herkunftsnachweis', async () => {
    const response = await submit({ website: '' }, { headers: {} });
    assert.equal(response.status, 403);
  });

  await test('fremder Origin', async () => {
    const response = await submit(
      { website: '' },
      { headers: { ...securityHeaders, Origin: 'https://example.net' } },
    );
    assert.equal(response.status, 403);
  });

  await test('cross-site Fetch-Metadaten', async () => {
    const response = await submit(
      { website: '' },
      { headers: { ...securityHeaders, 'Sec-Fetch-Site': 'cross-site' } },
    );
    assert.equal(response.status, 403);
  });

  await test('ungültiger Content-Type', async () => {
    const response = await submit({}, { contentType: 'application/json' });
    assert.equal(response.status, 415);
  });

  await test('Honeypot', async () => {
    const response = await submit({ website: 'https://spam.example' });
    assert.equal(response.status, 200);
  });

  const tooFastChallenge = await requestChallenge();
  await test('signierte Bot-Zeitprüfung', async () => {
    const response = await submit(validFields(tooFastChallenge));
    assert.equal(response.status, 403);
  });

  const challenge = await requestChallenge();
  await new Promise((resolveWait) => setTimeout(resolveWait, 2100));

  await test('gültiger Submit', async () => {
    await clearRateLimits();
    const before = await readMailbox();
    const response = await submit(validFields(challenge));
    assert.equal(response.status, 200);

    const added = (await readMailbox()).slice(before.length);
    assert.equal(added.length, 2);
    assert.equal(added[0].to, 'info@ing-kaltbrunn.de');
    assert.equal(added[1].to, 'erika@example.org');
    assert.equal(
      added[1].subject,
      'Wir haben Ihre Anfrage erhalten | Ingenieurbüro Kaltbrunn',
    );
    assert.equal(added[1].replyTo, 'info@ing-kaltbrunn.de');
    assert.equal(added[1].autoSubmitted, 'auto-replied');
    assert.match(added[1].plain, /Ihre Nachricht ist erfolgreich/);
    assert.match(added[1].html, /Ihre Anfrage ist eingegangen/);
    assert.doesNotMatch(added[1].plain, /meines Unfallschadens/);
    assert.doesNotMatch(added[1].html, /<img/i);
  });

  await test('SMTP-Konfiguration ist fest und TLS-Prüfung bleibt aktiv', async () => {
    const smtp = await readFile(
      resolve(projectRoot, 'dist/api/_smtp_mailer.php'),
      'utf8',
    );
    assert.match(smtp, /w0220943\.kasserver\.com/);
    assert.match(smtp, /const SMTP_PORT = 465/);
    assert.match(smtp, /SMTPAuth = true/);
    assert.match(smtp, /PHPMailer::ENCRYPTION_SMTPS/);
    assert.match(smtp, /smtp_password\(\)/);
    assert.doesNotMatch(smtp, /verify_peer['"]?\s*=>\s*false/);
    assert.doesNotMatch(smtp, /SMTPDebug\s*=/);
  });

  await test('Frontend- und Server-Längengrenzen stimmen überein', async () => {
    const html = await readFile(
      resolve(projectRoot, 'dist/index.html'),
      'utf8',
    );
    const core = await readFile(
      resolve(projectRoot, 'dist/api/_contact_core.php'),
      'utf8',
    );
    const expected = {
      name: [2, 120],
      phone: [6, 60],
      email: [3, 190],
      vehicle: [1, 160],
      message: [10, 5000],
    };

    for (const [field, [minimum, maximum]] of Object.entries(expected)) {
      const input = new RegExp(
        `name="${field}"[^>]*minlength="${minimum}"[^>]*maxlength="${maximum}"`,
      );
      assert.match(html, input);
      assert.match(
        core,
        new RegExp(
          `const ${field.toUpperCase()}_MINIMUM_LENGTH = ${minimum};[\\s\\S]*const ${field.toUpperCase()}_MAXIMUM_LENGTH = ${maximum};`,
        ),
      );
    }
  });

  await test('zu kurze Nachricht mit verständlicher Meldung', async () => {
    const response = await submit({
      ...validFields(challenge),
      message: 'test',
    });
    assert.equal(response.status, 422);
    assert.equal(
      response.body.message,
      'Bitte geben Sie mindestens 10 Zeichen ein.',
    );
  });

  await test('fehlendes Pflichtfeld', async () => {
    const fields = validFields(challenge);
    delete fields.name;
    const response = await submit(fields);
    assert.equal(response.status, 422);
  });

  await test('ungültige E-Mail', async () => {
    const response = await submit({
      ...validFields(challenge),
      email: 'nicht-gueltig',
    });
    assert.equal(response.status, 422);
  });

  await test('zu lange Eingabe', async () => {
    const response = await submit({
      ...validFields(challenge),
      name: 'A'.repeat(121),
    });
    assert.equal(response.status, 422);
  });

  await test('Arrays statt Strings', async () => {
    const body = new URLSearchParams(validFields(challenge));
    body.delete('name');
    body.append('name[]', 'Erika');
    const response = await fetch(`${baseUrl}/api/contact.php`, {
      method: 'POST',
      headers: securityHeaders,
      body,
    });
    assert.equal(response.status, 422);
  });

  await test('zusätzlicher Parameter', async () => {
    const response = await submit({ ...validFields(challenge), admin: '1' });
    assert.equal(response.status, 422);
  });

  await test('große Payload', async () => {
    const response = await submit({
      ...validFields(challenge),
      message: 'A'.repeat(17000),
    });
    assert.equal(response.status, 413);
  });

  await test('CR/LF-Header-Injection', async () => {
    const response = await submit({
      ...validFields(challenge),
      email: 'erika@example.org\r\nBcc: attacker@example.net',
    });
    assert.equal(response.status, 422);
  });

  await test('CR/LF im Namen', async () => {
    const response = await submit({
      ...validFields(challenge),
      name: 'Erika\r\nBcc: attacker@example.net',
    });
    assert.equal(response.status, 422);
  });

  await test('Unicode und HTML-Escaping', async () => {
    await clearRateLimits();
    const response = await submit({
      ...validFields(challenge),
      name: 'Jörg Weiß',
      message: 'Prüfung für Öl, Tür & Stoßfänger: <script>alert(1)</script>',
    });
    assert.equal(response.status, 200);

    const records = await readMailbox();
    const latest = records
      .filter((record) => record.to === 'info@ing-kaltbrunn.de')
      .at(-1);
    assert.equal(latest.to, 'info@ing-kaltbrunn.de');
    assert.equal(latest.replyTo, 'erika@example.org');
    assert.doesNotMatch(latest.replyTo, /attacker@example\.net/);
    assert.match(latest.plain, /Jörg Weiß/);
    assert.match(latest.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.doesNotMatch(latest.html, /<script>alert\(1\)<\/script>/);
  });

  await test('Fehler der Bestätigung ändert erfolgreichen Eingang nicht', async () => {
    await clearRateLimits();
    const before = await readMailbox();
    const response = await submit({
      ...validFields(challenge),
      email: 'confirmation-failure@example.org',
    });
    assert.equal(response.status, 200);

    const added = (await readMailbox()).slice(before.length);
    assert.equal(added.length, 1);
    assert.equal(added[0].to, 'info@ing-kaltbrunn.de');
  });

  await test('Fehler der internen SMTP-Mail verhindert Bestätigung', async () => {
    await clearRateLimits();
    const before = await readMailbox();
    const response = await submit({
      ...validFields(challenge),
      email: 'internal-failure@example.org',
    });
    assert.equal(response.status, 500);
    assert.equal((await readMailbox()).length, before.length);
  });

  await test('Referer-Fallback', async () => {
    const refererHeaders = {
      Referer: `${allowedOrigin}/kontakt`,
      'Sec-Fetch-Site': 'same-origin',
      'X-Contact-Form': '1',
    };
    const token = await requestChallenge(refererHeaders);
    assert.equal(typeof token, 'string');
  });

  await test('ungültige Requests verbrauchen nicht das Versandlimit', async () => {
    await clearRateLimits();
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const invalid = await submit({
        ...validFields(challenge),
        email: 'ungueltig',
      });
      assert.equal(invalid.status, 422);
    }

    const valid = await submit(validFields(challenge));
    assert.equal(valid.status, 200);
  });

  await test('Attempt-Limit begrenzt ungültige POST-Requests', async () => {
    await clearRateLimits();
    for (let attempt = 0; attempt < 21; attempt += 1) {
      const response = await submit({ name: '' });
      assert.equal(response.status, attempt < 20 ? 422 : 429);
      if (attempt === 20)
        assert.ok(Number(response.headers.get('retry-after')) > 0);
    }
  });

  await test('manipuliertes X-Forwarded-For und Rate-Limit', async () => {
    await clearRateLimits();
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const response = await submit(validFields(challenge), {
        headers: {
          ...securityHeaders,
          'X-Forwarded-For': `203.0.113.${attempt + 1}`,
        },
      });
      assert.equal(response.status, attempt < 5 ? 200 : 429);
      if (attempt === 5)
        assert.ok(Number(response.headers.get('retry-after')) > 0);
    }
  });

  await test('Rate-Limit-Daten außerhalb des Webroots', async () => {
    const storage = join(phpRuntime, 'ing-kaltbrunn-contact-v1');
    const entries = await readdir(storage);
    const rateFile = entries.find((entry) => entry.startsWith('rate-'));
    assert.ok(rateFile);
    assert.ok(!storage.startsWith(resolve(projectRoot, 'dist')));
    assert.doesNotMatch(
      await readFile(join(storage, rateFile), 'utf8'),
      /127\.0\.0\.1/,
    );
    assert.equal((await stat(join(storage, rateFile))).mode & 0o777, 0o600);
  });

  process.stdout.write(
    `Kontaktformular: ${results.length} Sicherheitstests erfolgreich.\n`,
  );
} finally {
  server.kill('SIGTERM');
  await rm(runtimeRoot, { recursive: true, force: true });
}
