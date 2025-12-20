import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle, Shield, Cpu, Eye, Gauge, Phone, Lightbulb, AlertTriangle, Radio } from "lucide-react";
import heroProducts from "@/assets/hero-products.jpg";

const features = [
  {
    icon: Cpu,
    number: "01",
    title: "Microprocessor Based Control",
    description: "AA ride comfort and leveling accuracy better than ±5mm for smooth operation.",
  },
  {
    icon: Eye,
    number: "02",
    title: "Full Height Infrared Curtain",
    description: "Multi-beam infrared curtain as door safety for safe people transfer at landings.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Direction & Position Display",
    description: "Display in the car and at all landings with options of touch screen signalizations.",
  },
  {
    icon: Shield,
    number: "04",
    title: "Sheet Steel Car Construction",
    description: "Car constructed out of sheet steel with ventilation louvers and options of full height glass doors/vision panels.",
  },
  {
    icon: Lightbulb,
    number: "05",
    title: "Automatic Phase Correction",
    description: "Automatic phase correction device for power stability and protection.",
  },
  {
    icon: Gauge,
    number: "06",
    title: "Load Weighing Device",
    description: "Accurate load measurement to prevent overloading and ensure safe operation.",
  },
  {
    icon: CheckCircle,
    number: "07",
    title: "Door Open/Close Buttons",
    description: "Convenient door control buttons in the car for user convenience.",
  },
  {
    icon: AlertTriangle,
    number: "08",
    title: "Alarm Button",
    description: "Emergency alarm button in the car for immediate assistance.",
  },
  {
    icon: Lightbulb,
    number: "09",
    title: "Light & Fan Supervision",
    description: "Continuous monitoring and control of car lighting and ventilation.",
  },
  {
    icon: Radio,
    number: "10",
    title: "Press & Speak Intercom",
    description: "Two-way communication system in the car for emergency contact.",
  },
];

const safetyStandards = [
  { code: "IS 14665", description: "Indian Standard for Lifts and Escalators" },
  { code: "EN 81", description: "European Standard for Elevator Safety" },
  { code: "NBC", description: "National Building Code Compliance" },
  { code: "ISO 9001", description: "Quality Management Certification" },
];

export default function ProductFeatures() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Elevator Safety Features - Rising Star Elevator",
    "description": "10 essential safety features in our elevators including microprocessor control, infrared curtain, and intercom systems.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Product Features - 10 Essential Safety Aspects"
        description="Discover 10 essential elevator safety features including microprocessor control, infrared curtain, load weighing device, and intercom systems. IS 14665 & EN 81 compliant."
        keywords="elevator safety features, lift safety, microprocessor elevator, infrared door sensor, IS 14665, EN 81 compliant elevator India"
        canonicalUrl="/product-features"
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroProducts} alt="Product Features Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Safety & Technology
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Product{" "}
                <span className="text-gradient-gold">Features</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                We value passenger safety more than anything else. Our equipment is designed 
                to ensure complete safety compliance with all necessary features incorporated.
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We would mention here that we intend to sensitize the end users that an elevator 
                is an equipment that has to transfer living beings and thus must be equipped with 
                all the necessary safeties to ensure safe passenger transfer. Since we value 
                passenger safety more than anything else, our equipment is designed to ensure 
                the same complying to the relevant IS codes and all the necessary safety features 
                incorporated in the equipment.
              </p>
              <div className="divider-gold mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Safety Features
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                10 Essential Safety{" "}
                <span className="text-gradient-gold">Aspects</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.number} className="bg-card border border-border rounded-lg p-6 card-hover group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <feature.icon className="w-7 h-7 text-gold" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gold font-display text-sm font-bold">{feature.number}</span>
                        <h3 className="font-display text-xl font-semibold text-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Compliance
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Safety{" "}
                <span className="text-gradient-gold">Standards</span>
              </h2>
              <p className="text-primary-foreground/70">
                All our equipment complies with relevant Indian and international safety standards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyStandards.map((standard) => (
                <div key={standard.code} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 text-center hover:border-gold/50 transition-colors">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">{standard.code}</h3>
                  <p className="text-primary-foreground/70 text-sm">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Want to Learn More About Our{" "}
              <span className="text-gradient-gold">Safety Features?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our experts for detailed technical documentation and safety certifications.
            </p>
            <a href="tel:+919999999999" className="btn-gold inline-flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Talk to Expert
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
