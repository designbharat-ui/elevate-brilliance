import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, CheckCircle, ArrowRight, Shield, Wrench, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const offerings = [
  {
    title: "Residential Elevators",
    description: "Home elevators, villa elevators for personal use",
    specs: "4-24 passengers, speeds 0.63-1.5 m/s",
  },
  {
    title: "Office Elevators",
    description: "Commercial building vertical transportation",
    specs: "High traffic, continuous operation",
  },
  {
    title: "Service/Goods Elevators",
    description: "Heavy-duty freight and goods movement",
    specs: "500-4000 Kgs, speeds up to 0.5 m/s",
  },
  {
    title: "Hospital Elevators",
    description: "Stretcher and bed elevators",
    specs: "15-26 pax, speeds 0.5-1.5 m/s",
  },
  {
    title: "Escalators",
    description: "Moving stairs for public spaces",
    specs: "Rise <12m, speed <0.5 m/s",
  },
];

const strengths = [
  { icon: Shield, title: "IS Compliance", description: "Car sizes completely IS compliant with all safety aspects" },
  { icon: Package, title: "Spares Availability", description: "Ensured high uptime with readily available spare parts" },
  { icon: Wrench, title: "Service Portfolio", description: "Post-handover service portfolio for installed equipment" },
  { icon: Clock, title: "Complete Solutions", description: "Supply, installation, testing, and commissioning" },
];

export default function NewEquipment() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="w-20 h-20 bg-gold/20 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 text-gold" />
              </div>
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Core Business
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                New Equipment{" "}
                <span className="text-gradient-gold">Business</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Complete range of traction elevators and escalators covering all segments 
                of vertical transportation needs.
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="max-w-4xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Vertical Transportation{" "}
                <span className="text-gradient-gold">Solutions</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                The company covers supply, installation, testing and commissioning of complete 
                range of traction elevators and escalators. The elevator range includes residential 
                (including but not limited to home elevators & villa elevators), office, 
                service/goods, and hospital elevators.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                One of the strengths of RSEPL is that the car sizes offered are completely IS 
                compliant and the elevators conform to all the aspects of the relevant Indian 
                Standards/National Building Codes including the relevant safety aspects.
              </p>
              <div className="divider-gold mt-8" />
            </div>
          </div>
        </section>

        {/* Product Range */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Product Range
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our{" "}
                <span className="text-gradient-gold">Offerings</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-lg p-6 card-hover">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-gold text-sm font-medium">{item.specs}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Strengths */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Our{" "}
                <span className="text-gradient-gold">Strengths</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {strengths.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Escalator Info */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                  Escalators
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Imported Escalators for{" "}
                  <span className="text-gradient-gold">Indian Conditions</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  The escalators offered are completely imported, designed and suited for Indian 
                  conditions, ensuring durability and performance in various environments.
                </p>
                <ul className="space-y-3">
                  {["Rise up to 12m", "Speed up to 0.5 m/s", "Step width: 600/800/1000mm", "Indoor & Outdoor applications"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-12 text-center">
                <Building2 className="w-32 h-32 text-gold/30 mx-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Discuss Your{" "}
              <span className="text-gradient-gold">Project?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us for complete specifications and customized solutions for your building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/query" className="btn-gold inline-flex items-center justify-center">
                Get Quotation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/products" className="btn-outline-gold inline-flex items-center justify-center">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
