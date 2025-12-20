import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";
import heroGallery from "@/assets/hero-gallery.jpg";

const images = [elevator1, elevator2, elevator3, elevator4, elevator5, elevator1, elevator2, elevator3];

export default function Gallery() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Rising Star Elevator Project Gallery",
    "description": "View our premium elevator installations and designs across India.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Gallery - Elevator Installation Photos"
        description="Explore Rising Star Elevator's project gallery featuring premium elevator installations, modern lift designs, and escalator projects across Delhi NCR and India."
        keywords="elevator gallery, lift installation photos, elevator design India, premium lift images, escalator photos, Rising Star projects"
        canonicalUrl="/gallery"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="absolute inset-0">
            <img src={heroGallery} alt="Gallery Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">Gallery</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our <span className="text-gradient-gold">Work</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">Explore our premium elevator installations and designs.</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <img src={img} alt={`Elevator Project ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
