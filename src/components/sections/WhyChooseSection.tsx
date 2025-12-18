import { Shield, Clock, Wrench, HeadphonesIcon, Award, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "IS Code compliant equipment with all necessary safety features including microprocessor controls and infrared curtains",
  },
  {
    icon: Clock,
    title: "21+ Years Experience",
    description: "Two decades of expertise in vertical transportation with thousands of successful installations",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "30+ trained mechanics and engineers dedicated to installation and after-sales service excellence",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock emergency support ensuring minimal downtime and maximum equipment uptime",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Top-tier components and aesthetic options customized for residential, commercial, and medical applications",
  },
  {
    icon: CheckCircle,
    title: "Competitive Pricing",
    description: "Quality equipment and services at affordable prices without compromising on standards",
  },
];

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, hsl(43 72% 52%) 1px, transparent 0)`,
               backgroundSize: '40px 40px',
             }} 
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            The Rising Star{" "}
            <span className="text-gradient-gold">Advantage</span>
          </h2>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-primary-foreground/70 text-lg">
            We combine decades of experience with cutting-edge technology to deliver 
            elevator solutions that exceed expectations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-lg border border-primary-foreground/10 hover:border-gold/50 hover:bg-primary-foreground/5 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-primary-foreground/80 mb-6 text-lg">
            Ready to experience the Rising Star difference?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-gold inline-flex items-center justify-center">
              Schedule Consultation
            </a>
            <a href="tel:+919999999999" className="btn-outline-gold inline-flex items-center justify-center">
              Call Now: +91 99999 99999
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
