import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface RevealOnScrollProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  triggerOnce?: boolean;
  id?: string;
}

/**
 * A wrapper component that executes smooth, hardware-accelerated
 * scroll-based animations using framer-motion's motion.div component
 * with whileInView, initial, viewport, and transition properties.
 */
export function RevealOnScroll({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  className = '',
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 600,
  triggerOnce = true,
  id,
}: RevealOnScrollProps) {
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'up':
      initialY = distance;
      break;
    case 'down':
      initialY = -distance;
      break;
    case 'left':
      initialX = distance;
      break;
    case 'right':
      initialX = -distance;
      break;
    case 'none':
    default:
      initialX = 0;
      initialY = 0;
      break;
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: triggerOnce,
        margin: rootMargin as any,
        amount: threshold,
      }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}


