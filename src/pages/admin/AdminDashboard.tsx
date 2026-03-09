import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { FileText, Image, Eye, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ pages: 0, published: 0, drafts: 0, media: 0, totalViews: 0 });
  const [chartData, setChartData] = useState<{ date: string; views: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [pagesRes, mediaRes, analyticsRes] = await Promise.all([
        supabase.from("pages").select("status"),
        supabase.from("media").select("id", { count: "exact", head: true }),
        supabase.from("page_analytics").select("*").gte("date", new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0]).order("date"),
      ]);

      const pages = pagesRes.data || [];
      setStats({
        pages: pages.length,
        published: pages.filter((p) => p.status === "published").length,
        drafts: pages.filter((p) => p.status === "draft").length,
        media: mediaRes.count || 0,
        totalViews: (analyticsRes.data || []).reduce((sum, a) => sum + (a.views || 0), 0),
      });

      // Aggregate by date
      const byDate: Record<string, number> = {};
      (analyticsRes.data || []).forEach((a) => {
        byDate[a.date] = (byDate[a.date] || 0) + (a.views || 0);
      });
      setChartData(
        Object.entries(byDate)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-14)
          .map(([date, views]) => ({ date: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), views }))
      );
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Pages", value: stats.pages, icon: FileText, color: "text-accent" },
    { label: "Published", value: stats.published, icon: TrendingUp, color: "text-green-500" },
    { label: "Drafts", value: stats.drafts, icon: FileText, color: "text-yellow-500" },
    { label: "Media Files", value: stats.media, icon: Image, color: "text-blue-500" },
    { label: "Views (30d)", value: stats.totalViews, icon: Eye, color: "text-purple-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className="p-4">
              <div className="flex items-center gap-3">
                <s.icon className={`h-8 w-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Page Views (Last 14 Days)</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(200, 65%, 42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No analytics data yet. Views will appear as visitors browse your site.</p>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
