 "use client"
import { saveNodeToFirebase } from "@/services/realtime.service"
import { useState } from "react"
import { createPortal } from "react-dom"
import { resolveLocation } from "@/services/location"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"

export function RegisterNodeModal({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  initial?: { id: string; name: string; lat: number; lng: number }
}) {
  const upsertNode = useEcoWatchStore((s) => s.upsertNode)
  const [id, setId] = useState(initial?.id ?? "")
  const [name, setName] = useState(initial?.name ?? "")
  const [lat, setLat] = useState<number | "">(initial?.lat ?? "")
  const [lng, setLng] = useState<number | "">(initial?.lng ?? "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  function generateId() {
    return `NODE_${Math.floor(100 + Math.random() * 900)}`
  }

  async function handleUseMyLocation() {
    setLoading(true)
    setError(null)
    const loc = await resolveLocation()
    setLoading(false)
    if (!loc) {
      setError("Unable to resolve location")
      return
    }
    const latNum = Number(loc.lat)
    const lngNum = Number(loc.lng)
    setLat(Number.isFinite(latNum) ? Number(latNum.toFixed(6)) : "")
    setLng(Number.isFinite(lngNum) ? Number(lngNum.toFixed(6)) : "")
    if (!name) setName(loc.name ?? "Current Location")
    if (!id) setId(generateId())
  }

  function handleSave() {
    setError(null)
    const validLat = typeof lat === "number"
    const validLng = typeof lng === "number"
    if (!id || !name || !validLat || !validLng) {
      setError("Fill ID, Name, Latitude and Longitude (or use location)")
      return
    }
    const node = {
      id,
      name,
      location: { name, lat: lat as number, lng: lng as number },
      status: "online",
      lastUpdate: new Date().toISOString(),
      riskLevel: "LOW",
      sensorData: [],
    }
    // optimistic update
    upsertNode(node)
    // persist to Firebase (non-blocking)
    void saveNodeToFirebase({ ...node })
    onOpenChange(false)
    setId("")
    setName("")
    setLat("")
    setLng("")
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        role="dialog"
        aria-modal="true"
        className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-xl"
      >
        <div className="text-lg font-semibold">Register Monitoring Node</div>
        <p className="text-sm text-muted-foreground">
          Manually input coordinates or use your current location. Markers will appear on the map.
        </p>
        <div className="mt-4 grid gap-3">
          <div className="grid gap-2">
            <label className="text-sm">Node ID</label>
            <input className="h-10 rounded-md border bg-background px-3" value={id} onChange={(e) => setId(e.target.value)} placeholder="NODE_100" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Name</label>
            <input className="h-10 rounded-md border bg-background px-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mine Perimeter" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label className="text-sm">Latitude</label>
              <input
                type="number"
                step="0.000001"
                className="h-10 rounded-md border bg-background px-3"
                value={lat === "" ? "" : String(lat)}
                onChange={(e) => setLat(e.target.value !== "" ? Number(e.target.value) : "")}
                placeholder="9.0765"
                inputMode="decimal"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Longitude</label>
              <input
                type="number"
                step="0.000001"
                className="h-10 rounded-md border bg-background px-3"
                value={lng === "" ? "" : String(lng)}
                onChange={(e) => setLng(e.target.value !== "" ? Number(e.target.value) : "")}
                placeholder="7.3986"
                inputMode="decimal"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="rounded-md border px-3 py-2 text-sm" onClick={handleUseMyLocation} disabled={loading}>
              {loading ? "Locating…" : "Use my location"}
            </button>
            <div className="flex gap-2">
              <button className="rounded-md px-3 py-2 text-sm" onClick={() => onOpenChange(false)}>Cancel</button>
              <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground" onClick={handleSave}>Save node</button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>,
    document.body,
  )
}


