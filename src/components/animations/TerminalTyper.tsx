import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export interface TerminalLine {
  text: string;
  type?: 'command' | 'system' | 'success' | 'info' | 'dim';
  prefix?: string;
}

export interface TerminalTyperProps {
  lines: TerminalLine[];
  className?: string;
  commandTypingSpeed?: number;
  systemOutputDelay?: number;
  pauseAtEnd?: number;
  loop?: boolean;
}

/**
 * Developer-focused realistic terminal typewriter simulator.
 * Command lines (starting with > or $) type character-by-character.
 * System and success lines execute swiftly with realistic terminal latency.
 * Fully pauses when scrolled out of view or tab is hidden.
 */
export function TerminalTyper({
  lines,
  className = '',
  commandTypingSpeed = 45,
  systemOutputDelay = 220,
  pauseAtEnd = 4000,
  loop = true,
}: TerminalTyperProps) {
  const shouldReduceMotion = useReducedMotion();
  const [containerRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    freezeOnceVisible: false,
  });

  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [currentTypedChars, setCurrentTypedChars] = useState(0);
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);

  // Page visibility state
  const isDocumentVisibleRef = useRef(true);
  useEffect(() => {
    const handleVis = () => {
      isDocumentVisibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  // Reduced motion fallback
  if (shouldReduceMotion) {
    return (
      <div className={`space-y-1.5 font-mono text-xs ${className}`}>
        {lines.map((line, idx) => (
          <div key={idx} className={getLineStyle(line.type)}>
            {line.prefix && <span className="opacity-60 mr-1.5">{line.prefix}</span>}
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    if (!isVisible || !isDocumentVisibleRef.current) return;

    if (activeLineIndex >= lines.length) {
      if (!loop) return;

      const resetTimer = setTimeout(() => {
        setCompletedLines([]);
        setActiveLineIndex(0);
        setCurrentTypedChars(0);
      }, pauseAtEnd);

      return () => clearTimeout(resetTimer);
    }

    const currentLine = lines[activeLineIndex];
    const isCommand = currentLine.type === 'command' || currentLine.prefix === '>' || currentLine.prefix === '$';

    if (isCommand) {
      // Type character by character
      if (currentTypedChars < currentLine.text.length) {
        const variance = Math.floor(Math.random() * 20) - 8;
        const speed = Math.max(20, commandTypingSpeed + variance);

        const charTimer = setTimeout(() => {
          setCurrentTypedChars((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(charTimer);
      } else {
        // Command finished typing, wait a moment then move to output
        const nextLineTimer = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setActiveLineIndex((prev) => prev + 1);
          setCurrentTypedChars(0);
        }, 320);

        return () => clearTimeout(nextLineTimer);
      }
    } else {
      // System log / output line appears after short realistic execution delay
      const outputTimer = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setActiveLineIndex((prev) => prev + 1);
        setCurrentTypedChars(0);
      }, systemOutputDelay);

      return () => clearTimeout(outputTimer);
    }
  }, [
    activeLineIndex,
    currentTypedChars,
    isVisible,
    lines,
    commandTypingSpeed,
    systemOutputDelay,
    pauseAtEnd,
    loop,
  ]);

  const currentLine = lines[activeLineIndex];
  const isCommand = currentLine && (currentLine.type === 'command' || currentLine.prefix === '>' || currentLine.prefix === '$');

  return (
    <div ref={containerRef} className={`space-y-2 font-mono text-xs select-none ${className}`}>
      {/* Completed Lines */}
      {completedLines.map((line, idx) => (
        <div key={idx} className={getLineStyle(line.type)}>
          {line.prefix && <span className="opacity-70 mr-1.5">{line.prefix}</span>}
          <span>{line.text}</span>
        </div>
      ))}

      {/* Currently Typing Line */}
      {currentLine && (
        <div className={getLineStyle(currentLine.type)}>
          {currentLine.prefix && <span className="opacity-70 mr-1.5">{currentLine.prefix}</span>}
          <span>
            {isCommand ? currentLine.text.slice(0, currentTypedChars) : ''}
          </span>
          <span className="inline-block w-2 h-3.5 bg-cyan-400 align-middle ml-1 animate-pulse" />
        </div>
      )}

      {/* When all lines are finished and waiting to loop */}
      {!currentLine && (
        <div className="text-slate-500 text-[11px] pt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Execution idle • Loop pending</span>
        </div>
      )}
    </div>
  );
}

function getLineStyle(type?: TerminalLine['type']): string {
  switch (type) {
    case 'command':
      return 'text-cyan-400 font-semibold';
    case 'success':
      return 'text-emerald-400';
    case 'info':
      return 'text-blue-400';
    case 'dim':
      return 'text-slate-500 text-[11px]';
    case 'system':
    default:
      return 'text-slate-300';
  }
}
