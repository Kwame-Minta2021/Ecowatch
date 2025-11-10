export interface RiskTrendPoint {
  timestamp: string
  averageRisk: number
  highRiskNodes: number
  mediumRiskNodes: number
  lowRiskNodes: number
}

export interface PredictionOutput {
  nodeId: string
  riskScore: number
  confidence: number
  anomaliesDetected: boolean
  anomalyProbability: number
  predictedSeverity: "LOW" | "MEDIUM" | "HIGH"
  contributingFactors: Array<{ metric: string; weight: number }>
}


