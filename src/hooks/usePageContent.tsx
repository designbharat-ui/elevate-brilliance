import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PageSection {
  id: string;
  type: string;
  fields: Record<string, any>;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  sections: PageSection[];
}

interface UsePageContentReturn {
  page: PageContent | null;
  loading: boolean;
  getField: (sectionId: string, fieldName: string, fallback?: string) => string;
  getSectionFields: (sectionId: string) => Record<string, any> | null;
}

export function usePageContent(slug: string): UsePageContentReturn {
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      const { data } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (data) {
        const content = data.content as any;
        const sections: PageSection[] = content?.sections || [];
        setPage({
          id: data.id,
          title: data.title,
          slug: data.slug,
          status: data.status,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          og_image: data.og_image,
          sections,
        });
      }
      setLoading(false);
    };
    fetchPage();

    // Track page view
    supabase.rpc("increment_page_view", { p_slug: slug });
  }, [slug]);

  const getField = (sectionId: string, fieldName: string, fallback = ""): string => {
    if (!page) return fallback;
    const section = page.sections.find((s) => s.id === sectionId);
    return section?.fields?.[fieldName] ?? fallback;
  };

  const getSectionFields = (sectionId: string): Record<string, any> | null => {
    if (!page) return null;
    const section = page.sections.find((s) => s.id === sectionId);
    return section?.fields ?? null;
  };

  return { page, loading, getField, getSectionFields };
}
