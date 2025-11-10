"use client"
import { useEffect } from "react"
import { subscribeRealtime } from "@/services/realtime.service"

export function useRealtime() {
  useEffect(() => {
    const unsub = subscribeRealtime()
    return () => {
      try {
        unsub()
      } catch {
        // ignore
      }
    }
  }, [])
}


