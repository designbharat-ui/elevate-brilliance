import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

interface MenuData {
  id?: string;
  name: string;
  items: MenuItem[];
}

export default function AdminMenus() {
  const [headerMenu, setHeaderMenu] = useState<MenuData>({ name: "header", items: [] });
  const [footerMenu, setFooterMenu] = useState<MenuData>({ name: "footer", items: [] });
  const [saving, setSaving] = useState(false);
  const [productPages, setProductPages] = useState<{title: string; slug: string}[]>([]);
  const [servicePages, setServicePages] = useState<{title: string; slug: string}[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const [{ data: menuData }, { data: prodData }, { data: svcData }] = await Promise.all([
        supabase.from("menus").select("*"),
        supabase.from("pages").select("title, slug").eq("parent_slug", "products").eq("status", "published").order("page_order"),
        supabase.from("pages").select("title, slug").eq("parent_slug", "services").eq("status", "published").order("page_order"),
      ]);
      if (menuData) {
        const header = menuData.find((m) => m.name === "header");
        const footer = menuData.find((m) => m.name === "footer");
        if (header) setHeaderMenu({ id: header.id, name: "header", items: (header.items as unknown as MenuItem[]) || [] });
        if (footer) setFooterMenu({ id: footer.id, name: "footer", items: (footer.items as unknown as MenuItem[]) || [] });
      }
      if (prodData) setProductPages(prodData);
      if (svcData) setServicePages(svcData);
    };
    fetchMenus();
  }, []);

  const addItem = (menu: "header" | "footer") => {
    const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
    setter((prev) => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), label: "", href: "/" }],
    }));
  };

  const updateItem = (menu: "header" | "footer", idx: number, updates: Partial<MenuItem>) => {
    const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
    setter((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === idx ? { ...item, ...updates } : item)),
    }));
  };

  const removeItem = (menu: "header" | "footer", idx: number) => {
    const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
    setter((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const moveItem = (menu: "header" | "footer", idx: number, dir: -1 | 1) => {
    const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
    setter((prev) => {
      const arr = [...prev.items];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return prev;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return { ...prev, items: arr };
    });
  };

  const saveMenu = async (menuData: MenuData) => {
    setSaving(true);
    const payload = { name: menuData.name, items: menuData.items as any };

    if (menuData.id) {
      const { error } = await supabase.from("menus").update(payload).eq("id", menuData.id);
      if (error) toast.error(error.message);
      else toast.success(`${menuData.name} menu saved!`);
    } else {
      const { data, error } = await supabase.from("menus").insert(payload).select().single();
      if (error) toast.error(error.message);
      else {
        toast.success(`${menuData.name} menu created!`);
        if (menuData.name === "header") setHeaderMenu((p) => ({ ...p, id: data.id }));
        else setFooterMenu((p) => ({ ...p, id: data.id }));
      }
    }
    setSaving(false);
  };

  const renderMenuEditor = (menu: "header" | "footer", data: MenuData) => (
    <Card className="p-4 space-y-4">
      {/* Quick Add from CMS Pages */}
      {(productPages.length > 0 || servicePages.length > 0) && (
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quick Add from CMS Pages</p>
          <div className="flex flex-wrap gap-2">
            {productPages.map(p => (
              <Button key={p.slug} variant="outline" size="sm" className="text-xs h-7"
                onClick={() => {
                  const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
                  setter(prev => ({
                    ...prev,
                    items: [...prev.items, { id: crypto.randomUUID(), label: p.title, href: `/products/${p.slug}` }],
                  }));
                }}>
                + {p.title}
              </Button>
            ))}
            {servicePages.map(p => (
              <Button key={p.slug} variant="outline" size="sm" className="text-xs h-7"
                onClick={() => {
                  const setter = menu === "header" ? setHeaderMenu : setFooterMenu;
                  setter(prev => ({
                    ...prev,
                    items: [...prev.items, { id: crypto.randomUUID(), label: p.title, href: `/services/${p.slug}` }],
                  }));
                }}>
                + {p.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {data.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-2 bg-background border border-border rounded p-2">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveItem(menu, idx, -1)} className="text-muted-foreground hover:text-foreground text-xs">▲</button>
              <button onClick={() => moveItem(menu, idx, 1)} className="text-muted-foreground hover:text-foreground text-xs">▼</button>
            </div>
            <Input
              value={item.label}
              onChange={(e) => updateItem(menu, idx, { label: e.target.value })}
              placeholder="Label"
              className="flex-1"
            />
            <Input
              value={item.href}
              onChange={(e) => updateItem(menu, idx, { href: e.target.value })}
              placeholder="/path"
              className="flex-1"
            />
            <Button variant="ghost" size="sm" onClick={() => removeItem(menu, idx)} className="text-destructive h-8 w-8 p-0">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => addItem(menu)}>
          <Plus className="h-3 w-3 mr-1" /> Add Item
        </Button>
        <Button size="sm" onClick={() => saveMenu(data)} disabled={saving} className="btn-gold">
          <Save className="h-3 w-3 mr-1" /> Save Menu
        </Button>
      </div>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground">Menu Management</h1>

        <Tabs defaultValue="header">
          <TabsList>
            <TabsTrigger value="header">Header Menu</TabsTrigger>
            <TabsTrigger value="footer">Footer Menu</TabsTrigger>
          </TabsList>
          <TabsContent value="header" className="mt-4">
            {renderMenuEditor("header", headerMenu)}
          </TabsContent>
          <TabsContent value="footer" className="mt-4">
            {renderMenuEditor("footer", footerMenu)}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
