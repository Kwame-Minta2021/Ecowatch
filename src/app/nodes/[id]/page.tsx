"use client"
import { useParams, useRouter } from "next/navigation"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"
import { useMemo } from "react"
import { NodesMap } from "@/components/maps/NodesMap"

export default function NodeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const node = useEcoWatchStore((s) => s.nodes[id])
  const latest = useMemo(() => node?.sensorData.at(-1), [node])

  if (!node) {
    return (
      <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <button className="w-fit rounded-md border px-3 py-2 text-sm" onClick={() => router.back()}>
          Back
        </button>
        <div className="rounded-xl border bg-card/50 p-4 text-sm text-muted-foreground">Node not found.</div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold sm:text-xl">{node.name}</h1>
          <p className="text-[11px] text-muted-foreground sm:text-xs">{node.id}</p>
        </div>
        <button className="w-fit rounded-md border px-3 py-2 text-sm" onClick={() => router.back()}>
          Back
        </button>
      </div>
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/50 p-2 sm:p-4 lg:col-span-2">
          <NodesMap />
        </div>
        <div className="rounded-xl border bg-card/50 p-3 sm:p-4">
          <div className="text-sm font-semibold">Latest Telemetry</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[13px] sm:text-sm">
            <div className="rounded-lg border border-border/60 bg-card/60 p-3">
              <div className="text-xs text-muted-foreground">Intensity</div>
              <div className="text-base font-semibold">{latest?.intensity ?? "N/A"}</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/60 p-3">
              <div className="text-xs text-muted-foreground">Vibrations</div>
              <div className="text-base font-semibold">{latest?.vibrationCount ?? "N/A"}</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/60 p-3">
              <div className="text-xs text-muted-foreground">Risk Score</div>
              <div className="text-base font-semibold">{latest?.aiRiskScore ?? "N/A"}</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/60 p-3">
              <div className="text-xs text-muted-foreground">Status</div>
              <div className="text-base font-semibold">{node.status}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


