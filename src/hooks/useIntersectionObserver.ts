import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook using the native IntersectionObserver API to detect
 * when an element enters or exits the viewport.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px 0px 120px 0px',
    freezeOnceVisible = true,
  } = options;

  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, immediately mark intersecting to avoid hiding or delaying elements
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsIntersecting(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Fallback for environments where IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    // Stop observing if already visible and freezeOnceVisible is enabled
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
        if (observerEntry.isIntersecting) {
          setIsIntersecting(true);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
        } else if (!freezeOnceVisible) {
          setIsIntersecting(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [ref, isIntersecting, entry];
}
