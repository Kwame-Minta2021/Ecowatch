export interface SensorReading {
  timestamp: string
  vibrationCount: number
  intensity: number
  temperature?: number
  humidity?: number
  batteryLevel?: number
  aiRiskScore?: number
  aiPrediction?: "LOW_RISK" | "MEDIUM_RISK" | "HIGH_RISK"
  eventDurationSeconds?: number
  frequencyHz?: number
}

export interface SensorStreamPayload {
  node_id: string
  location: string
  alert_type: "MINING_ALERT" | "SYSTEM_ALERT" | "MAINTENANCE"
  intensity: number
  vibration_count: number
  ai_risk_score: number
  ai_prediction: "LOW_RISK" | "MEDIUM_RISK" | "HIGH_RISK"
  timestamp: string
}


