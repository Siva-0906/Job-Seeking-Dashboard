import { Job, JobSeeker, Employer, Admin, Application } from '../types';

// Mock Users
export const mockJobSeekers: JobSeeker[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'jobSeeker',
    skills: ['JavaScript', 'React', 'Node.js'],
    savedJobs: ['1', '3'],
    appliedJobs: ['2'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    role: 'jobSeeker',
    skills: ['Python', 'Data Analysis', 'SQL'],
    savedJobs: ['4'],
    appliedJobs: ['1', '5'],
    createdAt: new Date('2023-02-20')
  }
];

export const mockEmployers: Employer[] = [
  {
    id: '1',
    name: 'Tech Innovations Inc.',
    email: 'hr@techinnovations.com',
    role: 'employer',
    company: 'Tech Innovations Inc.',
    industry: 'Software Development',
    jobs: ['1', '2'],
    createdAt: new Date('2022-11-05')
  },
  {
    id: '2',
    name: 'Marketing Masters',
    email: 'careers@marketingmasters.com',
    role: 'employer',
    company: 'Marketing Masters',
    industry: 'Marketing',
    jobs: ['3'],
    createdAt: new Date('2022-12-10')
  },
  {
    id: '3',
    name: 'Data Dynamics',
    email: 'jobs@datadynamics.com',
    role: 'employer',
    company: 'Data Dynamics',
    industry: 'Data Science',
    jobs: ['4', '5'],
    createdAt: new Date('2023-01-20')
  }
];

export const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@jobboard.com',
    role: 'admin',
    createdAt: new Date('2022-10-01')
  }
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Innovations Inc.',
    employerId: '1',
    location: 'San Francisco, CA (Remote)',
    description: 'We are looking for an experienced Frontend Developer proficient in React to join our team. You will be responsible for developing user interface components and implementing them following well-known React workflows.',
    requirements: [
      'Strong proficiency in JavaScript and TypeScript',
      '3+ years experience with React',
      'Experience with responsive design',
      'Understanding of Redux and state management'
    ],
    type: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD'
    },
    benefits: [
      'Health insurance',
      'Remote work options',
      'Flexible hours',
      'Professional development budget'
    ],
    applicationDeadline: new Date('2025-11-30'),
    status: 'active',
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-15')
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'Tech Innovations Inc.',
    employerId: '1',
    location: 'Austin, TX',
    description: 'Join our backend team to develop scalable and maintainable server-side applications. You will work with technologies like Node.js, Express, and MongoDB.',
    requirements: [
      'Strong knowledge of Node.js and Express',
      'Experience with database design and ORM tools',
      'Understanding of RESTful APIs',
      'Knowledge of authentication and authorization protocols'
    ],
    type: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      'Stock options',
      '401(k) matching'
    ],
    applicationDeadline: new Date('2025-12-15'),
    status: 'active',
    createdAt: new Date('2025-10-10'),
    updatedAt: new Date('2025-10-10')
  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    company: 'Marketing Masters',
    employerId: '2',
    location: 'Chicago, IL (Hybrid)',
    description: 'We are seeking a Digital Marketing Specialist to develop and implement marketing strategies across digital channels to increase brand awareness and drive customer acquisition.',
    requirements: [
      'Experience with SEO/SEM campaigns',
      'Proficiency with Google Analytics and marketing automation tools',
      'Knowledge of content marketing strategies',
      'Excellent analytical and communication skills'
    ],
    type: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 65000,
      max: 85000,
      currency: 'USD'
    },
    benefits: [
      'Healthcare benefits',
      'Hybrid work environment',
      'Professional development opportunities',
      'Company events'
    ],
    applicationDeadline: new Date('2025-12-10'),
    status: 'active',
    createdAt: new Date('2025-10-05'),
    updatedAt: new Date('2025-10-05')
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Data Dynamics',
    employerId: '3',
    location: 'Remote',
    description: 'Join our data science team to analyze large datasets and develop machine learning models to solve complex business problems and drive data-informed decisions.',
    requirements: [
      'Advanced degree in Data Science, Statistics, or related field',
      'Experience with Python and R',
      'Knowledge of machine learning algorithms',
      'Experience with data visualization tools'
    ],
    type: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    benefits: [
      'Fully remote position',
      'Comprehensive benefits package',
      'Continuous learning programs',
      'Flexible work hours'
    ],
    applicationDeadline: new Date('2025-11-25'),
    status: 'active',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-01')
  },
  {
    id: '5',
    title: 'Data Engineer',
    company: 'Data Dynamics',
    employerId: '3',
    location: 'Boston, MA',
    description: 'We are looking for a Data Engineer to build and optimize our data pipeline infrastructure and ensure efficient data processing and storage solutions.',
    requirements: [
      'Strong SQL knowledge and experience with database design',
      'Experience with big data technologies like Hadoop, Spark, or Kafka',
      'Programming skills in Python or Java',
      'Understanding of data modeling and ETL processes'
    ],
    type: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 100000,
      max: 130000,
      currency: 'USD'
    },
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Retirement plan',
      'Flexible schedule'
    ],
    applicationDeadline: new Date('2025-12-20'),
    status: 'active',
    createdAt: new Date('2025-10-08'),
    updatedAt: new Date('2025-10-08')
  },
  {
    id: '6',
    title: 'UX/UI Designer',
    company: 'Tech Innovations Inc.',
    employerId: '1',
    location: 'New York, NY (Remote)',
    description: 'Join our design team to create intuitive and engaging user experiences for our digital products. You will work closely with developers and product managers to bring concepts to life.',
    requirements: [
      'Portfolio demonstrating UX/UI design skills',
      'Experience with design tools like Figma or Adobe XD',
      'Understanding of user-centered design principles',
      'Ability to create wireframes, prototypes, and user flows'
    ],
    type: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 85000,
      max: 110000,
      currency: 'USD'
    },
    benefits: [
      'Healthcare coverage',
      'Remote work flexibility',
      'Creative environment',
      'Professional growth opportunities'
    ],
    applicationDeadline: new Date('2025-12-05'),
    status: 'active',
    createdAt: new Date('2025-10-12'),
    updatedAt: new Date('2025-10-12')
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '2',
    seekerId: '1',
    resume: 'resume_alexjohnson.pdf',
    coverLetter: 'I am excited to apply for the Backend Engineer position...',
    status: 'pending',
    submittedAt: new Date('2025-10-18'),
    updatedAt: new Date('2025-10-18')
  },
  {
    id: '2',
    jobId: '1',
    seekerId: '2',
    resume: 'resume_jamiesmith.pdf',
    coverLetter: 'With my experience in frontend development...',
    status: 'reviewed',
    submittedAt: new Date('2025-10-17'),
    updatedAt: new Date('2025-10-19')
  },
  {
    id: '3',
    jobId: '5',
    seekerId: '2',
    resume: 'resume_jamiesmith.pdf',
    coverLetter: 'I believe my skills in data analysis make me a good fit...',
    status: 'shortlisted',
    submittedAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-20')
  }
];

// All users combined for authentication
export const allUsers = [
  ...mockJobSeekers,
  ...mockEmployers,
  ...mockAdmins
];