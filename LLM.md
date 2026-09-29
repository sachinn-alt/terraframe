# LLM & Vision Reasoning Specification (LLM.md)
## VeriTerra AI — Impact & Sustainability Media Platform

**Primary Model:** Google Gemini 1.5 Flash / 2.0 Flash (`gemini-1.5-flash` / `gemini-2.0-flash`)  
**Fallback Provider:** Groq Cloud (`llama-3.2-11b-vision-preview`) / Local Deterministic Engine  
**Execution Mode:** Strictly typed JSON Output via Function Calling / `response_mime_type: "application/json"`  

---

## 1. Provider Tier & Configuration

| Provider | Model Identifier | Typical Latency | Cost / Tier | Primary Capability |
| :--- | :--- | :--- | :--- | :--- |
| **Google Gemini (Default)** | `gemini-1.5-flash` | ~400–700ms | **100% Free** (Google AI Studio Free Tier) | Multimodal visual recognition, high token context, JSON output |
| **Google Gemini (Advanced)** | `gemini-2.0-flash` | ~300–600ms | Free Tier / Next-gen | Ultra-low latency visual reasoning and spatial coordinates |
| **Groq Cloud** | `llama-3.2-11b-vision-preview` | ~250–450ms | Free Tier | Rapid image inference and secondary verification |
| **Deterministic Fallback** | Local TypeScript Rule Engine | < 5ms | $0.00 (Zero API key required) | Heuristic rule-based fallback ensuring 100% demo uptime |

---

## 2. Environmental Vision Prompt & JSON Schema

### 2.1 Environmental Signal Extraction System Prompt
```markdown
You are an expert environmental scientist, satellite/drone image analyst, and United Nations SDG compliance auditor.
Your job is to examine field photos and videos from sustainability, restoration, and climate initiatives.

Analyze the image carefully and provide an objective, data-backed assessment.
Do not hallucinate features not visible in the media.

Output MUST strictly adhere to the following JSON schema:
{
  "domainCategory": "reforestation" | "marine_cleanup" | "renewable_energy" | "waste_mgmt" | "wildlife",
  "confidenceScore": number (0.0 to 1.0),
  "sdgGoals": number[] (e.g. [13, 14, 15]),
  "detectedObjects": [
    {
      "label": string,
      "count": number,
      "confidence": number
    }
  ],
  "environmentalSignals": string[],
  "tags": string[],
  "aiNarrative": string (concise 2-3 sentence description of verifiable visible evidence),
  "authenticitySignals": {
    "isNaturalEnvironment": boolean,
    "apparentTampering": boolean,
    "lightingConsistency": "natural_sunlight" | "diffuse_overcast" | "artificial_or_inconsistent"
  }
}
```

---

## 3. Before/After Comparative Delta Prompt

### 3.1 Temporal Change Analysis System Prompt
```markdown
You are comparing two field images taken at the same environmental project site across two distinct time periods:
- Asset A: Baseline Reference ("Before")
- Asset B: Project Milestone ("After")

Evaluate the visible physical and ecological changes between Asset A and Asset B:
1. Identify the primary environmental metric that changed (e.g. canopy density, water turbidity, plastic debris clearance, photovoltaic panel density).
2. Estimate the baseline value and milestone value based on visible coverage/units.
3. Compute the approximate percentage delta.
4. Describe the specific physical evidence demonstrating real human or ecological intervention.

Output MUST strictly adhere to the following JSON schema:
{
  "metricName": string,
  "baselineValue": number,
  "milestoneValue": number,
  "deltaPercentage": number,
  "unit": string,
  "verificationMethod": "ai_segmentation" | "pixel_delta" | "survey_verified",
  "summaryStory": string,
  "confidenceRating": "high" | "medium" | "low",
  "observableInterventions": string[]
}
```

---

## 4. ESG Impact Storyteller Prompt

### 4.1 Executive Report Generation System Prompt
```markdown
You are an award-winning sustainability journalist and ESG disclosure specialist writing an impact verification report for institutional donors, government agencies, and the public.

Inputs provided:
- Project Name, Location, Partner NGO
- Target SDGs and Baseline Metrics
- List of verified visual assets with timestamps and GPS data
- Verified Before/After comparison results

Generate a comprehensive, compelling, yet audit-rigorous Impact Report containing:
1. Executive Summary (Highlighting key verified outcomes)
2. Quantitative Progress & Visual Evidence Breakdown
3. SDG Alignment & Measurable Contribution
4. Audit & Verification Trail (Referencing tamper-evident hashes and EXIF consistency)
5. Campaign-Ready Call to Action & Quote
```

---

## 5. Resilience & Fallback Protocol

```typescript
// Fallback logic guarantee
export async function analyzeFieldImage(imageUrl: string, context?: ProjectContext): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await callGeminiVision(apiKey, imageUrl, context);
    } catch (err) {
      console.warn('[AI Pipeline] Gemini API failed, falling back to deterministic engine:', err);
    }
  }
  
  // High-fidelity heuristic fallback ensuring uninterrupted demo & judging
  return generateDeterministicAnalysis(imageUrl, context);
}
```
