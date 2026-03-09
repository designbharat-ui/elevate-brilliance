import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import VisionMission from "./pages/VisionMission";
import BusinessStrategy from "./pages/BusinessStrategy";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ProductFeatures from "./pages/ProductFeatures";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NewEquipment from "./pages/NewEquipment";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";
import Sitemap from "./pages/Sitemap";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GetQuote from "./pages/GetQuote";
import DynamicPage from "./pages/DynamicPage";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPages from "./pages/admin/AdminPages";
import AdminPageEditor from "./pages/admin/AdminPageEditor";
import AdminMenus from "./pages/admin/AdminMenus";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSetup from "./pages/admin/AdminSetup";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/business-strategy" element={<BusinessStrategy />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/product-features" element={<ProductFeatures />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/new-equipment" element={<NewEquipment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/query" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/get-quote" element={<GetQuote />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/reset-password" element={<AdminResetPassword />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
              <Route path="/admin/pages/:id" element={<ProtectedRoute><AdminPageEditor /></ProtectedRoute>} />
              <Route path="/admin/menus" element={<ProtectedRoute><AdminMenus /></ProtectedRoute>} />
              <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
              <Route path="/admin/seo" element={<ProtectedRoute><AdminSEO /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

              {/* Dynamic CMS Pages (catch-all before 404) */}
              <Route path="/page/:slug" element={<DynamicPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
