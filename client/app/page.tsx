import Link from "next/link";
import { Sparkles, MapPin, Calendar, ArrowRight, Plane, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// Reusable UI Components (inline for simplicity)
const Button = ({ 
  children, 
  variant = "primary", 
  className = "",
  href 
}: { 
  children: React.ReactNode; 
  variant?: "primary" | "secondary" | "outline"; 
  className?: string;
  href?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/25",
    secondary: "bg-accent-600 text-white hover:bg-accent-700 shadow-lg shadow-accent-500/25",
    outline: "border border-border bg-white text-slate-700 hover:bg-surface-muted",
  };

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon:  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; title: string; description: string }) => (
  <div className="group p-6 rounded-2xl border border-border bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
      <Icon className="w-6 h-6 text-brand-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Plane className="w-6 h-6 text-brand-600" />
            <span>AI Travel<span className="text-brand-600">Planner</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-brand-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-brand-600 transition-colors">How it Works</Link>
            <Link href="/auth/signin" className="hover:text-brand-600 transition-colors">Sign In</Link>
            <Button href="/auth/signup" variant="primary" className="!px-4 !py-2 !text-sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-8">
            <Sparkles className="w-3 h-3" />
            AI-Powered Itineraries
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Plan your dream trip in <br />
            <span className="text-gradient">seconds, not days.</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tell us where you want to go and what you love. Our AI builds a complete, 
            bookable itinerary tailored to your budget, pace, and interests.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/auth/signup" variant="primary" className="w-full sm:w-auto text-lg">
              Start Planning Free <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="#demo" variant="outline" className="w-full sm:w-auto text-lg">
              See How It Works
            </Button>
          </div>

          {/* Social Proof / Trust */}
          <p className="mt-12 text-sm text-slate-400">
            Trusted by 10,000+ travelers worldwide • No credit card required
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-surface-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to travel smarter</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Stop juggling 20 browser tabs. Get flights, hotels, activities, and restaurants in one cohesive plan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Sparkles}
              title="Instant AI Generation"
              description="Describe your ideal vacation in plain English. Our model understands context, preferences, and seasonal trends."
            />
            <FeatureCard 
              icon={MapPin}
              title="Smart Routing"
              description="Optimized daily schedules that minimize travel time and maximize exploration based on real-time geography."
            />
            <FeatureCard 
              icon={Calendar}
              title="Live Availability"
              description="Check real-time pricing and availability for hotels and tours directly within your generated itinerary."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden bg-brand-600 px-8 py-20 text-center">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for your next adventure?</h2>
            <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of travelers who have saved hours of planning time. Your personalized itinerary is one click away.
            </p>
            <Button 
              href="/auth/signup" 
              className="!bg-white !text-brand-700 hover:!bg-brand-50 !shadow-none text-lg px-8"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Plane className="w-5 h-5 text-brand-600" />
            <span>AI Travel Planner</span>
          </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} AI Travel Planner. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-brand-600">Privacy</Link>
            <Link href="#" className="hover:text-brand-600">Terms</Link>
            <Link href="#" className="hover:text-brand-600">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}