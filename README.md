# Assignment & Review Dashboard

A responsive assignment management dashboard built using **React.js and Tailwind CSS** with two user roles: Student and Admin (Professor).

The application allows students to view and submit assignments while admins can manage assignments and track student submission progress.

The project uses mock login and browser `localStorage` for data persistence. No backend or real authentication is required.

## 1. Features

### Student Dashboard
- View assignments assigned to the logged-in student.
- View assignment title, description, due date and submission status.
- Access external Google Drive submission links.
- Two-step assignment submission confirmation.
- View overall assignment completion progress.
- View only assignments assigned to the current student.

### Admin Dashboard
- Create, edit and delete assignments.
- Assign assignments to all students or selected students.
- Add external Google Drive submission links.
- View individual student submission statuses.
- Track class completion percentage using progress bars.
- View only assignments created by the logged-in admin.

### General Features
- Mock login with two roles: Student and Admin.
- Seeded data containing 2 admins and 5 students.
- Responsive interface for desktop and mobile.
- Data persistence using localStorage.
- Loading, empty and error states.
- Search and status filtering.
- Assignment sorting.
- Overdue assignment highlighting.

## 2. Technologies Used

- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Hooks (useState and useEffect)
- Context API
- Browser localStorage

## 3. Installation and Setup

Follow these steps to run the project locally.

**Step 1: Clone the repository**

```bash
git clone https://github.com/SiddhiMohite20/assignment-review-dashboard.git
```

**Step 2: Navigate to the project directory**

```bash
cd assignment-review-dashboard
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

Open the local development URL:

```text
http://localhost:5173
```

**Step 5: Build for production**

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` directory.

## 4. Folder Structure

```text
assignment-review-dashboard/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── AssignmentModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── ProgressBar.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 5. Component Architecture

The application follows a component-based architecture to maintain code reusability and separation of responsibilities.

**App.jsx**
- Main application component.
- Handles the current user role and displays the appropriate dashboard.

**AppContext.jsx**
- Manages application state using Context API.
- Stores assignments, submissions and current user information.
- Provides shared actions and localStorage persistence.

**Login.jsx**
- Provides mock login functionality.
- Allows users to access the application as a Student or Admin.

**StudentDashboard.jsx**
- Displays assignments assigned to the logged-in student.
- Shows submission status and overall progress.

**AdminDashboard.jsx**
- Provides assignment management functionality.
- Displays student submission details and class completion progress.

**AssignmentCard.jsx**
- Reusable component for displaying assignment information.
- Supports student and admin dashboard views.

**AssignmentModal.jsx**
- Handles assignment creation and editing.

**ConfirmDialog.jsx**
- Displays confirmation dialogs for submission and deletion actions.

**ProgressBar.jsx**
- Displays assignment completion progress visually.

**Navbar.jsx**
- Provides dashboard navigation and user information.

## 6. Key Design Decisions

**1. Mock Authentication**

A simple role-based mock login system is used instead of real authentication, as the assignment does not require a backend.

**2. Local Storage**

Browser localStorage is used to persist assignments and submission statuses across page refreshes.

The application uses the `assignment-dashboard-v1` localStorage key.

**3. Individual Submission Tracking**

Submissions are stored using a combined assignment and student identifier:

```javascript
{
  "assignmentId:studentId": true
}
```

This allows the application to track each student's submission independently.

**4. Role-Based Data Visibility**

- Students see assignments filtered using `assignedTo`.
- Admins see assignments filtered using `createdBy`.

This ensures that each user sees only their relevant data.

**5. Dynamic Progress Calculation**

Student and class completion percentages are calculated dynamically using submitted and assigned assignment counts.

```text
Completion Percentage =
(Submitted Assignments / Total Assigned Assignments) × 100
```

Progress values are calculated when rendering rather than stored separately.

**6. Two-Step Submission Confirmation**

Students must complete two confirmation steps before an assignment status changes to Submitted.

**7. Assignment Deletion**

When an assignment is deleted, its associated submission records are also removed.

## 7. Data Persistence

The application stores its data in browser localStorage.

Data remains available after refreshing the browser.

To reset the demo data, clear the following localStorage key:

```javascript
localStorage.removeItem("assignment-dashboard-v1");
```

## 8. Deployment

The application can be deployed using Vercel or Netlify.

**Deployment configuration:**

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 9. GitHub Repository

Repository: https://github.com/SiddhiMohite20/assignment-review-dashboard

## 10. Project Objective

The objective of this project is to develop a responsive assignment management platform that simplifies assignment distribution, student submissions and progress tracking through separate Student and Admin dashboards.