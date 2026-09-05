import { business } from '@data/business';

const contactFormSelector = '[data-contact-form]';

export function initializeContactForm(): void {
  const form = document.querySelector<HTMLFormElement>(contactFormSelector);

  if (!form || form.dataset.initialized === 'true') return;

  form.dataset.initialized = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
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

    const submitButton = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );

    if (!submitButton) return;

    const originalLabel = submitButton.textContent;
    submitButton.textContent = '✓ E-Mail-Programm geöffnet';
    submitButton.disabled = true;

    window.setTimeout(() => {
      submitButton.textContent = originalLabel;
      submitButton.disabled = false;
    }, 4000);
  });
}
