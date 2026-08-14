"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  ArrowRight,
  Clock,
  Utensils,
  Camera,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Layers,
  Zap,
  Share2,
} from "lucide-react";

export default function TravelPlannerLanding() {
  const [selectedVibe, setSelectedVibe] = useState("Culture & Food");
  const [promptInput, setPromptInput] = useState("5 days in Kyoto for a foodie couple with a $2,000 budget");

  const samplePrompts = [
    "🌸 5 days in Kyoto with a $2k budget",
    "🌊 7 days road trip across Amalfi Coast",
    "🏔️ 4-day weekend in Swiss Alps for hiking",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-100">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-950 shadow-sm">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">Roam</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#demo" className="hover:text-zinc-100 transition-colors">Product Preview</a>
            <a href="#features" className="hover:text-zinc-100 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-100 transition-colors">Workflow</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 transition-colors">
              Log in
            </button>
            <button className="text-sm font-medium bg-zinc-100 hover:bg-white text-zinc-950 px-4 py-2 rounded-lg transition-all shadow-sm">
              Start Planning
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Travel Engine v2.0 Released</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Travel planning made <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500">
              precise and effortless.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Generate complete day-by-day itineraries with route optimization, restaurant recommendations, and budget constraints in under 10 seconds.
          </p>

          {/* Interactive Search Console */}
          <div className="mt-10 max-w-2xl mx-auto text-left bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <textarea
                rows={2}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your ideal trip..."
                className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 resize-none focus:outline-none text-sm sm:text-base px-3 pt-2"
              />
            </div>

            {/* Controls Bar */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1 bg-zinc-800/60 px-2 py-1 rounded border border-zinc-700/50">
                  <Calendar className="w-3.5 h-3.5" /> Flexible Dates
                </span>
                <span className="flex items-center gap-1 bg-zinc-800/60 px-2 py-1 rounded border border-zinc-700/50">
                  <Wallet className="w-3.5 h-3.5" /> Auto-Budget
                </span>
              </div>

              <button className="w-full sm:w-auto bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shrink-0">
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Itinerary</span>
              </button>
            </div>
          </div>

          {/* Sample Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
            <span>Try asking:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setPromptInput(prompt.replace(/^[^\s]+\s/, ""))}
                className="hover:text-zinc-300 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 px-2.5 py-1 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Interactive Preview Mockup */}
      <section id="demo" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="border border-zinc-800 bg-zinc-900/60 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
          {/* Mock App Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Kyoto Culinary & Heritage Tour</h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Optimized
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Kyoto, Japan</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 5 Days</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Wallet className="w-3.5 h-3.5" /> $1,850 Est. Total</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Export Map
              </button>
              <button className="bg-zinc-100 hover:bg-white text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Customize
              </button>
            </div>
          </div>

          {/* Mock Timeline Preview */}
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {/* Timeline Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <span>Day 1 — Arashiyama & Traditional Eats</span>
                <span className="text-zinc-500">3 Stops • 4.2 km total distance</span>
              </div>

              {/* Activity Card 1 */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 flex gap-4 hover:border-zinc-700 transition-all">
                <div className="flex flex-col items-center justify-between py-1 text-xs text-zinc-500 shrink-0">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>08:30 AM</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Arashiyama Bamboo Grove</h3>
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">Sightseeing</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Early arrival recommended to bypass crowds. Walk through the scenic bamboo path toward Tenryu-ji Temple.
                  </p>
                </div>
              </div>

              {/* Activity Card 2 */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 flex gap-4 hover:border-zinc-700 transition-all">
                <div className="flex flex-col items-center justify-between py-1 text-xs text-zinc-500 shrink-0">
                  <Utensils className="w-4 h-4 text-amber-400" />
                  <span>12:00 PM</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Unagi Hirokawa</h3>
                    <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">Michelin Recommended</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Renowned freshwater eel over rice. Reservation slot automatically requested for 12:15 PM.
                  </p>
                </div>
              </div>

              {/* Activity Card 3 */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 flex gap-4 hover:border-zinc-700 transition-all">
                <div className="flex flex-col items-center justify-between py-1 text-xs text-zinc-500 shrink-0">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span>03:30 PM</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Kinkaku-ji (Golden Pavilion)</h3>
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">Cultural</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Zen Buddhist temple covered in gold leaf. Best lighting for photography during late afternoon hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Side Analytics Panel */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">Trip Summary</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Pacing</span>
                    <span className="text-zinc-200 font-medium">Moderate (3 stops/day)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Accommodations</span>
                    <span className="text-zinc-200 font-medium">Gion Boutique Ryokan</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Estimated Food Spend</span>
                    <span className="text-zinc-200 font-medium">$520 / 5 Days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Transit Pass</span>
                    <span className="text-zinc-200 font-medium">JR Kansai Area Pass</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                  <span>Export to Google Maps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-800/80">
        <div className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Built for serious travelers</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white">Intelligent features without the clutter.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-100 mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Route Sequencing</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Calculates real transit times between stops to prevent impossible schedules and burnout.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-100 mb-5">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Budget Guardrails</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Allocates funds accurately across stay, dining, and activities based on your strict limit.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-100 mb-5">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Adjustments</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Unexpected rain or closed venue? Swap out spots instantly without disrupting the rest of the day.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-800/80">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono text-zinc-500">01 / PROMPT</span>
            <h3 className="text-base font-semibold text-white">Input your parameters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Specify your destination, budget constraints, travel companions, and preferred pace.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-zinc-500">02 / OPTIMIZE</span>
            <h3 className="text-base font-semibold text-white">Automated curation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Algorithms query real-time opening hours, transit routes, and local highlights to assemble your itinerary.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-zinc-500">03 / EXECUTE</span>
            <h3 className="text-base font-semibold text-white">Export & go</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sync directly with Google Maps or Apple Wallet for offline navigation on the go.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-zinc-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
          Start building your next trip in minutes.
        </h2>
        <div className="mt-8 flex justify-center">
          <button className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg">
            <span>Create Itinerary Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-zinc-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Roam Technologies Inc.</p>
          <div className="flex gap-6 text-zinc-400">
            <a href="#" className="hover:text-zinc-200 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}