import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building, Briefcase, ShoppingBag, Hospital, Hotel, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const segments = [
  {
    icon: Building,
    title: "Residential Segment",
    subtitle: "Mid Rise, Low Rise, Villas & Penthouses",
    description: "This segment includes mid rise, low rise, villas/home & pent house. We offer technologically most advanced equipment, safety features included, keeping in view the application and specific requirement of the customers.",
    focus: "Special concentration on aesthetics as the application is for personal usage with varied aesthetic options to fulfill individual likings.",
    features: ["Home Elevators", "Villa Lifts", "Penthouse Elevators", "Low-rise Buildings"],
  },
  {
    icon: Briefcase,
    title: "Office Segment",
    subtitle: "Commercial & Corporate Buildings",
    description: "In this segment the equipment has to be designed for longer and continuous operational time and also the requirement could be for high inter floor traffic handling.",
    focus: "Offerings are in line with this general requirement and service support is provided keeping in view the operational time.",
    features: ["High-traffic Handling", "Continuous Operation", "Custom Aesthetics", "Service Support"],
  },
  {
    icon: ShoppingBag,
    title: "Retail Segment",
    subtitle: "Malls, Shopping Centers & Showrooms",
    description: "In this segment the requirement is for strategic and effective movement of the passengers. The equipment is designed to support and guide passenger flows.",
    focus: "Ensures no bottlenecks even during high footfall in the building which is very common in this segment.",
    features: ["Escalators", "Moving Walks", "Passenger Flow Design", "High Capacity"],
  },
  {
    icon: Hospital,
    title: "Medical Segment",
    subtitle: "Hospitals & Healthcare Facilities",
    description: "In this segment the requirements are changing as the rise of the hospitals is increasing. Thus the requirement is for extra smooth ride with optimum speed.",
    focus: "The equipment is supplied in line with the requirement keeping in view the IS requirements for medical facilities.",
    features: ["Stretcher Elevators", "Bed Elevators", "Extra Smooth Ride", "IS Compliant"],
  },
  {
    icon: Hotel,
    title: "Hotel Segment",
    subtitle: "Hospitality & Luxury Properties",
    description: "In this segment the requirement is more customized in terms of aesthetics while ride has to be extra smooth. The offering has been designed to ensure the same.",
    focus: "Live data LCD signalisations and entirely different signalisation requirements catered to hotel needs.",
    features: ["Premium Aesthetics", "LCD Signalisations", "Extra Smooth Ride", "Custom Design"],
  },
];

export default function BusinessStrategy() {
  return (
    <div className="min-h-screen">
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
                Market Strategy
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Business{" "}
                <span className="text-gradient-gold">Strategy</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Our new equipment business strategy is based on product differentiation 
                which revolves around market segmentation to serve every sector effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy Overview */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Product Differentiation Through{" "}
                <span className="text-gradient-gold">Market Segmentation</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Through product differentiation we cover all the major segments, tailoring our 
                solutions to meet the unique requirements of each industry vertical.
              </p>
              <div className="divider-gold mx-auto mt-8" />
            </div>

            {/* Segments */}
            <div className="space-y-12">
              {segments.map((segment, index) => (
                <div key={segment.title} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? '' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="bg-card border border-border rounded-lg p-8 card-hover">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center">
                          <segment.icon className="w-7 h-7 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-foreground">{segment.title}</h3>
                          <p className="text-gold text-sm">{segment.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{segment.description}</p>
                      <p className="text-foreground font-medium mb-6">{segment.focus}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {segment.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="text-9xl font-display font-bold text-muted/30">
                      {String(index + 1).padStart(2, '0')}
                    </div>
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
                Ready to Discuss Your{" "}
                <span className="text-gradient-gold">Project?</span>
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Our experts will help you choose the right elevator solution for your specific segment and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-gold">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="btn-outline-gold">
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
