import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 21, suffix: "+", label: "Years of Excellence", description: "Industry Experience" },
  { value: 3000, suffix: "+", label: "Installations", description: "Successful Projects" },
  { value: 30, suffix: "+", label: "Expert Mechanics", description: "Trained Professionals" },
  { value: 100, suffix: "%", label: "Safety Compliance", description: "IS Code Standards" },
];

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232b7a9e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }} 
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Our Achievements
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Numbers That Speak{" "}
            <span className="text-gradient-gold">Trust</span>
          </h2>
          <p className="text-primary-foreground/70">
            Two decades of commitment to excellence in vertical transportation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-lg bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:border-gold/50 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="stat-number mb-2">
                <CountUp target={stat.value} />
                {stat.suffix}
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">
                {stat.label}
              </h3>
              <p className="text-primary-foreground/60 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* People Flow Quote */}
        <div className="mt-16 text-center">
          <blockquote className="font-display text-2xl md:text-3xl text-primary-foreground/90 italic max-w-4xl mx-auto">
            "We are a solution provider committed to safe and feel-good transfer 
            of people & material, efficiently and economically."
          </blockquote>
          <div className="divider-gold mx-auto mt-6" />
          <p className="mt-4 text-gold font-medium">The People Flow Philosophy</p>
        </div>
      </div>
    </section>
  );
}
