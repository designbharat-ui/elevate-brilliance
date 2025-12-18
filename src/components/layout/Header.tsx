import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const products = [
  { name: "Home Lift", href: "/products/home-lift", description: "Elegant residential elevators" },
  { name: "Passenger Lift", href: "/products/passenger-lift", description: "Commercial & residential" },
  { name: "Hospital Lift", href: "/products/hospital-lift", description: "Medical-grade elevators" },
  { name: "Capsule Lift", href: "/products/capsule-lift", description: "Panoramic glass elevators" },
  { name: "MRL Lift", href: "/products/mrl-lift", description: "Machine room-less design" },
  { name: "Freight Lift", href: "/products/freight-lift", description: "Heavy-duty goods elevator" },
  { name: "Escalator", href: "/products/escalator", description: "Moving stairs solutions" },
  { name: "Moving Walk", href: "/products/moving-walk", description: "Horizontal transportation" },
];

const services = [
  { name: "AMC Services", href: "/services/amc", description: "Annual maintenance contracts" },
  { name: "Maintenance", href: "/services/maintenance", description: "Regular servicing" },
  { name: "Repair Services", href: "/services/repair", description: "Quick repair solutions" },
  { name: "Modernization", href: "/services/modernization", description: "Elevator upgrades" },
  { name: "Customization", href: "/services/customization", description: "Bespoke solutions" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="h-4 w-4" />
              <span>+91 99999 99999</span>
            </a>
            <a href="mailto:info@risingstar.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@risingstarelevator.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gold font-medium">21+ Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-sm flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="font-display text-primary font-bold text-xl">RS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg font-bold text-foreground leading-tight">
                Rising Star
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Elevator
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-gold focus:text-gold focus:outline-none">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-gold focus:text-gold focus:outline-none">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-gold data-[state=open]:text-gold">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                    {products.map((product) => (
                      <li key={product.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={product.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-gold"
                          >
                            <div className="text-sm font-medium leading-none">{product.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {product.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-gold data-[state=open]:text-gold">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {services.map((service) => (
                      <li key={service.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-gold"
                          >
                            <div className="text-sm font-medium leading-none">{service.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/projects">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-gold focus:text-gold focus:outline-none">
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/gallery">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-gold focus:text-gold focus:outline-none">
                    Gallery
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-gold focus:text-gold focus:outline-none">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="btn-gold">
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-card border-t border-border shadow-xl animate-fade-in">
            <nav className="container py-6">
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="block py-2 text-foreground hover:text-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="block py-2 text-foreground hover:text-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <details className="group">
                    <summary className="flex items-center justify-between py-2 text-foreground hover:text-gold font-medium cursor-pointer">
                      Products
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      {products.map((product) => (
                        <li key={product.name}>
                          <Link
                            to={product.href}
                            className="block py-1 text-muted-foreground hover:text-gold"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <details className="group">
                    <summary className="flex items-center justify-between py-2 text-foreground hover:text-gold font-medium cursor-pointer">
                      Services
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            to={service.href}
                            className="block py-1 text-muted-foreground hover:text-gold"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <Link to="/projects" className="block py-2 text-foreground hover:text-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="block py-2 text-foreground hover:text-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-2 text-foreground hover:text-gold font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact
                  </Link>
                </li>
                <li className="pt-4">
                  <Button className="btn-gold w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Quote
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
