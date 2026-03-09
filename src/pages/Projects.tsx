import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { MapPin } from "lucide-react";
import heroProjects from "@/assets/hero-projects.jpg";
import { usePageContent } from "@/hooks/usePageContent";

const defaultProjects = [
  { name: "Wave Infratech", location: "Noida", type: "Commercial", specs: "Multiple MRL Elevators", status: "Completed" },
  { name: "Parker Estate Developers", location: "Sonepat", type: "Mixed Use", specs: "1500Kgs MRL-Gearless, 3 stops", status: "Completed" },
  { name: "Gurgaon Residential", location: "Gurgaon", type: "Residential", specs: "408 Kgs, 4 stops", status: "Completed" },
  { name: "Faridabad Residential", location: "Faridabad", type: "Residential", specs: "408 Kgs, 4 stops", status: "Completed" },
  { name: "Delhi East Residential", location: "Delhi", type: "Residential", specs: "340 Kgs, 5 stops", status: "Completed" },
  { name: "Parker Residency Upgrade", location: "Sonepat", type: "Modernization", specs: "Complete system upgrade", status: "Completed" },
];

export default function Projects() {
  const { page, getField, getSectionFields } = usePageContent("projects");

  const heroLabel = getField("hero", "label", "Projects");
  const heroTitle = getField("hero", "title", "Our Activities");
  const heroDesc = getField("hero", "description", "3000+ successful installations across India.");

  const projectsFields = getSectionFields("projects");
  const projects = projectsFields?.items || defaultProjects;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Rising Star Elevator Projects",
    "description": "3000+ successful elevator installations across India including Wave Infratech, Parker Estate and more.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Projects - 3000+ Successful Installations"}
        description={page?.meta_description || "View Rising Star Elevator's completed projects including Wave Infratech Noida, Parker Estate Sonepat, and 3000+ successful elevator installations across Delhi NCR."}
        keywords="elevator projects India, lift installation Delhi, elevator Noida, lift Gurgaon, commercial elevator projects, residential lift installation"
        canonicalUrl="/projects"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="absolute inset-0">
            <img src={heroProjects} alt="Projects Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{heroLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {heroTitle.includes("Activities") ? <>Our <span className="text-gradient-gold">Activities</span></> : heroTitle}
              </h1>
              <p className="text-primary-foreground/80 text-lg">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
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
