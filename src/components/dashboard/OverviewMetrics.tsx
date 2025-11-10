"use client"
import { Activity, AlertTriangle, Wifi, Zap } from "lucide-react"
import { useMemo } from "react"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"

const cards = [
  { id: "online", label: "Online Nodes", icon: Wifi, color: "border-emerald-500/30 bg-emerald-500/10" },
  { id: "alerts", label: "Active Alerts", icon: AlertTriangle, color: "border-amber-500/30 bg-amber-500/10" },
  { id: "offline", label: "Offline Nodes", icon: Activity, color: "border-slate-500/30 bg-slate-500/10" },
  { id: "risk", label: "Average Risk", icon: Zap, color: "border-primary/30 bg-primary/10" },
]

export function OverviewMetrics() {
  const nodesMap = useEcoWatchStore((s) => s.nodes)
  const alertsMap = useEcoWatchStore((s) => s.alerts)
  const nodes = useMemo(() => Object.values(nodesMap), [nodesMap])
  const alerts = useMemo(() => Object.values(alertsMap), [alertsMap])

  const online = nodes.filter((n) => n.status === "online").length
  const offline = nodes.filter((n) => n.status === "offline").length
  const highRiskAvg =
    nodes.reduce((acc, n) => acc + (n.sensorData.at(-1)?.aiRiskScore ?? 0), 0) / (nodes.length || 1)

  const values: Record<string, string> = {
    online: String(online),
    alerts: String(alerts.length),
    offline: String(offline),
    risk: `${Math.round(highRiskAvg)}%`,
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div key={c.id} className={`rounded-xl border p-4 ${c.color}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-2 text-2xl font-semibold">{values[c.id]}</p>
          </div>
        )
      })}
    </section>
  )
}


