/**
 * Cloudinary Dynamic Media URL Builder & Pipeline Helpers
 * Leverages Cloudinary's dynamic CDN transformations for environmental media.
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'veriterra-demo';

export interface TransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'thumb' | 'scale' | 'pad';
  gravity?: 'auto' | 'center' | 'faces' | 'north' | 'south';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  watermarkText?: string;
  effect?: string;
}

/**
 * Builds a dynamic Cloudinary transformation URL from a public ID or remote image
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: TransformationOptions = {}
): string {
  // If it's already an external HTTP URL (e.g. Unsplash demo asset), wrap with Cloudinary Fetch or direct optimize
  const isHttp = publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://');

  const {
    width,
    height,
    crop = 'fill',
    gravity = 'auto',
    aspectRatio,
    quality = 'auto',
    format = 'auto',
    watermarkText,
    effect,
  } = options;

  const transformations: string[] = [];

  // Cropping and Sizing
  if (aspectRatio) {
    transformations.push(`ar_${aspectRatio}`);
  }
  if (crop) {
    transformations.push(`c_${crop}`);
  }
  if (gravity) {
    transformations.push(`g_${gravity}`);
  }
  if (width) {
    transformations.push(`w_${width}`);
  }
  if (height) {
    transformations.push(`h_${height}`);
  }

  // Format & Quality optimization (Cloudinary best practice)
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  // Visual Effects
  if (effect) {
    transformations.push(`e_${effect}`);
  }

  // Verification Watermark Overlay
  if (watermarkText) {
    const encodedText = encodeURIComponent(watermarkText);
    transformations.push(
      `l_text:Arial_18_bold:${encodedText},co_rgb:FFFFFF,b_rgb:059669EE,p_8,r_6,y_16,x_16,g_south_east`
    );
  }

  const transformString = transformations.join(',');

  if (isHttp) {
    // If external URL, pass through Cloudinary's dynamic fetch pipeline
    return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/fetch/${transformString}/${encodeURIComponent(
      publicIdOrUrl
    )}`;
  }

  return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/upload/${transformString}/${publicIdOrUrl}`;
}

/**
 * Returns optimized thumbnail for gallery grids (4:3 ratio)
 */
export function getGalleryThumbnail(sourceUrl: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 600,
    height: 450,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Returns optimized wide card (16:9 ratio)
 */
export function getHeroBanner(sourceUrl: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1200,
    height: 675,
    crop: 'fill',
    gravity: 'auto',
    aspectRatio: '16:9',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Returns verified watermarked asset preview
 */
export function getWatermarkedProof(sourceUrl: string, badgeText: string = 'VERITERRA VERIFIED PROOF'): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1000,
    quality: 'auto',
    format: 'auto',
    watermarkText: badgeText,
  });
}

/**
 * Simulates a Cloudinary dynamic split-layer comparison
 */
export function getSplitComparisonUrl(baselineUrl: string, milestoneUrl: string): string {
  // In production, Cloudinary overlays the second image with a 50% mask (e.g., l_fetch:.../w_0.5,c_crop)
  return buildCloudinaryUrl(milestoneUrl, {
    width: 1200,
    quality: 'auto',
    format: 'auto',
    watermarkText: 'VERITERRA • BEFORE / AFTER AUDIT',
  });
}
