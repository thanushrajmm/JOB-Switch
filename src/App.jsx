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
    rightLabelSize: 'sm',
    margins: 'normal',
    spacing: 'compact'
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

  const [domains, setDomains] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_domains_v1');
    return saved ? JSON.parse(saved) : DEFAULT_CURRICULUM;
  });

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

  const [dayLogs, setDayLogs] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_daylogs_v1');
    return saved ? JSON.parse(saved) : {};
  });

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

  const [expandedSubtopicNotes, setExpandedSubtopicNotes] = useState({});
  const [expandedTaskNotes, setExpandedTaskNotes] = useState({});

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

  const [rescheduleSubtopic, setRescheduleSubtopic] = useState(null);
  const [rescheduleTargetDate, setRescheduleTargetDate] = useState(() => getOffsetDateString(1));

  const [hiringPortals, setHiringPortals] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_portals_v1');
    return saved ? JSON.parse(saved) : HIRING_PORTALS;
  });

  const [newPortalName, setNewPortalName] = useState('');
  const [newPortalUrl, setNewPortalUrl] = useState('');
  const [newPortalDesc, setNewPortalDesc] = useState('');
  const [newPortalTag, setNewPortalTag] = useState('Custom Portal');

  const [domainTitleInput, setDomainTitleInput] = useState('');
  const [topicTitleInput, setTopicTitleInput] = useState('');
  const [sectionTitleInput, setSectionTitleInput] = useState('');
  const [sectionSubtopicsInput, setSectionSubtopicsInput] = useState('');
  const [quickSubtopicTitle, setQuickSubtopicTitle] = useState('');
  const [dailyPlanInput, setDailyPlanInput] = useState('');
  const [searchJobQuery, setSearchJobQuery] = useState('');

  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobRole, setNewJobRole] = useState('');
  const [newJobUrl, setNewJobUrl] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Bengaluru / Hybrid');
  const [newJobYoe, setNewJobYoe] = useState('1 - 3 Years');
  const [newJobTags, setNewJobTags] = useState('Java, Spring Boot, Microservices');
  const [newJobDescription, setNewJobDescription] = useState('');

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
              <p className="text-xs text-stone-500 hidden sm:block">Full-Stack (2 YOE) → Cloud, Distributed & Applied AI SWE</p>
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

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
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

        {/* ... remaining tabs (queue, jobs, applications, calendar, resume, flashcards) ... */}
      </main>

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
