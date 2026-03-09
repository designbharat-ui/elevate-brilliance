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
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { usePageContent } from "@/hooks/usePageContent";

const defaultImages = [elevator1, elevator2, elevator3, elevator4, elevator5, elevator1, elevator2, elevator3];

const defaultVideos = [
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
  const { page, getField } = usePageContent("gallery");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroLabel = getField("hero", "label", "Gallery");
  const heroTitle = getField("hero", "title", "Our Work");
  const heroDescription = getField("hero", "description", "Explore our premium elevator installations, designs, and project videos.");
  const photoLabel = getField("photos", "label", "Photo Gallery");
  const photoTitle = getField("photos", "title", "Our Installations");
  const photoDesc = getField("photos", "description", "Browse through our collection of premium elevator installations across India.");
  const videoLabel = getField("videos", "label", "Video Gallery");
  const videoTitle = getField("videos", "title", "Watch Our Projects");
  const videoDesc = getField("videos", "description", "Experience our elevator installations in action through customer videos.");

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Gallery - Elevator Installation Photos & Videos"}
        description={page?.meta_description || "Explore Rising Star Elevator's project gallery featuring premium elevator installations, modern lift designs, and escalator projects across Delhi NCR and India."}
        keywords="elevator gallery, lift installation photos, elevator design India, premium lift images, escalator photos, Rising Star projects, elevator videos"
        canonicalUrl="/gallery"
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
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{heroLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {heroTitle.includes("Work") ? <>Our <span className="text-gradient-gold">Work</span></> : heroTitle}
              </h1>
              <p className="text-primary-foreground/80 text-lg">{heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{photoLabel}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {photoTitle.includes("Installations") ? <>Our <span className="text-gradient-gold">Installations</span></> : photoTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{photoDesc}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {defaultImages.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-lg" onClick={() => openLightbox(i)}>
                  <img src={img} alt={`Elevator Project ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </div>
            <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} index={lightboxIndex} slides={defaultImages.map(img => ({ src: img }))} />
          </div>
        </section>

        <section className="section-padding bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{videoLabel}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {videoTitle.includes("Projects") ? <>Watch Our <span className="text-gradient-gold">Projects</span></> : videoTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{videoDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {defaultVideos.map((video, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card group">
                  <div className="aspect-video relative">
                    <video className="w-full h-full object-cover" controls preload="metadata">
                      <source src={video.src} type="video/mp4" />
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
