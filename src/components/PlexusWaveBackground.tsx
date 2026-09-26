import ParticleDrift from './ui/particle-drift';

export function PlexusWaveBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <ParticleDrift
        className="w-full h-full opacity-[0.55] dark:opacity-[0.75]"
        speed={0.9}
        density={1.1}
        particleSize={1.0}
        connectionDistance={130}
        connectionOpacity={0.2}
        particleOpacity={0.65}
        streamCount={22}
        interactionRadius={150}
      />
      {/* Dynamic gradient overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/10 to-slate-100/30 dark:via-slate-950/15 dark:to-slate-950/35 pointer-events-none" />
    </div>
  );
}
