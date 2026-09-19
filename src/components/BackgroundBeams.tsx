import { motion } from 'motion/react';

export function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-30 dark:opacity-20">
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Animated Beams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: '-100%', y: '100%', opacity: 0 }}
          animate={{ 
            x: '200%', 
            y: '-100%', 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 4,
            ease: "linear"
          }}
          className="absolute h-[2px] w-[600px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rotate-[-45deg] blur-sm"
          style={{
            top: `${20 + i * 25}%`,
            left: `${-10 + i * 15}%`,
          }}
        />
      ))}

      {/* Vertical Beams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          initial={{ y: '150%', opacity: 0 }}
          animate={{ 
            y: '-150%', 
            opacity: [0, 0.3, 0] 
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            delay: i * 7,
            ease: "linear"
          }}
          className="absolute w-[1px] h-[800px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent blur-[1px]"
          style={{
            left: `${30 + i * 30}%`,
          }}
        />
      ))}
    </div>
  );
}
