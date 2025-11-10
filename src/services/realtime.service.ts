"use client"
import {
  onValue,
  orderByChild,
  limitToLast,
  query,
  ref,
  set,
  serverTimestamp,
  type DataSnapshot,
} from "firebase/database"
import type { Alert, Node } from "@/types"
import { getRealtimeDatabase } from "@/lib/firebase"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"
import { predictRisk } from "@/services/ai.service"

function parseNodeSnapshot(snapshot: DataSnapshot): Node | null {
  const v = snapshot.val()
  if (!v) return null
  const node: Node = {
    id: snapshot.key ?? v.id,
    name: v.name ?? "Unnamed Node",
    location: {
      name: v.location?.name ?? "Unknown",
      lat: Number(v.location?.lat ?? 0),
      lng: Number(v.location?.lng ?? 0),
      address: v.location?.address,
    },
    status: v.status ?? "offline",
    lastUpdate: v.lastUpdate ?? new Date().toISOString(),
    riskLevel: v.riskLevel ?? "LOW",
    sensorData: Array.isArray(v.sensorData) ? v.sensorData : Object.values(v.sensorData ?? {}),
    batteryLevel: v.batteryLevel,
    connectivity: v.connectivity,
    isSimulated: v.isSimulated,
  }
  return node
}

function parseAlertSnapshot(snapshot: DataSnapshot): Alert | null {
  const v = snapshot.val()
  if (!v) return null
  return {
    id: snapshot.key ?? v.id,
    nodeId: v.nodeId,
    type: v.type,
    severity: v.severity,
    message: v.message,
    timestamp: v.timestamp,
    location: v.location,
    riskScore: v.riskScore ?? 0,
    vibrationCount: v.vibrationCount ?? 0,
    intensity: v.intensity ?? 0,
    acknowledged: v.acknowledged ?? false,
    escalated: v.escalated ?? false,
  }
}

export function subscribeRealtime() {
  const db = getRealtimeDatabase()
  const nodesRef = ref(db, "nodes")
  const alertsRef = query(ref(db, "alerts"), orderByChild("timestamp"), limitToLast(100))

  const nodesUnsub = onValue(nodesRef, (snap) => {
    const nodes: Node[] = []
    snap.forEach((child) => {
      const parsed = parseNodeSnapshot(child)
      if (parsed) nodes.push(parsed)
    })
    const store = useEcoWatchStore.getState()
    store.setNodes(nodes)

    // Lightweight AI pass – escalate HIGH risk to alerts stream (server-side is preferred for trust)
    try {
      nodes.forEach((node) => {
        const prediction = predictRisk(node)
        if (prediction?.predictedSeverity === "HIGH") {
          const id = `AI_${node.id}_${node.lastUpdate}`
          store.upsertAlert({
            id,
            nodeId: node.id,
            type: "MINING_ALERT",
            severity: "HIGH",
            message: "AI detected high-risk mining activity",
            timestamp: node.lastUpdate,
            location: { name: node.location.name, lat: node.location.lat, lng: node.location.lng },
            riskScore: prediction.riskScore,
            vibrationCount: node.sensorData.at(-1)?.vibrationCount ?? 0,
            intensity: node.sensorData.at(-1)?.intensity ?? 0,
          })
        }
      })
    } catch {
      // best-effort client-side AI
    }

    // Build risk trends for analytics (past 24 samples based on timestamps from nodes)
    try {
      const now = Date.now()
      const hours = Array.from({ length: 24 }).map((_, i) => now - (23 - i) * 60 * 60 * 1000)
      const points = hours.map((t) => {
        let high = 0
        let med = 0
        let low = 0
        nodes.forEach((n) => {
          const latest = n.sensorData.at(-1)
          if (!latest) return
          const score = latest.aiRiskScore ?? (latest.intensity ?? 0) * 10
          if (score >= 75) high += 1
          else if (score >= 50) med += 1
          else low += 1
        })
        const averageRisk =
          nodes.length > 0
            ? nodes.reduce((acc, n) => acc + (n.sensorData.at(-1)?.aiRiskScore ?? 0), 0) / nodes.length
            : 0
        return {
          timestamp: new Date(t).toISOString(),
          averageRisk,
          highRiskNodes: high,
          mediumRiskNodes: med,
          lowRiskNodes: low,
        }
      })
      store.setRiskTrends(points)
    } catch {
      // ignore trend computation errors
    }
  })

  const alertsUnsub = onValue(alertsRef, (snap) => {
    const alerts: Alert[] = []
    snap.forEach((child) => {
      const parsed = parseAlertSnapshot(child)
      if (parsed) alerts.push(parsed)
    })
    useEcoWatchStore.getState().setAlerts(alerts)
  })

  return () => {
    nodesUnsub()
    alertsUnsub()
  }
}

export async function saveNodeToFirebase(node: Node) {
  const db = getRealtimeDatabase()
  const nodeRef = ref(db, `nodes/${node.id}`)
  await set(nodeRef, {
    id: node.id,
    name: node.name,
    location: node.location,
    status: node.status,
    lastUpdate: serverTimestamp(),
    riskLevel: node.riskLevel,
    sensorData: node.sensorData ?? [],
    batteryLevel: node.batteryLevel ?? null,
    connectivity: node.connectivity ?? null,
    isSimulated: node.isSimulated ?? null,
  })
}


