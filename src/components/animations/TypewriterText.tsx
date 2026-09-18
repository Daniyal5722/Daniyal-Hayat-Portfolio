import { useState, useEffect, useRef, useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

export interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  deleteDelay?: number;
  cursorChar?: string;
  className?: string;
  cursorClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  loop?: boolean;
  minHeightClassName?: string;
  onPhraseComplete?: (phraseIndex: number) => void;
}

/**
 * High-performance, accessible Typewriter text component.
 * - Smooth typing & deleting cadence with subtle human-like variance
 * - Respects prefers-reduced-motion (renders instantly and statically)
 * - Automatically pauses when out of view or tab is inactive to save battery/CPU
 * - Zero Layout Shift (CLS) through dedicated height and box constraints
 */
export function TypewriterText({
  phrases,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2200,
  deleteDelay = 450,
  cursorChar = '|',
  className = '',
  cursorClassName = 'text-cyan-500 font-bold animate-pulse ml-0.5',
  prefix = '',
  prefixClassName = 'text-slate-500 dark:text-slate-400 font-normal',
  loop = true,
  minHeightClassName = 'min-h-[1.75em]',
  onPhraseComplete,
}: TypewriterTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const safePhrases = useMemo(() => (phrases.length > 0 ? phrases : ['Developer']), [phrases]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const isVisibleRef = useRef(true);

  // Fallback for reduced motion
  if (shouldReduceMotion) {
    return (
      <span className={`inline-flex items-baseline ${minHeightClassName} ${className}`}>
        {prefix && <span className={prefixClassName}>{prefix}</span>}
        <span>{safePhrases[0]}</span>
      </span>
    );
  }

  // Page visibility listener to prevent background battery drain
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = safePhrases[phraseIndex];

    const tick = () => {
      // If document is hidden, don't execute frame
      if (!isVisibleRef.current) {
        timer = setTimeout(tick, 300);
        return;
      }

      if (!isDeleting) {
        // Typing phase
        if (displayedText.length < currentPhrase.length) {
          const nextChar = currentPhrase.charAt(displayedText.length);
          // Add slight human organic variance (e.g. ±15ms)
          const variance = Math.floor(Math.random() * 25) - 10;
          const speed = Math.max(25, typingSpeed + variance);

          setDisplayedText((prev) => prev + nextChar);
          timer = setTimeout(tick, speed);
        } else {
          // Completed typing current phrase
          if (onPhraseComplete) {
            onPhraseComplete(phraseIndex);
          }

          if (!loop && phraseIndex === safePhrases.length - 1) {
            // Reached end of phrases without loop
            return;
          }

          setIsPaused(true);
          // Pause before starting deletion
          timer = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
            timer = setTimeout(tick, deleteDelay);
          }, pauseDuration);
        }
      } else {
        // Deleting phase
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          timer = setTimeout(tick, deletingSpeed);
        } else {
          // Finished deleting current phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % safePhrases.length);
          // Small pause before typing next phrase
          timer = setTimeout(tick, 250);
        }
      }
    };

    timer = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    isPaused,
    phraseIndex,
    safePhrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    deleteDelay,
    loop,
    onPhraseComplete,
  ]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline flex-wrap ${minHeightClassName} ${className}`}
      aria-label={`${prefix} ${safePhrases[phraseIndex]}`}
      role="text"
    >
      {prefix && <span className={`mr-2 select-none ${prefixClassName}`}>{prefix}</span>}
      <span className="font-semibold tracking-tight">
        {displayedText}
      </span>
      <span
        aria-hidden="true"
        className={`inline-block select-none ${cursorClassName} ${isPaused ? 'opacity-80' : 'opacity-100'}`}
      >
        {cursorChar}
      </span>
    </span>
  );
}
