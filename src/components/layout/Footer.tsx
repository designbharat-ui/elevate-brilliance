import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const products = [
  { name: "Home Lift", href: "/products/home-lift" },
  { name: "Passenger Lift", href: "/products/passenger-lift" },
  { name: "Hospital Lift", href: "/products/hospital-lift" },
  { name: "Capsule Lift", href: "/products/capsule-lift" },
  { name: "Escalators", href: "/products/escalator" },
  { name: "Moving Walk", href: "/products/moving-walk" },
];

const services = [
  { name: "AMC Services", href: "/services/amc" },
  { name: "Maintenance", href: "/services/maintenance" },
  { name: "Repair Services", href: "/services/repair" },
  { name: "Modernization", href: "/services/modernization" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Ready to Elevate Your Project?
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                Get in touch with our experts for a free consultation and customized quote.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gold">
                Get Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="btn-outline-gold">
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-sm flex items-center justify-center">
                <span className="font-display text-primary font-bold text-xl">RS</span>
              </div>
              <div>
                <h4 className="font-display text-lg font-bold leading-tight">Rising Star</h4>
                <p className="text-xs text-primary-foreground/60 tracking-widest uppercase">Elevator Pvt. Ltd.</p>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              A solution provider committed to safe and feel-good transfer of people & material, 
              efficiently and economically. 21+ years of excellence in vertical transportation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6 text-gold">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6 text-gold">Products</h5>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6 text-gold">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Delhi NCR, India
                </span>
              </li>
              <li>
                <a href="tel:+919999999999" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-sm">+91 99999 99999</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@risingstarelevator.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-sm">info@risingstarelevator.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Rising Star Elevator Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
