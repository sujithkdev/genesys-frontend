// ─────────────────────────────────────────────────────────
// GENESYS DEMO DATA — all hardcoded, no backend needed
// ─────────────────────────────────────────────────────────

import { User, Course, Enrollment, Payment, Section } from '@/types';

// ── Demo credentials shown on login page ─────────────────
export const DEMO_CREDENTIALS = [
  {
    role: 'student' as const,
    label: 'Student',
    email: 'student@demo.com',
    password: 'demo1234',
    color: 'bg-brand-600',
    description: 'Browse enrolled courses, track progress, watch lessons',
  },
  {
    role: 'instructor' as const,
    label: 'Mentor / Instructor',
    email: 'mentor@demo.com',
    password: 'demo1234',
    color: 'bg-emerald-600',
    description: 'Manage courses, view student analytics, track revenue',
  },
  {
    role: 'admin' as const,
    label: 'Admin',
    email: 'admin@demo.com',
    password: 'demo1234',
    color: 'bg-rose-600',
    description: 'Manage users, review courses, handle applications',
  },
];

// ── Demo users ─────────────────────────────────────────────
export const DEMO_USERS: Record<string, User> = {
  'student@demo.com': {
    id: 'demo-student-001',
    email: 'student@demo.com',
    first_name: 'Arjun',
    last_name: 'Mehta',
    full_name: 'Arjun Mehta',
    role: 'student',
    status: 'active',
    bio: 'Passionate learner exploring programming and web development.',
    phone: '+91 98765 43210',
    email_verified: true,
    created_at: '2024-06-01T10:00:00Z',
  },
  'mentor@demo.com': {
    id: 'demo-instructor-001',
    email: 'mentor@demo.com',
    first_name: 'Priya',
    last_name: 'Sharma',
    full_name: 'Priya Sharma',
    role: 'instructor',
    status: 'active',
    bio: 'Senior software engineer with 8 years of industry experience. Passionate about teaching Python, Web Dev and Data Science.',
    phone: '+91 99766 05040',
    email_verified: true,
    created_at: '2024-01-15T09:00:00Z',
  },
  'admin@demo.com': {
    id: 'demo-admin-001',
    email: 'admin@demo.com',
    first_name: 'Admin',
    last_name: 'Genesys',
    full_name: 'Admin Genesys',
    role: 'admin',
    status: 'active',
    bio: 'Platform administrator for Genesys Academy.',
    phone: '+91 99766 05040',
    email_verified: true,
    created_at: '2024-01-01T00:00:00Z',
  },
};

// ── Course sections ────────────────────────────────────────
export const DEMO_SECTIONS_PYTHON: Section[] = [
  {
    id: 'sec-py-01',
    course_id: 'course-001',
    title: 'Getting Started with Python',
    order_index: 0,
    lessons: [
      { id: 'les-py-01', section_id: 'sec-py-01', course_id: 'course-001', title: 'Welcome & Course Overview',       type: 'video', order_index: 0, duration_seconds: 300,  is_preview: true  },
      { id: 'les-py-02', section_id: 'sec-py-01', course_id: 'course-001', title: 'Installing Python & VS Code',     type: 'video', order_index: 1, duration_seconds: 480,  is_preview: true  },
      { id: 'les-py-03', section_id: 'sec-py-01', course_id: 'course-001', title: 'Your First Python Program',       type: 'video', order_index: 2, duration_seconds: 620,  is_preview: true  },
      { id: 'les-py-04', section_id: 'sec-py-01', course_id: 'course-001', title: 'Variables and Data Types',        type: 'video', order_index: 3, duration_seconds: 740,  is_preview: false },
      { id: 'les-py-05', section_id: 'sec-py-01', course_id: 'course-001', title: 'Strings & String Methods',        type: 'video', order_index: 4, duration_seconds: 810,  is_preview: false },
      { id: 'les-py-06', section_id: 'sec-py-01', course_id: 'course-001', title: 'Quiz: Python Basics',             type: 'quiz',  order_index: 5, duration_seconds: 0,    is_preview: false },
    ],
  },
  {
    id: 'sec-py-02',
    course_id: 'course-001',
    title: 'Control Flow & Functions',
    order_index: 1,
    lessons: [
      { id: 'les-py-07', section_id: 'sec-py-02', course_id: 'course-001', title: 'If / Else Statements',            type: 'video', order_index: 0, duration_seconds: 720,  is_preview: false },
      { id: 'les-py-08', section_id: 'sec-py-02', course_id: 'course-001', title: 'for and while Loops',             type: 'video', order_index: 1, duration_seconds: 890,  is_preview: false },
      { id: 'les-py-09', section_id: 'sec-py-02', course_id: 'course-001', title: 'Defining & Calling Functions',    type: 'video', order_index: 2, duration_seconds: 950,  is_preview: false },
      { id: 'les-py-10', section_id: 'sec-py-02', course_id: 'course-001', title: 'Lambda & Higher Order Functions', type: 'video', order_index: 3, duration_seconds: 720,  is_preview: false },
      { id: 'les-py-11', section_id: 'sec-py-02', course_id: 'course-001', title: 'Practice Problems (PDF)',         type: 'pdf',   order_index: 4, duration_seconds: 0,    is_preview: false },
    ],
  },
  {
    id: 'sec-py-03',
    course_id: 'course-001',
    title: 'Data Structures',
    order_index: 2,
    lessons: [
      { id: 'les-py-12', section_id: 'sec-py-03', course_id: 'course-001', title: 'Lists and Tuples',                type: 'video', order_index: 0, duration_seconds: 860,  is_preview: false },
      { id: 'les-py-13', section_id: 'sec-py-03', course_id: 'course-001', title: 'Dictionaries & Sets',             type: 'video', order_index: 1, duration_seconds: 940,  is_preview: false },
      { id: 'les-py-14', section_id: 'sec-py-03', course_id: 'course-001', title: 'List Comprehensions',             type: 'video', order_index: 2, duration_seconds: 680,  is_preview: false },
      { id: 'les-py-15', section_id: 'sec-py-03', course_id: 'course-001', title: 'Quiz: Data Structures',           type: 'quiz',  order_index: 3, duration_seconds: 0,    is_preview: false },
    ],
  },
  {
    id: 'sec-py-04',
    course_id: 'course-001',
    title: 'Object-Oriented Programming',
    order_index: 3,
    lessons: [
      { id: 'les-py-16', section_id: 'sec-py-04', course_id: 'course-001', title: 'Classes and Objects',             type: 'video', order_index: 0, duration_seconds: 1020, is_preview: false },
      { id: 'les-py-17', section_id: 'sec-py-04', course_id: 'course-001', title: 'Inheritance & Polymorphism',      type: 'video', order_index: 1, duration_seconds: 1100, is_preview: false },
      { id: 'les-py-18', section_id: 'sec-py-04', course_id: 'course-001', title: 'Magic Methods & Dunder',          type: 'video', order_index: 2, duration_seconds: 780,  is_preview: false },
      { id: 'les-py-19', section_id: 'sec-py-04', course_id: 'course-001', title: 'OOP Reference Notes (PDF)',       type: 'pdf',   order_index: 3, duration_seconds: 0,    is_preview: false },
    ],
  },
  {
    id: 'sec-py-05',
    course_id: 'course-001',
    title: 'File Handling & Error Management',
    order_index: 4,
    lessons: [
      { id: 'les-py-20', section_id: 'sec-py-05', course_id: 'course-001', title: 'Reading & Writing Files',         type: 'video', order_index: 0, duration_seconds: 750,  is_preview: false },
      { id: 'les-py-21', section_id: 'sec-py-05', course_id: 'course-001', title: 'Exception Handling (try/except)', type: 'video', order_index: 1, duration_seconds: 840,  is_preview: false },
      { id: 'les-py-22', section_id: 'sec-py-05', course_id: 'course-001', title: 'Working with JSON & CSV',         type: 'video', order_index: 2, duration_seconds: 920,  is_preview: false },
    ],
  },
  {
    id: 'sec-py-06',
    course_id: 'course-001',
    title: 'Real-World Projects',
    order_index: 5,
    lessons: [
      { id: 'les-py-23', section_id: 'sec-py-06', course_id: 'course-001', title: 'Project 1: Web Scraper',          type: 'video', order_index: 0, duration_seconds: 1800, is_preview: false },
      { id: 'les-py-24', section_id: 'sec-py-06', course_id: 'course-001', title: 'Project 2: REST API with Flask',  type: 'video', order_index: 1, duration_seconds: 2100, is_preview: false },
      { id: 'les-py-25', section_id: 'sec-py-06', course_id: 'course-001', title: 'Project 3: Data Dashboard',       type: 'video', order_index: 2, duration_seconds: 1920, is_preview: false },
      { id: 'les-py-26', section_id: 'sec-py-06', course_id: 'course-001', title: 'Course Completion & Next Steps',  type: 'video', order_index: 3, duration_seconds: 360,  is_preview: false },
    ],
  },
];

// ── Student reviews for Python course ─────────────────────
export const DEMO_REVIEWS_PYTHON = [
  { id: 'r1', name: 'Divya Rajan',    initials: 'DR', rating: 5, date: 'Aug 2024', comment: 'Absolutely loved this course! Priya explains everything so clearly. The projects at the end really tied it all together. Went from zero coding experience to building my first API.' },
  { id: 'r2', name: 'Karthik Selvam', initials: 'KS', rating: 5, date: 'Sep 2024', comment: 'Best Python course I could find in Tamil Nadu. The content is practical, not just theory. The OOP section was especially well done.' },
  { id: 'r3', name: 'Sneha Pillai',   initials: 'SP', rating: 4, date: 'Aug 2024', comment: 'Very well structured. I would love more advanced topics like async Python and decorators, but the fundamentals are rock solid. Great value for ₹2999.' },
  { id: 'r4', name: 'Rohit Kumar',    initials: 'RK', rating: 5, date: 'Jul 2024', comment: 'The instructor is very patient and explains concepts with real examples. The quizzes helped me retain things. Highly recommend!' },
];

export const DEMO_SECTIONS_WEBDEV: Section[] = [
  {
    id: 'sec-wd-01',
    course_id: 'course-002',
    title: 'HTML & CSS Foundations',
    order_index: 0,
    lessons: [
      { id: 'les-wd-01', section_id: 'sec-wd-01', course_id: 'course-002', title: 'HTML Document Structure', type: 'video', order_index: 0, duration_seconds: 560, is_preview: true },
      { id: 'les-wd-02', section_id: 'sec-wd-01', course_id: 'course-002', title: 'CSS Selectors & Box Model', type: 'video', order_index: 1, duration_seconds: 810, is_preview: false },
      { id: 'les-wd-03', section_id: 'sec-wd-01', course_id: 'course-002', title: 'Flexbox & Grid Layouts', type: 'video', order_index: 2, duration_seconds: 920, is_preview: false },
    ],
  },
  {
    id: 'sec-wd-02',
    course_id: 'course-002',
    title: 'JavaScript Essentials',
    order_index: 1,
    lessons: [
      { id: 'les-wd-04', section_id: 'sec-wd-02', course_id: 'course-002', title: 'JS Variables & Functions', type: 'video', order_index: 0, duration_seconds: 870, is_preview: false },
      { id: 'les-wd-05', section_id: 'sec-wd-02', course_id: 'course-002', title: 'DOM Manipulation', type: 'video', order_index: 1, duration_seconds: 1040, is_preview: false },
      { id: 'les-wd-06', section_id: 'sec-wd-02', course_id: 'course-002', title: 'Fetch API & Promises', type: 'video', order_index: 2, duration_seconds: 960, is_preview: false },
    ],
  },
  {
    id: 'sec-wd-03',
    course_id: 'course-002',
    title: 'React.js Deep Dive',
    order_index: 2,
    lessons: [
      { id: 'les-wd-07', section_id: 'sec-wd-03', course_id: 'course-002', title: 'Components & Props', type: 'video', order_index: 0, duration_seconds: 990, is_preview: false },
      { id: 'les-wd-08', section_id: 'sec-wd-03', course_id: 'course-002', title: 'State & useEffect Hook', type: 'video', order_index: 1, duration_seconds: 1120, is_preview: false },
    ],
  },
];

// ── Demo courses ───────────────────────────────────────────
export const DEMO_COURSES: Course[] = [
  {
    id: 'course-001',
    instructor_id: 'demo-instructor-001',
    instructor_name: 'Priya Sharma',
    category_name: 'Programming',
    title: 'Python Programming — Zero to Hero',
    slug: 'python-programming',
    description: 'Master Python from the very basics to advanced topics. Build real-world projects including a web scraper, REST API, and data visualizer. Perfect for absolute beginners and those looking to level up their Python skills. This course covers everything from setting up your environment, Python syntax, data structures, OOP, file handling, all the way to three complete end-to-end projects you can add to your portfolio.',
    short_description: 'Learn Python from scratch and build real-world projects.',
    price: 2999,
    currency: 'INR',
    level: 'beginner',
    language: 'English / Tamil',
    status: 'published',
    is_free: false,
    duration_hours: 32,
    total_lessons: 42,
    total_students: 218,
    avg_rating: 4.8,
    total_reviews: 87,
    requirements: ['Basic computer knowledge — no prior coding needed', 'A Windows, Mac or Linux computer with internet access', 'Willingness to practise daily — 1 hour a day is enough'],
    what_you_learn: [
      'Set up Python and write your first program',
      'Variables, data types, strings, and operators',
      'Lists, tuples, dictionaries and sets',
      'Control flow — if/else, for loops, while loops',
      'Functions, scope, and lambda expressions',
      'Object-oriented programming — classes and inheritance',
      'File handling, JSON and CSV processing',
      'Exception handling and debugging',
      'Build a web scraper with Requests + BeautifulSoup',
      'Create a REST API with Flask',
      'Data analysis and visualisation with Pandas',
      'Deploy your project and add it to your portfolio',
    ],
    tags: ['python', 'programming', 'beginner'],
    sections: DEMO_SECTIONS_PYTHON,
    created_at: '2024-02-10T08:00:00Z',
    updated_at: '2024-08-01T10:00:00Z',
  },
  {
    id: 'course-002',
    instructor_id: 'demo-instructor-001',
    instructor_name: 'Priya Sharma',
    category_name: 'Web Development',
    title: 'Full Stack Web Development',
    slug: 'web-development',
    description: 'Build complete web applications from scratch using HTML, CSS, JavaScript, React and Node.js. Deploy your projects to the cloud and build a professional portfolio.',
    short_description: 'Build complete web apps with React and Node.js.',
    price: 3999,
    currency: 'INR',
    level: 'intermediate',
    language: 'English / Tamil',
    status: 'published',
    is_free: false,
    duration_hours: 48,
    total_lessons: 58,
    total_students: 175,
    avg_rating: 4.7,
    total_reviews: 62,
    requirements: ['Basic HTML/CSS knowledge helpful', 'A computer with internet access'],
    what_you_learn: [
      'HTML5, CSS3 and Flexbox/Grid',
      'JavaScript ES6+ fundamentals',
      'React.js and component architecture',
      'Node.js and Express REST APIs',
      'MySQL database integration',
      'Deploy to Vercel & Render',
    ],
    tags: ['html', 'css', 'javascript', 'react', 'nodejs'],
    sections: DEMO_SECTIONS_WEBDEV,
    created_at: '2024-03-05T08:00:00Z',
    updated_at: '2024-09-10T10:00:00Z',
  },
  {
    id: 'course-003',
    instructor_id: 'demo-instructor-001',
    instructor_name: 'Priya Sharma',
    category_name: 'Database',
    title: 'Database Design & SQL Mastery',
    slug: 'database-sql',
    description: 'Learn relational database design, SQL querying, indexing and optimisation. Work with MySQL and PostgreSQL in real projects. Covers everything from SELECT basics to advanced stored procedures.',
    short_description: 'Master SQL and database design for real-world applications.',
    price: 1999,
    currency: 'INR',
    level: 'beginner',
    language: 'English / Tamil',
    status: 'published',
    is_free: false,
    duration_hours: 20,
    total_lessons: 28,
    total_students: 134,
    avg_rating: 4.6,
    total_reviews: 41,
    requirements: ['Basic computer knowledge'],
    what_you_learn: [
      'Relational database concepts',
      'SQL SELECT, JOIN, GROUP BY',
      'Database normalisation (1NF–3NF)',
      'Indexes and query optimisation',
      'Stored procedures and triggers',
    ],
    tags: ['sql', 'mysql', 'database'],
    sections: [],
    created_at: '2024-04-20T08:00:00Z',
    updated_at: '2024-09-01T10:00:00Z',
  },
  {
    id: 'course-004',
    instructor_id: 'demo-instructor-001',
    instructor_name: 'Priya Sharma',
    category_name: 'Security',
    title: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity',
    description: 'Understand modern security threats, ethical hacking basics, network security and how to protect web applications from common vulnerabilities like SQL injection, XSS and CSRF.',
    short_description: 'Learn to protect systems and understand security threats.',
    price: 2499,
    currency: 'INR',
    level: 'intermediate',
    language: 'English',
    status: 'published',
    is_free: false,
    duration_hours: 26,
    total_lessons: 34,
    total_students: 98,
    avg_rating: 4.9,
    total_reviews: 29,
    requirements: ['Basic networking knowledge', 'Familiarity with command line'],
    what_you_learn: [
      'OWASP Top 10 vulnerabilities',
      'Network scanning with Nmap',
      'SQL injection & XSS defense',
      'Password hashing and JWT security',
      'Basic penetration testing',
    ],
    tags: ['security', 'ethical hacking', 'networking'],
    sections: [],
    created_at: '2024-05-12T08:00:00Z',
    updated_at: '2024-09-15T10:00:00Z',
  },
];

// ── Student enrollments ────────────────────────────────────
export const DEMO_ENROLLMENTS: Enrollment[] = [
  {
    enrollment_id: 'enr-001',
    course_id: 'course-001',
    title: 'Python Programming — Zero to Hero',
    slug: 'python-programming',
    instructor_name: 'Priya Sharma',
    total_lessons: 42,
    completed_lessons: 17,
    completion_percent: 40,
    enrolled_at: '2024-07-15T10:00:00Z',
    last_activity: '2024-09-28T14:32:00Z',
    status: 'active',
  },
  {
    enrollment_id: 'enr-002',
    course_id: 'course-002',
    title: 'Full Stack Web Development',
    slug: 'web-development',
    instructor_name: 'Priya Sharma',
    total_lessons: 58,
    completed_lessons: 58,
    completion_percent: 100,
    enrolled_at: '2024-05-01T10:00:00Z',
    last_activity: '2024-08-20T11:00:00Z',
    status: 'completed',
  },
  {
    enrollment_id: 'enr-003',
    course_id: 'course-003',
    title: 'Database Design & SQL Mastery',
    slug: 'database-sql',
    instructor_name: 'Priya Sharma',
    total_lessons: 28,
    completed_lessons: 0,
    completion_percent: 0,
    enrolled_at: '2024-09-20T08:00:00Z',
    status: 'active',
  },
];

// ── Student stats ──────────────────────────────────────────
export const DEMO_STUDENT_STATS = {
  total_enrolled: 3,
  in_progress: 1,
  completed: 1,
};

// ── Student payments ───────────────────────────────────────
export const DEMO_PAYMENTS: Payment[] = [
  {
    id: 'pay-001',
    amount: 3999,
    currency: 'INR',
    status: 'completed',
    razorpay_payment_id: 'pay_demo_MXk9a1',
    course_title: 'Full Stack Web Development',
    course_slug: 'web-development',
    created_at: '2024-05-01T10:00:00Z',
  },
  {
    id: 'pay-002',
    amount: 2999,
    currency: 'INR',
    status: 'completed',
    razorpay_payment_id: 'pay_demo_PQr3b7',
    course_title: 'Python Programming — Zero to Hero',
    course_slug: 'python-programming',
    created_at: '2024-07-15T10:00:00Z',
  },
  {
    id: 'pay-003',
    amount: 1999,
    currency: 'INR',
    status: 'completed',
    razorpay_payment_id: 'pay_demo_Yz8c2k',
    course_title: 'Database Design & SQL Mastery',
    course_slug: 'database-sql',
    created_at: '2024-09-20T08:00:00Z',
  },
];

// ── Instructor stats ───────────────────────────────────────
export const DEMO_INSTRUCTOR_STATS = {
  total_courses: 4,
  total_students: 625,
  total_revenue: 158750,
  avg_rating: 4.75,
};

// ── Instructor courses list ────────────────────────────────
export const DEMO_INSTRUCTOR_COURSES = [
  {
    id: 'course-001',
    title: 'Python Programming — Zero to Hero',
    slug: 'python-programming',
    status: 'published',
    total_students: 218,
    avg_rating: 4.8,
    total_lessons: 42,
    revenue: 62782,
  },
  {
    id: 'course-002',
    title: 'Full Stack Web Development',
    slug: 'web-development',
    status: 'published',
    total_students: 175,
    avg_rating: 4.7,
    total_lessons: 58,
    revenue: 54925,
  },
  {
    id: 'course-003',
    title: 'Database Design & SQL Mastery',
    slug: 'database-sql',
    status: 'published',
    total_students: 134,
    avg_rating: 4.6,
    total_lessons: 28,
    revenue: 26766,
  },
  {
    id: 'course-004',
    title: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity',
    status: 'draft',
    total_students: 98,
    avg_rating: 4.9,
    total_lessons: 34,
    revenue: 14277,
  },
];

// ── Instructor — per-course student analytics ──────────────
export const DEMO_COURSE_STUDENTS = [
  { id: 'u1', name: 'Arjun Mehta',    email: 'arjun@demo.com',   enrolled: '15 Jul 2024', completed: 17, total: 42, pct: 40  },
  { id: 'u2', name: 'Divya Rajan',    email: 'divya@demo.com',   enrolled: '20 Jun 2024', completed: 42, total: 42, pct: 100 },
  { id: 'u3', name: 'Karthik Selvam', email: 'karthik@demo.com', enrolled: '01 Aug 2024', completed: 8,  total: 42, pct: 19  },
  { id: 'u4', name: 'Sneha Pillai',   email: 'sneha@demo.com',   enrolled: '12 Aug 2024', completed: 25, total: 42, pct: 60  },
  { id: 'u5', name: 'Rohit Kumar',    email: 'rohit@demo.com',   enrolled: '01 Sep 2024', completed: 0,  total: 42, pct: 0   },
  { id: 'u6', name: 'Aishwarya Nair', email: 'aish@demo.com',    enrolled: '10 Sep 2024', completed: 5,  total: 42, pct: 12  },
];

// ── Progress map (lessonId → completed) for demo student ──
export const DEMO_PROGRESS_MAP: Record<string, boolean> = {
  'les-py-01': true, 'les-py-02': true, 'les-py-03': true,
  'les-py-04': true, 'les-py-05': true, 'les-py-06': true,
  'les-py-07': true, 'les-py-08': true, 'les-py-09': true,
};
