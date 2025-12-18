import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Download, Shield, Zap, Settings, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";

const productsData: Record<string, {
  name: string;
  tagline: string;
  description: string;
  images: string[];
  category: string;
  specs: { label: string; value: string }[];
  features: string[];
  safetyFeatures: string[];
  applications: string[];
}> = {
  "home-lift": {
    name: "Home Lift",
    tagline: "Elegant Residential Elevators",
    description: "Our home lifts are designed to seamlessly integrate with your home's aesthetics while providing safe, smooth, and silent vertical transportation. Perfect for villas, penthouses, and multi-story residences.",
    images: [elevator1, elevator2, elevator5],
    category: "Residential",
    specs: [
      { label: "Capacity", value: "4-6 Passengers (272-408 Kgs)" },
      { label: "Speed", value: "0.63 to 1.0 m/s" },
      { label: "Drive", value: "Geared/Gearless Traction" },
      { label: "Door Type", value: "Auto Center/Side Opening" },
      { label: "Control", value: "Microprocessor Based" },
      { label: "Door Height", value: "2000mm Standard" },
    ],
    features: [
      "Customizable cabin aesthetics",
      "Low noise operation",
      "Energy efficient design",
      "Compact footprint",
      "ARD (Automatic Rescue Device)",
      "Battery backup option",
    ],
    safetyFeatures: [
      "Full height infrared curtain",
      "Overload protection",
      "Emergency alarm",
      "Intercom system",
      "Manual release mechanism",
    ],
    applications: ["Villas", "Bungalows", "Penthouses", "Duplexes", "Individual Houses"],
  },
  "passenger-lift": {
    name: "Passenger Lift",
    tagline: "High-Performance Commercial Elevators",
    description: "Designed for high-traffic commercial buildings, our passenger lifts deliver reliable performance, smooth ride quality, and elegant aesthetics suitable for offices, malls, and hotels.",
    images: [elevator2, elevator3, elevator4],
    category: "Commercial",
    specs: [
      { label: "Capacity", value: "8-24 Passengers (544-1632 Kgs)" },
      { label: "Speed", value: "1.0 to 2.5 m/s" },
      { label: "Drive", value: "Gearless Traction" },
      { label: "Door Type", value: "Center Opening" },
      { label: "Control", value: "VVVF Microprocessor" },
      { label: "Ceiling Height", value: "2150mm Standard" },
    ],
    features: [
      "High traffic handling",
      "Group control available",
      "Destination dispatch option",
      "LCD/TFT displays",
      "Custom car designs",
      "Energy regeneration",
    ],
    safetyFeatures: [
      "Multi-beam infrared sensors",
      "Emergency power operation",
      "Fire service mode",
      "Seismic detection",
      "Governor & safety gear",
    ],
    applications: ["Office Buildings", "Shopping Malls", "Hotels", "Retail Spaces", "Residential Complexes"],
  },
  "hospital-lift": {
    name: "Hospital Lift",
    tagline: "Medical-Grade Stretcher Elevators",
    description: "Specially designed for healthcare facilities, our hospital lifts accommodate stretchers and beds while providing extra-smooth ride quality essential for patient comfort.",
    images: [elevator3, elevator1, elevator2],
    category: "Medical",
    specs: [
      { label: "Capacity", value: "15-26 Passengers (1020-1768 Kgs)" },
      { label: "Speed", value: "0.5 to 1.5 m/s" },
      { label: "Car Size", value: "Stretcher/Bed Compliant" },
      { label: "Door Width", value: "1100-1400mm" },
      { label: "Ride Quality", value: "Extra Smooth" },
      { label: "Compliance", value: "IS 14665 Part 5" },
    ],
    features: [
      "Stretcher & bed capacity",
      "Antibacterial surfaces",
      "Easy-clean interiors",
      "Priority call function",
      "Wide door opening",
      "Gentle start/stop",
    ],
    safetyFeatures: [
      "Hospital emergency mode",
      "Battery backup operation",
      "Fire service recall",
      "Hands-free operation",
      "Smooth leveling (±5mm)",
    ],
    applications: ["Hospitals", "Nursing Homes", "Clinics", "Medical Centers", "Diagnostic Centers"],
  },
  "capsule-lift": {
    name: "Capsule Lift",
    tagline: "Panoramic Glass Elevators",
    description: "Our capsule lifts combine stunning panoramic views with premium design, making them perfect for hotels, malls, and architectural landmarks where the elevator becomes a design feature.",
    images: [elevator4, elevator5, elevator1],
    category: "Premium",
    specs: [
      { label: "Capacity", value: "6-13 Passengers" },
      { label: "Speed", value: "1.0 to 2.0 m/s" },
      { label: "Glass Type", value: "Tempered/Laminated" },
      { label: "Shape", value: "Semi-Circle/Full Circle" },
      { label: "Lighting", value: "LED Customizable" },
      { label: "Frame", value: "Stainless Steel/Titanium" },
    ],
    features: [
      "360° panoramic view",
      "LED ambient lighting",
      "Mirror finish frames",
      "Custom cabin shapes",
      "Premium flooring options",
      "Glass car operating panel",
    ],
    safetyFeatures: [
      "Laminated safety glass",
      "Anti-fall protection",
      "Emergency lighting",
      "Intercom system",
      "Automatic rescue device",
    ],
    applications: ["Hotels", "Shopping Malls", "Airports", "Commercial Towers", "Exhibition Centers"],
  },
  "mrl-lift": {
    name: "MRL Lift",
    tagline: "Machine Room Less Technology",
    description: "Our MRL (Machine Room Less) elevators offer advanced gearless technology without requiring a dedicated machine room, saving valuable building space while delivering superior performance.",
    images: [elevator5, elevator2, elevator3],
    category: "Modern",
    specs: [
      { label: "Capacity", value: "6-20 Passengers" },
      { label: "Speed", value: "1.0 to 2.5 m/s" },
      { label: "Machine Location", value: "In Hoistway" },
      { label: "Drive", value: "Permanent Magnet Gearless" },
      { label: "Control", value: "VVVF" },
      { label: "Energy", value: "40% Less than Conventional" },
    ],
    features: [
      "No machine room required",
      "Space efficient design",
      "Energy efficient motor",
      "Lower operating costs",
      "Quiet operation",
      "Compact controller",
    ],
    safetyFeatures: [
      "All standard safety features",
      "Emergency manual operation",
      "Overspeed governor",
      "Rope gripper",
      "Buffer system",
    ],
    applications: ["New Buildings", "Renovations", "Space-Constrained Sites", "Green Buildings", "Residential"],
  },
  "freight-lift": {
    name: "Freight/Goods Lift",
    tagline: "Heavy-Duty Goods Transportation",
    description: "Built for industrial and commercial use, our freight lifts are designed to transport heavy goods safely and efficiently, with robust construction and large cabin sizes.",
    images: [elevator1, elevator3, elevator4],
    category: "Industrial",
    specs: [
      { label: "Capacity", value: "500-4000 Kgs" },
      { label: "Speed", value: "Up to 0.5 m/s" },
      { label: "Door Type", value: "Bi-parting/Vertical" },
      { label: "Car Floor", value: "Checkered Plate" },
      { label: "Construction", value: "Heavy Duty Steel" },
      { label: "Loading", value: "Fork Lift Compatible" },
    ],
    features: [
      "Heavy load capacity",
      "Rugged construction",
      "Wide car entrance",
      "Non-slip flooring",
      "Forklift compatible",
      "Low maintenance",
    ],
    safetyFeatures: [
      "Overload protection",
      "Light curtain sensors",
      "Emergency stop",
      "Alarm system",
      "Slow closing doors",
    ],
    applications: ["Warehouses", "Factories", "Shopping Malls", "Hotels", "Hospitals"],
  },
  "escalator": {
    name: "Escalator",
    tagline: "Moving Stairs Solutions",
    description: "Our escalators are designed for smooth, safe, and efficient movement of large numbers of people in malls, metros, airports, and commercial buildings.",
    images: [elevator4, elevator2, elevator5],
    category: "Transit",
    specs: [
      { label: "Rise", value: "Up to 12m" },
      { label: "Speed", value: "Up to 0.5 m/s" },
      { label: "Step Width", value: "600/800/1000mm" },
      { label: "Inclination", value: "30°/35°" },
      { label: "Application", value: "Indoor & Outdoor" },
      { label: "Balustrade", value: "Glass/Steel" },
    ],
    features: [
      "Energy saving mode",
      "Variable speed drive",
      "Auto start function",
      "LED step lighting",
      "Comb plate lighting",
      "Outdoor weather protection",
    ],
    safetyFeatures: [
      "Missing step detector",
      "Comb plate safety switch",
      "Handrail speed monitoring",
      "Skirt deflector",
      "Emergency stop buttons",
    ],
    applications: ["Shopping Malls", "Metro Stations", "Airports", "Railway Stations", "Commercial Buildings"],
  },
  "moving-walk": {
    name: "Moving Walk",
    tagline: "Horizontal Transportation Systems",
    description: "Our moving walks provide comfortable horizontal or inclined transportation for pedestrians, ideal for airports, metros, and large commercial complexes.",
    images: [elevator5, elevator3, elevator1],
    category: "Transit",
    specs: [
      { label: "Inclination", value: "0° to 12°" },
      { label: "Speed", value: "Up to 0.75 m/s" },
      { label: "Width", value: "800/1000mm" },
      { label: "Length", value: "Custom" },
      { label: "Pallet Type", value: "Aluminum/Steel" },
      { label: "Application", value: "Indoor & Outdoor" },
    ],
    features: [
      "Smooth acceleration",
      "Energy efficient",
      "Variable speed option",
      "Cart/luggage friendly",
      "Low noise operation",
      "Weather resistant models",
    ],
    safetyFeatures: [
      "Entry safety sensors",
      "Emergency stops",
      "Handrail monitoring",
      "Comb plate switches",
      "Speed monitoring",
    ],
    applications: ["Airports", "Metro Stations", "Convention Centers", "Shopping Malls", "Exhibition Halls"],
  },
};

// Default product data for products not explicitly defined
const defaultProduct = {
  name: "Elevator",
  tagline: "Premium Vertical Transportation",
  description: "Contact us for detailed specifications and customization options for this elevator type.",
  images: [elevator1, elevator2, elevator3],
  category: "General",
  specs: [
    { label: "Capacity", value: "Custom" },
    { label: "Speed", value: "As per requirement" },
    { label: "Drive", value: "Traction/Hydraulic" },
    { label: "Control", value: "Microprocessor" },
  ],
  features: ["Customizable design", "Energy efficient", "IS Code compliant", "After-sales support"],
  safetyFeatures: ["All standard safety features", "Emergency operation", "Intercom system"],
  applications: ["Various applications"],
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = productsData[slug || ""] || { ...defaultProduct, name: slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Elevator" };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="bg-secondary py-4">
          <div className="container">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(0, 3).map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-gold transition-colors cursor-pointer">
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <span className="inline-block bg-gold/10 text-gold text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-gold font-medium text-lg mb-6">{product.tagline}</p>
                <p className="text-muted-foreground text-lg mb-8">{product.description}</p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="bg-secondary rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">{spec.label}</p>
                      <p className="text-foreground font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-gold flex-1">
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button className="btn-outline-gold flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Specs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Features */}
              <div className="bg-card rounded-lg p-8">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety */}
              <div className="bg-card rounded-lg p-8">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Safety Features</h3>
                <ul className="space-y-3">
                  {product.safetyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div className="bg-card rounded-lg p-8">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                  <Settings className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Applications</h3>
                <ul className="space-y-3">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Need More{" "}
                <span className="text-gradient-gold">Information?</span>
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Our experts are ready to assist you with technical specifications, customization options, and project consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/query" className="btn-gold inline-flex items-center justify-center">
                  Send Inquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a href="tel:+919999999999" className="btn-outline-gold inline-flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Expert
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
