"use client";

import { useReducedMotion } from "motion/react";

/* quiet tier — real coordinates mapped onto the 1008×1084 viewBox */
const QUIET_CITIES: Array<{
  x: number;
  y: number;
  name: string;
  lx: number;
  ly: number;
  anchor: "start" | "end" | "inherit" | "middle";
}> = [
  { x: 309, y: 316, name: "Delhi", lx: 326, ly: 323, anchor: "start" },
  { x: 259, y: 379, name: "Jaipur", lx: 243, ly: 386, anchor: "end" },
  { x: 186, y: 466, name: "Udaipur", lx: 170, ly: 473, anchor: "end" },
  { x: 354, y: 734, name: "Hyderabad", lx: 370, ly: 741, anchor: "start" },
  { x: 700, y: 541, name: "Kolkata", lx: 716, ly: 548, anchor: "start" },
  { x: 824, y: 429, name: "Shillong", lx: 840, ly: 436, anchor: "start" },
  { x: 416, y: 894, name: "Chennai", lx: 432, ly: 901, anchor: "start" },
];

export default function IndiaMap({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* silhouette layers */}
      <div className="absolute inset-0 india-dots opacity-50" />
      <div className="absolute inset-0 india-border opacity-30" />

      <svg viewBox="0 0 1008 1084" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── cartographic furniture ─────────────────────────── */}

        {/* range rings from the Mumbai hub */}
        <g stroke="var(--color-text-tertiary)" fill="none" strokeWidth="1">
          <circle cx="157" cy="671" r="180" strokeOpacity="0.14" strokeDasharray="2 10" className={reduce ? undefined : "ring-breathe"} />
          <circle cx="157" cy="671" r="360" strokeOpacity="0.10" strokeDasharray="2 10" className={reduce ? undefined : "ring-breathe"} style={{ animationDelay: "1.4s" }} />
          <circle cx="157" cy="671" r="540" strokeOpacity="0.07" strokeDasharray="2 10" className={reduce ? undefined : "ring-breathe"} style={{ animationDelay: "2.8s" }} />
        </g>

        {/* himalaya ridgelines */}
        <g stroke="var(--color-text-tertiary)" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round">
          <path d="M268 150 l14 -12 l14 12" />
          <path d="M302 128 l12 -10 l12 10" />
          <path d="M338 148 l14 -12 l14 12" />
          <path d="M374 120 l12 -10 l12 10" />
        </g>

        {/* sea labels — serif italic, very quiet */}
        <text x="60" y="930" fontSize="20" fontStyle="italic" fontFamily="serif" letterSpacing="4" fill="var(--color-text-tertiary)" fillOpacity="0.35">
          Arabian Sea
        </text>
        <text x="640" y="1040" fontSize="20" fontStyle="italic" fontFamily="serif" letterSpacing="4" fill="var(--color-text-tertiary)" fillOpacity="0.35">
          Bay of Bengal
        </text>

        {/* compass rose */}
        <g transform="translate(925 96)">
          <circle r="26" stroke="var(--color-text-tertiary)" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M0 -18 L6 8 L0 3 L-6 8 Z" fill="var(--color-text-tertiary)" fillOpacity="0.55" />
          <text y="-36" textAnchor="middle" fontSize="18" letterSpacing="2" fill="var(--color-text-tertiary)" fillOpacity="0.55">
            N
          </text>
        </g>

        {/* scale bar */}
        <g transform="translate(60 1044)" stroke="var(--color-text-tertiary)" strokeOpacity="0.45" strokeWidth="2">
          <path d="M0 0 H140" />
          <path d="M0 -5 V5" />
          <path d="M70 -4 V4" />
          <path d="M140 -5 V5" />
          <text x="152" y="5" fontSize="16" letterSpacing="1" fill="var(--color-text-tertiary)" fillOpacity="0.45" stroke="none">
            500 km
          </text>
        </g>

        {/* ── ambient wind drift (monsoon air) ───────────────── */}
        {!reduce && (
          <g fill="var(--color-text-tertiary)">
            <circle r="3" opacity="0.22">
              <animateMotion dur="26s" repeatCount="indefinite" path="M-40 300 C 250 240, 600 340, 1050 260" />
            </circle>
            <circle r="2.5" opacity="0.18">
              <animateMotion dur="32s" begin="-12s" repeatCount="indefinite" path="M-40 560 C 300 520, 700 620, 1050 540" />
            </circle>
            <circle r="2" opacity="0.15">
              <animateMotion dur="38s" begin="-20s" repeatCount="indefinite" path="M-40 820 C 300 780, 700 880, 1050 800" />
            </circle>
          </g>
        )}

        {/* ── routes ─────────────────────────────────────────── */}

        {/* secondary routes */}
        <g stroke="var(--color-brand-500)" strokeWidth="2.5" strokeDasharray="6 14" strokeLinecap="round">
          <path id="route-goa" d="M157 671 C 168 718, 178 762, 190 808" strokeOpacity="0.3" />
          <path id="route-tirupati" d="M157 671 C 235 755, 310 815, 387 874" strokeOpacity="0.3" />
          <path id="route-portblair" d="M157 671 C 400 905, 640 1005, 853 947" strokeOpacity="0.25" />
          <path id="route-leh" d="M157 671 C 165 470, 235 250, 322 109" strokeOpacity="0.28" />
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
          className={reduce ? undefined : "animate-dash"}
        />

        {/* route tag on the hero line */}
        <text x="192" y="436" fontSize="15" letterSpacing="2" fill="var(--color-text-tertiary)" fillOpacity="0.45">
          BOM → KUU · 1h 45
        </text>

        {/* ── quiet tier: twinkling cities ───────────────────── */}
        <g>
          {QUIET_CITIES.map((city, i) => (
            <g key={city.name}>
              <circle
                cx={city.x}
                cy={city.y}
                r="4.5"
                fill="var(--color-brand-500)"
                fillOpacity="0.55"
                className={reduce ? undefined : "city-twinkle"}
                style={reduce ? undefined : { animationDelay: `${i * 0.6}s` }}
              />
              <text
                x={city.lx}
                y={city.ly}
                textAnchor={city.anchor}
                fontSize="19"
                fontWeight="600"
                letterSpacing="2.5"
                fill="var(--color-text-tertiary)"
                fillOpacity="0.45"
              >
                {city.name}
              </text>
            </g>
          ))}
        </g>

        {/* ── secondary destinations ─────────────────────────── */}
        <g>
          {[
            { x: 190, y: 808, name: "Goa", lx: 206, ly: 816 },
            { x: 387, y: 874, name: "Tirupati", lx: 403, ly: 882 },
            { x: 853, y: 947, name: "Port Blair", lx: 853, ly: 990, middle: true },
            { x: 322, y: 109, name: "Leh", lx: 338, ly: 116 },
          ].map((d) => (
            <g key={d.name}>
              <circle cx={d.x} cy={d.y} r="9" stroke="var(--color-brand-500)" strokeOpacity="0.5" strokeWidth="2" />
              <circle cx={d.x} cy={d.y} r="4" fill="var(--color-brand-500)" fillOpacity="0.8" />
              <text
                x={d.lx}
                y={d.ly}
                textAnchor={d.middle ? "middle" : "start"}
                fontSize="21"
                fontWeight="600"
                letterSpacing="2.5"
                fill="var(--color-text-tertiary)"
                fillOpacity="0.6"
              >
                {d.name}
              </text>
            </g>
          ))}
        </g>

        {/* ── Mumbai hub ─────────────────────────────────────── */}
        <circle cx="157" cy="671" r="90" fill="url(#hub-glow)" />
        <circle cx="157" cy="671" r="14" stroke="var(--color-brand-500)" strokeOpacity="0.6" strokeWidth="2" />
        <circle cx="157" cy="671" r="5" fill="var(--color-brand-500)" />
        {!reduce && (
          <circle cx="157" cy="671" r="14" stroke="var(--color-accent-500)" strokeOpacity="0.5" strokeWidth="2" className="svg-ping" />
        )}
        <text x="140" y="678" textAnchor="end" fontSize="24" fontWeight="600" letterSpacing="3" fill="var(--color-text-tertiary)" fillOpacity="0.8">
          Mumbai
        </text>
        <text x="140" y="702" textAnchor="end" fontSize="15" letterSpacing="2" fill="var(--color-text-tertiary)" fillOpacity="0.5">
          BOM
        </text>

        {/* ── Manali hero destination ────────────────────────── */}
        <circle cx="309" cy="181" r="12" stroke="var(--color-accent-500)" strokeOpacity="0.7" strokeWidth="2" />
        <circle cx="309" cy="181" r="5" fill="var(--color-accent-500)" />
        {!reduce && (
          <circle cx="309" cy="181" r="12" stroke="var(--color-accent-500)" strokeOpacity="0.5" strokeWidth="2" className="svg-ping" />
        )}
        <text x="330" y="188" fontSize="24" fontWeight="600" letterSpacing="3" fill="var(--color-text-tertiary)" fillOpacity="0.8">
          Manali
        </text>
        <text x="330" y="212" fontSize="15" letterSpacing="2" fill="var(--color-text-tertiary)" fillOpacity="0.5">
          KUU
        </text>

        {/* ── planes (desynchronized) ────────────────────────── */}
        {!reduce && (
          <>
            {/* hero plane → Manali */}
            <g>
              <path d="M0 -9 L22 0 L0 9 L7 0 Z" fill="var(--color-accent-500)" />
              <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                <mpath href="#route-manali" />
              </animateMotion>
            </g>

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

            <g opacity="0.7">
              <path d="M0 -6 L14 0 L0 6 L4.5 0 Z" fill="var(--color-brand-500)" />
              <animateMotion dur="11s" begin="-5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#route-leh" />
              </animateMotion>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}