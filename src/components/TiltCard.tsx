import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext
} from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  HTMLMotionProps
} from 'framer-motion';

interface TiltCardContextValue {
  isHovered: boolean;
  isReducedMotion: boolean;
}

const TiltCardContext = createContext<TiltCardContextValue>({
  isHovered: false,
  isReducedMotion: false
});

export const useTiltCardContext = () => useContext(TiltCardContext);

export interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  /** Maximum tilt angle in degrees. Default: 7 */
  maxTilt?: number;
  /** 3D Perspective value in pixels. Default: 1000 */
  perspective?: number;
  /** Subtle scale multiplier on hover. Default: 1.015 */
  scale?: number;
  /** Whether to render subtle cursor-following holographic glare. Default: true */
  glare?: boolean;
  /** Maximum opacity for glare highlight. Default: 0.14 */
  glareMaxOpacity?: number;
  /** Reverse tilt direction (tilt into cursor instead of away). Default: false */
  reverse?: boolean;
  /** Manually disable tilt effect. Default: false */
  disabled?: boolean;
  /** Explicitly enforce or bypass reduced motion checking. Default: true */
  respectReducedMotion?: boolean;
  /** Custom data-cursor attribute for custom cursor integration. Default: undefined */
  dataCursor?: string;
  /** Class name applied to outer perspective container */
  containerClassName?: string;
  /** Class name applied to tilted inner card */
  className?: string;
}

export interface TiltCardLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Depth distance in pixels along Z-axis (translateZ). Default: 20 */
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TiltCardLayer
 * Allows elements inside a TiltCard to float at a distinct 3D depth,
 * producing an authentic multi-plane parallax depth effect.
 * Automatically flattens when reduced motion is active.
 */
export function TiltCardLayer({
  children,
  depth = 20,
  className = '',
  style,
  ...props
}: TiltCardLayerProps) {
  const { isReducedMotion } = useTiltCardContext();

  return (
    <div
      className={className}
      style={{
        transform: isReducedMotion ? 'none' : `translateZ(${depth}px)`,
        transformStyle: isReducedMotion ? 'flat' : 'preserve-3d',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * TiltCard
 * A high-performance 3D perspective tilt wrapper component built with Framer Motion.
 * Fully respects the 'prefers-reduced-motion' media query and automatically
 * falls back to flat presentation for accessibility and coarse/touch devices.
 */
export function TiltCard({
  children,
  maxTilt = 7,
  perspective = 1000,
  scale = 1.015,
  glare = true,
  glareMaxOpacity = 0.14,
  reverse = false,
  disabled = false,
  respectReducedMotion = true,
  dataCursor,
  containerClassName = '',
  className = '',
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...restProps
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mediaReducedMotion, setMediaReducedMotion] = useState(false);

  // Framer Motion native hook for prefers-reduced-motion
  const framerReducedMotion = useReducedMotion();

  // Media query listener for prefers-reduced-motion and touch device detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMedia = () => {
      const reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
      setMediaReducedMotion(reducedMotionMql.matches);

      const touchDetected =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchDetected);
    };

    checkMedia();

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMqlChange = (e: MediaQueryListEvent) => {
      setMediaReducedMotion(e.matches);
    };

    try {
      mql.addEventListener('change', handleMqlChange);
      window.addEventListener('resize', checkMedia);
    } catch {
      // Fallback for older browsers
      mql.addListener(handleMqlChange);
    }

    return () => {
      try {
        mql.removeEventListener('change', handleMqlChange);
        window.removeEventListener('resize', checkMedia);
      } catch {
        mql.removeListener(handleMqlChange);
      }
    };
  }, []);

  const shouldReduceMotion = respectReducedMotion && (Boolean(framerReducedMotion) || mediaReducedMotion);
  const shouldDisableTilt = Boolean(disabled || shouldReduceMotion || isTouchDevice);

  // Framer Motion MotionValues for tilt rotation angles and glare position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const cardScale = useMotionValue(1);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  // Smooth responsive spring physics for natural tactile momentum
  const springConfig = { damping: 24, stiffness: 220, mass: 0.4 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothScale = useSpring(cardScale, { damping: 20, stiffness: 200, mass: 0.3 });
  const smoothGlareOpacity = useSpring(glareOpacity, { damping: 20, stiffness: 220 });

  // Holographic glare gradient template
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldDisableTilt || !cardRef.current) {
        onMouseMove?.(e);
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Mouse coordinate offsets within the card (0 to width/height)
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from card center (-0.5 to +0.5)
      const xOffset = clientX / rect.width - 0.5;
      const yOffset = clientY / rect.height - 0.5;

      // 3D rotation angle calculation (subtle tilt towards the cursor)
      const multiplier = reverse ? -1 : 1;
      const targetRotateX = multiplier * (-yOffset * (maxTilt * 2));
      const targetRotateY = multiplier * (xOffset * (maxTilt * 2));

      rotateX.set(targetRotateX);
      rotateY.set(targetRotateY);

      if (glare) {
        glareX.set((clientX / rect.width) * 100);
        glareY.set((clientY / rect.height) * 100);
      }

      onMouseMove?.(e);
    },
    [shouldDisableTilt, reverse, maxTilt, glare, rotateX, rotateY, glareX, glareY, onMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);

      if (!shouldDisableTilt) {
        cardScale.set(scale);
        if (glare) {
          glareOpacity.set(glareMaxOpacity);
        }
      }

      onMouseEnter?.(e);
    },
    [shouldDisableTilt, scale, glare, glareMaxOpacity, cardScale, glareOpacity, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);

      if (!shouldDisableTilt) {
        rotateX.set(0);
        rotateY.set(0);
        cardScale.set(1);
        if (glare) {
          glareOpacity.set(0);
        }
      }

      onMouseLeave?.(e);
    },
    [shouldDisableTilt, glare, rotateX, rotateY, cardScale, glareOpacity, onMouseLeave]
  );

  const contextValue: TiltCardContextValue = {
    isHovered,
    isReducedMotion: shouldDisableTilt
  };

  // If user prefers reduced motion or tilt is disabled:
  // Render clean accessible wrapper without 3D transforms
  if (shouldDisableTilt) {
    return (
      <TiltCardContext.Provider value={contextValue}>
        <div
          ref={cardRef}
          className={`relative ${containerClassName} ${className}`.trim()}
          data-cursor={dataCursor}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...(restProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      </TiltCardContext.Provider>
    );
  }

  // Detect if full height is requested so perspective container fills height
  const isFullHeight = className.includes('h-full') || containerClassName.includes('h-full');

  return (
    <TiltCardContext.Provider value={contextValue}>
      <div
        className={`relative ${isFullHeight ? 'h-full' : ''} ${containerClassName}`.trim()}
        style={{
          perspective: `${perspective}px`
        }}
        data-cursor={dataCursor}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            scale: smoothScale,
            willChange: isHovered ? 'transform' : 'auto',
            ...style
          }}
          className={`relative transition-shadow duration-300 ${className}`.trim()}
          {...restProps}
        >
          {/* Subtle holographic glare reflection */}
          {glare && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden mix-blend-overlay"
              style={{
                background: glareBackground,
                opacity: smoothGlareOpacity
              }}
            />
          )}

          {/* Card Content with 3D child preservation */}
          <div className="relative w-full h-full [transform-style:preserve-3d]">
            {children}
          </div>
        </motion.div>
      </div>
    </TiltCardContext.Provider>
  );
}

export default TiltCard;
