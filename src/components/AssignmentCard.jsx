export const isOverdue = (due, submitted) => !submitted && new Date(due + 'T23:59:59') < new Date()
export const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

const ACCENTS = ['from-violet-500 to-indigo-400', 'from-pink-500 to-rose-400', 'from-sky-500 to-cyan-400', 'from-orange-400 to-amber-300', 'from-emerald-500 to-teal-400']
const accentFor = (id) => ACCENTS[[...id].reduce((n, c) => n + c.charCodeAt(0), 0) % ACCENTS.length]

export function StatusBadge({ submitted }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${submitted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${submitted ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {submitted ? 'Submitted' : 'Not Submitted'}
    </span>
  )
}

export default function AssignmentCard({ assignment, status, children }) {
  const { id, title, description, dueDate, link } = assignment
  const overdue = status !== undefined && isOverdue(dueDate, status)
  return (
    <article className={`overflow-hidden rounded-2xl border bg-white shadow-soft ${overdue ? 'border-rose-300' : 'border-violet-100'}`}>
      <div className={`h-2 bg-gradient-to-r ${accentFor(id)}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-bold">{title}</h3>
          {status !== undefined && <StatusBadge submitted={status} />}
        </div>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <dl className="mt-4 flex flex-wrap gap-2 text-sm">
          <div className={`flex gap-1 rounded-lg px-2.5 py-1 ${overdue ? 'bg-rose-50 text-rose-700' : 'bg-violet-50'}`}>
            <dt className="opacity-70">Due</dt>
            <dd className="font-semibold">{fmtDate(dueDate)}{overdue && ' · overdue'}</dd>
          </div>
          <div className="rounded-lg bg-sky-50 px-2.5 py-1">
            <dt className="sr-only">Submission link</dt>
            <dd><a href={link} target="_blank" rel="noreferrer" className="font-semibold text-sky-700 underline">Open Drive folder</a></dd>
          </div>
        </dl>
        {children}
      </div>
    </article>
  )
}