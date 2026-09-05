import { business } from '@data/business';

const contactFormSelector = '[data-contact-form]';
const submitLabel = 'Jetzt kostenlose Erstanfrage senden →';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

function applyLengthValidation(form: HTMLFormElement): void {
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[minlength], textarea[minlength]',
    )
    .forEach((field) => {
      field.setCustomValidity('');
      if (field.value.length > 0 && field.value.length < field.minLength) {
        field.setCustomValidity(
          `Bitte geben Sie mindestens ${field.minLength} Zeichen ein.`,
        );
      }
    });
}

function setSubmissionState(
  form: HTMLFormElement,
  state: SubmissionState,
  message = '',
): void {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-contact-form-status]');

  form.dataset.submissionState = state;
  if (state === 'sending') {
    form.setAttribute('aria-busy', 'true');
  } else {
    form.removeAttribute('aria-busy');
  }

  if (button) {
    button.disabled = state === 'sending' || state === 'success';
    button.textContent =
      state === 'sending'
        ? 'Anfrage wird sicher übermittelt …'
        : state === 'success'
          ? '✓ Anfrage übermittelt'
          : submitLabel;
  }

  if (status) {
    status.textContent = message;
    if (state === 'idle') {
      status.removeAttribute('data-state');
    } else {
      status.dataset.state = state;
    }
  }
}

function openEmailFallback(data: FormData): void {
  const name = String(data.get('name') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const vehicle = String(data.get('vehicle') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const subject = `Gutachtenanfrage von ${name}`;
  const body = [
    `Name: ${name}`,
    `Telefon: ${phone}`,
    `E-Mail: ${email}`,
    vehicle ? `Kennzeichen / Fahrzeug: ${vehicle}` : null,
    '',
    'Nachricht:',
    message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  window.location.href = `${business.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function prepareChallenge(form: HTMLFormElement): Promise<boolean> {
  const challengeField = form.querySelector<HTMLInputElement>(
    '[data-form-challenge]',
  );

  if (!challengeField) return false;
  if (challengeField.value !== '') return true;

  const challengeUrl = form.action.replace(/contact\.php$/, 'challenge.php');

  try {
    const response = await fetch(challengeUrl, {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'X-Contact-Form': '1',
      },
    });
    const result = (await response.json()) as { challenge?: string };

    if (!response.ok || typeof result.challenge !== 'string') return false;

    challengeField.value = result.challenge;
    return true;
  } catch {
    return false;
  }
}

export function initializeContactForm(): void {
  const form = document.querySelector<HTMLFormElement>(contactFormSelector);

  if (!form || form.dataset.initialized === 'true') return;

  form.dataset.initialized = 'true';
  const isStaticPreview = window.location.hostname.endsWith('github.io');

  form.addEventListener('input', () => applyLengthValidation(form));

  if (!isStaticPreview) void prepareChallenge(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    applyLengthValidation(form);
    if (!form.reportValidity()) return;

    if (isStaticPreview) {
      const data = new FormData(form);
      openEmailFallback(data);
      setSubmissionState(
        form,
        'idle',
        `Die Vorschau öffnet Ihr E-Mail-Programm. Auf der finalen Website wird die Anfrage direkt an ${business.email.address} übermittelt.`,
      );
      return;
    }

    setSubmissionState(form, 'sending');

    if (!(await prepareChallenge(form))) {
      setSubmissionState(
        form,
        'error',
        'Das Formular konnte nicht vorbereitet werden. Bitte laden Sie die Seite neu oder rufen Sie kurz an.',
      );
      return;
    }

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-Contact-Form': '1',
        },
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        if (response.status === 403) {
          const challengeField = form.querySelector<HTMLInputElement>(
            '[data-form-challenge]',
          );
          if (challengeField) challengeField.value = '';
          void prepareChallenge(form);
        }

        setSubmissionState(
          form,
          'error',
          result.message || 'Die Anfrage konnte nicht übermittelt werden.',
        );
        return;
      }

      form.reset();
      setSubmissionState(
        form,
        'success',
        result.message || 'Vielen Dank. Ihre Anfrage wurde direkt übermittelt.',
      );
    } catch {
      const challengeField = form.querySelector<HTMLInputElement>(
        '[data-form-challenge]',
      );
      if (challengeField) challengeField.value = '';
      void prepareChallenge(form);

      setSubmissionState(
        form,
        'error',
        `Die direkte Übermittlung ist gerade nicht möglich. Bitte schreiben Sie an ${business.email.address} oder rufen Sie kurz an.`,
      );
    }
  });
}
