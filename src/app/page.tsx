 "use client"
import { NodesMap } from "@/components/maps/NodesMap"
import { OverviewMetrics } from "@/components/dashboard/OverviewMetrics"
import { AlertFeed } from "@/components/alerts/AlertFeed"
import { useState } from "react"
import { RegisterNodeModal } from "@/components/nodes/RegisterNodeModal"
import { NodesList } from "@/components/nodes/NodesList"
import { useRealtime } from "@/hooks/useRealtime"
import { MobileSidebar } from "@/components/layout/MobileSidebar"
import { Menu } from "lucide-react"

export default function Home() {
  useRealtime()
  const [open, setOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <header className="sticky top-0 z-40 -mx-4 mb-2 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-card/50 sm:p-4">
        <div>
          <div className="flex items-center gap-2">
            <button className="rounded-md border p-2 lg:hidden" aria-label="Open menu" onClick={() => setDrawer(true)}>
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-base font-semibold sm:text-xl">EcoWatch Control Center</h1>
              <p className="text-[11px] text-muted-foreground sm:text-xs">Government-grade illegal mining monitoring</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-2 text-sm sm:text-xs" onClick={() => setOpen(true)}>Add Node</button>
          <span className="hidden rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300 sm:inline">Realtime</span>
        </div>
      </header>
      <div className="hidden w-72 shrink-0 border-r lg:block">
        {/* Desktop sidebar placeholder for future: integrate as a grid if needed */}
      </div>
      <OverviewMetrics />
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/50 p-2 sm:p-4 lg:col-span-2">
          <NodesMap />
        </div>
        <AlertFeed />
      </section>
      <NodesList />
      <RegisterNodeModal open={open} onOpenChange={setOpen} />
      <MobileSidebar open={drawer} onOpenChange={setDrawer} />
    </main>
  );
}
