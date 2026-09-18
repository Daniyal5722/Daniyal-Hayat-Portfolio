import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

export interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  mode?: 'words' | 'fade-up' | 'subtle-blur';
}

/**
 * Accessible, zero-shift TextReveal component.
 * Delivers editorial typographic reveals without distracting delays.
 * Immediately accessible to screen readers and respects reduced-motion.
 */
export function TextReveal({
  text,
  as: Component = 'span',
  className = '',
  wordClassName = '',
  delay = 0.1,
  stagger = 0.04,
  duration = 0.45,
  mode = 'words',
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = Component as any;
    return <Tag className={className}>{text}</Tag>;
  }

  if (mode === 'fade-up') {
    const MotionComponent = motion[Component] as any;
    return (
      <MotionComponent
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // Word-by-word reveal (preserves natural wrapping & zero layout shift)
  const words = text.split(' ');

  const MotionWrapper = motion[Component] as any;

  return (
    <MotionWrapper
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
          <motion.span
            variants={{
              hidden: { 
                opacity: 0, 
                y: 10,
                filter: mode === 'subtle-blur' ? 'blur(4px)' : 'blur(0px)'
              },
              visible: { 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)'
              },
            }}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionWrapper>
  );
}
