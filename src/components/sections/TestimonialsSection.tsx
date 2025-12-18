import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import elevator5 from "@/assets/elevator-5.jpeg";

const testimonials = [
  {
    name: "Mahesh Chand Kaushik",
    role: "Property Developer",
    company: "Parker Estate Developers",
    quote: "Rising Star Elevator has been our trusted partner for over 5 years. Their attention to detail, timely delivery, and post-installation support is exceptional. The MRL-Gearless lifts installed at Parker Residency, Sonepat are running flawlessly.",
    rating: 5,
    project: "Parker Mall Sonepat - 1500Kgs MRL-Gearless",
  },
  {
    name: "J. S. Dabas",
    role: "Managing Director",
    company: "Wave Infratech",
    quote: "We've collaborated with Rising Star on multiple high-rise projects in Noida. Their engineering expertise and commitment to IS standards gives us complete confidence. The team's professionalism is truly commendable.",
    rating: 5,
    project: "Wave Infratech Noida - Multiple Installations",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Hospital Administrator",
    company: "City Medical Center",
    quote: "The hospital elevators installed by Rising Star meet all medical standards with ultra-smooth operation. Their 24/7 maintenance support ensures zero downtime, which is critical for our healthcare facility.",
    rating: 5,
    project: "City Medical Center - Hospital Elevators",
  },
];

const clients = [
  { name: "Wave Infratech", logo: "Wave" },
  { name: "Parker Estate", logo: "Parker" },
  { name: "DLF", logo: "DLF" },
  { name: "Godrej", logo: "Godrej" },
  { name: "Tata Housing", logo: "Tata" },
  { name: "Prestige", logo: "Prestige" },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our{" "}
            <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <div className="divider-gold mx-auto" />
        </div>

        {/* Testimonial Card */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
              <img
                src={elevator5}
                alt="Premium elevator interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-lg -z-10" />
            <div className="absolute top-6 left-6 bg-gold text-primary p-4 rounded-lg shadow-gold">
              <Quote className="w-8 h-8" />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8">
              "{activeTestimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="mb-6">
              <h4 className="font-display text-lg font-semibold text-foreground">
                {activeTestimonial.name}
              </h4>
              <p className="text-muted-foreground">
                {activeTestimonial.role}, {activeTestimonial.company}
              </p>
              <p className="text-gold text-sm mt-1">
                {activeTestimonial.project}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex ? "w-8 bg-gold" : "bg-border hover:bg-gold/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className="border-t border-border pt-12">
          <p className="text-center text-muted-foreground mb-8 uppercase tracking-widest text-sm">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client) => (
              <div
                key={client.name}
                className="px-6 py-3 bg-muted rounded-lg text-muted-foreground font-semibold hover:text-gold hover:bg-gold/10 transition-colors cursor-pointer"
              >
                {client.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
