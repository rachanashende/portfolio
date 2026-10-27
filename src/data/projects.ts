export type ProjectVisual = 'tracker' | 'water' | 'employees'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  overview: string
  tech: string[]
  contributions: string[]
  implementation: { label: string; detail: string }[]
  note?: string
  visual: ProjectVisual
  /** Pastel accent used for the card and the details modal. */
  accent: { from: string; to: string; ink: string }
}

export const projects: Project[] = [
  {
    id: 'daily-tracker',
    title: 'Daily Tracker',
    tagline: 'Full-stack habit tracking',
    description:
      'A full-stack habit-tracking application with a REST API, a relational data model and a deployable client–server setup.',
    overview:
      'Daily Tracker is a full-stack habit-tracking application. I built its REST APIs, structured the PostgreSQL schema behind them, and organised the codebase into a client and a server that can be deployed.',
    tech: ['React', 'Node.js', 'Express', 'TypeScript', 'Prisma', 'PostgreSQL'],
    contributions: [
      'Designed and built REST APIs using Express.js and Prisma ORM.',
      'Structured the PostgreSQL database schema.',
      'Implemented environment-based configuration.',
      'Organised the application into a deployable client–server architecture.',
      'Prepared the data model and API layer for future AI-powered study recommendations.',
    ],
    implementation: [
      { label: 'Client', detail: 'React front end, organised separately from the server.' },
      { label: 'API', detail: 'REST endpoints built with Express.js.' },
      { label: 'Data', detail: 'PostgreSQL schema accessed through the Prisma ORM.' },
      { label: 'Config', detail: 'Environment-based configuration keeps settings out of the code.' },
    ],
    note: 'AI-powered study recommendations are planned. The data model and API layer are prepared for them, but the feature is not built yet.',
    visual: 'tracker',
    accent: { from: '#efe9ff', to: '#ffe6ef', ink: '#6f58d9' },
  },
  {
    id: 'water-dashboard',
    title: 'Water Usage & Conservation Dashboard',
    tagline: 'Calculator + conservation tips',
    description:
      'A water usage calculator and conservation dashboard for households and farms, with irrigation estimates and personalised tips.',
    overview:
      'A water usage calculator and conservation dashboard. It estimates water use for crops and households, works out irrigation requirements and monthly water bills, and suggests ways to save water.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    contributions: [
      'Built a crop- and household-based water calculator.',
      'Estimated irrigation requirements and monthly water bills.',
      'Provided personalised water conservation recommendations.',
      'Designed an irrigation estimator that considers crop type and field size.',
    ],
    implementation: [
      { label: 'Stack', detail: 'Plain HTML, CSS and JavaScript.' },
      { label: 'Inputs', detail: 'Crop type and field size for irrigation, plus household usage.' },
      { label: 'Outputs', detail: 'Irrigation requirement, an estimated monthly water bill and conservation tips.' },
    ],
    visual: 'water',
    accent: { from: '#e3f3ff', to: '#e1f7ee', ink: '#2f7fbf' },
  },
  {
    id: 'employee-management',
    title: 'Employee Management System',
    tagline: 'Desktop CRUD application',
    description:
      'A desktop employee management application with a login, a dashboard, department views and status tracking.',
    overview:
      'A desktop employee management application written in Java with a MySQL database. After signing in, users reach a dashboard where they can look up employee records, view staff by department and track who is active.',
    tech: ['Java', 'MySQL', 'Eclipse'],
    contributions: [
      'Built a Java CRUD application with MySQL.',
      'Implemented a login page and dashboard for authenticated access.',
      'Organised employee information into Employee, Department and Status modules.',
      'Enabled employee record lookup, department-wise staff views and active/inactive status tracking.',
    ],
    implementation: [
      { label: 'Access', detail: 'A login page in front of the dashboard.' },
      { label: 'Modules', detail: 'Employee, Department and Status.' },
      { label: 'Data', detail: 'Create, read, update and delete operations backed by MySQL.' },
      { label: 'Tooling', detail: 'Developed in the Eclipse IDE.' },
    ],
    visual: 'employees',
    accent: { from: '#eeeaff', to: '#f4f2f7', ink: '#6f58d9' },
  },
]
