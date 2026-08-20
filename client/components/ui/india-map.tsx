export default function IndiaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* silhouette layers */}
      <div className="absolute inset-0 india-dots opacity-50" />
      <div className="absolute inset-0 india-border opacity-30" />

      <svg viewBox="0 0 1008 1084" fill="none" className="absolute inset-0 h-full w-full">
        {/* secondary routes — now with ids so planes can follow them */}
        <g stroke="var(--color-brand-500)" strokeWidth="2.5" strokeDasharray="6 14" strokeLinecap="round">
          <path id="route-goa" d="M157 671 C 168 718, 178 762, 190 808" strokeOpacity="0.3" />
          <path id="route-tirupati" d="M157 671 C 235 755, 310 815, 387 874" strokeOpacity="0.3" />
          <path id="route-portblair" d="M157 671 C 400 905, 640 1005, 853 947" strokeOpacity="0.25" />
        </g>

        {/* main route: Mumbai → Manali */}
        <path
          id="route-manali"
          d="M157 671 C 130 460, 195 265, 309 181"
          stroke="var(--color-brand-500)"
          strokeOpacity="0.55"
          strokeWidth="3.5"
          strokeDasharray="10 16"
          strokeLinecap="round"
          className="animate-dash"
        />

        {/* Mumbai hub */}
        <circle cx="157" cy="671" r="14" stroke="var(--color-brand-500)" strokeOpacity="0.6" strokeWidth="2" />
        <circle cx="157" cy="671" r="5" fill="var(--color-brand-500)" />
        <circle cx="157" cy="671" r="14" stroke="var(--color-accent-500)" strokeOpacity="0.5" strokeWidth="2" className="svg-ping" />
        <text x="140" y="678" textAnchor="end" fontSize="24" fontWeight="600" letterSpacing="3" fill="var(--color-text-tertiary)" fillOpacity="0.8">
          Mumbai
        </text>

        {/* Manali destination */}
        <circle cx="309" cy="181" r="12" stroke="var(--color-accent-500)" strokeOpacity="0.7" strokeWidth="2" />
        <circle cx="309" cy="181" r="5" fill="var(--color-accent-500)" />
        <circle cx="309" cy="181" r="12" stroke="var(--color-accent-500)" strokeOpacity="0.5" strokeWidth="2" className="svg-ping" />
        <text x="330" y="188" fontSize="24" fontWeight="600" letterSpacing="3" fill="var(--color-text-tertiary)" fillOpacity="0.8">
          Manali
        </text>

        {/* quiet destination dots */}
        <g fill="var(--color-brand-500)" fillOpacity="0.55">
          <circle cx="190" cy="808" r="5" />
          <circle cx="387" cy="874" r="5" />
          <circle cx="853" cy="947" r="5" />
        </g>
        <g fontSize="21" fontWeight="600" letterSpacing="2.5" fill="var(--color-text-tertiary)" fillOpacity="0.6">
          <text x="206" y="816">Goa</text>
          <text x="403" y="882">Tirupati</text>
          <text x="853" y="990" textAnchor="middle">Port Blair</text>
        </g>

        {/* ── planes: one per route, desynchronized ── */}

        {/* hero plane → Manali (accent, larger) */}
        <g>
          <path d="M0 -9 L22 0 L0 9 L7 0 Z" fill="var(--color-accent-500)" />
          <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-manali" />
          </animateMotion>
        </g>

        {/* secondary planes (smaller, dimmer, mid-flight on load) */}
        <g opacity="0.75">
          <path d="M0 -6 L14 0 L0 6 L4.5 0 Z" fill="var(--color-brand-500)" />
          <animateMotion dur="7s" begin="-2.5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-goa" />
          </animateMotion>
        </g>

        <g opacity="0.75">
          <path d="M0 -6 L14 0 L0 6 L4.5 0 Z" fill="var(--color-brand-500)" />
          <animateMotion dur="9s" begin="-4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-tirupati" />
          </animateMotion>
        </g>

        <g opacity="0.7">
          <path d="M0 -6 L14 0 L0 6 L4.5 0 Z" fill="var(--color-brand-500)" />
          <animateMotion dur="12s" begin="-6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-portblair" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}