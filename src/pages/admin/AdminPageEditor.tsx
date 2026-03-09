import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { Json } from "@/integrations/supabase/types";
import {
  ArrowLeft, Save, Plus, Trash2, ChevronUp, ChevronDown,
  FileText, Image as ImageIcon, Type, Layout, GripVertical,
  Eye, PanelLeftClose, PanelLeft, Upload
} from "lucide-react";

interface PageSection {
  id: string;
  type: string;
  fields: Record<string, any>;
}

interface ContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "section";
  content: string;
  level?: number;
  alt?: string;
  imageUrl?: string;
}

const SYSTEM_PAGES = [
  "home", "about", "vision-mission", "business-strategy", "products",
  "product-features", "services", "new-equipment", "contact", "get-quote",
  "gallery", "projects", "blog", "sitemap"
];

const SLUG_TO_ROUTE: Record<string, string> = {
  home: "/", about: "/about", "vision-mission": "/vision-mission",
  "business-strategy": "/business-strategy", products: "/products",
  "product-features": "/product-features", services: "/services",
  "new-equipment": "/new-equipment", contact: "/contact",
  "get-quote": "/get-quote", gallery: "/gallery", projects: "/projects",
  blog: "/blog", sitemap: "/sitemap",
};

export default function AdminPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNew = id === "new";
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [isSystemPage, setIsSystemPage] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (!isNew && id) loadPage(id);
  }, [id]);

  const loadPage = async (pageId: string) => {
    const { data, error } = await supabase
      .from("pages").select("*").eq("id", pageId).single();
    if (error || !data) { toast.error("Page not found"); navigate("/admin/pages"); return; }

    setTitle(data.title);
    setSlug(data.slug);
    setStatus(data.status);
    setMetaTitle(data.meta_title || "");
    setMetaDescription(data.meta_description || "");
    setOgImage(data.og_image || "");

    const isSys = SYSTEM_PAGES.includes(data.slug);
    setIsSystemPage(isSys);

    const content = data.content as any;
    if (content?.sections) {
      setSections(content.sections);
    } else if (Array.isArray(content)) {
      setBlocks(content as unknown as ContentBlock[]);
    }
  };

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const getPreviewUrl = () => {
    const route = SLUG_TO_ROUTE[slug] || `/page/${slug}`;
    return `${window.location.origin}${route}`;
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = getPreviewUrl();
    }
  };

  // Section helpers
  const updateSectionField = (sectionId: string, fieldName: string, value: any) => {
    setSections(prev =>
      prev.map(s => s.id === sectionId ? { ...s, fields: { ...s.fields, [fieldName]: value } } : s)
    );
  };

  const addSection = () => {
    setSections(prev => [...prev, {
      id: `section-${Date.now()}`,
      type: "content_block",
      fields: { title: "New Section", content: "" }
    }]);
  };

  const removeSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    setSections(prev => {
      const arr = [...prev];
      const t = idx + dir;
      if (t < 0 || t >= arr.length) return arr;
      [arr[idx], arr[t]] = [arr[t], arr[idx]];
      return arr;
    });
  };

  // Block helpers
  const addBlock = (type: ContentBlock["type"]) => {
    setBlocks(prev => [...prev, {
      id: `block-${Date.now()}`, type, content: "",
      level: type === "heading" ? 2 : undefined
    }]);
  };

  const updateBlock = (idx: number, updates: Partial<ContentBlock>) => {
    setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, ...updates } : b));
  };

  const removeBlock = (idx: number) => {
    setBlocks(prev => prev.filter((_, i) => i !== idx));
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    setBlocks(prev => {
      const arr = [...prev];
      const t = idx + dir;
      if (t < 0 || t >= arr.length) return arr;
      [arr[idx], arr[t]] = [arr[t], arr[idx]];
      return arr;
    });
  };

  const handleImageUpload = async (idx: number, file: File) => {
    const path = `pages/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    updateBlock(idx, { content: publicUrl, imageUrl: publicUrl });
    await supabase.from("media").insert({
      file_name: file.name, file_path: publicUrl,
      mime_type: file.type, file_size: file.size, uploaded_by: user?.id,
    });
  };

  const handleSectionImageUpload = async (sectionId: string, fieldName: string, file: File) => {
    const path = `pages/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    updateSectionField(sectionId, fieldName, publicUrl);
    await supabase.from("media").insert({
      file_name: file.name, file_path: publicUrl,
      mime_type: file.type, file_size: file.size, uploaded_by: user?.id,
    });
  };

  const handleSave = async () => {
    if (!title || !slug) { toast.error("Title and slug are required"); return; }
    setSaving(true);

    const content = (isSystemPage || sections.length > 0)
      ? ({ sections } as unknown as Json)
      : (blocks as unknown as Json);

    const pageData = {
      title, slug, status, content,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      ...(isNew && { created_by: user?.id }),
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("pages").insert(pageData));
    } else {
      ({ error } = await supabase.from("pages").update(pageData).eq("id", id));
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isNew ? "Page created!" : "Page saved!");
      if (isNew) navigate("/admin/pages");
      else setTimeout(refreshPreview, 500);
    }
    setSaving(false);
  };

  const renderFieldEditor = (sectionId: string, key: string, value: any) => {
    if (value === null || value === undefined) return null;

    // Handle arrays of objects (timeline items, stat items, etc.)
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")}
          </Label>
          <div className="space-y-3 pl-3 border-l-2 border-accent/30">
            {value.map((item: any, i: number) => (
              <Card key={i} className="p-3 space-y-2 bg-muted/30">
                <span className="text-xs text-muted-foreground">Item {i + 1}</span>
                {Object.entries(item).map(([itemKey, itemVal]) => (
                  <div key={itemKey} className="space-y-1">
                    <Label className="text-xs text-muted-foreground capitalize">{itemKey}</Label>
                    {typeof itemVal === "string" && itemVal.length > 80 ? (
                      <Textarea
                        value={itemVal}
                        rows={2}
                        onChange={(e) => {
                          const newArr = [...value];
                          newArr[i] = { ...newArr[i], [itemKey]: e.target.value };
                          updateSectionField(sectionId, key, newArr);
                        }}
                        className="text-sm"
                      />
                    ) : typeof itemVal === "string" ? (
                      <Input
                        value={itemVal}
                        onChange={(e) => {
                          const newArr = [...value];
                          newArr[i] = { ...newArr[i], [itemKey]: e.target.value };
                          updateSectionField(sectionId, key, newArr);
                        }}
                        className="text-sm"
                      />
                    ) : Array.isArray(itemVal) ? (
                      <div className="space-y-1">
                        {(itemVal as string[]).map((v: string, vi: number) => (
                          <Input
                            key={vi}
                            value={v}
                            onChange={(e) => {
                              const newArr = [...value];
                              const newItems = [...(itemVal as string[])];
                              newItems[vi] = e.target.value;
                              newArr[i] = { ...newArr[i], [itemKey]: newItems };
                              updateSectionField(sectionId, key, newArr);
                            }}
                            className="text-sm"
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </div>
      );
    }

    // Handle arrays of strings (benefits, features, etc.)
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")}
          </Label>
          <div className="space-y-1">
            {value.map((item: string, i: number) => (
              <Input
                key={i}
                value={item}
                onChange={(e) => {
                  const newArr = [...value];
                  newArr[i] = e.target.value;
                  updateSectionField(sectionId, key, newArr);
                }}
                className="text-sm"
              />
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => updateSectionField(sectionId, key, [...value, ""])}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>
        </div>
      );
    }

    // Handle image fields
    if (typeof value === "string" && (key.includes("image") || key.includes("bg_image") || key.includes("photo"))) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")}
          </Label>
          {value && (
            <img src={value} alt="" className="max-h-24 rounded-lg object-cover" />
          )}
          <div className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => updateSectionField(sectionId, key, e.target.value)}
              placeholder="Image URL or upload..."
              className="text-sm flex-1"
            />
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span><Upload className="h-3 w-3" /></span>
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleSectionImageUpload(sectionId, key, e.target.files[0])}
              />
            </label>
          </div>
        </div>
      );
    }

    // Handle long text
    if (typeof value === "string" && value.length > 100) {
      return (
        <div key={key} className="space-y-1">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")}
          </Label>
          <Textarea
            value={value}
            rows={3}
            onChange={(e) => updateSectionField(sectionId, key, e.target.value)}
            className="text-sm"
          />
        </div>
      );
    }

    // Handle short text
    if (typeof value === "string") {
      return (
        <div key={key} className="space-y-1">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")}
          </Label>
          <Input
            value={value}
            onChange={(e) => updateSectionField(sectionId, key, e.target.value)}
            className="text-sm"
          />
        </div>
      );
    }

    return null;
  };

  const renderSectionEditor = (section: PageSection, idx: number) => {
    const fields = section.fields || {};
    const typeLabels: Record<string, string> = {
      hero: "🎯 Hero Section",
      text_image: "📝 Text + Image",
      cards: "🃏 Cards Section",
      timeline: "📅 Timeline",
      stats: "📊 Stats",
      list: "📋 List",
      services_grid: "⚙️ Services Grid",
      products_grid: "📦 Products Grid",
      features: "✨ Features",
      testimonials: "💬 Testimonials",
      gallery: "🖼️ Photo Gallery",
      video_gallery: "🎬 Video Gallery",
      contact_form: "📧 Contact Form",
      quote_form: "📋 Quote Form",
      contact_sidebar: "📱 Contact Sidebar",
      contact: "📍 Contact Info",
      cta: "🚀 Call to Action",
      content_block: "📄 Content Block",
      offerings: "🏢 Offerings",
      blog_grid: "📰 Blog Grid",
      projects_grid: "🏗️ Projects Grid",
    };

    return (
      <Card key={section.id} className="p-4 space-y-3 border-l-4 border-l-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <span className="text-sm font-semibold text-foreground">
              {typeLabels[section.type] || section.type}
            </span>
            <Badge variant="outline" className="text-xs">{section.id}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => moveSection(idx, -1)} disabled={idx === 0}>
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1}>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeSection(section.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {Object.entries(fields).map(([key, val]) => renderFieldEditor(section.id, key, val))}
        </div>
      </Card>
    );
  };

  const renderBlockEditor = (block: ContentBlock, idx: number) => (
    <Card key={block.id} className="p-3 border-l-4 border-l-accent/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <Badge variant="outline" className="text-xs capitalize">{block.type}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => moveBlock(idx, -1)} disabled={idx === 0}>
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1}>
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeBlock(idx)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {block.type === "heading" && (
        <div className="flex gap-2">
          <select
            className="border rounded px-2 py-1 text-sm bg-background text-foreground w-16"
            value={block.level || 2}
            onChange={(e) => updateBlock(idx, { level: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 5, 6].map(l => <option key={l} value={l}>H{l}</option>)}
          </select>
          <Input value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} placeholder="Heading..." className="flex-1 text-sm" />
        </div>
      )}
      {block.type === "paragraph" && (
        <Textarea value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} rows={3} placeholder="Paragraph..." className="text-sm" />
      )}
      {block.type === "image" && (
        <div className="space-y-2">
          {block.content && <img src={block.content} alt={block.alt || ""} className="max-h-32 rounded" />}
          <label className="block">
            <span className="text-xs text-muted-foreground">Upload image:</span>
            <input type="file" accept="image/*" className="text-sm mt-1" onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, e.target.files[0])} />
          </label>
          <Input value={block.alt || ""} onChange={(e) => updateBlock(idx, { alt: e.target.value })} placeholder="Alt text..." className="text-sm" />
        </div>
      )}
      {block.type === "section" && (
        <Textarea value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} rows={5} placeholder="HTML..." className="text-sm font-mono" />
      )}
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/pages")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="font-display text-xl font-bold text-foreground truncate max-w-[200px]">
              {isNew ? "New Page" : title}
            </h1>
            {isSystemPage && <Badge variant="secondary" className="text-xs">System</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              title={showPreview ? "Hide preview" : "Show preview"}
            >
              {showPreview ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </Button>
            <select
              className="border rounded px-2 py-1.5 text-sm bg-background text-foreground"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <Button onClick={handleSave} disabled={saving} className="btn-gold" size="sm">
              <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Main editor area */}
        <div className={`grid gap-4 ${showPreview ? "grid-cols-2" : "grid-cols-1"}`} style={{ minHeight: "calc(100vh - 180px)" }}>
          {/* Editor panel */}
          <div className="overflow-y-auto space-y-4 pr-2" style={{ maxHeight: "calc(100vh - 180px)" }}>
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
                <TabsTrigger value="seo" className="flex-1">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-3 mt-3">
                {/* Title & Slug */}
                <Card className="p-3 space-y-3">
                  <div>
                    <Label className="text-xs">Page Title</Label>
                    <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Page title..." className="text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">URL Slug</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-xs">/</span>
                      <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" disabled={isSystemPage} className="text-sm" />
                    </div>
                    {isSystemPage && <p className="text-xs text-muted-foreground mt-1">System page slug cannot be changed.</p>}
                  </div>
                </Card>

                {/* Sections or Blocks */}
                {(isSystemPage || sections.length > 0) ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-foreground">Page Sections ({sections.length})</h3>
                      <Button variant="outline" size="sm" onClick={addSection} className="text-xs">
                        <Plus className="h-3 w-3 mr-1" /> Add Section
                      </Button>
                    </div>
                    {sections.map((section, idx) => renderSectionEditor(section, idx))}
                    {sections.length === 0 && (
                      <Card className="p-6 text-center text-muted-foreground text-sm">
                        No sections yet. Add sections to start editing page content.
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-foreground">Content Blocks ({blocks.length})</h3>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => addBlock("heading")} className="text-xs">
                          <Type className="h-3 w-3 mr-1" /> H
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addBlock("paragraph")} className="text-xs">
                          <FileText className="h-3 w-3 mr-1" /> P
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addBlock("image")} className="text-xs">
                          <ImageIcon className="h-3 w-3 mr-1" /> Img
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addBlock("section")} className="text-xs">
                          <Layout className="h-3 w-3 mr-1" /> HTML
                        </Button>
                      </div>
                    </div>
                    {blocks.map((block, idx) => renderBlockEditor(block, idx))}
                    {blocks.length === 0 && (
                      <Card className="p-6 text-center text-muted-foreground text-sm">
                        No content blocks. Add blocks above to build your page.
                      </Card>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="seo" className="space-y-3 mt-3">
                <Card className="p-3 space-y-3">
                  <div>
                    <Label className="text-xs">Meta Title</Label>
                    <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (60 chars max)" className="text-sm" />
                    <p className="text-xs text-muted-foreground mt-1">{metaTitle.length}/60</p>
                  </div>
                  <div>
                    <Label className="text-xs">Meta Description</Label>
                    <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (160 chars max)" rows={3} className="text-sm" />
                    <p className="text-xs text-muted-foreground mt-1">{metaDescription.length}/160</p>
                  </div>
                  <div>
                    <Label className="text-xs">OG Image URL</Label>
                    <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." className="text-sm" />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live preview panel */}
          {showPreview && (
            <div className="border border-border rounded-lg overflow-hidden bg-muted/30 flex flex-col">
              <div className="flex items-center justify-between px-3 py-2 bg-muted border-b border-border">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
                </div>
                <Button variant="ghost" size="sm" onClick={refreshPreview} className="text-xs h-6">
                  Refresh
                </Button>
              </div>
              {!isNew && slug ? (
                <iframe
                  ref={iframeRef}
                  src={getPreviewUrl()}
                  className="flex-1 w-full bg-white"
                  title="Page Preview"
                  style={{ minHeight: "calc(100vh - 220px)" }}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                  Save the page first to see the preview
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
