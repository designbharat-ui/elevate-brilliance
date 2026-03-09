import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import elevator1 from "@/assets/elevator-1.jpeg";
import elevator2 from "@/assets/elevator-2.jpeg";
import elevator3 from "@/assets/elevator-3.jpeg";
import elevator4 from "@/assets/elevator-4.jpeg";
import heroBlog from "@/assets/hero-blog.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const blogPosts = [
  { slug: "elevator-safety-tips-guide", title: "Complete Elevator Safety Tips: A Guide for Passengers & Building Owners", excerpt: "Learn essential elevator safety tips for passengers and building owners.", image: elevator1, author: "Rising Star Team", date: "December 15, 2024", readTime: "5 min read", category: "Safety" },
  { slug: "choosing-right-elevator-home", title: "How to Choose the Right Elevator for Your Home in 2025", excerpt: "A comprehensive guide to selecting the perfect home elevator.", image: elevator2, author: "Rising Star Team", date: "December 10, 2024", readTime: "7 min read", category: "Guide" },
  { slug: "mrl-vs-traditional-elevators", title: "MRL vs Traditional Elevators: Which is Better for Your Building?", excerpt: "Compare Machine Room Less (MRL) elevators with traditional traction elevators.", image: elevator3, author: "Rising Star Team", date: "December 5, 2024", readTime: "6 min read", category: "Technology" },
  { slug: "elevator-maintenance-importance", title: "Why Regular Elevator Maintenance is Crucial for Safety & Longevity", excerpt: "Discover the importance of regular elevator maintenance.", image: elevator4, author: "Rising Star Team", date: "November 28, 2024", readTime: "4 min read", category: "Maintenance" },
];

export default function Blog() {
  const { page, getField } = usePageContent("blog");

  const heroLabel = getField("hero", "label", "Insights & Updates");
  const heroTitle = getField("hero", "title", "Our Blog");
  const heroDescription = getField("hero", "description", "Expert insights on elevators, safety tips, maintenance guides, and industry news.");
  const ctaTitle = getField("cta", "title", "Stay Updated");
  const ctaDesc = getField("cta", "description", "Get the latest elevator industry news, safety tips, and expert insights delivered to your inbox.");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Rising Star Elevator Blog",
    "description": "Expert insights on elevators, escalators, safety tips, and industry news",
    "url": "https://risingstarelevator.com/blog",
    "publisher": { "@type": "Organization", "name": "Rising Star Elevator Pvt. Ltd." },
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page?.meta_title || "Blog - Elevator Tips, Safety & Industry Insights"}
        description={page?.meta_description || "Read expert articles on elevator safety, maintenance tips, buying guides, and industry news."}
        keywords="elevator blog, lift safety tips, elevator maintenance, home elevator guide"
        canonicalUrl="/blog"
        ogType="blog"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="absolute inset-0">
            <img src={heroBlog} alt="Blog Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4">{heroLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our <span className="text-gradient-gold">Blog</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg">{heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="group bg-card border border-border rounded-lg overflow-hidden card-hover">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-gold/10 text-gold text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm"><Clock className="w-4 h-4" />{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="text-gold font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {ctaTitle.includes("Updated") ? <>Stay <span className="text-gradient-gold">Updated</span></> : ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{ctaDesc}</p>
            <Link to="/contact" className="btn-gold inline-flex items-center">
              Subscribe to Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
