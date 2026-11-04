export const USERS = [
  { id: 'a1', name: 'Prof. Ananya Kulkarni', role: 'admin' },
  { id: 'a2', name: 'Prof. Rahul Deshmukh', role: 'admin' },

  { id: 's1', name: 'Aditya Joshi', role: 'student' },
  { id: 's2', name: 'Priya Shah', role: 'student' },
  { id: 's3', name: 'Omkar Patil', role: 'student' },
  { id: 's4', name: 'Neha Verma', role: 'student' },
  { id: 's5', name: 'Sahil More', role: 'student' },
];

export const ASSIGNMENTS = [
  { id: 'as1', title: 'React Component Library', description: 'Build five reusable components and document their props.', dueDate: '2026-11-20', link: 'https://drive.google.com/drive/folders/react-library', createdBy: 'a1', assignedTo: ['s1', 's2', 's3', 's4', 's5'] },
  { id: 'as2', title: 'State Management Essay', description: 'Compare Context API with Redux in 800 words.', dueDate: '2026-10-25', link: 'https://drive.google.com/drive/folders/state-essay', createdBy: 'a1', assignedTo: ['s1', 's2', 's3'] },
  { id: 'as3', title: 'Responsive Portfolio Page', description: 'Create a mobile-first personal portfolio using Tailwind CSS.', dueDate: '2026-11-12', link: 'https://drive.google.com/drive/folders/portfolio', createdBy: 'a1', assignedTo: ['s2', 's4', 's5'] },
  { id: 'as4', title: 'Algorithms Problem Set 4', description: 'Solve the graph traversal problems from chapter 9.', dueDate: '2026-11-30', link: 'https://drive.google.com/drive/folders/algo-ps4', createdBy: 'a2', assignedTo: ['s1', 's2', 's3', 's4', 's5'] },
  { id: 'as5', title: 'Database Design Review', description: 'Submit an ER diagram and normalised schema for a library system.', dueDate: '2026-11-08', link: 'https://drive.google.com/drive/folders/db-design', createdBy: 'a2', assignedTo: ['s1', 's4'] },
]

// key format: `${assignmentId}:${studentId}` -> true when submitted
export const SUBMISSIONS = {
  'as1:s1': true, 'as1:s2': true, 'as1:s4': true,
  'as2:s1': true,
  'as3:s5': true,
  'as4:s3': true,
  'as5:s1': true,
}
