export type ProjectCategory = 
  | 'Reforestation' 
  | 'Ocean & Marine' 
  | 'Renewable Energy' 
  | 'Waste & Clean Water' 
  | 'Wildlife Habitat';

export type MilestoneType = 'baseline' | 'intermediate' | 'milestone_achieved';

export type VerificationStatus = 'verified' | 'pending_review' | 'flagged';

export interface TelemetryData {
  capturedAt: string;
  uploadedAt: string;
  gps: {
    latitude: number;
    longitude: number;
    altitudeMeters?: number;
    locationName: string;
    region: string;
    country: string;
  };
  device: {
    make: string;
    model: string;
    lens?: string;
    iso?: number;
    focalLength?: string;
  };
  isExifVerified: boolean;
}

export interface CloudinaryAssetMeta {
  publicId: string;
  cloudName: string;
  secureUrl: string;
  thumbnailUrl: string;
  watermarkedUrl: string;
  smartCroppedUrl: string;
  format: string;
  width: number;
  height: number;
  resourceType: 'image' | 'video';
  bytes: number;
}

export interface DetectedObject {
  label: string;
  count: number;
  confidence: number;
}

export interface AIAnalysis {
  sdgGoals: number[];
  confidenceScore: number;
  domainCategory: ProjectCategory;
  detectedObjects: DetectedObject[];
  environmentalSignals: string[];
  tags: string[];
  aiNarrative: string;
  authenticityScore: number; // 0 to 100%
  apparentTampering: boolean;
}

export interface EvidenceAsset {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  originalFileName: string;
  sha256Hash: string;
  milestoneType: MilestoneType;
  status: VerificationStatus;
  telemetry: TelemetryData;
  cloudinary: CloudinaryAssetMeta;
  aiAnalysis: AIAnalysis;
  matchedPairId?: string;
}

export interface ComparisonPair {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  baselineAsset: EvidenceAsset;
  milestoneAsset: EvidenceAsset;
  timeDeltaDays: number;
  distanceDeltaMeters: number;
  quantifiedImpact: {
    metricName: string;
    baselineValue: number;
    milestoneValue: number;
    deltaPercentage: number;
    unit: string;
    verificationMethod: string;
  };
  summaryStory: string;
  interventions: string[];
}

export interface ImpactProject {
  id: string;
  name: string;
  organization: string;
  category: ProjectCategory;
  country: string;
  region: string;
  coordinates: [number, number];
  primarySdg: number;
  sdgList: number[];
  startDate: string;
  targetCompletionDate: string;
  totalAssetsCount: number;
  verifiedAssetsCount: number;
  coverImageUrl: string;
  description: string;
  targetMetric: {
    label: string;
    target: number;
    current: number;
    unit: string;
  };
}

export interface ESGAuditReport {
  id: string;
  projectId: string;
  generatedAt: string;
  title: string;
  executiveSummary: string;
  verifiedAssetsCount: number;
  quantifiedDeltaSummary: string;
  sdgContributions: {
    sdg: number;
    title: string;
    verifiedMetric: string;
  }[];
  auditTrail: {
    assetId: string;
    sha256Hash: string;
    timestamp: string;
    gpsCoordinates: string;
    verifier: string;
  }[];
  campaignHeadline: string;
  socialSnippet: string;
}
