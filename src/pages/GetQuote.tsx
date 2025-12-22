import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Calculator, CheckCircle } from "lucide-react";
import heroProducts from "@/assets/hero-products.jpg";

export default function GetQuote() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    floors: "",
    capacity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your requirements";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Quote Request Submitted!",
      description: "Thank you for your interest. Our team will contact you within 24 hours with a customized quote.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      floors: "",
      capacity: "",
      message: "",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Elevator Quote Request",
    "provider": {
      "@type": "Organization",
      "name": "Rising Star Elevator",
    },
    "description": "Get a customized quote for elevator installation, modernization, or maintenance services.",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Get Quote - Free Elevator Installation Estimate"
        description="Request a free quote for elevator installation, modernization, or maintenance services from Rising Star Elevator. Get customized pricing for your project."
        keywords="elevator quote, lift installation cost, elevator price India, free elevator estimate, lift quotation Delhi NCR"
        canonicalUrl="/get-quote"
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero">
          <div className="absolute inset-0">
            <img src={heroProducts} alt="Get Quote Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">Get Quote</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Request a <span className="text-gradient-gold">Free Quote</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">Get a customized quote for your elevator project. Our team will provide detailed pricing within 24 hours.</p>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-8 h-8 text-gold" />
                    <h2 className="font-display text-2xl font-bold text-foreground">Quote Request Form</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your full name"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          placeholder="Your company name (optional)"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type <span className="text-destructive">*</span></Label>
                        <Select value={formData.projectType} onValueChange={(value) => handleChange("projectType", value)}>
                          <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new-installation">New Installation</SelectItem>
                            <SelectItem value="modernization">Modernization</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="repair">Repair Service</SelectItem>
                            <SelectItem value="escalator">Escalator</SelectItem>
                            <SelectItem value="home-lift">Home Lift</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.projectType && <p className="text-sm text-destructive">{errors.projectType}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="floors">Number of Floors</Label>
                        <Select value={formData.floors} onValueChange={(value) => handleChange("floors", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select floors" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-4">2-4 Floors</SelectItem>
                            <SelectItem value="5-8">5-8 Floors</SelectItem>
                            <SelectItem value="9-15">9-15 Floors</SelectItem>
                            <SelectItem value="16-25">16-25 Floors</SelectItem>
                            <SelectItem value="25+">25+ Floors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity Required</Label>
                        <Select value={formData.capacity} onValueChange={(value) => handleChange("capacity", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4-person">4 Person (320 kg)</SelectItem>
                            <SelectItem value="6-person">6 Person (450 kg)</SelectItem>
                            <SelectItem value="8-person">8 Person (630 kg)</SelectItem>
                            <SelectItem value="13-person">13 Person (1000 kg)</SelectItem>
                            <SelectItem value="goods">Goods Lift</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Requirements <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Please describe your project requirements, building details, and any specific needs..."
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Request Free Quote"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-muted-foreground">+91 88007 32223</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-muted-foreground">info@risingstarelevator.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p className="text-muted-foreground">Delhi NCR, India</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Working Hours</p>
                        <p className="text-muted-foreground">Mon-Sat: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-primary rounded-2xl p-6 shadow-lg">
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-6">Why Get a Quote from Us?</h3>
                  <div className="space-y-4">
                    {[
                      "Free no-obligation quotes",
                      "Response within 24 hours",
                      "Competitive pricing",
                      "Expert consultation included",
                      "Customized solutions",
                      "15+ years of experience",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-primary-foreground/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}