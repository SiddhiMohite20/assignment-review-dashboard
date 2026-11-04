import { useApp } from '../context/AppContext'

export default function Login() {
  const { users, login } = useApp()
  const Group = ({ title, role }) => (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-slate-600">{title}</h2>
      <ul className="space-y-2">
        {users.filter((u) => u.role === role).map((u) => (
          <li key={u.id}>
            <button onClick={() => login(u.id)} className="btn-ghost w-full justify-between">
              <span>{u.name}</span><span className="text-xs text-slate-400">Sign in</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="text-2xl font-semibold">Assignment & Review Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Choose a demo account to continue. No password needed.</p>
        </div>
        <Group title="Professors" role="admin" />
        <Group title="Students" role="student" />
      </div>
    </div>
  )
}
