"use client"
import { AlertFeed } from "@/components/alerts/AlertFeed"

export default function AlertsPage() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <header>
        <h1 className="text-base font-semibold sm:text-xl">Alerts</h1>
        <p className="text-[11px] text-muted-foreground sm:text-xs">Live and historical alerts</p>
      </header>
      <AlertFeed />
    </main>
  )
}


