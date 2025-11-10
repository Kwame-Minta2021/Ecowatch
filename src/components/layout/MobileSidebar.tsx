"use client"
import { createPortal } from "react-dom"
import { SidebarNav } from "./SidebarNav"
import { useEffect, useState } from "react"

export function MobileSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || !open) return null
  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <aside className="absolute left-0 top-0 h-full w-72 max-w-[85%] overflow-y-auto border-r bg-background p-3 shadow-xl">
        <div className="mb-2 px-2">
          <div className="text-sm font-semibold">EcoWatch</div>
          <p className="text-[11px] text-muted-foreground">Control Center</p>
        </div>
        <SidebarNav onNavigate={() => onOpenChange(false)} />
      </aside>
    </div>,
    document.body,
  )
}


