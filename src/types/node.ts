import type { SensorReading } from "./sensor"

export type NodeStatus = "online" | "offline" | "alert"
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH"

export interface NodeLocation {
  name: string
  lat: number
  lng: number
  address?: string
  placeId?: string
}

export interface Node {
  id: string
  name: string
  location: {
    name: string
    lat: number
    lng: number
    address?: string
  }
  status: NodeStatus
  lastUpdate: string
  riskLevel: RiskLevel
  sensorData: SensorReading[]
  batteryLevel?: number
  connectivity?: "good" | "weak" | "critical"
  isSimulated?: boolean
}


