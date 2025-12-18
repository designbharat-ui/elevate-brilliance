import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Building } from "lucide-react";

const projects = [
  { name: "Wave Infratech", location: "Noida", type: "Commercial", specs: "Multiple MRL Elevators", status: "Completed" },
  { name: "Parker Estate Developers", location: "Sonepat", type: "Mixed Use", specs: "1500Kgs MRL-Gearless, 3 stops", status: "Completed" },
  { name: "Gurgaon Residential", location: "Gurgaon", type: "Residential", specs: "408 Kgs, 4 stops", status: "Completed" },
  { name: "Faridabad Residential", location: "Faridabad", type: "Residential", specs: "408 Kgs, 4 stops", status: "Completed" },
  { name: "Delhi East Residential", location: "Delhi", type: "Residential", specs: "340 Kgs, 5 stops", status: "Completed" },
  { name: "Parker Residency Upgrade", location: "Sonepat", type: "Modernization", specs: "Complete system upgrade", status: "Completed" },
];

export default function Projects() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">Projects</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our <span className="text-gradient-gold">Activities</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">3000+ successful installations across India.</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.name} className="bg-card border border-border rounded-lg p-6 card-hover">
                  <div className="flex items-center gap-2 text-gold text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4">{project.specs}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{project.type}</span>
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full">{project.status}</span>
                  </div>
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
