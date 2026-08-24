const getScrollAmount = (rail: HTMLElement) => {
  const card = rail.querySelector<HTMLElement>('.service-card');
  const track = rail.querySelector<HTMLElement>('.services__track');

  if (!card || !track) return rail.clientWidth * 0.8;

  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
};

export const initializeServicesRail = () => {
  document
    .querySelectorAll<HTMLElement>('[data-services]')
    .forEach((section) => {
      if (section.dataset.initialized === 'true') return;

      const rail = section.querySelector<HTMLElement>('[data-services-rail]');
      const previous = section.querySelector<HTMLButtonElement>(
        '[data-services-previous]',
      );
      const next = section.querySelector<HTMLButtonElement>(
        '[data-services-next]',
      );

      if (!rail || !previous || !next) return;

      section.dataset.initialized = 'true';

      const updateControls = () => {
        const remaining = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;

        previous.disabled = rail.scrollLeft <= 2;
        next.disabled = remaining <= 2;
      };

      const scroll = (direction: -1 | 1) => {
        rail.scrollBy({
          left: direction * getScrollAmount(rail),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'auto'
            : 'smooth',
        });
      };

      previous.addEventListener('click', () => scroll(-1));
      next.addEventListener('click', () => scroll(1));
      rail.addEventListener('scroll', updateControls, { passive: true });
      window.addEventListener('resize', updateControls, { passive: true });

      updateControls();
    });
};
