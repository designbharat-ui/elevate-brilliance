import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";
import heroGallery from "@/assets/hero-gallery.jpg";
import { Play } from "lucide-react";

const images = [elevator1, elevator2, elevator3, elevator4, elevator5, elevator1, elevator2, elevator3];

const videos = [
  { src: "/videos/elevator-video-1.mp4", title: "Elevator Installation 1" },
  { src: "/videos/elevator-video-2.mp4", title: "Elevator Installation 2" },
  { src: "/videos/elevator-video-3.mp4", title: "Elevator Project 3" },
  { src: "/videos/elevator-video-4.mp4", title: "Elevator Project 4" },
  { src: "/videos/elevator-video-5.mp4", title: "Elevator Demo 5" },
  { src: "/videos/elevator-video-6.mp4", title: "Elevator Demo 6" },
  { src: "/videos/elevator-video-7.mp4", title: "Elevator Showcase 7" },
  { src: "/videos/elevator-video-8.mp4", title: "Elevator Showcase 8" },
];

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
        title="Gallery - Elevator Installation Photos & Videos"
        description="Explore Rising Star Elevator's project gallery featuring premium elevator installations, modern lift designs, and escalator projects across Delhi NCR and India."
        keywords="elevator gallery, lift installation photos, elevator design India, premium lift images, escalator photos, Rising Star projects, elevator videos"
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
              <p className="text-primary-foreground/80 text-lg">Explore our premium elevator installations, designs, and project videos.</p>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">Photo Gallery</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-gradient-gold">Installations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Browse through our collection of premium elevator installations across India.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                  <img src={img} alt={`Elevator Project ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Gallery Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">Video Gallery</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Watch Our <span className="text-gradient-gold">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Experience our elevator installations in action through customer videos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card group">
                  <div className="aspect-video relative">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      poster=""
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Play className="w-12 h-12 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{video.title}</h3>
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
