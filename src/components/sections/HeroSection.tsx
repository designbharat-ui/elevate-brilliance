import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBuilding from "@/assets/hero-building.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBuilding}
          alt="Modern skyscraper with premium elevator systems"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gold/5 rounded-full blur-2xl animate-float animation-delay-500" />

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse-gold" />
            <span className="text-gold text-sm font-medium">21+ Years of Excellence in Vertical Transportation</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in animation-delay-100">
            Elevating Your{" "}
            <span className="text-gradient-gold">World</span>
            <br />
            One Floor at a Time
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-fade-in animation-delay-200">
            Rising Star Elevator delivers premium vertical transportation solutions 
            with cutting-edge technology, safety-first design, and unmatched aesthetics 
            for residential, commercial, and industrial spaces.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
            <Button className="btn-gold text-lg py-6 px-10">
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-outline-gold text-lg py-6 px-10">
              View Our Projects
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-primary-foreground/10 animate-fade-in animation-delay-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold">IS</span>
              </div>
              <div className="text-primary-foreground/70 text-sm">
                <p className="font-medium text-primary-foreground">IS Code</p>
                <p>Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-xs">ISO</span>
              </div>
              <div className="text-primary-foreground/70 text-sm">
                <p className="font-medium text-primary-foreground">ISO 9001</p>
                <p>Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-xs">24/7</span>
              </div>
              <div className="text-primary-foreground/70 text-sm">
                <p className="font-medium text-primary-foreground">Support</p>
                <p>Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services" className="flex flex-col items-center gap-2 text-primary-foreground/50 hover:text-gold transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
