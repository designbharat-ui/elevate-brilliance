import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { usePageContent } from "@/hooks/usePageContent";

export default function Contact() {
  const { page, getField } = usePageContent("contact");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const heroLabel = getField("hero", "label", "Contact Us");
  const heroTitle = getField("hero", "title", "Get In Touch");
  const heroDescription = getField("hero", "description", "We're here to help with all your elevator needs.");

  const contactFields = page?.sections.find(s => s.id === "contact-info")?.fields;
  const address = contactFields?.address || "722A, Jaina Tower 2, District Centre Janakpuri, Delhi, India";
  const phone = contactFields?.phone || "+91 8800732223";
  const email = contactFields?.email || "info@risingstarelevator.com";
  const hours = contactFields?.hours || "Mon-Sat: 9AM - 6PM";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Contact Us - Get Free Elevator Quote"}
        description={page?.meta_description || "Contact Rising Star Elevator for free consultation and quote. 24/7 emergency support available."}
        keywords="contact elevator company, elevator quote, lift enquiry, elevator service Delhi"
        canonicalUrl="/contact"
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{heroLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {heroTitle.includes("Touch") ? (
                  <>Get In <span className="text-gradient-gold">Touch</span></>
                ) : heroTitle}
              </h1>
              <p className="text-primary-foreground/80 text-lg">{heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <Input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    <Input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                  </div>
                  <Textarea placeholder="Your Message *" rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                  <Button type="submit" className="btn-gold"><Send className="mr-2 h-4 w-4" />Send Message</Button>
                </form>
              </div>
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Info</h2>
                {[
                  { icon: MapPin, title: "Address", content: address },
                  { icon: Phone, title: "Phone", content: phone },
                  { icon: Mail, title: "Email", content: email },
                  { icon: Clock, title: "Working Hours", content: hours },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                    <item.icon className="w-6 h-6 text-gold flex-shrink-0" />
                    <div><p className="font-medium text-foreground">{item.title}</p><p className="text-muted-foreground">{item.content}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
