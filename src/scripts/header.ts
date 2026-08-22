const mobileBreakpoint = '(max-width: 68rem)';

export function initializeHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const toggle =
    document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = document.querySelector<HTMLElement>(
    '[data-mobile-navigation]',
  );

  if (!header || !toggle || !navigation) return;

  const mobileMedia = window.matchMedia(mobileBreakpoint);
  let previouslyFocused: HTMLElement | null = null;

  const updateScrolledState = (): void => {
    header.dataset.scrolled = String(window.scrollY > 24);
  };

  const closeMenu = ({ restoreFocus = true } = {}): void => {
    header.dataset.menuOpen = 'false';
    navigation.dataset.open = 'false';
    navigation.setAttribute('aria-hidden', 'true');
    navigation.inert = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-is-open');

    if (restoreFocus) {
      previouslyFocused?.focus();
    }
  };

  const openMenu = ({ moveFocus }: { moveFocus: boolean }): void => {
    previouslyFocused = document.activeElement as HTMLElement | null;
    header.dataset.menuOpen = 'true';
    navigation.dataset.open = 'true';
    navigation.setAttribute('aria-hidden', 'false');
    navigation.inert = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Menü schließen');
    document.body.classList.add('menu-is-open');

    if (moveFocus) {
      requestAnimationFrame(() => {
        navigation.querySelector<HTMLAnchorElement>('a')?.focus();
      });
    }
  };

  const toggleMenu = (event: MouseEvent): void => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu({ moveFocus: event.detail === 0 });
    }
  };

  const trapFocus = (event: KeyboardEvent): void => {
    if (navigation.dataset.open !== 'true') return;

    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = [
      toggle,
      ...navigation.querySelectorAll<HTMLElement>('a[href]'),
    ];
    const first = focusable[0];
    const last = focusable.at(-1);

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  let scrollFrame = 0;
  const onScroll = (): void => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      updateScrolledState();
      scrollFrame = 0;
    });
  };

  toggle.addEventListener('click', toggleMenu);
  toggle.addEventListener('pointerdown', () => {
    toggle.dataset.focusOrigin = 'pointer';
  });
  toggle.addEventListener('keydown', () => {
    delete toggle.dataset.focusOrigin;
  });
  toggle.addEventListener('blur', () => {
    delete toggle.dataset.focusOrigin;
  });
  navigation.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) {
      closeMenu({ restoreFocus: false });
    }
  });
  document.addEventListener('keydown', trapFocus);
  window.addEventListener('scroll', onScroll, { passive: true });
  mobileMedia.addEventListener('change', (event) => {
    if (!event.matches) closeMenu({ restoreFocus: false });
  });

  updateScrolledState();
}
