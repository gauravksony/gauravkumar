// Prerender middleware for dynamic meta tags on server side
// This script works with hosting providers like Vercel, Netlify, etc.

// Define default meta information
const DEFAULT_TITLE = "Gaurav Kumar | Full Stack Developer Portfolio & Blog";
const DEFAULT_DESCRIPTION =
  "Gaurav Kumar | Full Stack Developer and AI/ML Enthusiast skilled in React, Node.js, Python, C++, SQL, and DSA.";
const DEFAULT_IMAGE =
  "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";
const DEFAULT_URL = "https://gauravkumar.dev";
const SITE_NAME = "Gaurav Kumar Portfolio";
const TWITTER_HANDLE = "@gauravkumarsony";

// Define path-based meta information for static pages
const pathMetadata = {
  "/blogs": {
    title: "Blog | Gaurav Kumar",
    description:
      "Read technical articles, tutorials and insights on web development, AI/ML, and software engineering.",
    type: "website",
  },
  "/projects": {
    title: "Projects | Gaurav Kumar",
    description:
      "Explore Gaurav Kumar's portfolio of projects showcasing skills in web development, machine learning, and more.",
    type: "website",
  },
  "/study-material": {
    title: "Study Materials | Gaurav Kumar",
    description:
      "Free resources, lecture notes, and practice problems to help you prepare for exams, interviews, and deepen your understanding of computer science concepts.",
    type: "website",
  },
  "/experience": {
    title: "Experience | Gaurav Kumar",
    description:
      "Gaurav Kumar's professional experience in software development, tech leadership, and consulting roles.",
    type: "website",
  },
  "/contact": {
    title: "Contact | Gaurav Kumar",
    description:
      "Get in touch with Gaurav Kumar for collaborations, job opportunities, or project inquiries.",
    type: "website",
  },
};

// Regex patterns for dynamic routes
const dynamicRoutePatterns = [
  {
    pattern: /^\/blogs\/([^\/]+)$/,
    type: "article",
    getMetadata: (path, req) => ({
      title: `Blog Post | Gaurav Kumar`,
      description: `Read this blog post by Gaurav Kumar on web development, AI/ML, or software engineering.`,
      url: `${DEFAULT_URL}${path}`,
    }),
  },
  {
    pattern: /^\/projects\/([^\/]+)$/,
    type: "article",
    getMetadata: (path, req) => ({
      title: `Project | Gaurav Kumar Portfolio`,
      description: `Check out this project in Gaurav Kumar's portfolio.`,
      url: `${DEFAULT_URL}${path}`,
    }),
  },
  {
    pattern: /^\/study-material\/([^\/]+)$/,
    type: "article",
    getMetadata: (path, req) => ({
      title: `Study Material | Gaurav Kumar`,
      description: `Free study resources by Gaurav Kumar to help you learn and practice.`,
      url: `${DEFAULT_URL}${path}`,
    }),
  },
];

/**
 * Prerender middleware for Express or similar servers
 * Modifies the HTML before sending it to the client
 */
function prerenderMiddleware(req, res, next) {
  // Skip for non-GET requests or non-HTML requests
  if (req.method !== "GET" || !req.headers.accept?.includes("text/html")) {
    return next();
  }

  // Store the original send function
  const originalSend = res.send;

  // Override the send function
  res.send = function (html) {
    // Only process HTML responses
    if (typeof html === "string" && html.includes("<!DOCTYPE html>")) {
      const path = req.path;

      // Determine metadata based on path
      let metadata = {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        url: `${DEFAULT_URL}${path}`,
        type: "website",
      };

      // Check if we have predefined metadata for this path
      if (pathMetadata[path]) {
        metadata = { ...metadata, ...pathMetadata[path] };
      } else {
        // Check if path matches any dynamic route pattern
        for (const route of dynamicRoutePatterns) {
          if (route.pattern.test(path)) {
            const dynamicMetadata = route.getMetadata(path, req);
            metadata = {
              ...metadata,
              ...dynamicMetadata,
              type: route.type,
            };
            break;
          }
        }
      }

      // Update OpenGraph and Twitter tags in the HTML
      html = html
        // Update title
        .replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)

        // Update description
        .replace(
          /<meta name="description" content=".*?">/,
          `<meta name="description" content="${metadata.description}">`
        )

        // Update OG title
        .replace(
          /<meta property="og:title" content=".*?">/,
          `<meta property="og:title" content="${metadata.title}">`
        )

        // Update OG description
        .replace(
          /<meta property="og:description" content=".*?">/,
          `<meta property="og:description" content="${metadata.description}">`
        )

        // Update OG type
        .replace(
          /<meta property="og:type" content=".*?">/,
          `<meta property="og:type" content="${metadata.type}">`
        )

        // Update OG URL
        .replace(
          /<meta property="og:url" content=".*?">/,
          `<meta property="og:url" content="${metadata.url}">`
        )

        // Update Twitter title
        .replace(
          /<meta name="twitter:title" content=".*?">/,
          `<meta name="twitter:title" content="${metadata.title}">`
        )

        // Update Twitter description
        .replace(
          /<meta name="twitter:description" content=".*?">/,
          `<meta name="twitter:description" content="${metadata.description}">`
        );
    }

    // Call the original send function
    return originalSend.call(this, html);
  };

  next();
}

module.exports = prerenderMiddleware;
