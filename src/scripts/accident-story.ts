const DESKTOP_MEDIA_QUERY = '(min-width: 56.0625rem)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function initializeAccidentStory(): void {
  const stories = document.querySelectorAll<HTMLElement>(
    '[data-accident-story]',
  );

  for (const story of stories) {
    const chapters = Array.from(
      story.querySelectorAll<HTMLElement>('[data-story-chapter]'),
    );
    const images = Array.from(
      story.querySelectorAll<HTMLElement>('[data-story-image]'),
    );

    if (chapters.length === 0 || images.length !== chapters.length) continue;

    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let observer: IntersectionObserver | undefined;

    const setActiveChapter = (activeIndex: number): void => {
      chapters.forEach((chapter, index) => {
        chapter.dataset.active = String(index === activeIndex);
      });
      images.forEach((image, index) => {
        image.dataset.active = String(index === activeIndex);
      });
    };

    const disconnect = (): void => {
      observer?.disconnect();
      observer = undefined;
    };

    const connect = (): void => {
      disconnect();
      setActiveChapter(0);

      if (!desktopQuery.matches || reducedMotionQuery.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          const activeEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!activeEntry) return;

          const activeIndex = chapters.indexOf(
            activeEntry.target as HTMLElement,
          );
          if (activeIndex >= 0) setActiveChapter(activeIndex);
        },
        {
          rootMargin: '-32% 0px -32% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      chapters.forEach((chapter) => observer?.observe(chapter));
    };

    connect();
    desktopQuery.addEventListener('change', connect);
    reducedMotionQuery.addEventListener('change', connect);
  }
}
