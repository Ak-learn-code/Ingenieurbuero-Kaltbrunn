import { business } from '@data/business';

const contactFormSelector = '[data-contact-form]';
const submitLabel = 'Jetzt kostenlose Erstanfrage senden →';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

function setSubmissionState(
  form: HTMLFormElement,
  state: SubmissionState,
  message = '',
): void {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-contact-form-status]');

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

export function initializeContactForm(): void {
  const form = document.querySelector<HTMLFormElement>(contactFormSelector);

  if (!form || form.dataset.initialized === 'true') return;

  form.dataset.initialized = 'true';
  const startedAt = form.querySelector<HTMLInputElement>(
    '[data-form-started-at]',
  );

  if (startedAt) startedAt.value = String(Date.now());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const isStaticPreview = window.location.hostname.endsWith('github.io');

    if (isStaticPreview) {
      openEmailFallback(data);
      setSubmissionState(
        form,
        'idle',
        `Die Vorschau öffnet Ihr E-Mail-Programm. Auf der finalen Website wird die Anfrage direkt an ${business.email.address} übermittelt.`,
      );
      return;
    }

    setSubmissionState(form, 'sending');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message || 'Die Anfrage konnte nicht übermittelt werden.',
        );
      }

      form.reset();
      setSubmissionState(
        form,
        'success',
        result.message || 'Vielen Dank. Ihre Anfrage wurde direkt übermittelt.',
      );
    } catch {
      setSubmissionState(
        form,
        'error',
        `Die direkte Übermittlung ist gerade nicht möglich. Bitte schreiben Sie an ${business.email.address} oder rufen Sie kurz an.`,
      );
    }
  });
}
