export const reducedMotionMediaQuery = '(prefers-reduced-motion: reduce)';

export const motionTokens = {
  duration: {
    fast: 0.16,
    standard: 0.28,
    slow: 0.52,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1],
    emphasized: [0.16, 1, 0.3, 1],
  },
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia(reducedMotionMediaQuery).matches
  );
}
