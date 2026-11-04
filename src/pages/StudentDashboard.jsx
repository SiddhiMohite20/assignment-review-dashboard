import { useState } from 'react'
import { useApp } from '../context/AppContext'
import AssignmentCard from '../components/AssignmentCard'
import ConfirmDialog from '../components/ConfirmDialog'
import ProgressBar from '../components/ProgressBar'

export default function StudentDashboard() {
  const { currentUser, assignments, submissions, markSubmitted } = useApp()
  const [filter, setFilter] = useState('all')
  const [step, setStep] = useState(0) // 0 = closed, 1 = first prompt, 2 = final confirm
  const [target, setTarget] = useState(null)

  const mine = assignments
    .filter((a) => a.assignedTo.includes(currentUser.id))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const isDone = (a) => !!submissions[`${a.id}:${currentUser.id}`]
  const done = mine.filter(isDone).length
  const shown = mine.filter((a) => filter === 'all' || (filter === 'submitted') === isDone(a))

  const close = () => { setStep(0); setTarget(null) }
  const finish = () => { markSubmitted(target.id, currentUser.id); close() }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold">Hello, {currentUser.name.split(' ')[0]}</h2>
        <p className="mt-1 text-sm text-slate-600">{done} of {mine.length} submitted</p>
        <div className="mt-3"><ProgressBar value={mine.length ? (done / mine.length) * 100 : 0} label="Overall progress" /></div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Your assignments</h2>
        <div>
          <label htmlFor="flt" className="sr-only">Filter by status</label>
          <select id="flt" className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option><option value="pending">Not submitted</option><option value="submitted">Submitted</option>
          </select>
        </div>
      </div>

      {mine.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500">No assignments have been assigned to you yet.</p>
      ) : shown.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500">No assignments match this filter.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shown.map((a) => (
            <AssignmentCard key={a.id} assignment={a} status={isDone(a)}>
              {!isDone(a) && (
                <button className="btn-primary mt-4" onClick={() => { setTarget(a); setStep(1) }}>Yes, I have submitted</button>
              )}
            </AssignmentCard>
          ))}
        </div>
      )}

      <ConfirmDialog open={step === 1} title="Have you submitted this?" confirmText="Continue"
        message={`You are about to report "${target?.title}" as submitted to the Drive folder.`}
        onConfirm={() => setStep(2)} onCancel={close} />
      <ConfirmDialog open={step === 2} title="Final confirmation" confirmText="Confirm submission"
        message="This marks the assignment as Submitted. Are you sure?"
        onConfirm={finish} onCancel={close} />
    </div>
  )
}
