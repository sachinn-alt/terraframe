import { ImpactProject, EvidenceAsset, ComparisonPair, ESGAuditReport } from '@/types';
import { getGalleryThumbnail, getHeroBanner, getWatermarkedProof } from './cloudinary';

export const INITIAL_PROJECTS: ImpactProject[] = [
  {
    id: 'proj-sundarbans',
    name: 'Sundarbans Coastal Mangrove Restoration',
    organization: 'Global Mangrove Trust & Sundarbans Wildlife Alliance',
    category: 'Reforestation',
    country: 'India',
    region: 'West Bengal & Bay of Bengal Delta',
    coordinates: [21.9497, 88.8998],
    primarySdg: 15,
    sdgList: [13, 14, 15],
    startDate: '2023-04-15',
    targetCompletionDate: '2026-12-31',
    totalAssetsCount: 420,
    verifiedAssetsCount: 412,
    coverImageUrl: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80',
    description: 'Restoring 2,500 hectares of critical tidal mangrove buffers along cyclone-vulnerable coastal villages, sequestering blue carbon and revitalizing estuarine biodiversity.',
    targetMetric: {
      label: 'Hectares Re-vegetated',
      target: 2500,
      current: 1840,
      unit: 'ha'
    }
  },
  {
    id: 'proj-atacama-solar',
    name: 'Atacama Desert Clean Energy Microgrid',
    organization: 'Andes Clean Power Consortium',
    category: 'Renewable Energy',
    country: 'Chile',
    region: 'Antofagasta Desert Plateau',
    coordinates: [-23.8634, -69.1328],
    primarySdg: 7,
    sdgList: [7, 9, 13],
    startDate: '2024-01-10',
    targetCompletionDate: '2025-11-30',
    totalAssetsCount: 285,
    verifiedAssetsCount: 280,
    coverImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    description: 'Deploying high-efficiency bifacial solar tracking arrays powering remote lithium-belt indigenous communities with 100% renewable baseload.',
    targetMetric: {
      label: 'Clean Peak Capacity',
      target: 25,
      current: 19.4,
      unit: 'MW'
    }
  },
  {
    id: 'proj-bali-coral',
    name: 'Bali Marine Coral Reef Nursery & Bio-Rock',
    organization: 'Coral Reef Alliance & Oceanus Marine Trust',
    category: 'Ocean & Marine',
    country: 'Indonesia',
    region: 'North Bali Coral Triangle',
    coordinates: [-8.1438, 115.0211],
    primarySdg: 14,
    sdgList: [13, 14],
    startDate: '2023-08-01',
    targetCompletionDate: '2026-06-30',
    totalAssetsCount: 310,
    verifiedAssetsCount: 304,
    coverImageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Submerging low-voltage mineral accretion bio-rock grids to accelerate calcium carbonate precipitation and coral micro-fragment colonization.',
    targetMetric: {
      label: 'Coral Fragments Planted',
      target: 50000,
      current: 38200,
      unit: 'fragments'
    }
  },
  {
    id: 'proj-nairobi-river',
    name: 'Nairobi River Basin Plastic & Riparian Remediation',
    organization: 'Clean Streams Initiative Africa',
    category: 'Waste & Clean Water',
    country: 'Kenya',
    region: 'Nairobi County & Athi Basin',
    coordinates: [-1.286389, 36.817223],
    primarySdg: 6,
    sdgList: [6, 11, 12, 14],
    startDate: '2024-03-01',
    targetCompletionDate: '2025-12-31',
    totalAssetsCount: 195,
    verifiedAssetsCount: 191,
    coverImageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
    description: 'Intercepting urban plastic flows with bio-booms, recovering recyclable polymers, and restoring natural riparian reedbeds to filter wastewater.',
    targetMetric: {
      label: 'Metric Tons Plastic Intercepted',
      target: 800,
      current: 540,
      unit: 'tons'
    }
  }
];

export const INITIAL_EVIDENCE: EvidenceAsset[] = [
  // Pair 1: Sundarbans Baseline (Before)
  {
    id: 'ev-sundarbans-01-before',
    projectId: 'proj-sundarbans',
    projectName: 'Sundarbans Coastal Mangrove Restoration',
    title: 'Baseline Intertidal Mudflat & Coastal Erosion Zone',
    description: 'Initial site assessment of depleted mud bank following severe storm surge. Zero tree canopy cover with loose silt washouts.',
    originalFileName: 'DJI_20240315_084210_MUD_SECTOR4.JPG',
    sha256Hash: '9e8b417c8d9e2b10a24f0c9782163b784a9e229d10e54b6c319e7a810f2249a1',
    milestoneType: 'baseline',
    status: 'verified',
    telemetry: {
      capturedAt: '2024-03-15T08:42:10Z',
      uploadedAt: '2024-03-15T11:20:04Z',
      gps: {
        latitude: 21.9497,
        longitude: 88.8998,
        altitudeMeters: 4.2,
        locationName: 'Gosaba Delta Zone 4',
        region: 'South 24 Parganas',
        country: 'India'
      },
      device: {
        make: 'DJI Enterprise',
        model: 'Mavic 3 Multispectral',
        lens: 'Hasselblad 24mm f/2.8',
        iso: 100,
        focalLength: '24mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'sundarbans_baseline_mudflat_2024',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • BASELINE AUDIT 2024'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4000,
      height: 3000,
      resourceType: 'image',
      bytes: 4210980
    },
    aiAnalysis: {
      sdgGoals: [13, 15],
      confidenceScore: 0.97,
      domainCategory: 'Reforestation',
      detectedObjects: [
        { label: 'Exposed Tidal Silt Bed', count: 1, confidence: 0.98 },
        { label: 'Wave Erosion Scarp', count: 3, confidence: 0.91 }
      ],
      environmentalSignals: [
        'Extreme canopy deficit (0% live tree cover)',
        'Active tidal sediment displacement',
        'High vulnerability to storm surge wave action'
      ],
      tags: ['baseline', 'mudflat', 'erosion_risk', 'pre_intervention'],
      aiNarrative: 'Baseline visual survey confirms severe intertidal substrate erosion with total absence of mangrove prop root anchoring.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-sundarbans-01-after'
  },

  // Pair 1: Sundarbans Milestone (After)
  {
    id: 'ev-sundarbans-01-after',
    projectId: 'proj-sundarbans',
    projectName: 'Sundarbans Coastal Mangrove Restoration',
    title: 'Established Rhizophora Mangrove Buffer Canopy',
    description: '18-month progress check at Sector 4. Dense mangrove root stabilization with mature emergent foliage and zero mud bank loss.',
    originalFileName: 'DJI_20250918_091522_CANOPY_SECTOR4.JPG',
    sha256Hash: '4f2910c83a7b9e018d4e2a10b9874c901e823f66c9a018742e5b7190c41189d2',
    milestoneType: 'milestone_achieved',
    status: 'verified',
    telemetry: {
      capturedAt: '2025-09-18T09:15:22Z',
      uploadedAt: '2025-09-18T10:45:11Z',
      gps: {
        latitude: 21.9499,
        longitude: 88.8999,
        altitudeMeters: 4.5,
        locationName: 'Gosaba Delta Zone 4',
        region: 'South 24 Parganas',
        country: 'India'
      },
      device: {
        make: 'DJI Enterprise',
        model: 'Mavic 3 Multispectral',
        lens: 'Hasselblad 24mm f/2.8',
        iso: 100,
        focalLength: '24mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'sundarbans_milestone_canopy_2025',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • VERIFIED MILESTONE 2025'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4000,
      height: 3000,
      resourceType: 'image',
      bytes: 5129400
    },
    aiAnalysis: {
      sdgGoals: [13, 14, 15],
      confidenceScore: 0.98,
      domainCategory: 'Reforestation',
      detectedObjects: [
        { label: 'Mature Rhizophora Mangrove Trees', count: 64, confidence: 0.97 },
        { label: 'Dense Prop Root Net', count: 42, confidence: 0.94 },
        { label: 'Tidal Sediment Trap Layer', count: 1, confidence: 0.92 }
      ],
      environmentalSignals: [
        'Dense canopy cover measuring 74% surface density',
        'Stabilized tidal prop root matrix completely halting mudbank collapse',
        'Visible brackish biodiversity colonization'
      ],
      tags: ['milestone_achieved', 'canopy_success', 'coastal_shield', 'verified_carbon_sink'],
      aiNarrative: 'Post-intervention survey confirms high-density mangrove establishment. Chlorophyll NDVI index shows 0.72 vitality rating.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-sundarbans-01-before'
  },

  // Pair 2: Atacama Solar Baseline (Before)
  {
    id: 'ev-atacama-01-before',
    projectId: 'proj-atacama-solar',
    projectName: 'Atacama Desert Clean Energy Microgrid',
    title: 'Baseline Arid Ground Site Pre-Construction',
    description: 'Pre-construction plateau ground survey. Raw desert substrate prior to tracker foundations or transformer civil work.',
    originalFileName: 'SONY_A7_20240114_ATACAMA_GRID_01.ARW',
    sha256Hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
    milestoneType: 'baseline',
    status: 'verified',
    telemetry: {
      capturedAt: '2024-01-14T11:04:12Z',
      uploadedAt: '2024-01-14T15:20:00Z',
      gps: {
        latitude: -23.8634,
        longitude: -69.1328,
        altitudeMeters: 2420,
        locationName: 'Atacama Substation Grid Section B',
        region: 'Antofagasta',
        country: 'Chile'
      },
      device: {
        make: 'Sony',
        model: 'Alpha 7 IV',
        lens: 'FE 24-70mm F2.8 GM II',
        iso: 100,
        focalLength: '35mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'atacama_baseline_arid_2024',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • BASELINE DESERT SURVEY'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4200,
      height: 2800,
      resourceType: 'image',
      bytes: 6100200
    },
    aiAnalysis: {
      sdgGoals: [7, 13],
      confidenceScore: 0.99,
      domainCategory: 'Renewable Energy',
      detectedObjects: [
        { label: 'Arid Sand/Rock Substrate', count: 1, confidence: 0.99 },
        { label: 'Survey Boundary Stake', count: 4, confidence: 0.95 }
      ],
      environmentalSignals: [
        '0 MW energy generation footprint',
        'High direct normal solar irradiance (DNI > 3000 kWh/m2/yr)',
        'Zero environmental disruption to endangered desert scrub'
      ],
      tags: ['baseline', 'solar_site', 'arid_plateau', 'pre_build'],
      aiNarrative: 'High-altitude desert site pre-clearing. Ground topography is uniform and clear of sensitive flora or runoff streams.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-atacama-01-after'
  },

  // Pair 2: Atacama Solar Milestone (After)
  {
    id: 'ev-atacama-01-after',
    projectId: 'proj-atacama-solar',
    projectName: 'Atacama Desert Clean Energy Microgrid',
    title: 'Energized 19.4 MW Bifacial Solar Field Array',
    description: 'Fully operational single-axis tracking photovoltaic park feeding clean electricity into regional microgrid.',
    originalFileName: 'SONY_A7_20241122_ATACAMA_GRID_ENERGIZED.ARW',
    sha256Hash: 'b2c3d4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456',
    milestoneType: 'milestone_achieved',
    status: 'verified',
    telemetry: {
      capturedAt: '2024-11-22T13:40:55Z',
      uploadedAt: '2024-11-22T17:15:30Z',
      gps: {
        latitude: -23.8633,
        longitude: -69.1327,
        altitudeMeters: 2422,
        locationName: 'Atacama Substation Grid Section B',
        region: 'Antofagasta',
        country: 'Chile'
      },
      device: {
        make: 'Sony',
        model: 'Alpha 7 IV',
        lens: 'FE 24-70mm F2.8 GM II',
        iso: 100,
        focalLength: '35mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'atacama_milestone_pv_energized_2024',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • ENERGIZED PV AUDIT 2024'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4200,
      height: 2800,
      resourceType: 'image',
      bytes: 6840100
    },
    aiAnalysis: {
      sdgGoals: [7, 9, 13],
      confidenceScore: 0.99,
      domainCategory: 'Renewable Energy',
      detectedObjects: [
        { label: 'Bifacial Solar Trackers', count: 120, confidence: 0.98 },
        { label: 'Step-Up Inverter Enclosure', count: 4, confidence: 0.96 },
        { label: 'Weather Monitoring Station', count: 1, confidence: 0.92 }
      ],
      environmentalSignals: [
        '19.4 MW verified active peak production',
        'Zero carbon baseline displacing 22,000 tons CO2e annually',
        'Clean albedo reflection from desert floor enhancing underside generation'
      ],
      tags: ['milestone_achieved', 'solar_farm', 'clean_energy', 'grid_connected'],
      aiNarrative: 'Installed bifacial solar rows verified with tracking rotation functional. Inverter telemetry confirms active grid dispatch with zero thermal throttling.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-atacama-01-before'
  },

  // Pair 3: Bali Coral Nursery Baseline (Before)
  {
    id: 'ev-bali-01-before',
    projectId: 'proj-bali-coral',
    projectName: 'Bali Marine Coral Reef Nursery & Bio-Rock',
    title: 'Baseline Degraded Coral Rubble & Bleaching Field',
    description: 'Underwater assessment of blast-damaged and thermally bleached reef floor. Sparse living polyps with extensive coral gravel beds.',
    originalFileName: 'CANON_R5_UW_20230818_REEF_RUBBLE.CR3',
    sha256Hash: 'c3d4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef012345678',
    milestoneType: 'baseline',
    status: 'verified',
    telemetry: {
      capturedAt: '2023-08-18T10:12:44Z',
      uploadedAt: '2023-08-18T14:30:10Z',
      gps: {
        latitude: -8.1438,
        longitude: 115.0211,
        altitudeMeters: -12.4,
        locationName: 'Pemuteran Bio-Rock Zone A',
        region: 'Buleleng',
        country: 'Indonesia'
      },
      device: {
        make: 'Canon',
        model: 'EOS R5 in Nauticam Housing',
        lens: 'RF 15-35mm F2.8L IS USM',
        iso: 400,
        focalLength: '16mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'bali_baseline_rubble_2023',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • BASELINE REEF AUDIT'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4500,
      height: 3000,
      resourceType: 'image',
      bytes: 7200400
    },
    aiAnalysis: {
      sdgGoals: [14],
      confidenceScore: 0.95,
      domainCategory: 'Ocean & Marine',
      detectedObjects: [
        { label: 'Bleached Coral Rubble', count: 1, confidence: 0.97 },
        { label: 'Bare Substrate', count: 1, confidence: 0.93 }
      ],
      environmentalSignals: [
        'Live coral surface coverage < 6%',
        'High fragmentation from historical dynamite fishing and thermal waves',
        'Extremely low micro-fauna diversity'
      ],
      tags: ['baseline', 'coral_bleaching', 'marine_rubble', 'pre_restoration'],
      aiNarrative: 'Underwater photogrammetry confirms critically degraded reef zone with loose carbonate rubble unsuitable for natural larva recruitment.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-bali-01-after'
  },

  // Pair 3: Bali Coral Nursery Milestone (After)
  {
    id: 'ev-bali-01-after',
    projectId: 'proj-bali-coral',
    projectName: 'Bali Marine Coral Reef Nursery & Bio-Rock',
    title: 'Thriving Acropora Micro-Fragments on Bio-Rock Grid',
    description: '22-month follow-up survey. Accelerated calcification across energized steel domes with vibrant branching Acropora colonies and reef fish schools.',
    originalFileName: 'CANON_R5_UW_20250620_REEF_RESTORED.CR3',
    sha256Hash: 'd4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789',
    milestoneType: 'milestone_achieved',
    status: 'verified',
    telemetry: {
      capturedAt: '2025-06-20T11:45:10Z',
      uploadedAt: '2025-06-20T16:10:45Z',
      gps: {
        latitude: -8.1437,
        longitude: 115.0210,
        altitudeMeters: -11.8,
        locationName: 'Pemuteran Bio-Rock Zone A',
        region: 'Buleleng',
        country: 'Indonesia'
      },
      device: {
        make: 'Canon',
        model: 'EOS R5 in Nauticam Housing',
        lens: 'RF 15-35mm F2.8L IS USM',
        iso: 320,
        focalLength: '16mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'bali_milestone_coral_growth_2025',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • VERIFIED REEF REBOUND'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 4500,
      height: 3000,
      resourceType: 'image',
      bytes: 7890100
    },
    aiAnalysis: {
      sdgGoals: [14, 13],
      confidenceScore: 0.98,
      domainCategory: 'Ocean & Marine',
      detectedObjects: [
        { label: 'Branching Acropora Coral Colonies', count: 48, confidence: 0.98 },
        { label: 'Bio-Rock Mineral Layer', count: 1, confidence: 0.96 },
        { label: 'Reef Teleost Fish', count: 28, confidence: 0.91 }
      ],
      environmentalSignals: [
        'Live coral cover surged from 6% to 68%',
        'Thick white aragonite mineral layer coating metal frame',
        'Return of grazing herbivorous damselfish and wrasses'
      ],
      tags: ['milestone_achieved', 'coral_growth', 'marine_sanctuary', 'biorock_success'],
      aiNarrative: 'Bio-rock installation reveals exceptional coral growth rates exceeding 4x natural baseline. High symbiont density indicates excellent resilience against elevated ocean temperatures.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-bali-01-before'
  },

  // Pair 4: Nairobi River Plastic Cleanup Baseline (Before)
  {
    id: 'ev-nairobi-01-before',
    projectId: 'proj-nairobi-river',
    projectName: 'Nairobi River Basin Plastic & Riparian Remediation',
    title: 'Baseline Severe Solid Waste Choke at Ngong Confluence',
    description: 'Urban river bend completely occluded by floating single-use plastics, packaging debris, and industrial runoff.',
    originalFileName: 'IPHONE15PRO_20240305_NAIROBI_CHOKE.HEIC',
    sha256Hash: 'e5f6a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789a1b',
    milestoneType: 'baseline',
    status: 'verified',
    telemetry: {
      capturedAt: '2024-03-05T09:30:15Z',
      uploadedAt: '2024-03-05T12:00:22Z',
      gps: {
        latitude: -1.286389,
        longitude: 36.817223,
        altitudeMeters: 1680,
        locationName: 'Ngong Confluence Gate 2',
        region: 'Nairobi County',
        country: 'Kenya'
      },
      device: {
        make: 'Apple',
        model: 'iPhone 15 Pro Max',
        lens: '24mm f/1.78',
        iso: 80,
        focalLength: '24mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'nairobi_baseline_plastic_2024',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • BASELINE WASTE AUDIT'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 3800,
      height: 2500,
      resourceType: 'image',
      bytes: 4980100
    },
    aiAnalysis: {
      sdgGoals: [6, 12, 14],
      confidenceScore: 0.98,
      domainCategory: 'Waste & Clean Water',
      detectedObjects: [
        { label: 'Floating PET Bottles & Packaging', count: 240, confidence: 0.98 },
        { label: 'Stagnant Silt Trap', count: 1, confidence: 0.95 }
      ],
      environmentalSignals: [
        'Estimated 12 tons surface plastic choking active channel',
        'Anaerobic water conditions with severe dissolved oxygen deficit',
        'High microplastic breakdown risk downstream into Athi River basin'
      ],
      tags: ['baseline', 'plastic_crisis', 'river_pollution', 'waste_choke'],
      aiNarrative: 'Baseline imagery identifies critical hydrological blockage by single-use polymers. Immediate mechanical boom containment required.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-nairobi-01-after'
  },

  // Pair 4: Nairobi River Plastic Cleanup Milestone (After)
  {
    id: 'ev-nairobi-01-after',
    projectId: 'proj-nairobi-river',
    projectName: 'Nairobi River Basin Plastic & Riparian Remediation',
    title: 'Cleared River Channel with Native Reedbed Bio-Filter',
    description: 'Post-cleanup milestone. 540 metric tons of plastic removed, bio-boom active, and replanted vetiver grass stabilizing riverbanks.',
    originalFileName: 'IPHONE15PRO_20241214_NAIROBI_CLEARED.HEIC',
    sha256Hash: 'f6a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789a1b2c',
    milestoneType: 'milestone_achieved',
    status: 'verified',
    telemetry: {
      capturedAt: '2024-12-14T10:15:30Z',
      uploadedAt: '2024-12-14T14:40:00Z',
      gps: {
        latitude: -1.286380,
        longitude: 36.817215,
        altitudeMeters: 1681,
        locationName: 'Ngong Confluence Gate 2',
        region: 'Nairobi County',
        country: 'Kenya'
      },
      device: {
        make: 'Apple',
        model: 'iPhone 15 Pro Max',
        lens: '24mm f/1.78',
        iso: 80,
        focalLength: '24mm'
      },
      isExifVerified: true
    },
    cloudinary: {
      publicId: 'nairobi_milestone_river_restored_2024',
      cloudName: 'veriterra-demo',
      secureUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: getGalleryThumbnail('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'),
      watermarkedUrl: getWatermarkedProof('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'VERITERRA • RESTORED WATERWAY AUDIT'),
      smartCroppedUrl: getHeroBanner('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'),
      format: 'jpg',
      width: 3800,
      height: 2500,
      resourceType: 'image',
      bytes: 5210900
    },
    aiAnalysis: {
      sdgGoals: [6, 11, 14],
      confidenceScore: 0.97,
      domainCategory: 'Waste & Clean Water',
      detectedObjects: [
        { label: 'Free Flowing River Channel', count: 1, confidence: 0.98 },
        { label: 'Replanted Vetiver Reed Grass', count: 12, confidence: 0.95 },
        { label: 'Downstream Interception Boom', count: 1, confidence: 0.96 }
      ],
      environmentalSignals: [
        '92% reduction in visible floating plastics along survey transect',
        'Visible aquatic surface ripple indicating unhindered hydrological flow',
        'Riparian edge re-vegetation preventing erosion runoff'
      ],
      tags: ['milestone_achieved', 'clean_water', 'plastic_removed', 'wetland_restoration'],
      aiNarrative: 'Post-intervention visual audit demonstrates dramatic remediation. Surface debris load decreased by 92% with active biological reedbed filtration online.',
      authenticityScore: 100,
      apparentTampering: false
    },
    matchedPairId: 'ev-nairobi-01-before'
  }
];

export const INITIAL_COMPARISONS: ComparisonPair[] = [
  {
    id: 'comp-sundarbans-01',
    projectId: 'proj-sundarbans',
    projectName: 'Sundarbans Coastal Mangrove Restoration',
    title: '18-Month Mangrove Canopy Expansion & Silt Stabilization',
    baselineAsset: INITIAL_EVIDENCE[0],
    milestoneAsset: INITIAL_EVIDENCE[1],
    timeDeltaDays: 552,
    distanceDeltaMeters: 2.4,
    quantifiedImpact: {
      metricName: 'Canopy Density Index',
      baselineValue: 2,
      milestoneValue: 74,
      deltaPercentage: 3600,
      unit: '% vegetative cover',
      verificationMethod: 'Multispectral AI Segmentation'
    },
    summaryStory: 'Over 552 days, this intertidal mud flat transitioned from bare, vulnerable silt into a dense, multi-tiered Rhizophora mangrove barrier, sequestering an estimated 142 tons of blue carbon per hectare.',
    interventions: [
      'Bamboo-framed seedling stabilization grids installed in May 2024',
      'Community nursery sapling planting at 1.5m spacing',
      'Local women-led forestry monitoring squads'
    ]
  },
  {
    id: 'comp-atacama-01',
    projectId: 'proj-atacama-solar',
    projectName: 'Atacama Desert Clean Energy Microgrid',
    title: 'Civil Groundwork to 19.4 MW Energized Bifacial Array',
    baselineAsset: INITIAL_EVIDENCE[2],
    milestoneAsset: INITIAL_EVIDENCE[3],
    timeDeltaDays: 313,
    distanceDeltaMeters: 1.1,
    quantifiedImpact: {
      metricName: 'Operational Clean Generation',
      baselineValue: 0,
      milestoneValue: 19.4,
      deltaPercentage: 1940,
      unit: 'MW peak capacity',
      verificationMethod: 'Asset EXIF & Grid Inverter Audit'
    },
    summaryStory: 'Across 313 days of development, raw desert land was transformed into an energized 19.4 MW bifacial solar farm, offsetting 22,000 tons of diesel emissions per year for indigenous towns.',
    interventions: [
      'Eco-sensitive steel pile anchoring without concrete foundation pours',
      'Single-axis tracking mechanism optimized for high desert DNI',
      'Dry-brush robotic panel cleaning saving 40,000L of water weekly'
    ]
  },
  {
    id: 'comp-bali-01',
    projectId: 'proj-bali-coral',
    projectName: 'Bali Marine Coral Reef Nursery & Bio-Rock',
    title: 'Damaged Coral Rubble to Living Bio-Rock Reef Dome',
    baselineAsset: INITIAL_EVIDENCE[4],
    milestoneAsset: INITIAL_EVIDENCE[5],
    timeDeltaDays: 672,
    distanceDeltaMeters: 1.8,
    quantifiedImpact: {
      metricName: 'Live Coral Surface Coverage',
      baselineValue: 6,
      milestoneValue: 68,
      deltaPercentage: 1033,
      unit: '% substrate cover',
      verificationMethod: 'Underwater 3D Photogrammetry'
    },
    summaryStory: 'In 672 days, low-voltage electrolytic mineral accretion stimulated coral calcification at 4x normal speed, rebuilding vital habitat for 38 species of reef fish.',
    interventions: [
      'Solar-powered onshore low-voltage trickle current feed',
      'Attachment of 1,200 rescued storm-broken Acropora fragments',
      'Local dive guild weekly algae clearing and predator monitoring'
    ]
  },
  {
    id: 'comp-nairobi-01',
    projectId: 'proj-nairobi-river',
    projectName: 'Nairobi River Basin Plastic & Riparian Remediation',
    title: 'Solid Waste Debris Choke to Flowing Riparian Corridor',
    baselineAsset: INITIAL_EVIDENCE[6],
    milestoneAsset: INITIAL_EVIDENCE[7],
    timeDeltaDays: 284,
    distanceDeltaMeters: 1.5,
    quantifiedImpact: {
      metricName: 'Surface Waste Clearance',
      baselineValue: 12,
      milestoneValue: 0.9,
      deltaPercentage: 92.5,
      unit: 'tons debris / 100m channel',
      verificationMethod: 'Drone Orthomosaic Waste Index'
    },
    summaryStory: 'Over 284 days, the Ngong confluence was cleared of 540 metric tons of choked plastic, restoring natural hydrological flow and enabling riparian vetiver reeds to filter municipal runoff.',
    interventions: [
      'Double-walled floating bio-booms deployed at key storm drainage inflows',
      'Community waste cooperatives sorting HDPE/PET for circular recycling',
      'Riparian re-vegetation with deep-rooting vetiver grass'
    ]
  }
];

export const INITIAL_AUDIT_REPORT: ESGAuditReport = {
  id: 'rep-sundarbans-2025-q3',
  projectId: 'proj-sundarbans',
  generatedAt: '2025-09-28T16:00:00Z',
  title: 'Independent ESG Verification & Visual Impact Audit: Sundarbans Phase II',
  executiveSummary: 'This comprehensive visual intelligence audit certifies the successful reforestation of 1,840 hectares of tidal mangrove canopy across Sector 4 of the Sundarbans Delta. Utilizing Cloudinary-backed cryptographic media hashing, verified camera EXIF telemetry, and multimodal AI segmentation, we confirm a +3,600% increase in vegetative canopy density compared to the March 2024 baseline.',
  verifiedAssetsCount: 412,
  quantifiedDeltaSummary: '+3,600% Canopy Density Rebound across 552 days with 0% detected tampering',
  sdgContributions: [
    {
      sdg: 13,
      title: 'Climate Action',
      verifiedMetric: 'Estimated 261,280 tCO2e blue carbon sequestered over project lifecycle'
    },
    {
      sdg: 14,
      title: 'Life Below Water',
      verifiedMetric: 'Stabilized intertidal fish spawning nurseries verified across 18 creek channels'
    },
    {
      sdg: 15,
      title: 'Life on Land',
      verifiedMetric: '1,840 hectares of contiguous mangrove forest restored as cyclone wave buffer'
    }
  ],
  auditTrail: [
    {
      assetId: 'ev-sundarbans-01-before',
      sha256Hash: '9e8b417c8d9e2b10a24f0c9782163b784a9e229d10e54b6c319e7a810f2249a1',
      timestamp: '2024-03-15T08:42:10Z',
      gpsCoordinates: '21.9497° N, 88.8998° E',
      verifier: 'VeriTerra Cryptographic Node 01 (Cloudinary Secure Ingest)'
    },
    {
      assetId: 'ev-sundarbans-01-after',
      sha256Hash: '4f2910c83a7b9e018d4e2a10b9874c901e823f66c9a018742e5b7190c41189d2',
      timestamp: '2025-09-18T09:15:22Z',
      gpsCoordinates: '21.9499° N, 88.8999° E',
      verifier: 'VeriTerra Cryptographic Node 01 (Cloudinary Secure Ingest)'
    }
  ],
  campaignHeadline: 'From Barren Silt to Living Shield: Sundarbans Mangroves Surge 3,600%',
  socialSnippet: 'Proof you can see: 18 months of community planting transformed bare mud banks into a thriving mangrove coastal shield. Verified by @VeriTerraAI and powered by @Cloudinary media intelligence. #ClimateAction #SDG15'
};
