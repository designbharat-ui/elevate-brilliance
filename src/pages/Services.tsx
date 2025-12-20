import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Wrench, Settings, PenTool, RotateCcw, FileText, ArrowRight, Clock, Shield, Award } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "AMC Services",
    slug: "amc",
    description: "Annual Maintenance Contracts for comprehensive elevator care with scheduled maintenance, emergency support, and priority service.",
    features: ["Scheduled Maintenance", "Emergency Support", "Spare Parts Included", "24/7 Helpline"],
  },
  {
    icon: Wrench,
    title: "Lift Maintenance",
    slug: "maintenance",
    description: "Regular maintenance services to keep your elevators running smoothly, safely, and efficiently throughout their lifespan.",
    features: ["Preventive Maintenance", "Safety Inspections", "Performance Checks", "Lubrication Services"],
  },
  {
    icon: RotateCcw,
    title: "Repair Services",
    slug: "repair",
    description: "Quick and reliable repair services for all types of elevators with genuine spare parts and expert technicians.",
    features: ["Quick Response", "Genuine Parts", "Expert Technicians", "All Brands Serviced"],
  },
  {
    icon: Settings,
    title: "Modernization",
    slug: "modernization",
    description: "Upgrade your existing elevators with modern technology, improved aesthetics, and enhanced safety features.",
    features: ["Control System Upgrade", "Cabin Renovation", "Safety Enhancement", "Energy Efficiency"],
  },
  {
    icon: PenTool,
    title: "Customization",
    slug: "customization",
    description: "Bespoke elevator solutions tailored to your specific requirements, aesthetics, and building architecture.",
    features: ["Custom Designs", "Special Finishes", "Unique Signalization", "Tailored Solutions"],
  },
];

const whyChoose = [
  { icon: Clock, title: "24/7 Support", description: "Round-the-clock emergency assistance" },
  { icon: Shield, title: "Safety First", description: "IS Code compliant services" },
  { icon: Award, title: "Expert Team", description: "30+ trained technicians" },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Elevator Services - AMC, Maintenance, Repair & Modernization"
        description="Complete elevator services including AMC, preventive maintenance, repair, modernization, and customization. 24/7 emergency support with expert technicians."
        keywords="elevator AMC, lift maintenance, elevator repair, lift modernization, elevator service India, lift customization"
        canonicalUrl="/services"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-gold/30 to-transparent" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Services
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Complete Elevator{" "}
                <span className="text-gradient-gold">Services</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                From installation to maintenance, modernization to repair — 
                we provide end-to-end elevator services to keep your equipment running at peak performance.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-card border border-border rounded-lg p-8 card-hover"
                >
                  <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <service.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Why Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Service{" "}
                <span className="text-gradient-gold">Excellence</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChoose.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Need{" "}
              <span className="text-gradient-gold">Service?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free inspection and service quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-gold inline-flex items-center justify-center">
                Schedule Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a href="tel:+919999999999" className="btn-outline-gold inline-flex items-center justify-center">
                Emergency: +91 99999 99999
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
