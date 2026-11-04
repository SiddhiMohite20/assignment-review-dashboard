import { createContext, useContext, useEffect, useState } from 'react'
import { USERS, ASSIGNMENTS, SUBMISSIONS } from '../data/mockData'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const KEY = 'assignment-dashboard-v1'
const seed = () => ({ assignments: ASSIGNMENTS, submissions: SUBMISSIONS, currentUserId: null })

export function AppProvider({ children }) {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load from localStorage (short delay simulates a mock API call)
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY)
        setState(raw ? JSON.parse(raw) : seed())
      } catch {
        setError('Saved data is corrupted and could not be loaded.')
      }
      setLoading(false)
    }, 400)
    return () => clearTimeout(t)
  }, [])

  // Persist every change
  useEffect(() => {
    if (!state) return
    try { localStorage.setItem(KEY, JSON.stringify(state)) }
    catch { setError('Could not save changes to localStorage.') }
  }, [state])

  const update = (fn) => setState((s) => fn(s))
  const currentUser = state ? USERS.find((u) => u.id === state.currentUserId) || null : null

  const value = {
    loading, error, users: USERS, currentUser,
    assignments: state?.assignments || [],
    submissions: state?.submissions || {},
    students: USERS.filter((u) => u.role === 'student'),
    login: (id) => update((s) => ({ ...s, currentUserId: id })),
    logout: () => update((s) => ({ ...s, currentUserId: null })),
    clearError: () => setError(null),
    resetData: () => { localStorage.removeItem(KEY); setError(null); setState(seed()); setLoading(false) },
    saveAssignment: (a) => update((s) => ({
      ...s,
      assignments: a.id
        ? s.assignments.map((x) => (x.id === a.id ? { ...x, ...a } : x))
        : [...s.assignments, { ...a, id: 'as' + Date.now(), createdBy: s.currentUserId }],
    })),
    deleteAssignment: (id) => update((s) => ({
      ...s,
      assignments: s.assignments.filter((x) => x.id !== id),
      submissions: Object.fromEntries(Object.entries(s.submissions).filter(([k]) => !k.startsWith(id + ':'))),
    })),
    markSubmitted: (assignmentId, studentId) => update((s) => ({
      ...s, submissions: { ...s.submissions, [`${assignmentId}:${studentId}`]: true },
    })),
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
