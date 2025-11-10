"use client"
import { NodesMap } from "@/components/maps/NodesMap"
import { NodesList } from "@/components/nodes/NodesList"
import { useState } from "react"
import { RegisterNodeModal } from "@/components/nodes/RegisterNodeModal"

export default function NodesPage() {
  const [open, setOpen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold sm:text-xl">Nodes</h1>
          <p className="text-[11px] text-muted-foreground sm:text-xs">Manage monitoring devices and locations</p>
        </div>
        <button className="rounded-md border px-3 py-2 text-sm sm:text-xs" onClick={() => setOpen(true)}>Add Node</button>
      </header>
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/50 p-2 sm:p-4 lg:col-span-2">
          <NodesMap />
        </div>
        <NodesList />
      </section>
      <RegisterNodeModal open={open} onOpenChange={setOpen} />
    </main>
  )
}


