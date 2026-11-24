import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  FolderPlus,
  ListPlus,
  Edit3,
  Sparkles,
  Link as LinkIcon,
  Clock,
  MapPin,
  FileText,
  RotateCcw,
  Download,
  Upload,
  Loader2,
  GitCommit,
  Globe,
  Printer,
  Sliders,
  Type,
  MoveUp,
  MoveDown,
  Code,
  Terminal,
  Play,
  FolderOpen,
  Save,
  Wand2,
  Database,
  Table as TableIcon,
  Bookmark,
  Star
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
  }
];

const BASIC_JAVA_TEMPLATE = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 25, 30, 45};
        int sum = 0;

        for (int i = 0; i < nums.length; i++) {
            sum = sum + nums[i];
        }

        System.out.println("Total Sum: " + sum);
    }
}`;

const DEFAULT_SQL_QUERY = `SELECT e.emp_id, e.full_name, e.role, d.dept_name, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.salary DESC;`;

const SQL_SEED_SCRIPT = `
CREATE TABLE departments (
  dept_id INTEGER PRIMARY KEY,
  dept_name TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE employees (
  emp_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  dept_id INTEGER,
  salary INTEGER,
  hire_date TEXT
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  emp_id INTEGER,
  amount REAL,
  status TEXT,
  order_date TEXT
);

INSERT INTO departments VALUES
  (1, 'Backend & Cloud', 'Bengaluru'),
  (2, 'Applied AI & Search', 'Hyderabad'),
  (3, 'Platform Reliability', 'Chennai');

INSERT INTO employees VALUES
  (101, 'Thanushraj M M', 'Software Engineer', 1, 1850000, '2025-02-01'),
  (102, 'Ananya Sharma', 'Senior SDE', 2, 2600000, '2023-06-15'),
  (103, 'Karthik Nair', 'Staff Engineer', 1, 3400000, '2021-11-10'),
  (104, 'Priya Menon', 'ML Engineer', 2, 2250000, '2024-01-20'),
  (105, 'Rohan Verma', 'SRE II', 3, 2100000, '2023-09-05');

INSERT INTO orders VALUES
  (5001, 101, 14500.50, 'COMPLETED', '2026-10-02'),
  (5002, 102, 28900.00, 'COMPLETED', '2026-10-05'),
  (5003, 101, 9200.00, 'PENDING', '2026-10-12'),
  (5004, 103, 41200.75, 'COMPLETED', '2026-10-18'),
  (5005, 104, 17800.00, 'COMPLETED', '2026-11-01');
`;

const DEFAULT_SNIPPET_FOLDERS = [
  'General',
  'Arrays & Hashing',
  'Linked Lists',
  'Trees & Graphs',
  'Dynamic Programming',
  'SQL Queries'
];

const DEFAULT_BOOKMARK_CATEGORIES = [
  'DSA & Algorithms',
  'System Design & HLD',
  'Java & Spring Boot',
  'Databases & Search',
  'Applied AI & ML',
  'General Learning'
];

const DEFAULT_BOOKMARKS = [
  {
    id: 'bm-1',
    title: 'NeetCode Roadmap & DSA',
    url: 'https://neetcode.io/roadmap',
    category: 'DSA & Algorithms',
    notes: 'Structured blind-75 and 150 pattern-based coding interview practice.',
    favorite: true,
    addedAt: 'Starter'
  },
  {
    id: 'bm-2',
    title: 'ByteByteGo System Design',
    url: 'https://bytebytego.com',
    category: 'System Design & HLD',
    notes: 'Visual distributed systems diagrams, caching, message queues & scaling patterns.',
    favorite: true,
    addedAt: 'Starter'
  },
  {
    id: 'bm-3',
    title: 'Baeldung — Java & Spring Guides',
    url: 'https://www.baeldung.com',
    category: 'Java & Spring Boot',
    notes: 'Deep dives on Spring Boot, JPA, Security, Concurrency, and JVM internals.',
    favorite: false,
    addedAt: 'Starter'
  },
  {
    id: 'bm-4',
    title: 'Elasticsearch Official Reference',
    url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html',
    category: 'Databases & Search',
    notes: 'Query DSL, aggregations, index mappings, and kNN vector search documentation.',
    favorite: false,
    addedAt: 'Starter'
  }
];

const DEFAULT_LATEX_RESUME = `\\documentclass[10pt, a4paper]{article}
\\usepackage[top=0.35in, bottom=0.35in, left=0.48in, right=0.48in]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\hypersetup{colorlinks=true, urlcolor=black, linkcolor=black}

\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

% Ensure 100% ATS character & ligature extraction accuracy
\\pdfgentounicode=1

% Clean, balanced section headers
\\titleformat{\\section}
  {\\normalfont\\large\\bfseries\\centering}
  {}{0em}{}
  [\\vspace{-4pt}\\rule{\\linewidth}{0.4pt}]
\\titlespacing{\\section}{0pt}{6pt}{3.5pt}

\\begin{document}

% ---- HEADER ----
\\begin{center}
    {\\LARGE\\textbf{THANUSHRAJ M M}}\\\\[2pt]
    {\\normalsize\\textbf{Software Engineer}}\\\\[2pt]
    {\\small
      +91 9123573517 \\,$\\bullet$\\, 
      \\href{mailto:thanushrajmm@gmail.com}{thanushrajmm@gmail.com} \\,$\\bullet$\\, 
      \\href{https://linkedin.com/in/thanushrajmm/}{LinkedIn} \\,$\\bullet$\\, 
      \\href{https://github.com/thanushrajmm}{GitHub} \\,$\\bullet$\\, 
      Bengaluru, India
    }
\\end{center}

% ---- SUMMARY ----
\\section{Summary}
\\vspace{0.5pt}
Full-Stack Software Engineer with \\textbf{nearly 2 years (1.8+ years)} of production experience building high-throughput backend APIs with \\textbf{Spring Boot}, distributed search \\& aggregation pipelines in \\textbf{Elasticsearch}, and interactive analytics UIs using \\textbf{Vue.js, React.js, and D3.js}. Proven track record of cutting UI rendering latency by \\textbf{90\\%} via \\textbf{Web Workers}, architecting asynchronous messaging pipelines, and accelerating sprint delivery velocity by \\textbf{40\\%} through AI-assisted engineering workflows.

\\vspace{1.5pt}

% ---- EXPERIENCE ----
\\section{Experience}
\\vspace{1pt}

\\textbf{JBPB Offshore Pvt Ltd} \\textnormal{(formerly HikeOn Technologies)} \\hfill Bengaluru, India \\\\
\\textbf{Software Engineer} \\hfill 02/2025 -- Present

\\vspace{2.5pt}
\\textit{\\textbf{KPI Dashboard \\& Enterprise Analytics System}}
\\begin{itemize}[leftmargin=1.2em, itemsep=1pt, parsep=0pt, topsep=1pt]
  \\item[$\\bullet$] Architected and delivered an end-to-end self-service ERP analytics platform from scratch to production using \\textbf{Spring Boot}, \\textbf{Elasticsearch}, and \\textbf{Vue.js}, reducing manual executive reporting effort by \\textbf{85\\%} across distributor and sales channels.
  \\item[$\\bullet$] Built reusable Vue.js dashboard widgets powered by custom \\textbf{D3.js} visualizations (bar, line, donut, area, geo-maps), achieving \\textbf{90\\% faster} interactive drill-down responsiveness across multi-dimensional datasets.
  \\item[$\\bullet$] Engineered multi-level \\textbf{Elasticsearch aggregation pipelines} and Spring service integrations over \\textbf{3M+ order and revenue records}, cutting complex dashboard query latency by \\textbf{65\\%}.
\\end{itemize}

\\vspace{2.5pt}
\\textit{\\textbf{Orchestrated Sales Reporting Pipeline}}
\\begin{itemize}[leftmargin=1.2em, itemsep=1pt, parsep=0pt, topsep=1pt]
  \\item[$\\bullet$] Built a multi-module \\textbf{Spring Boot} data aggregation engine to concurrently query, join, and merge datasets across \\textbf{5+ independent Elasticsearch indices}, improving report compilation throughput by \\textbf{3x}.
  \\item[$\\bullet$] Architected an asynchronous export pipeline utilizing a decoupled \\textbf{Producer-Consumer pattern} over a messaging queue, eliminating API timeouts and achieving \\textbf{99.9\\% delivery reliability} for bulk sales workloads.
  \\item[$\\bullet$] Implemented a \\textbf{JMS Listener} configured with a fixed concurrency of 5 to asynchronously consume message payloads and securely auto-dispatch emails via \\textbf{Google Cloud Auth}.
\\end{itemize}

\\vspace{2.5pt}
\\textit{\\textbf{Stock Predictive Inventory (SPI) Analytics}}
\\begin{itemize}[leftmargin=1.2em, itemsep=1pt, parsep=0pt, topsep=1pt]
  \\item[$\\bullet$] Engineered custom Spring background analytical tasks to profile \\textbf{24 months} of historical sales velocity, stock levels, and supplier shipment ETAs across \\textbf{18,000+ SKUs}, reducing stockout incidents by \\textbf{60\\%}.
  \\item[$\\bullet$] Developed a high-performance \\textbf{React.js} inventory forecasting interface, leveraging \\textbf{Web Workers} to offload heavy client-side calculations from the main UI thread and cut main-thread blocking time by \\textbf{90\\%}.
\\end{itemize}

\\vspace{2.5pt}
\\textit{\\textbf{AI-Assisted Engineering \\& Automated Testing}}
\\begin{itemize}[leftmargin=1.2em, itemsep=1pt, parsep=0pt, topsep=1pt]
  \\item[$\\bullet$] Integrated \\textbf{Claude Code} and \\textbf{GitHub Copilot} into terminal and IDE workflows, \\textbf{accelerating feature delivery velocity by 40\\%} across backend and frontend release cycles.
  \\item[$\\bullet$] Authored comprehensive \\textbf{JUnit} unit and integration test suites, achieving \\textbf{98\\% code coverage} across critical Spring Boot controllers and core service modules and reducing post-release regressions by \\textbf{75\\%}.
\\end{itemize}

\\vspace{1.5pt}

% ---- TECHNICAL SKILLS ----
\\section{Technical Skills}
\\vspace{1pt}
\\textbf{Languages \\& Frameworks:} Java, Spring Boot, Python, TypeScript, JavaScript (ES6+), Vue.js, React.js, SQL, HTML/CSS \\\\
\\textbf{Databases \\& Search:} Elasticsearch (Query DSL, Aggregations), MySQL (Stored Procedures, Triggers, Complex Joins, Row-Level Locks) \\\\
\\textbf{Architecture \\& Tools:} RESTful APIs, JMS (Java Message Service), Producer-Consumer Queues, JDBC, DTO Architecture, Web Workers, Playwright, JUnit, D3.js, Git \\\\
\\textbf{AI \\& Automation:} Claude Code, GitHub Copilot, Google Apps Script, Google Cloud Auth

\\vspace{1.5pt}

% ---- EDUCATION ----
\\section{Education}
\\vspace{1pt}
\\textbf{Anna University — College of Engineering, Guindy (CEG)} \\hfill 09/2022 -- 04/2025 \\\\
Bachelor of Engineering (B.E.), Computer Science and Engineering \\hfill \\textit{Chennai, India}

\\vspace{1.5pt}

% ---- CERTIFICATIONS ----
\\section{Certifications}
\\vspace{1pt}
\\begin{itemize}[leftmargin=1.2em, itemsep=0.5pt, parsep=0pt, topsep=0pt]
  \\item[$\\bullet$] Claude Code in Action --- Anthropic \\,$\\bullet$\\, Certificate of Completion: Claude 101 --- Anthropic
  \\item[$\\bullet$] Machine Learning Algorithms --- Great Learning \\,$\\bullet$\\, The Complete Web Development Bootcamp --- Udemy
\\end{itemize}

\\end{document}`;

const DEFAULT_RESUME_DATA = {
  header: {
    fullName: 'THANUSHRAJ M M',
    location: 'Bengaluru, India',
    phone: '+91 9123573517',
    email: 'thanushrajmm@gmail.com',
    links: [
      { id: 'l-1', label: 'LinkedIn', url: 'https://linkedin.com/in/thanushrajmm/', icon: 'linkedin' },
      { id: 'l-2', label: 'GitHub', url: 'https://github.com/thanushrajmm', icon: 'github' }
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
      id: 'sec-experience',
      title: 'EXPERIENCE',
      type: 'entries',
      entries: [
        {
          id: 'exp-1',
          primaryTitle: 'JBPB Offshore Pvt Ltd (formerly HikeOn Technologies)',
          primaryLink: '',
          primaryRight: '02/2025 – Present',
          subTitle: 'Software Engineer • KPI Dashboard, Orchestrated Sales Reporting & SPI Analytics',
          subRight: 'Bengaluru, India',
          bullets: [
            'Architected and delivered an end-to-end self-service ERP analytics platform using Spring Boot, Elasticsearch, and Vue.js, cutting manual reporting effort by 85%.',
            'Engineered multi-level Elasticsearch aggregation pipelines over 3M+ order and revenue records, reducing dashboard query latency by 65% (sub-600ms).',
            'Built an asynchronous export pipeline using a Producer-Consumer queue and JMS Listener (concurrency 5) with Google Cloud Auth, achieving 99.9% delivery reliability.',
            'Developed a React.js inventory forecasting interface offloading calculations to Web Workers to cut UI main-thread blocking time by 90%.'
          ]
        }
      ]
    },
    {
      id: 'sec-projects',
      title: 'PROJECTS',
      type: 'entries',
      entries: [
        {
          id: 'proj-1',
          primaryTitle: 'Targeted Career Pipeline Scraper & Match Alerter',
          primaryLink: 'https://github.com/thanushrajmm',
          primaryRight: 'Python, Playwright, Google Apps Script',
          subTitle: 'Automated Job Discovery & Tech-Stack Scoring Engine',
          subRight: '2025 – 2026',
          bullets: [
            'Built a Playwright-based Python scraping pipeline to extract real-time job postings from 10+ JavaScript-rendered career portals with 95% deduplication accuracy.',
            'Developed an automated role-scoring and email alert engine using Google Apps Script, cutting manual job-discovery time by 90%.'
          ]
        }
      ]
    },
    {
      id: 'sec-skills',
      title: 'TECHNICAL SKILLS',
      type: 'skills_grid',
      skillCategories: [
        { label: 'Languages & Frameworks', value: 'Java, Spring Boot, Python, TypeScript, JavaScript (ES6+), Vue.js, React.js, SQL, HTML/CSS' },
        { label: 'Databases & Search', value: 'Elasticsearch (Query DSL, Aggregations), MySQL (Stored Procedures, Triggers, Complex Joins, Row-Level Locks)' },
        { label: 'Architecture & Tools', value: 'RESTful APIs, JMS, Producer-Consumer Queues, JDBC, Web Workers, Playwright, JUnit, D3.js, Git' },
        { label: 'AI & Automation', value: 'Claude Code, GitHub Copilot, Google Apps Script, Google Cloud Auth' }
      ]
    },
    {
      id: 'sec-education',
      title: 'EDUCATION',
      type: 'entries',
      entries: [
        {
          id: 'edu-1',
          primaryTitle: 'Anna University — College of Engineering, Guindy (CEG)',
          primaryRight: '09/2022 – 04/2025',
          subTitle: 'Bachelor of Engineering (B.E.), Computer Science and Engineering',
          subRight: 'Chennai, India',
          bullets: []
        }
      ]
    },
    {
      id: 'sec-certifications',
      title: 'CERTIFICATIONS',
      type: 'bullet_list',
      bullets: [
        'Claude Code in Action — Anthropic • Certificate of Completion: Claude 101 — Anthropic',
        'Machine Learning Algorithms — Great Learning • The Complete Web Development Bootcamp — Udemy'
      ]
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [workingDate, setWorkingDate] = useState(() => getTodayDateString());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => getTodayDateString());
  const [calendarMonthDate, setCalendarMonthDate] = useState(() => new Date());

  // Inject Google web fonts so live preview matches PDF export
  useEffect(() => {
    const existing = document.getElementById('jobswitch-web-fonts');
    if (!existing) {
      const link = document.createElement('link');
      link.id = 'jobswitch-web-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap';
      document.head.appendChild(link);
    }
    const lmodernLink = document.getElementById('jobswitch-lmodern-font');
    if (!lmodernLink) {
      const lm = document.createElement('link');
      lm.id = 'jobswitch-lmodern-font';
      lm.rel = 'stylesheet';
      lm.href = 'https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css';
      document.head.appendChild(lm);
    }
  }, []);

  // Core Curriculum Data
  const [domains, setDomains] = useState(() => {
    const saved = localStorage.getItem('omniswitch_react_domains_v1');
    return saved ? JSON.parse(saved) : DEFAULT_CURRICULUM;
  });

  // Resume Maker State
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('omniswitch_resume_data_v1');
    return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
  });

  // LaTeX Resume Editor & Version Vault State
  const [latexResumeCode, setLatexResumeCode] = useState(() => {
    const saved = localStorage.getItem('omniswitch_latex_resume_code_v1');
    return saved || DEFAULT_LATEX_RESUME;
  });
  const [resumeVersions, setResumeVersions] = useState(() => {
    const saved = localStorage.getItem('omniswitch_resume_versions_v1');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ver-default-1',
        name: 'SDE Full-Stack & Backend (10pt A4)',
        targetRole: 'Software Engineer • Spring Boot & Elasticsearch',
        updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        latexCode: DEFAULT_LATEX_RESUME
      }
    ];
  });
  const [activeResumeVersionId, setActiveResumeVersionId] = useState(() => {
    return localStorage.getItem('omniswitch_active_resume_ver_v1') || 'ver-default-1';
  });
  const [newResumeVersionName, setNewResumeVersionName] = useState('');
  const [newResumeVersionRole, setNewResumeVersionRole] = useState('');
  const [showSaveResumeVersionModal, setShowSaveResumeVersionModal] = useState(false);
  const [targetJobDescription, setTargetJobDescription] = useState('');
  const [showAtsPanel, setShowAtsPanel] = useState(true);

  const [activeResumeSectionId, setActiveResumeSectionId] = useState('sec-experience');
  const [activeDomainId, setActiveDomainId] = useState(() => domains[0]?.id || null);
  const [activeTopicId, setActiveTopicId] = useState(() => domains[0]?.topics[0]?.id || null);

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

  // Daily Logs & Applications
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

  // ================= JAVA PLAYGROUND & STEP VISUALIZER STATE =================
  const [javaCode, setJavaCode] = useState(() => {
    const saved = localStorage.getItem('omniswitch_java_code_v1');
    return saved || BASIC_JAVA_TEMPLATE;
  });
  const [javaStdin, setJavaStdin] = useState(() => {
    const saved = localStorage.getItem('omniswitch_java_stdin_v1');
    return saved !== null ? saved : '';
  });
  const [javaFontSize, setJavaFontSize] = useState(14);
  const [javaRightPanelMode, setJavaRightPanelMode] = useState('visualizer'); // 'visualizer' | 'console'
  const [isJavaRunning, setIsJavaRunning] = useState(false);
  const [javaStdout, setJavaStdout] = useState('');
  const [javaStderr, setJavaStderr] = useState('');
  const [javaExecTime, setJavaExecTime] = useState(null);

  // Interactive Step Debugger & Blocking Stdin State
  const [vizStepIndex, setVizStepIndex] = useState(0);
  const [isVizPlaying, setIsVizPlaying] = useState(false);
  const [interactiveStdinValues, setInteractiveStdinValues] = useState({});
  const [interactiveInputDraft, setInteractiveInputDraft] = useState('');
  const [matchedBracketInfo, setMatchedBracketInfo] = useState(null);

  const javaTextareaRef = useRef(null);
  const javaLineNumbersRef = useRef(null);
  const javaHighlightOverlayRef = useRef(null);

  // ================= SQL PLAYGROUND STATE =================
  const [sqlQuery, setSqlQuery] = useState(() => {
    const saved = localStorage.getItem('omniswitch_sql_query_v1');
    return saved || DEFAULT_SQL_QUERY;
  });
  const [sqlFontSize, setSqlFontSize] = useState(14);
  const [sqlResults, setSqlResults] = useState([]);
  const [sqlError, setSqlError] = useState('');
  const [sqlExecTime, setSqlExecTime] = useState(null);
  const [sqlEngineReady, setSqlEngineReady] = useState(false);
  const [sqlSchemaTables, setSqlSchemaTables] = useState([]);
  const [modalCreateSqlTableOpen, setModalCreateSqlTableOpen] = useState(false);
  const [newSqlTableName, setNewSqlTableName] = useState('');
  const [newSqlColumns, setNewSqlColumns] = useState([
    { name: 'id', type: 'INTEGER', pk: true },
    { name: 'name', type: 'TEXT', pk: false }
  ]);
  const [modalSqlDataOpen, setModalSqlDataOpen] = useState(false);
  const [sqlDataMode, setSqlDataMode] = useState('insert'); // 'insert' | 'update'
  const [sqlTargetTable, setSqlTargetTable] = useState('employees');
  const [sqlRowValues, setSqlRowValues] = useState({});
  const [sqlWhereClause, setSqlWhereClause] = useState('');
  const sqlDbRef = useRef(null);
  const sqlTextareaRef = useRef(null);
  const sqlLineNumbersRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('omniswitch_sql_query_v1', sqlQuery);
  }, [sqlQuery]);

  // Initialize browser-native SQLite WASM engine (sql.js) for SQL Playground
  const initSqlEngine = async () => {
    try {
      if (!window.initSqlJs) {
        await new Promise((resolve, reject) => {
          const existing = document.getElementById('sqljs-cdn-script');
          if (existing) {
            existing.addEventListener('load', resolve);
            existing.addEventListener('error', reject);
            return;
          }
          const script = document.createElement('script');
          script.id = 'sqljs-cdn-script';
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const SQL = await window.initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
      });
      const db = new SQL.Database();
      db.run(SQL_SEED_SCRIPT);
      sqlDbRef.current = db;
      setSqlEngineReady(true);
      refreshSqlSchema(db);
      runSqlQueryWithDb(db, sqlQuery);
    } catch (err) {
      setSqlError(`Failed to initialize SQL engine: ${err.message}`);
    }
  };

  const refreshSqlSchema = (dbInstance = sqlDbRef.current) => {
    if (!dbInstance) return;
    try {
      const tablesRes = dbInstance.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
      if (!tablesRes.length) {
        setSqlSchemaTables([]);
        return;
      }
      const tableNames = tablesRes[0].values.map(r => r[0]);
      const schemas = tableNames.map(tName => {
        const info = dbInstance.exec(`PRAGMA table_info("${tName}");`);
        const cols = info.length
          ? info[0].values.map(row => ({ name: row[1], type: row[2] || 'TEXT', pk: row[5] === 1 }))
          : [];
        const countRes = dbInstance.exec(`SELECT COUNT(*) FROM "${tName}";`);
        const rowCount = countRes.length ? countRes[0].values[0][0] : 0;
        return { name: tName, columns: cols, rowCount };
      });
      setSqlSchemaTables(schemas);
    } catch (_) {}
  };

  const runSqlQueryWithDb = (dbInstance, queryText) => {
    if (!dbInstance || !queryText.trim()) return;
    setSqlError('');
    const t0 = performance.now();
    try {
      const res = dbInstance.exec(queryText);
      const elapsed = Math.max(1, Math.round(performance.now() - t0));
      setSqlExecTime(elapsed);
      setSqlResults(res || []);
      refreshSqlSchema(dbInstance);
    } catch (err) {
      setSqlResults([]);
      setSqlError(err.message || 'SQL Syntax Error');
    }
  };

  const handleRunSql = () => {
    if (!sqlDbRef.current) {
      initSqlEngine();
      return;
    }
    runSqlQueryWithDb(sqlDbRef.current, sqlQuery);
  };

  const handleResetSqlDatabase = () => {
    if (!window.initSqlJs) return;
    window.initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    }).then((SQL) => {
      const db = new SQL.Database();
      db.run(SQL_SEED_SCRIPT);
      sqlDbRef.current = db;
      refreshSqlSchema(db);
      setSqlError('');
      setSqlResults([]);
      showToast('Reset SQL database & sample tables');
    });
  };

  const handleCreateCustomSqlTable = () => {
    if (!sqlDbRef.current) return;
    const cleanTable = newSqlTableName.trim().replace(/[^a-zA-Z0-9_]/g, '_');
    const validCols = newSqlColumns.filter(c => c.name.trim());
    if (!cleanTable || validCols.length === 0) {
      showToast('Enter a valid table name and at least one column');
      return;
    }
    const colDefs = validCols.map(c => {
      const colName = c.name.trim().replace(/[^a-zA-Z0-9_]/g, '_');
      return `"${colName}" ${c.type}${c.pk ? ' PRIMARY KEY' : ''}`;
    });
    const ddl = `CREATE TABLE "${cleanTable}" (\n  ${colDefs.join(',\n  ')}\n);`;
    try {
      sqlDbRef.current.run(ddl);
      refreshSqlSchema(sqlDbRef.current);
      setSqlQuery(ddl + `\n\nSELECT * FROM "${cleanTable}";`);
      runSqlQueryWithDb(sqlDbRef.current, `SELECT * FROM "${cleanTable}";`);
      setModalCreateSqlTableOpen(false);
      setNewSqlTableName('');
      setNewSqlColumns([
        { name: 'id', type: 'INTEGER', pk: true },
        { name: 'name', type: 'TEXT', pk: false }
      ]);
      playChime();
      showToast(`Created table "${cleanTable}"`);
    } catch (err) {
      showToast(`SQL Error: ${err.message}`);
    }
  };

  const openSqlDataModal = (mode = 'insert', tableName = '') => {
    const chosenTable = tableName || sqlSchemaTables[0]?.name || 'employees';
    setSqlDataMode(mode);
    setSqlTargetTable(chosenTable);
    setSqlRowValues({});
    setSqlWhereClause('');
    setModalSqlDataOpen(true);
  };

  const handleExecuteSqlRowAction = () => {
    if (!sqlDbRef.current || !sqlTargetTable) return;
    const schema = sqlSchemaTables.find(t => t.name === sqlTargetTable);
    if (!schema) return;

    const formatSqlLiteral = (rawVal, colType) => {
      if (rawVal === undefined || rawVal === null || String(rawVal).trim() === '') return 'NULL';
      const trimmed = String(rawVal).trim();
      if ((colType === 'INTEGER' || colType === 'REAL') && !isNaN(Number(trimmed))) {
        return Number(trimmed);
      }
      return `'${trimmed.replace(/'/g, "''")}'`;
    };

    try {
      let dml = '';
      if (sqlDataMode === 'insert') {
        const filledCols = schema.columns.filter(
          c => sqlRowValues[c.name] !== undefined && String(sqlRowValues[c.name]).trim() !== ''
        );
        if (filledCols.length === 0) {
          showToast('Enter at least one column value to insert');
          return;
        }
        const colsPart = filledCols.map(c => `"${c.name}"`).join(', ');
        const valsPart = filledCols.map(c => formatSqlLiteral(sqlRowValues[c.name], c.type)).join(', ');
        dml = `INSERT INTO "${sqlTargetTable}" (${colsPart}) VALUES (${valsPart});`;
      } else {
        const setCols = schema.columns.filter(
          c => sqlRowValues[c.name] !== undefined && String(sqlRowValues[c.name]).trim() !== ''
        );
        if (setCols.length === 0) {
          showToast('Enter at least one new column value to update');
          return;
        }
        const assignments = setCols.map(c => `"${c.name}" = ${formatSqlLiteral(sqlRowValues[c.name], c.type)}`).join(', ');
        const wherePart = sqlWhereClause.trim() ? `\nWHERE ${sqlWhereClause.trim()}` : '';
        dml = `UPDATE "${sqlTargetTable}"\nSET ${assignments}${wherePart};`;
      }

      sqlDbRef.current.run(dml);
      const previewSql = `SELECT * FROM "${sqlTargetTable}";`;
      setSqlQuery(`${dml}\n\n${previewSql}`);
      runSqlQueryWithDb(sqlDbRef.current, previewSql);
      setModalSqlDataOpen(false);
      playChime();
      showToast(sqlDataMode === 'insert' ? `Inserted row into ${sqlTargetTable}` : `Updated ${sqlTargetTable}`);
    } catch (err) {
      showToast(`SQL Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (activeTab === 'sql' && !sqlDbRef.current) {
      initSqlEngine();
    }
  }, [activeTab]);

  // Saved Snippets & Folders State
  const [snippetFolders, setSnippetFolders] = useState(() => {
    const saved = localStorage.getItem('omniswitch_snippet_folders_v1');
    return saved ? JSON.parse(saved) : DEFAULT_SNIPPET_FOLDERS;
  });
  const [savedSnippets, setSavedSnippets] = useState(() => {
    const saved = localStorage.getItem('omniswitch_java_snippets_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSnippetFolder, setSelectedSnippetFolder] = useState('ALL');
  const [snippetSearchQuery, setSnippetSearchQuery] = useState('');
  const [newFolderInput, setNewFolderInput] = useState('');
  const [showSaveSnippetModal, setShowSaveSnippetModal] = useState(false);
  const [savingSnippetLanguage, setSavingSnippetLanguage] = useState('java');
  const [newSnippetTitle, setNewSnippetTitle] = useState('');
  const [newSnippetFolder, setNewSnippetFolder] = useState('General');

  // Learning Website Bookmarks State
  const [bookmarkCategories, setBookmarkCategories] = useState(() => {
    const saved = localStorage.getItem('omniswitch_bookmark_categories_v1');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKMARK_CATEGORIES;
  });
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('omniswitch_bookmarks_v1');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
  });
  const [selectedBookmarkCategory, setSelectedBookmarkCategory] = useState('ALL');
  const [bookmarkSearchQuery, setBookmarkSearchQuery] = useState('');
  const [newBookmarkCategoryInput, setNewBookmarkCategoryInput] = useState('');
  const [modalAddBookmarkOpen, setModalAddBookmarkOpen] = useState(false);
  const [newBmTitle, setNewBmTitle] = useState('');
  const [newBmUrl, setNewBmUrl] = useState('');
  const [newBmCategory, setNewBmCategory] = useState('DSA & Algorithms');
  const [newBmNotes, setNewBmNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('omniswitch_bookmark_categories_v1', JSON.stringify(bookmarkCategories));
  }, [bookmarkCategories]);

  useEffect(() => {
    localStorage.setItem('omniswitch_bookmarks_v1', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('omniswitch_java_code_v1', javaCode);
  }, [javaCode]);

  useEffect(() => {
    localStorage.setItem('omniswitch_java_stdin_v1', javaStdin);
  }, [javaStdin]);

  useEffect(() => {
    localStorage.setItem('omniswitch_snippet_folders_v1', JSON.stringify(snippetFolders));
  }, [snippetFolders]);

  useEffect(() => {
    localStorage.setItem('omniswitch_java_snippets_v1', JSON.stringify(savedSnippets));
  }, [savedSnippets]);

  // Modals & UI State
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

  // Persistence
  useEffect(() => {
    localStorage.setItem('omniswitch_react_domains_v1', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('omniswitch_resume_data_v1', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('omniswitch_latex_resume_code_v1', latexResumeCode);
  }, [latexResumeCode]);

  useEffect(() => {
    localStorage.setItem('omniswitch_resume_versions_v1', JSON.stringify(resumeVersions));
  }, [resumeVersions]);

  useEffect(() => {
    localStorage.setItem('omniswitch_active_resume_ver_v1', activeResumeVersionId);
  }, [activeResumeVersionId]);

  useEffect(() => {
    localStorage.setItem('omniswitch_react_daylogs_v1', JSON.stringify(dayLogs));
  }, [dayLogs]);
  // Robust Standalone Window PDF Printing that never gets blocked by containers
  const handlePrintResume = () => {
    const printContent = document.getElementById('resume-printable-document');
    if (!printContent) {
      window.print();
      return;
    }

    try {
      const printWindow = window.open('', '_blank', 'width=900,height=1100');
      if (printWindow) {
        const fontFamilyCss = "'Computer Modern Serif', 'Latin Modern Roman', 'CMU Serif', 'Tinos', 'Times New Roman', serif";
        const marginTop = parsedLatexResume?.margins?.top || '0.35in';
        const marginBottom = parsedLatexResume?.margins?.bottom || '0.35in';
        const marginLeft = parsedLatexResume?.margins?.left || '0.48in';
        const marginRight = parsedLatexResume?.margins?.right || '0.48in';
        const basePt = parsedLatexResume?.basePt || 10;

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${parsedLatexResume?.candidateName || 'Resume'}</title>
              <meta charset="utf-8" />
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
              <style>
                @page { size: A4 portrait; margin: 0 !important; }
                * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                html, body, #resume-printable-document, #resume-printable-document * { font-family: ${fontFamilyCss} !important; }
                html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; background: white !important; color: black !important; font-size: ${basePt}pt; line-height: 1.24; }
                #resume-printable-document {
                  padding: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
                  margin: 0 auto !important;
                  box-shadow: none !important;
                  border: none !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  min-height: auto !important;
                }
                a { color: black; text-decoration: none; }
                .print-hidden { display: none !important; }
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
          } catch (e) {}
        }, 400);
      } else {
        window.print();
      }
    } catch (err) {
      window.print();
    }
  };

  // ================= REAL-TIME LATEX RESUME PARSER & RENDERER =================
  const parsedLatexResume = useMemo(() => {
    const src = latexResumeCode || '';
    const docClassMatch = src.match(/\\documentclass\[([^\]]*)\]/);
    let basePt = 10;
    if (docClassMatch) {
      const ptMatch = docClassMatch[1].match(/(\d+)\s*pt/);
      if (ptMatch) basePt = Number(ptMatch[1]);
    }

    const geomMatch = src.match(/\\usepackage\[([^\]]*)\]\{geometry\}/);
    const margins = { top: '0.35in', bottom: '0.35in', left: '0.48in', right: '0.48in' };
    if (geomMatch) {
      geomMatch[1].split(',').forEach(part => {
        const [k, v] = part.split('=').map(s => s.trim());
        if (k && v && Object.prototype.hasOwnProperty.call(margins, k)) {
          margins[k] = v;
        }
      });
    }

    const bodyMatch = src.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
    const body = bodyMatch ? bodyMatch[1] : src;
    const cleanBody = body
      .split('\n')
      .map(line => {
        let out = '';
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '%' && (i === 0 || line[i - 1] !== '\\')) break;
          out += line[i];
        }
        return out;
      })
      .join('\n');

    const extractBracedArg = (text, startIdx) => {
      if (text[startIdx] !== '{') return null;
      let depth = 0;
      for (let i = startIdx; i < text.length; i++) {
        if (text[i] === '{' && text[i - 1] !== '\\') depth++;
        else if (text[i] === '}' && text[i - 1] !== '\\') {
          depth--;
          if (depth === 0) {
            return { content: text.slice(startIdx + 1, i), endIdx: i };
          }
        }
      }
      return null;
    };

    const renderInlineTokens = (rawText, keyPrefix = 'tok') => {
      if (!rawText) return null;
      let text = rawText
        .replace(/\\,/g, ' ')
        .replace(/\\;/g, ' ')
        .replace(/\\:/g, ' ')
        .replace(/\\!/g, '')
        .replace(/~/g, ' ')
        .replace(/\\&/g, '&')
        .replace(/\\%/g, '%')
        .replace(/\\\$/g, '$')
        .replace(/\\#/g, '#')
        .replace(/\\_/g, '_')
        .replace(/---/g, '—')
        .replace(/--/g, '–')
        .replace(/\$\\bullet\$/g, '•')
        .replace(/\\bullet/g, '•')
        .replace(/\\textbullet/g, '•');

      const nodes = [];
      let idx = 0;
      let tokenCounter = 0;

      while (idx < text.length) {
        const nextSlash = text.indexOf('\\', idx);
        if (nextSlash === -1) {
          nodes.push(text.slice(idx));
          break;
        }
        if (nextSlash > idx) {
          nodes.push(text.slice(idx, nextSlash));
        }

        const rest = text.slice(nextSlash);

        // \href{url}{label}
        const hrefMatch = rest.match(/^\\href\s*\{/);
        if (hrefMatch) {
          const firstArg = extractBracedArg(text, nextSlash + hrefMatch[0].length - 1);
          if (firstArg) {
            let secondStart = firstArg.endIdx + 1;
            while (secondStart < text.length && /\s/.test(text[secondStart])) secondStart++;
            const secondArg = extractBracedArg(text, secondStart);
            if (secondArg) {
              const url = firstArg.content.trim();
              nodes.push(
                <a
                  key={`${keyPrefix}-href-${tokenCounter++}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black no-underline hover:underline"
                >
                  {renderInlineTokens(secondArg.content, `${keyPrefix}-a-${tokenCounter}`)}
                </a>
              );
              idx = secondArg.endIdx + 1;
              continue;
            }
          }
        }

        // Formatting macros: \textbf, \textit, \emph, \underline, \textnormal, \textsc, \LARGE, \large, \normalsize, \small, \huge
        const cmdMatch = rest.match(/^\\(textbf|textit|emph|underline|textnormal|textsc|LARGE|large|huge|Huge|normalsize|small|footnotesize)\s*\{/);
        if (cmdMatch) {
          const cmd = cmdMatch[1];
          const arg = extractBracedArg(text, nextSlash + cmdMatch[0].length - 1);
          if (arg) {
            const inner = renderInlineTokens(arg.content, `${keyPrefix}-${cmd}-${tokenCounter++}`);
            if (cmd === 'textbf') {
              nodes.push(<strong key={`${keyPrefix}-b-${tokenCounter}`} className="font-bold text-black">{inner}</strong>);
            } else if (cmd === 'textit' || cmd === 'emph') {
              nodes.push(<em key={`${keyPrefix}-i-${tokenCounter}`} className="italic">{inner}</em>);
            } else if (cmd === 'underline') {
              nodes.push(<span key={`${keyPrefix}-u-${tokenCounter}`} className="underline">{inner}</span>);
            } else if (cmd === 'textsc') {
              nodes.push(<span key={`${keyPrefix}-sc-${tokenCounter}`} className="uppercase tracking-wide">{inner}</span>);
            } else if (cmd === 'LARGE') {
              nodes.push(<span key={`${keyPrefix}-lg-${tokenCounter}`} style={{ fontSize: '1.728em', lineHeight: 1.15 }}>{inner}</span>);
            } else if (cmd === 'huge' || cmd === 'Huge') {
              nodes.push(<span key={`${keyPrefix}-hg-${tokenCounter}`} style={{ fontSize: '2.074em', lineHeight: 1.15 }}>{inner}</span>);
            } else if (cmd === 'large') {
              nodes.push(<span key={`${keyPrefix}-l-${tokenCounter}`} style={{ fontSize: '1.2em', lineHeight: 1.2 }}>{inner}</span>);
            } else if (cmd === 'small') {
              nodes.push(<span key={`${keyPrefix}-sm-${tokenCounter}`} style={{ fontSize: '0.9em', lineHeight: 1.2 }}>{inner}</span>);
            } else if (cmd === 'footnotesize') {
              nodes.push(<span key={`${keyPrefix}-fn-${tokenCounter}`} style={{ fontSize: '0.8em', lineHeight: 1.2 }}>{inner}</span>);
            } else {
              nodes.push(<span key={`${keyPrefix}-n-${tokenCounter}`} className="font-normal" style={{ fontSize: '1em' }}>{inner}</span>);
            }
            idx = arg.endIdx + 1;
            continue;
          }
        }

        // Handle scoped group blocks like {\LARGE\textbf{THANUSHRAJ M M}} or {\small ...}
        if (text[nextSlash] === '\\') {
          // Check if current slash is a standalone size switch inside a brace group
          const sizeSwitchMatch = rest.match(/^\\(LARGE|Large|large|normalsize|small|footnotesize|huge|Huge)\b\s*/);
          if (sizeSwitchMatch) {
            idx = nextSlash + sizeSwitchMatch[0].length;
            continue;
          }
        }

        // Ignore spacing commands like \vspace{...}, \hspace{...}
        const spaceMatch = rest.match(/^\\(vspace|hspace)\*?\s*\{/);
        if (spaceMatch) {
          const arg = extractBracedArg(text, nextSlash + spaceMatch[0].length - 1);
          if (arg) {
            idx = arg.endIdx + 1;
            continue;
          }
        }

        // Line break \\
        if (rest.startsWith('\\\\')) {
          const optBracket = rest.slice(2).match(/^\s*\[[^\]]*\]/);
          nodes.push(<br key={`${keyPrefix}-br-${tokenCounter++}`} />);
          idx = nextSlash + 2 + (optBracket ? optBracket[0].length : 0);
          continue;
        }

        // Skip unrecognized standalone macro names gracefully
        const unknownMacro = rest.match(/^\\[A-Za-z]+\*?/);
        if (unknownMacro) {
          idx = nextSlash + unknownMacro[0].length;
          continue;
        }

        nodes.push(text[nextSlash]);
        idx = nextSlash + 1;
      }

      return nodes;
    };

    const stripOuterScopedBraces = (lineStr) => {
      let s = lineStr.trim();
      while (s.startsWith('{') && s.endsWith('}')) {
        const extracted = extractBracedArg(s, 0);
        if (extracted && extracted.endIdx === s.length - 1) {
          s = extracted.content.trim();
        } else {
          break;
        }
      }
      return s;
    };

    // Parse top-level blocks: center block, sections, itemize lists, and paragraphs/lines
    const blocks = [];
    let cursor = 0;

    // Extract candidate name for PDF title
    const nameMatch = cleanBody.match(/\\textbf\{([A-Z\s.]{3,})\}/);
    const candidateName = nameMatch ? nameMatch[1].trim() : 'Resume';

    const parseSectionBody = (secContent, secIdx) => {
      const elements = [];
      let pCursor = 0;
      let elCounter = 0;

      while (pCursor < secContent.length) {
        const itemizeStart = secContent.indexOf('\\begin{itemize}', pCursor);
        const textSegment = itemizeStart === -1 ? secContent.slice(pCursor) : secContent.slice(pCursor, itemizeStart);

        // Process lines in textSegment (supporting \hfill for left/right split rows)
        const rawSegLines = textSegment
          .replace(/\\\\(?:\[[^\]]*\])?/g, '\n')
          .split('\n')
          .map(l => stripOuterScopedBraces(l))
          .filter(l => l && !/^\\vspace\*?\{[^}]*\}$/.test(l));

        rawSegLines.forEach(line => {
          if (line.includes('\\hfill')) {
            const [leftPart, rightPart] = line.split('\\hfill');
            elements.push(
              <div key={`sec-${secIdx}-row-${elCounter++}`} className="flex items-baseline justify-between gap-3" style={{ lineHeight: 1.24 }}>
                <div>{renderInlineTokens(stripOuterScopedBraces(leftPart), `sec-${secIdx}-l-${elCounter}`)}</div>
                <div className="shrink-0 text-right">{renderInlineTokens(stripOuterScopedBraces(rightPart), `sec-${secIdx}-r-${elCounter}`)}</div>
              </div>
            );
          } else {
            elements.push(
              <div key={`sec-${secIdx}-p-${elCounter++}`} style={{ lineHeight: 1.24, marginTop: '2px' }}>
                {renderInlineTokens(line, `sec-${secIdx}-p-${elCounter}`)}
              </div>
            );
          }
        });

        if (itemizeStart === -1) break;

        const itemizeEnd = secContent.indexOf('\\end{itemize}', itemizeStart);
        if (itemizeEnd === -1) break;

        const innerList = secContent.slice(itemizeStart + '\\begin{itemize}'.length, itemizeEnd)
          .replace(/^\[[^\]]*\]/, '');

        // Split on \item
        const rawItems = innerList.split(/\\item(?:\[[^\]]*\])?\s*/).map(it => it.trim()).filter(Boolean);
        elements.push(
          <ul
            key={`sec-${secIdx}-ul-${elCounter++}`}
            className="list-disc"
            style={{ paddingLeft: '1.25em', marginTop: '1.5px', marginBottom: '2px' }}
          >
            {rawItems.map((itemText, iIdx) => (
              <li
                key={`sec-${secIdx}-li-${elCounter}-${iIdx}`}
                style={{ lineHeight: 1.22, marginBottom: '1px', paddingLeft: '1px' }}
              >
                {renderInlineTokens(itemText, `sec-${secIdx}-li-${elCounter}-${iIdx}`)}
              </li>
            ))}
          </ul>
        );

        pCursor = itemizeEnd + '\\end{itemize}'.length;
      }

      return elements;
    };

    // 1. Check for \begin{center} ... \end{center} header
    const centerMatch = cleanBody.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/);
    if (centerMatch) {
      // Split header ONLY on explicit LaTeX line breaks (\\) so multi-line {\small ... } blocks stay on one single line
      const centerLines = centerMatch[1]
        .split(/\\\\(?:\[[^\]]*\])?/)
        .map(chunk => stripOuterScopedBraces(chunk.replace(/\s+/g, ' ')))
        .filter(Boolean);
      blocks.push(
        <div key="latex-header" className="text-center" style={{ lineHeight: 1.2, marginBottom: '2px' }}>
          {centerLines.map((cl, cIdx) => {
            const isLargeGroup = /^\\LARGE\b/.test(cl);
            const isSmallGroup = /^\\small\b/.test(cl);
            return (
              <div
                key={`hdr-${cIdx}`}
                style={{
                  fontSize: isLargeGroup ? '1.728em' : isSmallGroup ? '0.9em' : '1em',
                  marginBottom: cIdx < centerLines.length - 1 ? '2px' : '0px'
                }}
              >
                {renderInlineTokens(cl, `hdr-${cIdx}`)}
              </div>
            );
          })}
        </div>
      );
      cursor = cleanBody.indexOf('\\end{center}') + '\\end{center}'.length;
    }

    // 2. Parse each \section{...}
    const remaining = cleanBody.slice(cursor);
    const sectionRegex = /\\section\*?\{([^}]+)\}/g;
    let match;
    const sectionMatches = [];
    while ((match = sectionRegex.exec(remaining)) !== null) {
      sectionMatches.push({
        title: match[1],
        start: match.index,
        contentStart: match.index + match[0].length
      });
    }

    if (sectionMatches.length === 0 && remaining.trim()) {
      blocks.push(
        <div key="fallback-body" className="space-y-1">
          {parseSectionBody(remaining, 0)}
        </div>
      );
    } else {
      sectionMatches.forEach((sec, idx) => {
        const nextStart = idx + 1 < sectionMatches.length ? sectionMatches[idx + 1].start : remaining.length;
        const secBody = remaining.slice(sec.contentStart, nextStart);
        blocks.push(
          <div key={`latex-sec-${idx}`} style={{ marginTop: '6px' }}>
            <div
              className="text-center"
              style={{
                borderBottom: '0.6pt solid #000000',
                paddingBottom: '1px',
                marginBottom: '3.5px'
              }}
            >
              <h2 className="font-bold text-black" style={{ fontSize: '1.2em', lineHeight: 1.15 }}>
                {renderInlineTokens(sec.title, `sec-title-${idx}`)}
              </h2>
            </div>
            <div>
              {parseSectionBody(secBody, idx)}
            </div>
          </div>
        );
      });
    }

    return { blocks, basePt, margins, candidateName };
  }, [latexResumeCode]);

  // ================= REAL-TIME 9-CATEGORY 100-POINT ATS & JD SCORING ENGINE =================
  const atsAnalysis = useMemo(() => {
    const raw = latexResumeCode || '';
    const bodyMatch = raw.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
    const bodyText = (bodyMatch ? bodyMatch[1] : raw)
      .replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?/g, ' ')
      .replace(/[{}%$~\\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const lowerBody = bodyText.toLowerCase();
    const lowerJd = (targetJobDescription || '').toLowerCase();
    const hasJd = targetJobDescription.trim().length > 15;

    // Synonym / related-skill map for realistic ATS matching
    const SKILL_SYNONYMS = {
      'java': ['java', 'jdk', 'jvm', 'j2ee', 'core java'],
      'spring boot': ['spring boot', 'spring', 'spring framework', 'spring mvc', 'spring data'],
      'microservices': ['microservices', 'microservice', 'distributed systems', 'distributed architecture'],
      'rest api': ['rest api', 'restful', 'rest apis', 'http api', 'web services'],
      'mysql': ['mysql', 'sql', 'rdbms', 'relational database', 'postgresql', 'postgres'],
      'kafka': ['kafka', 'jms', 'message queue', 'messaging queue', 'producer-consumer', 'rabbitmq'],
      'elasticsearch': ['elasticsearch', 'elastic search', 'query dsl', 'inverted index', 'search engine'],
      'react': ['react', 'react.js', 'reactjs', 'frontend'],
      'vue': ['vue', 'vue.js', 'vuejs'],
      'docker': ['docker', 'container', 'containers', 'kubernetes', 'k8s', 'ci/cd'],
      'aws': ['aws', 'cloud', 'google cloud', 'gcp', 'azure'],
      'git': ['git', 'github', 'version control'],
      'junit': ['junit', 'unit test', 'integration test', 'testing', 'playwright']
    };

    const matchesSkillInResume = (term) => {
      const t = term.toLowerCase().trim();
      if (lowerBody.includes(t)) return true;
      const syns = SKILL_SYNONYMS[t];
      if (syns) return syns.some(s => lowerBody.includes(s));
      return false;
    };

    const suggestions = [];

    // ---- 1. KEYWORD MATCHING (20 points) ----
    const defaultCoreKeywords = [
      'java', 'spring boot', 'microservices', 'rest api', 'mysql', 'kafka',
      'elasticsearch', 'react', 'vue', 'git', 'junit', 'web workers'
    ];
    let targetKeywords = defaultCoreKeywords;

    if (hasJd) {
      const stopWords = new Set([
        'and', 'the', 'for', 'with', 'you', 'will', 'are', 'our', 'that', 'this', 'from', 'have', 'has',
        'your', 'work', 'team', 'experience', 'years', 'year', 'role', 'skills', 'using', 'ability',
        'strong', 'knowledge', 'good', 'understanding', 'development', 'software', 'engineer', 'engineering',
        'systems', 'services', 'applications', 'design', 'build', 'working', 'plus', 'preferred', 'required',
        'must', 'nice', 'into', 'across', 'both', 'all', 'other', 'such', 'well', 'high', 'scalable'
      ]);
      const extracted = lowerJd
        .replace(/[^a-z0-9+#.\s-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3 && !stopWords.has(w) && !/^\d+$/.test(w));
      const freq = {};
      extracted.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
      const uniqueSorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word]) => word);
      if (uniqueSorted.length > 0) targetKeywords = uniqueSorted;
    }

    const matchedKeywords = targetKeywords.filter(kw => matchesSkillInResume(kw));
    const missingKeywords = targetKeywords.filter(kw => !matchesSkillInResume(kw));
    const keywordPct = targetKeywords.length > 0 ? Math.round((matchedKeywords.length / targetKeywords.length) * 100) : 100;
    const keywordPoints = Math.round((keywordPct / 100) * 20);
    if (missingKeywords.length > 0 && hasJd) {
      suggestions.push(`Incorporate missing JD keywords naturally: ${missingKeywords.slice(0, 5).join(', ')}.`);
    }

    // ---- 2. TECHNICAL SKILLS MATCH (15 points) ----
    const techBuckets = {
      languages: ['java', 'python', 'typescript', 'javascript', 'sql'],
      frameworks: ['spring boot', 'react', 'vue', 'junit', 'playwright'],
      databases: ['elasticsearch', 'mysql', 'sql', 'redis', 'postgresql'],
      toolsAndCloud: ['git', 'jms', 'kafka', 'docker', 'google cloud', 'aws', 'rest']
    };
    const techHits = Object.values(techBuckets).flat().filter(s => matchesSkillInResume(s));
    const techSkillPct = Math.min(100, Math.round((techHits.length / 12) * 100));
    const techSkillPoints = Math.min(15, Math.round((techSkillPct / 100) * 15));
    if (techSkillPoints < 12) {
      suggestions.push('Expand Technical Skills with cloud/container tools (Docker, AWS, Redis) if applicable.');
    }

    // ---- 3. EXPERIENCE RELEVANCE (15 points) ----
    const hasDates = /\b(0?[1-9]|1[0-2])\/20\d{2}\b|\b20\d{2}\s*[-–]+\s*(present|20\d{2})/i.test(raw);
    const hasYoeMention = /(\d+(?:\.\d+)?\+?\s*years?)/i.test(bodyText);
    const hasActionResponsibilities = /(architected|engineered|built|developed|implemented|designed)/i.test(bodyText);
    const expSignals = (hasDates ? 5 : 0) + (hasYoeMention ? 5 : 0) + (hasActionResponsibilities ? 5 : 0);
    const experiencePoints = Math.min(15, expSignals);
    const experiencePct = Math.round((experiencePoints / 15) * 100);
    if (!hasDates) suggestions.push('Use standardized MM/YYYY employment dates (e.g. 02/2025 -- Present) for ATS tenure parsing.');

    // ---- 4. ATS PARSEABILITY (15 points) ----
    const hasGlyphUnicode = /\\pdfgentounicode\s*=\s*1/.test(raw);
    const hasName = /\\textbf\{[A-Z\s.]{3,}\}/.test(raw);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(raw);
    const hasPhone = /(\+?\d[\d\s-]{8,})/.test(raw);
    const hasStandardHeaders = /\\section\*?\{Experience\}/i.test(raw) && /\\section\*?\{Education\}/i.test(raw);
    const parsePoints =
      (hasGlyphUnicode ? 4 : 0) +
      (hasName ? 3 : 0) +
      (hasEmail ? 3 : 0) +
      (hasPhone ? 2 : 0) +
      (hasStandardHeaders ? 3 : 0);
    const parsePct = Math.round((parsePoints / 15) * 100);
    if (!hasGlyphUnicode) suggestions.push('Add \\pdfgentounicode=1 in the LaTeX preamble so ligatures (fi, fl) extract cleanly.');

    // ---- 5. FORMATTING AND READABILITY (10 points) ----
    const isSingleColumn = !/\\begin\{(multicols|minipage)\}/.test(raw);
    const hasCleanMargins = /\\usepackage\[[^\]]*\]\{geometry\}/.test(raw);
    const hasStandardFont = /\\usepackage\{lmodern\}|\\documentclass\[(10|11)pt/.test(raw);
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    const isOnePageDense = wordCount >= 220 && wordCount <= 680;
    const formatPoints =
      (isSingleColumn ? 3 : 0) +
      (hasCleanMargins ? 2 : 0) +
      (hasStandardFont ? 3 : 0) +
      (isOnePageDense ? 2 : 1);
    const readabilityPct = Math.round((formatPoints / 10) * 100);
    if (wordCount > 680) suggestions.push('Trim resume word count under ~650 words so it fits strictly on 1 A4 page.');

    // ---- 6. JOB TITLE RELEVANCE (5 points) ----
    const titleTerms = ['software engineer', 'software developer', 'backend engineer', 'full-stack', 'java developer', 'sde'];
    const titleMatch = titleTerms.some(t => lowerBody.includes(t) && (!hasJd || lowerJd.includes(t) || lowerBody.includes('software engineer')));
    const jobTitlePoints = titleMatch ? 5 : 3;

    // ---- 7. EDUCATION AND CERTIFICATIONS (5 points) ----
    const hasDegree = /(bachelor|b\.e\.|b\.tech|computer science|engineering|university)/i.test(bodyText);
    const hasCerts = /\\section\*?\{Certifications?\}/i.test(raw) || /(certified|certificate|anthropic|aws|udemy)/i.test(bodyText);
    const eduCertPoints = (hasDegree ? 3 : 0) + (hasCerts ? 2 : 0);

    // ---- 8. ACHIEVEMENTS AND IMPACT (10 points) ----
    const metricMatches = bodyText.match(/(\d+(?:\.\d+)?\s*%|\d+[xX]\b|\d+[kKmMbB]\+?|\d+\+\s*(?:years|records|skus|indices|services|apis))/g) || [];
    const metricCount = metricMatches.length;
    const actionVerbs = [
      'architected', 'engineered', 'built', 'developed', 'optimized', 'reduced',
      'accelerated', 'implemented', 'designed', 'scaled', 'automated', 'authored',
      'integrated', 'cut', 'improved', 'delivered', 'deployed', 'profiled'
    ];
    const matchedVerbs = actionVerbs.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(bodyText));
    const achievementPoints = Math.min(10, Math.min(6, metricCount) + Math.min(4, Math.floor(matchedVerbs.length / 2)));
    const achievementPct = Math.round((achievementPoints / 10) * 100);
    if (metricCount < 6) suggestions.push('Quantify more bullets with %, latency (ms), throughput (x), or record volume (XYZ formula).');

    // ---- 9. SECTION COMPLETENESS (5 points) ----
    const essentialSections = ['summary', 'experience', 'technical skills', 'education', 'certifications'];
    const presentSectionsCount = essentialSections.filter(sec => new RegExp(`\\\\section\\*?\\{[^}]*${sec}`, 'i').test(raw)).length;
    const completenessPoints = Math.min(5, presentSectionsCount);

    // ---- AGGREGATED 100-POINT SCORE & BAND ----
    const totalScore = Math.min(
      100,
      keywordPoints +
      techSkillPoints +
      experiencePoints +
      parsePoints +
      formatPoints +
      jobTitlePoints +
      eduCertPoints +
      achievementPoints +
      completenessPoints
    );

    const scoreBand =
      totalScore >= 90 ? { label: 'Excellent', color: 'emerald' } :
      totalScore >= 80 ? { label: 'Very Good', color: 'emerald' } :
      totalScore >= 70 ? { label: 'Good', color: 'amber' } :
      totalScore >= 60 ? { label: 'Needs Improvement', color: 'amber' } :
      { label: 'Significant Improvements Needed', color: 'rose' };

    // Separate Additional Evaluation Scores (ATS Compatibility vs Job Fit)
    const atsCompatibilityScore = Math.min(100, Math.round(((parsePoints + formatPoints + completenessPoints) / 30) * 100));
    const jobDescriptionMatchScore = keywordPct;
    const contentQualityScore = Math.min(100, Math.round(((achievementPoints + experiencePoints) / 25) * 100));

    const categories = [
      { name: '1. Keyword Matching', earned: keywordPoints, max: 20, detail: `${matchedKeywords.length}/${targetKeywords.length} ${hasJd ? 'JD' : 'core'} keywords (${keywordPct}%)` },
      { name: '2. Technical Skills Match', earned: techSkillPoints, max: 15, detail: `${techHits.length} verified languages, frameworks, DBs & tools` },
      { name: '3. Experience Relevance', earned: experiencePoints, max: 15, detail: 'Tenure dates, YOE signal & architectural ownership' },
      { name: '4. ATS Parseability', earned: parsePoints, max: 15, detail: 'Contact extraction, standard headers & \\pdfgentounicode=1' },
      { name: '5. Formatting & Readability', earned: formatPoints, max: 10, detail: `Single-column layout, 10pt font & ${wordCount} words` },
      { name: '6. Job Title Relevance', earned: jobTitlePoints, max: 5, detail: 'Software Engineer / Backend & Full-Stack role alignment' },
      { name: '7. Education & Certifications', earned: eduCertPoints, max: 5, detail: 'B.E. Computer Science & verified certifications' },
      { name: '8. Achievements & Impact', earned: achievementPoints, max: 10, detail: `${metricCount} quantified metrics & ${matchedVerbs.length} action verbs` },
      { name: '9. Section Completeness', earned: completenessPoints, max: 5, detail: `${presentSectionsCount}/5 core resume sections detected` }
    ];

    const subScores = [
      { label: 'ATS Compatibility', value: atsCompatibilityScore },
      { label: 'JD Match', value: jobDescriptionMatchScore },
      { label: 'Technical Skills', value: techSkillPct },
      { label: 'Experience', value: experiencePct },
      { label: 'Content Quality', value: contentQualityScore },
      { label: 'Achievements', value: achievementPct },
      { label: 'Readability', value: readabilityPct },
      { label: 'Overall Score', value: totalScore }
    ];

    return {
      totalScore,
      scoreBand,
      categories,
      subScores,
      matchedKeywords,
      missingKeywords,
      hasJd,
      wordCount,
      metricCount,
      suggestions
    };
  }, [latexResumeCode, targetJobDescription]);

  const handleSaveResumeVersion = () => {
    const versionTitle = newResumeVersionName.trim() || `Resume Version #${resumeVersions.length + 1}`;
    const roleTag = newResumeVersionRole.trim() || 'Tailored Software Engineer';
    const nowLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newVer = {
      id: 'ver-' + Date.now(),
      name: versionTitle,
      targetRole: roleTag,
      updatedAt: nowLabel,
      latexCode: latexResumeCode
    };
    setResumeVersions([newVer, ...resumeVersions]);
    setActiveResumeVersionId(newVer.id);
    setNewResumeVersionName('');
    setNewResumeVersionRole('');
    setShowSaveResumeVersionModal(false);
    playChime();
    showToast(`Saved resume version "${versionTitle}"`);
  };

  const handleUpdateCurrentResumeVersion = () => {
    const nowLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const exists = resumeVersions.some(v => v.id === activeResumeVersionId);
    if (!exists) {
      setShowSaveResumeVersionModal(true);
      return;
    }
    setResumeVersions(
      resumeVersions.map(v =>
        v.id === activeResumeVersionId ? { ...v, latexCode: latexResumeCode, updatedAt: nowLabel } : v
      )
    );
    playChime();
    showToast('Updated active resume version!');
  };

  const handleLoadResumeVersion = (ver) => {
    setActiveResumeVersionId(ver.id);
    setLatexResumeCode(ver.latexCode);
    showToast(`Loaded "${ver.name}"`);
  };

  const handleDeleteResumeVersion = (verId) => {
    if (resumeVersions.length <= 1) {
      showToast('Keep at least one resume version in your vault');
      return;
    }
    const remaining = resumeVersions.filter(v => v.id !== verId);
    setResumeVersions(remaining);
    if (activeResumeVersionId === verId && remaining[0]) {
      setActiveResumeVersionId(remaining[0].id);
      setLatexResumeCode(remaining[0].latexCode);
    }
    showToast('Resume version deleted');
  };

  const handleDownloadTexFile = () => {
    const activeVer = resumeVersions.find(v => v.id === activeResumeVersionId);
    const filename = (activeVer?.name || 'Thanushraj_Resume').replace(/[^a-zA-Z0-9_-]/g, '_') + '.tex';
    const blob = new Blob([latexResumeCode], { type: 'application/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  };

  // ================= STEP-BY-STEP EXECUTION TRACER =================
  const executionTrace = useMemo(() => {
    const rawLines = javaCode.split('\n');
    const frames = [];
    const heapObjects = [];
    const consoleLines = [];
    const callStack = [{ methodName: 'main', vars: [] }];
    let nextAddr = 0x60;
    const allocAddr = () => '0x' + (nextAddr++).toString(16);

    const currentFrame = () => callStack[callStack.length - 1];

    const findVar = (name, thisObj = null) => {
      for (let fIdx = callStack.length - 1; fIdx >= 0; fIdx--) {
        const found = callStack[fIdx].vars.find(v => v.name === name);
        if (found) return found;
      }
      if (thisObj && thisObj.fields && Object.prototype.hasOwnProperty.call(thisObj.fields, name)) {
        const val = thisObj.fields[name];
        const isAddr = typeof val === 'string' && val.startsWith('0x');
        return { name, type: 'field', value: val, pointsTo: isAddr ? val : null };
      }
      return null;
    };

    const setVar = (name, value, type = 'var', pointsTo = null, thisObj = null) => {
      const frame = currentFrame();
      const existing = frame.vars.find(v => v.name === name);
      if (existing) {
        existing.value = value;
        if (type && type !== 'var') existing.type = type;
        existing.pointsTo = pointsTo;
        return;
      }
      if (thisObj && thisObj.fields && Object.prototype.hasOwnProperty.call(thisObj.fields, name)) {
        thisObj.fields[name] = pointsTo !== null ? pointsTo : value;
        return;
      }
      frame.vars.push({ name, type, value, pointsTo });
    };

    const snapshot = (lineNum, codeLine, eventType, explanation, waitingForInput = null) => {
      const visibleVars = [];
      callStack.forEach((f, idx) => {
        const prefix = idx === 0 && callStack.length > 1 ? 'main.' : '';
        f.vars.forEach(v => {
          visibleVars.push({ ...v, name: prefix + v.name });
        });
      });

      // Auto-infer Graph, LinkedList, and Binary Tree topology on Heap objects
      heapObjects.forEach(ho => {
        if (ho.fields) {
          // 1. Detect Graph via adjacency list field
          for (const [, fVal] of Object.entries(ho.fields)) {
            const target = typeof fVal === 'string' && fVal.startsWith('0x') ? heapObjects.find(h => h.addr === fVal) : null;
            if (target && target.isCollection && target.items.length > 0 && target.items.every(it => typeof it.pointsTo === 'string')) {
              const adj = {};
              target.items.forEach((bucket, uIdx) => {
                const innerList = heapObjects.find(h => h.addr === bucket.pointsTo);
                adj[String(uIdx)] = innerList ? innerList.items.map(x => String(x.value)) : [];
              });
              ho.dsType = 'GRAPH';
              ho.adj = adj;
            }
          }

          // 2. Detect LinkedList wrapper (e.g. class LinkedList { Node head; })
          if (Object.prototype.hasOwnProperty.call(ho.fields, 'head')) {
            ho.dsType = 'LINKED_LIST';
            const nodes = [];
            const visitedAddrs = new Set();
            let currAddr = ho.fields.head;
            while (typeof currAddr === 'string' && currAddr.startsWith('0x') && !visitedAddrs.has(currAddr)) {
              visitedAddrs.add(currAddr);
              const nodeObj = heapObjects.find(h => h.addr === currAddr);
              if (!nodeObj || !nodeObj.fields) break;
              const pointers = [];
              if (currAddr === ho.fields.head) pointers.push('head');
              visibleVars.forEach(sv => {
                if (sv.pointsTo === currAddr && sv.name !== 'newNode') {
                  pointers.push(sv.name);
                }
              });
              const valKey = Object.keys(nodeObj.fields).find(k => k !== 'next') || 'data';
              nodes.push({
                addr: currAddr,
                data: nodeObj.fields[valKey],
                pointers,
                highlight: pointers.includes('temp') || pointers.includes('curr') ? 'ACTIVE' : null
              });
              currAddr = nodeObj.fields.next;
            }
            ho.nodes = nodes;
          }

          // 3. Detect Binary Tree node (any object with left / right child fields)
          if (Object.prototype.hasOwnProperty.call(ho.fields, 'left') || Object.prototype.hasOwnProperty.call(ho.fields, 'right')) {
            const buildTree = (addr, depth = 0) => {
              if (depth > 6 || typeof addr !== 'string' || !addr.startsWith('0x')) return null;
              const nObj = heapObjects.find(h => h.addr === addr);
              if (!nObj || !nObj.fields) return null;
              const valKey = Object.keys(nObj.fields).find(k => k !== 'left' && k !== 'right') || 'val';
              return {
                addr,
                val: nObj.fields[valKey],
                left: buildTree(nObj.fields.left, depth + 1),
                right: buildTree(nObj.fields.right, depth + 1)
              };
            };
            ho.dsType = 'TREE';
            ho.root = buildTree(ho.addr);
          }
        }
      });

      frames.push({
        line: lineNum,
        code: codeLine,
        eventType,
        explanation,
        waitingForInput,
        activeMethod: callStack.map(f => `${f.methodName}()`).join(' → '),
        stackVars: JSON.parse(JSON.stringify(visibleVars)),
        heapObjects: JSON.parse(JSON.stringify(heapObjects)),
        consoleOutput: consoleLines.join('\n')
      });
    };

    // Parse all classes, constructors, and methods in the file
    const classDefs = {};
    const strippedLines = rawLines.map(l => l.replace(/\/\/.*$/, ''));

    const findMatchingBrace = (startLineIdx, startCharIdx) => {
      let depth = 0;
      let inStr = false;
      for (let li = startLineIdx; li < strippedLines.length; li++) {
        const lineStr = strippedLines[li];
        for (let ci = (li === startLineIdx ? startCharIdx : 0); ci < lineStr.length; ci++) {
          const ch = lineStr[ci];
          const prev = ci > 0 ? lineStr[ci - 1] : '';
          if (ch === '"' && prev !== '\\') inStr = !inStr;
          if (!inStr) {
            if (ch === '{') depth++;
            else if (ch === '}') {
              depth--;
              if (depth === 0) return { endLine: li, endChar: ci };
            }
          }
        }
      }
      return { endLine: strippedLines.length - 1, endChar: 0 };
    };

    for (let i = 0; i < strippedLines.length; i++) {
      const clsMatch = strippedLines[i].match(/^\s*(?:public\s+|private\s+|final\s+)*class\s+([A-Za-z_][A-Za-z0-9_]*)/);
      if (clsMatch) {
        const clsName = clsMatch[1];
        const bracePos = strippedLines[i].indexOf('{');
        if (bracePos === -1) continue;
        const { endLine } = findMatchingBrace(i, bracePos);
        const clsDef = { name: clsName, fields: [], constructors: [], methods: {} };

        let cursor = i + 1;
        while (cursor < endLine) {
          const lineTrim = strippedLines[cursor].trim();
          if (!lineTrim) { cursor++; continue; }

          // Constructor
          const ctorMatch = lineTrim.match(new RegExp(`^(?:public|private|protected)?\\s*${clsName}\\s*\\(([^)]*)\\)\\s*\\{?`));
          if (ctorMatch && strippedLines.slice(cursor, Math.min(cursor + 3, endLine)).join(' ').includes('{')) {
            let bLine = cursor;
            while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
            const mEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
            const params = ctorMatch[1].trim()
              ? ctorMatch[1].split(',').map(p => p.trim().split(/\s+/).pop().replace(/\[\]$/, ''))
              : [];
            clsDef.constructors.push({ params, startLine: bLine + 1, endLine: mEnd });
            cursor = mEnd + 1;
            continue;
          }

          // Method
          const methodMatch = lineTrim.match(/^(?:public|private|protected|static|final|\s)+([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/);
          if (methodMatch && !lineTrim.endsWith(';') && strippedLines.slice(cursor, Math.min(cursor + 3, endLine)).join(' ').includes('{')) {
            let bLine = cursor;
            while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
            const mEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
            const params = methodMatch[3].trim()
              ? methodMatch[3].split(',').map(p => p.trim().split(/\s+/).pop().replace(/\[\]$/, ''))
              : [];
            clsDef.methods[methodMatch[2]] = {
              name: methodMatch[2],
              returnType: methodMatch[1],
              params,
              startLine: bLine + 1,
              endLine: mEnd
            };
            cursor = mEnd + 1;
            continue;
          }

          // Field declaration
          const fieldMatch = lineTrim.match(/^(?:private|public|protected|static|final|\s)*([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\[\])?\s*(?:=\s*([^;]+))?;/);
          if (fieldMatch) {
            clsDef.fields.push({ type: fieldMatch[1], name: fieldMatch[2], init: fieldMatch[3] || null });
          }
          cursor++;
        }
        classDefs[clsName] = clsDef;
        i = endLine;
      }
    }

    const splitTopLevelArgs = (argStr) => {
      if (!argStr || !argStr.trim()) return [];
      const res = [];
      let depth = 0, inStr = false, curr = '';
      for (let i = 0; i < argStr.length; i++) {
        const ch = argStr[i];
        if (ch === '"' && argStr[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
          if (ch === '(' || ch === '[' || ch === '<') depth++;
          else if (ch === ')' || ch === ']' || ch === '>') depth--;
          else if (ch === ',' && depth === 0) {
            res.push(curr.trim());
            curr = '';
            continue;
          }
        }
        curr += ch;
      }
      if (curr.trim()) res.push(curr.trim());
      return res;
    };

    const resolveTargetObject = (targetExpr, thisObj) => {
      const parts = targetExpr.split('.');
      let curr = parts[0] === 'this' ? thisObj : null;
      let startIdx = parts[0] === 'this' ? 1 : 0;
      if (!curr) {
        const v = findVar(parts[0], thisObj);
        if (!v) return null;
        const addr = v.pointsTo || v.value;
        curr = heapObjects.find(h => h.addr === addr) || null;
        startIdx = 1;
      }
      for (let i = startIdx; i < parts.length; i++) {
        if (!curr) return null;
        const step = parts[i];
        const getCall = step.match(/^get\((.+)\)$/);
        if (getCall && curr.items) {
          const idx = Number(evalExpr(getCall[1], thisObj));
          const slot = curr.items[idx];
          curr = slot && slot.pointsTo ? heapObjects.find(h => h.addr === slot.pointsTo) : null;
        } else if (curr.fields && curr.fields[step]) {
          curr = heapObjects.find(h => h.addr === curr.fields[step]) || null;
        } else {
          return null;
        }
      }
      return curr;
    };

    const evalExpr = (expr, thisObj = null) => {
      const trimmed = (expr || '').trim();
      if (!trimmed) return undefined;
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1);
      }
      if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
      if (trimmed === 'true') return true;
      if (trimmed === 'false') return false;
      if (trimmed === 'null') return null;

      // Logical NOT: !visited[neighbor] or !queue.isEmpty()
      if (trimmed.startsWith('!')) {
        return !Boolean(evalExpr(trimmed.slice(1), thisObj));
      }

      // Compound logical && / ||
      if (trimmed.includes('&&')) {
        const parts = trimmed.split('&&');
        return parts.every(p => Boolean(evalExpr(p, thisObj)));
      }
      if (trimmed.includes('||')) {
        const parts = trimmed.split('||');
        return parts.some(p => Boolean(evalExpr(p, thisObj)));
      }

      // Comparisons: <, <=, >, >=, ==, !=
      const cmpMatch = trimmed.match(/^(.+?)\s*(<=|>=|==|!=|<|>)\s*(.+)$/);
      if (cmpMatch && !trimmed.includes('new ')) {
        const lVal = evalExpr(cmpMatch[1], thisObj);
        const rVal = evalExpr(cmpMatch[3], thisObj);
        switch (cmpMatch[2]) {
          case '<': return lVal < rVal;
          case '<=': return lVal <= rVal;
          case '>': return lVal > rVal;
          case '>=': return lVal >= rVal;
          case '==': return lVal === rVal;
          case '!=': return lVal !== rVal;
          default: break;
        }
      }

      // String / Numeric + concatenation
      if (trimmed.includes('+')) {
        const parts = [];
        let depth = 0, inStr = false, curr = '';
        for (let i = 0; i < trimmed.length; i++) {
          const ch = trimmed[i];
          if (ch === '"' && trimmed[i - 1] !== '\\') inStr = !inStr;
          if (!inStr) {
            if (ch === '(' || ch === '[') depth++;
            else if (ch === ')' || ch === ']') depth--;
            else if (ch === '+' && depth === 0) {
              parts.push(curr.trim());
              curr = '';
              continue;
            }
          }
          curr += ch;
        }
        if (curr.trim()) parts.push(curr.trim());
        if (parts.length > 1) {
          const evalParts = parts.map(p => {
            const isLit = (p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"));
            const v = evalExpr(p, thisObj);
            return { val: v, isStr: isLit || typeof v === 'string' };
          });
          if (evalParts.some(p => p.isStr)) return evalParts.map(p => String(p.val)).join('');
          return evalParts.reduce((acc, p) => acc + Number(p.val), 0);
        }
      }

      // Method calls returning value: obj.poll(), obj.isEmpty(), obj.get(i), customMethod()
      const callMatch = trimmed.match(/^(?:([A-Za-z_][A-Za-z0-9_.]*)\.)?([A-Za-z_][A-Za-z0-9_]*)\((.*)\)$/);
      if (callMatch && !trimmed.startsWith('new ')) {
        const [, targetPath, mName, argsRaw] = callMatch;
        const evalArgs = splitTopLevelArgs(argsRaw).map(a => evalExpr(a, thisObj));
        if (!targetPath && thisObj && classDefs[thisObj.className]?.methods[mName]) {
          return invokeMethod(thisObj, mName, evalArgs, 0);
        }
        if (targetPath) {
          const targetObj = resolveTargetObject(targetPath, thisObj);
          if (targetObj) {
            if (mName === 'isEmpty' && targetObj.items) return targetObj.items.length === 0;
            if (mName === 'size' && targetObj.items) return targetObj.items.length;
            if (mName === 'peek' && targetObj.items) return targetObj.items[0]?.value ?? null;
            if (mName === 'poll' && targetObj.items) {
              const popped = targetObj.items.shift();
              targetObj.items.forEach((it, idx) => { it.index = idx; });
              return popped ? (popped.pointsTo || popped.value) : null;
            }
            if (mName === 'pop' && targetObj.items) {
              const popped = targetObj.items.pop();
              return popped ? (popped.pointsTo || popped.value) : null;
            }
            if (mName === 'get' && targetObj.items) {
              const slot = targetObj.items[Number(evalArgs[0])];
              return slot ? (slot.pointsTo || slot.value) : null;
            }
            if (classDefs[targetObj.className]?.methods[mName]) {
              return invokeMethod(targetObj, mName, evalArgs, 0);
            }
          }
        }
      }

      // Array indexing: arr[i] or visited[start]
      const arrIdx = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\[([^\]]+)\]$/);
      if (arrIdx) {
        const v = findVar(arrIdx[1], thisObj);
        const arrObj = v ? heapObjects.find(h => h.addr === (v.pointsTo || v.value)) : null;
        const idxVal = Number(evalExpr(arrIdx[2], thisObj));
        if (arrObj && arrObj.items && arrObj.items[idxVal] !== undefined) {
          return arrObj.items[idxVal].value;
        }
      }

      // Field access: this.vertices or obj.data or temp.next
      if (trimmed.includes('.')) {
        const parts = trimmed.split('.');
        let curr = parts[0] === 'this' ? thisObj : resolveTargetObject(parts[0], thisObj);
        for (let idx = 1; idx < parts.length; idx++) {
          if (!curr) return null;
          const fName = parts[idx];
          if (idx === parts.length - 1) {
            if (curr.fields && Object.prototype.hasOwnProperty.call(curr.fields, fName)) {
              return curr.fields[fName];
            }
            return null;
          }
          const nextAddr = curr.fields?.[fName];
          curr = typeof nextAddr === 'string' && nextAddr.startsWith('0x') ? heapObjects.find(h => h.addr === nextAddr) : null;
        }
      }

      const found = findVar(trimmed, thisObj);
      if (found) return found.pointsTo !== null && found.pointsTo !== undefined ? found.pointsTo : found.value;
      return trimmed;
    };

    const instantiateCustomOrBuiltin = (rawNewExpr, varTypeHint = '') => {
      const m = rawNewExpr.match(/^new\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:<[^>]*>)?\s*\((.*)\)$/);
      if (!m) return null;
      const [, clsName, argsRaw] = m;
      const evalArgs = splitTopLevelArgs(argsRaw).map(a => evalExpr(a, null));
      const addr = allocAddr();

      // Prioritize user-defined classes in the file (e.g. custom class LinkedList, Node, TreeNode, Graph)
      const clsDef = classDefs[clsName];
      if (!clsDef && ['ArrayList', 'LinkedList', 'Stack', 'Queue', 'PriorityQueue', 'HashSet', 'HashMap'].includes(clsName)) {
        const isQueueVar = /Queue</.test(varTypeHint);
        const dsType = clsName === 'PriorityQueue' ? 'HEAP'
          : clsName === 'Stack' ? 'STACK'
          : (isQueueVar || clsName === 'Queue') ? 'QUEUE'
          : 'ARRAY';
        const isMaxHeap = /reverseOrder/i.test(argsRaw);
        const obj = {
          addr,
          className: clsName,
          dsType,
          isMaxHeap,
          isCollection: true,
          items: [],
          status: 'ACTIVE'
        };
        heapObjects.push(obj);
        return obj;
      }

      // User-defined class (e.g., LinkedList, Node, TreeNode, Graph)
      const fields = {};
      if (clsDef) {
        clsDef.fields.forEach(f => { fields[f.name] = null; });
      }
      const initialDsType = Object.prototype.hasOwnProperty.call(fields, 'head')
        ? 'LINKED_LIST'
        : (Object.prototype.hasOwnProperty.call(fields, 'left') || Object.prototype.hasOwnProperty.call(fields, 'right'))
        ? 'TREE'
        : undefined;
      const obj = { addr, className: clsName, dsType: initialDsType, fields, status: 'ACTIVE' };
      heapObjects.push(obj);

      if (clsDef && clsDef.constructors.length > 0) {
        const ctor = clsDef.constructors[0];
        const frameVars = ctor.params.map((pName, idx) => ({
          name: pName,
          type: 'param',
          value: evalArgs[idx],
          pointsTo: typeof evalArgs[idx] === 'string' && evalArgs[idx].startsWith('0x') ? evalArgs[idx] : null
        }));
        callStack.push({ methodName: `${clsName}()`, vars: frameVars });
        executeBlock(ctor.startLine, ctor.endLine, obj);
        callStack.pop();
      }
      return obj;
    };

    const invokeMethod = (targetObj, methodName, evalArgs, callSiteLine) => {
      const clsDef = classDefs[targetObj.className];
      const methodDef = clsDef?.methods[methodName];
      if (!methodDef) return undefined;

      const frameVars = methodDef.params.map((pName, idx) => ({
        name: pName,
        type: 'param',
        value: evalArgs[idx],
        pointsTo: typeof evalArgs[idx] === 'string' && evalArgs[idx].startsWith('0x') ? evalArgs[idx] : null
      }));
      callStack.push({ methodName: `${targetObj.className}.${methodName}`, vars: frameVars });
      if (callSiteLine > 0) {
        snapshot(callSiteLine, rawLines[callSiteLine - 1]?.trim() || '', 'METHOD_CALL', `Call ${targetObj.className}.${methodName}(${evalArgs.join(', ')})`);
      }
      const ret = executeBlock(methodDef.startLine, methodDef.endLine, targetObj);
      callStack.pop();
      return ret.returnValue;
    };

    const executeBlock = (startLine, endLine, thisObj = null) => {
      let i = startLine;
      while (i < endLine && frames.length < 260) {
        const line = strippedLines[i].trim();
        const lineNum = i + 1;
        if (!line || line === '{' || line === '}') { i++; continue; }

        // Return statement
        if (line.startsWith('return')) {
          const expr = line.replace(/^return\s*/, '').replace(/;$/, '').trim();
          const val = expr ? evalExpr(expr, thisObj) : undefined;
          snapshot(lineNum, line, 'RETURN', expr ? `Return ${val}` : 'Return');
          return { returned: true, returnValue: val };
        }

        // If / Else block
        const ifMatch = line.match(/^if\s*\((.+)\)\s*\{?$/);
        if (ifMatch) {
          let bLine = i;
          while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
          const blockEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
          const cond = Boolean(evalExpr(ifMatch[1], thisObj));
          snapshot(lineNum, line, 'BRANCH', `Check if (${ifMatch[1]}) → ${cond}`);
          if (cond) {
            const res = executeBlock(bLine + 1, blockEnd, thisObj);
            if (res.returned) return res;
          }
          i = blockEnd + 1;
          continue;
        }

        // While loop
        const whileMatch = line.match(/^while\s*\((.+)\)\s*\{?$/);
        if (whileMatch) {
          let bLine = i;
          while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
          const blockEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
          let guard = 0;
          while (Boolean(evalExpr(whileMatch[1], thisObj)) && guard < 30 && frames.length < 260) {
            snapshot(lineNum, line, 'LOOP_STEP', `while (${whileMatch[1]}) → true`);
            const res = executeBlock(bLine + 1, blockEnd, thisObj);
            if (res.returned) return res;
            guard++;
          }
          i = blockEnd + 1;
          continue;
        }

        // Enhanced for-each loop: for (int neighbor : adjList.get(current))
        const forEachMatch = line.match(/^for\s*\(\s*[A-Za-z0-9_<>\[\]]+\s+([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.+)\)\s*\{?$/);
        if (forEachMatch) {
          let bLine = i;
          while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
          const blockEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
          const iterVar = forEachMatch[1];
          const colAddr = evalExpr(forEachMatch[2], thisObj);
          const colObj = heapObjects.find(h => h.addr === colAddr);
          const items = colObj?.items || [];
          for (const item of items) {
            const val = item.pointsTo || item.value;
            setVar(iterVar, val, 'int', typeof val === 'string' && val.startsWith('0x') ? val : null, null);
            snapshot(lineNum, line, 'LOOP_STEP', `Iterate ${iterVar} = ${val}`);
            const res = executeBlock(bLine + 1, blockEnd, thisObj);
            if (res.returned) return res;
          }
          i = blockEnd + 1;
          continue;
        }

        // Classic for loop: for (int i = 0; i < vertices; i++)
        const forMatch = line.match(/^for\s*\(\s*(?:int\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^;]+);\s*([^;]+);\s*([^)]+)\)\s*\{?$/);
        if (forMatch) {
          let bLine = i;
          while (bLine < endLine && !strippedLines[bLine].includes('{')) bLine++;
          const blockEnd = findMatchingBrace(bLine, strippedLines[bLine].indexOf('{')).endLine;
          const [, loopVar, initExpr, condExpr, stepExpr] = forMatch;
          let curVal = Number(evalExpr(initExpr, thisObj)) || 0;
          setVar(loopVar, curVal, 'int');
          let guard = 0;
          while (Boolean(evalExpr(condExpr, thisObj)) && guard < 25 && frames.length < 260) {
            snapshot(lineNum, line, 'LOOP_STEP', `Loop ${loopVar} = ${curVal}`);
            const res = executeBlock(bLine + 1, blockEnd, thisObj);
            if (res.returned) return res;
            if (stepExpr.includes('++')) curVal++;
            else if (stepExpr.includes('--')) curVal--;
            setVar(loopVar, curVal, 'int');
            guard++;
          }
          i = blockEnd + 1;
          continue;
        }

        // Scanner input read
        const scannerRead = line.match(/^(?:(int|double|float|long|String)\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*[A-Za-z_][A-Za-z0-9_]*\.(nextInt|nextLine|next|nextDouble)\s*\(\s*\)\s*;/);
        if (scannerRead) {
          const [, declType, varName, readMethod] = scannerRead;
          const inputType = readMethod === 'nextInt' ? 'int' : readMethod === 'nextDouble' ? 'double' : 'String';
          const key = `${lineNum}:${varName}`;
          const provided = interactiveStdinValues[key];
          if (provided === undefined) {
            snapshot(lineNum, line, 'WAITING_FOR_INPUT', `Paused at ${readMethod}() — Enter value for "${varName}"`, { key, varName, inputType, method: readMethod });
            return { returned: true };
          }
          const parsedVal = inputType === 'int' ? (parseInt(provided, 10) || 0) : inputType === 'double' ? (parseFloat(provided) || 0) : provided;
          setVar(varName, parsedVal, declType || inputType);
          snapshot(lineNum, line, 'INPUT_RECEIVED', `Read "${parsedVal}" into ${varName}`);
          i++;
          continue;
        }

        // Array allocation: boolean visited[] = new boolean[vertices]; or int[] arr = {1, 2};
        const arrInitMatch = line.match(/^(?:final\s+)?([A-Za-z0-9_<>]+)\s*(?:\[\])?\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\[\])?\s*=\s*(?:new\s+[A-Za-z0-9_<>]+\s*\[\]\s*)?\{([^}]*)\}\s*;/);
        const arrSizeMatch = line.match(/^(?:final\s+)?([A-Za-z0-9_<>]+)\s*(?:\[\])?\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\[\])?\s*=\s*new\s+([A-Za-z0-9_<>]+)\s*\[([^\]]+)\]\s*;/);
        if (arrInitMatch || arrSizeMatch) {
          const elemType = arrInitMatch ? arrInitMatch[1] : arrSizeMatch[1];
          const varName = arrInitMatch ? arrInitMatch[2] : arrSizeMatch[2];
          const addr = allocAddr();
          const cap = arrSizeMatch ? Math.min(Number(evalExpr(arrSizeMatch[4], thisObj)) || 0, 16) : 0;
          const items = arrInitMatch
            ? (arrInitMatch[3].trim() ? arrInitMatch[3].split(',').map((s, idx) => ({ index: idx, value: evalExpr(s, thisObj) })) : [])
            : Array.from({ length: cap }, (_, idx) => ({
                index: idx,
                value: elemType === 'boolean' ? false : (elemType === 'int' || elemType === 'long' || elemType === 'double') ? 0 : null
              }));
          heapObjects.push({
            addr,
            className: `${elemType}[${items.length}]`,
            dsType: 'ARRAY',
            isCollection: true,
            items,
            status: 'ACTIVE'
          });
          setVar(varName, `ref → ${addr}`, `${elemType}[]`, addr, thisObj);
          snapshot(lineNum, line, 'DS_INIT', `Allocate ${elemType}[${items.length}] "${varName}" at ${addr}`);
          i++;
          continue;
        }

        // Array element mutation: visited[start] = true; or arr[i] = 10;
        const arrMutMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\[([^\]]+)\]\s*=\s*([^;]+)\s*;/);
        if (arrMutMatch) {
          const [, arrVar, idxExpr, valExpr] = arrMutMatch;
          const v = findVar(arrVar, thisObj);
          const arrObj = v ? heapObjects.find(h => h.addr === (v.pointsTo || v.value)) : null;
          const idx = Number(evalExpr(idxExpr, thisObj));
          const val = evalExpr(valExpr, thisObj);
          if (arrObj && arrObj.items && arrObj.items[idx] !== undefined) {
            arrObj.items[idx].value = val;
            arrObj.items[idx].highlight = 'NEW';
            snapshot(lineNum, line, 'DS_UPDATE', `Set ${arrVar}[${idx}] = ${val}`);
            arrObj.items[idx].highlight = null;
          }
          i++;
          continue;
        }

        // Object / Collection instantiation & assignment: Graph graph = new Graph(5); or adjList = new ArrayList<>();
        const objNewMatch = line.match(/^(?:([A-Za-z0-9_<>\[\]]+)\s+)?(this\.[A-Za-z_][A-Za-z0-9_]*|[A-Za-z_][A-Za-z0-9_]*)\s*=\s*(new\s+[A-Za-z_][A-Za-z0-9_]*\s*(?:<[^>]*>)?\s*\(.*\))\s*;/);
        if (objNewMatch) {
          const [, typeHint, lhs, rhsNew] = objNewMatch;
          const created = instantiateCustomOrBuiltin(rhsNew, typeHint || '');
          if (created) {
            if (lhs.startsWith('this.') && thisObj) {
              thisObj.fields[lhs.slice(5)] = created.addr;
            } else {
              setVar(lhs, `ref → ${created.addr}`, typeHint || created.className, created.addr, thisObj);
            }
            snapshot(lineNum, line, 'ALLOC', `Allocate ${created.className} (${created.addr}) for "${lhs}"`);
            i++;
            continue;
          }
        }

        // Collection .add() / .offer() / .push() on direct or chained target: adjList.get(source).add(destination);
        const colAddMatch = line.match(/^([A-Za-z_][A-Za-z0-9_.()]*)\.(add|offer|push)\((.+)\)\s*;/);
        if (colAddMatch) {
          const [, targetPath, op, argExpr] = colAddMatch;
          const targetObj = resolveTargetObject(targetPath, thisObj);
          if (targetObj && targetObj.items) {
            if (argExpr.trim().startsWith('new ')) {
              const innerObj = instantiateCustomOrBuiltin(argExpr.trim());
              if (innerObj) {
                targetObj.items.push({ index: targetObj.items.length, pointsTo: innerObj.addr, label: `${innerObj.className} (${innerObj.addr})`, highlight: 'NEW' });
                snapshot(lineNum, line, 'DS_ADD', `Add ${innerObj.className} (${innerObj.addr}) to ${targetPath}`);
                targetObj.items[targetObj.items.length - 1].highlight = null;
              }
            } else {
              const val = evalExpr(argExpr, thisObj);
              const isAddr = typeof val === 'string' && val.startsWith('0x');
              targetObj.items.push({
                index: targetObj.items.length,
                value: val,
                pointsTo: isAddr ? val : null,
                highlight: 'NEW'
              });
              if (targetObj.dsType === 'HEAP') {
                targetObj.items.sort((a, b) => targetObj.isMaxHeap ? Number(b.value) - Number(a.value) : Number(a.value) - Number(b.value));
                targetObj.items.forEach((it, idx) => { it.index = idx; });
              }
              snapshot(lineNum, line, 'DS_ADD', `${targetPath}.${op}(${val})`);
              const addedItem = targetObj.items.find(it => it.highlight === 'NEW');
              if (addedItem) addedItem.highlight = null;
            }
          }
          i++;
          continue;
        }

        // Print statement
        const printMatch = line.match(/^System\.out\.(println|print)\s*\((.*)\)\s*;/);
        if (printMatch) {
          const [, mode, argExpr] = printMatch;
          const val = argExpr.trim() ? String(evalExpr(argExpr, thisObj)) : '';
          if (mode === 'println') {
            if (consoleLines.length > 0 && consoleLines[consoleLines.length - 1].endsWith('\u200B')) {
              consoleLines[consoleLines.length - 1] = consoleLines[consoleLines.length - 1].replace(/\u200B$/, '') + val;
            } else {
              consoleLines.push(val);
            }
          } else {
            if (consoleLines.length > 0 && consoleLines[consoleLines.length - 1].endsWith('\u200B')) {
              consoleLines[consoleLines.length - 1] = consoleLines[consoleLines.length - 1].replace(/\u200B$/, '') + val + '\u200B';
            } else {
              consoleLines.push(val + '\u200B');
            }
          }
          snapshot(lineNum, line, 'STDOUT', `Print "${val}"`);
          i++;
          continue;
        }

        // Standalone void method call: list.insert(10); list.display(); graph.addEdge(0, 1); dfsHelper(0, visited);
        const voidCallMatch = line.match(/^(?:([A-Za-z_][A-Za-z0-9_.]*)\.)?([A-Za-z_][A-Za-z0-9_]*)\((.*)\)\s*;/);
        if (voidCallMatch && !line.startsWith('new ') && !line.startsWith('System.out')) {
          const [, targetPath, mName, argsRaw] = voidCallMatch;
          const evalArgs = splitTopLevelArgs(argsRaw).map(a => evalExpr(a, thisObj));
          if (!targetPath && thisObj && classDefs[thisObj.className]?.methods[mName]) {
            invokeMethod(thisObj, mName, evalArgs, lineNum);
            i++;
            continue;
          }
          if (targetPath) {
            const targetObj = resolveTargetObject(targetPath, thisObj);
            if (targetObj && classDefs[targetObj.className]?.methods[mName]) {
              invokeMethod(targetObj, mName, evalArgs, lineNum);
              i++;
              continue;
            }
          }
        }

        // Variable / field declaration or assignment: this.vertices = vertices; or temp.next = newNode; or root.left = new TreeNode(30);
        const assignMatch = line.match(/^(?:final\s+)?(?:([A-Za-z0-9_<>\[\]]+)\s+)?([A-Za-z_][A-Za-z0-9_.]*)\s*=\s*([^;]+)\s*;/);
        if (assignMatch) {
          const [, declType, lhs, rhs] = assignMatch;
          let val;
          if (rhs.trim().startsWith('new ')) {
            const created = instantiateCustomOrBuiltin(rhs.trim(), declType || '');
            val = created ? created.addr : evalExpr(rhs, thisObj);
          } else {
            val = evalExpr(rhs, thisObj);
          }
          const isAddr = typeof val === 'string' && val.startsWith('0x');

          if (lhs.includes('.')) {
            const parts = lhs.split('.');
            let targetObj = parts[0] === 'this' ? thisObj : resolveTargetObject(parts[0], thisObj);
            for (let pIdx = 1; pIdx < parts.length - 1; pIdx++) {
              if (!targetObj) break;
              const nextAddr = targetObj.fields?.[parts[pIdx]];
              targetObj = typeof nextAddr === 'string' && nextAddr.startsWith('0x') ? heapObjects.find(h => h.addr === nextAddr) : null;
            }
            const finalField = parts[parts.length - 1];
            if (targetObj && targetObj.fields) {
              targetObj.fields[finalField] = val;
            }
          } else {
            setVar(lhs, isAddr ? `ref → ${val}` : val, declType || 'var', isAddr ? val : null, thisObj);
          }
          snapshot(lineNum, line, 'ASSIGN', `${lhs} = ${val}`);
          i++;
          continue;
        }

        i++;
      }
      return { returned: false, returnValue: undefined };
    };

    // Locate Main.main and begin execution
    const mainMethod = classDefs.Main?.methods?.main;
    if (mainMethod) {
      executeBlock(mainMethod.startLine, mainMethod.endLine, null);
    } else {
      executeBlock(0, strippedLines.length, null);
    }

    if (frames.length === 0) {
      snapshot(1, rawLines[0]?.trim() || 'main()', 'READY', 'Step through your Java code using Prev / Next controls');
    }

    return frames;
  }, [javaCode, interactiveStdinValues]);

  const currentTraceFrame = executionTrace[Math.min(vizStepIndex, Math.max(0, executionTrace.length - 1))] || null;

  // Auto-play timer for step visualizer
  useEffect(() => {
    if (!isVizPlaying) return;
    if (currentTraceFrame?.waitingForInput || vizStepIndex >= executionTrace.length - 1) {
      setIsVizPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setVizStepIndex(prev => Math.min(executionTrace.length - 1, prev + 1));
    }, 900);
    return () => clearTimeout(timer);
  }, [isVizPlaying, vizStepIndex, executionTrace.length, currentTraceFrame]);

  // Sync line numbers scroll and auto-scroll active debugger line into view
  useEffect(() => {
    if (javaRightPanelMode !== 'visualizer' || !currentTraceFrame?.line) return;
    const lineHeightPx = javaFontSize * 1.6;
    const targetTop = Math.max(0, (currentTraceFrame.line - 4) * lineHeightPx);
    if (javaTextareaRef.current) {
      javaTextareaRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
    if (javaLineNumbersRef.current) {
      javaLineNumbersRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
    if (javaHighlightOverlayRef.current) {
      javaHighlightOverlayRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, [vizStepIndex, javaRightPanelMode, javaFontSize, currentTraceFrame]);

  const handleSubmitInteractiveInput = () => {
    const waitInfo = currentTraceFrame?.waitingForInput;
    if (!waitInfo) return;
    const val = interactiveInputDraft.trim();
    if (!val) return;
    setInteractiveStdinValues(prev => ({ ...prev, [waitInfo.key]: val }));
    setInteractiveInputDraft('');
    setTimeout(() => {
      setVizStepIndex(prev => prev + 1);
    }, 60);
  };

  // ================= JAVA IDE HELPERS & KEYLESS COMPILER =================
  const handleJavaEditorScroll = () => {
    if (!javaTextareaRef.current) return;
    const top = javaTextareaRef.current.scrollTop;
    if (javaLineNumbersRef.current) {
      javaLineNumbersRef.current.scrollTop = top;
    }
    if (javaHighlightOverlayRef.current) {
      javaHighlightOverlayRef.current.scrollTop = top;
    }
  };

  // Find matching opening/closing bracket when cursor clicks or moves onto {, }, (, ), [, ]
  const updateMatchedBracketAtCursor = (cursorPos, sourceText = javaCode) => {
    const openMap = { '{': '}', '(': ')', '[': ']' };
    const closeMap = { '}': '{', ')': '(', ']': '[' };

    let checkIdx = cursorPos;
    let ch = sourceText[checkIdx];
    if (!openMap[ch] && !closeMap[ch] && cursorPos > 0) {
      const prevCh = sourceText[cursorPos - 1];
      if (openMap[prevCh] || closeMap[prevCh]) {
        checkIdx = cursorPos - 1;
        ch = prevCh;
      }
    }

    if (!openMap[ch] && !closeMap[ch]) {
      setMatchedBracketInfo(null);
      return;
    }

    const getLineNum = (idx) => sourceText.slice(0, idx).split('\n').length;

    if (openMap[ch]) {
      const targetClose = openMap[ch];
      let depth = 0;
      let inStr = false;
      for (let i = checkIdx; i < sourceText.length; i++) {
        const c = sourceText[i];
        if (c === '"' && sourceText[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
          if (c === ch) depth++;
          else if (c === targetClose) {
            depth--;
            if (depth === 0) {
              setMatchedBracketInfo({
                openChar: ch,
                closeChar: targetClose,
                openLine: getLineNum(checkIdx),
                closeLine: getLineNum(i)
              });
              return;
            }
          }
        }
      }
    } else if (closeMap[ch]) {
      const targetOpen = closeMap[ch];
      let depth = 0;
      let inStr = false;
      for (let i = checkIdx; i >= 0; i--) {
        const c = sourceText[i];
        if (c === '"' && sourceText[i - 1] !== '\\') inStr = !inStr;
        if (!inStr) {
          if (c === ch) depth++;
          else if (c === targetOpen) {
            depth--;
            if (depth === 0) {
              setMatchedBracketInfo({
                openChar: targetOpen,
                closeChar: ch,
                openLine: getLineNum(i),
                closeLine: getLineNum(checkIdx)
              });
              return;
            }
          }
        }
      }
    }
    setMatchedBracketInfo(null);
  };

  const applyJavaEditorEdit = (newCode, newSelStart, newSelEnd = newSelStart) => {
    setJavaCode(newCode);
    requestAnimationFrame(() => {
      if (javaTextareaRef.current) {
        javaTextareaRef.current.focus();
        javaTextareaRef.current.selectionStart = newSelStart;
        javaTextareaRef.current.selectionEnd = newSelEnd;
        updateMatchedBracketAtCursor(newSelStart, newCode);
      }
    });
  };

  const handleFormatJavaCode = () => {
    const lines = javaCode.split('\n');
    let indentLevel = 0;
    const formatted = lines.map((rawLine) => {
      const trimmed = rawLine.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('}')) indentLevel = Math.max(0, indentLevel - 1);
      const indentedLine = '    '.repeat(indentLevel) + trimmed;
      let netBraces = 0;
      let inString = false;
      for (let i = 0; i < trimmed.length; i++) {
        const ch = trimmed[i];
        const prev = i > 0 ? trimmed[i - 1] : '';
        if (ch === '"' && prev !== '\\') inString = !inString;
        else if (!inString) {
          if (ch === '{') netBraces++;
          else if (ch === '}') netBraces--;
        }
      }
      if (trimmed.startsWith('}')) indentLevel = Math.max(0, indentLevel + netBraces + 1);
      else indentLevel = Math.max(0, indentLevel + netBraces);
      return indentedLine;
    });
    setJavaCode(formatted.join('\n'));
    showToast('Formatted Java indentation');
  };

  const handleEditorKeyDown = (e) => {
    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runJavaCode();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const lineStart = javaCode.lastIndexOf('\n', start - 1) + 1;
      const hasMultiLineSelection = javaCode.substring(start, end).includes('\n');

      if (e.shiftKey) {
        const block = javaCode.substring(lineStart, end);
        const lines = block.split('\n');
        let removedFirstLine = 0;
        let totalRemoved = 0;
        const outdented = lines
          .map((line, idx) => {
            const match = line.match(/^( {1,4}|\t)/);
            const stripLen = match ? match[0].length : 0;
            if (idx === 0) removedFirstLine = stripLen;
            totalRemoved += stripLen;
            return line.slice(stripLen);
          })
          .join('\n');
        const updated = javaCode.substring(0, lineStart) + outdented + javaCode.substring(end);
        const newStart = Math.max(lineStart, start - removedFirstLine);
        const newEnd = Math.max(newStart, end - totalRemoved);
        applyJavaEditorEdit(updated, newStart, newEnd);
      } else if (hasMultiLineSelection) {
        const block = javaCode.substring(lineStart, end);
        const lines = block.split('\n');
        const indented = lines.map(line => '    ' + line).join('\n');
        const updated = javaCode.substring(0, lineStart) + indented + javaCode.substring(end);
        applyJavaEditorEdit(updated, start + 4, end + lines.length * 4);
      } else {
        const updated = javaCode.substring(0, start) + '    ' + javaCode.substring(end);
        applyJavaEditorEdit(updated, start + 4);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = javaCode.lastIndexOf('\n', start - 1) + 1;
      const currentLine = javaCode.substring(lineStart, start);
      const indentMatch = currentLine.match(/^[ \t]*/);
      const baseIndent = indentMatch ? indentMatch[0] : '';
      const trimmedBefore = currentLine.trimEnd();
      const charAfter = javaCode[end] || '';

      if (trimmedBefore.endsWith('{') && charAfter === '}') {
        const innerIndent = baseIndent + '    ';
        const insertion = '\n' + innerIndent + '\n' + baseIndent;
        const updated = javaCode.substring(0, start) + insertion + javaCode.substring(end);
        applyJavaEditorEdit(updated, start + 1 + innerIndent.length);
      } else if (trimmedBefore.endsWith('{')) {
        const nextIndent = baseIndent + '    ';
        const updated = javaCode.substring(0, start) + '\n' + nextIndent + javaCode.substring(end);
        applyJavaEditorEdit(updated, start + 1 + nextIndent.length);
      } else {
        const updated = javaCode.substring(0, start) + '\n' + baseIndent + javaCode.substring(end);
        applyJavaEditorEdit(updated, start + 1 + baseIndent.length);
      }
    }
  };

  const runJavaCode = async () => {
    if (!javaCode.trim() || isJavaRunning) return;
    setIsJavaRunning(true);
    setJavaStdout('');
    setJavaStderr('');
    setJavaExecTime(null);
    setJavaRightPanelMode('console');

    const startTime = performance.now();

    const tryJudge0 = async () => {
      const res = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: javaCode,
          language_id: 91,
          stdin: javaStdin
        })
      });
      if (!res.ok) throw new Error(`Judge0 HTTP ${res.status}`);
      const data = await res.json();
      setJavaExecTime(data.time ? Math.round(parseFloat(data.time) * 1000) : Math.round(performance.now() - startTime));
      if (data.compile_output) {
        setJavaStderr(data.compile_output);
      } else if (data.status && data.status.id !== 3) {
        setJavaStdout(data.stdout || '');
        setJavaStderr(data.stderr || data.message || data.status.description || 'Runtime Error');
      } else {
        setJavaStdout(data.stdout || '');
        setJavaStderr(data.stderr || '');
      }
    };

    const tryWandbox = async () => {
      const wandboxRes = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: javaCode,
          compiler: 'openjdk-head',
          stdin: javaStdin
        })
      });
      if (!wandboxRes.ok) throw new Error(`Wandbox HTTP ${wandboxRes.status}`);
      const data = await wandboxRes.json();
      setJavaExecTime(Math.round(performance.now() - startTime));
      if (data.compiler_error && Number(data.status) !== 0 && !data.program_output) {
        setJavaStderr(data.compiler_error);
      } else {
        setJavaStdout(data.program_output || '');
        setJavaStderr([data.compiler_error, data.program_error].filter(Boolean).join('\n'));
      }
    };

    try {
      try {
        await tryJudge0();
      } catch (e1) {
        await tryWandbox();
      }
    } catch (err) {
      setJavaStderr(`Execution Error: ${err.message}\nPublic OpenJDK runners were unreachable.`);
    } finally {
      setIsJavaRunning(false);
    }
  };

  const handleSaveSnippetConfirm = () => {
    const isSql = savingSnippetLanguage === 'sql';
    const title = newSnippetTitle.trim() || `${isSql ? 'SQL Query' : 'Java Solution'} #${savedSnippets.length + 1}`;
    const item = {
      id: 'snip-' + Date.now(),
      title,
      language: isSql ? 'sql' : 'java',
      folder: newSnippetFolder || 'General',
      code: isSql ? sqlQuery : javaCode,
      stdin: isSql ? '' : javaStdin,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setSavedSnippets([item, ...savedSnippets]);
    setNewSnippetTitle('');
    setShowSaveSnippetModal(false);
    playChime();
    showToast(`Saved ${isSql ? 'SQL query' : 'Java snippet'} "${title}" to "${item.folder}"`);
  };

  const handleCreateSnippetFolder = () => {
    const name = newFolderInput.trim();
    if (!name || snippetFolders.includes(name)) return;
    setSnippetFolders([...snippetFolders, name]);
    setNewFolderInput('');
    showToast(`Created folder "${name}"`);
  };

  const handleDeleteSnippet = (id) => {
    setSavedSnippets(savedSnippets.filter(s => s.id !== id));
    showToast('Snippet deleted');
  };

  // Learning Website Bookmarks Handlers
  const handleSaveNewBookmark = () => {
    if (!newBmTitle.trim() || !newBmUrl.trim()) {
      showToast('Please enter both website title and URL');
      return;
    }
    const formattedUrl = /^https?:\/\//i.test(newBmUrl.trim())
      ? newBmUrl.trim()
      : `https://${newBmUrl.trim()}`;
    const chosenCat = newBmCategory || 'General Learning';
    if (!bookmarkCategories.includes(chosenCat)) {
      setBookmarkCategories([...bookmarkCategories, chosenCat]);
    }
    const newItem = {
      id: 'bm-' + Date.now(),
      title: newBmTitle.trim(),
      url: formattedUrl,
      category: chosenCat,
      notes: newBmNotes.trim(),
      favorite: false,
      addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setBookmarks([newItem, ...bookmarks]);
    setNewBmTitle('');
    setNewBmUrl('');
    setNewBmNotes('');
    setModalAddBookmarkOpen(false);
    playChime();
    showToast(`Bookmarked "${newItem.title}" under ${chosenCat}`);
  };

  const handleToggleFavoriteBookmark = (id) => {
    setBookmarks(bookmarks.map(b => (b.id === id ? { ...b, favorite: !b.favorite } : b)));
  };

  const handleDeleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
    showToast('Bookmark removed');
  };

  const handleCreateBookmarkCategory = () => {
    const name = newBookmarkCategoryInput.trim();
    if (!name || bookmarkCategories.includes(name)) return;
    setBookmarkCategories([...bookmarkCategories, name]);
    setNewBookmarkCategoryInput('');
    showToast(`Added category "${name}"`);
  };

  const handleDeleteBookmarkCategory = (catName) => {
    if (bookmarkCategories.length <= 1) {
      showToast('Keep at least one bookmark category');
      return;
    }
    const fallback = bookmarkCategories.find(c => c !== catName) || 'General Learning';
    setBookmarks(bookmarks.map(b => (b.category === catName ? { ...b, category: fallback } : b)));
    setBookmarkCategories(bookmarkCategories.filter(c => c !== catName));
    if (selectedBookmarkCategory === catName) {
      setSelectedBookmarkCategory('ALL');
    }
    showToast(`Deleted category "${catName}"`);
  };

  // Shared font family resolver ensuring parity between preview and PDF
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

  const handleDeleteDomain = (domainId, domainTitle) => {
    const remaining = domains.filter(d => d.id !== domainId);
    setDomains(remaining);
    if (activeDomainId === domainId) {
      const fallbackDom = remaining[0] || null;
      setActiveDomainId(fallbackDom?.id || null);
      setActiveTopicId(fallbackDom?.topics?.[0]?.id || null);
    }
    showToast(`Deleted domain "${domainTitle}"`);
  };

  const handleDeleteTopic = (topicId, topicTitle) => {
    if (!activeDomain) return;
    const updatedTopics = activeDomain.topics.filter(t => t.id !== topicId);
    const updated = domains.map(d =>
      d.id === activeDomain.id ? { ...d, topics: updatedTopics } : d
    );
    setDomains(updated);
    if (activeTopicId === topicId) {
      setActiveTopicId(updatedTopics[0]?.id || null);
    }
    showToast(`Deleted topic "${topicTitle}"`);
  };

  const handleDeleteSection = (sectionId, sectionTitle) => {
    if (!activeDomain || !activeTopic) return;
    const updated = domains.map(d => {
      if (d.id === activeDomain.id) {
        return {
          ...d,
          topics: d.topics.map(t =>
            t.id === activeTopic.id
              ? { ...t, sections: t.sections.filter(s => s.id !== sectionId) }
              : t
          )
        };
      }
      return d;
    });
    setDomains(updated);
    showToast(`Deleted section "${sectionTitle}"`);
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

  const handleRemoveSubtopicFromDay = (subtopicId) => {
    const sub = findSubtopicById(subtopicId);
    const subTitle = sub ? sub.title : findSubtopicTitle(subtopicId);

    const updatedDayLogs = { ...dayLogs };
    Object.keys(updatedDayLogs).forEach((dateKey) => {
      const log = updatedDayLogs[dateKey];
      if (log) {
        updatedDayLogs[dateKey] = {
          ...log,
          plan: (log.plan || []).filter(p => p.subtopicId !== subtopicId && !p.title.includes(subTitle))
        };
      }
    });
    setDayLogs(updatedDayLogs);

    const updatedDomains = domains.map(d => ({
      ...d,
      topics: d.topics.map(t => ({
        ...t,
        sections: t.sections.map(s => ({
          ...s,
          subtopics: s.subtopics.map(item => (item.id === subtopicId ? { ...item, addedToDate: null } : item))
        }))
      }))
    }));
    setDomains(updatedDomains);
    setRescheduleSubtopic(null);
    showToast(`Removed "${subTitle}" from day plan`);
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
      version: 'omniswitch_v4',
      exportDate: new Date().toISOString(),
      domains,
      dayLogs,
      discoveredJobs,
      applications,
      hiringPortals,
      flashcards,
      resumeData,
      latexResumeCode,
      resumeVersions,
      savedSnippets,
      snippetFolders,
      bookmarks,
      bookmarkCategories
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
        if (parsed.latexResumeCode) setLatexResumeCode(parsed.latexResumeCode);
        if (parsed.resumeVersions) setResumeVersions(parsed.resumeVersions);
        if (parsed.savedSnippets) setSavedSnippets(parsed.savedSnippets);
        if (parsed.snippetFolders) setSnippetFolders(parsed.snippetFolders);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.bookmarkCategories) setBookmarkCategories(parsed.bookmarkCategories);
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

  const filteredSnippets = useMemo(() => {
    return savedSnippets.filter(s => {
      const folderMatch = selectedSnippetFolder === 'ALL' || (s.folder || 'General') === selectedSnippetFolder;
      const searchMatch = !snippetSearchQuery.trim() ||
        s.title.toLowerCase().includes(snippetSearchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(snippetSearchQuery.toLowerCase());
      return folderMatch && searchMatch;
    });
  }, [savedSnippets, selectedSnippetFolder, snippetSearchQuery]);

  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter(b => {
        const catMatch =
          selectedBookmarkCategory === 'ALL' ||
          (selectedBookmarkCategory === 'FAVORITES' ? b.favorite : (b.category || 'General Learning') === selectedBookmarkCategory);
        const q = bookmarkSearchQuery.trim().toLowerCase();
        const searchMatch =
          !q ||
          b.title.toLowerCase().includes(q) ||
          b.url.toLowerCase().includes(q) ||
          (b.notes || '').toLowerCase().includes(q) ||
          (b.category || '').toLowerCase().includes(q);
        return catMatch && searchMatch;
      })
      .sort((a, b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)));
  }, [bookmarks, selectedBookmarkCategory, bookmarkSearchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B0F17] text-stone-900 dark:text-stone-100 font-sans transition-colors duration-200">
      <style>{`
        .nav-horizontal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #a8a29e transparent;
        }
        .nav-horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .nav-horizontal-scroll::-webkit-scrollbar-track {
          background: rgba(120, 113, 108, 0.12);
          border-radius: 9999px;
        }
        .nav-horizontal-scroll::-webkit-scrollbar-thumb {
          background: rgba(120, 113, 108, 0.45);
          border-radius: 9999px;
        }
        .nav-horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 113, 108, 0.7);
        }
      `}</style>
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
              title="Import JSON data"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Import</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        </div>

        {/* Tab Navigation with Dedicated Horizontal Scrollbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-stone-100 dark:border-stone-800/70">
          <div className="nav-horizontal-scroll flex items-center space-x-2 overflow-x-auto pt-2 pb-2.5">
            {[
              { id: 'curriculum', label: 'Topics to Learn', icon: BookOpen },
              { id: 'queue', label: 'My Daily Plan & Queue', icon: CheckSquare },
              { id: 'calendar', label: 'Progress Calendar', icon: CalendarIcon },
              { id: 'applications', label: 'Applications Kanban', icon: KanbanIcon },
              { id: 'jobs', label: '24h India Job Radar', icon: Compass },
              { id: 'resume', label: 'Resume Maker', icon: FileText },
              { id: 'flashcards', label: 'Interview Prep', icon: Sparkles },
              { id: 'compiler', label: 'Java Playground', icon: Code },
              { id: 'sql', label: 'SQL Playground', icon: Database },
              { id: 'snippets', label: `Saved Snippets (${savedSnippets.length})`, icon: FolderOpen },
              { id: 'bookmarks', label: `Learning Bookmarks (${bookmarks.length})`, icon: Bookmark }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
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
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold leading-tight line-clamp-1">{dom.title}</h4>
                          <div className="flex items-center space-x-1.5 shrink-0">
                            <span className="text-[11px] font-mono text-stone-400">{pct}%</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDomain(dom.id, dom.title);
                              }}
                              className="p-1 text-stone-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                              title="Delete Domain"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
                  {activeDomain?.topics.length === 0 ? (
                    <span className="text-xs text-stone-400 px-2 py-1">No topics in this domain yet. Click "+ Add Topic" above.</span>
                  ) : (
                    activeDomain?.topics.map(top => {
                      const isSelected = top.id === activeTopic?.id;
                      return (
                        <div
                          key={top.id}
                          onClick={() => setActiveTopicId(top.id)}
                          className={`flex items-center space-x-1.5 pl-3.5 pr-2 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                              : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                          }`}
                        >
                          <span>{top.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTopic(top.id, top.title);
                            }}
                            className={`p-0.5 rounded-md transition ${
                              isSelected
                                ? 'text-stone-400 hover:text-rose-400 dark:text-stone-500 dark:hover:text-rose-600'
                                : 'text-stone-400 hover:text-rose-500'
                            }`}
                            title="Delete Topic"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                  )}
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

                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setModalAddSubtopicSectionId(section.id)}
                              className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Subtopic</span>
                            </button>
                            <button
                              onClick={() => handleDeleteSection(section.id, section.title)}
                              className="p-1 text-stone-400 hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                              title="Delete Section"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
                              placeholder="Enter subtopic name..."
                              className="flex-1 bg-white dark:bg-[#0B0F17] border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
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
                                      {hasNotionUrl && (
                                        <a
                                          href={sub.notionUrl.startsWith('http') ? sub.notionUrl : `https://${sub.notionUrl}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:underline shrink-0"
                                        >
                                          <LinkIcon className="w-2.5 h-2.5" />
                                          <span>Notion ↗</span>
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
                                    >
                                      <FileText className="w-3 h-3" />
                                      <span className="hidden sm:inline">{hasNotionUrl ? 'Notion / Notes' : '+ Notes'}</span>
                                    </button>

                                    {addedDate ? (
                                      <div className="flex items-center space-x-1">
                                        <button
                                          onClick={() => {
                                            setRescheduleSubtopic({ id: sub.id, title: sub.title, currentDate: addedDate });
                                            setRescheduleTargetDate(getOffsetDateString(1));
                                          }}
                                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 flex items-center gap-1 transition"
                                          title="Reschedule date"
                                        >
                                          <span>✓ {formatPrettyDate(addedDate)}</span>
                                          <Clock className="w-3 h-3 opacity-70" />
                                        </button>
                                        <button
                                          onClick={() => handleRemoveSubtopicFromDay(sub.id)}
                                          className="p-1 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                                          title="Unassign date"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleAddSubtopicToDay(sub)}
                                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg border bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 transition"
                                      >
                                        + Add to Day Plan
                                      </button>
                                    )}

                                    <button
                                      onClick={() => handleDeleteSubtopic(section.id, sub.id)}
                                      className="p-1 text-stone-400 hover:text-rose-500 transition"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {isNotesOpen && (
                                  <div className="ml-7 p-3 bg-stone-50 dark:bg-stone-900/70 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                                    <input
                                      type="url"
                                      value={sub.notionUrl || ''}
                                      onChange={(e) => handleUpdateSubtopicNotionAndNotes(sub.id, e.target.value, sub.notes || '')}
                                      placeholder="Notion / Resource URL..."
                                      className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1 text-xs font-mono"
                                    />
                                    <textarea
                                      rows={2}
                                      value={sub.notes || ''}
                                      onChange={(e) => handleUpdateSubtopicNotionAndNotes(sub.id, sub.notionUrl || '', e.target.value)}
                                      placeholder="Learning notes..."
                                      className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs"
                                    />
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
                  Tomorrow
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
                    placeholder="Write a custom goal..."
                    className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddCustomPlanTask(workingDate, dailyPlanInput)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-medium"
                  >
                    Add Task
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {currentPlan.length === 0 ? (
                    <div className="p-8 text-center text-stone-400 text-xs">
                      No tasks yet for this date.
                    </div>
                  ) : (
                    currentPlan.map(task => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border transition flex items-center justify-between ${
                          task.completed
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                            : 'bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div
                          onClick={() => handleTogglePlanTask(task.id, workingDate)}
                          className="flex items-center space-x-3 flex-1 cursor-pointer select-none"
                        >
                          <input type="checkbox" checked={task.completed} onChange={() => {}} className="w-4 h-4 rounded text-emerald-600" />
                          <span className={`text-xs ${task.completed ? 'line-through text-stone-400' : 'font-medium'}`}>
                            {task.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeletePlanTask(task.id, workingDate)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
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
                  placeholder="Record insights..."
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-xs leading-relaxed focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. PROGRESS CALENDAR */}
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
                  <span>Completed</span>
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
                    cells.push(<div key={`empty-${i}`} className="min-h-[95px] bg-stone-50/50 dark:bg-stone-900/20 rounded-xl" />);
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

                    cells.push(
                      <div
                        key={dateKey}
                        onClick={() => setSelectedCalendarDate(dateKey)}
                        className={`min-h-[95px] p-2 rounded-xl border flex flex-col justify-between cursor-pointer transition select-none ${
                          isSelected
                            ? 'ring-2 ring-stone-900 dark:ring-stone-100 bg-stone-50 dark:bg-stone-800/80 shadow-sm'
                            : 'bg-white dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/60 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-bold ${isToday ? 'px-1.5 py-0.5 rounded bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-500'}`}>
                            {day}
                          </span>
                          <span className="text-xs">{active ? '✅' : isPast ? '❌' : '--'}</span>
                        </div>

                        <div className="space-y-1 my-1">
                          {appEvents.slice(0, 2).map((evt, idx) => (
                            <div key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-mono truncate border bg-purple-500/10 text-purple-500">
                              {evt.company}
                            </div>
                          ))}
                          {completedTasksCount > 0 && (
                            <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded truncate">
                              ✓ {completedTasksCount} task{completedTasksCount > 1 ? 's' : ''}
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
          </div>
        )}

        {/* 4. APPLICATIONS KANBAN */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Job Applications Pipeline</h3>
              <p className="text-xs text-stone-500">Track applications across rounds and sync stage changes to your calendar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {KANBAN_STAGES.map(stage => {
                const stageApps = applications.filter(a => a.stage === stage.id);
                return (
                  <div key={stage.id} className="bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800/80 p-3 flex flex-col min-h-[420px]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center space-x-1.5">
                        <span>{stage.icon}</span>
                        <h4 className="text-xs font-bold font-mono uppercase text-stone-700 dark:text-stone-300">{stage.label}</h4>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">{stageApps.length}</span>
                    </div>

                    <div className="space-y-2 flex-1">
                      {stageApps.map(app => (
                        <div key={app.id} className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-stone-900 dark:text-stone-100">{app.company}</span>
                            <button onClick={() => handleDeleteApplication(app.id)} className="text-stone-400 hover:text-rose-500 p-0.5">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-stone-600 dark:text-stone-400 line-clamp-1">{app.role}</p>
                          <select
                            value={app.stage}
                            onChange={(e) => openStageTransitionModal(app, e.target.value)}
                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-lg p-1 text-[11px]"
                          >
                            {KANBAN_STAGES.map(s => (
                              <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                          </select>
                        </div>
                      ))}
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
                  <p className="text-xs text-stone-500 mt-0.5">Open portals pre-filtered for 1–3 YOE roles in India and bookmark openings.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalAddPortalOpen(true)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>+ Add Portal</span>
                  </button>
                  <button
                    onClick={() => setModalAddJobOpen(true)}
                    className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-medium flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Job Link</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {hiringPortals.map((portal, idx) => (
                  <div key={idx} className="p-3.5 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-xl flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <div className="flex items-center space-x-2">
                        <a href={portal.url} target="_blank" rel="noopener noreferrer" className="font-bold text-xs text-stone-900 dark:text-stone-100 hover:underline">
                          {portal.name}
                        </a>
                        <span className="text-[10px] font-mono px-1.5 rounded bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                          {portal.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">{portal.desc}</p>
                    </div>
                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="p-1 text-stone-400 hover:text-stone-900">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {discoveredJobs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {discoveredJobs.map(job => (
                  <div key={job.id} className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{job.company}</span>
                        <button onClick={() => handleDeleteDiscoveredJob(job.id)} className="text-stone-400 hover:text-rose-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">{job.role}</p>
                    </div>
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="underline">View Link</a>
                      <button
                        onClick={() => handleApplyAndMoveToKanban(job)}
                        className="px-3 py-1 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg font-medium"
                      >
                        Apply & Kanban &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. LATEX ATS RESUME STUDIO & VERSION VAULT */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            {/* Compact Top Action Bar */}
            <div className="bg-white dark:bg-[#121824] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">LaTeX ATS Resume Studio &amp; Version Vault</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                    Live LaTeX &rarr; A4 Renderer
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Paste or edit your LaTeX resume code on the left to preview the rendered A4 sheet on the right and store tailored versions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={handleUpdateCurrentResumeVersion}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5 transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Current</span>
                </button>

                <button
                  onClick={() => {
                    setNewResumeVersionName('');
                    setNewResumeVersionRole('');
                    setShowSaveResumeVersionModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save as New Version</span>
                </button>

                <button
                  onClick={handleDownloadTexFile}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium flex items-center gap-1 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.tex</span>
                </button>

                <button
                  onClick={handlePrintResume}
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export / Print PDF</span>
                </button>
              </div>
            </div>

            {/* Interactive 9-Category 100-Point ATS Evaluation & JD Matcher */}
            <div className="bg-white dark:bg-[#121824] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-extrabold border-2 ${
                      atsAnalysis.totalScore >= 80
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : atsAnalysis.totalScore >= 60
                        ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400'
                        : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    <span className="text-lg leading-none">{atsAnalysis.totalScore}</span>
                    <span className="text-[9px] uppercase tracking-wider opacity-80">/ 100</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                        ATS Resume Evaluation &amp; Job Match Report
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          atsAnalysis.totalScore >= 80
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : atsAnalysis.totalScore >= 60
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {atsAnalysis.scoreBand.label} ({atsAnalysis.totalScore}/100)
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      9-Category Weighted Model • {atsAnalysis.wordCount} words • {atsAnalysis.metricCount} quantified metrics • Separates ATS Compatibility from Job Fit
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAtsPanel(!showAtsPanel)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 self-start sm:self-auto"
                >
                  {showAtsPanel ? 'Hide Evaluation Report' : 'Show Evaluation Report'}
                </button>
              </div>

              {/* 8 Separate Dimension Sub-Scores Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {atsAnalysis.subScores.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 text-center"
                  >
                    <span className="text-[10px] text-stone-500 block truncate">{sub.label}</span>
                    <span
                      className={`text-xs font-mono font-extrabold ${
                        sub.value >= 80
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : sub.value >= 60
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {sub.value}%
                    </span>
                  </div>
                ))}
              </div>

              {showAtsPanel && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3 border-t border-stone-100 dark:border-stone-800">
                  {/* Left 7 Cols: 9-Category Weighted Breakdown (100 Points) */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        9-Category Weighted Scoring Breakdown (100 Points)
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">90–100 Excellent • 80–89 Very Good • 70–79 Good</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {atsAnalysis.categories.map((cat, idx) => {
                        const pct = Math.round((cat.earned / cat.max) * 100);
                        return (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800 space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-stone-800 dark:text-stone-100">{cat.name}</span>
                              <span
                                className={`font-mono text-[11px] font-extrabold ${
                                  pct >= 80
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : pct >= 60
                                    ? 'text-amber-600 dark:text-amber-400'
                                    : 'text-rose-600 dark:text-rose-400'
                                }`}
                              >
                                {cat.earned}/{cat.max}
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-stone-500 truncate" title={cat.detail}>
                              {cat.detail}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right 5 Cols: Job Description Analyzer & Improvement Suggestions */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          Job Description Analyzer (Paste Target JD)
                        </label>
                        {targetJobDescription && (
                          <button
                            onClick={() => setTargetJobDescription('')}
                            className="text-[11px] text-rose-500 hover:underline"
                          >
                            Clear JD
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={4}
                        value={targetJobDescription}
                        onChange={(e) => setTargetJobDescription(e.target.value)}
                        placeholder="Paste the job description here (Workday, Greenhouse, Lever, LinkedIn, Naukri) to score keyword matching, technical skills, and missing terms..."
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
                          Matched ({atsAnalysis.matchedKeywords.length}):
                        </span>
                        {atsAnalysis.matchedKeywords.slice(0, 12).map(kw => (
                          <span
                            key={kw}
                            className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {atsAnalysis.missingKeywords.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="font-semibold text-rose-600 dark:text-rose-400 mr-1">
                            Missing ({atsAnalysis.missingKeywords.length}):
                          </span>
                          {atsAnalysis.missingKeywords.slice(0, 10).map(kw => (
                            <span
                              key={kw}
                              className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-mono"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {atsAnalysis.suggestions.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                          <span className="font-bold text-amber-700 dark:text-amber-300 block">
                            Improvement Suggestions:
                          </span>
                          {atsAnalysis.suggestions.map((sug, sIdx) => (
                            <p key={sIdx} className="text-stone-700 dark:text-stone-300 text-[11px]">
                              • {sug}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Split Pane: Left LaTeX Code Editor | Right Live Rendered A4 Paper */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left 5 Cols: Scrollable LaTeX Code IDE */}
              <div className="xl:col-span-5 flex flex-col h-[780px] bg-[#161B26] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono shrink-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">resume.tex</span>
                    <span className="text-[11px] text-stone-400">{latexResumeCode.split('\n').length} lines</span>
                  </div>
                  <button
                    onClick={() => {
                      setLatexResumeCode(DEFAULT_LATEX_RESUME);
                      showToast('Loaded default 10pt LaTeX resume');
                    }}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Default Template</span>
                  </button>
                </div>

                <textarea
                  value={latexResumeCode}
                  onChange={(e) => setLatexResumeCode(e.target.value)}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="flex-1 w-full p-4 font-mono text-xs leading-relaxed bg-[#161B26] text-stone-100 resize-none focus:outline-none overflow-auto whitespace-pre"
                  placeholder="% Paste your complete LaTeX resume code here..."
                />

                <div className="px-4 py-1.5 bg-stone-100/90 dark:bg-[#151D2C] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 font-mono shrink-0">
                  <span>Supports \section, \textbf, \textit, \href, \hfill, itemize</span>
                  <span>{parsedLatexResume.basePt}pt A4</span>
                </div>
              </div>

              {/* Right 7 Cols: Live Rendered A4 Paper Sheet */}
              <div className="xl:col-span-7 flex flex-col items-center">
                <div className="w-full max-w-[794px] flex items-center justify-between pb-2 px-1 text-xs text-stone-500 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live Rendered A4 Sheet ({parsedLatexResume.basePt}pt Computer Modern)</span>
                  </span>
                  <span>
                    Margins: {parsedLatexResume.margins.top} / {parsedLatexResume.margins.left}
                  </span>
                </div>

                <div className="w-full overflow-x-auto flex justify-center pb-2">
                  <div
                    id="resume-printable-document"
                    className="w-full max-w-[794px] min-h-[1123px] bg-white text-black shadow-2xl border border-stone-300"
                    style={{
                      fontFamily: "'Computer Modern Serif', 'Latin Modern Roman', 'CMU Serif', 'Tinos', 'Times New Roman', serif",
                      fontSize: `${parsedLatexResume.basePt}pt`,
                      lineHeight: 1.24,
                      paddingTop: parsedLatexResume.margins.top,
                      paddingBottom: parsedLatexResume.margins.bottom,
                      paddingLeft: parsedLatexResume.margins.left,
                      paddingRight: parsedLatexResume.margins.right
                    }}
                  >
                    {parsedLatexResume.blocks}
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Stored Resume Versions Vault Below the Editor & Preview */}
            <div className="bg-white dark:bg-[#121824] p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      Stored Resume Versions Vault ({resumeVersions.length})
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Manage role-specific versions of your resume (Backend, Cloud, Applied AI). Click any card to load it into the LaTeX editor above.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setNewResumeVersionName('');
                    setNewResumeVersionRole('');
                    setShowSaveResumeVersionModal(true);
                  }}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Current as New Version</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeVersions.map(ver => {
                  const isSelected = ver.id === activeResumeVersionId;
                  const lineCount = (ver.latexCode || '').split('\n').length;
                  return (
                    <div
                      key={ver.id}
                      onClick={() => handleLoadResumeVersion(ver)}
                      className={`group rounded-2xl border p-4 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-md ring-2 ring-stone-900/20 dark:ring-stone-100/30'
                          : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-sm'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isSelected ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-white">
                                ACTIVE IN EDITOR
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                                SAVED VERSION
                              </span>
                            )}
                            <span className={`text-[10px] font-mono ${isSelected ? 'opacity-70' : 'text-stone-400'}`}>
                              {lineCount} lines
                            </span>
                          </div>

                          {resumeVersions.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteResumeVersion(ver.id);
                              }}
                              className={`p-1 rounded-lg transition ${
                                isSelected
                                  ? 'hover:bg-white/20 text-stone-300 dark:text-stone-600'
                                  : 'text-stone-400 hover:text-rose-500 hover:bg-rose-500/10'
                              }`}
                              title="Delete version"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-sm leading-snug">{ver.name}</h4>
                          <p className={`text-xs mt-0.5 ${isSelected ? 'opacity-80' : 'text-stone-500 dark:text-stone-400'}`}>
                            {ver.targetRole}
                          </p>
                        </div>
                      </div>

                      <div className={`pt-2.5 border-t flex items-center justify-between text-[11px] font-mono ${
                        isSelected
                          ? 'border-white/15 dark:border-black/15'
                          : 'border-stone-200/80 dark:border-stone-800'
                      }`}>
                        <span className={isSelected ? 'opacity-75' : 'text-stone-400'}>
                          {ver.updatedAt}
                        </span>
                        <span className={`font-semibold flex items-center gap-1 ${
                          isSelected
                            ? 'text-emerald-300 dark:text-emerald-700'
                            : 'text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform'
                        }`}>
                          <span>{isSelected ? 'Editing Now' : 'Load in Editor'}</span>
                          {!isSelected && <ChevronRight className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 7. INTERVIEW PREP FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Interview Prep Flashcards</span>
                </h2>
                <p className="text-xs text-stone-500">Click any card to flip and reveal the technical deep-dive answer.</p>
              </div>
              <button
                onClick={() => setModalAddFlashcardOpen(true)}
                className="px-3.5 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-semibold"
              >
                + Add Flashcard
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFlashcards.map(card => {
                const isFlipped = Boolean(flippedCards[card.id]);
                return (
                  <div
                    key={card.id}
                    onClick={() => handleToggleFlipCard(card.id)}
                    className={`min-h-[260px] rounded-2xl p-5 border flex flex-col justify-between cursor-pointer transition shadow-sm ${
                      isFlipped
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'bg-white dark:bg-[#121824] border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span>{card.domain}</span>
                      <span>{card.difficulty}</span>
                    </div>
                    <div className="my-auto py-3">
                      {!isFlipped ? (
                        <h4 className="text-sm font-bold leading-snug">{card.question}</h4>
                      ) : (
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{card.answer}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/20 text-[11px]" onClick={(e) => e.stopPropagation()}>
                      <span className="opacity-70">{isFlipped ? 'Answer' : 'Click to flip'}</span>
                      <button
                        onClick={() => handleUpdateFlashcardStatus(card.id, card.status === 'mastered' ? 'review' : 'mastered')}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold"
                      >
                        {card.status === 'mastered' ? 'Mastered ✅' : 'Mark Mastered'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. JAVA PLAYGROUND & VISUAL DATA STRUCTURE DEBUGGER */}
        {activeTab === 'compiler' && (
          <div className="space-y-5">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">Java Playground &amp; Visual Debugger</h2>
                    <p className="text-xs text-stone-500">Step through code line-by-line to inspect Stack, Heap, Arrays, LinkedLists, Trees, Graphs, Heaps, Stacks &amp; Queues</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <select
                    value={javaFontSize}
                    onChange={(e) => setJavaFontSize(Number(e.target.value))}
                    className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1.5 font-mono"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                  </select>

                  <button
                    onClick={handleFormatJavaCode}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium flex items-center gap-1"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Format</span>
                  </button>

                  <button
                    onClick={() => {
                      setSavingSnippetLanguage('java');
                      setNewSnippetTitle('');
                      setShowSaveSnippetModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Save to Folder</span>
                  </button>

                  <button
                    onClick={runJavaCode}
                    disabled={isJavaRunning}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    {isJavaRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isJavaRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Data Structure Presets Bar */}
              <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-semibold text-stone-400 mr-1">Visualize DS Example:</span>
                {[
                  {
                    label: 'Linked List (Full Operations)',
                    code: `class Node {\n    int data;\n    Node next;\n\n    Node(int data) {\n        this.data = data;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    Node head;\n\n    public void insert(int data) {\n        Node newNode = new Node(data);\n        if (head == null) {\n            head = newNode;\n            return;\n        }\n        Node temp = head;\n        while (temp.next != null) {\n            temp = temp.next;\n        }\n        temp.next = newNode;\n    }\n\n    public boolean search(int value) {\n        Node temp = head;\n        while (temp != null) {\n            if (temp.data == value) {\n                return true;\n            }\n            temp = temp.next;\n        }\n        return false;\n    }\n\n    public void delete(int value) {\n        if (head == null) {\n            return;\n        }\n        if (head.data == value) {\n            head = head.next;\n            return;\n        }\n        Node temp = head;\n        while (temp.next != null && temp.next.data != value) {\n            temp = temp.next;\n        }\n        if (temp.next != null) {\n            temp.next = temp.next.next;\n        }\n    }\n\n    public void display() {\n        Node temp = head;\n        while (temp != null) {\n            System.out.print(temp.data + " -> ");\n            temp = temp.next;\n        }\n        System.out.println("null");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        LinkedList list = new LinkedList();\n        list.insert(10);\n        list.insert(20);\n        list.insert(30);\n        list.insert(40);\n        list.display();\n\n        System.out.println("Search 30: " + list.search(30));\n        list.delete(20);\n        list.display();\n    }\n}`
                  },
                  {
                    label: 'Array',
                    code: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 25, 7, 42, 18};\n        arr[2] = 99;\n        int sum = 0;\n        for (int i = 0; i < arr.length; i++) {\n            sum = sum + arr[i];\n        }\n        System.out.println("Sum: " + sum);\n    }\n}`
                  },
                  {
                    label: 'Stack & Queue',
                    code: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Stack<Integer> stack = new Stack<>();\n        stack.push(10);\n        stack.push(20);\n        stack.push(30);\n        stack.pop();\n\n        Queue<String> queue = new LinkedList<>();\n        queue.offer("Task-1");\n        queue.offer("Task-2");\n        queue.poll();\n    }\n}`
                  },
                  {
                    label: 'Binary Tree',
                    code: `class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) {\n        this.val = val;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(50);\n        root.left = new TreeNode(30);\n        root.right = new TreeNode(70);\n        root.left.left = new TreeNode(20);\n        root.left.right = new TreeNode(40);\n        root.right.left = new TreeNode(60);\n    }\n}`
                  },
                  {
                    label: 'Graph',
                    code: `import java.util.*;\n\nclass Graph {\n    int vertices;\n    ArrayList<ArrayList<Integer>> adjList;\n    Graph(int vertices) {\n        this.vertices = vertices;\n        adjList = new ArrayList<>();\n        for (int i = 0; i < vertices; i++) {\n            adjList.add(new ArrayList<>());\n        }\n    }\n    public void addEdge(int src, int dest) {\n        adjList.get(src).add(dest);\n        adjList.get(dest).add(src);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Graph graph = new Graph(5);\n        graph.addEdge(0, 1);\n        graph.addEdge(0, 2);\n        graph.addEdge(1, 3);\n        graph.addEdge(1, 4);\n        graph.addEdge(2, 4);\n    }\n}`
                  },
                  {
                    label: 'Min / Max Heap',
                    code: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        minHeap.offer(40);\n        minHeap.offer(15);\n        minHeap.offer(30);\n        minHeap.offer(5);\n        minHeap.poll();\n    }\n}`
                  }
                ].map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setJavaCode(preset.code);
                      setJavaRightPanelMode('visualizer');
                      setVizStepIndex(0);
                      showToast(`Loaded ${preset.label} visualization`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-500/15 dark:bg-stone-800/80 dark:hover:bg-amber-500/20 text-stone-700 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-300 border border-stone-200 dark:border-stone-700 font-medium transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Split Pane: Left Scrollable Editor | Right Scrollable Step Visualizer & Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* LEFT 7 COLS: FIXED-HEIGHT SCROLLABLE LINE-HIGHLIGHTED EDITOR */}
              <div className="lg:col-span-7 flex flex-col h-[620px] bg-[#161B26] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono shrink-0">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Main.java</span>
                    <span className="text-[11px] text-stone-400">{javaCode.split('\n').length} lines</span>
                    {matchedBracketInfo && (
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold">
                        {matchedBracketInfo.openChar} Line {matchedBracketInfo.openLine} ↔ {matchedBracketInfo.closeChar} Line {matchedBracketInfo.closeLine}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setJavaCode(BASIC_JAVA_TEMPLATE);
                      setMatchedBracketInfo(null);
                      showToast('Reset to starter Main.java');
                    }}
                    className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="relative flex flex-1 min-h-0 bg-[#161B26] text-stone-100 overflow-hidden">
                  <div
                    ref={javaLineNumbersRef}
                    aria-hidden="true"
                    style={{ fontSize: `${javaFontSize}px`, lineHeight: '1.6' }}
                    className="w-12 py-4 px-2 text-right font-mono select-none overflow-hidden bg-[#10141D] text-stone-500 border-r border-stone-800 shrink-0"
                  >
                    {Array.from({ length: javaCode.split('\n').length }, (_, idx) => {
                      const lineNum = idx + 1;
                      const isActiveLine = javaRightPanelMode === 'visualizer' && currentTraceFrame?.line === lineNum;
                      const isBracketLine = matchedBracketInfo && (matchedBracketInfo.openLine === lineNum || matchedBracketInfo.closeLine === lineNum);
                      return (
                        <div
                          key={idx}
                          className={
                            isActiveLine
                              ? 'text-amber-400 font-bold bg-amber-500/25 rounded px-0.5 transition-colors'
                              : isBracketLine
                              ? 'text-cyan-300 font-bold bg-cyan-500/20 rounded px-0.5 transition-colors'
                              : ''
                          }
                        >
                          {isActiveLine ? `▶${lineNum}` : lineNum}
                        </div>
                      );
                    })}
                  </div>

                  {/* Synchronized Active Line & Bracket Match Highlight Overlay + Editable Code Textarea */}
                  <div className="relative flex-1 overflow-hidden">
                    <div
                      ref={javaHighlightOverlayRef}
                      aria-hidden="true"
                      style={{ fontSize: `${javaFontSize}px`, lineHeight: '1.6' }}
                      className="pointer-events-none absolute inset-0 py-4 font-mono overflow-hidden"
                    >
                      {Array.from({ length: javaCode.split('\n').length }, (_, idx) => {
                        const lineNum = idx + 1;
                        const isActiveLine = javaRightPanelMode === 'visualizer' && currentTraceFrame?.line === lineNum;
                        const isBracketLine = matchedBracketInfo && (matchedBracketInfo.openLine === lineNum || matchedBracketInfo.closeLine === lineNum);
                        return (
                          <div
                            key={idx}
                            className={`w-full transition-colors duration-150 ${
                              isActiveLine
                                ? 'bg-amber-400/20 border-l-4 border-amber-400'
                                : isBracketLine
                                ? 'bg-cyan-400/15 border-l-4 border-cyan-400'
                                : 'border-l-4 border-transparent'
                            }`}
                          >
                            &nbsp;
                          </div>
                        );
                      })}
                    </div>

                    <textarea
                      ref={javaTextareaRef}
                      value={javaCode}
                      onChange={(e) => {
                        setJavaCode(e.target.value);
                        updateMatchedBracketAtCursor(e.target.selectionStart, e.target.value);
                      }}
                      onClick={(e) => updateMatchedBracketAtCursor(e.target.selectionStart)}
                      onKeyUp={(e) => updateMatchedBracketAtCursor(e.target.selectionStart)}
                      onScroll={handleJavaEditorScroll}
                      onKeyDown={handleEditorKeyDown}
                      spellCheck={false}
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      style={{ fontSize: `${javaFontSize}px`, lineHeight: '1.6', tabSize: 4 }}
                      className="relative z-10 w-full h-full p-4 font-mono bg-transparent text-stone-100 resize-none focus:outline-none overflow-auto whitespace-pre"
                      placeholder="// Write your Java code here (public class Main)..."
                    />
                  </div>
                </div>

                {/* Editor Footer */}
                <div className="px-4 py-1.5 bg-stone-100/90 dark:bg-[#151D2C] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 font-mono shrink-0">
                  <span>Click any bracket {"{ } ( ) [ ]"} to match • Tab / Shift+Tab</span>
                  <span>Entry point: public class Main</span>
                </div>
              </div>

              {/* RIGHT 5 COLS: FIXED-HEIGHT SCROLLABLE VISUALIZER & CONSOLE */}
              <div className="lg:col-span-5 flex flex-col h-[620px] bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                {/* Mode Switcher Tabs */}
                <div className="px-3.5 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setJavaRightPanelMode('visualizer')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        javaRightPanelMode === 'visualizer'
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                      }`}
                    >
                      Step Visualizer &amp; DS
                    </button>
                    <button
                      onClick={() => setJavaRightPanelMode('console')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        javaRightPanelMode === 'console'
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                      }`}
                    >
                      Run &amp; Stdin Console
                    </button>
                  </div>

                  {javaRightPanelMode === 'visualizer' && executionTrace.length > 0 && (
                    <span className="text-[11px] font-mono text-stone-500">
                      Step {Math.min(vizStepIndex + 1, executionTrace.length)} / {executionTrace.length}
                    </span>
                  )}
                </div>

                {javaRightPanelMode === 'visualizer' ? (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Step-Through Debugger Transport Controls */}
                    <div className="px-3.5 py-2 bg-amber-50/70 dark:bg-amber-950/20 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => {
                            setIsVizPlaying(false);
                            setVizStepIndex(0);
                          }}
                          className="px-2 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:bg-stone-100"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            setIsVizPlaying(false);
                            setVizStepIndex(prev => Math.max(0, prev - 1));
                          }}
                          disabled={vizStepIndex <= 0}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 disabled:opacity-40"
                        >
                          ◀ Prev
                        </button>
                        <button
                          onClick={() => setIsVizPlaying(prev => !prev)}
                          disabled={Boolean(currentTraceFrame?.waitingForInput)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 disabled:opacity-40"
                        >
                          {isVizPlaying ? 'Pause' : 'Auto-Play'}
                        </button>
                        <button
                          onClick={() => {
                            setIsVizPlaying(false);
                            setVizStepIndex(prev => Math.min(executionTrace.length - 1, prev + 1));
                          }}
                          disabled={vizStepIndex >= executionTrace.length - 1 || Boolean(currentTraceFrame?.waitingForInput)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 disabled:opacity-40"
                        >
                          Next ▶
                        </button>
                      </div>

                      {currentTraceFrame && (
                        <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300">
                          Line {currentTraceFrame.line}
                        </span>
                      )}
                    </div>

                    {!currentTraceFrame ? (
                      <div className="flex-1 flex items-center justify-center p-6 text-xs text-stone-400 text-center">
                        Write Java code on the left to inspect variables, pointers, and data structures step by step.
                      </div>
                    ) : (
                      <div className="flex-1 overflow-auto p-3.5 space-y-3.5 text-xs font-mono">
                        {/* Active Step Explanation Banner */}
                        <div className="p-2.5 rounded-xl bg-stone-100/90 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                          <div className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                            {currentTraceFrame.eventType || 'EXECUTION STEP'}
                          </div>
                          <div className="text-xs font-semibold text-stone-800 dark:text-stone-100 mt-0.5 font-sans">
                            {currentTraceFrame.explanation}
                          </div>
                        </div>

                        {/* Stack Variables Frame */}
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Stack Frame ({currentTraceFrame.activeMethod || 'main'})
                          </div>
                          {(!currentTraceFrame.stackVars || currentTraceFrame.stackVars.length === 0) ? (
                            <div className="text-[11px] text-stone-400 italic px-2 py-1">No local variables in scope</div>
                          ) : (
                            <div className="grid grid-cols-2 gap-1.5">
                              {currentTraceFrame.stackVars.map((sv, idx) => (
                                <div
                                  key={idx}
                                  className="px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-center justify-between"
                                >
                                  <div className="truncate">
                                    <span className="text-[10px] text-stone-400 block">{sv.type}</span>
                                    <span className="font-bold text-stone-900 dark:text-stone-100">{sv.name}</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-[11px] ml-2 truncate">
                                    {String(sv.value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Heap Objects & Data Structure Internals */}
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Heap Memory &amp; Data Structures ({(currentTraceFrame.heapObjects || []).length})
                          </div>

                          {(!currentTraceFrame.heapObjects || currentTraceFrame.heapObjects.length === 0) ? (
                            <div className="text-[11px] text-stone-400 italic px-2 py-1">No heap objects or data structures allocated yet</div>
                          ) : (
                            <div className="space-y-2.5">
                              {(() => {
                            // Hide internal helper objects owned by Graph, LinkedList, or non-root Tree nodes so each structure renders cleanly once
                            const ownedAddrs = new Set();
                            const allHeap = currentTraceFrame.heapObjects || [];
                            allHeap.forEach(obj => {
                              if (obj.dsType === 'GRAPH' && obj.fields) {
                                Object.values(obj.fields).forEach(val => {
                                  if (typeof val === 'string' && val.startsWith('0x')) {
                                    ownedAddrs.add(val);
                                    const outer = allHeap.find(h => h.addr === val);
                                    if (outer && outer.items) {
                                      outer.items.forEach(it => {
                                        if (it.pointsTo) ownedAddrs.add(it.pointsTo);
                                      });
                                    }
                                  }
                                });
                              }
                              if (obj.dsType === 'LINKED_LIST' && obj.nodes) {
                                obj.nodes.forEach(n => {
                                  if (n.addr) ownedAddrs.add(n.addr);
                                });
                              }
                              if (obj.dsType === 'TREE' && obj.fields) {
                                if (typeof obj.fields.left === 'string' && obj.fields.left.startsWith('0x')) ownedAddrs.add(obj.fields.left);
                                if (typeof obj.fields.right === 'string' && obj.fields.right.startsWith('0x')) ownedAddrs.add(obj.fields.right);
                              }
                            });
                            return allHeap.filter(ho => !ownedAddrs.has(ho.addr));
                          })().map(ho => (
                                <div
                                  key={ho.addr}
                                  className={`p-3 rounded-xl border space-y-2 ${
                                    ho.status === 'GC_ELIGIBLE'
                                      ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/60 opacity-75'
                                      : 'bg-stone-50/80 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800'
                                  }`}
                                >
                                  <div className="flex items-center justify-between border-b border-stone-200/70 dark:border-stone-800 pb-1">
                                    <span className="font-bold text-stone-900 dark:text-stone-100 text-[11px]">{ho.className}</span>
                                    <span className="text-[10px] text-stone-400">{ho.addr}</span>
                                  </div>

                                  {ho.dsType === 'LINKED_LIST' ? (
                                    <div className="py-2 space-y-2.5 overflow-x-auto">
                                      {(!ho.nodes || ho.nodes.length === 0) ? (
                                        <div className="text-[10px] text-stone-400 italic text-center py-3">head → null (Empty LinkedList)</div>
                                      ) : (
                                        <>
                                          <div className="flex items-end gap-2 px-1 pt-4 pb-2 overflow-x-auto">
                                            {ho.nodes.map((node, nIdx) => {
                                              const isHead = nIdx === 0;
                                              const isTail = nIdx === ho.nodes.length - 1;
                                              const extraPointers = (node.pointers || []).filter(p => p !== 'head');
                                              return (
                                                <React.Fragment key={node.addr || nIdx}>
                                                  <div className="flex flex-col items-center shrink-0">
                                                    {/* Top Role / Pointer Badges (HEAD, TAIL, temp) */}
                                                    <div className="flex items-center gap-1 mb-1 min-h-[16px]">
                                                      {isHead && (
                                                        <span className="text-[9px] font-extrabold tracking-wider uppercase text-emerald-500">
                                                          HEAD
                                                        </span>
                                                      )}
                                                      {isTail && !isHead && (
                                                        <span className="text-[9px] font-extrabold tracking-wider uppercase text-sky-400">
                                                          TAIL
                                                        </span>
                                                      )}
                                                      {extraPointers.map(ptr => (
                                                        <span
                                                          key={ptr}
                                                          className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 text-[9px] font-bold"
                                                        >
                                                          {ptr}
                                                        </span>
                                                      ))}
                                                    </div>

                                                    {/* Split [ data | next-ptr ] Node Box */}
                                                    <div
                                                      className={`flex items-stretch rounded-xl border-2 overflow-hidden shadow-sm transition-all ${
                                                        extraPointers.length > 0
                                                          ? 'border-amber-500 bg-amber-500/10'
                                                          : isHead
                                                          ? 'border-emerald-500 bg-emerald-500/15'
                                                          : isTail
                                                          ? 'border-sky-500 bg-sky-500/15'
                                                          : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900'
                                                      }`}
                                                    >
                                                      <div className="px-3 py-2 font-bold text-xs flex items-center justify-center min-w-[38px] text-stone-900 dark:text-stone-100">
                                                        {node.data}
                                                      </div>
                                                      <div
                                                        className={`px-2 py-2 border-l flex items-center justify-center text-[10px] font-bold ${
                                                          isHead
                                                            ? 'border-emerald-500/40 text-emerald-500'
                                                            : isTail
                                                            ? 'border-sky-500/40 text-sky-400'
                                                            : 'border-stone-200 dark:border-stone-700 text-stone-400'
                                                        }`}
                                                        title={isTail ? 'next → null' : `next → ${ho.nodes[nIdx + 1]?.addr}`}
                                                      >
                                                        {isTail ? '∅' : '●'}
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {!isTail && (
                                                    <span className="text-stone-400 font-bold text-sm pb-2.5 shrink-0">→</span>
                                                  )}
                                                </React.Fragment>
                                              );
                                            })}
                                          </div>

                                          {/* Bottom LinkedList Metrics Strip (Size, Head, Tail) */}
                                          <div className="grid grid-cols-3 gap-2 pt-1">
                                            <div className="p-2 rounded-lg bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 text-center">
                                              <span className="text-[9px] text-stone-400 uppercase block">Size</span>
                                              <span className="text-xs font-bold text-stone-800 dark:text-stone-100">{ho.nodes.length}</span>
                                            </div>
                                            <div className="p-2 rounded-lg bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 text-center">
                                              <span className="text-[9px] text-stone-400 uppercase block">Head</span>
                                              <span className="text-xs font-bold text-emerald-500">{ho.nodes[0]?.data ?? 'null'}</span>
                                            </div>
                                            <div className="p-2 rounded-lg bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 text-center">
                                              <span className="text-[9px] text-stone-400 uppercase block">Tail</span>
                                              <span className="text-xs font-bold text-sky-400">{ho.nodes[ho.nodes.length - 1]?.data ?? 'null'}</span>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ) : ho.dsType === 'TREE' ? (
                                    <div className="py-2 overflow-x-auto">
                                      {(() => {
                                        const renderTreeNode = (node) => {
                                          if (!node) return null;
                                          const isNew = node.highlight === 'NEW';
                                          return (
                                            <div className="flex flex-col items-center">
                                              <div
                                                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                                                  isNew
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                                    : 'bg-indigo-500/15 border-indigo-400 text-indigo-800 dark:text-indigo-200'
                                                }`}
                                              >
                                                {node.val}
                                              </div>
                                              {(node.left || node.right) && (
                                                <div className="flex items-start gap-4 mt-2 pt-2 border-t border-dashed border-indigo-300 dark:border-indigo-700">
                                                  <div className="flex flex-col items-center">
                                                    <span className="text-[9px] text-stone-400 mb-0.5">L</span>
                                                    {node.left ? renderTreeNode(node.left) : <span className="text-[9px] text-stone-400 italic">null</span>}
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                    <span className="text-[9px] text-stone-400 mb-0.5">R</span>
                                                    {node.right ? renderTreeNode(node.right) : <span className="text-[9px] text-stone-400 italic">null</span>}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        };
                                        return renderTreeNode(ho.root);
                                      })()}
                                    </div>
                                  ) : ho.dsType === 'GRAPH' ? (
                                    <div className="space-y-2 py-1">
                                      {Object.keys(ho.adj || {}).length === 0 ? (
                                        <div className="text-[10px] text-stone-400 italic text-center py-2">
                                          No vertices/edges added yet
                                        </div>
                                      ) : (
                                        <div className="space-y-2">
                                          {(() => {
                                            const vertices = Object.keys(ho.adj);
                                            const n = vertices.length;
                                            const positions = {};

                                            // Compute BFS depth layers from the root/first vertex so edges flow cleanly without crossing
                                            const layers = [];
                                            const visitedLayout = new Set();
                                            if (n > 0) {
                                              let currentLayer = [vertices[0]];
                                              visitedLayout.add(vertices[0]);
                                              while (currentLayer.length > 0) {
                                                layers.push(currentLayer);
                                                const nextLayer = [];
                                                currentLayer.forEach(u => {
                                                  (ho.adj[u] || []).forEach(v => {
                                                    if (vertices.includes(v) && !visitedLayout.has(v)) {
                                                      visitedLayout.add(v);
                                                      nextLayer.push(v);
                                                    }
                                                  });
                                                });
                                                currentLayer = nextLayer;
                                              }
                                              // Add any disconnected vertices to a final row
                                              const remaining = vertices.filter(v => !visitedLayout.has(v));
                                              if (remaining.length > 0) layers.push(remaining);
                                            }

                                            const width = 280;
                                            const height = 190;
                                            const yStep = layers.length > 1 ? (height - 56) / (layers.length - 1) : 0;

                                            layers.forEach((layerNodes, lIdx) => {
                                              const y = layers.length === 1 ? height / 2 : 28 + lIdx * yStep;
                                              const xStep = width / (layerNodes.length + 1);
                                              layerNodes.forEach((v, idx) => {
                                                positions[v] = {
                                                  x: xStep * (idx + 1),
                                                  y
                                                };
                                              });
                                            });

                                            const currentVar = (currentTraceFrame.stackVars || []).find(sv => sv.name === 'current' || sv.name === 'start');
                                            const neighborVar = (currentTraceFrame.stackVars || []).find(sv => sv.name === 'neighbor');
                                            const activeNode = currentVar ? String(currentVar.value) : null;
                                            const activeNeighbor = neighborVar ? String(neighborVar.value) : null;

                                            const edges = [];
                                            const seenUndirected = new Set();
                                            vertices.forEach(u => {
                                              (ho.adj[u] || []).forEach(v => {
                                                if (!positions[v]) return;
                                                const isBidirectional = (ho.adj[v] || []).includes(u);
                                                const pairKey = isBidirectional ? [u, v].sort().join('--') : `${u}->${v}`;
                                                if (seenUndirected.has(pairKey)) return;
                                                seenUndirected.add(pairKey);
                                                edges.push({ u, v, isBidirectional });
                                              });
                                            });

                                            return (
                                              <div className="bg-white dark:bg-stone-950/80 rounded-xl border border-stone-200 dark:border-stone-800 p-2 flex justify-center">
                                                <svg viewBox="0 0 280 190" className="w-full max-w-[290px] h-[185px] overflow-visible">
                                                  <defs>
                                                    <marker id="graph-arrow" markerWidth="7" markerHeight="7" refX="19" refY="3.5" orient="auto">
                                                      <polygon points="0 0, 7 3.5, 0 7" fill="#a855f7" />
                                                    </marker>
                                                  </defs>
                                                  {edges.map((edge, eIdx) => {
                                                    const p1 = positions[edge.u];
                                                    const p2 = positions[edge.v];
                                                    const isHighlightedEdge =
                                                      (activeNode === edge.u && activeNeighbor === edge.v) ||
                                                      (activeNode === edge.v && activeNeighbor === edge.u);
                                                    return (
                                                      <line
                                                        key={eIdx}
                                                        x1={p1.x}
                                                        y1={p1.y}
                                                        x2={p2.x}
                                                        y2={p2.y}
                                                        stroke={isHighlightedEdge ? '#f59e0b' : '#a855f7'}
                                                        strokeWidth={isHighlightedEdge ? '3' : '2'}
                                                        strokeOpacity={isHighlightedEdge ? '1' : '0.55'}
                                                        markerEnd={!edge.isBidirectional ? 'url(#graph-arrow)' : undefined}
                                                      />
                                                    );
                                                  })}
                                                  {vertices.map(v => {
                                                    const pos = positions[v];
                                                    const isCurrent = activeNode === v;
                                                    const isNeighbor = activeNeighbor === v;
                                                    return (
                                                      <g key={v}>
                                                        <circle
                                                          cx={pos.x}
                                                          cy={pos.y}
                                                          r="16"
                                                          fill={isCurrent ? '#d97706' : isNeighbor ? '#10b981' : '#ffffff'}
                                                          stroke={isCurrent ? '#b45309' : isNeighbor ? '#059669' : '#9333ea'}
                                                          strokeWidth="2.5"
                                                        />
                                                        <text
                                                          x={pos.x}
                                                          y={pos.y + 4}
                                                          textAnchor="middle"
                                                          fontSize="11"
                                                          fontWeight="bold"
                                                          fill={isCurrent || isNeighbor ? '#ffffff' : '#3b0764'}
                                                        >
                                                          {v}
                                                        </text>
                                                      </g>
                                                    );
                                                  })}
                                                </svg>
                                              </div>
                                            );
                                          })()}

                                          <div className="space-y-1 pt-1">
                                            {Object.entries(ho.adj).map(([vertex, neighbors]) => (
                                              <div key={vertex} className="flex items-center space-x-2 text-[11px]">
                                                <span className="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold">
                                                  {vertex}
                                                </span>
                                                <span className="text-stone-400">──▶</span>
                                                <span className="text-stone-700 dark:text-stone-300">
                                                  [ {neighbors.join(', ')} ]
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : ho.isCollection ? (
                                    <div className="py-1 overflow-x-auto">
                                      {(!ho.items || ho.items.length === 0) ? (
                                        <div className="text-[10px] text-stone-400 italic text-center py-2">Empty {ho.dsType || 'Collection'}</div>
                                      ) : ho.dsType === 'STACK' ? (
                                        <div className="flex flex-col-reverse items-center gap-1 py-1">
                                          {ho.items.map((item, idx) => (
                                            <div
                                              key={idx}
                                              className={`w-28 py-1 px-2 rounded border text-center font-bold text-xs ${
                                                idx === ho.items.length - 1
                                                  ? 'bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300'
                                                  : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700'
                                              }`}
                                            >
                                              {idx === ho.items.length - 1 ? `TOP: ${item.value}` : String(item.value)}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="flex flex-wrap gap-1.5">
                                          {ho.items.map((item, idx) => (
                                            <div
                                              key={idx}
                                              className={`px-2.5 py-1.5 rounded-lg border text-center min-w-[44px] ${
                                                item.highlight === 'NEW'
                                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                                  : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700'
                                              }`}
                                            >
                                              <span className="text-[9px] text-stone-400 block">[{item.index ?? idx}]</span>
                                              <span className="font-bold text-xs">{item.label || String(item.value)}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ) : ho.fields ? (
                                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                                      {Object.entries(ho.fields).map(([k, v]) => (
                                        <div key={k} className="px-2 py-1 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex justify-between">
                                          <span className="text-stone-500">{k}:</span>
                                          <span className="font-bold">{String(v)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Interactive Blocking Stdin Prompt or Live Console Output */}
                        {currentTraceFrame.waitingForInput ? (
                          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 space-y-2">
                            <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                              ⌨️ Input Required for "{currentTraceFrame.waitingForInput.varName}" ({currentTraceFrame.waitingForInput.inputType})
                            </div>
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={interactiveInputDraft}
                                onChange={(e) => setInteractiveInputDraft(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmitInteractiveInput()}
                                placeholder={`Enter ${currentTraceFrame.waitingForInput.inputType} value...`}
                                className="flex-1 bg-white dark:bg-stone-950 border border-amber-400 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={handleSubmitInteractiveInput}
                                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                              >
                                Send &amp; Next
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-stone-950 text-emerald-300 border border-stone-800 space-y-1">
                            <div className="text-[10px] uppercase text-stone-400 font-bold">Console Output (stdout)</div>
                            <pre className="text-xs whitespace-pre-wrap min-h-[24px]">
                              {(currentTraceFrame.consoleOutput || '').replace(/\u200B/g, '') || '// No stdout printed yet'}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Run & Stdin Console Mode */
                  <div className="flex-1 flex flex-col divide-y divide-stone-200 dark:divide-stone-800 overflow-hidden">
                    <div className="p-3.5 flex flex-col h-1/3 min-h-[120px]">
                      <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-stone-500">
                        <span className="font-bold uppercase">Standard Input (stdin)</span>
                        {javaStdin && (
                          <button onClick={() => setJavaStdin('')} className="hover:text-rose-500">
                            Clear
                          </button>
                        )}
                      </div>
                      <textarea
                        value={javaStdin}
                        onChange={(e) => setJavaStdin(e.target.value)}
                        placeholder="Enter input for Scanner(System.in)..."
                        className="flex-1 w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5 font-mono text-xs resize-none focus:outline-none"
                      />
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-stone-500">
                        <span className="font-bold uppercase">OpenJDK Compiler Output</span>
                        {javaExecTime !== null && <span className="text-emerald-500">{javaExecTime} ms</span>}
                      </div>
                      <div className="flex-1 overflow-auto rounded-xl bg-stone-950 text-stone-100 p-3 font-mono text-xs whitespace-pre-wrap border border-stone-800">
                        {isJavaRunning ? (
                          <span className="text-amber-400">Compiling &amp; running Main.java...</span>
                        ) : javaStderr ? (
                          <div className="text-rose-400">{javaStderr}</div>
                        ) : javaStdout ? (
                          <div className="text-emerald-300">{javaStdout}</div>
                        ) : (
                          <span className="text-stone-500 italic">Click "Run Code" (Ctrl+Enter) to compile and execute on OpenJDK...</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 9. SQL PLAYGROUND & RELATIONAL QUERY STUDIO */}
        {activeTab === 'sql' && (
          <div className="space-y-5">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">SQL Playground &amp; Database Studio</h2>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                        {sqlEngineReady ? 'SQLite Engine Active' : 'Initializing...'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">Write custom queries, create new tables, and insert or update rows on predefined or custom tables</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={() => setModalCreateSqlTableOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Table</span>
                  </button>

                  <button
                    onClick={() => openSqlDataModal('insert')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Row</span>
                  </button>

                  <button
                    onClick={() => openSqlDataModal('update')}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Row</span>
                  </button>

                  <select
                    value={sqlFontSize}
                    onChange={(e) => setSqlFontSize(Number(e.target.value))}
                    className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1.5 font-mono"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                  </select>

                  <button
                    onClick={handleResetSqlDatabase}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset DB</span>
                  </button>

                  <button
                    onClick={() => {
                      setSavingSnippetLanguage('sql');
                      setNewSnippetTitle('');
                      setShowSaveSnippetModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Save Query</span>
                  </button>

                  <button
                    onClick={handleRunSql}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Query (Ctrl+Enter)</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Spacious 2-Column SQL Studio: Left Schema | Right Wide Stacked Editor & Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left 3 Cols: Live Database Schema Explorer */}
              <div className="lg:col-span-3 flex flex-col h-[640px] bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono shrink-0">
                  <span className="font-bold text-stone-700 dark:text-stone-200">Database Schema</span>
                  <button
                    onClick={() => setModalCreateSqlTableOpen(true)}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                  >
                    + New Table
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
                  {sqlSchemaTables.map(tbl => (
                    <div key={tbl.name} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 overflow-hidden">
                      <div className="px-3 py-2 bg-stone-100/80 dark:bg-stone-800/80 flex items-center justify-between gap-1">
                        <span
                          onClick={() => {
                            const q = `SELECT * FROM "${tbl.name}" LIMIT 50;`;
                            setSqlQuery(q);
                            if (sqlDbRef.current) runSqlQueryWithDb(sqlDbRef.current, q);
                          }}
                          className="font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 cursor-pointer hover:underline truncate"
                          title="Click to SELECT rows"
                        >
                          <TableIcon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{tbl.name}</span>
                        </span>
                        <div className="flex items-center space-x-1 shrink-0">
                          <span className="text-[10px] font-mono text-stone-400 mr-1">{tbl.rowCount}r</span>
                          <button
                            onClick={() => openSqlDataModal('insert', tbl.name)}
                            className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/25"
                            title={`Insert row into ${tbl.name}`}
                          >
                            +Row
                          </button>
                          <button
                            onClick={() => openSqlDataModal('update', tbl.name)}
                            className="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-bold hover:bg-purple-500/25"
                            title={`Update rows in ${tbl.name}`}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="p-2 space-y-1 font-mono text-[11px]">
                        {tbl.columns.map(col => (
                          <div key={col.name} className="flex items-center justify-between px-1.5 py-0.5 rounded hover:bg-white dark:hover:bg-stone-950/60">
                            <span className={col.pk ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'}>
                              {col.pk ? '🔑 ' : ''}{col.name}
                            </span>
                            <span className="text-[10px] text-stone-400">{col.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 9 Cols: Wide Full-Width SQL Editor Stacked Above Results Table */}
              <div className="lg:col-span-9 flex flex-col gap-5">
                {/* Wide SQL Query Editor */}
                <div className="flex flex-col h-[310px] bg-[#161B26] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                  <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono shrink-0">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">query.sql</span>
                      <span className="text-[11px] text-stone-400">{sqlQuery.split('\n').length} lines</span>
                    </div>
                    <span className="text-[11px] text-stone-400">Ctrl + Enter to Execute • SQLite 3 WASM</span>
                  </div>

                  <div className="relative flex flex-1 min-h-0 bg-[#161B26] text-stone-100 overflow-hidden">
                    <div
                      ref={sqlLineNumbersRef}
                      aria-hidden="true"
                      style={{ fontSize: `${sqlFontSize}px`, lineHeight: '1.6' }}
                      className="w-11 py-4 px-2 text-right font-mono select-none overflow-hidden bg-[#10141D] text-stone-500 border-r border-stone-800 shrink-0"
                    >
                      {Array.from({ length: sqlQuery.split('\n').length }, (_, idx) => (
                        <div key={idx}>{idx + 1}</div>
                      ))}
                    </div>

                    <textarea
                      ref={sqlTextareaRef}
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      onScroll={() => {
                        if (sqlTextareaRef.current && sqlLineNumbersRef.current) {
                          sqlLineNumbersRef.current.scrollTop = sqlTextareaRef.current.scrollTop;
                        }
                      }}
                      onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                          e.preventDefault();
                          handleRunSql();
                        } else if (e.key === 'Tab') {
                          e.preventDefault();
                          const start = e.target.selectionStart;
                          const end = e.target.selectionEnd;
                          const updated = sqlQuery.substring(0, start) + '    ' + sqlQuery.substring(end);
                          setSqlQuery(updated);
                          requestAnimationFrame(() => {
                            if (sqlTextareaRef.current) {
                              sqlTextareaRef.current.selectionStart = start + 4;
                              sqlTextareaRef.current.selectionEnd = start + 4;
                            }
                          });
                        }
                      }}
                      spellCheck={false}
                      style={{ fontSize: `${sqlFontSize}px`, lineHeight: '1.6', tabSize: 4 }}
                      className="flex-1 w-full h-full p-4 font-mono bg-transparent text-stone-100 resize-none focus:outline-none overflow-y-auto whitespace-pre-wrap break-words"
                      placeholder="-- Write your SQL query here..."
                    />
                  </div>
                </div>

                {/* Full-Width Query Results Table */}
                <div className="flex flex-col h-[310px] bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
                  <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#151D2C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono shrink-0">
                    <span className="font-bold text-stone-700 dark:text-stone-200">Query Results</span>
                    {sqlExecTime !== null && !sqlError && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {sqlResults.reduce((acc, r) => acc + (r.values?.length || 0), 0)} rows • {sqlExecTime} ms
                      </span>
                    )}
                  </div>

                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {sqlError ? (
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 font-mono text-xs whitespace-pre-wrap">
                        <div className="font-bold mb-1">SQL Execution Error:</div>
                        {sqlError}
                      </div>
                    ) : sqlResults.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-stone-400 text-xs text-center space-y-1">
                        <Database className="w-7 h-7 text-stone-300 dark:text-stone-700 mb-1" />
                        <p className="font-medium">Query executed successfully (0 rows returned)</p>
                        <p className="text-[11px]">Run a SELECT statement or click any table in the Schema Explorer.</p>
                      </div>
                    ) : (
                      sqlResults.map((resultSet, rIdx) => (
                        <div key={rIdx} className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
                          <table className="w-full text-left border-collapse text-xs font-mono">
                            <thead>
                              <tr className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                                {resultSet.columns.map((col, cIdx) => (
                                  <th key={cIdx} className="py-2 px-3 font-bold text-stone-800 dark:text-stone-200 whitespace-nowrap">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/70">
                              {resultSet.values.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-stone-50 dark:hover:bg-stone-900/40">
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="py-2 px-3 text-stone-700 dark:text-stone-300 whitespace-nowrap">
                                      {cell === null ? <span className="italic text-stone-400">NULL</span> : String(cell)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 10. DEDICATED SAVED SNIPPETS VAULT (FOLDER-ORGANIZED) */}
        {activeTab === 'snippets' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Saved Java Snippets Vault</h2>
                <p className="text-xs text-stone-500 mt-0.5">Organize your solved DSA solutions by topic folder and open them in the IDE anytime.</p>
              </div>
              <input
                type="text"
                value={snippetSearchQuery}
                onChange={(e) => setSnippetSearchQuery(e.target.value)}
                placeholder="Search saved snippets..."
                className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Folders Sidebar */}
              <div className="lg:col-span-3 bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-400 block">Folders</span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSnippetFolder('ALL')}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between ${
                      selectedSnippetFolder === 'ALL'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>All Snippets</span>
                    <span className="font-mono text-[11px]">{savedSnippets.length}</span>
                  </button>
                  {snippetFolders.map(folder => {
                    const count = savedSnippets.filter(s => (s.folder || 'General') === folder).length;
                    return (
                      <button
                        key={folder}
                        onClick={() => setSelectedSnippetFolder(folder)}
                        className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between ${
                          selectedSnippetFolder === folder
                            ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                            : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        <span className="truncate">{folder}</span>
                        <span className="font-mono text-[11px]">{count}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex gap-1.5">
                  <input
                    type="text"
                    value={newFolderInput}
                    onChange={(e) => setNewFolderInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateSnippetFolder()}
                    placeholder="New folder..."
                    className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs"
                  />
                  <button
                    onClick={handleCreateSnippetFolder}
                    className="px-2.5 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Right Snippets Grid */}
              <div className="lg:col-span-9">
                {filteredSnippets.length === 0 ? (
                  <div className="bg-white dark:bg-[#121824] p-12 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 text-center text-xs text-stone-400">
                    No snippets in this folder yet. Save any solution from the Java Playground tab!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSnippets.map(snip => (
                      <div key={snip.id} className="bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col justify-between shadow-sm">
                        <div className="p-3.5 pb-2 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                                snip.language === 'sql'
                                  ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                              }`}>
                                {snip.language === 'sql' ? 'SQL' : 'JAVA'}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                                {snip.folder || 'General'}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold mt-1 truncate">{snip.title}</h4>
                            <span className="text-[10px] text-stone-400">{snip.savedAt}</span>
                          </div>
                          <button onClick={() => handleDeleteSnippet(snip.id)} className="text-stone-400 hover:text-rose-500 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <pre className="mx-3.5 my-1 p-2.5 rounded-xl bg-[#161B26] text-stone-300 font-mono text-[11px] h-24 overflow-hidden">
                          {snip.code}
                        </pre>

                        <div className="p-3.5 pt-2 flex items-center justify-between text-xs">
                          <span className="text-[10px] font-mono text-stone-400">{snip.code.split('\n').length} lines</span>
                          <button
                            onClick={() => {
                              if (snip.language === 'sql') {
                                setSqlQuery(snip.code);
                                setActiveTab('sql');
                                showToast(`Opened SQL query "${snip.title}"`);
                              } else {
                                setJavaCode(snip.code);
                                if (snip.stdin !== undefined) setJavaStdin(snip.stdin);
                                setActiveTab('compiler');
                                showToast(`Opened "${snip.title}" in Java IDE`);
                              }
                            }}
                            className="px-3 py-1 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold"
                          >
                            {snip.language === 'sql' ? 'Open in SQL IDE →' : 'Open in Java IDE →'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 11. LEARNING WEBSITES BOOKMARKS VAULT (CATEGORIZED) */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            {/* Top Banner */}
            <div className="bg-white dark:bg-[#121824] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-emerald-500" />
                    <span>Favorite Learning Websites &amp; Resource Bookmarks</span>
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                    {bookmarks.length} Saved
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Bookmark documentation, engineering blogs, system design guides, and tutorials organized by category.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={bookmarkSearchQuery}
                  onChange={(e) => setBookmarkSearchQuery(e.target.value)}
                  placeholder="Search websites, URLs, notes..."
                  className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
                />
                <button
                  onClick={() => {
                    setNewBmTitle('');
                    setNewBmUrl('');
                    setNewBmNotes('');
                    setNewBmCategory(
                      selectedBookmarkCategory !== 'ALL' && selectedBookmarkCategory !== 'FAVORITES'
                        ? selectedBookmarkCategory
                        : bookmarkCategories[0] || 'General Learning'
                    );
                    setModalAddBookmarkOpen(true);
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Website Bookmark</span>
                </button>
              </div>
            </div>

            {/* Category Sidebar & Categorized Bookmarks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Categories Sidebar */}
              <div className="lg:col-span-3 bg-white dark:bg-[#121824] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-400 block">Categories</span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBookmarkCategory('ALL')}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between transition ${
                      selectedBookmarkCategory === 'ALL'
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>All Websites</span>
                    <span className="font-mono text-[11px]">{bookmarks.length}</span>
                  </button>

                  <button
                    onClick={() => setSelectedBookmarkCategory('FAVORITES')}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between transition ${
                      selectedBookmarkCategory === 'FAVORITES'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Starred Favorites</span>
                    </span>
                    <span className="font-mono text-[11px]">{bookmarks.filter(b => b.favorite).length}</span>
                  </button>

                  <div className="pt-1.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1">
                    {bookmarkCategories.map(cat => {
                      const count = bookmarks.filter(b => (b.category || 'General Learning') === cat).length;
                      const isSel = selectedBookmarkCategory === cat;
                      return (
                        <div
                          key={cat}
                          onClick={() => setSelectedBookmarkCategory(cat)}
                          className={`w-full px-3 py-2 rounded-xl font-medium flex items-center justify-between cursor-pointer transition group ${
                            isSel
                              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                              : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                        >
                          <span className="truncate pr-2">{cat}</span>
                          <div className="flex items-center space-x-1.5 shrink-0">
                            <span className="font-mono text-[11px]">{count}</span>
                            {bookmarkCategories.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBookmarkCategory(cat);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500 transition"
                                title="Delete category"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add Custom Category */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex gap-1.5">
                  <input
                    type="text"
                    value={newBookmarkCategoryInput}
                    onChange={(e) => setNewBookmarkCategoryInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateBookmarkCategory()}
                    placeholder="New category..."
                    className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  />
                  <button
                    onClick={handleCreateBookmarkCategory}
                    className="px-2.5 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg font-semibold"
                    title="Create Category"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Right Bookmarks Cards Grid */}
              <div className="lg:col-span-9">
                {filteredBookmarks.length === 0 ? (
                  <div className="bg-white dark:bg-[#121824] p-12 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-2">
                    <Globe className="w-8 h-8 text-stone-300 dark:text-stone-700 mx-auto" />
                    <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">No websites in this category yet</p>
                    <p className="text-[11px] text-stone-400">Click "+ Add Website Bookmark" to save your favorite tutorials, docs, and blogs.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBookmarks.map(bm => {
                      let hostname = bm.url;
                      try {
                        hostname = new URL(bm.url).hostname.replace(/^www\./, '');
                      } catch (_) {}

                      return (
                        <div
                          key={bm.id}
                          className="bg-white dark:bg-[#121824] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 flex flex-col justify-between space-y-3 shadow-sm hover:border-stone-400 dark:hover:border-stone-600 transition"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 truncate">
                                {bm.category || 'General Learning'}
                              </span>

                              <div className="flex items-center space-x-1 shrink-0">
                                <button
                                  onClick={() => handleToggleFavoriteBookmark(bm.id)}
                                  className={`p-1 rounded-lg transition ${
                                    bm.favorite
                                      ? 'text-amber-500'
                                      : 'text-stone-400 hover:text-amber-500'
                                  }`}
                                  title={bm.favorite ? 'Remove from Favorites' : 'Star as Favorite'}
                                >
                                  <Star className={`w-3.5 h-3.5 ${bm.favorite ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBookmark(bm.id)}
                                  className="p-1 text-stone-400 hover:text-rose-500 rounded-lg transition"
                                  title="Delete Bookmark"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div>
                              <a
                                href={bm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-sm text-stone-900 dark:text-stone-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-1 block"
                              >
                                {bm.title}
                              </a>
                              <span className="text-[11px] font-mono text-stone-400 block truncate mt-0.5">
                                {hostname}
                              </span>
                            </div>

                            {bm.notes && (
                              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                                {bm.notes}
                              </p>
                            )}
                          </div>

                          <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                            <select
                              value={bm.category || 'General Learning'}
                              onChange={(e) => {
                                const updatedCat = e.target.value;
                                setBookmarks(bookmarks.map(item => (item.id === bm.id ? { ...item, category: updatedCat } : item)));
                                showToast(`Moved to ${updatedCat}`);
                              }}
                              className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1 text-[10px] font-mono max-w-[130px] truncate"
                              title="Change Category"
                            >
                              {bookmarkCategories.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>

                            <a
                              href={bm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 font-semibold flex items-center gap-1 transition"
                            >
                              <span>Visit</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODALS ================= */}

      {/* Modal: Add Learning Website Bookmark */}
      {modalAddBookmarkOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-500" />
                <span>Add Learning Website Bookmark</span>
              </h3>
              <button onClick={() => setModalAddBookmarkOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Website Title *</label>
              <input
                type="text"
                value={newBmTitle}
                onChange={(e) => setNewBmTitle(e.target.value)}
                placeholder="e.g. Martin Kleppmann — Designing Data-Intensive Apps"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Website URL *</label>
              <input
                type="url"
                value={newBmUrl}
                onChange={(e) => setNewBmUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Category *</label>
              <select
                value={newBmCategory}
                onChange={(e) => setNewBmCategory(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              >
                {bookmarkCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Notes / Key Topics Covered (Optional)</label>
              <textarea
                rows={3}
                value={newBmNotes}
                onChange={(e) => setNewBmNotes(e.target.value)}
                placeholder="Why this site is useful (e.g. Great visual explanations of Raft consensus & Kafka partitions)..."
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalAddBookmarkOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button
                onClick={handleSaveNewBookmark}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl font-semibold"
              >
                Save Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Custom SQL Table */}
      {modalCreateSqlTableOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Create Custom SQL Table</span>
              </h3>
              <button onClick={() => setModalCreateSqlTableOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Table Name *</label>
              <input
                type="text"
                value={newSqlTableName}
                onChange={(e) => setNewSqlTableName(e.target.value)}
                placeholder="e.g. products, projects, interviews"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-stone-500 font-medium">Columns *</label>
                <button
                  onClick={() => setNewSqlColumns([...newSqlColumns, { name: '', type: 'TEXT', pk: false }])}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Column</span>
                </button>
              </div>

              <div className="space-y-2">
                {newSqlColumns.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => {
                        const updated = [...newSqlColumns];
                        updated[idx].name = e.target.value;
                        setNewSqlColumns(updated);
                      }}
                      placeholder="column_name"
                      className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 font-mono"
                    />
                    <select
                      value={col.type}
                      onChange={(e) => {
                        const updated = [...newSqlColumns];
                        updated[idx].type = e.target.value;
                        setNewSqlColumns(updated);
                      }}
                      className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 font-mono"
                    >
                      <option value="INTEGER">INTEGER</option>
                      <option value="TEXT">TEXT</option>
                      <option value="REAL">REAL</option>
                    </select>
                    <label className="flex items-center gap-1 text-[11px] font-mono text-stone-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={col.pk}
                        onChange={(e) => {
                          const updated = [...newSqlColumns];
                          updated[idx].pk = e.target.checked;
                          setNewSqlColumns(updated);
                        }}
                      />
                      <span>PK</span>
                    </label>
                    {newSqlColumns.length > 1 && (
                      <button
                        onClick={() => setNewSqlColumns(newSqlColumns.filter((_, i) => i !== idx))}
                        className="text-stone-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalCreateSqlTableOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateCustomSqlTable} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold">
                Create Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert or Update Rows in Any SQL Table */}
      {modalSqlDataOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSqlDataMode('insert')}
                  className={`px-3 py-1 rounded-lg font-semibold ${
                    sqlDataMode === 'insert'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  Insert Row
                </button>
                <button
                  onClick={() => setSqlDataMode('update')}
                  className={`px-3 py-1 rounded-lg font-semibold ${
                    sqlDataMode === 'update'
                      ? 'bg-purple-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  Update Values
                </button>
              </div>
              <button onClick={() => setModalSqlDataOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Target Table</label>
              <select
                value={sqlTargetTable}
                onChange={(e) => {
                  setSqlTargetTable(e.target.value);
                  setSqlRowValues({});
                }}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono font-bold"
              >
                {sqlSchemaTables.map(t => (
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>

            {(() => {
              const schema = sqlSchemaTables.find(t => t.name === sqlTargetTable);
              if (!schema) return null;
              return (
                <div className="space-y-2.5">
                  <span className="block text-stone-500 font-medium">
                    {sqlDataMode === 'insert'
                      ? 'Column Values (leave blank for NULL):'
                      : 'New Column Values to SET (leave blank to keep unchanged):'}
                  </span>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {schema.columns.map(col => (
                      <div key={col.name} className="flex items-center gap-2">
                        <span className="w-32 font-mono font-semibold text-stone-700 dark:text-stone-300 truncate" title={col.name}>
                          {col.pk ? '🔑 ' : ''}{col.name}
                          <span className="text-[10px] text-stone-400 ml-1">({col.type})</span>
                        </span>
                        <input
                          type="text"
                          value={sqlRowValues[col.name] || ''}
                          onChange={(e) => setSqlRowValues({ ...sqlRowValues, [col.name]: e.target.value })}
                          placeholder={col.type === 'INTEGER' || col.type === 'REAL' ? '0' : 'value...'}
                          className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 font-mono"
                        />
                      </div>
                    ))}
                  </div>

                  {sqlDataMode === 'update' && (
                    <div className="pt-1">
                      <label className="block text-stone-500 font-medium mb-1">WHERE Condition (optional, e.g. emp_id = 101)</label>
                      <input
                        type="text"
                        value={sqlWhereClause}
                        onChange={(e) => setSqlWhereClause(e.target.value)}
                        placeholder="e.g. id = 1"
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-2 font-mono"
                      />
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setModalSqlDataOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button
                onClick={handleExecuteSqlRowAction}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  sqlDataMode === 'insert'
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {sqlDataMode === 'insert' ? 'Insert Row' : 'Update Rows'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Save New Resume Version */}
      {showSaveResumeVersionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Save New Resume Version</span>
              </h3>
              <button onClick={() => setShowSaveResumeVersionModal(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Version Name *</label>
              <input
                type="text"
                value={newResumeVersionName}
                onChange={(e) => setNewResumeVersionName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveResumeVersion()}
                placeholder="e.g. Backend Distributed Systems v2, AI / RAG Focus"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Target Role / Focus Tag</label>
              <input
                type="text"
                value={newResumeVersionRole}
                onChange={(e) => setNewResumeVersionRole(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveResumeVersion()}
                placeholder="e.g. SDE II • Java, Spring Boot, Kafka"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button onClick={() => setShowSaveResumeVersionModal(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveResumeVersion} className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl font-semibold">
                Save Version
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Save Snippet to Folder */}
      {showSaveSnippetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">
              {savingSnippetLanguage === 'sql' ? 'Save SQL Query to Folder' : 'Save Java Snippet to Folder'}
            </h3>
            <div>
              <label className="block text-stone-500 mb-1">
                {savingSnippetLanguage === 'sql' ? 'Query Title *' : 'Snippet Title *'}
              </label>
              <input
                type="text"
                value={newSnippetTitle}
                onChange={(e) => setNewSnippetTitle(e.target.value)}
                placeholder={savingSnippetLanguage === 'sql' ? 'e.g. Department Average Salary Join' : 'e.g. LinkedList Insert & Delete'}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-stone-500 mb-1">Folder</label>
              <select
                value={newSnippetFolder}
                onChange={(e) => setNewSnippetFolder(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              >
                {snippetFolders.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setShowSaveSnippetModal(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveSnippetConfirm} className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl font-medium">
                Save Snippet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Flashcard */}
      {modalAddFlashcardOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add Interview Prep Flashcard</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newFcDomain}
                onChange={(e) => setNewFcDomain(e.target.value)}
                placeholder="Domain"
                className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              />
              <select
                value={newFcDifficulty}
                onChange={(e) => setNewFcDifficulty(e.target.value)}
                className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <textarea
              rows={2}
              value={newFcQuestion}
              onChange={(e) => setNewFcQuestion(e.target.value)}
              placeholder="Interview Question..."
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
            />
            <textarea
              rows={4}
              value={newFcAnswer}
              onChange={(e) => setNewFcAnswer(e.target.value)}
              placeholder="Answer & Key Takeaways..."
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddFlashcardOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveNewFlashcard} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Domain */}
      {modalAddDomainOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add New Domain / Learning Track</h3>
            <input
              type="text"
              value={domainTitleInput}
              onChange={(e) => setDomainTitleInput(e.target.value)}
              placeholder="e.g. Distributed Systems & High-Level Design"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddDomainOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateDomain} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Add Domain</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Main Topic */}
      {modalAddTopicOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add Main Topic under "{activeDomain?.title}"</h3>
            <input
              type="text"
              value={topicTitleInput}
              onChange={(e) => setTopicTitleInput(e.target.value)}
              placeholder="e.g. Concurrency, Virtual Threads & JVM Memory"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddTopicOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateTopic} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Add Topic</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Section & Subtopics */}
      {modalAddSectionOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add Section to "{activeTopic?.title}"</h3>
            <input
              type="text"
              value={sectionTitleInput}
              onChange={(e) => setSectionTitleInput(e.target.value)}
              placeholder="Section Title"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3"
            />
            <textarea
              rows={4}
              value={sectionSubtopicsInput}
              onChange={(e) => setSectionSubtopicsInput(e.target.value)}
              placeholder="Subtopics (One per line)"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 font-mono"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddSectionOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleCreateSection} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Save Section</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Hiring Portal */}
      {modalAddPortalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add Hiring Portal</h3>
            <input
              type="text"
              value={newPortalName}
              onChange={(e) => setNewPortalName(e.target.value)}
              placeholder="Portal Name"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
            />
            <input
              type="text"
              value={newPortalUrl}
              onChange={(e) => setNewPortalUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddPortalOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveCustomPortal} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Add Portal</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Discovered Job Link */}
      {modalAddJobOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Add Discovered Job Opening</h3>
            <input
              type="url"
              value={newJobUrl}
              onChange={(e) => setNewJobUrl(e.target.value)}
              placeholder="Application Link URL *"
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newJobCompany}
                onChange={(e) => setNewJobCompany(e.target.value)}
                placeholder="Company Name *"
                className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              />
              <input
                type="text"
                value={newJobRole}
                onChange={(e) => setNewJobRole(e.target.value)}
                placeholder="Role Title"
                className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalAddJobOpen(false)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={handleSaveDiscoveredJob} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Save Opening</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Stage Transition */}
      {modalStageTransitionApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Log Stage Transfer &amp; Date</h3>
            <select
              value={stageTransitionTarget}
              onChange={(e) => setStageTransitionTarget(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2"
            >
              {KANBAN_STAGES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <input
              type="date"
              value={stageTransitionDate}
              onChange={(e) => setStageTransitionDate(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2 font-mono"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalStageTransitionApp(null)} className="px-3.5 py-2 text-stone-500">Cancel</button>
              <button onClick={confirmStageTransition} className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reschedule / Remove Subtopic */}
      {rescheduleSubtopic && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121824] border border-stone-200 dark:border-stone-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-sm">Reschedule / Remove Subtopic</h3>
            <p className="font-semibold">{rescheduleSubtopic.title}</p>
            <input
              type="date"
              value={rescheduleTargetDate}
              onChange={(e) => setRescheduleTargetDate(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-2.5 font-mono"
            />
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleRemoveSubtopicFromDay(rescheduleSubtopic.id)}
                className="px-3 py-2 text-rose-600 font-semibold"
              >
                Remove from Day Plan
              </button>
              <div className="flex space-x-2">
                <button onClick={() => setRescheduleSubtopic(null)} className="px-3 py-2 text-stone-500">Cancel</button>
                <button
                  onClick={() => handleRescheduleSubtopic(rescheduleSubtopic.id, rescheduleSubtopic.currentDate, rescheduleTargetDate)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium"
                >
                  Move Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-900/95 dark:bg-stone-100/95 text-white dark:text-stone-900 shadow-xl text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
