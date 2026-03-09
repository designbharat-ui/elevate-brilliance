import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, FileText, Image, Menu, Settings, LogOut, ChevronDown,
  BarChart3, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logoImage from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Menus", href: "/admin/menus", icon: Menu },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "SEO Settings", href: "/admin/seo", icon: Globe },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-primary text-primary-foreground flex flex-col transition-all duration-300 fixed h-full z-40",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-primary-foreground/10">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={logoImage} alt="Admin" className="h-10 w-auto bg-white rounded p-0.5" />
            {sidebarOpen && <span className="font-display font-bold text-lg">CMS Admin</span>}
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary-foreground/10",
                  isActive && "bg-accent text-accent-foreground border-r-2 border-accent"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10">
          {sidebarOpen && (
            <p className="text-xs text-primary-foreground/60 mb-2 truncate">{user?.email}</p>
          )}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 flex-1">
              <LogOut className="h-4 w-4 mr-2" />
              {sidebarOpen && "Logout"}
            </Button>
          </div>
          <Link to="/" target="_blank" className="block mt-2">
            <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 w-full">
              <Globe className="h-4 w-4 mr-2" />
              {sidebarOpen && "View Site"}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
