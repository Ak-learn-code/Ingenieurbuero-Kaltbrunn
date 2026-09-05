const heroContactSelector = '[data-hero-contact]';
const heroContactDelay = 2200;
const heroContactNudgeDelay = 10000;
const heroContactNudgeDuration = 5500;

export function initializeHeroContact(): void {
  const contact = document.querySelector<HTMLElement>(heroContactSelector);

  if (!contact || contact.dataset.initialized === 'true') return;

  contact.dataset.initialized = 'true';
  const nudge = contact.querySelector<HTMLElement>('[data-hero-contact-nudge]');

  const revealNudge = (): void => {
    if (!nudge) return;

    contact.dataset.nudgeVisible = 'true';
    nudge.setAttribute('aria-hidden', 'false');

    window.setTimeout(() => {
      contact.dataset.nudgeVisible = 'false';
      nudge.setAttribute('aria-hidden', 'true');
    }, heroContactNudgeDuration);
  };

  const revealContact = (): void => {
    contact.dataset.visible = 'true';
    contact.setAttribute('aria-hidden', 'false');
    contact.inert = false;
    window.setTimeout(revealNudge, heroContactNudgeDelay);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealContact();
    return;
  }

  window.setTimeout(revealContact, heroContactDelay);
}
