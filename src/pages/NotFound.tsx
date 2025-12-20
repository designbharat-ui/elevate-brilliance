import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularLinks = [
    { name: "Home Lift", path: "/products/home-lift" },
    { name: "Passenger Lift", path: "/products/passenger-lift" },
    { name: "AMC Services", path: "/services/amc" },
    { name: "All Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Navigate back to Rising Star Elevator homepage or explore our products and services."
        canonicalUrl="/404"
      />
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Animation */}
            <div className="relative mb-8">
              <div className="text-[150px] md:text-[200px] font-display font-bold text-muted/20 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gold/10 rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-16 h-16 text-gold" />
                </div>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not <span className="text-gradient-gold">Found</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved.
              Let us help you find what you're looking for.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/">
                <Button className="btn-gold w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="btn-outline-gold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Popular Links */}
            <div className="bg-secondary rounded-lg p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Popular Pages
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {popularLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="bg-background border border-border px-4 py-2 rounded-lg text-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 text-muted-foreground">
              Need help?{" "}
              <a
                href="tel:+919999999999"
                className="text-gold hover:underline inline-flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                Call us now
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
