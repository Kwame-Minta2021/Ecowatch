"use client"
import type { Node, PredictionOutput } from "@/types"

// Simple heuristic + placeholder TFJS hook-in point.
// In production, replace with a real TFJS LSTM model and learned weights.

export interface AiConfig {
  highThreshold: number
  mediumThreshold: number
}

const DEFAULT_CONFIG: AiConfig = {
  highThreshold: 75,
  mediumThreshold: 50,
}

export function predictRisk(node: Node, config: AiConfig = DEFAULT_CONFIG): PredictionOutput | null {
  const latest = node.sensorData.at(-1)
  if (!latest) return null
  const score = Number(latest.aiRiskScore ?? (latest.intensity ?? 0) * 10)
  const confidence = Math.min(100, Math.max(0, Math.round(score)))
  const predictedSeverity = score >= config.highThreshold ? "HIGH" : score >= config.mediumThreshold ? "MEDIUM" : "LOW"
  return {
    nodeId: node.id,
    riskScore: Math.round(score),
    confidence,
    anomaliesDetected: predictedSeverity === "HIGH",
    anomalyProbability: predictedSeverity === "HIGH" ? confidence : Math.round(confidence / 2),
    predictedSeverity,
    contributingFactors: [
      { metric: "intensity", weight: Number((latest.intensity ?? 0) / 10).toFixed ? Number(((latest.intensity ?? 0) / 10).toFixed(2)) : (latest.intensity ?? 0) / 10 },
      { metric: "vibrationCount", weight: Math.min(1, (latest.vibrationCount ?? 0) / 100) },
    ],
  }
}


