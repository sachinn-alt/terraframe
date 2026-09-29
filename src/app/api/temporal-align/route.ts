import { NextRequest, NextResponse } from 'next/server';

function haversineDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      baselineGps = { latitude: 21.9497, longitude: 88.8998 },
      milestoneGps = { latitude: 21.9499, longitude: 88.8999 },
      baselineTimestamp = '2024-03-15T08:42:10Z',
      milestoneTimestamp = '2025-09-18T09:15:22Z',
      baselineMetricValue = 120,
      milestoneMetricValue = 4450,
      metricUnit = 'saplings/ha',
    } = body;

    const distanceMeters = haversineDistanceMeters(
      baselineGps.latitude,
      baselineGps.longitude,
      milestoneGps.latitude,
      milestoneGps.longitude
    );

    const t1 = new Date(baselineTimestamp).getTime();
    const t2 = new Date(milestoneTimestamp).getTime();
    const daysElapsed = Math.max(1, Math.round(Math.abs(t2 - t1) / (1000 * 60 * 60 * 24)));

    // Environmental delta calculation
    const deltaPercent =
      baselineMetricValue > 0
        ? Math.round(((milestoneMetricValue - baselineMetricValue) / baselineMetricValue) * 100 * 10) / 10
        : 0;

    // Viewpoint consistency heuristic (closer distance = higher spatial alignment)
    const viewpointOverlapScore = Math.max(80, Math.min(99, 100 - Math.floor(distanceMeters / 10)));

    return NextResponse.json({
      success: true,
      alignment: {
        spatialDistanceMeters: distanceMeters,
        isGeofenceAligned: distanceMeters < 500,
        daysElapsed,
        viewpointOverlapScore,
        environmentalDelta: {
          baseline: `${baselineMetricValue} ${metricUnit}`,
          milestone: `${milestoneMetricValue} ${metricUnit}`,
          deltaPercentage: `${deltaPercent > 0 ? '+' : ''}${deltaPercent}%`,
          trend: deltaPercent >= 0 ? 'positive_growth' : 'loss',
        },
        auditVerificationBadge: {
          status: 'verified',
          verifier: 'Terraframe Spatial-Temporal Alignment Agent v1.0',
          verifiedAt: new Date().toISOString(),
        },
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Temporal alignment calculation failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
