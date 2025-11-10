import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Alert, Node, PredictionOutput, RiskTrendPoint } from "@/types"

interface EcoWatchState {
  nodes: Record<string, Node>
  alerts: Record<string, Alert>
  predictions: Record<string, PredictionOutput>
  riskTrends: RiskTrendPoint[]
  isRealtimeConnected: boolean
  setNodes: (nodes: Node[] | Record<string, Node>) => void
  upsertNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  setAlerts: (alerts: Alert[] | Record<string, Alert>) => void
  upsertAlert: (alert: Alert) => void
  setPredictions: (predictions: PredictionOutput[]) => void
  setRiskTrends: (points: RiskTrendPoint[]) => void
}

function toRecord<T extends { id: string }>(items: T[] | Record<string, T>): Record<string, T> {
  if (Array.isArray(items)) {
    return items.reduce<Record<string, T>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }
  return items
}

export const useEcoWatchStore = create<EcoWatchState>()(
  persist(
    (set) => ({
      nodes: {},
      alerts: {},
      predictions: {},
      riskTrends: [],
      isRealtimeConnected: false,
      setNodes: (nodes) =>
        set(() => ({
          nodes: toRecord(nodes),
        })),
      upsertNode: (node) =>
        set((state) => ({
          nodes: { ...state.nodes, [node.id]: node },
        })),
      removeNode: (nodeId) =>
        set((state) => {
          const next = { ...state.nodes }
          delete next[nodeId]
          return { nodes: next }
        }),
      setAlerts: (alerts) =>
        set(() => ({
          alerts: toRecord(alerts),
        })),
      upsertAlert: (alert) =>
        set((state) => ({
          alerts: { ...state.alerts, [alert.id]: alert },
        })),
      setPredictions: (predictions) =>
        set(() => ({
          predictions: predictions.reduce<Record<string, PredictionOutput>>((acc, p) => {
            acc[p.nodeId] = p
            return acc
          }, {}),
        })),
      setRiskTrends: (points) =>
        set(() => ({
          riskTrends: points,
        })),
    }),
    { name: "ecowatch-next-store" },
  ),
)


