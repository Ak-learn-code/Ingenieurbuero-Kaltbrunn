const heroContactSelector = '[data-hero-contact]';
const heroContactDelay = 2200;

export function initializeHeroContact(): void {
  const contact = document.querySelector<HTMLElement>(heroContactSelector);

  if (!contact || contact.dataset.initialized === 'true') return;

  contact.dataset.initialized = 'true';

  const revealContact = (): void => {
    contact.dataset.visible = 'true';
    contact.setAttribute('aria-hidden', 'false');
    contact.inert = false;
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealContact();
    return;
  }

  window.setTimeout(revealContact, heroContactDelay);
}
