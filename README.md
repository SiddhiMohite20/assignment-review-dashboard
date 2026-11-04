# Assignment & Review Dashboard

React + Tailwind CSS dashboard with Student and Admin (Professor) roles. No backend; data lives in `localStorage`.

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```
Deploy: import the repo on Vercel or Netlify (build command `npm run build`, output `dist`).
To reset demo data, clear the `assignment-dashboard-v1` key in localStorage.

## Folder structure
```
src/
  components/  Navbar, AssignmentCard, AssignmentModal, ConfirmDialog, ProgressBar
  pages/       Login, StudentDashboard, AdminDashboard
  context/     AppContext.jsx   (state + localStorage persistence)
  data/        mockData.js      (2 admins, 5 students, 5 assignments, submissions)
  App.jsx, main.jsx, index.css
```

## Component architecture
- `AppProvider` owns all state (assignments, submissions, current user) and exposes actions via `useApp()`.
- `App` shows loading / error / Login, then the dashboard for the user's role.
- `AssignmentCard` is shared: students pass `status` and a submit button, admins pass a student list and progress bar as children.
- `ConfirmDialog` is reused for both submission steps and delete confirmation.

## Key design decisions
- Submissions are stored as `{ "assignmentId:studentId": true }`, so every student's status is tracked individually and the model stays simple.
- Visibility is filtered by `assignedTo` (students) and `createdBy` (admins); nothing else is rendered.
- Progress and class completion are computed on render, never stored: `submitted / assigned × 100`.
- Submission needs two dialogs; state changes only in the second.
- Deleting an assignment also removes its submission records.
- Extras kept small: status filter, sorting, overdue highlighting, labelled form fields, Escape-to-close dialogs.
