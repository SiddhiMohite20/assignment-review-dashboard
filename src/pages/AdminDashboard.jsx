import { useState } from 'react'
import { useApp } from '../context/AppContext'
import AssignmentCard, { StatusBadge } from '../components/AssignmentCard'
import AssignmentModal from '../components/AssignmentModal'
import ConfirmDialog from '../components/ConfirmDialog'
import ProgressBar from '../components/ProgressBar'

export default function AdminDashboard() {
  const { currentUser, assignments, students, submissions, saveAssignment, deleteAssignment } = useApp()
  const [modal, setModal] = useState({ open: false, assignment: null })
  const [toDelete, setToDelete] = useState(null)
  const [sort, setSort] = useState('due')

  const mine = assignments
    .filter((a) => a.createdBy === currentUser.id)
    .sort((a, b) => (sort === 'due' ? a.dueDate.localeCompare(b.dueDate) : a.title.localeCompare(b.title)))

  const closeModal = () => setModal({ open: false, assignment: null })
  const onSave = (data) => { saveAssignment(data); closeModal() }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Your assignments</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">Sort assignments</label>
          <select id="sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="due">Sort by due date</option><option value="title">Sort by title</option>
          </select>
          <button className="btn-primary" onClick={() => setModal({ open: true, assignment: null })}>New assignment</button>
        </div>
      </div>

      {mine.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500">You haven’t created any assignments yet. Select “New assignment” to start.</p>
      ) : (
        <div className="space-y-5">
          {mine.map((a) => {
            const assigned = students.filter((s) => a.assignedTo.includes(s.id))
            const submitted = assigned.filter((s) => submissions[`${a.id}:${s.id}`]).length
            const pct = assigned.length ? (submitted / assigned.length) * 100 : 0
            return (
              <AssignmentCard key={a.id} assignment={a}>
                <div className="mt-4"><ProgressBar value={pct} label={`Class completion (${submitted} of ${assigned.length} students)`} /></div>
                <ul className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200">
                  {assigned.map((s) => (
                    <li key={s.id} className="flex items-center justify-between px-3 py-2 text-sm">
                      <span>{s.name}</span><StatusBadge submitted={!!submissions[`${a.id}:${s.id}`]} />
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <button className="btn-ghost" onClick={() => setModal({ open: true, assignment: a })}>Edit</button>
                  <button className="btn-ghost text-red-600" onClick={() => setToDelete(a)}>Delete</button>
                </div>
              </AssignmentCard>
            )
          })}
        </div>
      )}

      <AssignmentModal open={modal.open} assignment={modal.assignment} students={students} onSave={onSave} onClose={closeModal} />
      <ConfirmDialog open={!!toDelete} danger title="Delete assignment?" confirmText="Delete"
        message={`"${toDelete?.title}" and all its submission records will be removed.`}
        onConfirm={() => { deleteAssignment(toDelete.id); setToDelete(null) }} onCancel={() => setToDelete(null)} />
    </div>
  )
}
