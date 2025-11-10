import { useEffect } from "react"
import { useEcoWatchStore } from "@/store/useEcoWatchStore"
import { sampleAlerts, sampleNodes, samplePredictions, sampleRiskTrends } from "@/lib/sample-data"

export function useSampleBootstrap() {
  const setNodes = useEcoWatchStore((s) => s.setNodes)
  const setAlerts = useEcoWatchStore((s) => s.setAlerts)
  const setPredictions = useEcoWatchStore((s) => s.setPredictions)
  const setRiskTrends = useEcoWatchStore((s) => s.setRiskTrends)
  const hasNodes = Object.keys(useEcoWatchStore.getState().nodes).length > 0

  useEffect(() => {
    if (!hasNodes) {
      setNodes(sampleNodes)
      setAlerts(sampleAlerts)
      setPredictions(samplePredictions)
      setRiskTrends(sampleRiskTrends)
    }
    // intentionally only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}


