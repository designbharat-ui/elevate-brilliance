import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import NotFound from "./NotFound";

interface ContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "section";
  content: string;
  level?: number;
  alt?: string;
}

interface PageData {
  title: string;
  slug: string;
  content: ContentBlock[];
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  status: string;
}

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) { setNotFound(true); setLoading(false); return; }

      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPage({
          ...data,
          content: Array.isArray(data.content) ? (data.content as unknown as ContentBlock[]) : [],
        });
        // Track page view
        supabase.rpc("increment_page_view", { p_slug: slug });
      }
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !page) return <NotFound />;

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading": {
        const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return <Tag key={block.id} className="font-display font-bold text-foreground mb-4">{block.content}</Tag>;
      }
      case "paragraph":
        return <p key={block.id} className="text-muted-foreground mb-4 leading-relaxed">{block.content}</p>;
      case "image":
        return (
          <figure key={block.id} className="mb-6">
            <img src={block.content} alt={block.alt || ""} className="w-full rounded-lg" loading="lazy" />
            {block.alt && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{block.alt}</figcaption>}
          </figure>
        );
      case "section":
        return <div key={block.id} className="mb-6" dangerouslySetInnerHTML={{ __html: block.content }} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={page.meta_title || page.title}
        description={page.meta_description || ""}
        canonicalUrl={`/page/${page.slug}`}
        ogImage={page.og_image || undefined}
      />
      <Header />
      <main>
        <section className="relative py-24 bg-gradient-hero">
          <div className="container relative z-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {page.title}
            </h1>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container max-w-4xl">
            {page.content.map(renderBlock)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
