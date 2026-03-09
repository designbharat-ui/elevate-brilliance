import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AdminAnalytics() {
  const [data, setData] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<{ slug: string; views: number }[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: analytics } = await supabase
        .from("page_analytics")
        .select("*")
        .gte("date", new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0])
        .order("date");

      const rows = analytics || [];

      // Daily totals
      const byDate: Record<string, number> = {};
      const bySlug: Record<string, number> = {};
      rows.forEach((r) => {
        byDate[r.date] = (byDate[r.date] || 0) + (r.views || 0);
        bySlug[r.page_slug] = (bySlug[r.page_slug] || 0) + (r.views || 0);
      });

      setData(
        Object.entries(byDate)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, views]) => ({
            date: new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
            views,
          }))
      );

      setTopPages(
        Object.entries(bySlug)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([slug, views]) => ({ slug, views }))
      );
    };
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Analytics</h1>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Daily Views (Last 30 Days)</h2>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="hsl(200, 65%, 42%)" strokeWidth={2} dot={{ fill: "hsl(200, 65%, 42%)" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No data yet</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold mb-4">Top Pages</h2>
          {topPages.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} />
                <YAxis type="category" dataKey="slug" fontSize={12} width={150} />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(200, 65%, 42%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No data yet</p>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
