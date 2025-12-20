import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const sitemapData = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Vision, Mission & Values", path: "/vision-mission" },
      { name: "Business Strategy", path: "/business-strategy" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "All Products", path: "/products" },
      { name: "Home Lift", path: "/products/home-lift" },
      { name: "Passenger Lift", path: "/products/passenger-lift" },
      { name: "Hospital Lift", path: "/products/hospital-lift" },
      { name: "Capsule Lift", path: "/products/capsule-lift" },
      { name: "MRL Lift", path: "/products/mrl-lift" },
      { name: "Freight/Goods Lift", path: "/products/freight-lift" },
      { name: "High Rise Elevators", path: "/products/high-rise" },
      { name: "Dumb Waiter", path: "/products/dumb-waiter" },
      { name: "Escalator", path: "/products/escalator" },
      { name: "Moving Walk", path: "/products/moving-walk" },
      { name: "Automobile Elevator", path: "/products/automobile-elevator" },
      { name: "Gearless Home Lift", path: "/products/gearless-home-lift" },
      { name: "Hydraulic Home Lift", path: "/products/hydraulic-home-lift" },
      { name: "Product Features", path: "/product-features" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "All Services", path: "/services" },
      { name: "AMC Services", path: "/services/amc" },
      { name: "Lift Maintenance", path: "/services/maintenance" },
      { name: "Repair Services", path: "/services/repair" },
      { name: "Elevator Modernization", path: "/services/modernization" },
      { name: "Customization Solutions", path: "/services/customization" },
      { name: "New Equipment Business", path: "/new-equipment" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Gallery", path: "/gallery" },
      { name: "Projects", path: "/projects" },
      { name: "Blog", path: "/blog" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Sitemap"
        description="Complete sitemap of Rising Star Elevator website. Navigate to all pages including products, services, and resources."
        keywords="sitemap, rising star elevator, navigation, website map"
        canonicalUrl="/sitemap"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
                Navigation
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Site<span className="text-gradient-gold">map</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Find all pages of our website organized for easy navigation.
              </p>
            </div>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sitemapData.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors group"
                        >
                          <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* XML Sitemap Reference */}
        <section className="section-padding bg-secondary">
          <div className="container text-center">
            <p className="text-muted-foreground">
              Looking for the XML sitemap for search engines?{" "}
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                View sitemap.xml
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
