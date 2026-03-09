import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Globe } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface PageSEO {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
}

export default function AdminSEO() {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [globalTitle, setGlobalTitle] = useState("");
  const [globalDescription, setGlobalDescription] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("pages").select("id, title, slug, meta_title, meta_description, og_image").order("title");
      setPages(data || []);

      const { data: settings } = await supabase.from("site_settings").select("*").in("key", ["global_meta_title", "global_meta_description"]);
      settings?.forEach((s) => {
        if (s.key === "global_meta_title") setGlobalTitle((s.value as string) || "");
        if (s.key === "global_meta_description") setGlobalDescription((s.value as string) || "");
      });
    };
    fetch();
  }, []);

  const saveGlobal = async () => {
    for (const [key, value] of [["global_meta_title", globalTitle], ["global_meta_description", globalDescription]]) {
      await supabase.from("site_settings").upsert({ key, value: value as unknown as Json }, { onConflict: "key" });
    }
    toast.success("Global SEO settings saved!");
  };

  const updatePageSEO = async (page: PageSEO) => {
    const { error } = await supabase.from("pages").update({
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      og_image: page.og_image,
    }).eq("id", page.id);
    if (error) toast.error(error.message);
    else toast.success(`SEO updated for "${page.title}"`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground">SEO Settings</h1>

        <Card className="p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-accent" /> Global SEO
          </h2>
          <div className="space-y-2">
            <Label>Default Meta Title</Label>
            <Input value={globalTitle} onChange={(e) => setGlobalTitle(e.target.value)} placeholder="Rising Star Elevator Pvt. Ltd." />
          </div>
          <div className="space-y-2">
            <Label>Default Meta Description</Label>
            <Textarea value={globalDescription} onChange={(e) => setGlobalDescription(e.target.value)} rows={2} />
          </div>
          <Button onClick={saveGlobal} className="btn-gold">
            <Save className="h-4 w-4 mr-2" /> Save Global Settings
          </Button>
        </Card>

        <h2 className="font-display text-xl font-semibold">Per-Page SEO</h2>
        {pages.map((page) => (
          <Card key={page.id} className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground">{page.title} <span className="text-muted-foreground text-sm font-normal">/{page.slug}</span></h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Meta Title</Label>
                <Input
                  value={page.meta_title || ""}
                  onChange={(e) => setPages(pages.map((p) => p.id === page.id ? { ...p, meta_title: e.target.value } : p))}
                  placeholder="Page meta title"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">OG Image URL</Label>
                <Input
                  value={page.og_image || ""}
                  onChange={(e) => setPages(pages.map((p) => p.id === page.id ? { ...p, og_image: e.target.value } : p))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Meta Description</Label>
              <Textarea
                value={page.meta_description || ""}
                onChange={(e) => setPages(pages.map((p) => p.id === page.id ? { ...p, meta_description: e.target.value } : p))}
                rows={2}
              />
            </div>
            <Button size="sm" onClick={() => updatePageSEO(page)} className="btn-gold">
              <Save className="h-3 w-3 mr-1" /> Save
            </Button>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
