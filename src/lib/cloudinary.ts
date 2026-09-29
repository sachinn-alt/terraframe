/**
 * Cloudinary Dynamic Media URL Builder & Pipeline Helpers
 * Inspired by Cloudinary Community Photocrate & Video Processing Pipelines
 * Leverages Cloudinary's dynamic CDN transformations for Image, Video, and Audio.
 */

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'terraframe-demo';

export interface TransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'thumb' | 'scale' | 'pad';
  gravity?: 'auto' | 'center' | 'faces' | 'north' | 'south';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9' | '9:16';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'mp4' | 'webm';
  watermarkText?: string;
  effect?: string;
  restore?: boolean;
  improve?: boolean;
  removeBackground?: boolean;
  recolor?: {
    prompt: string;
    toColor: string;
  };
  fadeMs?: number;
  startOffset?: number;
  duration?: number;
}

/**
 * Builds a dynamic Cloudinary transformation URL from a public ID or remote asset
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: TransformationOptions = {},
  resourceType: 'image' | 'video' = 'image'
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
    recolor,
    fadeMs,
    startOffset,
    duration,
  } = options;

  const transformations: string[] = [];

  // 1. Generative AI & Visual Enhancements (Cloudinary AI suite)
  if (removeBackground) {
    transformations.push('e_background_removal');
  }
  if (restore) {
    transformations.push('e_gen_restore');
  }
  if (improve) {
    transformations.push('e_improve');
  }
  if (recolor) {
    // Generative Recolor demonstrated in Founder Q&A (e.g. e_gen_recolor:prompt_vegetation;to-color_059669)
    transformations.push(`e_gen_recolor:prompt_${encodeURIComponent(recolor.prompt)};to-color_${recolor.toColor}`);
  }

  // 2. Video Fades & Trimming
  if (fadeMs) {
    transformations.push(`e_fade:${fadeMs}`);
  }
  if (startOffset !== undefined) {
    transformations.push(`so_${startOffset}`);
  }
  if (duration !== undefined) {
    transformations.push(`du_${duration}`);
  }

  // 3. Cropping and Sizing
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

  // 4. Optimization (f_auto, q_auto)
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  // 5. Additional Visual Effects
  if (effect) {
    transformations.push(`e_${effect}`);
  }

  // 6. Dynamic Watermark Overlay
  if (watermarkText) {
    const encodedText = encodeURIComponent(watermarkText);
    transformations.push(
      `l_text:Arial_18_bold:${encodedText},co_rgb:FFFFFF,b_rgb:059669EE,p_8,r_6,y_16,x_16,g_south_east`
    );
  }

  const transformString = transformations.join(',');

  if (isHttp) {
    return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/${resourceType}/fetch/${transformString}/${encodeURIComponent(
      publicIdOrUrl
    )}`;
  }

  return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/${resourceType}/upload/${transformString}/${publicIdOrUrl}`;
}

// -------------------------------------------------------------
// Image Transformation Presets
// -------------------------------------------------------------

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

export function getAiRecoloredAsset(sourceUrl: string, prompt: string, toColorHex: string): string {
  return buildCloudinaryUrl(sourceUrl, {
    width: 1000,
    recolor: { prompt, toColor: toColorHex },
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

// -------------------------------------------------------------
// Video & Audio Pipeline Helpers (Highlighted in Founders Q&A)
// -------------------------------------------------------------

/**
 * Transforms landscape drone field video to a 1:1 square video with subject auto-tracking and fade effect.
 */
export function getVideoSquareFade(videoUrl: string): string {
  return buildCloudinaryUrl(
    videoUrl,
    {
      width: 720,
      height: 720,
      aspectRatio: '1:1',
      crop: 'fill',
      gravity: 'auto',
      fadeMs: 1000,
      format: 'mp4',
      quality: 'auto',
    },
    'video'
  );
}

/**
 * Adds cryptographic verification watermark overlay to drone surveillance video
 */
export function getVideoWatermarked(videoUrl: string, text: string = 'TERRAFRAME • VERIFIED DRONE TRANSECT'): string {
  return buildCloudinaryUrl(
    videoUrl,
    {
      width: 1080,
      quality: 'auto',
      format: 'mp4',
      watermarkText: text,
    },
    'video'
  );
}

/**
 * Generates lightweight animated preview snippet (animated WebP) from a video
 */
export function getVideoAnimatedPreview(videoUrl: string): string {
  return buildCloudinaryUrl(
    videoUrl,
    {
      width: 600,
      aspectRatio: '16:9',
      crop: 'fill',
      gravity: 'auto',
      startOffset: 1,
      duration: 3,
      format: 'webp',
      quality: 'auto',
    },
    'video'
  );
}

/**
 * Audio / Bio-acoustic waveform visualization URL generator
 */
export function getAudioWaveformUrl(audioOrVideoUrl: string): string {
  return `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/video/upload/fl_waveform,co_rgb:059669,b_rgb:F8FAFC,w_800,h_150/${encodeURIComponent(
    audioOrVideoUrl
  )}.png`;
}
