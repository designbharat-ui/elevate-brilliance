import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Eye, Heart, Target, ArrowRight } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";

const sections = [
  {
    icon: Eye,
    title: "Our Vision",
    content: "To change the expectation of the customers by raising their expectations to the next level of demand in terms of product, offerings and services. To offer the product and services that has trouble free performance, the features that fulfill expectations of the customers in that segment and unique aesthetics that boost about the culture in which we prevail and ensure complete customer satisfaction.",
    highlight: "Raising expectations to the next level",
  },
  {
    icon: Heart,
    title: "Our Values",
    content: "Most respectable, honest, ethical and transparent pattern of dealing with all the customers and vendors associated with RSEPL. Clear understanding and dedication to our social responsibility and continuous working towards strengthening social status of our country. To take environment into account in all our actions in terms of product offering, providing services, maintaining all our offices.",
    highlight: "Respect, Honesty, Ethics, Transparency",
  },
  {
    icon: Target,
    title: "Our Mission",
    content: "To offer high quality product with touch & feel technology and to become feel good service provider till infinity. While we will be supplying the equipment that will have specifications better than what will be offered by our competitors in that segment, the quality execution will ensure high equipment performance.",
    highlight: "Feel good service provider till infinity",
  },
];

const commitments = [
  "Trouble-free performance",
  "Customer-centric approach",
  "Environmental responsibility",
  "Quality execution",
  "Pre-defined installation process",
  "Post-order service excellence",
];

export default function VisionMission() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Vision, Mission & Values - Rising Star Elevator",
    "description": "Our guiding principles that drive us to deliver excellence in every elevator and escalator project.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Vision, Mission & Values"
        description="Discover Rising Star Elevator's vision, mission, and core values. We are committed to ethical, transparent business practices and customer satisfaction in elevator solutions."
        keywords="elevator company vision, lift company mission, elevator values, Rising Star Elevator mission, ethical elevator company"
        canonicalUrl="/vision-mission"
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroAbout} alt="Vision Mission Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                The Company
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Vision, Mission &{" "}
                <span className="text-gradient-gold">Values</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Our guiding principles that drive us to deliver excellence in every elevator and escalator project.
              </p>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="space-y-16">
              {sections.map((section, index) => (
                <div key={section.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center">
                        <section.icon className="w-7 h-7 text-gold" />
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {section.content}
                    </p>
                    <div className="bg-gold/10 border-l-4 border-gold px-6 py-4 rounded-r-lg">
                      <p className="text-gold font-display text-xl font-semibold italic">
                        "{section.highlight}"
                      </p>
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-lg p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <section.icon className="w-24 h-24 text-gold/30 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Commitments */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Promise
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                What We{" "}
                <span className="text-gradient-gold">Commit</span>
              </h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {commitments.map((commitment) => (
                <div key={commitment} className="flex items-center gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg px-6 py-4 hover:border-gold/50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-primary-foreground font-medium">{commitment}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
                "We are a solution provider who are sensitive to safe and feel good transfer of man & material, efficiently and economically."
              </blockquote>
              <div className="divider-gold mx-auto mb-4" />
              <p className="text-gold font-medium">The People Flow Philosophy</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
