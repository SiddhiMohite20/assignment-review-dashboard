export default function ProgressBar({ value, label }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-600">
        <span>{label}</span><span className="text-brand-dark">{pct}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-violet-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-gradient-to-r from-brand via-fuchsia-500 to-orange-400 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}