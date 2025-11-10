export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH"

export interface Alert {
  id: string
  nodeId: string
  type: "MINING_ALERT" | "SYSTEM_ALERT" | "MAINTENANCE"
  severity: AlertSeverity
  message: string
  timestamp: string
  location: {
    name: string
    lat: number
    lng: number
  }
  riskScore: number
  vibrationCount: number
  intensity: number
  acknowledged?: boolean
  escalated?: boolean
}


