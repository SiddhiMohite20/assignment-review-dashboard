import { useEffect } from 'react'

export default function ConfirmDialog({ open, title, message, confirmText = 'Confirm', danger, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="cd-title" aria-describedby="cd-msg"
        className="pop w-full max-w-sm rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 id="cd-title" className="text-lg font-semibold">{title}</h2>
        <p id="cd-msg" className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button autoFocus className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
