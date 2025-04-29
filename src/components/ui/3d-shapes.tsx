import React from "react";
import { cn } from "../../lib/utils";

type FloatingOrbProps = {
  className?: string;
  size?: string;
  color?: string;
  animation?: string;
  opacity?: number;
  blur?: string;
  zIndex?: number;
};

/**
 * A floating orb/bubble component for decorative backgrounds
 */
export function FloatingOrb({
  className,
  size = "60px",
  color = "rgba(14, 165, 233, 0.2)", // Default light blue
  animation = "animate-float",
  opacity = 0.5,
  blur = "0px",
  zIndex = -1,
}: FloatingOrbProps) {
  return (
    <div
      className={cn(animation, className)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        filter: `blur(${blur})`,
        position: "absolute",
        zIndex,
      }}
    />
  );
}

type GradientBackgroundProps = {
  className?: string;
  colors?: string[];
  opacity?: number;
  zIndex?: number;
  blur?: string;
};

/**
 * A gradient background component that can be used as a decorative element
 */
export function GradientBackground({
  className,
  colors = ["#bae6fd", "#0ea5e9"],
  opacity = 0.1,
  zIndex = -10,
  blur = "80px",
}: GradientBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        background: `radial-gradient(circle, ${colors.join(", ")})`,
        opacity,
        filter: `blur(${blur})`,
        zIndex,
      }}
    />
  );
}

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  blur?: string;
  opacity?: number;
  borderColor?: string;
};

/**
 * A glass-morphism card component
 */
export function GlassCard({
  children,
  className,
  blur = "16px",
  opacity = 0.7,
  borderColor = "rgba(255, 255, 255, 0.2)",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/70 rounded-xl border shadow-glass backdrop-blur-md",
        className
      )}
      style={{
        backdropFilter: `blur(${blur})`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        borderColor,
      }}
    >
      {children}
    </div>
  );
}

type FloatingElementsProps = {
  count?: number;
  containerClassName?: string;
  elements?: React.ReactNode[];
};

/**
 * A collection of floating elements that can be used as a decorative background
 */
export function FloatingElements({
  count = 6,
  containerClassName,
  elements,
}: FloatingElementsProps) {
  // Auto-generate elements if none are provided
  const generatedElements =
    elements ||
    Array.from({ length: count }).map((_, index) => {
      // Random properties for each element
      const size = `${30 + Math.random() * 70}px`;
      const opacity = 0.1 + Math.random() * 0.3;
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 3}s`;
      const animationDuration = `${5 + Math.random() * 10}s`;

      // Alternate between different shapes
      const shape =
        index % 3 === 0 ? (
          <FloatingOrb
            size={size}
            opacity={opacity}
            animation={index % 2 === 0 ? "animate-float" : "animate-pulse-soft"}
          />
        ) : (
          <div
            className="bg-modern-accent/30 rounded-lg absolute"
            style={{
              width: size,
              height: size,
              opacity,
              left,
              top,
              animation: `float ${animationDuration} ease-in-out infinite`,
              animationDelay,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );

      return (
        <div key={index} className="absolute" style={{ left, top }}>
          {shape}
        </div>
      );
    });

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        containerClassName
      )}
    >
      {generatedElements}
    </div>
  );
}

type MeshGradientProps = {
  className?: string;
  baseColor?: string;
  highlightColor?: string;
  opacity?: number;
  scale?: number;
  rotation?: number;
};

/**
 * A mesh gradient background component with subtle animated effect
 */
export function MeshGradient({
  className,
  baseColor = "rgba(14, 165, 233, 0.3)",
  highlightColor = "rgba(186, 230, 253, 0.5)",
  opacity = 0.2,
  scale = 1,
  rotation = 0,
}: MeshGradientProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        opacity,
        background: `radial-gradient(circle at 30% 30%, ${highlightColor}, transparent 70%),
                     radial-gradient(circle at 70% 70%, ${highlightColor}, transparent 70%),
                     ${baseColor}`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
}

// Aliases for exports
export const Orb = FloatingOrb;
export const GradientBg = GradientBackground;
 