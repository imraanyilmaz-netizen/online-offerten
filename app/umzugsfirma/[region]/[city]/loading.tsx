export default function StandortPageLoading() {
  return (
    <div className="min-h-[45vh] bg-gradient-to-br from-emerald-50/80 via-white to-slate-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-20">
        <div className="max-w-3xl space-y-4 animate-pulse">
          <div className="h-4 w-24 rounded-full bg-emerald-100/80" />
          <div className="h-10 sm:h-12 w-full max-w-xl rounded-lg bg-slate-200/90" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-[92%] rounded bg-slate-100" />
          <div className="h-4 w-[78%] rounded bg-slate-100" />
          <div className="pt-6 flex gap-3">
            <div className="h-12 w-48 rounded-lg bg-emerald-200/70" />
            <div className="h-12 w-36 rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
