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
    <div className="flex flex-col min-h-screen text-modern-text dark:text-gray-200 relative overflow-hidden">
      {/* Aurora background effect */}
      <div className="aurora-bg"></div>

      {/* Animated background shapes */}
      <div className="background-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
        <div className="shape-4"></div>
        <div className="shape-5"></div>
        <div className="shape-6"></div>
        <div className="shape-7"></div>
        <div className="shape-8"></div>
        <div className="shape-9"></div>
        <div className="shape-10"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 -z-10"></div>

      {/* Animated dots pattern */}
      <div className="fixed inset-0 dots-pattern opacity-20 dark:opacity-10 -z-20"></div>

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 dark:from-blue-600/20 dark:to-cyan-600/20 blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 dark:from-purple-600/20 dark:to-pink-600/20 blur-3xl -bottom-48 -right-48 animate-float-delayed"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-green-500/30 to-yellow-500/30 dark:from-green-600/20 dark:to-yellow-600/20 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </div>

      <ScrollToggleButton />
    </div>
  );
};

export default Layout;
