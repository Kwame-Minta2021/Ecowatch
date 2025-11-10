"use client"
import dynamic from "next/dynamic"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"
import { useMemo } from "react"

const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then((m) => m.AreaChart), { ssr: false })
const Area = dynamic(() => import("recharts").then((m) => m.Area), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false })

export default function AnalyticsPage() {
  const trends = useEcoWatchStore((s) => s.riskTrends)
  const nodes = useEcoWatchStore((s) => s.nodes)
  const alerts = useEcoWatchStore((s) => s.alerts)
  const data = useMemo(() => trends, [trends])
  const hotNodes = useMemo(() => Object.values(nodes).filter((n) => (n.sensorData.at(-1)?.aiRiskScore ?? 0) >= 75), [nodes])
  const activeAlerts = useMemo(() => Object.values(alerts).filter((a) => a.severity === "HIGH"), [alerts])

  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <header>
        <h1 className="text-base font-semibold sm:text-xl">Analytics</h1>
        <p className="text-[11px] text-muted-foreground sm:text-xs">Risk trends and model insights</p>
      </header>
      <section className="rounded-xl border bg-card/50 p-2 sm:p-4">
        <div className="h-72 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="timestamp" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="highRiskNodes" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              <Area type="monotone" dataKey="mediumRiskNodes" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Area type="monotone" dataKey="lowRiskNodes" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="rounded-xl border bg-card/50 p-3 sm:p-4">
        <div className="text-sm font-semibold sm:text-base">Nodes requiring immediate action</div>
        {hotNodes.length === 0 ? (
          <p className="mt-2 text-[12px] text-muted-foreground sm:text-sm">No active high-risk nodes.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {hotNodes.map((node) => (
              <div key={node.id} className="flex items-center justify-between rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-[13px] text-red-100 sm:text-sm">
                <div>
                  <div className="font-medium">{node.name}</div>
                  <div className="text-[11px] text-red-200 sm:text-xs">
                    Risk score {node.sensorData.at(-1)?.aiRiskScore ?? "N/A"} · Intensity {node.sensorData.at(-1)?.intensity ?? "N/A"}
                  </div>
                </div>
                <div className="rounded-full border border-red-500/50 px-3 py-1 text-[11px] sm:text-xs">High Risk</div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="rounded-xl border bg-card/50 p-3 sm:p-4">
        <div className="text-sm font-semibold sm:text-base">Critical alerts</div>
        {activeAlerts.length === 0 ? (
          <p className="mt-2 text-[12px] text-muted-foreground sm:text-sm">No critical alerts currently.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-[13px] text-red-100 sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{alert.message}</span>
                  <span className="text-[11px] sm:text-xs">Node {alert.nodeId}</span>
                </div>
                <p className="text-[11px] text-red-200 sm:text-xs">Location: {alert.location.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}


