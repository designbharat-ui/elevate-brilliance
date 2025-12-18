import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";

const images = [elevator1, elevator2, elevator3, elevator4, elevator5, elevator1, elevator2, elevator3];

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
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
                  <img src={img} alt={`Project ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
