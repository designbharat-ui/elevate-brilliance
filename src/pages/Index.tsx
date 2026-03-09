import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { usePageContent } from "@/hooks/usePageContent";

const Index = () => {
  const { page } = usePageContent("home");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rising Star Elevator Pvt. Ltd.",
    "url": "https://risingstarelevator.com",
    "logo": "https://risingstarelevator.com/logo.png",
    "description": "Premium elevator and escalator solutions in India with 21+ years experience",
    "address": { "@type": "PostalAddress", "streetAddress": "722A, Jaina Tower 2, District Centre Janakpuri", "addressLocality": "Delhi", "addressCountry": "IN" },
    "contactPoint": { "@type": "ContactPoint", "telephone": "+91-8800732223", "contactType": "sales" }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Premium Elevator & Escalator Solutions in India"}
        description={page?.meta_description || "Rising Star Elevator - 21+ years of excellence in elevators, escalators, and vertical transportation. 3000+ installations across India. Get free quote today!"}
        keywords="elevator company India, lift manufacturer, escalator supplier, home lift, passenger elevator, hospital lift, MRL elevator, Delhi NCR"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <ProductsSection />
        <WhyChooseSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
