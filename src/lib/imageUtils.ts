/**
 * Utility functions for image handling and optimization
 */

/**
 * Crops and resizes an image to the specified dimensions
 * @param file - The image file to crop
 * @param targetWidth - The target width for the cropped image
 * @param targetHeight - The target height for the cropped image
 * @param aspectRatio - The aspect ratio to maintain (width/height)
 * @returns A Promise that resolves to the cropped image as a File object
 */
export const cropImage = async (
  file: File,
  targetWidth: number,
  targetHeight: number,
  aspectRatio: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to target dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Calculate dimensions to maintain aspect ratio
        let sourceWidth = img.width;
        let sourceHeight = img.height;
        let sourceX = 0;
        let sourceY = 0;

        // If image aspect ratio doesn't match target
        if (img.width / img.height !== aspectRatio) {
          if (img.width / img.height > aspectRatio) {
            // Image is wider than needed
            sourceWidth = img.height * aspectRatio;
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            // Image is taller than needed
            sourceHeight = img.width / aspectRatio;
            sourceY = (img.height - sourceHeight) / 2;
          }
        }

        // Draw the image with cropping
        ctx?.drawImage(
          img,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new file from the blob
              const croppedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(croppedFile);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          file.type,
          0.9
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Dimensions for different types of content thumbnails
 */
export const THUMBNAIL_DIMENSIONS = {
  blog: {
    width: 1200,
    height: 675,
    aspectRatio: 16 / 9,
  },
  project: {
    width: 1200,
    height: 675,
    aspectRatio: 16 / 9,
  },
  studyMaterial: {
    width: 1200,
    height: 675,
    aspectRatio: 16 / 9,
  },
};

// Initialize lazy loading for images
export const initializeLazyLoading = () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
};
