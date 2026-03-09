import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, ArrowLeft, Plus, Trash2, GripVertical, ImageIcon } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface ContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "section";
  content: string;
  level?: number; // for headings h1-h6
  alt?: string; // for images
  imageUrl?: string;
}

export default function AdminPageEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      supabase.from("pages").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setMetaTitle(data.meta_title || "");
          setMetaDescription(data.meta_description || "");
          setOgImage(data.og_image || "");
          setStatus(data.status);
          setBlocks(Array.isArray(data.content) ? (data.content as unknown as ContentBlock[]) : []);
        }
      });
    }
  }, [id, isNew]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const addBlock = (type: ContentBlock["type"]) => {
    setBlocks([...blocks, { id: crypto.randomUUID(), type, content: "", level: type === "heading" ? 2 : undefined }]);
  };

  const updateBlock = (idx: number, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map((b, i) => (i === idx ? { ...b, ...updates } : b)));
  };

  const removeBlock = (idx: number) => {
    setBlocks(blocks.filter((_, i) => i !== idx));
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const arr = [...blocks];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setBlocks(arr);
  };

  const handleImageUpload = async (idx: number, file: File) => {
    const path = `pages/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast.error("Upload failed");
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    updateBlock(idx, { content: publicUrl, imageUrl: publicUrl });

    // Also record in media table
    await supabase.from("media").insert({
      file_name: file.name,
      file_path: publicUrl,
      file_size: file.size,
      mime_type: file.type,
      uploaded_by: user?.id,
    });
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);

    const pageData = {
      title: title.trim(),
      slug: slug.trim(),
      content: blocks as unknown as Json,
      meta_title: metaTitle || title,
      meta_description: metaDescription,
      og_image: ogImage,
      status,
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
    }
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin/pages")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h1 className="font-display text-2xl font-bold">{isNew ? "Create Page" : "Edit Page"}</h1>
          </div>
          <div className="flex gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSave} disabled={saving} className="btn-gold">
              <Save className="h-4 w-4 mr-2" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 mt-4">
            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Page title" />
              </div>
              <div className="space-y-2">
                <Label>URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">/</span>
                  <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="page-slug" />
                </div>
              </div>
            </Card>

            {/* Content Blocks */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Page Content</h3>
              <div className="space-y-3">
                {blocks.map((block, idx) => (
                  <div key={block.id} className="border border-border rounded-lg p-3 bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => moveBlock(idx, -1)} className="text-muted-foreground hover:text-foreground text-xs">▲</button>
                          <button onClick={() => moveBlock(idx, 1)} className="text-muted-foreground hover:text-foreground text-xs">▼</button>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded">
                          {block.type}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeBlock(idx)} className="text-destructive h-7 w-7 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    {block.type === "heading" && (
                      <div className="space-y-2">
                        <Select value={String(block.level || 2)} onValueChange={(v) => updateBlock(idx, { level: Number(v) })}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <SelectItem key={l} value={String(l)}>H{l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} placeholder="Heading text" />
                      </div>
                    )}

                    {block.type === "paragraph" && (
                      <Textarea value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} placeholder="Write your content..." rows={4} />
                    )}

                    {block.type === "image" && (
                      <div className="space-y-2">
                        {block.content ? (
                          <img src={block.content} alt={block.alt || ""} className="max-h-48 rounded" />
                        ) : (
                          <label className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-accent transition-colors">
                            <div className="text-center">
                              <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">Click to upload image</span>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, e.target.files[0])} />
                          </label>
                        )}
                        <Input value={block.alt || ""} onChange={(e) => updateBlock(idx, { alt: e.target.value })} placeholder="Alt text for SEO" />
                      </div>
                    )}

                    {block.type === "section" && (
                      <Textarea value={block.content} onChange={(e) => updateBlock(idx, { content: e.target.value })} placeholder="HTML section content..." rows={6} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => addBlock("heading")}>
                  <Plus className="h-3 w-3 mr-1" /> Heading
                </Button>
                <Button variant="outline" size="sm" onClick={() => addBlock("paragraph")}>
                  <Plus className="h-3 w-3 mr-1" /> Paragraph
                </Button>
                <Button variant="outline" size="sm" onClick={() => addBlock("image")}>
                  <Plus className="h-3 w-3 mr-1" /> Image
                </Button>
                <Button variant="outline" size="sm" onClick={() => addBlock("section")}>
                  <Plus className="h-3 w-3 mr-1" /> Section
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4 mt-4">
            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (recommended: under 60 chars)" />
                <p className="text-xs text-muted-foreground">{metaTitle.length}/60 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (recommended: under 160 chars)" rows={3} />
                <p className="text-xs text-muted-foreground">{metaDescription.length}/160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Open Graph Image URL</Label>
                <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
