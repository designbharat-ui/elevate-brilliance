import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
