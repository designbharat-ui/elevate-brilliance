import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png";

interface MenuItem {
  name: string;
  href: string;
}

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [services, setServices] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      // Fetch product pages
      const { data: productPages } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("parent_slug", "products")
        .eq("status", "published")
        .eq("is_visible", true)
        .order("page_order", { ascending: true })
        .limit(6);

      if (productPages) {
        setProducts(productPages.map(p => ({
          name: p.title,
          href: `/products/${p.slug}`
        })));
      }

      // Fetch service pages
      const { data: servicePages } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("parent_slug", "services")
        .eq("status", "published")
        .eq("is_visible", true)
        .order("page_order", { ascending: true });

      if (servicePages) {
        setServices(servicePages.map(p => ({
          name: p.title,
          href: `/services/${p.slug}`
        })));
      }
    };

    fetchFooterData();
  }, []);
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
              <Link to="/get-quote">
                <Button className="btn-gold">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+918800732223">
                <Button className="btn-outline-gold">
                  Call Now
                </Button>
              </a>
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
              <img src={logoImage} alt="Rising Star Elevator" className="h-16 w-auto bg-white rounded-lg p-1" />
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
                  722A, Jaina Tower 2, District Centre Janakpuri, Delhi, India
                </span>
              </li>
              <li>
                <a href="tel:+918800732223" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-sm">+91 8800732223</span>
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
              <Link to="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
