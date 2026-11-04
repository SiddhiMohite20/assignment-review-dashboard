import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  return (
    <header className="border-b border-slate-200 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div>
          <h1 className="text-base font-semibold sm:text-lg">Assignment & Review Dashboard</h1>
          <p className="text-xs text-slate-300">{currentUser.role === 'admin' ? 'Professor view' : 'Student view'}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm sm:inline">{currentUser.name}</span>
          <button className="btn bg-white/10 text-white hover:bg-white/20" onClick={logout}>Switch user</button>
        </div>
      </div>
    </header>
  )
}
