import ParticleDrift from './ui/particle-drift';

export function PlexusWaveBackground({ isDarkMode = true }: { isDarkMode?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <ParticleDrift
        className="w-full h-full opacity-[0.25] dark:opacity-[0.75] transition-opacity duration-700"
        mode={isDarkMode ? 'dark' : 'light'}
        speed={0.8}
        density={1.0}
        particleSize={1.0}
        connectionDistance={125}
        connectionOpacity={0.16}
        particleOpacity={0.6}
        streamCount={18}
        interactionRadius={140}
      />
      {/* Dynamic gradient overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/10 to-slate-200/20 dark:via-slate-950/15 dark:to-slate-950/35 pointer-events-none" />
    </div>
  );
}
