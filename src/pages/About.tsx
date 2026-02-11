import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Award, Users, Target, Building, CheckCircle, Settings, ClipboardList } from "lucide-react";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";

const timeline = [
  { year: "2005", title: "Foundation", description: "Rising Star Elevator Pvt. Ltd. established by duo of highly qualified professionals" },
  { year: "2008", title: "First Major Project", description: "Completed 100+ residential elevator installations in Delhi NCR" },
  { year: "2012", title: "Expansion", description: "Extended services to commercial and hospital segments" },
  { year: "2015", title: "1000+ Installations", description: "Milestone of 1000+ successful elevator installations achieved" },
  { year: "2018", title: "ISO Certification", description: "Received ISO 9001 certification for quality management" },
  { year: "2020", title: "Escalator Division", description: "Launched escalator and moving walk solutions" },
  { year: "2024", title: "3000+ Installations", description: "Serving across India with 3000+ successful projects" },
];

const team = [
  { role: "Project Managers", count: 2, description: "Experienced professionals overseeing all projects" },
  { role: "Site Supervisors", count: 2, description: "Ensuring quality installation on-site" },
  { role: "Expert Mechanics", count: 30, description: "Trained technicians for installation & service" },
  { role: "Engineers", count: 5, description: "Technical design and support team" },
];

const businessAreas = [
  { icon: Building, title: "New Equipment Business", description: "Vertical Transportation — complete range of traction elevators & escalators with IS compliance and spares availability." },
  { icon: ClipboardList, title: "Consultancy Services", description: "Optimization evaluation, specification preparation, enquiry calling, technical comparatives, and design approval support." },
  { icon: Settings, title: "Project Management", description: "Completion schedules, agency coordination, site meetings, performance evaluation, and invoice clearance." },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Us - 21+ Years of Elevator Excellence"
        description="Learn about Rising Star Elevator, a team of qualified professionals with 21+ years experience in vertical transportation. 3000+ installations, 30+ expert mechanics."
        keywords="about rising star elevator, elevator company history, lift manufacturer India, elevator experts Delhi"
        canonicalUrl="/about"
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
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                21+ Years of{" "}
                <span className="text-gradient-gold">Excellence</span> in Vertical Transportation
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Rising Star Elevator Pvt. Ltd. — a growing organization managed by a team of 
                highly qualified technocrats with vast experience in vertical transportation and passenger flow.
              </p>
            </div>
          </div>
        </section>

        {/* The Company */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                  The Company
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Building Trust Through{" "}
                  <span className="text-gradient-gold">Quality & Service</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We are pleased to introduce Rising Star Elevator Pvt. Limited (RSEPL) as a growing 
                    organization in the field of Technical Services and Passenger Free Flow. The organization 
                    is managed by a team of highly qualified technocrats having vast experience, supported by 
                    an experienced team of engineers and technicians well trained in the field of installation 
                    and after sales services.
                  </p>
                  <p>
                    The complete team of RSEPL is committed to provide complete customer satisfaction. We are 
                    here to build & develop long term business associations with all our customers. Since we 
                    are a developing organization and value the customer services & satisfaction most, you would 
                    observe that we are competitively priced — indicative of the fact that we do not operate on 
                    hefty margins but offer Quality Equipment And Services at affordable prices.
                  </p>
                </div>
                <div className="divider-gold mt-8" />
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                  <img src={elevator1} alt="Luxury elevator interior" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-xl border-4 border-background">
                  <img src={elevator2} alt="Premium elevator design" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Values & Mission */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Guiding Principles
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vision, Values &{" "}
                <span className="text-gradient-gold">Mission</span>
              </h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Vision Card */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
                <h3 className="font-display text-xl font-bold text-gold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To change the expectation of the customers by raising their expectations to the next level 
                  of demand in terms of product, offerings and services. To offer trouble-free performance 
                  and unique aesthetics that ensure complete customer satisfaction.
                </p>
                <div className="bg-gold/10 border-l-4 border-gold px-4 py-2 rounded-r-lg">
                  <p className="text-gold font-display text-sm font-semibold italic">"Raising expectations to the next level"</p>
                </div>
              </div>

              {/* Values Card */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
                <h3 className="font-display text-xl font-bold text-gold mb-4">Our Values</h3>
                <ul className="space-y-3 text-muted-foreground leading-relaxed mb-4">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                    <span className="text-sm">Respectable, honest, ethical and transparent dealings with all customers and vendors.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                    <span className="text-sm">Dedication to social responsibility and strengthening social status.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                    <span className="text-sm">Environmental consciousness in all our actions.</span>
                  </li>
                </ul>
                <div className="bg-gold/10 border-l-4 border-gold px-4 py-2 rounded-r-lg">
                  <p className="text-gold font-display text-sm font-semibold italic">"Respect, Honesty, Ethics, Transparency"</p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
                <h3 className="font-display text-xl font-bold text-gold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To offer high quality product with touch & feel technology and to become feel good service 
                  provider till infinity. We supply equipment with specifications better than competitors, 
                  with pre-defined processes for installation and post-handover services.
                </p>
                <div className="bg-gold/10 border-l-4 border-gold px-4 py-2 rounded-r-lg">
                  <p className="text-gold font-display text-sm font-semibold italic">"Feel good service provider till infinity"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Expertise
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Three Pillars of{" "}
                <span className="text-gradient-gold">Our Business</span>
              </h2>
              <p className="text-muted-foreground">Covering three important areas of construction</p>
              <div className="divider-gold mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {businessAreas.map((area) => (
                <div key={area.title} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-gold/30 transition-all group">
                  <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <area.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Two Decades of{" "}
                <span className="text-gradient-gold">Growth</span>
              </h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
              <div className="space-y-8 md:space-y-0">
                {timeline.map((item, index) => (
                  <div key={item.year} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:mb-8`}>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <span className="text-gold font-display text-2xl font-bold">{item.year}</span>
                        <h3 className="font-display text-xl font-semibold text-foreground mt-2">{item.title}</h3>
                        <p className="text-muted-foreground mt-2">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full hidden md:block" />
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Team
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Expert Professionals at Your{" "}
                <span className="text-gradient-gold">Service</span>
              </h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.role} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-8 text-center hover:border-gold/50 transition-colors">
                  <div className="stat-number mb-2">{member.count}+</div>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">{member.role}</h3>
                  <p className="text-primary-foreground/70 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Certifications
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quality{" "}
                <span className="text-gradient-gold">Assured</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {["IS Code Compliant", "ISO 9001:2015", "BIS Certified", "National Building Code"].map((cert) => (
                <div key={cert} className="bg-card border border-border rounded-lg px-8 py-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-gold" />
                  <span className="font-medium text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
