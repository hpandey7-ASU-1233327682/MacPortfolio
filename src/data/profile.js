// ─────────────────────────────────────────────────────────────
//  EVERYTHING PERSONAL LIVES IN THIS FILE.
//  Edit the text here and the whole desktop updates.
//  Content is aligned with the resume in /Resume.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Hemakshi Pandey',
  firstName: 'Hemakshi',
  handle: 'hemakshi',
  title: 'Software Engineer',
  tagline: 'I build mobile apps, backend systems and AI-powered products.',
  location: 'Tempe, Arizona',
  email: 'developer8hema@gmail.com',

  links: {
    github: 'https://github.com/hpandey7-ASU-1233327682',
    linkedin: 'https://linkedin.com/in/pandey8engineer/',
  },

  // Neutral-named copy of the resume PDF (the originals live in /Resume, which is not shipped).
  resumePdf: '/Resume/Hemakshi_Pandey_Resume.pdf',

  summary:
    'Software engineer with an MS in Software Engineering from Arizona State University. I build native iOS and Android apps and the backend services behind them.',

  achievement: '5× hackathon winner (2026)',
};

export const notes = [
  {
    id: 'about',
    title: 'About me',
    body: [
      "Hi, I'm Hemakshi. I grew up in New Delhi and now live in Tempe, Arizona, where I finished my MS in Software Engineering at ASU with a 4.00 GPA and distinction.",
      'At MapmyIndia I worked on a fleet-tracking platform: the Locate Driver iOS app, the Locate Android app, and 30+ C#/.NET backend services processing geospatial records for 150,000+ vehicles a day.',
      'I like the full path from a database row to a pixel on a phone, and I like it best when the thing actually ships.',
    ],
  },
  {
    id: 'now',
    title: 'What I work on',
    body: [
      'Mobile: Swift, SwiftUI and Swift Concurrency on iOS; Kotlin, Jetpack Compose and Coroutines on Android; MVVM with the Repository pattern on both.',
      'Backend: C# and .NET, Java and Spring Boot, SQL Server, Redis and AWS.',
      'AI: LLMs, RAG, agents, tool calling and MCP, and day-to-day AI-assisted development with Claude Code.',
    ],
  },
  {
    id: 'beyond',
    title: 'Beyond the code',
    body: [
      '5× hackathon winner in 2026: DevHacks, Innovation Hacks, HackAZona (Microsoft track), DataHacks UCSD and the UC Berkeley AI Hackathon.',
    ],
  },
];

export const collections = {
  projects: [
    {
      id: 'taskful',
      kind: 'mobile',
      title: 'Taskful',
      subtitle: 'Native iOS daily planner',
      meta: 'Apr – May 2026 · Swift, SwiftUI',
      summary: 'A daily planner built natively in SwiftUI with Today, Upcoming and Search tabs.',
      bullets: [
        'Works offline: tasks and many-to-many tags are modeled in SwiftData, search runs across 4 filters inside the database using Predicate queries, and every task action survives app restarts.',
        'Reminders with 6 lead-time options through UserNotifications, rescheduled when a task is edited and cancelled when it is completed or deleted.',
        'Reminder logic validated with 39 unit tests in Swift Testing.',
      ],
      tags: ['Swift', 'SwiftUI', 'SwiftData', 'UserNotifications', 'Swift Testing'],
      links: [{ label: 'Code', href: 'https://github.com/hpandey7-ASU-1233327682/Taskful' }],
    },
    {
      id: 'shoply',
      kind: 'mobile',
      title: 'Shoply',
      subtitle: 'Android shopping app',
      meta: 'Dec 2025 – Jan 2026 · Kotlin, Jetpack Compose',
      summary:
        'A complete shopping flow (search, category filters, sorting, wishlist, cart, checkout and order tracking) over a catalog of 190+ products.',
      bullets: [
        'Kotlin and Jetpack Compose MVVM app on a Retrofit REST client, with cart, wishlist and orders persisted locally in Room.',
        'All money is modeled as integer cents and each order is placed in a single Room transaction, so totals stay accurate and placement is atomic.',
        '17 passing unit tests.',
      ],
      tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Retrofit', 'Room'],
      links: [{ label: 'Code', href: 'https://github.com/hpandey7-ASU-1233327682/Shoply' }],
    },
    {
      id: 'learning-platform',
      kind: 'project',
      title: 'Personalized Learning Platform',
      subtitle: 'AI-powered adaptive learning',
      meta: 'ASU capstone · Jan – May 2026',
      summary:
        'Led a 6-member Agile team across 6 sprints to build an AI-powered learning platform for an external sponsor, MyEdMaster LLC.',
      bullets: [
        'Delivered assessment, tutor-chat and adaptive learning-path workflows with Django REST Framework, React, MySQL and Docker.',
        'Designed the adaptive workflow that turns diagnostic assessment results into personalized course plans, with formative assessments, targeted feedback and remediation.',
        "Presented in person at ASU's Innovation Showcase.",
      ],
      tags: ['Django REST', 'React', 'MySQL', 'Docker', 'Agile'],
      links: [
        {
          label: 'Poster',
          href: 'https://drive.google.com/file/d/1F7_2Wa0oQRZOe1kDde4rW_62yMYFcExd/view?usp=sharing',
        },
      ],
    },
    {
      id: 'face-recognition',
      kind: 'project',
      title: 'Elastic Face Recognition',
      subtitle: 'Autoscaling multi-tier app on AWS',
      meta: 'Academic project · Oct – Nov 2025',
      summary:
        'A multi-tier cloud application on AWS EC2, S3 and SQS that decouples the web tier from the application tier.',
      bullets: ['Custom autoscaling controller that scales up to 15 instances based on queue depth.'],
      tags: ['AWS EC2', 'S3', 'SQS', 'Autoscaling'],
      links: [],
    },
  ],

  hackathons: [
    {
      id: 'meetflow',
      kind: 'hackathon',
      photo: 'devhacks',
      award: 'Winner',
      title: 'MeetFlow',
      subtitle: 'Meetings in, assigned tasks out',
      meta: 'DevHacks 2026',
      summary:
        'An agentic pipeline that turns what was said in a meeting into tasks that land with the right people in the tools they already use.',
      bullets: ['Multi-step agent workflow built around the Claude API.', 'Integrates Jira, GitHub, Slack and Gmail.'],
      tags: ['Python', 'FastAPI', 'Claude API', 'Agents'],
      links: [],
    },
    {
      id: 'rxrefactor',
      kind: 'hackathon',
      photo: 'innovation-hacks',
      award: 'Winner · Anton RX track',
      title: 'RxRefactor',
      subtitle: 'AI-powered medical benefit drug policy tracker',
      meta: 'Innovation Hacks 2.0 · 2026',
      summary:
        'Clinicians ask a plain-English coverage question and get a sourced answer across major US payers, instead of hunting through hundreds of pages of policy PDFs.',
      bullets: [
        'Two tiers: instant structured lookups in SQLite, and RAG with Claude (ChromaDB over about 6,100 policy chunks) for nuanced questions, with cited answers.',
        'Scrapes and parses payer policy PDFs, covering BCBS, Cigna, UnitedHealthcare, Priority Health and UPMC.',
        'Kept a complex query to about $0.01 by using Claude Haiku and 10-minute caching.',
      ],
      tags: ['RAG', 'Claude', 'FastAPI', 'Next.js', 'ChromaDB', 'SQLite'],
      links: [{ label: 'Devpost', href: 'https://devpost.com/software/rxrefactor' }],
    },
    {
      id: 'distill',
      kind: 'hackathon',
      photo: 'hackazona',
      award: 'Winner · Microsoft track',
      title: 'Distill',
      subtitle: 'Real-time speaker translation',
      meta: 'HackAZona · Apr 2026',
      summary:
        'A local-first Chrome extension that translates speech in real time across YouTube, Google Meet and microphone audio.',
      bullets: [
        'Shipped with a FastAPI WebSocket backend for low-latency real-time speech translation.',
        'Multi-language translation, voice cloning and ASL accessibility features for live and passive audio.',
      ],
      tags: ['Chrome extension', 'FastAPI', 'WebSocket', 'Voice cloning', 'ASL'],
      links: [],
    },
    {
      id: 'nereus',
      kind: 'hackathon',
      photo: 'datahacks',
      award: 'Winner · Best Use of Scripps Data',
      title: 'Nereus',
      subtitle: 'Marine heatwave intelligence assistant',
      meta: 'DataHacks 2026 · UC San Diego',
      summary:
        'A voice-driven 3D platform that acts as a multilingual AI oceanographer, answering questions about marine heatwaves with answers grounded in ocean and climate data.',
      bullets: [
        'Explore heatwave events on a 3D globe, compare past events and generate PDF intelligence briefings.',
        'FastAPI backend with a local RAG knowledge base (sentence-transformers and FAISS), Claude Haiku for answers and Gemini as a fallback.',
        'Next.js, React and TypeScript frontend with ElevenLabs voice. I led development end to end, backend and frontend.',
      ],
      tags: ['RAG', 'FAISS', 'Claude', 'Gemini', 'FastAPI', 'Next.js', 'ElevenLabs'],
      links: [{ label: 'Devpost', href: 'https://devpost.com/software/git-push-to-green' }],
    },
    {
      id: 'berkeley-ai',
      kind: 'hackathon',
      photo: 'berkeley-ai',
      award: 'Winner · Best Use of the Agentverse (Fetch.ai)',
      title: 'Fetch Health',
      subtitle: 'AI assistant for organ transplant',
      meta: 'UC Berkeley AI Hackathon · 2026',
      summary:
        'A safe educational and simulation platform that explains donor-recipient matching, built as an intake and matching simulator for hospital staff.',
      bullets: [
        'A master orchestrator coordinates local agents for documents, imaging, retrieval, compatibility scoring, ranking and transport risk, with Fetch.ai agents as the public routing layer.',
        'Redis holds state, memory and traces, and compact context capsules pass key facts between agents.',
        'Returns the top three candidates with compatibility, risk and missing-information warnings, plus voice debriefs.',
      ],
      tags: ['Agents', 'Fetch.ai', 'Redis', 'Claude', 'Deepgram', 'React'],
      links: [{ label: 'Devpost', href: 'https://devpost.com/software/fetch-health' }],
    },
  ],

  experience: [
    {
      id: 'mapmyindia',
      kind: 'work',
      logo: '/images/logos/mapmyindia.webp',
      logoBg: '#10274a',
      title: 'Software Engineer',
      subtitle: 'MapmyIndia',
      meta: 'Apr 2023 – Apr 2024',
      summary: 'iOS, Android and backend work on a fleet-tracking and transportation platform.',
      bullets: [
        'Reduced API-to-UI latency by 35% for real-time vehicle and trip updates in the Locate Driver iOS app by optimizing Swift data flows, REST integration and state management with MVVM and the Repository pattern.',
        'Built Swift/SwiftUI features for trip assignments, consignment management and route tracking, integrated with REST APIs, so drivers could complete trip workflows end to end.',
        'Shipped 12+ production features for real-time vehicle tracking and fleet management in the Locate Android app with Kotlin and Jetpack Compose, using MVVM and the Repository pattern.',
        'Delivered 30+ backend microservices and REST APIs in C#/.NET, processing geospatial records of 150,000+ vehicles daily across a distributed transportation platform.',
        'Improved SQL Server performance by refactoring stored procedures and optimizing indexing, making fleet-analytics reporting 65% faster.',
        'Triaged and resolved production incidents across backend services, APIs and data pipelines; root-cause analysis reduced recurring failures by 45%.',
      ],
      tags: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'C#', '.NET', 'SQL Server', 'MVVM'],
      links: [],
    },
  ],

  education: [
    {
      id: 'asu',
      kind: 'education',
      logo: '/images/logos/asu.webp',
      logoBg: '#ffffff',
      title: 'MS, Software Engineering',
      subtitle: 'Arizona State University',
      meta: 'May 2026 · GPA 4.00 / 4.00, Distinction',
      summary: 'Engineering Graduate Fellowship recipient.',
      bullets: ['Relevant coursework: Cloud Computing, Natural Language Processing, Web Application Programming.'],
      tags: ['Cloud', 'NLP', 'Web'],
      links: [],
    },
    {
      id: 'ggsipu',
      kind: 'education',
      logo: '/images/logos/ggsipu.webp',
      logoBg: '#ffffff',
      title: 'B.Tech, Computer Science',
      subtitle: 'Guru Gobind Singh Indraprastha University',
      meta: 'Jun 2021 · GPA 3.98 / 4.00',
      summary: 'Undergraduate degree in New Delhi.',
      bullets: [
        'Relevant coursework: Computer Networks, Operating Systems, Database Management, Data Structures, Machine Learning, AI.',
      ],
      tags: ['Computer science'],
      links: [],
    },
  ],
};

export const publication = {
  title: 'Ensem SLDR: Classification of Cybercrime using Ensemble Learning Technique',
  href: 'https://www.mecs-press.org/ijcnis/ijcnis-v14-n1/v14n1-7.html',
};

// What the Resume window prints, in the order of the PDF.
export const resumeProjectIds = ['taskful', 'shoply', 'learning-platform', 'face-recognition'];
export const resumeExperienceIds = ['mapmyindia'];
export const achievements = [
  '5× Hackathon Winner (2026): DevHacks, Innovation Hacks, HackAZona (Microsoft Track), DataHacks UCSD, UC Berkeley AI Hackathon.',
];

export const folderMeta = [
  { id: 'projects', label: 'Projects', icon: 'Code' },
  { id: 'hackathons', label: 'Hackathons', icon: 'Trophy' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
];

export const skills = [
  { group: 'Languages', items: ['Swift', 'Java', 'Kotlin', 'C#', 'Python', 'C++', 'TypeScript', 'JavaScript'] },
  { group: 'Mobile & frameworks', items: ['SwiftUI', 'CoreData', 'Jetpack Compose', 'Android SDK', 'MVVM', 'Swift Concurrency', 'Kotlin Coroutines'] },
  { group: 'Backend & frameworks', items: ['Spring Boot', '.NET', 'RESTful APIs', 'Distributed Systems', 'Microservices'] },
  { group: 'Cloud/DevOps & databases', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'MS SQL Server', 'MongoDB', 'Redis'] },
  { group: 'AI / ML', items: ['LLMs', 'RAG', 'Prompt Engineering', 'AI Agents', 'Tool Calling', 'MCP', 'PyTorch', 'AI-assisted Development (Claude Code)'] },
];

// Gallery. `thumb` is the small grid image, `src` the full-size one (both are
// web-sized copies; originals live in /Images). `pos` is the crop focus for
// thumbnails (the lightbox always shows the whole picture).
const hk = (name) => ({ src: `/images/hackathons/${name}.webp`, thumb: `/images/hackathons/${name}-thumb.webp` });

export const photos = [
  {
    id: 'devhacks',
    album: 'Hackathons',
    ...hk('devhacks'),
    caption: 'DevHacks 2026',
    detail: 'Winner · MeetFlow',
    alt: 'DevHacks winner poster: three teammates holding the MeetFlow prize cheque',
    pos: '50% 82%',
  },
  {
    id: 'innovation-hacks',
    album: 'Hackathons',
    ...hk('innovation-hacks'),
    caption: 'Innovation Hacks 2026',
    detail: 'Winner · RxRefactor',
    alt: 'The RxRefactor team holding their monitor prizes in front of the project slide',
    pos: '50% 60%',
  },
  {
    id: 'hackazona',
    album: 'Hackathons',
    ...hk('hackazona'),
    caption: 'HackAZona 2026',
    detail: 'Winner · Distill (Microsoft track)',
    alt: 'Team on stage holding the HackAZona 2026 winner cheque',
    pos: '40% 40%',
  },
  {
    id: 'datahacks',
    album: 'Hackathons',
    ...hk('datahacks'),
    caption: 'DataHacks 2026',
    detail: 'Winner · Nereus',
    alt: 'Team on stage in front of the DataHacks 2026 sponsor backdrop',
    pos: '50% 55%',
  },
  {
    id: 'berkeley-ai',
    album: 'Hackathons',
    ...hk('berkeley-ai'),
    caption: 'UC Berkeley AI Hackathon',
    detail: 'Winner · Fetch Health',
    alt: 'Team posing in front of Wheeler Hall at UC Berkeley',
    pos: '50% 78%',
  },
  {
    id: 'me-now',
    album: 'Portraits',
    src: '/images/hema-1.webp',
    thumb: '/images/hema-1.webp',
    caption: 'Hemakshi',
    detail: 'Pixel-art portrait',
    alt: 'Pixel-art portrait of Hemakshi standing in front of her desk setup',
    pos: '50% 30%',
  },
  {
    id: 'me-little',
    album: 'Portraits',
    src: '/images/hema-2.webp',
    thumb: '/images/hema-2.webp',
    caption: 'Little Hemakshi',
    detail: 'Pixel-art portrait',
    alt: 'Pixel-art portrait of a young Hemakshi in uniform holding a microphone',
    pos: '50% 25%',
  },
];

export const photoAlbums = ['All', 'Hackathons', 'Portraits'];

// Portrait that swaps on hover. Files live in /public/images (web-sized copies
// of the originals in /Images). `card` is where the portrait-card crops if the
// frame is a little shorter than the picture; `circle` frames the face for the
// round avatar (size = zoom, pos = background-position).
export const portrait = {
  adult: {
    src: '/images/hema-1.webp',
    alt: 'Pixel-art portrait of Hemakshi standing in front of her desk setup',
    caption: 'Hemakshi',
    card: '50% 50%',
    circle: { size: '260%', pos: '46.4% 8.9%' },
  },
  child: {
    src: '/images/hema-2.webp',
    alt: 'Pixel-art portrait of a young Hemakshi in uniform holding a microphone',
    caption: 'Little Hemakshi',
    card: '50% 65%',
    circle: { size: '227%', pos: '47.9% 6.8%' },
  },
};
