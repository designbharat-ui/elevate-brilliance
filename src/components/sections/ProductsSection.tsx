import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";

const products = [
  {
    name: "Home Lift",
    description: "Elegant residential elevators with customizable aesthetics for villas and penthouses",
    image: elevator1,
    specs: "4-6 Passengers | Up to 1.0 m/s",
    category: "Residential",
  },
  {
    name: "Passenger Lift",
    description: "High-performance commercial elevators designed for offices, retail, and hotels",
    image: elevator2,
    specs: "8-24 Passengers | Up to 1.5 m/s",
    category: "Commercial",
  },
  {
    name: "Hospital Lift",
    description: "Medical-grade elevators with stretcher capacity and extra-smooth ride",
    image: elevator3,
    specs: "Stretcher Capacity | Up to 1.5 m/s",
    category: "Medical",
  },
  {
    name: "Capsule Lift",
    description: "Panoramic glass elevators offering breathtaking views and modern aesthetics",
    image: elevator4,
    specs: "Vision Panels | Premium Design",
    category: "Premium",
  },
];

export function ProductsSection() {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
              Product Range
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Premium Elevator{" "}
              <span className="text-gradient-gold">Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From residential home lifts to high-rise commercial elevators, 
              we offer IS-compliant solutions with world-class aesthetics.
            </p>
          </div>
          <Button className="btn-outline-gold self-start lg:self-auto">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group relative bg-card rounded-lg overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
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
                <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-gold text-xs font-medium mb-4">
                  {product.specs}
                </p>
                <a
                  href={`/products/${product.name.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all"
                >
                  Explore
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Categories */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {["MRL Lift", "Freight Lift", "Escalator", "Moving Walk", "Dumb Waiter", "Auto Elevator"].map((item) => (
            <a
              key={item}
              href={`/products/${item.toLowerCase().replace(' ', '-')}`}
              className="bg-card border border-border rounded-lg p-4 text-center hover:border-gold/50 hover:bg-gold/5 transition-all group"
            >
              <span className="text-foreground font-medium text-sm group-hover:text-gold transition-colors">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
