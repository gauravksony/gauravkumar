import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        portfolio: {
          navy: "#0a192f",
          lightNavy: "#112240",
          lightestNavy: "#233554",
          slate: "#8892b0",
          lightSlate: "#a8b2d1",
          lightestSlate: "#ccd6f6",
          white: "#e6f1ff",
          cyan: "#64ffda",
          teal: "#0d9488",
        },
        modern: {
          bg: "#f7f9fc",
          surface: "#f0f4f8",
          surfaceHover: "#e9eef5",
          primary: "#004bb9",
          primaryHover: "#003a8f",
          primaryLight: "#cce0ff",
          secondary: "#e8f2ff",
          accent: "#00b1c3",
          accentHover: "#009db0",
          highlight: "#6540d6",
          highlightHover: "#532dc0",
          text: "#0a1522",
          textLight: "#303d4d",
          border: "#c5d0df",
          cardBg: "#f8fafc",
          success: "#00a040",
          warning: "#e98500",
          error: "#d93545",
          info: "#007fa0",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        baskerville: ["Libre Baskerville", "serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        noe: ["Noe Display", "serif"],
        charter: ["Charter", "Georgia", "serif"],
        marat: ["Marat Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        "neo-sm": "5px 5px 10px #e1e1e1, -5px -5px 10px #ffffff",
        "neo-md": "8px 8px 16px #e1e1e1, -8px -8px 16px #ffffff",
        "neo-lg": "15px 15px 30px #e1e1e1, -15px -15px 30px #ffffff",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "3d-card":
          "0 10px 30px -15px rgba(2, 12, 27, 0.15), 0 0 0 1px rgba(211, 211, 211, 0.1)",
        "3d-hover":
          "0 20px 30px -15px rgba(2, 12, 27, 0.25), 0 0 0 1px rgba(211, 211, 211, 0.2)",
        depth:
          "0 5px 15px rgba(0, 0, 0, 0.08), 0 15px 35px rgba(0, 0, 0, 0.12)",
        float: "0 10px 25px -10px rgba(0, 0, 0, 0.15)",
        "rich-sm":
          "0 4px 6px -1px rgba(0, 90, 226, 0.15), 0 2px 4px -1px rgba(0, 90, 226, 0.08)",
        "rich-md":
          "0 10px 15px -3px rgba(0, 90, 226, 0.15), 0 4px 6px -2px rgba(0, 90, 226, 0.08)",
        "rich-lg":
          "0 20px 25px -5px rgba(0, 90, 226, 0.15), 0 10px 10px -5px rgba(0, 90, 226, 0.08)",
        "accent-sm":
          "0 4px 6px -1px rgba(54, 214, 231, 0.25), 0 2px 4px -1px rgba(54, 214, 231, 0.08)",
        "accent-md":
          "0 10px 15px -3px rgba(54, 214, 231, 0.25), 0 4px 6px -2px rgba(54, 214, 231, 0.15)",
        "glow-primary": "0 0 15px rgba(0, 90, 226, 0.6)",
        "glow-accent": "0 0 15px rgba(54, 214, 231, 0.6)",
        "glow-highlight": "0 0 15px rgba(132, 94, 247, 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "parallax-scroll": {
          "0%": { transform: "translateZ(0) translateY(0)" },
          "100%": { transform: "translateZ(50px) translateY(-20px)" },
        },
        morph: {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-down": {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "blur-in": {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 10s linear infinite",
        "parallax-scroll": "parallax-scroll 0.5s ease-out forwards",
        morph: "morph 8s ease-in-out infinite",
        shimmer: "shimmer 3s infinite linear",
        "scale-up": "scale-up 0.5s ease-out",
        "scale-down": "scale-down 0.5s ease-out",
        "blur-in": "blur-in 0.7s ease-out",
        "spin-slow": "spin-slow 15s linear infinite",
        wave: "wave 1.5s ease-in-out infinite",
      },
      backdropFilter: {
        glass: "blur(40px) saturate(200%)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f9ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "dots-pattern":
          "radial-gradient(rgba(0, 90, 226, 0.15) 1px, transparent 1px)",
        "grid-pattern":
          "linear-gradient(to right, rgba(0, 90, 226, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 90, 226, 0.08) 1px, transparent 1px)",
        "diagonal-lines":
          "repeating-linear-gradient(45deg, rgba(54, 214, 231, 0.05) 0px, rgba(54, 214, 231, 0.05) 1px, transparent 1px, transparent 10px)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
        "aurora-gradient":
          "linear-gradient(125deg, rgba(0, 90, 226, 0.35), rgba(54, 214, 231, 0.35), rgba(132, 94, 247, 0.35))",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        width: "width",
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        transform: "transform",
        opacity: "opacity",
      },
      backgroundSize: {
        "dots-pattern": "20px 20px",
        "grid-pattern": "30px 30px",
        shimmer: "200% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
