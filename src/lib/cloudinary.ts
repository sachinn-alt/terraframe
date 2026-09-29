/**
 * Cloudinary Dynamic Media URL Builder & Pipeline Helpers
 * Inspired by Cloudinary Community Photocrate architecture
 * Leverages Cloudinary's dynamic CDN transformations for environmental media.
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'terraframe-demo';

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
  restore?: boolean;
  improve?: boolean;
  removeBackground?: boolean;
}

/**
 * Builds a dynamic Cloudinary transformation URL from a public ID or remote image
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: TransformationOptions = {}
): string {
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
    restore,
    improve,
    removeBackground,
  } = options;

  const transformations: string[] = [];

  // Photocrate AI Enhancements
  if (removeBackground) {
    transformations.push('e_background_removal');
  }
  if (restore) {
    transformations.push('e_gen_restore');
  }
  if (improve) {
    transformations.push('e_improve');
  }

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
    return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/fetch/${transformString}/${encodeURIComponent(
      publicIdOrUrl
    )}`;
  }

  return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/upload/${transformString}/${publicIdOrUrl}`;
}

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

export function getSquareThumbnail(sourceUrl: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 600,
    height: 600,
    crop: 'fill',
    gravity: 'auto',
    aspectRatio: '1:1',
    quality: 'auto',
    format: 'auto',
  });
}

export function getWatermarkedProof(sourceUrl: string, badgeText: string = 'TERRAFRAME VERIFIED PROOF'): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1000,
    quality: 'auto',
    format: 'auto',
    watermarkText: badgeText,
  });
}

export function getAiRestoredAsset(sourceUrl: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1000,
    restore: true,
    improve: true,
    quality: 'auto',
    format: 'auto',
  });
}

export function getAiIsolatedSubject(sourceUrl: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1000,
    removeBackground: true,
    quality: 'auto',
    format: 'auto',
  });
}
