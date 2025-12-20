import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Download, Shield, Zap, Settings, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import elevator5 from "@/assets/elevator-5.jpeg";
import heroProducts from "@/assets/hero-products.jpg";

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
  seoKeywords: string;
  seoDescription: string;
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
    seoKeywords: "home lift, residential elevator, villa lift, home elevator India, gearless home lift, house elevator",
    seoDescription: "Premium home lifts for villas, bungalows & penthouses. 4-6 passenger capacity, gearless traction, customizable aesthetics. Get quote from Rising Star Elevator.",
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
    seoKeywords: "passenger lift, commercial elevator, office elevator, mall lift, high speed elevator India",
    seoDescription: "High-performance passenger lifts for offices, malls & hotels. 8-24 passenger capacity, VVVF control, group control. Get quote from Rising Star Elevator.",
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
    seoKeywords: "hospital lift, stretcher elevator, medical lift, bed elevator, hospital elevator India",
    seoDescription: "Medical-grade hospital lifts for stretchers & beds. IS 14665 compliant, extra smooth ride, antibacterial surfaces. Get quote from Rising Star Elevator.",
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
    seoKeywords: "capsule lift, glass elevator, panoramic lift, scenic elevator India, observation elevator",
    seoDescription: "Premium capsule lifts with panoramic glass views. Perfect for hotels, malls & landmarks. Custom designs available. Get quote from Rising Star Elevator.",
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
    seoKeywords: "MRL lift, machine room less elevator, gearless elevator, space saving lift, energy efficient elevator India",
    seoDescription: "MRL elevators with no machine room required. 40% energy savings, gearless technology, space efficient. Get quote from Rising Star Elevator.",
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
    seoKeywords: "goods lift, freight elevator, cargo lift, industrial elevator, heavy duty lift India",
    seoDescription: "Heavy-duty freight lifts for warehouses & factories. 500-4000 Kgs capacity, forklift compatible. Get quote from Rising Star Elevator.",
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
    seoKeywords: "escalator, moving stairs, mall escalator, metro escalator, commercial escalator India",
    seoDescription: "Commercial escalators for malls, metros & airports. Energy efficient, safety compliant, custom designs. Get quote from Rising Star Elevator.",
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
    seoKeywords: "moving walk, travelator, airport walkway, horizontal escalator, moving walkway India",
    seoDescription: "Moving walks for airports, metros & malls. Smooth, energy efficient, cart friendly. Get quote from Rising Star Elevator.",
  },
  "dumb-waiter": {
    name: "Dumb Waiter",
    tagline: "Service Lifts for Goods",
    description: "Compact dumb waiters for transporting food, documents, and small goods between floors in restaurants, hotels, offices, and homes.",
    images: [elevator2, elevator1, elevator3],
    category: "Service",
    specs: [
      { label: "Capacity", value: "50-300 Kgs" },
      { label: "Speed", value: "0.3 to 0.5 m/s" },
      { label: "Car Size", value: "Compact Custom Sizes" },
      { label: "Door Type", value: "Manual/Automatic" },
      { label: "Control", value: "Push Button" },
      { label: "Application", value: "Indoor" },
    ],
    features: [
      "Compact design",
      "Easy installation",
      "Low maintenance",
      "Quiet operation",
      "Stainless steel car",
      "Multiple stop capability",
    ],
    safetyFeatures: [
      "Overload protection",
      "Door interlocks",
      "Emergency stop",
      "Slack rope device",
      "Buffer system",
    ],
    applications: ["Restaurants", "Hotels", "Hospitals", "Offices", "Residences"],
    seoKeywords: "dumb waiter, service lift, food lift, small goods elevator, kitchen lift India",
    seoDescription: "Compact dumb waiters for restaurants, hotels & offices. 50-300 Kgs capacity, quiet operation. Get quote from Rising Star Elevator.",
  },
  "high-rise-elevator": {
    name: "High Rise Elevator",
    tagline: "Skyscraper Vertical Transportation",
    description: "High-speed elevators designed for tall buildings and skyscrapers, featuring advanced technology for smooth, fast, and efficient vertical transportation.",
    images: [elevator3, elevator4, elevator5],
    category: "Premium",
    specs: [
      { label: "Capacity", value: "10-24 Passengers" },
      { label: "Speed", value: "2.5 to 6 m/s" },
      { label: "Drive", value: "PM Gearless" },
      { label: "Control", value: "Destination Dispatch" },
      { label: "Rise", value: "Up to 300m" },
      { label: "Features", value: "Pressure Compensation" },
    ],
    features: [
      "Ultra-high speed",
      "Destination dispatch",
      "Pressure compensation",
      "Double deck option",
      "Energy regeneration",
      "Sky lobby capability",
    ],
    safetyFeatures: [
      "Seismic detection",
      "Fire emergency mode",
      "Advanced safety gear",
      "Rope monitoring",
      "Battery backup",
    ],
    applications: ["Skyscrapers", "High-Rise Offices", "Luxury Towers", "Mixed-Use Developments", "Hotels"],
    seoKeywords: "high rise elevator, skyscraper lift, high speed elevator, tall building elevator India",
    seoDescription: "High-speed elevators for skyscrapers and tall buildings. Up to 6 m/s speed, destination dispatch. Get quote from Rising Star Elevator.",
  },
  "automobile-elevator": {
    name: "Automobile Elevator",
    tagline: "Car Parking Lifts",
    description: "Heavy-duty automobile elevators for car parking systems, auto showrooms, and service centers. Designed to safely transport vehicles between floors.",
    images: [elevator1, elevator4, elevator2],
    category: "Industrial",
    specs: [
      { label: "Capacity", value: "2000-5000 Kgs" },
      { label: "Speed", value: "0.25 to 0.5 m/s" },
      { label: "Platform", value: "Heavy Duty Steel" },
      { label: "Door Type", value: "Bi-parting/Rolling" },
      { label: "Control", value: "Attendant Operated" },
      { label: "Size", value: "Custom to Vehicle" },
    ],
    features: [
      "Heavy duty platform",
      "Wide door opening",
      "Non-slip surface",
      "Vehicle wheel guides",
      "Smooth leveling",
      "Low pit requirement",
    ],
    safetyFeatures: [
      "Overload protection",
      "Safety edges",
      "Emergency stop",
      "Interlock system",
      "Anti-creep device",
    ],
    applications: ["Parking Towers", "Auto Showrooms", "Service Centers", "Residential Basements", "Commercial Parking"],
    seoKeywords: "car lift, automobile elevator, car parking lift, vehicle elevator, auto lift India",
    seoDescription: "Automobile elevators for car parking systems & showrooms. 2000-5000 Kgs capacity, heavy duty. Get quote from Rising Star Elevator.",
  },
  "homelift-gearless": {
    name: "Home Lift Gearless",
    tagline: "Premium Gearless Home Elevators",
    description: "Ultra-quiet gearless home lifts with permanent magnet motors for the smoothest ride quality and lowest energy consumption in residential applications.",
    images: [elevator5, elevator1, elevator4],
    category: "Residential",
    specs: [
      { label: "Capacity", value: "4-6 Passengers" },
      { label: "Speed", value: "0.4 to 1.0 m/s" },
      { label: "Drive", value: "PM Gearless" },
      { label: "Control", value: "VVVF" },
      { label: "Noise", value: "< 50 dB" },
      { label: "Energy", value: "Class A" },
    ],
    features: [
      "Ultra quiet operation",
      "Smooth ride quality",
      "Energy efficient",
      "No machine room",
      "Compact design",
      "Premium aesthetics",
    ],
    safetyFeatures: [
      "ARD included",
      "Full infrared curtain",
      "Battery backup",
      "Emergency alarm",
      "Intercom system",
    ],
    applications: ["Luxury Villas", "Penthouses", "Duplexes", "Independent Houses", "Bungalows"],
    seoKeywords: "gearless home lift, quiet home elevator, PM motor lift, luxury home lift India",
    seoDescription: "Premium gearless home lifts with ultra-quiet operation. Energy Class A, ARD included, luxury aesthetics. Get quote from Rising Star Elevator.",
  },
  "home-lift-hydraulic": {
    name: "Home Lift Hydraulic",
    tagline: "Hydraulic Residential Elevators",
    description: "Cost-effective hydraulic home lifts ideal for low-rise residential applications. Simple installation with no overhead machine room required.",
    images: [elevator2, elevator5, elevator3],
    category: "Residential",
    specs: [
      { label: "Capacity", value: "3-5 Passengers" },
      { label: "Speed", value: "0.15 to 0.3 m/s" },
      { label: "Drive", value: "Hydraulic" },
      { label: "Floors", value: "2-4 Stops" },
      { label: "Pit Depth", value: "150-300mm" },
      { label: "Headroom", value: "Minimal Required" },
    ],
    features: [
      "Low pit depth",
      "Minimal headroom",
      "Cost effective",
      "Simple installation",
      "Smooth operation",
      "No machine room",
    ],
    safetyFeatures: [
      "Manual lowering",
      "Rupture valve",
      "Overload protection",
      "Emergency alarm",
      "Door interlocks",
    ],
    applications: ["Low-Rise Homes", "Retrofit Projects", "Villas", "Duplexes", "Small Buildings"],
    seoKeywords: "hydraulic home lift, low cost home elevator, residential hydraulic lift India",
    seoDescription: "Affordable hydraulic home lifts for 2-4 floors. Low pit depth, easy installation, cost effective. Get quote from Rising Star Elevator.",
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
  seoKeywords: "elevator, lift, vertical transportation India",
  seoDescription: "Premium elevators and lifts for all applications. Contact Rising Star Elevator for customized solutions.",
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = productsData[slug || ""] || { ...defaultProduct, name: slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Elevator" };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Rising Star Elevator",
    },
    "category": product.category,
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${product.name} - ${product.tagline}`}
        description={product.seoDescription || product.description}
        keywords={product.seoKeywords || `${product.name}, elevator, lift, Rising Star`}
        canonicalUrl={`/products/${slug}`}
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroProducts} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/products" className="text-primary-foreground/70 hover:text-gold transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Products
              </Link>
              <span className="text-primary-foreground/50">/</span>
              <span className="text-gold font-medium">{product.name}</span>
            </div>
            <div className="max-w-3xl">
              <span className="inline-block bg-gold/20 text-gold text-sm font-medium px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-gold font-medium text-lg mb-4">{product.tagline}</p>
              <p className="text-primary-foreground/80 text-lg">{product.description}</p>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
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

              {/* Specs */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Technical <span className="text-gradient-gold">Specifications</span>
                </h2>
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
                Our experts are ready to help you choose the perfect {product.name.toLowerCase()} for your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-gold inline-flex items-center justify-center">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a href="tel:+919999999999" className="btn-outline-gold inline-flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
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
