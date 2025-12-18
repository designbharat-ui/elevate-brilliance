import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Clock, Shield, Award, Wrench, Settings, PenTool, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const servicesData: Record<string, {
  name: string;
  tagline: string;
  icon: typeof Wrench;
  description: string;
  benefits: string[];
  includes: string[];
  process: { step: string; title: string; description: string }[];
}> = {
  "amc": {
    name: "AMC Services",
    tagline: "Annual Maintenance Contracts",
    icon: FileText,
    description: "Our Annual Maintenance Contracts provide comprehensive elevator care with scheduled maintenance, emergency support, and priority service to ensure your elevators run smoothly year-round.",
    benefits: [
      "Reduced breakdown frequency",
      "Extended equipment lifespan",
      "Priority emergency response",
      "Cost-effective maintenance",
      "Genuine spare parts",
      "Compliance with safety standards",
    ],
    includes: [
      "Monthly preventive maintenance visits",
      "24/7 emergency support",
      "Free emergency call-outs",
      "Routine safety inspections",
      "Lubrication and adjustments",
      "Minor repairs included",
      "Annual comprehensive inspection",
      "Performance reports",
    ],
    process: [
      { step: "01", title: "Site Survey", description: "Our technicians assess your elevator condition and requirements" },
      { step: "02", title: "Custom Plan", description: "We create a maintenance plan tailored to your needs" },
      { step: "03", title: "Contract Signing", description: "Transparent pricing with clear terms and SLAs" },
      { step: "04", title: "Regular Service", description: "Scheduled maintenance visits as per the agreed plan" },
    ],
  },
  "maintenance": {
    name: "Lift Maintenance",
    tagline: "Regular Preventive Maintenance",
    icon: Wrench,
    description: "Our regular maintenance services keep your elevators running smoothly, safely, and efficiently throughout their lifespan with preventive care and scheduled inspections.",
    benefits: [
      "Improved reliability",
      "Enhanced safety",
      "Reduced repair costs",
      "Better ride quality",
      "Energy efficiency",
      "Compliance assurance",
    ],
    includes: [
      "Mechanical system inspection",
      "Electrical system check",
      "Safety device testing",
      "Lubrication of moving parts",
      "Door operation adjustment",
      "Control panel inspection",
      "Ride quality assessment",
      "Cleaning of components",
    ],
    process: [
      { step: "01", title: "Schedule", description: "Book a maintenance visit at your convenient time" },
      { step: "02", title: "Inspection", description: "Thorough inspection of all elevator components" },
      { step: "03", title: "Service", description: "Preventive maintenance and minor adjustments" },
      { step: "04", title: "Report", description: "Detailed service report with recommendations" },
    ],
  },
  "repair": {
    name: "Repair Services",
    tagline: "Quick & Reliable Repairs",
    icon: RotateCcw,
    description: "Our expert technicians provide quick and reliable repair services for all types of elevators with genuine spare parts and minimal downtime.",
    benefits: [
      "Quick response time",
      "Expert technicians",
      "Genuine spare parts",
      "All brands serviced",
      "Warranty on repairs",
      "Transparent pricing",
    ],
    includes: [
      "Fault diagnosis",
      "Component replacement",
      "Control system repairs",
      "Door mechanism repairs",
      "Motor and drive repairs",
      "Safety device repairs",
      "Emergency rescues",
      "Post-repair testing",
    ],
    process: [
      { step: "01", title: "Report Issue", description: "Call our helpline or submit online request" },
      { step: "02", title: "Diagnosis", description: "Technician arrives and diagnoses the problem" },
      { step: "03", title: "Quote", description: "Transparent quote for parts and labor" },
      { step: "04", title: "Repair", description: "Swift repair with quality parts" },
    ],
  },
  "modernization": {
    name: "Elevator Modernization",
    tagline: "Upgrade Your Elevators",
    icon: Settings,
    description: "Breathe new life into your existing elevators with modern technology, improved aesthetics, enhanced safety features, and energy-efficient components.",
    benefits: [
      "Improved performance",
      "Enhanced safety",
      "Modern aesthetics",
      "Energy savings",
      "Increased property value",
      "Extended lifespan",
    ],
    includes: [
      "Control system upgrade",
      "Door operator replacement",
      "Cabin interior renovation",
      "New signalization systems",
      "LED lighting upgrade",
      "Safety feature enhancement",
      "VVVF drive installation",
      "Emergency rescue device",
    ],
    process: [
      { step: "01", title: "Assessment", description: "Evaluate current elevator condition and needs" },
      { step: "02", title: "Proposal", description: "Customized modernization plan and quote" },
      { step: "03", title: "Execution", description: "Phased modernization with minimal disruption" },
      { step: "04", title: "Handover", description: "Testing, training, and warranty handover" },
    ],
  },
  "customization": {
    name: "Customization Solutions",
    tagline: "Bespoke Elevator Designs",
    icon: PenTool,
    description: "Create unique elevator experiences with our customization services, from premium cabin interiors to specialized signalization and control features.",
    benefits: [
      "Unique aesthetics",
      "Brand integration",
      "Premium materials",
      "Custom features",
      "Architectural harmony",
      "Personalized experience",
    ],
    includes: [
      "Custom cabin designs",
      "Premium flooring options",
      "Designer wall panels",
      "Custom lighting solutions",
      "Branded signalization",
      "Special finishes",
      "Glass cabin options",
      "Custom COP/LOP designs",
    ],
    process: [
      { step: "01", title: "Consultation", description: "Discuss your vision and requirements" },
      { step: "02", title: "Design", description: "Create custom designs and renderings" },
      { step: "03", title: "Approval", description: "Review and approve final designs" },
      { step: "04", title: "Installation", description: "Expert installation of custom elements" },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData[slug || ""] || servicesData["amc"];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="bg-secondary py-4">
          <div className="container">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/services" className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Services
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{service.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="w-20 h-20 bg-gold/20 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-10 h-10 text-gold" />
              </div>
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                {service.tagline}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {service.name}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits & Includes */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Key <span className="text-gradient-gold">Benefits</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 bg-secondary rounded-lg p-4">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  What's <span className="text-gradient-gold">Included</span>
                </h2>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Process
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                How It <span className="text-gradient-gold">Works</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {service.process.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < service.process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                  )}
                  <div className="bg-card border border-border rounded-lg p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-display text-2xl font-bold text-gold">{step.step}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Get{" "}
                <span className="text-gradient-gold">Started?</span>
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Contact us today for a free consultation and quote for {service.name.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/query" className="btn-gold inline-flex items-center justify-center">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a href="tel:+919999999999" className="btn-outline-gold inline-flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
