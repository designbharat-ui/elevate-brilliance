import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const SYSTEM_PAGES = ["home", "about", "vision-mission", "business-strategy", "products", "product-features", "services", "new-equipment", "contact", "get-quote", "gallery", "projects", "blog", "sitemap"];

const SLUG_TO_ROUTE: Record<string, string> = {
  "home": "/",
  "about": "/about",
  "vision-mission": "/vision-mission",
  "business-strategy": "/business-strategy",
  "products": "/products",
  "product-features": "/product-features",
  "services": "/services",
  "new-equipment": "/new-equipment",
  "contact": "/contact",
  "get-quote": "/get-quote",
  "gallery": "/gallery",
  "projects": "/projects",
  "blog": "/blog",
  "sitemap": "/sitemap",
};

const getRouteForPage = (slug: string, parentSlug?: string | null): string => {
  if (SLUG_TO_ROUTE[slug]) return SLUG_TO_ROUTE[slug];
  if (parentSlug === "products") return `/products/${slug}`;
  if (parentSlug === "services") return `/services/${slug}`;
  return `/page/${slug}`;
};

interface Page {
  id: string;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
  meta_title: string | null;
  parent_slug: string | null;
  is_visible: boolean;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPages = async () => {
    const { data } = await supabase
      .from("pages")
      .select("id, title, slug, status, updated_at, meta_title")
      .order("page_order", { ascending: true });
    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const deletePage = async (id: string, slug: string) => {
    if (SYSTEM_PAGES.includes(slug)) {
      toast.error("System pages cannot be deleted");
      return;
    }
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete page");
    } else {
      toast.success("Page deleted");
      fetchPages();
    }
  };

  const toggleStatus = async (id: string, current: string) => {
    const newStatus = current === "published" ? "draft" : "published";
    await supabase.from("pages").update({ status: newStatus }).eq("id", id);
    toast.success(`Page ${newStatus}`);
    fetchPages();
  };

  const getViewUrl = (slug: string) => SLUG_TO_ROUTE[slug] || `/page/${slug}`;

  const filtered = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Pages</h1>
            <p className="text-sm text-muted-foreground mt-1">{pages.length} pages total • {pages.filter(p => SYSTEM_PAGES.includes(p.slug)).length} system pages</p>
          </div>
          <Button onClick={() => navigate("/admin/pages/new")} className="btn-gold">
            <Plus className="h-4 w-4 mr-2" /> New Page
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No pages found</p>
            <Button onClick={() => navigate("/admin/pages/new")} className="btn-gold">
              <Plus className="h-4 w-4 mr-2" /> Create First Page
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((page) => {
              const isSystem = SYSTEM_PAGES.includes(page.slug);
              return (
                <Card key={page.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{page.title}</h3>
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>
                        {page.status}
                      </Badge>
                      {isSystem && (
                        <Badge variant="outline" className="text-xs">System</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getViewUrl(page.slug)} • Updated {new Date(page.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={getViewUrl(page.slug)} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleStatus(page.id, page.status)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/pages/${page.id}`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!isSystem && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{page.title}"?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePage(page.id, page.slug)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
