import { useEffect, useState } from 'react'

const empty = { title: '', description: '', dueDate: '', link: '', assignedTo: [] }

export default function AssignmentModal({ open, assignment, students, onSave, onClose }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) { setForm(assignment ? { ...assignment } : { ...empty, assignedTo: students.map((s) => s.id) }); setErrors({}) }
  }, [open, assignment, students])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const allSelected = form.assignedTo.length === students.length
  const toggle = (id) => set('assignedTo', form.assignedTo.includes(id) ? form.assignedTo.filter((x) => x !== id) : [...form.assignedTo, id])

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.title.trim()) err.title = 'Title is required.'
    if (!form.description.trim()) err.description = 'Description is required.'
    if (!form.dueDate) err.dueDate = 'Pick a due date.'
    if (!/^https?:\/\/\S+$/.test(form.link.trim())) err.link = 'Enter a valid http(s) link.'
    if (form.assignedTo.length === 0) err.assignedTo = 'Assign to at least one student.'
    setErrors(err)
    if (Object.keys(err).length === 0) onSave({ ...form, title: form.title.trim(), description: form.description.trim(), link: form.link.trim() })
  }
  const Err = ({ k }) => errors[k] ? <p className="mt-1 text-xs text-red-600" role="alert">{errors[k]}</p> : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4" onClick={onClose}>
      <form noValidate onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="am-title"
        className="pop my-auto w-full max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 id="am-title" className="text-lg font-semibold">{assignment ? 'Edit assignment' : 'Create assignment'}</h2>
        <div>
          <label htmlFor="f-title" className="mb-1 block text-sm font-medium">Title</label>
          <input id="f-title" className="input" value={form.title} onChange={(e) => set('title', e.target.value)} autoFocus /><Err k="title" />
        </div>
        <div>
          <label htmlFor="f-desc" className="mb-1 block text-sm font-medium">Description</label>
          <textarea id="f-desc" rows={3} className="input" value={form.description} onChange={(e) => set('description', e.target.value)} /><Err k="description" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="f-due" className="mb-1 block text-sm font-medium">Due date</label>
            <input id="f-due" type="date" className="input" value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} /><Err k="dueDate" />
          </div>
          <div>
            <label htmlFor="f-link" className="mb-1 block text-sm font-medium">Google Drive link</label>
            <input id="f-link" type="url" placeholder="https://drive.google.com/…" className="input" value={form.link} onChange={(e) => set('link', e.target.value)} /><Err k="link" />
          </div>
        </div>
        <fieldset>
          <legend className="mb-1 text-sm font-medium">Assign to</legend>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={allSelected} onChange={() => set('assignedTo', allSelected ? [] : students.map((s) => s.id))} /> All students
          </label>
          <div className="mt-2 grid gap-1 pl-6 sm:grid-cols-2">
            {students.map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.assignedTo.includes(s.id)} onChange={() => toggle(s.id)} /> {s.name}
              </label>
            ))}
          </div>
          <Err k="assignedTo" />
        </fieldset>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">{assignment ? 'Save changes' : 'Create assignment'}</button>
        </div>
      </form>
    </div>
  )
}
