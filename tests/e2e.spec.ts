import { test, expect } from '@playwright/test';

test.describe('Terraframe AI — Wise Design & Cloudinary Platform Tests', () => {

  test('1. Loads homepage and verifies Wise Design System tokens & typography', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Verify Title & Meta
    await expect(page).toHaveTitle(/Terraframe AI/);

    // Verify Persistent Header & Wise Brandmark
    const brand = page.locator('header').getByRole('button', { name: /Terraframe/i });
    await expect(brand).toBeVisible();

    // Verify Wise Sans Display Headline (weight 900, block capital announcement)
    const displayHeadline = page.locator('h1.wise-display').first();
    await expect(displayHeadline).toBeVisible();
    await expect(displayHeadline).toHaveText(/TURNING FIELD MEDIA INTO VERIFIABLE PROOF\./);

    // Verify 3-Column Wise Trust Feature Row
    await expect(page.getByText('SHA-256 Non-Repudiation')).toBeVisible();
    await expect(page.getByText('Spatial-Temporal Alignment')).toBeVisible();
    await expect(page.getByText('Cloudinary Dynamic Proof')).toBeVisible();

    // Verify KPI Stat Cards (Fog #e8ebe6 surface)
    await expect(page.getByText('Verified Media')).toBeVisible();
    await expect(page.getByText('Temporal Pairs')).toBeVisible();
    await expect(page.getByText('Global Projects')).toBeVisible();
  });

  test('2. Verifies 5-Column Wise Country Directory Grid and filtering', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check presence of 5 country nodes
    await expect(page.getByText('India', { exact: true })).toBeVisible();
    await expect(page.getByText('Chile', { exact: true })).toBeVisible();
    await expect(page.getByText('Indonesia', { exact: true })).toBeVisible();
    await expect(page.getByText('Kenya', { exact: true })).toBeVisible();
    await expect(page.getByText('Costa Rica', { exact: true })).toBeVisible();

    // Click India and verify gallery updates
    await page.getByText('India', { exact: true }).click();
    await expect(page.getByText('Verified Field Media — India')).toBeVisible();

    // Click Show All Countries to reset
    const showAllBtn = page.getByRole('button', { name: /Show All Countries/i });
    await expect(showAllBtn).toBeVisible();
    await showAllBtn.click();
    await expect(page.getByText('Recent Verified Field Media')).toBeVisible();
  });

  test('3. Verifies Multi-View Before & After Comparison Studio', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Navigate to Before / After Tab
    await page.locator('header').getByRole('button', { name: 'Before / After' }).click();
    await expect(page.getByRole('heading', { name: /Temporal Before & After Verification Studio/i })).toBeVisible();

    // Check Multi-View Switcher Tabs
    const splitSliderBtn = page.getByRole('button', { name: /Split Slider/i }).first();
    const sideBySideBtn = page.getByRole('button', { name: /Side-by-Side/i }).first();
    const dissolveBtn = page.getByRole('button', { name: /Opacity Dissolve/i }).first();
    const heatmapBtn = page.getByRole('button', { name: /Change Heatmap/i }).first();

    await expect(splitSliderBtn).toBeVisible();
    await expect(sideBySideBtn).toBeVisible();
    await expect(dissolveBtn).toBeVisible();
    await expect(heatmapBtn).toBeVisible();

    // Switch to Side-by-Side View
    await sideBySideBtn.click();
    await expect(page.getByText('Before (Baseline)').first()).toBeVisible();
    await expect(page.getByText('After (Milestone Achieved)').first()).toBeVisible();

    // Switch to Opacity Dissolve Fader View
    await dissolveBtn.click();
    await expect(page.getByText(/Morph Blend:/i)).toBeVisible();

    // Switch to Delta Heatmap View
    await heatmapBtn.click();
    await expect(page.getByText(/Cloudinary Delta Heatmap/i)).toBeVisible();

    // Check Milestone Summary Table
    await expect(page.getByText('Project Milestone & Quantified Change Summary')).toBeVisible();
  });

  test('4. Verifies Asset Detail Modal, Cloudinary Playground & Anti-Fraud Tamper Test', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Open first evidence card Inspect modal
    const inspectBtn = page.locator('button').filter({ hasText: 'Inspect' }).first();
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();

    // Verify Modal Header & Public ID
    await expect(page.getByText('Verified Field Asset')).toBeVisible();
    await expect(page.getByText('Cloudinary Transformation Studio:')).toBeVisible();

    // Test Recipe Playground Tab
    const playgroundTab = page.getByRole('button', { name: 'Recipe Playground' });
    await expect(playgroundTab).toBeVisible();
    await playgroundTab.click();
    await expect(page.getByText('Live Cloudinary Parameter Tuner')).toBeVisible();
    await expect(page.getByText('Generated Dynamic URL:')).toBeVisible();

    // Test Anti-Fraud Tamper Resilience Test
    const provenanceTab = page.getByRole('button', { name: 'Provenance & Tamper' });
    await provenanceTab.click();
    await expect(page.getByText('SHA-256 Fingerprint:')).toBeVisible();

    const tamperBtn = page.getByRole('button', { name: /Simulate Metadata Tamper/i });
    await expect(tamperBtn).toBeVisible();
    await tamperBtn.click();

    // Verify loud fraud alert triggers immediately
    await expect(page.getByText(/🚨 FRAUD ALERT — Verification Mismatch/i)).toBeVisible();

    // Reset back to verified
    await page.getByRole('button', { name: /Reset to Verified/i }).click();
    await expect(page.getByText(/Cryptographic verification active/i)).toBeVisible();

    // Close modal
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
  });

  test('5. Verifies ESG Audit Report Modal & Institutional Certificate Export', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Click "Audit Deck" in header
    const auditDeckBtn = page.locator('header').getByRole('button', { name: /Audit Deck/i });
    await expect(auditDeckBtn).toBeVisible();
    await auditDeckBtn.click();

    // Verify Report Modal is open
    await expect(page.getByText('ESG Audit & Impact Story Report')).toBeVisible();
    await expect(page.getByText('Institutional Compliance Certification')).toBeVisible();
    await expect(page.getByText('United Nations Sustainable Development Goals (SDG) Audit:')).toBeVisible();
    await expect(page.getByText('Cryptographic Traceability Ledger (SHA-256)')).toBeVisible();
    await expect(page.getByText('Cryptographic Non-Repudiation Guarantee')).toBeVisible();

    // Close modal
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
  });

  test('6. Verifies Floating QR Badge & Mobile Field Scanner Modal', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Click floating QR badge
    const qrBadge = page.locator('aside[aria-label="Field app download badge"]');
    await expect(qrBadge).toBeVisible();
    await qrBadge.click();

    // Verify Mobile Scanner Viewfinder Modal opens
    await expect(page.getByText('Mobile Field Proof Scanner')).toBeVisible();
    await expect(page.getByText('Terraframe Field Verification Node')).toBeVisible();
    await expect(page.getByText('EXIF & Cloudinary Verified')).toBeVisible();
    await expect(page.getByText('100% MATCH')).toBeVisible();

    // Click "Scan Next Field Asset"
    const nextScanBtn = page.getByRole('button', { name: /Scan Next Field Asset/i });
    await expect(nextScanBtn).toBeVisible();
    await nextScanBtn.click();

    // Close modal
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
  });

  test('7. Verifies Ingest Modal with multiple upload pipelines', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Click "+ Ingest Media" button in header
    const ingestBtn = page.locator('header').getByRole('button', { name: /\+ Ingest Media/i });
    await expect(ingestBtn).toBeVisible();
    await ingestBtn.click();

    // Verify Modal options
    await expect(page.getByText('Ingest Field Media Evidence')).toBeVisible();
    await expect(page.getByText('1. Field Presets')).toBeVisible();

    // Close modal
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first().click();
  });

});
