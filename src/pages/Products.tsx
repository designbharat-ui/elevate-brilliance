import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";

const productCategories = [
  { name: "Home Lift", slug: "home-lift", image: elevator1, category: "Residential", description: "Elegant elevators for villas and homes", specs: "4-6 Passengers | Up to 1.0 m/s" },
  { name: "Passenger Lift", slug: "passenger-lift", image: elevator2, category: "Commercial", description: "High-performance commercial elevators", specs: "8-24 Passengers | Up to 1.5 m/s" },
  { name: "Hospital Lift", slug: "hospital-lift", image: elevator3, category: "Medical", description: "Medical-grade stretcher elevators", specs: "Stretcher | Up to 1.5 m/s" },
  { name: "Capsule Lift", slug: "capsule-lift", image: elevator4, category: "Premium", description: "Panoramic glass elevators", specs: "Glass Cabin | Premium Design" },
  { name: "MRL Lift", slug: "mrl-lift", image: elevator5, category: "Modern", description: "Machine Room Less technology", specs: "Space Saving | Energy Efficient" },
  { name: "Freight/Goods Lift", slug: "freight-lift", image: elevator1, category: "Industrial", description: "Heavy-duty goods transportation", specs: "500-4000 Kgs | Up to 0.5 m/s" },
  { name: "High Rise Elevators", slug: "high-rise", image: elevator2, category: "Commercial", description: "For tall buildings and towers", specs: "High Speed | Up to 6 m/s" },
  { name: "Dumb Waiter", slug: "dumb-waiter", image: elevator3, category: "Service", description: "Small service lifts for goods", specs: "Compact | Restaurant & Hotel" },
  { name: "Escalator", slug: "escalator", image: elevator4, category: "Transit", description: "Moving stairs for public spaces", specs: "Indoor & Outdoor | Up to 0.5 m/s" },
  { name: "Moving Walk", slug: "moving-walk", image: elevator5, category: "Transit", description: "Horizontal transportation systems", specs: "Airports & Malls | Smooth Flow" },
  { name: "Automobile Elevator", slug: "automobile-elevator", image: elevator1, category: "Specialty", description: "Car parking elevator systems", specs: "Heavy Duty | Vehicle Transport" },
  { name: "Gearless Home Lift", slug: "gearless-home-lift", image: elevator2, category: "Residential", description: "Silent gearless technology", specs: "Ultra Quiet | Low Maintenance" },
  { name: "Hydraulic Home Lift", slug: "hydraulic-home-lift", image: elevator3, category: "Residential", description: "Hydraulic powered lifts", specs: "Low Rise | Cost Effective" },
];

export default function Products() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Elevators & Escalators - Complete Product Range"
        description="Explore our complete range of elevators including home lifts, passenger lifts, hospital elevators, MRL lifts, escalators, and moving walks. IS-compliant solutions."
        keywords="home lift, passenger elevator, hospital lift, MRL elevator, escalator, moving walk, capsule lift, freight elevator India"
        canonicalUrl="/products"
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
                Product Range
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Complete Elevator{" "}
                <span className="text-gradient-gold">Solutions</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                From home lifts to high-rise elevators, escalators to moving walks — 
                we offer IS-compliant solutions for every vertical transportation need.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productCategories.map((product) => (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="group relative bg-card rounded-lg overflow-hidden card-hover"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="image-overlay opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold/90 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-gold text-xs font-medium mb-4">
                      {product.specs}
                    </p>
                    <span className="inline-flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all">
                      View Details
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Need a Custom{" "}
              <span className="text-gradient-gold">Solution?</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our experts can design and customize elevator solutions tailored to your specific requirements.
            </p>
            <Link to="/contact" className="btn-gold inline-flex items-center">
              Get Custom Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
