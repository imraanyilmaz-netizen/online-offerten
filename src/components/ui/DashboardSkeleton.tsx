type DashboardSkeletonProps = {
  sidebar?: boolean
}

export default function DashboardSkeleton({ sidebar = true }: DashboardSkeletonProps) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {sidebar ? (
          <aside className="hidden rounded-2xl border border-border bg-card p-4 lg:block">
            <div className="mb-6 h-8 w-36 animate-pulse rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted/80" />
            </div>
          </aside>
        ) : null}

        <main className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted/70" />
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-muted/70" />
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-muted/70" />
              <div className="h-8 w-20 animate-pulse rounded bg-muted" />
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-muted/70" />
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-4 h-6 w-40 animate-pulse rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-14 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-14 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-14 w-full animate-pulse rounded-lg bg-muted/80" />
              <div className="h-14 w-full animate-pulse rounded-lg bg-muted/80" />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
