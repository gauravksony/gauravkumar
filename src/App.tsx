import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/BlogsPage";
import BlogPost from "./pages/BlogPost";
import StudyMaterialPage from "./pages/StudyMaterialPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import initEmailJS from "./integrations/emailjs/config";
import ThemeProvider from "./components/common/ThemeProvider";
import {
  enableSmoothScroll,
  setupContentAnimations,
  ensureContentVisible,
  reinitializeCardAnimations,
} from "./lib/animation";

const queryClient = new QueryClient();

// Scroll to top when route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // First ensure all content is visible
    ensureContentVisible();

    // Then after a small delay, reinitialize animations for cards to fix the bouncing effect
    setTimeout(() => {
      reinitializeCardAnimations();
    }, 100);
  }, [pathname]);

  return null;
};

const App = () => {
  // Initialize EmailJS when the app starts
  useEffect(() => {
    initEmailJS();

    // Enable smooth scrolling for the entire site
    enableSmoothScroll();

    // Force content to be visible initially
    ensureContentVisible();

    // Setup animations for content elements with a slight delay to ensure initial rendering
    setTimeout(() => {
      setupContentAnimations({
        selectors:
          ".animate-on-scroll, .card, .section-title, article, .project-card",
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
        animationClass: "animate-fade-in-up",
      });
    }, 100); // Small delay to ensure content is visible first
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:id" element={<BlogPost />} />
                <Route path="/study-material" element={<StudyMaterialPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
