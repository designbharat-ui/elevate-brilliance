import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Pencil, ImageIcon, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PageSection {
  id: string;
  type: string;
  fields: Record<string, any>;
}

interface LivePreviewEditorProps {
  sections: PageSection[];
  onUpdateField: (sectionId: string, fieldName: string, value: any) => void;
  onImageUpload: (file: File, callback: (url: string) => void) => void;
  selectedSectionId?: string | null;
  onSelectSection?: (sectionId: string | null) => void;
}

type EditableTag = "span" | "h1" | "h2" | "h3" | "p" | "div";

function EditableText({
  value,
  onChange,
  className = "",
  tag = "span",
  multiline = false,
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  tag?: EditableTag;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value);
  const ref = useRef<HTMLElement>(null);

  if (editing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            className={`${className} w-full border-2 border-gold rounded bg-white/90 p-2 outline-none resize-none`}
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            className={`${className} w-full border-2 border-gold rounded bg-white/90 px-2 py-1 outline-none`}
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
            autoFocus
          />
        )}
        <div className="absolute -top-8 right-0 flex gap-1 z-10">
          <button
            className="bg-green-500 text-white rounded p-1 shadow-lg hover:bg-green-600"
            onClick={() => { onChange(tempVal); setEditing(false); }}
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            className="bg-red-500 text-white rounded p-1 shadow-lg hover:bg-red-600"
            onClick={() => { setTempVal(value); setEditing(false); }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const TagEl = tag;
  return (
    <TagEl
      ref={ref as any}
      className={`${className} cursor-pointer hover:outline-2 hover:outline-dashed hover:outline-gold/60 hover:outline-offset-2 transition-all group/text relative`}
      onClick={() => { setTempVal(value); setEditing(true); }}
      title="Click to edit"
    >
      {value || <span className="italic opacity-50">Click to edit...</span>}
      <Pencil className="absolute -top-2 -right-2 h-3.5 w-3.5 text-gold opacity-0 group-hover/text:opacity-100 transition-opacity bg-background rounded-full p-0.5 shadow" />
    </TagEl>
  );
}

function EditableImage({
  src,
  alt = "",
  className = "",
  onUpload,
  overlayText = "Change Image",
  showAddButton = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  onUpload: (file: File) => void;
  overlayText?: string;
  showAddButton?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
      data-editable="true"
      className={`relative group/img cursor-pointer ${className}`} 
      onClick={() => inputRef.current?.click()}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-muted/50 flex items-center justify-center min-h-[100px]">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            {showAddButton && <span className="text-sm">Click to add image</span>}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/60 transition-all flex items-center justify-center">
        <div className="opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center gap-2 text-white">
          <div className="bg-gold rounded-full p-3 shadow-lg">
            <Upload className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium bg-black/50 px-3 py-1 rounded-full">{overlayText}</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onUpload(e.target.files[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// Background Image Editor Component
function EditableBackgroundImage({
  src,
  onUpload,
  children,
  overlayOpacity = 0.85,
}: {
  src?: string;
  onUpload: (file: File) => void;
  children: React.ReactNode;
  overlayOpacity?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      {/* Background Image Layer */}
      {src && (
        <div className="absolute inset-0">
          <img src={src} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary" style={{ opacity: overlayOpacity }} />
        </div>
      )}
      
      {/* Edit Background Button - Always visible */}
      <button
        data-editable="true"
        onClick={() => inputRef.current?.click()}
        className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/70 hover:bg-gold text-white px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-lg group"
      >
        <ImageIcon className="h-4 w-4" />
        <span>{src ? "Change Background" : "Add Background Image"}</span>
      </button>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onUpload(e.target.files[0]);
          e.target.value = "";
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function EditableArrayItem({
  items,
  sectionId,
  fieldName,
  onUpdateField,
  renderItem,
}: {
  items: any[];
  sectionId: string;
  fieldName: string;
  onUpdateField: (sectionId: string, fieldName: string, value: any) => void;
  renderItem: (item: any, index: number, updateItem: (idx: number, key: string, val: string) => void) => React.ReactNode;
}) {
  const updateItem = (idx: number, key: string, val: string) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [key]: val };
    onUpdateField(sectionId, fieldName, newItems);
  };

  return <>{items.map((item, i) => renderItem(item, i, updateItem))}</>;
}

export function LivePreviewEditor({ sections, onUpdateField, onImageUpload, selectedSectionId, onSelectSection }: LivePreviewEditorProps) {
  const handleImageChange = (sectionId: string, fieldName: string) => (file: File) => {
    onImageUpload(file, (url) => onUpdateField(sectionId, fieldName, url));
  };

  const handleArrayImageChange = (sectionId: string, fieldName: string, items: any[], idx: number, key: string) => (file: File) => {
    onImageUpload(file, (url) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], [key]: url };
      onUpdateField(sectionId, fieldName, newItems);
    });
  };

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    // Only select section if clicking on the wrapper, not on editable elements
    if ((e.target as HTMLElement).closest('[data-editable="true"]')) return;
    onSelectSection?.(sectionId);
  };

  const renderSection = (section: PageSection) => {
    const f = section.fields || {};
    const sid = section.id;

    switch (section.type) {
      case "hero":
        return (
          <section key={sid} className="relative py-24 bg-gradient-hero overflow-hidden">
            {f.bg_image && (
              <div className="absolute inset-0">
                <EditableImage
                  src={f.bg_image}
                  className="w-full h-full"
                  onUpload={handleImageChange(sid, "bg_image")}
                  overlayText="Change Hero Background"
                />
                <div className="absolute inset-0 bg-primary/85" />
              </div>
            )}
            {!f.bg_image && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-gold/30 to-transparent" />
              </div>
            )}
            <div className="container relative z-10">
              <div className="max-w-3xl">
                {f.label !== undefined && (
                  <EditableText
                    value={f.label}
                    onChange={(v) => onUpdateField(sid, "label", v)}
                    className="inline-block text-gold font-medium tracking-widest uppercase text-sm mb-4"
                    tag="span"
                  />
                )}
                <div className="mb-6">
                  <EditableText
                    value={f.title || ""}
                    onChange={(v) => onUpdateField(sid, "title", v)}
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground block"
                    tag="h1"
                  />
                  {f.highlight_text !== undefined && (
                    <EditableText
                      value={f.highlight_text}
                      onChange={(v) => onUpdateField(sid, "highlight_text", v)}
                      className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gold block mt-1"
                      tag="span"
                    />
                  )}
                </div>
                {f.subtitle !== undefined && (
                  <EditableText
                    value={f.subtitle}
                    onChange={(v) => onUpdateField(sid, "subtitle", v)}
                    className="text-primary-foreground text-xl font-semibold mb-4 block"
                    tag="p"
                  />
                )}
                {f.description !== undefined && (
                  <EditableText
                    value={f.description}
                    onChange={(v) => onUpdateField(sid, "description", v)}
                    className="text-primary-foreground/80 text-lg block"
                    tag="p"
                    multiline
                  />
                )}
                {/* CTA buttons display */}
                <div className="flex gap-4 mt-8">
                  {f.cta_primary_text && (
                    <EditableText
                      value={f.cta_primary_text}
                      onChange={(v) => onUpdateField(sid, "cta_primary_text", v)}
                      className="btn-gold px-6 py-3 rounded-lg text-sm font-medium inline-block"
                      tag="span"
                    />
                  )}
                  {f.cta_secondary_text && (
                    <EditableText
                      value={f.cta_secondary_text}
                      onChange={(v) => onUpdateField(sid, "cta_secondary_text", v)}
                      className="btn-outline-gold px-6 py-3 rounded-lg text-sm font-medium inline-block"
                      tag="span"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case "stats":
        return (
          <section key={sid} className="py-16 bg-secondary">
            <div className="container">
              {f.label !== undefined && (
                <div className="text-center mb-4">
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm" tag="span" />
                </div>
              )}
              {f.title !== undefined && (
                <div className="text-center mb-12">
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground" tag="h2" />
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <EditableText
                        value={item.value}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], value: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="stat-number text-4xl font-bold text-gold"
                        tag="span"
                      />
                      {item.suffix && (
                        <EditableText
                          value={item.suffix}
                          onChange={(v) => {
                            const arr = [...f.items]; arr[i] = { ...arr[i], suffix: v };
                            onUpdateField(sid, "items", arr);
                          }}
                          className="text-2xl font-bold text-gold"
                          tag="span"
                        />
                      )}
                    </div>
                    <EditableText
                      value={item.label}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], label: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-muted-foreground text-sm mt-2 block"
                      tag="span"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "services_grid":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                      <span className="text-gold text-2xl">⚙️</span>
                    </div>
                    <EditableText
                      value={item.title}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], title: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="font-display text-2xl font-semibold text-foreground mb-3 block"
                      tag="h3"
                    />
                    <EditableText
                      value={item.description}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], description: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-muted-foreground mb-4 block"
                      tag="p"
                      multiline
                    />
                    {item.features && (
                      <ul className="space-y-2">
                        {item.features.map((feat: string, fi: number) => (
                          <li key={fi} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                            <EditableText
                              value={feat}
                              onChange={(v) => {
                                const arr = [...f.items];
                                const newFeats = [...arr[i].features];
                                newFeats[fi] = v;
                                arr[i] = { ...arr[i], features: newFeats };
                                onUpdateField(sid, "items", arr);
                              }}
                              className="text-sm"
                              tag="span"
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "products_grid":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="relative bg-card rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <EditableImage
                        src={item.image || ""}
                        className="w-full h-full"
                        onUpload={handleArrayImageChange(sid, "items", f.items, i, "image")}
                        overlayText="Change Product Image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <EditableText
                        value={item.category || ""}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], category: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="bg-gold/90 text-primary text-xs font-medium px-3 py-1 rounded-full"
                        tag="span"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                      <EditableText
                        value={item.name || item.title || ""}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], name: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="font-display text-xl font-semibold mb-2 block text-white"
                        tag="h3"
                      />
                      <EditableText
                        value={item.description || ""}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], description: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="text-white/80 text-sm mb-2 block"
                        tag="p"
                      />
                      <EditableText
                        value={item.specs || ""}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], specs: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="text-gold text-xs font-medium block"
                        tag="span"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "features":
        return (
          <section key={sid} className="section-padding bg-primary">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-primary-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6">
                    <EditableText
                      value={item.title}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], title: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="font-display text-lg font-semibold text-primary-foreground mb-2 block"
                      tag="h3"
                    />
                    <EditableText
                      value={item.description || ""}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], description: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-primary-foreground/70 text-sm block"
                      tag="p"
                      multiline
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "testimonials":
        return (
          <section key={sid} className="section-padding bg-secondary">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-8">
                    <EditableText
                      value={item.quote}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], quote: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-muted-foreground italic mb-4 block"
                      tag="p"
                      multiline
                    />
                    <EditableText
                      value={item.name}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], name: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="font-semibold text-foreground block"
                      tag="span"
                    />
                    {item.role && (
                      <EditableText
                        value={item.role}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], role: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="text-sm text-muted-foreground block"
                        tag="span"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "text_image":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  {f.label !== undefined && (
                    <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                  )}
                  {f.title !== undefined && (
                    <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 block" tag="h2" />
                  )}
                  {f.content !== undefined && (
                    <EditableText value={f.content} onChange={(v) => onUpdateField(sid, "content", v)} className="text-muted-foreground leading-relaxed block" tag="p" multiline />
                  )}
                  {f.paragraphs?.map((p: string, pi: number) => (
                    <EditableText
                      key={pi}
                      value={p}
                      onChange={(v) => {
                        const arr = [...f.paragraphs]; arr[pi] = v;
                        onUpdateField(sid, "paragraphs", arr);
                      }}
                      className="text-muted-foreground leading-relaxed mb-4 block"
                      tag="p"
                      multiline
                    />
                  ))}
                  {f.highlight !== undefined && (
                    <div className="bg-gold/10 border-l-4 border-gold px-4 py-2 rounded-r-lg mt-6">
                      <EditableText value={f.highlight} onChange={(v) => onUpdateField(sid, "highlight", v)} className="text-gold font-display text-sm font-semibold italic block" tag="p" />
                    </div>
                  )}
                </div>
                {f.image !== undefined && (
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <EditableImage
                      src={f.image}
                      className="w-full h-full"
                      onUpload={handleImageChange(sid, "image")}
                      overlayText="Change Image"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "cards":
        return (
          <section key={sid} className="py-16 md:py-20 bg-secondary">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
                    <EditableText
                      value={item.title}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], title: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="font-display text-xl font-bold text-gold mb-4 block"
                      tag="h3"
                    />
                    <EditableText
                      value={item.description || item.content || ""}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], description: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-muted-foreground leading-relaxed block"
                      tag="p"
                      multiline
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "timeline":
        return (
          <section key={sid} className="section-padding bg-secondary">
            <div className="container">
              <div className="text-center mb-16">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="space-y-8">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-6 bg-card p-6 rounded-lg shadow-md">
                    <EditableText
                      value={item.year}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], year: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-gold font-display text-2xl font-bold flex-shrink-0 w-16"
                      tag="span"
                    />
                    <div className="flex-1">
                      <EditableText
                        value={item.title}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], title: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="font-display text-xl font-semibold text-foreground block"
                        tag="h3"
                      />
                      <EditableText
                        value={item.description}
                        onChange={(v) => {
                          const arr = [...f.items]; arr[i] = { ...arr[i], description: v };
                          onUpdateField(sid, "items", arr);
                        }}
                        className="text-muted-foreground mt-2 block"
                        tag="p"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key={sid} className="section-padding bg-primary">
            <div className="container text-center">
              <EditableText
                value={f.title || ""}
                onChange={(v) => onUpdateField(sid, "title", v)}
                className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6 block"
                tag="h2"
              />
              {f.description !== undefined && (
                <EditableText
                  value={f.description}
                  onChange={(v) => onUpdateField(sid, "description", v)}
                  className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto block"
                  tag="p"
                  multiline
                />
              )}
              {f.cta_text && (
                <EditableText
                  value={f.cta_text}
                  onChange={(v) => onUpdateField(sid, "cta_text", v)}
                  className="btn-gold inline-flex items-center px-6 py-3 rounded-lg"
                  tag="span"
                />
              )}
            </div>
          </section>
        );

      case "contact":
        return (
          <section key={sid} className="section-padding bg-muted">
            <div className="container">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Info</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {f.address !== undefined && (
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                    <span className="text-gold text-xl">📍</span>
                    <div>
                      <p className="font-medium text-foreground mb-1">Address</p>
                      <EditableText value={f.address} onChange={(v) => onUpdateField(sid, "address", v)} className="text-muted-foreground block" tag="p" multiline />
                    </div>
                  </div>
                )}
                {f.phone !== undefined && (
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                    <span className="text-gold text-xl">📞</span>
                    <div>
                      <p className="font-medium text-foreground mb-1">Phone</p>
                      <EditableText value={f.phone} onChange={(v) => onUpdateField(sid, "phone", v)} className="text-muted-foreground block" tag="p" />
                    </div>
                  </div>
                )}
                {f.email !== undefined && (
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                    <span className="text-gold text-xl">✉️</span>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <EditableText value={f.email} onChange={(v) => onUpdateField(sid, "email", v)} className="text-muted-foreground block" tag="p" />
                    </div>
                  </div>
                )}
                {f.hours !== undefined && (
                  <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                    <span className="text-gold text-xl">🕐</span>
                    <div>
                      <p className="font-medium text-foreground mb-1">Working Hours</p>
                      <EditableText value={f.hours} onChange={(v) => onUpdateField(sid, "hours", v)} className="text-muted-foreground block" tag="p" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "gallery":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {f.images?.map((img: string, i: number) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <EditableImage
                      src={typeof img === 'string' ? img : ''}
                      className="w-full h-full"
                      onUpload={(file) => {
                        onImageUpload(file, (url) => {
                          const arr = [...f.images]; arr[i] = url;
                          onUpdateField(sid, "images", arr);
                        });
                      }}
                      overlayText="Replace"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "list":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container max-w-3xl">
              {f.title !== undefined && (
                <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-2xl font-bold text-foreground mb-6 block" tag="h2" />
              )}
              <ul className="space-y-3">
                {f.items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                    <EditableText
                      value={item}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = v;
                        onUpdateField(sid, "items", arr);
                      }}
                      className="flex-1"
                      tag="span"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );

      case "projects_grid":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {f.items?.map((item: any, i: number) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6">
                    <EditableText
                      value={item.name}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], name: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="font-display text-lg font-semibold text-foreground mb-2 block"
                      tag="h3"
                    />
                    <EditableText
                      value={item.location || ""}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], location: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-muted-foreground text-sm block"
                      tag="p"
                    />
                    <EditableText
                      value={item.specs || ""}
                      onChange={(v) => {
                        const arr = [...f.items]; arr[i] = { ...arr[i], specs: v };
                        onUpdateField(sid, "items", arr);
                      }}
                      className="text-gold text-xs font-medium mt-2 block"
                      tag="span"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "contact_form":
      case "quote_form":
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container max-w-2xl">
              {f.title !== undefined && (
                <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-2xl font-bold text-foreground mb-4 block" tag="h2" />
              )}
              {f.description !== undefined && (
                <EditableText value={f.description} onChange={(v) => onUpdateField(sid, "description", v)} className="text-muted-foreground mb-6 block" tag="p" />
              )}
              <div className="space-y-4 opacity-60 pointer-events-none">
                <div className="h-10 bg-muted rounded border" />
                <div className="h-10 bg-muted rounded border" />
                <div className="h-24 bg-muted rounded border" />
                <div className="h-10 bg-gold/20 rounded w-32" />
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">Form preview — fields are configured automatically</p>
            </div>
          </section>
        );

      case "video_gallery":
        return (
          <section key={sid} className="section-padding bg-muted">
            <div className="container">
              <div className="text-center mb-12">
                {f.label !== undefined && (
                  <EditableText value={f.label} onChange={(v) => onUpdateField(sid, "label", v)} className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block" tag="span" />
                )}
                {f.title !== undefined && (
                  <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-3xl md:text-4xl font-bold text-foreground block" tag="h2" />
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {f.videos?.map((_: any, i: number) => (
                  <div key={i} className="aspect-video bg-background rounded-lg flex items-center justify-center text-2xl">🎬</div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section key={sid} className="section-padding bg-background">
            <div className="container max-w-3xl">
              {f.title !== undefined && (
                <EditableText value={f.title} onChange={(v) => onUpdateField(sid, "title", v)} className="font-display text-2xl font-bold text-foreground mb-4 block" tag="h2" />
              )}
              {f.content !== undefined && (
                <EditableText value={f.content} onChange={(v) => onUpdateField(sid, "content", v)} className="text-muted-foreground block" tag="p" multiline />
              )}
              {f.description !== undefined && (
                <EditableText value={f.description} onChange={(v) => onUpdateField(sid, "description", v)} className="text-muted-foreground block" tag="p" multiline />
              )}
            </div>
          </section>
        );
    }
  };

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <p>No sections to preview. Add sections in the editor.</p>
      </div>
    );
  }

  return (
    <div className="live-preview-editor">
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={handleSectionClick(section.id)}
          className={`relative cursor-pointer transition-all ${
            selectedSectionId === section.id
              ? "ring-2 ring-gold ring-offset-2"
              : "hover:ring-1 hover:ring-gold/30"
          }`}
        >
          {/* Section type indicator */}
          {selectedSectionId === section.id && (
            <div className="absolute top-2 right-2 z-20 bg-gold text-primary text-xs font-medium px-2 py-1 rounded shadow-lg">
              ✏️ Editing
            </div>
          )}
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}
