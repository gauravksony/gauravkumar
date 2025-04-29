import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FloatingElements } from "../../components/ui/3d-shapes";
import ScrollToggleButton from "./ScrollToggleButton";
import { reinitializeCardAnimations } from "@/lib/animation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top and reapply animations when navigating to a new page
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Apply a small delay to ensure the DOM is ready
    const timer = setTimeout(() => {
      // Reinitialize card animations on every page navigation
      reinitializeCardAnimations();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-modern-bg dark:bg-gray-900 text-modern-text dark:text-gray-200 relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="fixed inset-0 -z-20 dots-bg opacity-40 dark:opacity-20"
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 bg-aurora-gradient bg-[length:200%_200%] animate-gradient-shift -z-10 opacity-40 dark:opacity-20"
        style={{ animation: "gradient-shift 15s ease infinite" }}
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute w-80 h-80 rounded-full bg-modern-primary/10 dark:bg-blue-500/20 blur-3xl -top-40 -left-20 animate-float-slow"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-modern-accent/10 dark:bg-cyan-500/20 blur-3xl -bottom-40 -right-20 animate-float-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-60 h-60 rounded-full bg-modern-highlight/10 dark:bg-purple-500/20 blur-3xl top-[30%] right-[10%] animate-float-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating decorative elements */}
      <FloatingElements
        count={12}
        containerClassName="opacity-30 dark:opacity-15"
      />

      <Header />
      <main className="flex-grow pt-24 z-10">{children}</main>
      <Footer />

      {/* Scroll Toggle Button */}
      <ScrollToggleButton />
    </div>
  );
};

export default Layout;
