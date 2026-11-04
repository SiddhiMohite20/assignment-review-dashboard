import { useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const { loading, error, currentUser, resetData } = useApp()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        <span className="ml-3 text-sm text-slate-600">Loading your dashboard…</span>
      </div>
    )
  }
  if (error && !currentUser) {
    return (
      <div className="mx-auto mt-24 max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center" role="alert">
        <p className="font-medium text-red-800">{error}</p>
        <button className="btn-danger mt-4" onClick={resetData}>Reset to sample data</button>
      </div>
    )
  }
  if (!currentUser) return <Login />

  return (
    <div className="min-h-screen">
      <Navbar />
      {error && <p role="alert" className="bg-red-50 px-4 py-2 text-center text-sm text-red-700">{error}</p>}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {currentUser.role === 'student' ? <StudentDashboard /> : <AdminDashboard />}
      </main>
    </div>
  )
}
