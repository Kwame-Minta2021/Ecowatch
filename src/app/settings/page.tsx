"use client"

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <header>
        <h1 className="text-base font-semibold sm:text-xl">Settings</h1>
        <p className="text-[11px] text-muted-foreground sm:text-xs">Role-based access and notifications</p>
      </header>
      <section className="rounded-xl border bg-card/50 p-3 sm:p-4">
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 sm:p-4">
          <div>
            <p className="text-sm font-medium">Two-factor authentication</p>
            <p className="text-[11px] text-muted-foreground sm:text-xs">Recommended for admin and operator accounts</p>
          </div>
          <button className="rounded-md border px-3 py-2 text-sm sm:text-xs">Configure</button>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 sm:p-4">
          <div>
            <p className="text-sm font-medium">Notification channels</p>
            <p className="text-[11px] text-muted-foreground sm:text-xs">Email, web push (FCM), and SMS integrations</p>
          </div>
          <button className="rounded-md border px-3 py-2 text-sm sm:text-xs">Manage</button>
        </div>
      </section>
    </main>
  )
}


