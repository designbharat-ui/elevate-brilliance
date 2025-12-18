import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Award, Users, Target, Building, Calendar, CheckCircle } from "lucide-react";
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

const values = [
  { icon: Award, title: "Excellence", description: "Committed to delivering the highest quality in every project" },
  { icon: Users, title: "Customer Focus", description: "Your satisfaction is our primary business objective" },
  { icon: Target, title: "Safety First", description: "Zero tolerance approach to safety procedures" },
  { icon: CheckCircle, title: "Integrity", description: "Honest, ethical, and transparent dealings" },
];

export default function About() {
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
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                21+ Years of{" "}
                <span className="text-gradient-gold">Excellence</span> in Vertical Transportation
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Rising Star Elevator Pvt. Ltd. is a growing organization managed by a team of 
                highly qualified technocrats with vast experience in vertical transportation and passenger flow.
              </p>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                  Our Story
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Founded by Visionaries in{" "}
                  <span className="text-gradient-gold">People Movement</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RSEPL is founded by duo highly qualified professionals, having vast experience 
                    in the field of people movement. They have non-conservative, innovative, 
                    work-as-team style of management and are very sensitive about the product 
                    offering and above all the post-order service expectations of the customers.
                  </p>
                  <p>
                    They follow zero tolerance approach to failure on the commitments made to 
                    the customers on account of service commitments and safety procedures to be 
                    followed during installation.
                  </p>
                  <p>
                    The organization is supported by an experienced team of engineers and technicians, 
                    well trained in the field of installation and after sales services. The complete 
                    team of RSEPL is committed to provide complete customer satisfaction.
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
              {/* Timeline Line */}
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

        {/* Values */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Our Values
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives{" "}
                <span className="text-gradient-gold">Us</span>
              </h2>
              <div className="divider-gold mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center group">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                    <value.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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
