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
import { usePageContent } from "@/hooks/usePageContent";

export default function GetQuote() {
  const { page, getField, getSectionFields } = usePageContent("get-quote");
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", projectType: "", floors: "", capacity: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroLabel = getField("hero", "label", "Get Quote");
  const heroTitle = getField("hero", "title", "Request a Free Quote");
  const heroDescription = getField("hero", "description", "Get a customized quote for your elevator project. Our team will provide detailed pricing within 24 hours.");

  const sidebar = getSectionFields("sidebar");
  const sidebarPhone = sidebar?.phone || "+91 88007 32223";
  const sidebarEmail = sidebar?.email || "info@risingstarelevator.com";
  const sidebarAddress = sidebar?.address || "722A, Jaina Tower 2, District Centre Janakpuri, Delhi, India";
  const sidebarHours = sidebar?.hours || "Mon-Sat: 9:00 AM - 6:00 PM";
  const benefits = sidebar?.benefits || ["Free no-obligation quotes", "Response within 24 hours", "Competitive pricing", "Expert consultation included", "Customized solutions", "15+ years of experience"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.projectType) newErrors.projectType = "Please select a project type";
    if (!formData.message.trim()) newErrors.message = "Please describe your requirements";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast({ title: "Validation Error", description: "Please fill required fields.", variant: "destructive" }); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    toast({ title: "Quote Request Submitted!", description: "Our team will contact you within 24 hours." });
    setFormData({ name: "", email: "", phone: "", company: "", projectType: "", floors: "", capacity: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Get Quote - Free Elevator Installation Estimate"}
        description={page?.meta_description || "Request a free quote for elevator installation, modernization, or maintenance services."}
        keywords="elevator quote, lift installation cost, elevator price India"
        canonicalUrl="/get-quote"
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="absolute inset-0">
            <img src={heroProducts} alt="Get Quote Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{heroLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Request a <span className="text-gradient-gold">Free Quote</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">{heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-8 h-8 text-gold" />
                    <h2 className="font-display text-2xl font-bold text-foreground">Quote Request Form</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name <span className="text-destructive">*</span></Label>
                        <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your full name" className={errors.name ? "border-destructive" : ""} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Email <span className="text-destructive">*</span></Label>
                        <Input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="your@email.com" className={errors.email ? "border-destructive" : ""} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Phone <span className="text-destructive">*</span></Label>
                        <Input value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" className={errors.phone ? "border-destructive" : ""} />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input value={formData.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="Optional" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Project Type <span className="text-destructive">*</span></Label>
                        <Select value={formData.projectType} onValueChange={(v) => handleChange("projectType", v)}>
                          <SelectTrigger className={errors.projectType ? "border-destructive" : ""}><SelectValue placeholder="Select type" /></SelectTrigger>
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
                        <Label>Floors</Label>
                        <Select value={formData.floors} onValueChange={(v) => handleChange("floors", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-4">2-4</SelectItem><SelectItem value="5-8">5-8</SelectItem>
                            <SelectItem value="9-15">9-15</SelectItem><SelectItem value="16-25">16-25</SelectItem>
                            <SelectItem value="25+">25+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Capacity</Label>
                        <Select value={formData.capacity} onValueChange={(v) => handleChange("capacity", v)}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4-person">4 Person</SelectItem><SelectItem value="6-person">6 Person</SelectItem>
                            <SelectItem value="8-person">8 Person</SelectItem><SelectItem value="13-person">13 Person</SelectItem>
                            <SelectItem value="goods">Goods Lift</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Requirements <span className="text-destructive">*</span></Label>
                      <Textarea value={formData.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Describe your project..." rows={5} className={errors.message ? "border-destructive" : ""} />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Request Free Quote"}
                    </Button>
                  </form>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4"><Phone className="w-5 h-5 text-gold mt-1" /><div><p className="font-medium text-foreground">Phone</p><p className="text-muted-foreground">{sidebarPhone}</p></div></div>
                    <div className="flex items-start gap-4"><Mail className="w-5 h-5 text-gold mt-1" /><div><p className="font-medium text-foreground">Email</p><p className="text-muted-foreground">{sidebarEmail}</p></div></div>
                    <div className="flex items-start gap-4"><MapPin className="w-5 h-5 text-gold mt-1" /><div><p className="font-medium text-foreground">Address</p><p className="text-muted-foreground">{sidebarAddress}</p></div></div>
                    <div className="flex items-start gap-4"><Clock className="w-5 h-5 text-gold mt-1" /><div><p className="font-medium text-foreground">Working Hours</p><p className="text-muted-foreground">{sidebarHours}</p></div></div>
                  </div>
                </div>
                <div className="bg-primary rounded-2xl p-6 shadow-lg">
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-6">Why Get a Quote from Us?</h3>
                  <div className="space-y-4">
                    {benefits.map((item: string, i: number) => (
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
