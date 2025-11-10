"use client"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import type { Node } from "@/types"

interface Props {
  nodes: Node[]
  center: [number, number]
}

function marker(color: string) {
  return L.divIcon({
    className: "ecw-marker",
    html: `<span style="background-color:${color};border-radius:999px;width:16px;height:16px;display:block;border:2px solid white;box-shadow:0 0 0 2px rgba(0,0,0,0.3)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 16],
  })
}

function riskColor(risk: Node["riskLevel"]) {
  switch (risk) {
    case "HIGH":
      return "#ef4444"
    case "MEDIUM":
      return "#f59e0b"
    default:
      return "#10b981"
  }
}

export default function NodesMapClient({ nodes, center }: Props) {
  return (
    <div className="h-[56vh] w-full min-w-0 overflow-hidden rounded-xl border border-border sm:h-96">
      <MapContainer center={center} zoom={6} className="h-full w-full touch-pan-y" preferCanvas>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        {nodes.map((node) => {
          const latest = node.sensorData.at(-1)
          const color = riskColor(node.riskLevel)
          return (
            <Marker key={node.id} position={[node.location.lat, node.location.lng]} icon={marker(color)}>
              <Popup className="!p-0">
                <div className="space-y-1 p-1 text-[12px] sm:p-2 sm:text-sm">
                  <p className="font-semibold">{node.name}</p>
                  <p className="text-xs text-muted-foreground">{node.location.name}</p>
                  {latest && (
                    <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
                      <span>Risk: {latest.aiRiskScore ?? "N/A"}</span>
                      <span>Intensity: {latest.intensity ?? "N/A"}</span>
                    </div>
                  )}
                </div>
              </Popup>
              <Circle center={[node.location.lat, node.location.lng]} radius={500} pathOptions={{ color, weight: 1, fillOpacity: 0.15 }} />
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}


