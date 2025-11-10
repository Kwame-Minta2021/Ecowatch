"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"

const LeafletMap = dynamic(() => import("./NodesMapClient"), { ssr: false })

export function NodesMap() {
  const nodesMap = useEcoWatchStore((s) => s.nodes)
  const nodes = useMemo(() => Object.values(nodesMap), [nodesMap])
  const center = useMemo<[number, number]>(() => {
    if (!nodes.length) return [6.5244, 3.3792]
    const lat = nodes.reduce((a, n) => a + n.location.lat, 0) / nodes.length
    const lng = nodes.reduce((a, n) => a + n.location.lng, 0) / nodes.length
    return [lat, lng]
  }, [nodes])
  return <LeafletMap nodes={nodes} center={center} />
}


