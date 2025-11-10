"use client"
import { useMemo, useState } from "react"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"
import { RegisterNodeModal } from "./RegisterNodeModal"

export function NodesList() {
  const nodesMap = useEcoWatchStore((s) => s.nodes)
  const removeNode = useEcoWatchStore((s) => s.removeNode)
  const nodes = useMemo(() => Object.values(nodesMap), [nodesMap])
  const [editing, setEditing] = useState<null | { id: string; name: string; lat: number; lng: number }>(null)

  if (!nodes.length) {
    return <div className="rounded-xl border bg-card/50 p-4 text-sm text-muted-foreground">No nodes yet.</div>
  }

  return (
    <div className="rounded-xl border bg-card/50">
      <div className="border-b p-4 text-sm font-semibold">Nodes</div>
      <div className="divide-y">
        {nodes.map((n) => (
          <div key={n.id} className="flex items-center justify-between p-4 text-sm">
            <div>
              <div className="font-medium">{n.name}</div>
              <div className="text-xs text-muted-foreground">
                {n.id} · {n.location.lat}, {n.location.lng}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-md border px-3 py-1.5"
                onClick={() =>
                  setEditing({ id: n.id, name: n.name, lat: n.location.lat, lng: n.location.lng })
                }
              >
                Edit
              </button>
              <button
                className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-red-200"
                onClick={() => removeNode(n.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <RegisterNodeModal
        open={!!editing}
        onOpenChange={(o) => {
          if (!o) setEditing(null)
        }}
        initial={
          editing
            ? { id: editing.id, name: editing.name, lat: editing.lat, lng: editing.lng }
            : undefined
        }
      />
    </div>
  )
}


