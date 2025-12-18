import { Building2, Wrench, ClipboardList, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "New Equipment Business",
    description: "Complete range of traction elevators & escalators with IS compliance, covering residential, office, hospital, and service/goods applications.",
    features: ["IS Code Compliant", "Full Installation", "Testing & Commissioning"],
    href: "/services/new-equipment",
  },
  {
    icon: ClipboardList,
    title: "Consultancy Services",
    description: "Expert optimization evaluation, specification preparation, technical comparatives, and design approval support for your projects.",
    features: ["Optimization Evaluation", "Technical Comparatives", "Design Support"],
    href: "/services/consultancy",
  },
  {
    icon: Wrench,
    title: "Project Management",
    description: "End-to-end project coordination including completion schedules, site meetings, performance evaluation, and invoice clearance.",
    features: ["Schedule Management", "Site Coordination", "Quality Control"],
    href: "/services/project-management",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-gold/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Our Core Business
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Vertical Transportation{" "}
            <span className="text-gradient-gold">Solutions</span>
          </h2>
          <div className="divider-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Rising Star Elevator covers three important areas of the construction industry, 
            delivering excellence in every vertical mobility challenge.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-lg p-8 card-hover relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors relative z-10">
                <service.icon className="w-8 h-8 text-gold" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 relative z-10">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 relative z-10">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 relative z-10">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={service.href}
                className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all relative z-10"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
