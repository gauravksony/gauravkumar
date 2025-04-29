import React, { useRef, useState, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Card3DProps = {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  glareColor?: string;
  darkGlareColor?: string;
  glarePosition?: "all" | "top" | "bottom" | "left" | "right";
  glareMaxOpacity?: number;
  depth?: number;
  borderRadius?: string;
};

/**
 * A 3D card component with parallax and tilt effects
 */
export function Card3D({
  children,
  className,
  glareEnabled = true,
  glareColor = "rgba(255, 255, 255, 0.4)",
  darkGlareColor = "rgba(100, 150, 255, 0.2)",
  glarePosition = "top",
  glareMaxOpacity = 0.5,
  depth = 2, // Higher values = more 3D effect
  borderRadius = "1rem",
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
    background: `linear-gradient(0deg, transparent, ${glareColor})`,
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.3s ease-out",
  });

  // Detect if we're in dark mode (client-side)
  const isDarkMode =
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  // Use appropriate glare color based on color mode
  const currentGlareColor = isDarkMode ? darkGlareColor : glareColor;

  // Calculate the glare style based on the position
  const getGlareBackground = (x: number, y: number) => {
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    let gradientAngle = 0;

    switch (glarePosition) {
      case "top":
        gradientAngle = 0;
        break;
      case "right":
        gradientAngle = 90;
        break;
      case "bottom":
        gradientAngle = 180;
        break;
      case "left":
        gradientAngle = 270;
        break;
      case "all":
        gradientAngle = (angle + 360) % 360;
        break;
      default:
        gradientAngle = 0;
    }

    return `linear-gradient(${gradientAngle}deg, transparent, ${currentGlareColor})`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to card center (-1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);

    // Apply depth multiplier (higher = more 3D effect)
    const tiltX = relativeY * -depth;
    const tiltY = relativeX * depth;

    // Create the 3D transform style
    setTransform(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    );

    // Update glare effect
    if (glareEnabled) {
      const glareOpacity =
        Math.sqrt(relativeX * relativeX + relativeY * relativeY) *
        glareMaxOpacity;

      setGlareStyle({
        ...glareStyle,
        background: getGlareBackground(relativeX, relativeY),
        opacity: glareOpacity,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    if (glareEnabled) {
      setGlareStyle({ ...glareStyle, opacity: 0 });
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-300 ease-out transform-gpu",
        className
      )}
      style={{ transform, borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEnabled && <div style={glareStyle} />}
    </div>
  );
}

/**
 * A simple example of a 3D card with content
 */
export function Card3DDemo() {
  return (
    <Card3D className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-3d-card dark:shadow-gray-900/30 border border-modern-border dark:border-gray-700">
      <h3 className="text-xl font-bold text-modern-text dark:text-gray-200 mb-3">
        3D Card Example
      </h3>
      <p className="text-modern-textLight dark:text-gray-300">
        This is a demonstration of the 3D card component. Move your mouse over
        the card to see the effect.
      </p>
    </Card3D>
  );
}

export default Card3D;
