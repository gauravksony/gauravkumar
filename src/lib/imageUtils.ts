/**
 * Utility functions for image handling and optimization
 */

/**
 * Crops and resizes an image to the specified dimensions
 * @param file - The image file to crop
 * @param maxWidth - The maximum width for the cropped image
 * @param maxHeight - The maximum height for the cropped image
 * @param aspectRatio - Optional aspect ratio to maintain (width/height)
 * @returns A Promise that resolves to the cropped image as a File object
 */
export const cropImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
  aspectRatio?: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate dimensions based on aspect ratio if provided
        let targetWidth = maxWidth;
        let targetHeight = maxHeight;

        if (aspectRatio) {
          // If aspect ratio is provided, calculate one dimension based on the other
          if (maxWidth / maxHeight > aspectRatio) {
            // Height is the limiting factor
            targetWidth = maxHeight * aspectRatio;
          } else {
            // Width is the limiting factor
            targetHeight = maxWidth / aspectRatio;
          }
        }

        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Calculate source dimensions to maintain aspect ratio with center crop
        let sx = 0;
        let sy = 0;
        let sWidth = img.width;
        let sHeight = img.height;

        const sourceAspectRatio = img.width / img.height;
        const targetAspectRatio = targetWidth / targetHeight;

        if (sourceAspectRatio > targetAspectRatio) {
          // Source image is wider - crop the sides
          sWidth = img.height * targetAspectRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          // Source image is taller - crop the top/bottom
          sHeight = img.width / targetAspectRatio;
          sy = (img.height - sHeight) / 2;
        }

        // Draw the cropped image on the canvas
        ctx.drawImage(
          img,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // Convert to blob and then to File
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Could not create image blob"));
            return;
          }

          // Create a new file from the blob
          const croppedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          resolve(croppedFile);
        }, file.type);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Dimensions for different types of content thumbnails
 */
export const THUMBNAIL_DIMENSIONS = {
  blog: {
    width: 800,
    height: 450,
    aspectRatio: 16 / 9, // 16:9 aspect ratio for blog post thumbnails
  },
  project: {
    width: 500,
    height: 350,
    aspectRatio: 10 / 7, // Slightly taller than 16:9 for projects
  },
  studyMaterial: {
    width: 400,
    height: 400,
    aspectRatio: 1, // Square aspect ratio for study materials
  },
};
