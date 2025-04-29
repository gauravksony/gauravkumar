/**
 * Utility functions for 3D effects and animations
 */

/**
 * Creates a parallax effect based on mouse movement
 * @param e MouseEvent
 * @param element DOM element to apply parallax to
 * @param strength Strength of the parallax effect (default: 20)
 * @param invert Whether to invert the parallax direction (default: false)
 */
export function applyMouseParallax(
  e: MouseEvent,
  element: HTMLElement,
  strength: number = 20,
  invert: boolean = false
): void {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate mouse position relative to element center (-1 to 1)
  const relativeX = (e.clientX - centerX) / (rect.width / 2);
  const relativeY = (e.clientY - centerY) / (rect.height / 2);

  // Apply parallax effect
  const x = invert ? -relativeX * strength : relativeX * strength;
  const y = invert ? -relativeY * strength : relativeY * strength;

  element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

/**
 * Creates a tilt effect based on mouse movement
 * @param e MouseEvent
 * @param element DOM element to apply tilt to
 * @param perspective Perspective value for 3D effect (default: 1000)
 * @param tiltStrength Max tilt in degrees (default: 5)
 * @param glareEnabled Add a glare effect (default: false)
 * @param glareElement DOM element to apply glare to (optional)
 */
export function applyMouseTilt(
  e: MouseEvent,
  element: HTMLElement,
  perspective: number = 1000,
  tiltStrength: number = 5,
  glareEnabled: boolean = false,
  glareElement?: HTMLElement
): void {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate mouse position relative to element center (-1 to 1)
  const relativeX = (e.clientX - centerX) / (rect.width / 2);
  const relativeY = (e.clientY - centerY) / (rect.height / 2);

  // Calculate tilt
  const tiltX = relativeY * -tiltStrength;
  const tiltY = relativeX * tiltStrength;

  // Apply tilt effect
  element.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

  // Apply glare effect
  if (glareEnabled && glareElement) {
    const glareOpacity = Math.sqrt(
      relativeX * relativeX + relativeY * relativeY
    );
    glareElement.style.opacity = glareOpacity.toString();

    // Update glare position/angle
    const glareAngle = Math.atan2(relativeY, relativeX) * (180 / Math.PI);
    glareElement.style.background = `linear-gradient(${glareAngle}deg, rgba(255, 255, 255, 0.5), transparent)`;
  }
}

/**
 * Resets a transform back to default
 * @param element DOM element to reset
 * @param glareElement Optional glare element to reset
 */
export function resetTransform(
  element: HTMLElement,
  glareElement?: HTMLElement
): void {
  if (!element) return;
  element.style.transform = "";

  if (glareElement) {
    glareElement.style.opacity = "0";
  }
}

/**
 * Calculates scroll-based animation progress
 * @param element DOM element to track
 * @param startOffset When to start the animation (0-1, percentage of viewport)
 * @param endOffset When to end the animation (0-1, percentage of viewport)
 * @returns Progress value from 0 to 1
 */
export function getScrollProgress(
  element: HTMLElement,
  startOffset: number = 0.3,
  endOffset: number = 0.7
): number {
  if (!element) return 0;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Calculate start and end positions
  const startPosition = windowHeight * startOffset;
  const endPosition = windowHeight * endOffset;

  // Calculate current element position relative to viewport
  const elementPosition = rect.top;

  // Calculate progress (0 to 1)
  let progress =
    (startPosition - elementPosition) / (startPosition - endPosition);

  // Clamp progress between 0 and 1
  return Math.max(0, Math.min(1, progress));
}

/**
 * Applies a scroll-based "reveal" animation
 * @param element DOM element to animate
 * @param threshold Viewport threshold to trigger animation (0-1)
 * @param className Class to add when element is in view
 */
export function scrollReveal(
  element: HTMLElement,
  threshold: number = 0.2,
  className: string = "revealed"
): void {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if element is in viewport
  const isInView = rect.top < windowHeight * (1 - threshold);

  if (isInView) {
    element.classList.add(className);
  }
}

/**
 * Enables smooth scrolling behavior for the entire website
 */
export function enableSmoothScroll(): void {
  // Add smooth scrolling to HTML element
  document.documentElement.style.scrollBehavior = "smooth";

  // Handle anchor links for smoother navigation
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "A" &&
      target.getAttribute("href")?.startsWith("#")
    ) {
      e.preventDefault();
      const href = target.getAttribute("href");
      if (href) {
        const elementToScroll = document.querySelector(href);
        if (elementToScroll) {
          elementToScroll.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
}

/**
 * Ensures all content is visible by removing any fade-in-hidden classes
 * that might prevent content from being visible
 */
export function ensureContentVisible(): void {
  // Remove fade-in-hidden from any elements that might be stuck
  document.querySelectorAll(".fade-in-hidden").forEach((el) => {
    el.classList.remove("fade-in-hidden");
  });

  // Force cards and other elements to be visible
  document.querySelectorAll(".card, .project-card, article").forEach((el) => {
    el.classList.add("animate-fade-in-up");
    (el as HTMLElement).style.opacity = "1";
  });
}

/**
 * Animates content as it enters the viewport
 * @param options Configuration options
 */
export function setupContentAnimations(
  options = {
    selectors: ".animate-on-scroll",
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
    animationClass: "animate-fade-in-up",
  }
): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // First ensure element has animation class
          entry.target.classList.add(options.animationClass);
          // Remove the hidden class if it exists
          entry.target.classList.remove("fade-in-hidden");
          observer.unobserve(entry.target); // Animation runs once
        }
      });
    },
    {
      threshold: options.threshold,
      rootMargin: options.rootMargin,
    }
  );

  // Observe all elements with the selector
  document.querySelectorAll(options.selectors).forEach((el) => {
    // Add the hidden class only for elements that should animate in
    if (!el.classList.contains(options.animationClass)) {
      el.classList.add("fade-in-hidden");
    }
    observer.observe(el);
  });
}

/**
 * Reapplies animation to cards to fix the bouncing effect after page navigation
 * Should be called after page content loads or route changes
 */
export function reinitializeCardAnimations(): void {
  // First remove any existing animations and classes
  document
    .querySelectorAll(".card, .project-card, article, .animate-on-scroll")
    .forEach((el) => {
      // First make sure all elements are visible
      (el as HTMLElement).style.opacity = "1";

      // Remove animation classes
      el.classList.remove("animate-fade-in-up");
      el.classList.remove("fade-in-hidden");

      // Force a reflow to ensure animations can be reapplied
      void el.offsetWidth;

      // Apply the fade-in-hidden class to start fresh
      el.classList.add("fade-in-hidden");
    });

  // Set up a new IntersectionObserver for the animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply animation with a slight staggered delay based on index
          const index = Array.from(
            document.querySelectorAll(".fade-in-hidden")
          ).indexOf(entry.target);
          const delay = Math.min(index * 0.05, 0.3); // Max delay of 300ms

          setTimeout(() => {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("fade-in-hidden");
          }, delay * 1000);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  // Observe all elements that should animate
  document.querySelectorAll(".fade-in-hidden").forEach((el) => {
    observer.observe(el);
  });
}

export default {
  applyMouseParallax,
  applyMouseTilt,
  resetTransform,
  getScrollProgress,
  scrollReveal,
  enableSmoothScroll,
  setupContentAnimations,
  ensureContentVisible,
  reinitializeCardAnimations,
};
