import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

function ScrollToggleButton() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      // Check if page has content to scroll (more than viewport height)
      const hasScrollableContent = docHeight > windowHeight + 100;

      // Calculate how close we are to the bottom (as a percentage)
      const scrollPercentage = (scrollY + windowHeight) / docHeight;

      // Update position states
      const exactlyAtTop = scrollY === 0;
      const exactlyAtBottom = scrollPercentage >= 0.99;
      const closeToBottom = scrollPercentage >= 0.6; // When to switch to "Go to Top" button

      setIsAtTop(scrollY < 100);
      setIsAtBottom(closeToBottom);

      // Show button if:
      // 1. Page is scrollable AND
      // 2. Not exactly at the top AND not exactly at the bottom
      setShow(hasScrollableContent && !exactlyAtTop && !exactlyAtBottom);

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check when component mounts
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (isAtBottom) {
      // If closer to bottom, go to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If closer to top, go to bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  // Show up arrow when closer to bottom, down arrow when closer to top
  const showTopButton = isAtBottom;

  return (
    <div
      className={`fixed bottom-5 right-5 flex flex-col items-center gap-2 z-30 transition-all duration-500 ${
        show
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 pointer-events-none transform translate-y-10"
      }`}
    >
      <span className="text-sm text-modern-textLight dark:text-gray-300 animate-pulse-soft font-medium px-3 py-1 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm shadow-sm">
        {showTopButton ? "Go to Top" : "Scroll Down"}
      </span>
      <a
        href={showTopButton ? "#top" : "#scroll"}
        onClick={handleClick}
        className={`text-modern-primary dark:text-blue-400 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-rich-md hover:shadow-rich-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
          !showTopButton ? "animate-bounce-subtle" : ""
        }`}
        aria-label={showTopButton ? "Scroll to top" : "Scroll to bottom"}
      >
        {showTopButton ? (
          <ArrowUp
            size={24}
            className="text-modern-primary dark:text-blue-400"
          />
        ) : (
          <ArrowDown
            size={24}
            className="text-modern-primary dark:text-blue-400"
          />
        )}
      </a>
    </div>
  );
}
export default ScrollToggleButton;
