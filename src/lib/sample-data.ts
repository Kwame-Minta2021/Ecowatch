import type { Alert, Node, PredictionOutput, RiskTrendPoint } from "@/types"

export const sampleNodes: Node[] = [
  {
    id: "NODE_001",
    name: "Mining Area A",
    location: { name: "Plateau Ridge", lat: 9.885, lng: 8.9 },
    status: "online",
    lastUpdate: new Date().toISOString(),
    riskLevel: "HIGH",
    sensorData: [
      { timestamp: new Date().toISOString(), intensity: 8.2, vibrationCount: 24, aiRiskScore: 88, aiPrediction: "HIGH_RISK" },
    ],
  },
  {
    id: "NODE_002",
    name: "Mining Area B",
    location: { name: "Kaduna North", lat: 10.512, lng: 7.436 },
    status: "online",
    lastUpdate: new Date().toISOString(),
    riskLevel: "MEDIUM",
    sensorData: [
      { timestamp: new Date().toISOString(), intensity: 5.1, vibrationCount: 12, aiRiskScore: 56, aiPrediction: "MEDIUM_RISK" },
    ],
  },
  {
    id: "NODE_003",
    name: "Riverine Site C",
    location: { name: "Bayelsa Creek", lat: 4.924, lng: 6.264 },
    status: "offline",
    lastUpdate: new Date().toISOString(),
    riskLevel: "LOW",
    sensorData: [
      { timestamp: new Date().toISOString(), intensity: 2.1, vibrationCount: 3, aiRiskScore: 12, aiPrediction: "LOW_RISK" },
    ],
  },
]

export const sampleAlerts: Alert[] = [
  {
    id: "ALERT_001",
    nodeId: "NODE_001",
    type: "MINING_ALERT",
    severity: "HIGH",
    message: "Sustained high-intensity vibrations detected.",
    timestamp: new Date().toISOString(),
    location: { name: "Plateau Ridge", lat: 9.885, lng: 8.9 },
    riskScore: 88,
    vibrationCount: 24,
    intensity: 8.2,
  },
]

export const sampleRiskTrends: RiskTrendPoint[] = Array.from({ length: 24 }).map((_, i) => {
  const d = new Date()
  d.setHours(d.getHours() - (23 - i))
  return {
    timestamp: d.toISOString(),
    averageRisk: Math.random() * 100,
    highRiskNodes: Math.floor(Math.random() * 6),
    mediumRiskNodes: Math.floor(Math.random() * 12),
    lowRiskNodes: Math.floor(Math.random() * 20),
  }
})

export const samplePredictions: PredictionOutput[] = [
  {
    nodeId: "NODE_001",
    riskScore: 88,
    confidence: 92,
    anomaliesDetected: true,
    anomalyProbability: 85,
    predictedSeverity: "HIGH",
    contributingFactors: [
      { metric: "intensity", weight: 0.6 },
      { metric: "vibrationCount", weight: 0.3 },
      { metric: "duration", weight: 0.1 },
    ],
  },
]


