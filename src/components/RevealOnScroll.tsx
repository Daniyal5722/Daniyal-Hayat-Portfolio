import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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
  as?: React.ElementType;
}

/**
 * A wrapper component that executes a smooth, hardware-accelerated
 * fade-in & glide-in reveal animation as it enters the viewport,
 * powered by the native IntersectionObserver API.
 */
export function RevealOnScroll({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 750,
  triggerOnce = true,
  id,
  as: Component = 'div',
}: RevealOnScrollProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: triggerOnce,
  });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
}
