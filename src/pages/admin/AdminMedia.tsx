import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Copy, Search, ImageIcon } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  alt_text: string | null;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
}

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [altText, setAltText] = useState("");
  const { user } = useAuth();

  const fetchMedia = async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    setMedia(data || []);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const path = `uploads/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
      await supabase.from("media").insert({
        file_name: file.name,
        file_path: publicUrl,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: user?.id,
      });
    }
    toast.success("Upload complete!");
    setUploading(false);
    fetchMedia();
  };

  const deleteMedia = async (item: MediaItem) => {
    // Extract path from URL for storage deletion
    const urlParts = item.file_path.split("/media/");
    if (urlParts[1]) {
      await supabase.storage.from("media").remove([urlParts[1]]);
    }
    await supabase.from("media").delete().eq("id", item.id);
    toast.success("Deleted");
    fetchMedia();
  };

  const updateAlt = async () => {
    if (!editItem) return;
    await supabase.from("media").update({ alt_text: altText }).eq("id", editItem.id);
    toast.success("Alt text updated");
    setEditItem(null);
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  const filtered = media.filter((m) =>
    m.file_name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-foreground">Media Library</h1>
          <label>
            <Button className="btn-gold cursor-pointer" disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading..." : "Upload Files"}
            </Button>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleUpload(e.target.files)} />
          </label>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No media files yet. Upload your first image!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-square bg-muted relative">
                  {item.mime_type?.startsWith("image/") ? (
                    <img src={item.file_path} alt={item.alt_text || item.file_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => copyUrl(item.file_path)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => { setEditItem(item); setAltText(item.alt_text || ""); }}>
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this file?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMedia(item)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{item.file_name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(item.file_size)}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Media</DialogTitle>
            </DialogHeader>
            {editItem && (
              <div className="space-y-4">
                {editItem.mime_type?.startsWith("image/") && (
                  <img src={editItem.file_path} alt="" className="max-h-48 rounded mx-auto" />
                )}
                <div className="space-y-2">
                  <Label>File Name</Label>
                  <p className="text-sm text-muted-foreground">{editItem.file_name}</p>
                </div>
                <div className="space-y-2">
                  <Label>Alt Text (SEO)</Label>
                  <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe this image for SEO" />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <div className="flex gap-2">
                    <Input value={editItem.file_path} readOnly className="text-xs" />
                    <Button variant="outline" size="sm" onClick={() => copyUrl(editItem.file_path)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button onClick={updateAlt} className="btn-gold w-full">Save Changes</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
