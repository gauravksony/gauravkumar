// Dynamic Open Graph Image Generation API
// This uses Vercel's Edge Runtime
export const config = {
  runtime: "edge",
};

/**
 * Handles the request to generate an Open Graph image
 * @param {Request} req - The request object
 * @returns {Response} - The response with the generated image
 */
export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters from URL
    const title = searchParams.get("title") || "Gaurav Kumar";
    const type = searchParams.get("type") || "blog";
    const path = searchParams.get("path") || "";

    // Determine what template to use based on content type
    let template;
    let text;
    let imageUrl;

    switch (type) {
      case "blog":
        template = "blog";
        text = "Blog Post";
        imageUrl =
          searchParams.get("image") ||
          "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";
        break;
      case "project":
        template = "project";
        text = "Project";
        imageUrl =
          searchParams.get("image") ||
          "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";
        break;
      case "study":
        template = "study";
        text = "Study Material";
        imageUrl =
          searchParams.get("image") ||
          "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";
        break;
      default:
        template = "default";
        text = "Portfolio";
        imageUrl =
          "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";
    }

    // Create HTML for the OG image
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #0a192f;
              width: 1200px;
              height: 630px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #ccd6f6;
              background-image: linear-gradient(45deg, #0a192f 0%, #112240 100%);
              position: relative;
              overflow: hidden;
            }
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 40px;
              max-width: 80%;
              z-index: 10;
            }
            h1 {
              font-size: 60px;
              margin: 0 0 20px;
              line-height: 1.2;
              background: linear-gradient(90deg, #64ffda, #56ccf2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: 700;
            }
            p {
              font-size: 32px;
              margin: 0;
              opacity: 0.9;
            }
            .logo {
              position: absolute;
              bottom: 40px;
              left: 40px;
              font-size: 24px;
              font-weight: 700;
              color: #64ffda;
            }
            .type {
              position: absolute;
              top: 40px;
              right: 40px;
              background-color: rgba(100, 255, 218, 0.1);
              border: 1px solid #64ffda;
              color: #64ffda;
              padding: 8px 16px;
              border-radius: 4px;
              font-size: 24px;
            }
            .dots {
              position: absolute;
              width: 200px;
              height: 200px;
              background-image: radial-gradient(#64ffda 1px, transparent 1px);
              background-size: 20px 20px;
              opacity: 0.2;
            }
            .dots-1 {
              top: -50px;
              left: -50px;
              transform: rotate(15deg);
            }
            .dots-2 {
              bottom: -50px;
              right: -50px;
              transform: rotate(-15deg);
            }
          </style>
        </head>
        <body>
          <div class="dots dots-1"></div>
          <div class="dots dots-2"></div>
          
          <div class="type">${text}</div>
          
          <div class="container">
            <h1>${title}</h1>
            <p>gauravkumar.dev${path ? `/${path}` : ""}</p>
          </div>
          
          <div class="logo">Gaurav Kumar</div>
        </body>
      </html>
    `;

    // Return the HTML
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    // Return error response
    return new Response(`Failed to generate OG image: ${error.message}`, {
      status: 500,
    });
  }
}
