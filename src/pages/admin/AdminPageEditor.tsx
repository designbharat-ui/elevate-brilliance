import { useEffect, useState, useRef } from "react";
import { LivePreviewEditor } from "@/components/admin/LivePreviewEditor";
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
  Eye, Upload, ExternalLink, Pencil, Monitor, X, Check
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

const TYPE_CONFIG: Record<string, { emoji: string; label: string; bgClass: string }> = {
  hero: { emoji: "🎯", label: "Hero Section", bgClass: "bg-primary text-primary-foreground" },
  text_image: { emoji: "📝", label: "Text + Image", bgClass: "bg-background" },
  cards: { emoji: "🃏", label: "Cards Section", bgClass: "bg-secondary" },
  timeline: { emoji: "📅", label: "Timeline", bgClass: "bg-secondary" },
  stats: { emoji: "📊", label: "Stats", bgClass: "bg-muted" },
  list: { emoji: "📋", label: "List", bgClass: "bg-background" },
  services_grid: { emoji: "⚙️", label: "Services Grid", bgClass: "bg-background" },
  products_grid: { emoji: "📦", label: "Products Grid", bgClass: "bg-background" },
  features: { emoji: "✨", label: "Features", bgClass: "bg-primary text-primary-foreground" },
  testimonials: { emoji: "💬", label: "Testimonials", bgClass: "bg-secondary" },
  gallery: { emoji: "🖼️", label: "Photo Gallery", bgClass: "bg-background" },
  video_gallery: { emoji: "🎬", label: "Video Gallery", bgClass: "bg-muted" },
  contact_form: { emoji: "📧", label: "Contact Form", bgClass: "bg-background" },
  quote_form: { emoji: "📋", label: "Quote Form", bgClass: "bg-background" },
  contact: { emoji: "📍", label: "Contact Info", bgClass: "bg-muted" },
  cta: { emoji: "🚀", label: "Call to Action", bgClass: "bg-accent" },
  content_block: { emoji: "📄", label: "Content Block", bgClass: "bg-background" },
  blog_grid: { emoji: "📰", label: "Blog Grid", bgClass: "bg-background" },
  projects_grid: { emoji: "🏗️", label: "Projects Grid", bgClass: "bg-background" },
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
  const [sections, setSections] = useState<PageSection[]>([]);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [parentSlug, setParentSlug] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");
  const [previewKey, setPreviewKey] = useState(0);

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
    setParentSlug(data.parent_slug || "");
    setIsVisible(data.is_visible !== false);

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

  // Section helpers
  const updateSectionField = (sectionId: string, fieldName: string, value: any) => {
    setSections(prev =>
      prev.map(s => s.id === sectionId ? { ...s, fields: { ...s.fields, [fieldName]: value } } : s)
    );
  };

  const addSection = () => {
    const newId = `section-${Date.now()}`;
    setSections(prev => [...prev, {
      id: newId, type: "content_block",
      fields: { title: "New Section", content: "" }
    }]);
    setExpandedSection(newId);
  };

  const removeSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    if (expandedSection === sectionId) setExpandedSection(null);
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

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const path = `pages/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    callback(publicUrl);
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
      parent_slug: parentSlug || null,
      is_visible: isVisible,
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
      setPreviewKey(k => k + 1); // refresh iframe
      if (isNew) navigate("/admin/pages");
    }
    setSaving(false);
  };

  // ---- Visual Section Preview ----
  const renderSectionPreview = (section: PageSection) => {
    const f = section.fields || {};
    const type = section.type;

    if (type === "hero") {
      return (
        <div className="bg-primary rounded-lg p-6 space-y-2">
          {f.label && <span className="text-gold text-xs font-medium uppercase tracking-widest">{f.label}</span>}
          {f.badge_text && <p className="text-gold/80 text-xs">{f.badge_text}</p>}
          <h2 className="text-primary-foreground font-display text-2xl font-bold">
            {f.title} {f.highlight_text && <span className="text-gold">{f.highlight_text}</span>}
          </h2>
          {f.subtitle && <p className="text-primary-foreground text-lg font-semibold">{f.subtitle}</p>}
          {f.description && <p className="text-primary-foreground/70 text-sm">{f.description}</p>}
          {f.bg_image && (
            <div className="mt-2 rounded overflow-hidden h-20 relative">
              <img src={f.bg_image} alt="Hero background" className="w-full h-full object-cover opacity-40" />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-primary-foreground">Background Image</span>
            </div>
          )}
          {f.cta_primary_text && (
            <div className="flex gap-2 mt-2">
              <span className="bg-gold/20 text-gold px-3 py-1 rounded text-xs">{f.cta_primary_text}</span>
              {f.cta_secondary_text && <span className="border border-gold/30 text-gold px-3 py-1 rounded text-xs">{f.cta_secondary_text}</span>}
            </div>
          )}
        </div>
      );
    }

    if (type === "stats") {
      return (
        <div className="bg-secondary rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-2">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-3">{f.title}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {f.items?.map((item: any, i: number) => (
              <div key={i} className="bg-card rounded p-3 text-center">
                <div className="text-xl font-bold text-gold">{item.value}{item.suffix}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "services_grid" || type === "products_grid") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-3">{f.title} {f.highlight_text && <span className="text-gold">{f.highlight_text}</span>}</p>}
          <div className="grid grid-cols-2 gap-2">
            {f.items?.slice(0, 4).map((item: any, i: number) => (
              <div key={i} className="bg-muted/50 rounded p-3">
                <p className="font-semibold text-sm text-foreground">{item.title || item.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
          {f.items?.length > 4 && <p className="text-xs text-muted-foreground mt-2">+{f.items.length - 4} more items</p>}
        </div>
      );
    }

    if (type === "features") {
      return (
        <div className="bg-primary rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-primary-foreground mb-3">{f.title} {f.highlight_text && <span className="text-gold">{f.highlight_text}</span>}</p>}
          <div className="grid grid-cols-3 gap-2">
            {f.items?.slice(0, 6).map((item: any, i: number) => (
              <div key={i} className="bg-primary-foreground/5 rounded p-2">
                <p className="font-semibold text-xs text-primary-foreground">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "testimonials") {
      return (
        <div className="bg-secondary rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-3">{f.title} {f.highlight_text && <span className="text-gold">{f.highlight_text}</span>}</p>}
          {f.items?.[0] && (
            <div className="bg-card rounded p-3">
              <p className="text-sm text-muted-foreground italic">"{f.items[0].quote?.substring(0, 100)}..."</p>
              <p className="text-xs font-semibold text-foreground mt-2">— {f.items[0].name}</p>
            </div>
          )}
          {f.items?.length > 1 && <p className="text-xs text-muted-foreground mt-2">+{f.items.length - 1} more testimonials</p>}
        </div>
      );
    }

    if (type === "text_image") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-2">{f.title}</p>}
          {f.content && <p className="text-sm text-muted-foreground line-clamp-3">{f.content}</p>}
          {f.paragraphs && <p className="text-sm text-muted-foreground line-clamp-3">{f.paragraphs[0]}</p>}
          {f.highlight && <p className="text-gold text-xs italic mt-2">"{f.highlight}"</p>}
          {f.image && (
            <div className="mt-2 rounded overflow-hidden h-20">
              <img src={f.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );
    }

    if (type === "cards") {
      return (
        <div className="bg-secondary rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-3">{f.title}</p>}
          {f.items && (
            <div className="grid grid-cols-3 gap-2">
              {f.items.map((item: any, i: number) => (
                <div key={i} className="bg-card rounded p-2">
                  <p className="font-semibold text-xs text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
          {f.vision && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{f.vision}</p>}
        </div>
      );
    }

    if (type === "timeline") {
      return (
        <div className="bg-secondary rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-3">{f.title}</p>}
          <div className="space-y-1">
            {f.items?.slice(0, 4).map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gold font-bold text-xs">{item.year}</span>
                <span className="text-xs text-foreground">{item.title}</span>
              </div>
            ))}
            {f.items?.length > 4 && <p className="text-xs text-muted-foreground">+{f.items.length - 4} more</p>}
          </div>
        </div>
      );
    }

    if (type === "gallery") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="font-display font-bold text-foreground mb-2">Photo Gallery</p>
          <div className="grid grid-cols-4 gap-1">
            {f.images?.slice(0, 4).map((img: any, i: number) => (
              <div key={i} className="aspect-square bg-muted rounded overflow-hidden">
                {typeof img === 'string' && img.startsWith('http') ? (
                  <img src={img} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg">🖼️</div>
                )}
              </div>
            ))}
          </div>
          {f.images?.length > 4 && <p className="text-xs text-muted-foreground mt-1">+{f.images.length - 4} more photos</p>}
        </div>
      );
    }

    if (type === "list") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          {f.title && <p className="font-display font-bold text-foreground mb-2">{f.title}</p>}
          <ul className="space-y-1">
            {f.items?.slice(0, 4).map((item: string, i: number) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-gold">✓</span> {item}
              </li>
            ))}
            {f.items?.length > 4 && <li className="text-xs text-muted-foreground">+{f.items.length - 4} more</li>}
          </ul>
        </div>
      );
    }

    if (type === "contact") {
      return (
        <div className="bg-muted rounded-lg p-4">
          <p className="font-display font-bold text-foreground mb-2">Contact Info</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            {f.address && <p>📍 {f.address}</p>}
            {f.phone && <p>📞 {f.phone}</p>}
            {f.email && <p>✉️ {f.email}</p>}
            {f.hours && <p>🕐 {f.hours}</p>}
          </div>
        </div>
      );
    }

    if (type === "cta") {
      return (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          {f.title && <p className="font-display font-bold text-foreground">{f.title}</p>}
          {f.description && <p className="text-xs text-muted-foreground">{f.description}</p>}
          {f.cta_text && <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded text-xs mt-2">{f.cta_text}</span>}
        </div>
      );
    }

    if (type === "contact_form" || type === "quote_form") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          {f.title && <p className="font-display font-bold text-foreground mb-2">{f.title}</p>}
          {f.description && <p className="text-xs text-muted-foreground mb-2">{f.description}</p>}
          <div className="space-y-1">
            <div className="h-6 bg-muted rounded" />
            <div className="h-6 bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="h-6 bg-gold/20 rounded w-24" />
          </div>
        </div>
      );
    }

    if (type === "video_gallery") {
      return (
        <div className="bg-muted rounded-lg p-4">
          {f.label && <p className="text-gold text-xs uppercase tracking-widest mb-1">{f.label}</p>}
          {f.title && <p className="font-display font-bold text-foreground mb-2">{f.title}</p>}
          <div className="grid grid-cols-4 gap-1">
            {f.videos?.slice(0, 4).map((_: any, i: number) => (
              <div key={i} className="aspect-video bg-background rounded flex items-center justify-center text-lg">🎬</div>
            ))}
          </div>
          {f.videos?.length > 4 && <p className="text-xs text-muted-foreground mt-1">+{f.videos.length - 4} more videos</p>}
        </div>
      );
    }

    if (type === "projects_grid") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="font-display font-bold text-foreground mb-2">Projects</p>
          <div className="grid grid-cols-3 gap-2">
            {f.items?.slice(0, 3).map((item: any, i: number) => (
              <div key={i} className="bg-muted/50 rounded p-2">
                <p className="font-semibold text-xs">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "blog_grid") {
      return (
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="font-display font-bold text-foreground mb-2">Blog Posts</p>
          <div className="grid grid-cols-3 gap-2">
            {f.posts?.slice(0, 3).map((post: any, i: number) => (
              <div key={i} className="bg-muted/50 rounded p-2">
                <p className="font-semibold text-xs">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.category}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default
    return (
      <div className="bg-muted rounded-lg p-4">
        <p className="font-semibold text-sm text-foreground">{f.title || section.type}</p>
        {f.content && <p className="text-xs text-muted-foreground line-clamp-2">{f.content}</p>}
        {f.description && <p className="text-xs text-muted-foreground line-clamp-2">{f.description}</p>}
      </div>
    );
  };

  // ---- Field Editor ----
  const renderFieldEditor = (sectionId: string, key: string, value: any) => {
    if (value === null || value === undefined) return null;

    // Array of objects
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, " ")}</Label>
          <div className="space-y-3 pl-3 border-l-2 border-accent/30">
            {value.map((item: any, i: number) => (
              <Card key={i} className="p-3 space-y-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-semibold">Item {i + 1}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-destructive" onClick={() => {
                    const newArr = value.filter((_: any, idx: number) => idx !== i);
                    updateSectionField(sectionId, key, newArr);
                  }}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {Object.entries(item).map(([itemKey, itemVal]) => (
                  <div key={itemKey} className="space-y-1">
                    <Label className="text-xs text-muted-foreground capitalize">{itemKey}</Label>
                    {/* Image field inside array item */}
                    {typeof itemVal === "string" && (itemKey.includes("image") || itemKey.includes("photo") || itemKey.includes("src") || itemKey.includes("bg")) ? (
                      <div className="space-y-1">
                        {itemVal && <img src={itemVal} alt="" className="max-h-16 rounded object-cover" />}
                        <div className="flex gap-1">
                          <Input value={itemVal} onChange={(e) => {
                            const newArr = [...value];
                            newArr[i] = { ...newArr[i], [itemKey]: e.target.value };
                            updateSectionField(sectionId, key, newArr);
                          }} className="text-sm flex-1" placeholder="Image URL..." />
                          <label className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild><span><Upload className="h-3 w-3" /></span></Button>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (url) => {
                                const newArr = [...value];
                                newArr[i] = { ...newArr[i], [itemKey]: url };
                                updateSectionField(sectionId, key, newArr);
                              });
                            }} />
                          </label>
                        </div>
                      </div>
                    ) : typeof itemVal === "string" && itemVal.length > 80 ? (
                      <Textarea value={itemVal} rows={2} onChange={(e) => {
                        const newArr = [...value];
                        newArr[i] = { ...newArr[i], [itemKey]: e.target.value };
                        updateSectionField(sectionId, key, newArr);
                      }} className="text-sm" />
                    ) : typeof itemVal === "string" ? (
                      <Input value={itemVal} onChange={(e) => {
                        const newArr = [...value];
                        newArr[i] = { ...newArr[i], [itemKey]: e.target.value };
                        updateSectionField(sectionId, key, newArr);
                      }} className="text-sm" />
                    ) : Array.isArray(itemVal) ? (
                      <div className="space-y-1">
                        {(itemVal as string[]).map((v: string, vi: number) => (
                          <Input key={vi} value={v} onChange={(e) => {
                            const newArr = [...value];
                            const newItems = [...(itemVal as string[])];
                            newItems[vi] = e.target.value;
                            newArr[i] = { ...newArr[i], [itemKey]: newItems };
                            updateSectionField(sectionId, key, newArr);
                          }} className="text-sm" />
                        ))}
                        <Button variant="ghost" size="sm" className="text-xs h-6" onClick={() => {
                          const newArr = [...value];
                          newArr[i] = { ...newArr[i], [itemKey]: [...(itemVal as string[]), ""] };
                          updateSectionField(sectionId, key, newArr);
                        }}>
                          <Plus className="h-3 w-3 mr-1" /> Add
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </Card>
            ))}
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => {
              const template = value[0] ? Object.fromEntries(Object.keys(value[0]).map(k => [k, ""])) : {};
              updateSectionField(sectionId, key, [...value, template]);
            }}>
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>
        </div>
      );
    }

    // Array of strings
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, " ")}</Label>
          <div className="space-y-1">
            {value.map((item: string, i: number) => (
              <div key={i} className="flex gap-1">
                <Input value={item} onChange={(e) => {
                  const newArr = [...value];
                  newArr[i] = e.target.value;
                  updateSectionField(sectionId, key, newArr);
                }} className="text-sm flex-1" />
                <Button variant="ghost" size="sm" className="h-9 text-destructive" onClick={() => {
                  updateSectionField(sectionId, key, value.filter((_: any, idx: number) => idx !== i));
                }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => updateSectionField(sectionId, key, [...value, ""])}>
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>
        </div>
      );
    }

    // Image / background image fields
    if (typeof value === "string" && (key.includes("image") || key.includes("bg_image") || key.includes("bg") || key.includes("photo") || key.includes("src"))) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {key.replace(/_/g, " ")} {key.includes("bg") && <span className="text-gold">(Background Image)</span>}
          </Label>
          {value && (
            <div className="relative rounded-lg overflow-hidden h-28">
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => updateSectionField(sectionId, key, "")}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <Input value={value} onChange={(e) => updateSectionField(sectionId, key, e.target.value)} placeholder="Image URL..." className="text-sm flex-1" />
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild><span><Upload className="h-3 w-3 mr-1" /> Upload</span></Button>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (url) => updateSectionField(sectionId, key, url));
              }} />
            </label>
          </div>
        </div>
      );
    }

    // Long text
    if (typeof value === "string" && value.length > 100) {
      return (
        <div key={key} className="space-y-1">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, " ")}</Label>
          <Textarea value={value} rows={3} onChange={(e) => updateSectionField(sectionId, key, e.target.value)} className="text-sm" />
        </div>
      );
    }

    // Short text
    if (typeof value === "string") {
      return (
        <div key={key} className="space-y-1">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{key.replace(/_/g, " ")}</Label>
          <Input value={value} onChange={(e) => updateSectionField(sectionId, key, e.target.value)} className="text-sm" />
        </div>
      );
    }

    return null;
  };

  // ---- Visual Section Card ----
  const renderVisualSection = (section: PageSection, idx: number) => {
    const config = TYPE_CONFIG[section.type] || { emoji: "📄", label: section.type, bgClass: "bg-muted" };
    const isExpanded = expandedSection === section.id;

    return (
      <div key={section.id} className="border border-border rounded-lg overflow-hidden transition-all">
        {/* Visual Preview - always visible */}
        <div className="relative group">
          {renderSectionPreview(section)}
          {/* Overlay controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setExpandedSection(isExpanded ? null : section.id)}>
                <Pencil className="h-3 w-3 mr-1" /> {isExpanded ? "Close" : "Edit"}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => moveSection(idx, -1)} disabled={idx === 0}>
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1}>
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => removeSection(section.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {/* Section type badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs bg-background/90 backdrop-blur-sm">
              {config.emoji} {config.label}
            </Badge>
          </div>
        </div>

        {/* Expanded edit panel */}
        {isExpanded && (
          <div className="border-t border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Pencil className="h-3 w-3 text-gold" /> Editing: {config.label}
              </h4>
              <Button variant="ghost" size="sm" onClick={() => setExpandedSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {Object.entries(section.fields || {}).map(([key, val]) => renderFieldEditor(section.id, key, val))}
            </div>
          </div>
        )}
      </div>
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
          <Button variant="ghost" size="sm" onClick={() => moveBlock(idx, -1)} disabled={idx === 0}><ChevronUp className="h-3 w-3" /></Button>
          <Button variant="ghost" size="sm" onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1}><ChevronDown className="h-3 w-3" /></Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeBlock(idx)}><Trash2 className="h-3 w-3" /></Button>
        </div>
      </div>
      {block.type === "heading" && (
        <div className="flex gap-2">
          <select className="border rounded px-2 py-1 text-sm bg-background text-foreground w-16" value={block.level || 2} onChange={(e) => updateBlock(idx, { level: Number(e.target.value) })}>
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
            <input type="file" accept="image/*" className="text-sm mt-1" onChange={(e) => {
              if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (url) => updateBlock(idx, { content: url, imageUrl: url }));
            }} />
          </label>
          <Input value={block.alt || ""} onChange={(e) => updateBlock(idx, { alt: e.target.value })} placeholder="Alt text..." className="text-sm" />
        </div>
      )}
      {block.type === "section" && (
        <Textarea value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} rows={5} placeholder="HTML..." className="text-sm font-mono" />
      )}
    </Card>
  );

  const getPreviewUrl = () => {
    if (!slug) return null;
    if (SLUG_TO_ROUTE[slug]) return SLUG_TO_ROUTE[slug];
    if (parentSlug === "products") return `/products/${slug}`;
    if (parentSlug === "services") return `/services/${slug}`;
    return `/page/${slug}`;
  };

  const previewUrl = !isNew ? getPreviewUrl() : null;

  return (
    <AdminLayout>
      <div className="space-y-0 -m-6">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-background py-3 px-6 border-b border-border sticky top-0 z-20">
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
            {/* View mode toggle */}
            {(sections.length > 0 || isSystemPage) && (
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "editor" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setViewMode("editor")}
                >
                  Editor
                </Button>
                <Button
                  variant={viewMode === "split" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setViewMode("split")}
                >
                  Split
                </Button>
                <Button
                  variant={viewMode === "preview" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setViewMode("preview")}
                >
                  <Monitor className="h-3 w-3 mr-1" /> Preview
                </Button>
              </div>
            )}
            {previewUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <select className="border rounded px-2 py-1.5 text-sm bg-background text-foreground" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <Button onClick={handleSave} disabled={saving} className="btn-gold" size="sm">
              <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Main content area - Preview LEFT, Edit Settings RIGHT */}
        <div className={`flex ${viewMode === "split" ? "flex-row" : "flex-col"} min-h-[calc(100vh-64px)]`}>
          {/* Live Preview panel - LEFT SIDE */}
          {viewMode !== "editor" && (sections.length > 0 || isSystemPage) && (
            <div className={`${viewMode === "split" ? "w-1/2 border-r border-border" : "w-full"} bg-muted/30 flex flex-col overflow-y-auto`} style={{ maxHeight: "calc(100vh - 64px)" }}>
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-2 z-10">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Live Preview</span> — Click on any text or image to edit directly
                </p>
              </div>
              <LivePreviewEditor
                sections={sections}
                onUpdateField={updateSectionField}
                onImageUpload={handleImageUpload}
                selectedSectionId={expandedSection}
                onSelectSection={setExpandedSection}
              />
            </div>
          )}

          {/* Editor/Settings panel - RIGHT SIDE */}
          {viewMode !== "preview" && (
            <div className={`${viewMode === "split" ? "w-1/2 overflow-y-auto" : "w-full"} p-6 bg-background`}>
              <Tabs defaultValue="content">
                <TabsList className="w-full">
                  <TabsTrigger value="content" className="flex-1">
                    {expandedSection ? "Section Settings" : "Page Settings"}
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex-1">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4 mt-4">
                  {/* Show section editor if a section is selected */}
                  {expandedSection && (sections.length > 0 || isSystemPage) ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          <Pencil className="h-4 w-4 text-gold" />
                          Edit Section
                        </h3>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedSection(null)}>
                          <X className="h-4 w-4 mr-1" /> Close
                        </Button>
                      </div>
                      {sections.find(s => s.id === expandedSection) && (
                        <Card className="p-4 space-y-4">
                          <div className="flex items-center justify-between border-b border-border pb-3">
                            <Badge variant="secondary">
                              {TYPE_CONFIG[sections.find(s => s.id === expandedSection)?.type || ""]?.emoji}{" "}
                              {TYPE_CONFIG[sections.find(s => s.id === expandedSection)?.type || ""]?.label}
                            </Badge>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const idx = sections.findIndex(s => s.id === expandedSection);
                                  moveSection(idx, -1);
                                }}
                                disabled={sections.findIndex(s => s.id === expandedSection) === 0}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const idx = sections.findIndex(s => s.id === expandedSection);
                                  moveSection(idx, 1);
                                }}
                                disabled={sections.findIndex(s => s.id === expandedSection) === sections.length - 1}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  removeSection(expandedSection);
                                  setExpandedSection(null);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {Object.entries(sections.find(s => s.id === expandedSection)?.fields || {}).map(([key, val]) =>
                              renderFieldEditor(expandedSection, key, val)
                            )}
                          </div>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Page settings card */}
                      <Card className="p-4 space-y-3">
                        <div>
                          <Label className="text-xs font-semibold">Page Title</Label>
                          <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Page title..." />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-semibold">Parent Category</Label>
                            <select
                              className="w-full border rounded px-3 py-2 text-sm bg-background text-foreground"
                              value={parentSlug}
                              onChange={(e) => setParentSlug(e.target.value)}
                            >
                              <option value="">None (Top Level)</option>
                              <option value="products">Products</option>
                              <option value="services">Services</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold">Visibility</Label>
                            <select
                              className="w-full border rounded px-3 py-2 text-sm bg-background text-foreground"
                              value={isVisible ? "visible" : "hidden"}
                              onChange={(e) => setIsVisible(e.target.value === "visible")}
                            >
                              <option value="visible">Visible in Menus</option>
                              <option value="hidden">Hidden</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold">URL Slug</Label>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground text-sm">{parentSlug ? `/${parentSlug}/` : '/'}</span>
                            <Input value={slug} onChange={(e) => setSlug(e.target.value)} disabled={isSystemPage} />
                          </div>
                          {isSystemPage && <p className="text-xs text-muted-foreground mt-1">System page slug cannot be changed.</p>}
                        </div>
                      </Card>

                      {/* Sections list */}
                      {(isSystemPage || sections.length > 0) ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-foreground">
                              Page Sections ({sections.length})
                            </h3>
                            <Button variant="outline" size="sm" onClick={addSection}>
                              <Plus className="h-3 w-3 mr-1" /> Add Section
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {sections.map((section, idx) => {
                              const config = TYPE_CONFIG[section.type] || { emoji: "📄", label: section.type };
                              return (
                                <div
                                  key={section.id}
                                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                    expandedSection === section.id
                                      ? "border-gold bg-gold/5"
                                      : "border-border hover:border-gold/50 hover:bg-muted/50"
                                  }`}
                                  onClick={() => setExpandedSection(section.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{config.emoji}</span>
                                    <div>
                                      <p className="font-medium text-sm text-foreground">{config.label}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {section.fields?.title || section.fields?.label || `Section ${idx + 1}`}
                                      </p>
                                    </div>
                                  </div>
                                  <Pencil className="h-4 w-4 text-muted-foreground" />
                                </div>
                              );
                            })}
                          </div>
                          {sections.length === 0 && (
                            <Card className="p-8 text-center text-muted-foreground">
                              <p className="mb-2">No sections yet.</p>
                              <Button variant="outline" onClick={addSection}>
                                <Plus className="h-4 w-4 mr-2" /> Add First Section
                              </Button>
                            </Card>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-foreground">Content Blocks ({blocks.length})</h3>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => addBlock("heading")}><Type className="h-3 w-3 mr-1" /> H</Button>
                              <Button variant="outline" size="sm" onClick={() => addBlock("paragraph")}><FileText className="h-3 w-3 mr-1" /> P</Button>
                              <Button variant="outline" size="sm" onClick={() => addBlock("image")}><ImageIcon className="h-3 w-3 mr-1" /> Img</Button>
                              <Button variant="outline" size="sm" onClick={() => addBlock("section")}><Layout className="h-3 w-3 mr-1" /> HTML</Button>
                            </div>
                          </div>
                          {blocks.map((block, idx) => renderBlockEditor(block, idx))}
                          {blocks.length === 0 && (
                            <Card className="p-8 text-center text-muted-foreground">
                              <p className="mb-2">No content blocks yet.</p>
                              <p className="text-xs">Add blocks above to build your page.</p>
                            </Card>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="seo" className="space-y-3 mt-4">
                  <Card className="p-4 space-y-4">
                    <div>
                      <Label className="text-xs font-semibold">Meta Title</Label>
                      <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (60 chars max)" />
                      <p className="text-xs text-muted-foreground mt-1">{metaTitle.length}/60</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">Meta Description</Label>
                      <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (160 chars max)" rows={3} />
                      <p className="text-xs text-muted-foreground mt-1">{metaDescription.length}/160</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">OG Image URL</Label>
                      <div className="flex gap-2">
                        <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." className="flex-1" />
                        <label className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild><span><Upload className="h-3 w-3" /></span></Button>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], setOgImage);
                          }} />
                        </label>
                      </div>
                      {ogImage && <img src={ogImage} alt="OG Preview" className="max-h-32 rounded-lg mt-2" />}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
