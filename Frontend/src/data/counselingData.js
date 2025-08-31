const counselingData = [
  // Your existing entries...
  {
    id: 'tnea',
    name: 'TNEA (Tamil Nadu Engineering Admissions)',
    shortDescription: 'Counseling for engineering admissions in Tamil Nadu',
    category: 'Engineering',
    eligibility: [
      'Must have passed 10+2 with Physics, Chemistry and Mathematics',
      'Minimum 50% aggregate marks (45% for reserved categories)',
      'Must be a resident of Tamil Nadu (for 85% of seats)'
    ],
    importantDates: [
      { label: 'Application Start', date: 'May 1, 2023' },
      { label: 'Application End', date: 'June 30, 2023' },
      { label: 'Rank List Publication', date: 'July 15, 2023' },
      { label: 'Counseling Starts', date: 'July 20, 2023' }
    ],
    registrationSteps: [
      'Visit the official TNEA portal',
      'Register with personal and academic details',
      'Upload required documents',
      'Pay the application fee',
      'Appear for certificate verification',
      'Participate in counseling rounds'
    ],
    officialLink: 'https://www.tneaonline.org'
  },
  
  // Add these new counseling types:
  
  // ENGINEERING
  {
    id: 'josaa',
    name: 'JoSAA (Joint Seat Allocation Authority)',
    shortDescription: 'Centralized counseling for IITs, NITs, IIITs and GFTIs',
    category: 'Engineering',
    eligibility: [
      'Qualified JEE Main/JEE Advanced',
      'Class 12 with Physics, Chemistry, Mathematics',
      'Minimum 75% marks (65% for SC/ST)'
    ],
    importantDates: [
      { label: 'Registration Start', date: 'June 2023' },
      { label: 'Last Date to Apply', date: 'June 2023' },
      { label: 'First Round Seat Allotment', date: 'July 2023' }
    ],
    registrationSteps: [
      'Register on JoSAA portal',
      'Fill choices of institutes/branches',
      'Lock choices before deadline',
      'Check seat allotment result',
      'Pay seat acceptance fee',
      'Report to allotted institute'
    ],
    officialLink: 'https://josaa.nic.in'
  },

  // MEDICAL
  {
    id: 'neet-ug',
    name: 'NEET UG Counseling',
    shortDescription: 'National Eligibility cum Entrance Test for MBBS/BDS',
    category: 'Medical',
    eligibility: [
      'Qualified NEET-UG',
      'Class 12 with Physics, Chemistry, Biology',
      'Minimum 50% marks (40% for reserved categories)'
    ],
    importantDates: [
      { label: 'Registration Start', date: 'July 2023' },
      { label: 'First Round Allotment', date: 'August 2023' }
    ],
    registrationSteps: [
      'Register on MCC website',
      'Choice filling and locking',
      'Seat allotment result',
      'Reporting to college'
    ],
    officialLink: 'https://mcc.nic.in'
  },

  // AGRICULTURE
  {
    id: 'aicte',
    name: 'AICTE Counseling',
    shortDescription: 'For agriculture and allied science programs',
    category: 'Agriculture',
    eligibility: [
      'Class 12 with PCB/PCM',
      'Minimum 50% marks'
    ],
    importantDates: [
      { label: 'Application Start', date: 'May 2023' },
      { label: 'Last Date', date: 'June 2023' }
    ],
    registrationSteps: [
      'Online registration',
      'Document upload',
      'Choice filling',
      'Seat allotment'
    ],
    officialLink: 'https://aicte-india.org'
  },

  // LAW
  {
    id: 'clat',
    name: 'CLAT Counseling',
    shortDescription: 'Common Law Admission Test for NLUs',
    category: 'Law',
    eligibility: [
      'Class 12 passed',
      'Minimum 45% marks (40% for SC/ST)'
    ],
    importantDates: [
      { label: 'Counseling Start', date: 'June 2023' },
      { label: 'Last Date', date: 'July 2023' }
    ],
    registrationSteps: [
      'Online registration',
      'Payment of counseling fee',
      'Choice filling',
      'Seat allotment'
    ],
    officialLink: 'https://consortiumofnlus.ac.in'
  },

  // ARCHITECTURE
  {
    id: 'nata',
    name: 'NATA Counseling',
    shortDescription: 'National Aptitude Test in Architecture',
    category: 'Architecture',
    eligibility: [
      'Class 12 with Mathematics',
      'Minimum 50% marks'
    ],
    importantDates: [
      { label: 'Registration Start', date: 'April 2023' },
      { label: 'Exam Date', date: 'June 2023' }
    ],
    registrationSteps: [
      'Qualify NATA exam',
      'State-level counseling registration',
      'Document verification',
      'Seat allotment'
    ],
    officialLink: 'https://nata.in'
  },

  // DEFENSE
  {
    id: 'upsee',
    name: 'UPSEE Counseling',
    shortDescription: 'Uttar Pradesh State Entrance Exam',
    category: 'State-Level',
    eligibility: [
      'Class 12 passed',
      'State domicile required for some seats'
    ],
    importantDates: [
      { label: 'Registration', date: 'May 2023' },
      { label: 'Counseling', date: 'July 2023' }
    ],
    registrationSteps: [
      'Online registration',
      'Document upload',
      'Choice filling',
      'Seat allotment'
    ],
    officialLink: 'https://upsee.nic.in'
  },

  // MANAGEMENT
  {
    id: 'cat',
    name: 'CAT Counseling',
    shortDescription: 'Common Admission Test for IIMs and top B-schools',
    category: 'Management',
    eligibility: [
      'Bachelor\'s degree with 50% marks',
      'Valid CAT score'
    ],
    importantDates: [
      { label: 'GD/PI Rounds', date: 'Feb-Mar 2023' },
      { label: 'Final Admission', date: 'April 2023' }
    ],
    registrationSteps: [
      'Appear for CAT',
      'Apply to individual colleges',
      'Group Discussion/Personal Interview',
      'Final admission offer'
    ],
    officialLink: 'https://iimcat.ac.in'
  }
];

export default counselingData;
