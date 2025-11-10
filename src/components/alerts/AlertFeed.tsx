"use client"
import { useMemo } from "react"
import { AlertTriangle } from "lucide-react"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"

export function AlertFeed() {
  const alertsMap = useEcoWatchStore((s) => s.alerts)
  const alerts = useMemo(() => Object.values(alertsMap), [alertsMap])
  const sorted = useMemo(
    () => [...alerts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 8),
    [alerts],
  )

  return (
    <div className="rounded-xl border bg-card/50 p-3 sm:p-4">
      <div className="mb-1 flex items-center justify-between sm:mb-2">
        <p className="text-sm font-semibold sm:text-base">Live Alerts</p>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4" />
          {sorted.length}
        </span>
      </div>
      {sorted.length === 0 && <p className="text-[12px] text-muted-foreground sm:text-xs">No alerts yet.</p>}
      <div className="space-y-2 sm:space-y-3">
        {sorted.map((a) => (
          <div key={a.id} className="rounded-lg border border-border/60 bg-card/60 p-2 text-[13px] sm:p-3 sm:text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{a.message}</span>
              <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground sm:text-xs">
                {a.severity}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              Node {a.nodeId} · {a.location.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


