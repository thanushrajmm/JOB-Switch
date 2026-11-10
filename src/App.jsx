import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  BookOpen,
  CheckSquare,
  Kanban as KanbanIcon,
  Compass,
  Plus,
  Trash2,
  ExternalLink,
  Flame,
  Activity,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FolderPlus,
  ListPlus,
  Edit3,
  Search,
  Sparkles,
  Link as LinkIcon,
  Clock,
  MapPin,
  Briefcase,
  ArrowRight,
  FileText,
  RotateCcw,
  Download,
  Upload,
  Send,
  Loader2,
  GitCommit,
  Globe,
  Printer,
  Sliders,
  Type,
  MoveUp,
  MoveDown,
  Phone,
  Mail,
  Github,
  Linkedin,
  Code,
  Layers,
  HelpCircle
} from 'lucide-react';

// ================= INITIAL STARTER BLUEPRINT (PROPEERS STRUCTURE) =================
const DEFAULT_CURRICULUM = [
  {
    id: 'dom-java-devops',
    title: 'Java Full Stack & Cloud/DevOps Track',
    topics: [
      {
        id: 'top-java-mastery',
        title: 'Java Fundamentals + OOP Interview Mastery',
        sections: [
          {
            id: 'sec-core-basics',
            title: 'Core Java Basics',
            collapsed: false,
            subtopics: [
              { id: 'sub-1', title: 'How Java Runs: JVM, JRE, and JDK Explained', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-2', title: 'Java Data Types & Variables: Primitives vs References', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-3', title: 'Operators in Java: Arithmetic, Logical, and Bitwise', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-4', title: 'Control Flow in Java: if-else, switch, and Loops', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-5', title: 'Methods in Java: Parameters, Return Types, and Overloading', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-6', title: 'Arrays in Java: Declaration, Iteration, and Multidimensional', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-7', title: 'Type Casting and Type Conversion in Java', completed: false, notes: '', notionUrl: '' }
            ]
          },
          {
            id: 'sec-oops',
            title: 'OOPs in Java',
            collapsed: false,
            subtopics: [
              { id: 'sub-8', title: 'Classes, Objects, and Constructors (Default, Parameterized)', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-9', title: 'Inheritance and Method Overriding (@Override)', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-10', title: 'Polymorphism (Compile-time vs Runtime)', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-11', title: 'Encapsulation and Access Modifiers', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-12', title: 'Abstract Classes vs Interfaces', completed: false, notes: '', notionUrl: '' }
            ]
          },
          {
            id: 'sec-exceptions',
            title: 'Exception Handling & Clean Code',
            collapsed: false,
            subtopics: [
              { id: 'sub-13', title: 'Exception Hierarchy (Throwable, Exception, Error)', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-14', title: 'Checked vs Unchecked Exceptions', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-15', title: 'try-catch-finally and try-with-resources', completed: false, notes: '', notionUrl: '' }
            ]
          }
        ]
      },
      {
        id: 'top-spring-backend',
        title: 'Spring Boot, Persistence & Microservices',
        sections: [
          {
            id: 'sec-spring-core',
            title: 'Spring Core & REST Architecture',
            collapsed: false,
            subtopics: [
              { id: 'sub-16', title: 'IoC Container, Bean Scopes, and Lifecycle', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-17', title: 'Spring Data JPA: Solving Hibernate N+1 Query Problem', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-18', title: 'Spring Security 6 & Stateless JWT Filter Chains', completed: false, notes: '', notionUrl: '' },
              { id: 'sub-19', title: 'Kafka Producer-Consumer & Idempotency', completed: false, notes: '', notionUrl: '' }
            ]
          }
        ]
      }
    ]
  }
];

// Curated 1-Click Deep Search Portals (Pre-filtered for India, 1-3 YOE)
const HIRING_PORTALS = [
  {
    name: 'LinkedIn Jobs 24h',
    badge: 'Real-time',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Software%20Engineer%20OR%20Backend%20Engineer&location=India&f_TPR=r86400&f_E=2%2C3',
    desc: 'Pre-filtered: India • Past 24 Hours • Entry/Mid (1-3 YOE)',
    tag: 'All Companies'
  },
  {
    name: 'Naukri.com 24h (1-3 YOE)',
    badge: 'High Volume',
    url: 'https://www.naukri.com/software-engineer-jobs-in-india?experience=2&jobAge=1',
    desc: 'Pre-filtered: Java / Spring Boot • 1-3 YOE • Bengaluru, Chennai, Pune, Hyderabad',
    tag: 'Direct Openings'
  },
  {
    name: 'Instahyre India',
    badge: 'Curated Tech',
    url: 'https://www.instahyre.com/software-engineer-jobs-in-bangalore/',
    desc: 'Zero-spam hiring for vetted product firms & top scaleups in Bengaluru & Hyderabad.',
    tag: 'Product Teams'
  },
  {
    name: 'Hirist.tech (1-3 YOE)',
    badge: 'Startups & Scaleups',
    url: 'https://www.hirist.tech/search?keyword=Software+Engineer&exp=1-3',
    desc: 'Tech-specialized job board with direct recruiter response channels.',
    tag: 'Tech Specialists'
  },
  {
    name: 'Google Jobs India (Today)',
    badge: 'Meta Engine',
    url: 'https://www.google.com/search?ibp=htl;jobs&q=Software+Engineer+1+to+3+years+experience+Bangalore+OR+Hyderabad+OR+Pune+OR+Chennai#htivrt=jobs&htichips=date_posted:today',
    desc: 'Aggregates career site postings across all company portals updated today.',
    tag: 'Career Pages'
  },
  {
    name: 'Cutshort India',
    badge: 'Direct Founder / HR',
    url: 'https://cutshort.io/jobs/software-engineer-jobs',
    desc: 'Direct matchmaking for engineers with product startups in India.',
    tag: 'Direct Chat'
  }
];

const KANBAN_STAGES = [
  { id: 'Applied', label: 'Applied', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: '📨' },
  { id: 'Online Assessment', label: 'OA / Screening', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', icon: '📝' },
  { id: 'Tech Round', label: 'Tech Round', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20', icon: '💻' },
  { id: 'System Design', label: 'System Design', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', icon: '📐' },
  { id: 'Offer Received', label: 'Offer Received 🎉', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: '🎉' },
  { id: 'Rejected', label: 'Rejected', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', icon: '⛔' }
];

// Default Flashcard Deck for SDE (2 YOE Switch)
const DEFAULT_FLASHCARDS = [
  {
    id: 'fc-1',
    domain: 'Core Java & Concurrency',
    question: 'How does HashMap handle collisions internally in Java 8+?',
    answer: 'HashMap uses an array of Node buckets (Node<K,V>[]). When collisions occur via hash(), elements are initially stored in a linked list. In Java 8+, once the bucket exceeds TREEIFY_THRESHOLD (8 items) AND the total table capacity is >= 64, the linked list converts to a Red-Black Tree (TreeNode), reducing worst-case lookup from O(n) to O(log n). If elements decrease below UNTREEIFY_THRESHOLD (6), it transforms back to a linked list.',
    difficulty: 'Medium',
    status: 'review'
  },
  {
    id: 'fc-2',
    domain: 'Core Java & Concurrency',
    question: 'What is the difference between Virtual Threads (Java 21) and Platform Threads?',
    answer: 'Platform threads are 1:1 wrappers around OS kernel threads, each allocating ~1MB of call stack memory. Virtual Threads (Project Loom) are lightweight user-mode threads managed by the JVM runtime, multiplexed M:N onto a small pool of carrier OS threads (ForkJoinPool). When a virtual thread performs blocking I/O, the JVM unmounts it from the carrier thread, allowing other virtual threads to execute without blocking the underlying OS thread.',
    difficulty: 'Hard',
    status: 'review'
  },
  {
    id: 'fc-3',
    domain: 'Spring Boot & Microservices',
    question: 'How do you detect and fix Hibernate N+1 Query Problem in Spring Data JPA?',
    answer: 'N+1 occurs when fetching an entity with lazy relationships triggers 1 initial query for the parent followed by N individual queries for each child.\nSolutions:\n1. JOIN FETCH in JPQL: @Query("SELECT p FROM Parent p JOIN FETCH p.children")\n2. @EntityGraph: Declaratively specifies which associations should be fetched eagerly in a single join query.\n3. @BatchSize(size = 25): Batches child queries into SQL IN clauses (WHERE parent_id IN (?, ?, ...)).',
    difficulty: 'Hard',
    status: 'mastered'
  },
  {
    id: 'fc-4',
    domain: 'Search & Elasticsearch',
    question: 'How does an Inverted Index work and why is Elasticsearch fast for aggregations?',
    answer: 'An inverted index maps terms/tokens to the document IDs containing them (Term -> [Doc1, Doc3]). For aggregations, Elasticsearch uses Doc Values (columnar disk-based data structures on non-text/keyword fields) and Global Ordinals. Instead of reading row by row, it sequentially scans columnar Doc Values in compressed memory, enabling fast aggregation across millions of records (ideal for KPI dashboards).',
    difficulty: 'Medium',
    status: 'mastered'
  },
  {
    id: 'fc-5',
    domain: 'High-Level System Design (HLD)',
    question: 'How do you prevent a Cache Stampede (Thundering Herd) on Redis?',
    answer: '1. Distributed Mutex Lock (Redlock): Only the first worker acquiring the key query fetches from DB while others wait or return stale cache.\n2. Probabilistic Early Expiration (XFetch algorithm): Recomputes the cache item before it actually expires based on query frequency.\n3. Background Asynchronous Refresh: A worker periodically updates the cache before TTL expiration.',
    difficulty: 'Hard',
    status: 'review'
  }
];

// ================= DEFAULT ATS-OPTIMIZED RESUME BLUEPRINT =================
const DEFAULT_RESUME_DATA = {
  header: {
    fullName: 'YOUR NAME',
    location: 'Bengaluru, India',
    phone: '+91 98765 43210',
    email: 'yourname@gmail.com',
    links: [
      { id: 'l-1', label: 'LinkedIn', url: 'https://linkedin.com/in/yourid', icon: 'linkedin' },
      { id: 'l-2', label: 'GitHub', url: 'https://github.com/yourid', icon: 'github' },
      { id: 'l-3', label: 'LeetCode', url: 'https://leetcode.com/yourid', icon: 'code' },
      { id: 'l-4', label: 'Portfolio', url: 'https://yourportfolio.dev', icon: 'globe' }
    ]
  },
  settings: {
    fontFamily: 'serif',
    fontSize: 'base',
    rightLabelSize: 'sm', // 'xs' (10px), 'sm' (11px), 'base' (12px), 'lg' (13.5px)
    margins: 'normal',
    spacing: 'compact' // 'compact' (Strict 1 Page) or 'normal'
  },
  sections: [
    {
      id: 'sec-education',
      title: 'EDUCATION',
      type: 'entries',
      entries: [
        {
          id: 'edu-1',
          primaryTitle: 'National Institute of Technology / University Name',
          primaryRight: '2018 – 2022',
          subTitle: 'Bachelor of Technology in Computer Science & Engineering • CGPA: 8.6 / 10.0',
          subRight: 'Bengaluru, India',
          bullets: []
        }
      ]
    },
    {
      id: 'sec-skills',
      title: 'TECHNICAL SKILLS',
      type: 'skills_grid',
      skillCategories: [
        { label: 'Languages', value: 'Java (17/21), JavaScript/TypeScript, SQL, Python' },
        { label: 'Backend & Frameworks', value: 'Spring Boot, Spring Data JPA, Hibernate, REST APIs, Microservices, Spring Security' },
        { label: 'Databases & Search', value: 'Elasticsearch (Aggregations, Inverted Index), PostgreSQL, MySQL, Redis' },
        { label: 'Frontend', value: 'Vue.js, React.js, D3.js (Interactive Charts & Visualizations), Tailwind CSS' },
        { label: 'Cloud & DevOps', value: 'Docker, Kubernetes Basics, AWS (ECS, S3, RDS), Git, CI/CD GitHub Actions' }
      ]
    },
    {
      id: 'sec-experience',
      title: 'PROFESSIONAL EXPERIENCE',
      type: 'entries',
      entries: [
        {
          id: 'exp-1',
          primaryTitle: 'Software Development Engineer',
          primaryLink: '',
          primaryRight: 'July 2022 – Present',
          subTitle: 'Tech Solutions Pvt. Ltd.',
          subRight: 'Bengaluru, India',
          bullets: [
            'Architected and scaled core backend microservices in Spring Boot handling high transaction throughput across ERP data streams.',
            'Optimized Elasticsearch aggregation queries and index mappings, reducing dashboard query latencies by 42% for 50,000+ daily analytical queries.',
            'Collaborated on cross-functional features with product teams, introducing Redis cache-aside patterns and reducing database load by 35%.'
          ]
        }
      ]
    },
    {
      id: 'sec-projects',
      title: 'KEY PROJECTS',
      type: 'entries',
      entries: [
        {
          id: 'proj-1',
          primaryTitle: 'Real-Time Enterprise KPI Analytics & Dashboard Platform',
          primaryLink: 'https://github.com/yourid/kpi-dashboard',
          primaryRight: 'Spring Boot, Elasticsearch, Vue.js, D3.js',
          subTitle: 'Modular Data Visualization & Custom Widget Engine',
          subRight: '2023 – 2024',
          bullets: [
            'Engineered dynamic widget and dashboard engine allowing enterprise users to assemble custom charts (bar, line, donut, area, geo maps) over live ERP data.',
            'Built real-time metric calculation pipelines using Elasticsearch bucket aggregations to evaluate orders, revenue per distributor, and channel efficiency in sub-120ms.',
            'Constructed modular frontend components with Vue.js and D3.js, handling rendering of 100k+ records without frame drops.'
          ]
        },
        {
          id: 'proj-2',
          primaryTitle: 'Sales Performance Indicator (SPI) & Inventory Decision Engine',
          primaryLink: 'https://github.com/yourid/spi-decision-engine',
          primaryRight: 'Spring Boot, Elasticsearch, React.js, Redis',
          subTitle: 'Predictive Demand & Procurement Optimization System',
          subRight: '2023',
          bullets: [
            'Developed automated recommendation service advising procurement managers on product purchase decisions based on historical velocity and ETA forecasts.',
            'Designed multi-factor scoring algorithms factoring lead time variability and buffer safety stocks, reducing dead-stock write-downs by 18%.',
            'Implemented responsive React.js analytics interface with instant faceted filtering via Elasticsearch Query DSL.'
          ]
        }
      ]
    },
    {
      id: 'sec-coursework',
      title: 'CORE COMPUTER SCIENCE COURSEWORK',
      type: 'tag_list',
      tags: [
        'Data Structures & Algorithms',
        'High-Level System Design (HLD)',
        'Low-Level Design & SOLID Patterns',
        'Database Management Systems (DBMS)',
        'Operating Systems & Concurrency',
        'Computer Networks'
      ]
    },
    {
      id: 'sec-certifications',
      title: 'CERTIFICATIONS & ACHIEVEMENTS',
      type: 'bullet_list',
      bullets: [
        'Solved 250+ DSA problems on LeetCode focusing on Two Pointers, Trees, Graphs, and Dynamic Programming in Java.',
        'AWS Certified Cloud Practitioner (Foundational Cloud Architecture & Security).',
        'Recognized with High-Impact Contributor Award for optimizing ERP analytics querying pipeline.'
      ]
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [workingDate, setWorkingDate] = useState(() => getTodayDateString());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => getTodayDateString());
  const [calendarMonthDate, setCalendarMonthDate] = useState(() => new Date());

  // Inject web fonts into main document so live preview always matches PDF
  useEffect(() => {
    const existing = document.getElementById('jobswitch-web-fonts');
    if (!existing) {
      const link = document.createElement('link');
      link.id = 'jobswitch-web-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Core Data
  const [domains, setDomains] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_domains_v1');
    return saved ? JSON.parse(saved) : DEFAULT_CURRICULUM;
  });

  // Resume Maker State
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('omniswitch_resume_data_v1');
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
  });

  const [activeResumeSectionId, setActiveResumeSectionId] = useState('sec-projects');

  const [activeDomainId, setActiveDomainId] = useState(() => {
    return domains[0]?.id || null;
  });

  const [activeTopicId, setActiveTopicId] = useState(() => {
    return domains[0]?.topics[0]?.id || null;
  });

  // Flashcards State
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('omniswitch_flashcards_v1');
    return saved ? JSON.parse(saved) : DEFAULT_FLASHCARDS;
  });
  const [flashcardDomainFilter, setFlashcardDomainFilter] = useState('ALL');
  const [flashcardStatusFilter, setFlashcardStatusFilter] = useState('ALL');
  const [flippedCards, setFlippedCards] = useState({});
  const [modalAddFlashcardOpen, setModalAddFlashcardOpen] = useState(false);
  const [newFcDomain, setNewFcDomain] = useState('Core Java & Concurrency');
  const [newFcQuestion, setNewFcQuestion] = useState('');
  const [newFcAnswer, setNewFcAnswer] = useState('');
  const [newFcDifficulty, setNewFcDifficulty] = useState('Medium');

  useEffect(() => {
    localStorage.setItem('omniswitch_flashcards_v1', JSON.stringify(flashcards));
  }, [flashcards]);

  // Daily Logs & Sync
  const [dayLogs, setDayLogs] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_daylogs_v1');
    return saved ? JSON.parse(saved) : {};
  });

  // User Discovered Jobs & Kanban Applications
  const [discoveredJobs, setDiscoveredJobs] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_discovered_jobs_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_apps_v1');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-seed-1',
        company: 'Swiggy',
        role: 'SDE II (Demand & Inventory Engine)',
        stage: 'System Design',
        dateApplied: getOffsetDateString(-3),
        url: 'https://careers.swiggy.com',
        notes: 'Discussion on high-concurrency Redis caching & Elasticsearch aggregates.',
        history: [
          { stage: 'Applied', date: getOffsetDateString(-3), note: 'Applied via referral' },
          { stage: 'Online Assessment', date: getOffsetDateString(-2), note: 'Cleared OA (2 DSA problems)' },
          { stage: 'System Design', date: getOffsetDateString(-1), note: 'Inventory locking & Kafka partition design' }
        ]
      }
    ];
  });

  // Modals
  const [modalAddDomainOpen, setModalAddDomainOpen] = useState(false);
  const [modalAddTopicOpen, setModalAddTopicOpen] = useState(false);
  const [modalAddSectionOpen, setModalAddSectionOpen] = useState(false);
  const [modalAddJobOpen, setModalAddJobOpen] = useState(false);
  const [modalAddPortalOpen, setModalAddPortalOpen] = useState(false);
  const [modalAddSubtopicSectionId, setModalAddSubtopicSectionId] = useState(null);
  const [modalStageTransitionApp, setModalStageTransitionApp] = useState(null);
  const [stageTransitionDate, setStageTransitionDate] = useState(() => getTodayDateString());
  const [stageTransitionTarget, setStageTransitionTarget] = useState('Tech Round');
  const [stageTransitionNote, setStageTransitionNote] = useState('');

  // Expandable Notes & Notion drawer states
  const [expandedSubtopicNotes, setExpandedSubtopicNotes] = useState({});
  const [expandedTaskNotes, setExpandedTaskNotes] = useState({});

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleSubtopicNotes = (subId) => {
    setExpandedSubtopicNotes(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const toggleTaskNotes = (taskId) => {
    setExpandedTaskNotes(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Reschedule Subtopic Modal State
  const [rescheduleSubtopic, setRescheduleSubtopic] = useState(null);
  const [rescheduleTargetDate, setRescheduleTargetDate] = useState(() => getOffsetDateString(1));

  // Portals state
  const [hiringPortals, setHiringPortals] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_portals_v1');
    return saved ? JSON.parse(saved) : HIRING_PORTALS;
  });

  const [newPortalName, setNewPortalName] = useState('');
  const [newPortalUrl, setNewPortalUrl] = useState('');
  const [newPortalDesc, setNewPortalDesc] = useState('');
  const [newPortalTag, setNewPortalTag] = useState('Custom Portal');

  // Form Inputs
  const [domainTitleInput, setDomainTitleInput] = useState('');
  const [topicTitleInput, setTopicTitleInput] = useState('');
  const [sectionTitleInput, setSectionTitleInput] = useState('');
  const [sectionSubtopicsInput, setSectionSubtopicsInput] = useState('');
  const [quickSubtopicTitle, setQuickSubtopicTitle] = useState('');
  const [dailyPlanInput, setDailyPlanInput] = useState('');
  const [searchJobQuery, setSearchJobQuery] = useState('');

  // Discovered Job Form (Manual entry)
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobRole, setNewJobRole] = useState('');
  const [newJobUrl, setNewJobUrl] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Bengaluru / Hybrid');
  const [newJobYoe, setNewJobYoe] = useState('1 - 3 Years');
  const [newJobTags, setNewJobTags] = useState('Java, Spring Boot, Microservices');
  const [newJobDescription, setNewJobDescription] = useState('');

  // Persistence
  useEffect(() => {
    localStorage.setItem('omniswitch_react_domains_v1', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('omniswitch_resume_data_v1', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('omniswitch_react_daylogs_v1', JSON.stringify(dayLogs));
  }, [dayLogs]);

  useEffect(() => {
    localStorage.setItem('omniswitch_react_discovered_jobs_v1', JSON.stringify(discoveredJobs));
  }, [discoveredJobs]);

  useEffect(() => {
    localStorage.setItem('omniswitch_react_apps_v1', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('omniswitch_react_portals_v1', JSON.stringify(hiringPortals));
  }, [hiringPortals]);

  // Shared font family resolver ensuring 100% parity between preview and PDF
  const getSelectedFontFamilyCss = (fontKey) => {
    switch (fontKey) {
      case 'garamond':
        return "'EB Garamond', Garamond, 'Times New Roman', Georgia, serif";
      case 'mono':
        return "'JetBrains Mono', Menlo, Monaco, Consolas, monospace";
      case 'sans':
        return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      case 'serif':
      default:
        return "'Tinos', 'Times New Roman', Times, 'Nimbus Roman No9 L', serif";
    }
  };

  // Audio Chime
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch (e) {}
  };

  // Standalone Window PDF Printing that avoids iframe sandboxing issues
  const handlePrintResume = () => {
    const printContent = document.getElementById('resume-printable-document');
    if (!printContent) {
      window.print();
      return;
    }

    try {
      const printWindow = window.open('', '_blank', 'width=900,height=1100');
      if (printWindow) {
        const isCompact = resumeData.settings.spacing === 'compact';
        const fontFamilyCss = getSelectedFontFamilyCss(resumeData.settings.fontFamily);
        const fontSizeCss = resumeData.settings.fontSize === 'sm' ? '12px' : 
                            resumeData.settings.fontSize === 'lg' ? '13.5px' : '12.5px';

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${resumeData.header.fullName || 'Resume'} - ATS Optimized</title>
              <meta charset="utf-8" />
              <!-- Exact Google Web Fonts matching live preview -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
              <style>
                @page { 
                  size: A4 portrait; 
                  margin: ${isCompact ? '6mm 10mm' : '8mm 12mm'}; 
                }
                * { 
                  box-sizing: border-box; 
                  -webkit-print-color-adjust: exact; 
                  print-color-adjust: exact; 
                }
                html, body, #resume-printable-document, #resume-printable-document * {
                  font-family: ${fontFamilyCss} !important;
                }
                html, body {
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                  background: white !important;
                  color: black !important;
                  font-size: ${fontSizeCss};
                  line-height: ${isCompact ? '1.28' : '1.38'};
                }
                #resume-printable-document {
                  padding: 0 !important;
                  margin: 0 !important;
                  box-shadow: none !important;
                  border: none !important;
                  width: 100% !important;
                  max-width: 100% !important;
                }
                a { color: black; text-decoration: underline; text-underline-offset: 2px; }
                .print-hidden { display: none !important; }
                ul { 
                  margin-top: ${isCompact ? '1px' : '2px'} !important; 
                  margin-bottom: ${isCompact ? '1px' : '2px'} !important; 
                  padding-left: 16px !important; 
                }
                li { 
                  margin-bottom: ${isCompact ? '1px' : '2px'} !important; 
                }
                .section-header {
                  margin-top: ${isCompact ? '4px' : '8px'} !important;
                  margin-bottom: ${isCompact ? '2px' : '4px'} !important;
                }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          try {
            printWindow.print();
          } catch (e) {
            console.error('Print dialog error:', e);
          }
        }, 400);
      } else {
        window.print();
      }
    } catch (err) {
      window.print();
    }
  };

  const moveResumeSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= resumeData.sections.length) return;
    const updated = [...resumeData.sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setResumeData({ ...resumeData, sections: updated });
    playChime();
  };

  const handleAddResumeSection = () => {
    const title = prompt('Enter New Section Title (e.g. AWARDS, OPEN SOURCE, LEADERSHIP):', 'ADDITIONAL SECTION');
    if (!title || !title.trim()) return;
    const newSec = {
      id: 'sec-' + Date.now(),
      title: title.trim().toUpperCase(),
      type: 'entries',
      entries: [
        {
          id: 'ent-' + Date.now(),
          primaryTitle: 'Organization or Project Title',
          primaryRight: 'MM YYYY – MM YYYY',
          subTitle: 'Role / Designation',
          subRight: 'City, Country',
          bullets: ['Key contribution or responsibility carried out.']
        }
      ]
    };
    setResumeData({ ...resumeData, sections: [...resumeData.sections, newSec] });
    setActiveResumeSectionId(newSec.id);
    playChime();
  };

  function formatDateKey(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getTodayDateString() {
    return formatDateKey(new Date());
  }

  function getOffsetDateString(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return formatDateKey(d);
  }

  function formatPrettyDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function getSubtopicAddedDate(subtopicId) {
    const activeLog = dayLogs[workingDate];
    if (activeLog && activeLog.plan && activeLog.plan.some(p => p.subtopicId === subtopicId)) {
      return workingDate;
    }
    for (const [dateStr, log] of Object.entries(dayLogs)) {
      if (log && log.plan && log.plan.some(p => p.subtopicId === subtopicId)) {
        return dateStr;
      }
    }
    return null;
  }

  const findSubtopicById = (subId) => {
    if (!domains) return null;
    for (const d of domains) {
      for (const t of (d.topics || [])) {
        for (const s of (t.sections || [])) {
          const sub = (s.subtopics || []).find(item => item.id === subId);
          if (sub) return sub;
        }
      }
    }
    return null;
  };

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];
  const activeTopic = activeDomain?.topics.find(t => t.id === activeTopicId) || activeDomain?.topics[0];

  const findSubtopicTitle = (subId) => {
    const sub = findSubtopicById(subId);
    return sub ? sub.title : subId;
  };

  const totalSubtopicsCount = useMemo(() => {
    let count = 0;
    domains.forEach(d => {
      d.topics.forEach(t => {
        t.sections.forEach(s => {
          count += s.subtopics.length;
        });
      });
    });
    return count;
  }, [domains]);

  const activeDateLog = dayLogs[workingDate] || { topics: [], plan: [], notes: '' };
  const currentPlan = activeDateLog.plan || [];

  const getApplicationEventsForDate = (dateStr) => {
    const events = [];
    applications.forEach(app => {
      if (app.history && Array.isArray(app.history)) {
        app.history.forEach((h, idx) => {
          if (h.date === dateStr) {
            events.push({
              appId: app.id,
              company: app.company,
              role: app.role,
              stage: h.stage,
              note: h.note || '',
              isInitial: idx === 0
            });
          }
        });
      } else if (app.dateApplied === dateStr) {
        events.push({
          appId: app.id,
          company: app.company,
          role: app.role,
          stage: app.stage,
          note: app.notes || '',
          isInitial: true
        });
      }
    });
    return events;
  };

  const hasDayActivity = (dateStr) => {
    const log = dayLogs[dateStr];
    const hasTopics = log && log.topics && log.topics.length > 0;
    const hasPlanDone = log && log.plan && log.plan.some(p => p.completed);
    const hasNotes = log && log.notes && log.notes.trim().length > 0;
    const appEvents = getApplicationEventsForDate(dateStr);
    return Boolean(hasTopics || hasPlanDone || hasNotes || appEvents.length > 0);
  };

  const streakCount = useMemo(() => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      if (hasDayActivity(key)) {
        streak++;
      } else {
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  }, [dayLogs, applications]);

  // Flashcards Management
  const handleToggleFlipCard = (cardId) => {
    setFlippedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleUpdateFlashcardStatus = (cardId, newStatus) => {
    const updated = flashcards.map(fc => (fc.id === cardId ? { ...fc, status: newStatus } : fc));
    setFlashcards(updated);
    playChime();
  };

  const handleDeleteFlashcard = (cardId) => {
    setFlashcards(flashcards.filter(fc => fc.id !== cardId));
    showToast('Flashcard removed');
  };

  const handleSaveNewFlashcard = () => {
    if (!newFcQuestion.trim() || !newFcAnswer.trim()) {
      alert('Please fill out both Question and Answer.');
      return;
    }
    const newCard = {
      id: 'fc-' + Date.now(),
      domain: newFcDomain.trim(),
      question: newFcQuestion.trim(),
      answer: newFcAnswer.trim(),
      difficulty: newFcDifficulty,
      status: 'review'
    };
    setFlashcards([newCard, ...flashcards]);
    setNewFcQuestion('');
    setNewFcAnswer('');
    setModalAddFlashcardOpen(false);
    playChime();
    showToast('Flashcard added to board!');
  };

  // Domain & Curriculum Handlers
  const handleCreateDomain = () => {
    if (!domainTitleInput.trim()) return;
    const newDom = {
      id: 'dom-' + Date.now(),
      title: domainTitleInput.trim(),
      topics: []
    };
    setDomains([...domains, newDom]);
    setActiveDomainId(newDom.id);
    setActiveTopicId(null);
    setDomainTitleInput('');
    setModalAddDomainOpen(false);
  };

  const handleCreateTopic = () => {
    if (!topicTitleInput.trim() || !activeDomain) return;
    const newTopic = {
      id: 'top-' + Date.now(),
      title: topicTitleInput.trim(),
      sections: []
    };
    const updated = domains.map(d => {
      if (d.id === activeDomain.id) {
        return { ...d, topics: [...d.topics, newTopic] };
      }
      return d;
    });
    setDomains(updated);
    setActiveTopicId(newTopic.id);
    setTopicTitleInput('');
    setModalAddTopicOpen(false);
  };

  const handleCreateSection = () => {
    if (!sectionTitleInput.trim() || !activeTopic) return;
    const lines = sectionSubtopicsInput.split('\n').map(l => l.trim()).filter(Boolean);
    const newSubs = lines.map(line => ({
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      title: line,
      completed: false,
      notes: '',
      notionUrl: ''
    }));

    const newSec = {
      id: 'sec-' + Date.now(),
      title: sectionTitleInput.trim(),
      collapsed: false,
      subtopics: newSubs
    };

    const updated = domains.map(d => {
      if (d.id === activeDomain.id) {
        return {
          ...d,
          topics: d.topics.map(t => {
            if (t.id === activeTopic.id) {
              return { ...t, sections: [...t.sections, newSec] };
            }
            return t;
          })
        };
      }
      return d;
    });

    setDomains(updated);
    setSectionTitleInput('');
    setSectionSubtopicsInput('');
    setModalAddSectionOpen(false);
  };

  const handleAddSubtopicToSection = (sectionId) => {
    if (!quickSubtopicTitle.trim()) return;
    const newSub = {
      id: 'sub-' + Date.now(),
      title: quickSubtopicTitle.trim(),
      completed: false,
      notes: '',
      notionUrl: ''
    };

    const updated = domains.map(d => {
      if (d.id === activeDomain.id) {
        return {
          ...d,
          topics: d.topics.map(t => {
            if (t.id === activeTopic.id) {
              return {
                ...t,
                sections: t.sections.map(s => {
                  if (s.id === sectionId) {
                    return { ...s, subtopics: [...s.subtopics, newSub] };
                  }
                  return s;
                })
              };
            }
            return t;
          })
        };
      }
      return d;
    });

    setDomains(updated);
    setQuickSubtopicTitle('');
    setModalAddSubtopicSectionId(null);
  };

  const handleDeleteSubtopic = (sectionId, subtopicId) => {
    const updated = domains.map(d => {
      if (d.id === activeDomain.id) {
        return {
          ...d,
          topics: d.topics.map(t => {
            if (t.id === activeTopic.id) {
              return {
                ...t,
                sections: t.sections.map(s => {
                  if (s.id === sectionId) {
                    return { ...s, subtopics: s.subtopics.filter(sub => sub.id !== subtopicId) };
                  }
                  return s;
                })
              };
            }
            return t;
          })
        };
      }
      return d;
    });
    setDomains(updated);
  };

  const handleToggleSubtopic = (subtopicId, isCompleted, targetDate = workingDate) => {
    const nowTimestamp = isCompleted
      ? new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      : null;

    const updated = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(sub => {
            if (sub.id === subtopicId) {
              return {
                ...sub,
                completed: isCompleted,
                completedAt: nowTimestamp
              };
            }
            return sub;
          })
        }))
      }))
    }));
    setDomains(updated);

    const dateLog = dayLogs[targetDate] || { topics: [], plan: [], notes: '' };
    const currentTopics = dateLog.topics || [];
    let updatedTopics = [...currentTopics];

    if (isCompleted && !updatedTopics.includes(subtopicId)) {
      updatedTopics.push(subtopicId);
      playChime();
    } else if (!isCompleted) {
      updatedTopics = updatedTopics.filter(id => id !== subtopicId);
    }

    const currentPlanList = dateLog.plan || [];
    const updatedPlanList = currentPlanList.map(p => {
      if (p.subtopicId === subtopicId) {
        return { ...p, completed: isCompleted };
      }
      return p;
    });

    setDayLogs({
      ...dayLogs,
      [targetDate]: { ...dateLog, topics: updatedTopics, plan: updatedPlanList }
    });
  };

  const handleAddSubtopicToDay = (subtopic) => {
    const dateLog = dayLogs[workingDate] || { topics: [], plan: [], notes: '' };
    const existingPlan = dateLog.plan || [];

    const taskExists = existingPlan.some(p => p.subtopicId === subtopic.id || p.title.includes(subtopic.title));
    if (!taskExists) {
      const newTask = {
        id: 'plan-' + Date.now(),
        subtopicId: subtopic.id,
        title: `Learn: ${subtopic.title}`,
        completed: subtopic.completed || false,
        notes: subtopic.notes || '',
        notionUrl: subtopic.notionUrl || ''
      };

      setDayLogs({
        ...dayLogs,
        [workingDate]: {
          ...dateLog,
          plan: [...existingPlan, newTask]
        }
      });
    }

    const updated = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(sub => {
            if (sub.id === subtopic.id) {
              return { ...sub, addedToDate: workingDate };
            }
            return sub;
          })
        }))
      }))
    }));
    setDomains(updated);
    playChime();
  };

  const handleRescheduleSubtopic = (subtopicId, fromDate, toDate) => {
    if (!toDate || fromDate === toDate) {
      setRescheduleSubtopic(null);
      return;
    }

    const sub = findSubtopicById(subtopicId);
    const subTitle = sub ? sub.title : findSubtopicTitle(subtopicId);

    let updatedDayLogs = { ...dayLogs };
    if (fromDate && updatedDayLogs[fromDate]) {
      const oldLog = updatedDayLogs[fromDate];
      const filteredPlan = (oldLog.plan || []).filter(p => p.subtopicId !== subtopicId && !p.title.includes(subTitle));
      const filteredTopics = (oldLog.topics || []).filter(id => id !== subtopicId);
      updatedDayLogs[fromDate] = {
        ...oldLog,
        plan: filteredPlan,
        topics: filteredTopics
      };
    }

    const targetLog = updatedDayLogs[toDate] || { topics: [], plan: [], notes: '' };
    const targetPlan = targetLog.plan || [];
    const existsInTarget = targetPlan.some(p => p.subtopicId === subtopicId || p.title.includes(subTitle));

    if (!existsInTarget) {
      targetPlan.push({
        id: 'plan-' + Date.now(),
        subtopicId: subtopicId,
        title: `Learn: ${subTitle}`,
        completed: false
      });
    }

    updatedDayLogs[toDate] = {
      ...targetLog,
      plan: targetPlan
    };

    setDayLogs(updatedDayLogs);

    const updatedDomains = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(item => {
            if (item.id === subtopicId) {
              return { ...item, addedToDate: toDate };
            }
            return item;
          })
        }))
      }))
    }));

    setDomains(updatedDomains);
    setRescheduleSubtopic(null);
    playChime();
    showToast(`Moved "${subTitle}" to ${formatPrettyDate(toDate)}!`);
  };

  const handleRemoveSubtopicFromDay = (subtopicId, fromDate) => {
    const sub = findSubtopicById(subtopicId);
    const subTitle = sub ? sub.title : findSubtopicTitle(subtopicId);

    // 1. Remove task from all dayLogs plans & uncheck from daily logs
    let updatedDayLogs = { ...dayLogs };
    Object.keys(updatedDayLogs).forEach(dateKey => {
      const log = updatedDayLogs[dateKey];
      if (log && log.plan) {
        const filteredPlan = log.plan.filter(p => p.subtopicId !== subtopicId && !p.title.includes(subTitle));
        const filteredTopics = (log.topics || []).filter(id => id !== subtopicId);
        updatedDayLogs[dateKey] = {
          ...log,
          plan: filteredPlan,
          topics: filteredTopics
        };
      }
    });
    setDayLogs(updatedDayLogs);

    // 2. Clear addedToDate in curriculum domains
    const updatedDomains = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(item => {
            if (item.id === subtopicId) {
              const copy = { ...item };
              delete copy.addedToDate;
              return copy;
            }
            return item;
          })
        }))
      }))
    }));

    setDomains(updatedDomains);
    setRescheduleSubtopic(null);
    playChime();
    showToast(`Removed "${subTitle}" from Day Plan!`);
  };

  const handleUpdateSubtopicNotionAndNotes = (subtopicId, notionUrl, notes) => {
    const updatedDomains = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(item => {
            if (item.id === subtopicId) {
              return { ...item, notionUrl, notes };
            }
            return item;
          })
        }))
      }))
    }));
    setDomains(updatedDomains);

    const updatedDayLogs = { ...dayLogs };
    let hasLogChanges = false;

    Object.keys(updatedDayLogs).forEach(dateKey => {
      const log = updatedDayLogs[dateKey];
      if (log && log.plan) {
        const hasTask = log.plan.some(p => p.subtopicId === subtopicId);
        if (hasTask) {
          hasLogChanges = true;
          updatedDayLogs[dateKey] = {
            ...log,
            plan: log.plan.map(p => {
              if (p.subtopicId === subtopicId) {
                return { ...p, notionUrl, notes };
              }
              return p;
            })
          };
        }
      }
    });

    if (hasLogChanges) {
      setDayLogs(updatedDayLogs);
    }
  };

  const handleUpdateTaskNotionAndNotes = (taskId, targetDate, notionUrl, notes) => {
    const dateLog = dayLogs[targetDate] || { topics: [], plan: [], notes: '' };
    const task = (dateLog.plan || []).find(p => p.id === taskId);
    if (!task) return;

    const updatedPlan = (dateLog.plan || []).map(p => {
      if (p.id === taskId) {
        return { ...p, notionUrl, notes };
      }
      return p;
    });

    setDayLogs({
      ...dayLogs,
      [targetDate]: { ...dateLog, plan: updatedPlan }
    });

    if (task.subtopicId) {
      const updatedDomains = domains.map(d => ({
        ...d,
        topics: d.topics.map(t => ({
          ...t,
          sections: t.sections.map(s => ({
            ...s,
            subtopics: s.subtopics.map(item => {
              if (item.id === task.subtopicId) {
                return { ...item, notionUrl, notes };
              }
              return item;
            })
          }))
        }))
      }));
      setDomains(updatedDomains);
    }
  };

  const handleTogglePlanTask = (taskId, targetDate = workingDate) => {
    const dateLog = dayLogs[targetDate] || { topics: [], plan: [], notes: '' };
    const task = (dateLog.plan || []).find(p => p.id === taskId);
    if (!task) return;

    const newCompleted = !task.completed;

    if (task.subtopicId) {
      handleToggleSubtopic(task.subtopicId, newCompleted, targetDate);
    } else {
      const updatedPlan = (dateLog.plan || []).map(p => (p.id === taskId ? { ...p, completed: newCompleted } : p));
      if (newCompleted) playChime();
      setDayLogs({
        ...dayLogs,
        [targetDate]: { ...dateLog, plan: updatedPlan }
      });
    }
  };

  const handleAddCustomPlanTask = (targetDate = workingDate, customText = dailyPlanInput) => {
    if (!customText.trim()) return;
    const dateLog = dayLogs[targetDate] || { topics: [], plan: [], notes: '' };
    const newTask = {
      id: 'plan-' + Date.now(),
      title: customText.trim(),
      completed: false,
      notes: '',
      notionUrl: ''
    };

    setDayLogs({
      ...dayLogs,
      [targetDate]: {
        ...dateLog,
        plan: [...(dateLog.plan || []), newTask]
      }
    });
    if (targetDate === workingDate) {
      setDailyPlanInput('');
    }
  };

  const handleDeletePlanTask = (taskId, targetDate = workingDate) => {
    const dateLog = dayLogs[targetDate] || { topics: [], plan: [], notes: '' };
    setDayLogs({
      ...dayLogs,
      [targetDate]: {
        ...dateLog,
        plan: (dateLog.plan || []).filter(p => p.id !== taskId)
      }
    });
  };

  // Job Radar Handlers
  const handleSaveDiscoveredJob = () => {
    if (!newJobCompany.trim() || !newJobUrl.trim()) return;
    const newJob = {
      id: 'job-' + Date.now(),
      company: newJobCompany.trim(),
      role: newJobRole.trim() || 'Software Engineer (1-3 YOE)',
      url: newJobUrl.trim(),
      location: newJobLocation,
      yoe: newJobYoe,
      tags: newJobTags.split(',').map(t => t.trim()).filter(Boolean),
      description: newJobDescription.trim() || 'Full Job Description saved by user.',
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDiscoveredJobs([newJob, ...discoveredJobs]);
    setNewJobCompany('');
    setNewJobRole('');
    setNewJobUrl('');
    setNewJobDescription('');
    setModalAddJobOpen(false);
  };

  const handleApplyAndMoveToKanban = (job) => {
    const existing = applications.find(a => a.company.toLowerCase() === job.company.toLowerCase());
    if (existing) {
      alert(`${job.company} is already in your Application Pipeline!`);
      return;
    }

    const todayStr = getTodayDateString();
    const newApp = {
      id: 'app-' + Date.now(),
      company: job.company,
      role: job.role,
      stage: 'Applied',
      dateApplied: todayStr,
      url: job.url,
      notes: `Location: ${job.location} | Required: ${job.yoe}\n\n${job.description.substring(0, 300)}...`,
      history: [{ stage: 'Applied', date: todayStr, note: 'Initial application submitted via 24h Radar' }]
    };

    setApplications([newApp, ...applications]);
    playChime();
    setActiveTab('applications');
  };

  const handleDeleteApplication = (appId) => {
    setApplications(applications.filter(a => a.id !== appId));
  };

  const handleDeleteDiscoveredJob = (jobId) => {
    setDiscoveredJobs(discoveredJobs.filter(j => j.id !== jobId));
  };

  const handleSaveCustomPortal = () => {
    if (!newPortalName.trim() || !newPortalUrl.trim()) return;
    const newPortal = {
      name: newPortalName.trim(),
      badge: 'Custom',
      url: newPortalUrl.trim().startsWith('http') ? newPortalUrl.trim() : `https://${newPortalUrl.trim()}`,
      desc: newPortalDesc.trim() || 'Custom portal added by user.',
      tag: newPortalTag.trim() || 'Job Portal',
      isCustom: true
    };
    setHiringPortals([...hiringPortals, newPortal]);
    setNewPortalName('');
    setNewPortalUrl('');
    setNewPortalDesc('');
    setNewPortalTag('Custom Portal');
    setModalAddPortalOpen(false);
  };

  const handleDeletePortal = (portalName) => {
    setHiringPortals(hiringPortals.filter(p => p.name !== portalName));
  };

  const handleExportData = () => {
    const fullBackup = {
      version: 'omniswitch_v3',
      exportDate: new Date().toISOString(),
      domains,
      dayLogs,
      discoveredJobs,
      applications,
      hiringPortals,
      flashcards,
      resumeData
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `Job_Switch_Backup_${getTodayDateString()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.domains) setDomains(parsed.domains);
        if (parsed.dayLogs) setDayLogs(parsed.dayLogs);
        if (parsed.discoveredJobs) setDiscoveredJobs(parsed.discoveredJobs);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.hiringPortals) setHiringPortals(parsed.hiringPortals);
        if (parsed.flashcards) setFlashcards(parsed.flashcards);
        if (parsed.resumeData) setResumeData(parsed.resumeData);
        playChime();
        alert('All data restored successfully from JSON backup!');
      } catch (err) {
        alert('Failed to parse backup JSON. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  const openStageTransitionModal = (app, targetStage) => {
    setModalStageTransitionApp(app);
    setStageTransitionTarget(targetStage);
    setStageTransitionDate(workingDate || getTodayDateString());
    setStageTransitionNote('');
  };

  const confirmStageTransition = () => {
    if (!modalStageTransitionApp) return;
    const targetDate = stageTransitionDate || getTodayDateString();

    const updated = applications.map(app => {
      if (app.id === modalStageTransitionApp.id) {
        return {
          ...app,
          stage: stageTransitionTarget,
          history: [
            ...(app.history || []),
            {
              stage: stageTransitionTarget,
              date: targetDate,
              note: stageTransitionNote.trim() || `Transferred to ${stageTransitionTarget}`
            }
          ]
        };
      }
      return app;
    });

    setApplications(updated);
    setModalStageTransitionApp(null);
    playChime();
  };

  const inspectDayData = useMemo(() => {
    const log = dayLogs[selectedCalendarDate] || { topics: [], plan: [], notes: '' };
    const appEvents = getApplicationEventsForDate(selectedCalendarDate);
    return {
      date: selectedCalendarDate,
      topics: log.topics || [],
      plan: log.plan || [],
      notes: log.notes || '',
      appEvents
    };
  }, [selectedCalendarDate, dayLogs, applications]);

  // Flashcards Filtering
  const filteredFlashcards = useMemo(() => {
    return flashcards.filter(fc => {
      if (flashcardDomainFilter !== 'ALL' && fc.domain !== flashcardDomainFilter) return false;
      if (flashcardStatusFilter !== 'ALL' && fc.status !== flashcardStatusFilter) return false;
      return true;
    });
  }, [flashcards, flashcardDomainFilter, flashcardStatusFilter]);

  const flashcardDomainsList = useMemo(() => {
    const set = new Set(flashcards.map(f => f.domain));
    return Array.from(set);
  }, [flashcards]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B0F17] text-stone-900 dark:text-stone-100 font-sans transition-colors duration-200">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-stone-900 dark:text-stone-100">Job Switch</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium">Studio</span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">Full-Stack (2 YOE) &rarr; Cloud, Distributed & Applied AI SWE</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span className="font-semibold">{streakCount}d Streak</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>{totalSubtopicsCount} Subtopics</span>
            </div>

            <button
              onClick={handleExportData}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition"
              title="Export complete progress JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export</span>
            </button>

            <label
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition cursor-pointer"
              title="Import JSON data from laptop/phone"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Import</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-2 overflow-x-auto py-2">
          {[
            { id: 'curriculum', label: 'Topics to Learn', icon: BookOpen },
            { id: 'queue', label: 'My Daily Plan & Queue', icon: CheckSquare },
            { id: 'calendar', label: 'Progress Calendar', icon: CalendarIcon },
            { id: 'applications', label: 'Applications Kanban', icon: KanbanIcon },
            { id: 'jobs', label: '24h India Job Radar', icon: Compass },
            { id: 'resume', label: 'Resume Maker', icon: FileText },
            { id: 'flashcards', label: 'Interview Prep (Flashcards)', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* 1. TOPICS TO LEARN SECTION */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Curriculum & Study Tracks</h2>
                <p className="text-xs text-stone-500 mt-0.5">Select a domain, switch main topic tabs, and add subtopics directly to any section.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => setModalAddDomainOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-medium transition"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>+ Add Domain</span>
                </button>
                <button
                  onClick={() => setModalAddTopicOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg font-medium border border-stone-200 dark:border-stone-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Topic</span>
                </button>
                <button
                  onClick={() => setModalAddSectionOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-lg font-medium transition"
                >
                  <ListPlus className="w-3.5 h-3.5" />
                  <span>+ Add Section</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Domains / Products</span>
                  <span className="text-xs font-mono text-stone-500">{domains.length} Tracks</span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {domains.map(dom => {
                    const isSelected = dom.id === activeDomain?.id;
                    let totalSubs = 0;
                    let doneSubs = 0;
                    dom.topics.forEach(t => t.sections.forEach(s => s.subtopics.forEach(sub => {
                      totalSubs++;
                      if (sub.completed) doneSubs++;
                    })));
                    const pct = totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0;

                    return (
                      <div
                        key={dom.id}
                        onClick={() => {
                          setActiveDomainId(dom.id);
                          setActiveTopicId(dom.topics[0]?.id || null);
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition select-none ${
                          isSelected
                            ? 'bg-stone-50 dark:bg-stone-800/80 border-stone-900 dark:border-stone-600 shadow-sm'
                            : 'bg-white dark:bg-[#121824] border-stone-200 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold leading-tight line-clamp-1">{dom.title}</h4>
                          <span className="text-[11px] font-mono text-stone-400">{pct}%</span>
                        </div>
                        <div className="mt-2 w-full bg-stone-100 dark:bg-stone-900 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white dark:bg-[#121824] p-3 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex items-center gap-2 overflow-x-auto">
                  {activeDomain?.topics.map(top => {
                    const isSelected = top.id === activeTopic?.id;
                    return (
                      <button
                        key={top.id}
                        onClick={() => setActiveTopicId(top.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                            : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                        }`}
                      >
                        {top.title}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {activeTopic?.sections.map(section => {
                    const completedCount = section.subtopics.filter(s => s.completed).length;
                    const totalCount = section.subtopics.length;

                    return (
                      <div key={section.id} className="bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800/80 overflow-hidden shadow-sm">
                        <div className="px-4 py-3 bg-stone-50/80 dark:bg-stone-900/60 flex items-center justify-between border-b border-stone-100 dark:border-stone-800">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{section.title}</span>
                            <span className="text-[11px] font-mono text-stone-400">({completedCount}/{totalCount})</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setModalAddSubtopicSectionId(section.id)}
                              className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Subtopic</span>
                            </button>
                          </div>
                        </div>

                        {modalAddSubtopicSectionId === section.id && (
                          <div className="p-3 bg-stone-50 dark:bg-stone-900/40 border-b border-stone-200 dark:border-stone-800 flex gap-2">
                            <input
                              type="text"
                              value={quickSubtopicTitle}
                              onChange={(e) => setQuickSubtopicTitle(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddSubtopicToSection(section.id)}
                              placeholder="Enter subtopic name (e.g. HashMap Rehashing & Treeification)..."
                              className="flex-1 bg-white dark:bg-[#0B0F17] border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                              autoFocus
                            />
                            <button
                              onClick={() => handleAddSubtopicToSection(section.id)}
                              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => setModalAddSubtopicSectionId(null)}
                              className="px-2.5 py-1.5 text-stone-500 hover:text-stone-700 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
                          {section.subtopics.map(sub => {
                            const addedDate = sub.addedToDate || getSubtopicAddedDate(sub.id);
                            const isNotesOpen = Boolean(expandedSubtopicNotes[sub.id]);
                            const hasNotionUrl = Boolean(sub.notionUrl && sub.notionUrl.trim().length > 0);
                            const hasNotes = Boolean(sub.notes && sub.notes.trim().length > 0);

                            return (
                              <div key={sub.id} className="p-3 hover:bg-stone-50/50 dark:hover:bg-stone-900/30 transition text-xs space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3 flex-1 min-w-0 pr-4">
                                    <input
                                      type="checkbox"
                                      checked={sub.completed}
                                      onChange={(e) => handleToggleSubtopic(sub.id, e.target.checked)}
                                      className="w-4 h-4 rounded border-stone-300 text-emerald-600 focus:ring-0 cursor-pointer"
                                    />
                                    <div className="truncate flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                      <span className={`truncate ${sub.completed ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200 font-medium'}`}>
                                        {sub.title}
                                      </span>
                                      {sub.completed && sub.completedAt && (
                                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded shrink-0">
                                          Done: {sub.completedAt}
                                        </span>
                                      )}
                                      {hasNotionUrl && (
                                        <a
                                          href={sub.notionUrl.startsWith('http') ? sub.notionUrl : `https://${sub.notionUrl}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:underline shrink-0"
                                          title={sub.notionUrl}
                                        >
                                          <LinkIcon className="w-2.5 h-2.5" />
                                          <span>Notion Resources ↗</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 shrink-0">
                                    <button
                                      onClick={() => toggleSubtopicNotes(sub.id)}
                                      className={`px-2 py-1 text-[11px] font-medium rounded-lg border flex items-center gap-1 transition ${
                                        isNotesOpen || hasNotionUrl || hasNotes
                                          ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                                          : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                                      }`}
                                      title="Add/View Notion link and learning notes"
                                    >
                                      <FileText className="w-3 h-3" />
                                      <span className="hidden sm:inline">{hasNotionUrl ? 'Notion / Notes' : '+ Notion / Notes'}</span>
                                    </button>

                                    {addedDate ? (
                                      <div className="flex items-center space-x-1">
                                        <button
                                          onClick={() => {
                                            setRescheduleSubtopic({ id: sub.id, title: sub.title, currentDate: addedDate });
                                            setRescheduleTargetDate(getOffsetDateString(1));
                                          }}
                                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1 transition"
                                          title="Click to reschedule to another date"
                                        >
                                          <span>✓ {formatPrettyDate(addedDate)}</span>
                                          <Clock className="w-3 h-3 opacity-70" />
                                        </button>
                                        <button
                                          onClick={() => handleRemoveSubtopicFromDay(sub.id, addedDate)}
                                          className="p-1 text-stone-400 hover:text-rose-500 rounded border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition"
                                          title="Remove date / Unassign from day"
                                        >
                                          <XCircle className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleAddSubtopicToDay(sub)}
                                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg border bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 transition"
                                        title={`Add to ${workingDate}'s plan`}
                                      >
                                        + Add to Day Plan
                                      </button>
                                    )}

                                    <button
                                      onClick={() => handleDeleteSubtopic(section.id, sub.id)}
                                      className="p-1 text-stone-400 hover:text-rose-500 transition"
                                      title="Remove subtopic"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {isNotesOpen && (
                                  <div className="ml-7 p-3 bg-stone-50 dark:bg-stone-900/70 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2.5 animate-in fade-in duration-150">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                      <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1 shrink-0">
                                        <LinkIcon className="w-3 h-3 text-purple-500" />
                                        <span>Notion / Resource Link:</span>
                                      </label>
                                      <div className="flex-1 flex gap-1.5">
                                        <input
                                          type="url"
                                          value={sub.notionUrl || ''}
                                          onChange={(e) => handleUpdateSubtopicNotionAndNotes(sub.id, e.target.value, sub.notes || '')}
                                          placeholder="https://notion.so/my-workspace/topic-notes..."
                                          className="flex-1 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-purple-500"
                                        />
                                        {hasNotionUrl && (
                                          <a
                                            href={sub.notionUrl.startsWith('http') ? sub.notionUrl : `https://${sub.notionUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 transition"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                            <span>Open</span>
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-300 mb-1">
                                        Learning Notes & Resources Used:
                                      </label>
                                      <textarea
                                        rows={2}
                                        value={sub.notes || ''}
                                        onChange={(e) => handleUpdateSubtopicNotionAndNotes(sub.id, sub.notionUrl || '', e.target.value)}
                                        placeholder="Key takeaways, formulas, algorithms, or pointers to specific Notion pages and reference links..."
                                        className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs leading-relaxed focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MY DAILY PLAN & QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-400 uppercase font-mono">Working Date</span>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{workingDate}</h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setWorkingDate(getTodayDateString())}
                  className={`px-3 py-1.5 rounded-lg border font-medium ${workingDate === getTodayDateString() ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}
                >
                  Today
                </button>
                <button
                  onClick={() => setWorkingDate(getOffsetDateString(1))}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-medium"
                >
                  Tomorrow (Plan Ahead)
                </button>
                <input
                  type="date"
                  value={workingDate}
                  onChange={(e) => setWorkingDate(e.target.value)}
                  className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#121824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Tasks & Learned Topics for {workingDate}</h3>
                  <span className="text-xs font-mono text-stone-400">
                    {currentPlan.filter(p => p.completed).length} of {currentPlan.length} completed
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dailyPlanInput}
                    onChange={(e) => setDailyPlanInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomPlanTask(workingDate, dailyPlanInput)}
                    placeholder="Write a custom goal (e.g. Solve 2 Two-Pointer questions in LeetCode)..."
                    className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                  />
                  <button
                    onClick={() => handleAddCustomPlanTask(workingDate, dailyPlanInput)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl text-xs font-medium transition"
                  >
                    Add Task
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {currentPlan.length === 0 ? (
                    <div className="p-8 text-center text-stone-400 text-xs">
                      No tasks yet for this date. Click "+ Add to Day Plan" on any subtopic or add a custom task above.
                    </div>
                  ) : (
                    currentPlan.map(task => {
                      const isTaskNotesOpen = Boolean(expandedTaskNotes[task.id]);
                      const hasTaskNotion = Boolean(task.notionUrl && task.notionUrl.trim().length > 0);
                      const hasTaskNotes = Boolean(task.notes && task.notes.trim().length > 0);

                      return (
                        <div
                          key={task.id}
                          className={`p-3 rounded-xl border transition space-y-2 ${
                            task.completed
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                              : 'bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div
                              onClick={() => handleTogglePlanTask(task.id, workingDate)}
                              className="flex items-center space-x-3 flex-1 cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {}}
                                className="w-4 h-4 rounded text-emerald-600 focus:ring-0 cursor-pointer"
                              />
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className={`text-xs ${task.completed ? 'line-through text-stone-400' : 'font-medium'}`}>
                                  {task.title}
                                </span>
                                {hasTaskNotion && (
                                  <a
                                    href={task.notionUrl.startsWith('http') ? task.notionUrl : `https://${task.notionUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:underline shrink-0"
                                    title={task.notionUrl}
                                  >
                                    <LinkIcon className="w-2.5 h-2.5" />
                                    <span>Notion Resources ↗</span>
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1.5 pl-2 shrink-0">
                              <button
                                onClick={() => toggleTaskNotes(task.id)}
                                className={`p-1 px-2 text-[10px] rounded border font-medium flex items-center gap-1 transition ${
                                  isTaskNotesOpen || hasTaskNotion || hasTaskNotes
                                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                                }`}
                                title="Add/View Notion link and notes"
                              >
                                <FileText className="w-3 h-3 text-purple-500" />
                                <span className="hidden sm:inline">{hasTaskNotion ? 'Notion' : '+ Notion'}</span>
                              </button>

                              <button
                                onClick={() => {
                                  if (task.subtopicId) {
                                    setRescheduleSubtopic({ id: task.subtopicId, title: task.title, currentDate: workingDate });
                                    setRescheduleTargetDate(getOffsetDateString(1));
                                  } else {
                                    const tomorrow = getOffsetDateString(1);
                                    handleAddCustomPlanTask(tomorrow, task.title);
                                    handleDeletePlanTask(task.id, workingDate);
                                    playChime();
                                  }
                                }}
                                className="p-1 px-2 text-[10px] rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 font-medium flex items-center gap-1 transition"
                                title="Reschedule to another day"
                              >
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>Reschedule</span>
                              </button>
                              <button
                                onClick={() => handleDeletePlanTask(task.id, workingDate)}
                                className="text-stone-400 hover:text-rose-500 p-1"
                                title="Delete task"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isTaskNotesOpen && (
                            <div className="ml-7 p-3 bg-white dark:bg-stone-950/80 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 animate-in fade-in duration-150">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1 shrink-0">
                                  <LinkIcon className="w-3 h-3 text-purple-500" />
                                  <span>Notion / Resource Link:</span>
                                </label>
                                <div className="flex-1 flex gap-1.5">
                                  <input
                                    type="url"
                                    value={task.notionUrl || ''}
                                    onChange={(e) => handleUpdateTaskNotionAndNotes(task.id, workingDate, e.target.value, task.notes || '')}
                                    placeholder="https://notion.so/my-workspace/topic-notes..."
                                    className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-purple-500"
                                  />
                                  {hasTaskNotion && (
                                    <a
                                      href={task.notionUrl.startsWith('http') ? task.notionUrl : `https://${task.notionUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 transition"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>Open</span>
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-300 mb-1">
                                  Task Notes / Resources:
                                </label>
                                <textarea
                                  rows={2}
                                  value={task.notes || ''}
                                  onChange={(e) => handleUpdateTaskNotionAndNotes(task.id, workingDate, task.notionUrl || '', e.target.value)}
                                  placeholder="Summary notes, links, or documentation references for this task..."
                                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs leading-relaxed focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-stone-400" />
                  <span>Daily Reflection & Tech Notes</span>
                </h3>
                <textarea
                  rows={8}
                  value={activeDateLog.notes || ''}
                  onChange={(e) => {
                    setDayLogs({
                      ...dayLogs,
                      [workingDate]: { ...activeDateLog, notes: e.target.value }
                    });
                  }}
                  placeholder="Record insights: What clicked today? What algorithmic trade-offs or concurrency caveats did you encounter?"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-xs leading-relaxed focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. PROGRESS CALENDAR & VISUAL DAY-TO-DAY TIMELINE */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const d = new Date(calendarMonthDate);
                    d.setMonth(d.getMonth() - 1);
                    setCalendarMonthDate(d);
                  }}
                  className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {calendarMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => {
                    const d = new Date(calendarMonthDate);
                    d.setMonth(d.getMonth() + 1);
                    setCalendarMonthDate(d);
                  }}
                  className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed (&ge;1 action)</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-500">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Missed</span>
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm">
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-mono text-stone-400 font-semibold">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {(() => {
                  const year = calendarMonthDate.getFullYear();
                  const month = calendarMonthDate.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const todayStr = getTodayDateString();

                  const cells = [];
                  for (let i = 0; i < firstDay; i++) {
                    cells.push(<div key={`empty-${i}`} className="min-h-[105px] bg-stone-50/50 dark:bg-stone-900/20 rounded-xl" />);
                  }

                  for (let day = 1; day <= daysInMonth; day++) {
                    const dateObj = new Date(year, month, day);
                    const dateKey = formatDateKey(dateObj);
                    const isToday = dateKey === todayStr;
                    const isPast = dateObj <= new Date();
                    const active = hasDayActivity(dateKey);
                    const isSelected = selectedCalendarDate === dateKey;

                    const dayLog = dayLogs[dateKey] || { topics: [], plan: [] };
                    const appEvents = getApplicationEventsForDate(dateKey);
                    const completedTasksCount = (dayLog.plan || []).filter(p => p.completed).length;
                    const studiedTopicsCount = (dayLog.topics || []).length;

                    cells.push(
                      <div
                        key={dateKey}
                        onClick={() => setSelectedCalendarDate(dateKey)}
                        className={`min-h-[105px] p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition select-none ${
                          isSelected
                            ? 'ring-2 ring-stone-900 dark:ring-stone-100 bg-stone-50 dark:bg-stone-800/80 shadow-sm'
                            : 'bg-white dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/60 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-bold ${isToday ? 'px-1.5 py-0.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-500'}`}>
                            {day}
                          </span>
                          <span className="text-xs">
                            {active ? '✅' : isPast ? '❌' : '--'}
                          </span>
                        </div>

                        <div className="space-y-1 my-1">
                          {appEvents.slice(0, 2).map((evt, idx) => {
                            const meta = KANBAN_STAGES.find(s => s.id === evt.stage) || { icon: '📨', color: 'bg-blue-500/10 text-blue-500' };
                            return (
                              <div
                                key={idx}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-mono truncate border flex items-center gap-1 ${meta.color}`}
                                title={`${evt.company}: ${evt.stage}`}
                              >
                                <span>{meta.icon}</span>
                                <span className="font-bold truncate">{evt.company}</span>
                              </div>
                            );
                          })}

                          {completedTasksCount > 0 && (
                            <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded truncate">
                              ✓ {completedTasksCount} task{completedTasksCount > 1 ? 's' : ''}
                            </div>
                          )}

                          {studiedTopicsCount > 0 && (
                            <div className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-1 py-0.5 rounded truncate">
                              • {studiedTopicsCount} topic{studiedTopicsCount > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return cells;
                })()}
              </div>
            </div>

            {/* Selected Day Inspector Panel */}
            <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 gap-3">
                <div>
                  <span className="text-xs font-mono text-stone-400 uppercase">Selected Day Inspector</span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>{formatPrettyDate(selectedCalendarDate)}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {hasDayActivity(selectedCalendarDate) ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setWorkingDate(selectedCalendarDate);
                      setActiveTab('queue');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-100"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Day Plan</span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddCustomPlanTask(selectedCalendarDate, 'Self-directed study block');
                      playChime();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium flex items-center gap-1.5 hover:bg-stone-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Day Active ✅</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-stone-50/70 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800 pb-1.5">
                    <span>Tasks & Goals ({inspectDayData.plan.filter(p => p.completed).length}/{inspectDayData.plan.length})</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {inspectDayData.plan.length === 0 ? (
                      <span className="text-stone-400 italic">No tasks logged.</span>
                    ) : (
                      inspectDayData.plan.map(task => (
                        <div
                          key={task.id}
                          onClick={() => handleTogglePlanTask(task.id, selectedCalendarDate)}
                          className="flex items-center space-x-2 p-1.5 bg-white dark:bg-[#121824] rounded-lg border border-stone-200 dark:border-stone-800 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-0"
                          />
                          <span className={`truncate text-[11px] ${task.completed ? 'line-through text-stone-400' : 'text-stone-700 dark:text-stone-300 font-medium'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-3 bg-stone-50/70 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800 pb-1.5">
                    <span>Subtopics Studied ({inspectDayData.topics.length})</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {inspectDayData.topics.length === 0 ? (
                      <span className="text-stone-400 italic">No subtopics logged.</span>
                    ) : (
                      inspectDayData.topics.map(tId => (
                        <div key={tId} className="p-1.5 bg-white dark:bg-[#121824] rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                          <span className="truncate text-[11px] text-stone-700 dark:text-stone-300 font-medium">{findSubtopicTitle(tId)}</span>
                          <button
                            onClick={() => handleToggleSubtopic(tId, false, selectedCalendarDate)}
                            className="text-stone-400 hover:text-rose-500 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-3 bg-stone-50/70 dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800 pb-1.5">
                    <span>Applications & Stage Moves ({inspectDayData.appEvents.length})</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {inspectDayData.appEvents.length === 0 ? (
                      <span className="text-stone-400 italic">No application actions.</span>
                    ) : (
                      inspectDayData.appEvents.map((evt, idx) => {
                        const meta = KANBAN_STAGES.find(s => s.id === evt.stage) || { icon: '📨', color: 'bg-blue-500/10 text-blue-500' };
                        return (
                          <div key={idx} className="p-1.5 bg-white dark:bg-[#121824] rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[11px] text-stone-800 dark:text-stone-200">{evt.company}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono border ${meta.color}`}>
                                {meta.icon} {evt.stage}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-500 line-clamp-1">{evt.role}</p>
                            {evt.note && <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 p-1 rounded">{evt.note}</p>}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. APPLICATIONS KANBAN */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Job Applications Pipeline</h3>
                <p className="text-xs text-stone-500">Every application submission and stage advancement is logged to that specific date on your calendar!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {KANBAN_STAGES.map(stage => {
                const stageApps = applications.filter(a => a.stage === stage.id);
                return (
                  <div key={stage.id} className="bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800/80 p-3 flex flex-col min-h-[450px]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center space-x-1.5">
                        <span>{stage.icon}</span>
                        <h4 className="text-xs font-bold font-mono uppercase text-stone-700 dark:text-stone-300">{stage.label}</h4>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">{stageApps.length}</span>
                    </div>

                    <div className="space-y-2 flex-1">
                      {stageApps.map(app => {
                        const latestHistory = (app.history && app.history[app.history.length - 1]) || { date: app.dateApplied };
                        return (
                          <div key={app.id} className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                            <div className="flex items-start justify-between">
                              <span className="font-bold text-stone-900 dark:text-stone-100">{app.company}</span>
                              <div className="flex items-center space-x-1.5">
                                <span className="text-[10px] font-mono text-stone-400">📅 {latestHistory.date || app.dateApplied}</span>
                                <button
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="text-stone-400 hover:text-rose-500 p-0.5 transition"
                                  title="Delete application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 line-clamp-1">{app.role}</p>

                            <select
                              value={app.stage}
                              onChange={(e) => openStageTransitionModal(app, e.target.value)}
                              className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg p-1 text-[11px] focus:outline-none"
                            >
                              {KANBAN_STAGES.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. 24H INDIA JOB DISCOVERY & PORTALS RADAR */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">India Hiring Portals &bull; Live Search Launchpad</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Explore any portal, find the opening, and add it below with the exact URL and description.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalAddPortalOpen(true)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>+ Add Hiring Portal</span>
                  </button>
                  <button
                    onClick={() => setModalAddJobOpen(true)}
                    className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Discovered Job Link</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {hiringPortals.map((portal, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50/70 hover:bg-stone-100 dark:bg-stone-900/40 dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl flex items-start justify-between transition group"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center space-x-2">
                        <a
                          href={portal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:underline"
                        >
                          {portal.name}
                        </a>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                          {portal.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-snug">{portal.desc}</p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {portal.isCustom && (
                        <button
                          onClick={() => handleDeletePortal(portal.name)}
                          className="p-1 text-stone-400 hover:text-rose-500 transition"
                          title="Delete portal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">Discovered Openings ({discoveredJobs.length})</h4>
                <input
                  type="text"
                  placeholder="Filter by company, skill..."
                  value={searchJobQuery}
                  onChange={(e) => setSearchJobQuery(e.target.value)}
                  className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                />
              </div>

              {discoveredJobs.length === 0 ? (
                <div className="bg-white dark:bg-[#121824] p-12 text-center rounded-2xl border border-stone-200 dark:border-stone-800/80 text-stone-400 text-xs">
                  <Compass className="w-8 h-8 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
                  <p className="font-semibold text-stone-600 dark:text-stone-300">No custom jobs added yet.</p>
                  <p className="text-stone-400 mt-1">
                    Open any portal link above, copy the job URL, paste it into <strong>"+ Add Discovered Job Link"</strong>!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {discoveredJobs
                    .filter(j => j.company.toLowerCase().includes(searchJobQuery.toLowerCase()) || j.role.toLowerCase().includes(searchJobQuery.toLowerCase()))
                    .map(job => (
                      <div key={job.id} className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 flex flex-col justify-between space-y-3 shadow-sm">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900 dark:text-stone-100">{job.company}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono text-stone-400">{job.addedAt}</span>
                              <button
                                onClick={() => handleDeleteDiscoveredJob(job.id)}
                                className="p-1 text-stone-400 hover:text-rose-500 transition rounded"
                                title="Remove job opening"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">{job.role}</p>

                          <div className="flex items-center space-x-2 text-[11px] text-stone-500 font-mono">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>

                          <p className="text-[11px] text-stone-500 line-clamp-3 bg-stone-50 dark:bg-stone-900/50 p-2 rounded-lg font-mono whitespace-pre-wrap">
                            {job.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2 text-xs">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg flex items-center gap-1 font-medium transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Link</span>
                          </a>

                          <button
                            onClick={() => handleApplyAndMoveToKanban(job)}
                            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-medium transition"
                          >
                            Apply & Kanban &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. ATS RESUME MAKER & LIVE A4 PREVIEW */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">ATS Resume Builder &bull; LaTeX Style</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                    Live Real-Time Sync
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Curate your sections, descriptions, and font sizes. Updates instantly on the right sheet. Download cleanly as PDF.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    if (confirm('Reset resume to default SDE template?')) {
                      setResumeData(JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA)));
                      playChime();
                      showToast('Resume reset to standard template');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition"
                  title="Reset to default SDE resume"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleAddResumeSection}
                  className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-lg font-medium flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Section</span>
                </button>

                <button
                  onClick={handlePrintResume}
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: CUSTOMIZATION & CURATION EDITOR */}
              <div className="xl:col-span-5 space-y-4">
                {/* Typography & Spacing Toolbar */}
                <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-500 pb-2 border-b border-stone-100 dark:border-stone-800">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Styling & Typography Controls</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-1">Font Family</label>
                      <select
                        value={resumeData.settings.fontFamily}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          settings: { ...resumeData.settings, fontFamily: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-medium focus:outline-none"
                      >
                        <option value="serif">Computer Modern / Times</option>
                        <option value="garamond">Garamond (Classic)</option>
                        <option value="sans">Inter (Modern Sans)</option>
                        <option value="mono">JetBrains Mono</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-1">Base Font Size</label>
                      <select
                        value={resumeData.settings.fontSize}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          settings: { ...resumeData.settings, fontSize: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-medium focus:outline-none"
                      >
                        <option value="sm">Compact (9.5 pt)</option>
                        <option value="base">Standard (10.5 pt)</option>
                        <option value="lg">Relaxed (11.5 pt)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-1">Right Stack Size</label>
                      <select
                        value={resumeData.settings.rightLabelSize || 'sm'}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          settings: { ...resumeData.settings, rightLabelSize: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-medium focus:outline-none"
                      >
                        <option value="xs">Very Small (10px)</option>
                        <option value="sm">Small (11px)</option>
                        <option value="base">Standard (12px)</option>
                        <option value="lg">Match Body (13.5px)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-1">Page Spacing</label>
                      <select
                        value={resumeData.settings.spacing || 'compact'}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          settings: { ...resumeData.settings, spacing: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-medium focus:outline-none"
                      >
                        <option value="compact">Compact (Strict 1 Page)</option>
                        <option value="normal">Standard Spacing</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Header & Personal Info Editor */}
                <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block pb-2 border-b border-stone-100 dark:border-stone-800">
                    Candidate Info & Top Links
                  </span>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-0.5">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.header.fullName}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          header: { ...resumeData.header, fullName: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs font-bold tracking-wide focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-0.5">City, State / Country</label>
                        <input
                          type="text"
                          value={resumeData.header.location}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            header: { ...resumeData.header, location: e.target.value }
                          })}
                          className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-500 font-medium mb-0.5">Phone Number</label>
                        <input
                          type="text"
                          value={resumeData.header.phone}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            header: { ...resumeData.header, phone: e.target.value }
                          })}
                          className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs font-mono focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-500 font-medium mb-0.5">Email Address</label>
                      <input
                        type="email"
                        value={resumeData.header.email}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          header: { ...resumeData.header, email: e.target.value }
                        })}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <span className="block text-[11px] text-stone-500 font-semibold mb-1">Header Social / Portfolio Links:</span>
                      <div className="space-y-1.5">
                        {resumeData.header.links.map((link, idx) => (
                          <div key={link.id} className="flex gap-1.5 items-center">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const updatedLinks = [...resumeData.header.links];
                                updatedLinks[idx].label = e.target.value;
                                setResumeData({ ...resumeData, header: { ...resumeData.header, links: updatedLinks } });
                              }}
                              className="w-24 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-semibold"
                              placeholder="Label"
                            />
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => {
                                const updatedLinks = [...resumeData.header.links];
                                updatedLinks[idx].url = e.target.value;
                                setResumeData({ ...resumeData, header: { ...resumeData.header, links: updatedLinks } });
                              }}
                              className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1.5 text-xs font-mono"
                              placeholder="https://..."
                            />
                            <button
                              onClick={() => {
                                const updatedLinks = resumeData.header.links.filter(l => l.id !== link.id);
                                setResumeData({ ...resumeData, header: { ...resumeData.header, links: updatedLinks } });
                              }}
                              className="p-1.5 text-stone-400 hover:text-rose-500"
                              title="Delete Link"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newLink = { id: 'l-' + Date.now(), label: 'Website', url: 'https://', icon: 'globe' };
                            setResumeData({
                              ...resumeData,
                              header: { ...resumeData.header, links: [...resumeData.header.links, newLink] }
                            });
                          }}
                          className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>+ Add Header Link</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Manager */}
                <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Resume Sections Manager</span>
                    <button
                      onClick={handleAddResumeSection}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>New Section</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {resumeData.sections.map((section, sIndex) => {
                      const isActive = activeResumeSectionId === section.id;
                      return (
                        <div
                          key={section.id}
                          className={`rounded-xl border transition overflow-hidden ${
                            isActive
                              ? 'border-stone-900 dark:border-stone-600 bg-stone-50/80 dark:bg-stone-900/50 shadow-sm'
                              : 'border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#121824]'
                          }`}
                        >
                          <div
                            onClick={() => setActiveResumeSectionId(section.id)}
                            className="p-3 flex items-center justify-between cursor-pointer select-none"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-stone-400" />
                              <span className="font-bold text-xs tracking-wider text-stone-900 dark:text-stone-100">{section.title}</span>
                              <span className="text-[10px] font-mono text-stone-400">({section.type})</span>
                            </div>

                            <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => moveResumeSection(sIndex, -1)}
                                disabled={sIndex === 0}
                                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-20"
                                title="Move Up"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => moveResumeSection(sIndex, 1)}
                                disabled={sIndex === resumeData.sections.length - 1}
                                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-20"
                                title="Move Down"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove section "${section.title}"?`)) {
                                    setResumeData({
                                      ...resumeData,
                                      sections: resumeData.sections.filter(s => s.id !== section.id)
                                    });
                                  }
                                }}
                                className="p-1 text-stone-400 hover:text-rose-500"
                                title="Delete Section"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {isActive && (
                            <div className="p-3 bg-white dark:bg-stone-950/70 border-t border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                              <div>
                                <label className="block text-[11px] text-stone-500 font-medium mb-1">Section Title</label>
                                <input
                                  type="text"
                                  value={section.title}
                                  onChange={(e) => {
                                    const updated = [...resumeData.sections];
                                    updated[sIndex].title = e.target.value.toUpperCase();
                                    setResumeData({ ...resumeData, sections: updated });
                                  }}
                                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 font-bold tracking-wider text-xs focus:outline-none"
                                />
                              </div>

                              {section.type === 'entries' && (
                                <div className="space-y-4">
                                  {section.entries.map((entry, eIndex) => (
                                    <div key={entry.id} className="p-3 bg-stone-50 dark:bg-stone-900/50 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                                      <div className="flex items-center justify-between pb-1 border-b border-stone-200 dark:border-stone-800">
                                        <span className="font-semibold text-[11px] text-stone-600 dark:text-stone-300">Item #{eIndex + 1}</span>
                                        <button
                                          onClick={() => {
                                            const updated = [...resumeData.sections];
                                            updated[sIndex].entries = updated[sIndex].entries.filter(ent => ent.id !== entry.id);
                                            setResumeData({ ...resumeData, sections: updated });
                                          }}
                                          className="text-stone-400 hover:text-rose-500 p-0.5"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-[10px] text-stone-500">Primary Title (Role / Project / Degree)</label>
                                          <input
                                            type="text"
                                            value={entry.primaryTitle}
                                            onChange={(e) => {
                                              const updated = [...resumeData.sections];
                                              updated[sIndex].entries[eIndex].primaryTitle = e.target.value;
                                              setResumeData({ ...resumeData, sections: updated });
                                            }}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs font-semibold"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-stone-500">Right Label (Dates / Stack)</label>
                                          <input
                                            type="text"
                                            value={entry.primaryRight}
                                            onChange={(e) => {
                                              const updated = [...resumeData.sections];
                                              updated[sIndex].entries[eIndex].primaryRight = e.target.value;
                                              setResumeData({ ...resumeData, sections: updated });
                                            }}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs font-mono"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="block text-[10px] text-stone-500">Sub-Title (Company / College / Tagline)</label>
                                          <input
                                            type="text"
                                            value={entry.subTitle}
                                            onChange={(e) => {
                                              const updated = [...resumeData.sections];
                                              updated[sIndex].entries[eIndex].subTitle = e.target.value;
                                              setResumeData({ ...resumeData, sections: updated });
                                            }}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] text-stone-500">Sub Right (Location / Date)</label>
                                          <input
                                            type="text"
                                            value={entry.subRight}
                                            onChange={(e) => {
                                              const updated = [...resumeData.sections];
                                              updated[sIndex].entries[eIndex].subRight = e.target.value;
                                              setResumeData({ ...resumeData, sections: updated });
                                            }}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs font-mono"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label className="block text-[10px] text-stone-500">Project / Demo Link (Optional)</label>
                                        <input
                                          type="url"
                                          value={entry.primaryLink || ''}
                                          onChange={(e) => {
                                            const updated = [...resumeData.sections];
                                            updated[sIndex].entries[eIndex].primaryLink = e.target.value;
                                            setResumeData({ ...resumeData, sections: updated });
                                          }}
                                          placeholder="https://github.com/..."
                                          className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs font-mono"
                                        />
                                      </div>

                                      <div className="pt-1">
                                        <label className="block text-[10px] text-stone-500 mb-1 font-semibold">Bullet Points:</label>
                                        <div className="space-y-1.5">
                                          {(entry.bullets || []).map((bullet, bIndex) => (
                                            <div key={bIndex} className="flex gap-1 items-start">
                                              <span className="text-stone-400 font-bold mt-1">&bull;</span>
                                              <textarea
                                                rows={2}
                                                value={bullet}
                                                onChange={(e) => {
                                                  const updated = [...resumeData.sections];
                                                  updated[sIndex].entries[eIndex].bullets[bIndex] = e.target.value;
                                                  setResumeData({ ...resumeData, sections: updated });
                                                }}
                                                className="flex-1 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs leading-relaxed focus:outline-none"
                                              />
                                              <button
                                                onClick={() => {
                                                  const updated = [...resumeData.sections];
                                                  updated[sIndex].entries[eIndex].bullets = updated[sIndex].entries[eIndex].bullets.filter((_, idx) => idx !== bIndex);
                                                  setResumeData({ ...resumeData, sections: updated });
                                                }}
                                                className="text-stone-400 hover:text-rose-500 p-1"
                                                title="Delete bullet"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            </div>
                                          ))}
                                          <button
                                            onClick={() => {
                                              const updated = [...resumeData.sections];
                                              if (!updated[sIndex].entries[eIndex].bullets) updated[sIndex].entries[eIndex].bullets = [];
                                              updated[sIndex].entries[eIndex].bullets.push('Architected feature resulting in 20% latency optimization.');
                                              setResumeData({ ...resumeData, sections: updated });
                                            }}
                                            className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 mt-1"
                                          >
                                            <Plus className="w-3 h-3" />
                                            <span>+ Add Bullet Point</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    onClick={() => {
                                      const newEntry = {
                                        id: 'ent-' + Date.now(),
                                        primaryTitle: 'Role / Project Title',
                                        primaryRight: 'MM YYYY – MM YYYY',
                                        subTitle: 'Company / Organization Name',
                                        subRight: 'City, Country',
                                        bullets: ['Engineered high-performance module with optimal time complexity.']
                                      };
                                      const updated = [...resumeData.sections];
                                      updated[sIndex].entries.push(newEntry);
                                      setResumeData({ ...resumeData, sections: updated });
                                    }}
                                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add Another Entry</span>
                                  </button>
                                </div>
                              )}

                              {section.type === 'skills_grid' && (
                                <div className="space-y-2">
                                  {section.skillCategories.map((cat, cIndex) => (
                                    <div key={cIndex} className="p-2 bg-stone-50 dark:bg-stone-900/50 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-col gap-1">
                                      <div className="flex items-center justify-between">
                                        <input
                                          type="text"
                                          value={cat.label}
                                          onChange={(e) => {
                                            const updated = [...resumeData.sections];
                                            updated[sIndex].skillCategories[cIndex].label = e.target.value;
                                            setResumeData({ ...resumeData, sections: updated });
                                          }}
                                          className="w-40 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1 text-xs font-bold"
                                        />
                                        <button
                                          onClick={() => {
                                            const updated = [...resumeData.sections];
                                            updated[sIndex].skillCategories = updated[sIndex].skillCategories.filter((_, idx) => idx !== cIndex);
                                            setResumeData({ ...resumeData, sections: updated });
                                          }}
                                          className="text-stone-400 hover:text-rose-500 p-0.5"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <input
                                        type="text"
                                        value={cat.value}
                                        onChange={(e) => {
                                          const updated = [...resumeData.sections];
                                          updated[sIndex].skillCategories[cIndex].value = e.target.value;
                                          setResumeData({ ...resumeData, sections: updated });
                                        }}
                                        className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs font-mono"
                                      />
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const updated = [...resumeData.sections];
                                      updated[sIndex].skillCategories.push({ label: 'New Category', value: 'Skill A, Skill B, Skill C' });
                                      setResumeData({ ...resumeData, sections: updated });
                                    }}
                                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 pt-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>+ Add Skill Category</span>
                                  </button>
                                </div>
                              )}

                              {section.type === 'tag_list' && (
                                <div className="space-y-2">
                                  <label className="block text-[10px] text-stone-500">Comma-separated course titles or skills:</label>
                                  <textarea
                                    rows={3}
                                    value={section.tags.join(', ')}
                                    onChange={(e) => {
                                      const updated = [...resumeData.sections];
                                      updated[sIndex].tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                                      setResumeData({ ...resumeData, sections: updated });
                                    }}
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs font-mono focus:outline-none"
                                  />
                                </div>
                              )}

                              {section.type === 'bullet_list' && (
                                <div className="space-y-1.5">
                                  {section.bullets.map((b, bIdx) => (
                                    <div key={bIdx} className="flex gap-1 items-start">
                                      <span className="text-stone-400 font-bold mt-1">&bull;</span>
                                      <textarea
                                        rows={2}
                                        value={b}
                                        onChange={(e) => {
                                          const updated = [...resumeData.sections];
                                          updated[sIndex].bullets[bIndex] = e.target.value;
                                          setResumeData({ ...resumeData, sections: updated });
                                        }}
                                        className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded p-1.5 text-xs focus:outline-none"
                                      />
                                      <button
                                        onClick={() => {
                                          const updated = [...resumeData.sections];
                                          updated[sIndex].bullets = updated[sIndex].bullets.filter((_, idx) => idx !== bIndex);
                                          setResumeData({ ...resumeData, sections: updated });
                                        }}
                                        className="text-stone-400 hover:text-rose-500 p-1"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const updated = [...resumeData.sections];
                                      updated[sIndex].bullets.push('Solved 200+ questions on LeetCode.');
                                      setResumeData({ ...resumeData, sections: updated });
                                    }}
                                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 pt-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>+ Add Bullet</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: REAL-TIME A4 PAPER SHEET PREVIEW */}
              <div className="xl:col-span-7 flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-2 mb-2 px-1 text-xs text-stone-500 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>A4 1-Page Output</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Type className="w-3 h-3 text-stone-400" />
                    <span>Font: {resumeData.settings.fontFamily.toUpperCase()}</span>
                  </span>
                </div>

                <div
                  id="resume-printable-document"
                  className={`w-full max-w-[800px] bg-white text-black shadow-2xl rounded-sm p-6 sm:p-8 border border-stone-300 transition-all duration-150 ${
                    resumeData.settings.fontSize === 'sm' ? 'text-[12px] leading-[1.28]' :
                    resumeData.settings.fontSize === 'lg' ? 'text-[14px] leading-[1.42]' :
                    'text-[12.8px] leading-[1.32]'
                  }`}
                  style={{
                    fontFamily: getSelectedFontFamilyCss(resumeData.settings.fontFamily)
                  }}
                >
                  {/* RESUME HEADER */}
                  <div className="text-center space-y-0.5 pb-1">
                    <h1 className="text-2xl sm:text-[26px] font-normal tracking-wide uppercase text-black" style={{ letterSpacing: '0.04em' }}>
                      {resumeData.header.fullName || 'YOUR NAME'}
                    </h1>
                    <div className="text-[11.5px] text-stone-700 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                      {resumeData.header.location && <span>{resumeData.header.location}</span>}
                      {resumeData.header.phone && (
                        <>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1 font-mono">{resumeData.header.phone}</span>
                        </>
                      )}
                      {resumeData.header.email && (
                        <>
                          <span>&bull;</span>
                          <a href={`mailto:${resumeData.header.email}`} className="text-black underline underline-offset-2">
                            {resumeData.header.email}
                          </a>
                        </>
                      )}
                    </div>

                    {resumeData.header.links && resumeData.header.links.length > 0 && (
                      <div className="text-[11px] text-stone-800 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 pt-0.5">
                        {resumeData.header.links.map((link, idx) => (
                          <React.Fragment key={link.id}>
                            {idx > 0 && <span className="text-stone-400">&bull;</span>}
                            <a
                              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black underline underline-offset-2 hover:text-blue-700 flex items-center gap-1"
                            >
                              <span>{link.label}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60 print-hidden" />
                            </a>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RESUME SECTIONS */}
                  <div className={`mt-1 ${resumeData.settings.spacing === 'compact' ? 'space-y-2' : 'space-y-3'}`}>
                    {resumeData.sections.map(section => (
                      <div key={section.id} className="space-y-1">
                        <div className="border-b border-black pb-0.5 section-header">
                          <h2 className="text-[12px] font-bold uppercase tracking-wider text-black">
                            {section.title}
                          </h2>
                        </div>

                        {section.type === 'entries' && (
                          <div className={resumeData.settings.spacing === 'compact' ? 'space-y-1.5' : 'space-y-2'}>
                            {section.entries.map(entry => (
                              <div key={entry.id} className="space-y-0.5">
                                <div className="flex items-baseline justify-between text-black">
                                  <div className="font-bold flex items-center gap-1.5">
                                    <span>{entry.primaryTitle}</span>
                                    {entry.primaryLink && (
                                      <a
                                        href={entry.primaryLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black inline-flex items-center hover:underline"
                                      >
                                        <ExternalLink className="w-2.5 h-2.5 opacity-70 print-hidden" />
                                      </a>
                                    )}
                                  </div>
                                  <span className={`font-medium text-black shrink-0 font-mono ${
                                    resumeData.settings.rightLabelSize === 'xs' ? 'text-[10px]' :
                                    resumeData.settings.rightLabelSize === 'sm' ? 'text-[11px]' :
                                    resumeData.settings.rightLabelSize === 'lg' ? 'text-[13px]' :
                                    'text-[11.5px]'
                                  }`}>
                                    {entry.primaryRight}
                                  </span>
                                </div>

                                {(entry.subTitle || entry.subRight) && (
                                  <div className="flex items-baseline justify-between text-[11.5px] italic text-stone-800">
                                    <span>{entry.subTitle}</span>
                                    {entry.subRight && (
                                      <span className={`not-italic text-stone-700 shrink-0 ${
                                        resumeData.settings.rightLabelSize === 'xs' ? 'text-[10px]' :
                                        resumeData.settings.rightLabelSize === 'sm' ? 'text-[11px]' :
                                        resumeData.settings.rightLabelSize === 'lg' ? 'text-[13px]' :
                                        'text-[11.5px]'
                                      }`}>
                                        {entry.subRight}
                                      </span>
                                    )}
                                  </div>
                                )}

                                {entry.bullets && entry.bullets.length > 0 && (
                                  <ul className="list-disc ml-4 space-y-0.5 text-stone-900 pt-0.5">
                                    {entry.bullets.map((bullet, bIdx) => (
                                      <li key={bIdx} className="pl-0.5">
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {section.type === 'skills_grid' && (
                          <div className="space-y-0.5 text-stone-900 pt-0.5">
                            {section.skillCategories.map((cat, cIdx) => (
                              <div key={cIdx} className="leading-snug">
                                <span className="font-bold text-black">{cat.label}: </span>
                                <span className="text-stone-900">{cat.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.type === 'tag_list' && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5 text-stone-900 pt-0.5 text-[11.5px]">
                            {section.tags.map((tag, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-1.5">
                                <span className="text-black text-xs">&bull;</span>
                                <span>{tag}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.type === 'bullet_list' && (
                          <ul className="list-disc ml-4 space-y-0.5 text-stone-900 pt-0.5">
                            {section.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="pl-0.5">
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. QUICK INTERVIEW PREP (FLASHCARD BOARDS) */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Quick Interview Prep &bull; Flashcard Boards</span>
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-semibold">
                    Interactive 3D Flip
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Review high-yield technical interview questions. Click any card to flip and reveal the answer, and track mastery.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setModalAddFlashcardOpen(true)}
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Flashcard</span>
                </button>
              </div>
            </div>

            {/* Filters & Mastery Stats */}
            <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-stone-400 font-medium">Domain:</span>
                <select
                  value={flashcardDomainFilter}
                  onChange={(e) => setFlashcardDomainFilter(e.target.value)}
                  className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="ALL">All Domains ({flashcards.length})</option>
                  {flashcardDomainsList.map(dom => (
                    <option key={dom} value={dom}>{dom}</option>
                  ))}
                </select>

                <span className="text-stone-400 font-medium ml-2">Status:</span>
                <select
                  value={flashcardStatusFilter}
                  onChange={(e) => setFlashcardStatusFilter(e.target.value)}
                  className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="ALL">All Cards</option>
                  <option value="review">Needs Review 🔄</option>
                  <option value="mastered">Mastered ✅</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 font-mono text-[11px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Mastered: {flashcards.filter(f => f.status === 'mastered').length}
                </span>
                <span className="text-stone-400">&bull;</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  Review: {flashcards.filter(f => f.status === 'review').length}
                </span>
              </div>
            </div>

            {/* Flashcard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFlashcards.map(card => {
                const isFlipped = Boolean(flippedCards[card.id]);
                const isMastered = card.status === 'mastered';

                return (
                  <div
                    key={card.id}
                    onClick={() => handleToggleFlipCard(card.id)}
                    className={`min-h-[290px] rounded-2xl p-5 border flex flex-col justify-between cursor-pointer select-none transition-all duration-200 shadow-sm relative group ${
                      isFlipped
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : isMastered
                        ? 'bg-white dark:bg-[#121824] border-emerald-300 dark:border-emerald-800/80 hover:shadow-md'
                        : 'bg-white dark:bg-[#121824] border-stone-200 dark:border-stone-800/80 hover:border-amber-400/80 hover:shadow-md'
                    }`}
                  >
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800/60">
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                          isFlipped
                            ? 'bg-stone-800 dark:bg-stone-200 text-stone-200 dark:text-stone-800'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        }`}>
                          {card.domain}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                        <span className={`text-[10px] font-mono font-bold ${
                          card.difficulty === 'Hard' ? 'text-rose-500' :
                          card.difficulty === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                        }`}>
                          {card.difficulty}
                        </span>

                        <button
                          onClick={() => handleDeleteFlashcard(card.id)}
                          className={`p-1 rounded hover:text-rose-500 transition ${
                            isFlipped ? 'text-stone-400' : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body: Question (Front) or Answer (Back) */}
                    <div className="my-auto py-3 space-y-2">
                      {!isFlipped ? (
                        <>
                          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">Question:</span>
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                            {card.question}
                          </h4>
                          <p className="text-[11px] text-stone-400 italic pt-2 flex items-center gap-1">
                            <span>👆 Click anywhere to flip & reveal answer</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-[11px] font-mono text-amber-400 dark:text-amber-600 uppercase tracking-wider block font-bold">Answer & Key Takeaway:</span>
                          <p className="text-xs leading-relaxed font-sans whitespace-pre-wrap">
                            {card.answer}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isFlipped ? 'border-stone-800 dark:border-stone-300' : 'border-stone-100 dark:border-stone-800'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleToggleFlipCard(card.id)}
                        className={`text-[11px] font-medium flex items-center gap-1 ${
                          isFlipped ? 'text-stone-300 dark:text-stone-700 hover:underline' : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isFlipped ? 'Show Question' : 'Reveal Answer'}</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleUpdateFlashcardStatus(card.id, 'review')}
                          className={`px-2 py-0.5 text-[10px] rounded font-medium border ${
                            card.status === 'review'
                              ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 font-bold'
                              : 'border-stone-300 dark:border-stone-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          Review 🔄
                        </button>
                        <button
                          onClick={() => handleUpdateFlashcardStatus(card.id, 'mastered')}
                          className={`px-2 py-0.5 text-[10px] rounded font-medium border ${
                            card.status === 'mastered'
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40 font-bold'
                              : 'border-stone-300 dark:border-stone-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          Mastered ✅
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* ================= MODALS ================= */}

      {/* Modal: Add Flashcard */}
      {modalAddFlashcardOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Add Interview Prep Flashcard</span>
              </h3>
              <button onClick={() => setModalAddFlashcardOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-500 mb-1">Domain / Track *</label>
                <input
                  type="text"
                  value={newFcDomain}
                  onChange={(e) => setNewFcDomain(e.target.value)}
                  placeholder="e.g. Core Java & Concurrency, Spring Boot, HLD"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-500 mb-1">Difficulty</label>
                <select
                  value={newFcDifficulty}
                  onChange={(e) => setNewFcDifficulty(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Interview Question *</label>
              <textarea
                rows={2}
                value={newFcQuestion}
                onChange={(e) => setNewFcQuestion(e.target.value)}
                placeholder="e.g. How does ConcurrentHashMap achieve high concurrency without locking the entire map?"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none font-semibold text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Answer / Key Points / Architecture *</label>
              <textarea
                rows={5}
                value={newFcAnswer}
                onChange={(e) => setNewFcAnswer(e.target.value)}
                placeholder="Explain the solution clearly with keywords (CAS operations, synchronized on first bucket node, lock striping)..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalAddFlashcardOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveNewFlashcard} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">
                Save Flashcard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Domain */}
      {modalAddDomainOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Add New Domain / Learning Track</h3>
            <input
              type="text"
              value={domainTitleInput}
              onChange={(e) => setDomainTitleInput(e.target.value)}
              placeholder="e.g. Distributed Systems & High-Level Design"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 focus:outline-none"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setModalAddDomainOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateDomain} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Add Domain</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Main Topic */}
      {modalAddTopicOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Add Main Topic under "{activeDomain?.title}"</h3>
            <input
              type="text"
              value={topicTitleInput}
              onChange={(e) => setTopicTitleInput(e.target.value)}
              placeholder="e.g. Concurrency, Virtual Threads & JVM Memory"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 focus:outline-none"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setModalAddTopicOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateTopic} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Add Topic</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Section & Subtopics */}
      {modalAddSectionOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Add Section to "{activeTopic?.title}"</h3>
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Section Title</label>
              <input
                type="text"
                value={sectionTitleInput}
                onChange={(e) => setSectionTitleInput(e.target.value)}
                placeholder="e.g. Thread Safety, Volatile & JMM"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Subtopics (One per line)</label>
              <textarea
                rows={4}
                value={sectionSubtopicsInput}
                onChange={(e) => setSectionSubtopicsInput(e.target.value)}
                placeholder="Synchronized Blocks & ReentrantLock&#10;Volatile keyword and visibility&#10;Thread-safe Singleton implementation"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 font-mono focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setModalAddSectionOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateSection} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Save Section</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Hiring Portal */}
      {modalAddPortalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Add Hiring Portal / Board</h3>
            <div>
              <label className="block text-stone-500 mb-1">Portal Name *</label>
              <input
                type="text"
                value={newPortalName}
                onChange={(e) => setNewPortalName(e.target.value)}
                placeholder="e.g. Wellfound, Hasjob, Foundit"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Portal URL *</label>
              <input
                type="text"
                value={newPortalUrl}
                onChange={(e) => setNewPortalUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Description</label>
              <input
                type="text"
                value={newPortalDesc}
                onChange={(e) => setNewPortalDesc(e.target.value)}
                placeholder="Brief description of the platform..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Category / Tag</label>
              <input
                type="text"
                value={newPortalTag}
                onChange={(e) => setNewPortalTag(e.target.value)}
                placeholder="e.g. Startups, Remote, MNCs"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 focus:outline-none"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalAddPortalOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveCustomPortal} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Add Portal</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Discovered Job Link (Manual Entry) */}
      {modalAddJobOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Add Discovered Job Opening</h3>
                <p className="text-stone-400 text-[11px] mt-0.5">Paste the link and add the JD and details manually.</p>
              </div>
              <button onClick={() => setModalAddJobOpen(false)} className="text-stone-400 hover:text-stone-600 text-base">
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="block text-stone-600 dark:text-stone-400 font-medium">Application Link URL *</label>
              <input
                type="url"
                value={newJobUrl}
                onChange={(e) => setNewJobUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-stone-500 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={newJobCompany}
                  onChange={(e) => setNewJobCompany(e.target.value)}
                  placeholder="e.g. Swiggy, Amazon, Zepto"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block text-stone-500 mb-1">Role Title</label>
                <input
                  type="text"
                  value={newJobRole}
                  onChange={(e) => setNewJobRole(e.target.value)}
                  placeholder="e.g. SDE II Backend"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-500 mb-1">Location</label>
                <input
                  type="text"
                  value={newJobLocation}
                  onChange={(e) => setNewJobLocation(e.target.value)}
                  placeholder="e.g. Bengaluru / Hybrid"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="block text-stone-500 mb-1">Required Experience</label>
                <input
                  type="text"
                  value={newJobYoe}
                  onChange={(e) => setNewJobYoe(e.target.value)}
                  placeholder="e.g. 1 - 3 Years"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Skills Tags (comma separated)</label>
              <input
                type="text"
                value={newJobTags}
                onChange={(e) => setNewJobTags(e.target.value)}
                placeholder="e.g. Java, Spring Boot, Elasticsearch, Kafka"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Job Description (JD)</label>
              <textarea
                rows={6}
                value={newJobDescription}
                onChange={(e) => setNewJobDescription(e.target.value)}
                placeholder="Paste the full job description, team details, and key requirements here..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono text-[11px]"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalAddJobOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveDiscoveredJob} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Save Opening</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Stage Transition with Specific Date & Notes */}
      {modalStageTransitionApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-purple-500" />
              <span>Log Stage Transfer & Date</span>
            </h3>

            <div>
              <span className="text-stone-400">Company & Role:</span>
              <p className="font-bold text-stone-800 dark:text-stone-200">{modalStageTransitionApp.company} &bull; {modalStageTransitionApp.role}</p>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Target Stage</label>
              <select
                value={stageTransitionTarget}
                onChange={(e) => setStageTransitionTarget(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2 text-xs"
              >
                {KANBAN_STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Date of Transfer (Logs to Calendar) *</label>
              <input
                type="date"
                value={stageTransitionDate}
                onChange={(e) => setStageTransitionDate(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Round Feedback / Notes</label>
              <textarea
                rows={2}
                value={stageTransitionNote}
                onChange={(e) => setStageTransitionNote(e.target.value)}
                placeholder="e.g. Conducted Live Coding: 2 Medium Trees + Concurrency questions..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2 text-xs"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalStageTransitionApp(null)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={confirmStageTransition} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium">Confirm & Log to Date</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reschedule / Move Subtopic to Another Date */}
      {rescheduleSubtopic && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Reschedule / Move Subtopic</span>
              </h3>
              <button onClick={() => setRescheduleSubtopic(null)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div>
              <span className="text-stone-400 block text-[11px]">Topic to move:</span>
              <p className="font-bold text-stone-800 dark:text-stone-200 text-xs mt-0.5">{rescheduleSubtopic.title}</p>
              <span className="text-[11px] font-mono text-stone-500 block mt-1">Currently planned for: {formatPrettyDate(rescheduleSubtopic.currentDate)}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-stone-500 font-medium">Quick Shortcuts:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRescheduleTargetDate(getTodayDateString())}
                  className={`p-2 rounded-lg border text-center font-medium transition ${rescheduleTargetDate === getTodayDateString() ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'}`}
                >
                  Today
                </button>
                <button
                  onClick={() => setRescheduleTargetDate(getOffsetDateString(1))}
                  className={`p-2 rounded-lg border text-center font-medium transition ${rescheduleTargetDate === getOffsetDateString(1) ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'}`}
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => setRescheduleTargetDate(getOffsetDateString(2))}
                  className={`p-2 rounded-lg border text-center font-medium transition ${rescheduleTargetDate === getOffsetDateString(2) ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'}`}
                >
                  In 2 Days
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-500 mb-1">Or choose custom target date:</label>
              <input
                type="date"
                value={rescheduleTargetDate}
                onChange={(e) => setRescheduleTargetDate(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:border-stone-900 dark:focus:border-stone-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => handleRemoveSubtopicFromDay(rescheduleSubtopic.id, rescheduleSubtopic.currentDate)}
                className="px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-medium transition"
              >
                Remove from Day Plan
              </button>
              <div className="flex space-x-2">
                <button onClick={() => setRescheduleSubtopic(null)} className="px-3.5 py-2 text-stone-500">Cancel</button>
                <button
                  onClick={() => handleRescheduleSubtopic(rescheduleSubtopic.id, rescheduleSubtopic.currentDate, rescheduleTargetDate)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl font-medium"
                >
                  Move to {formatPrettyDate(rescheduleTargetDate)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 shadow-xl border border-stone-700/50 dark:border-stone-300 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
