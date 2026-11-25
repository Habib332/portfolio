import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiExpo, SiTailwindcss,
  SiVite, SiNodedotjs, SiExpress, SiDjango, SiPython, SiNumpy, SiScikitlearn,
  SiCplusplus, SiMysql, SiPostgresql, SiMongodb, SiMongoose, SiSupabase,
  SiGit, SiGithub, SiDocker, SiPostman, SiIntellijidea, SiGoogle,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { FiGithub, FiLinkedin, FiMail, FiCpu, FiCode } from "react-icons/fi";
import type { IconType } from "react-icons";

export const site = {
  name: "Habib Ahmed",
  role: "Full Stack Developer",
  bio: "Software Engineering student building full-stack web and mobile apps with React, TypeScript, Node.js and Python.",
  email: "habib.ahmed4781@gmail.com",
  location: "Karachi, Pakistan",
  cvUrl: "/cv.pdf",
  heroBadge: "Available for work", // "" hides the badge
  status: "Open to opportunities",
    university: "National University of Computer and Emerging Sciences",
  degree: "BS Software Engineering · 2024 – Present",
  githubUser: "Habib332",
  formspreeEndpoint: "https://formspree.io/f/your-id",
};

export const about = {
  paragraphs: [
    "I'm a Software Engineering student at FAST NUCES Karachi who enjoys building full-stack products, from REST APIs and databases to polished interfaces and mobile apps.",
    "My recent work includes a charity management platform, a receipt-scanning Android app, a privacy-first chat analytics tool, a Word2Vec implementation built from scratch, and a wedding seating planner powered by constraint programming.",
  ],
};
export type Experience = {
  role: string;
  org: string;
  period?: string; // e.g. "2025 – Present"; leave "" to hide
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Co-Head", // TODO: confirm your exact title
    org: "AWS SBG, FAST NUCES Karachi",
    period: "Aug 2026 – Present", // TODO: add start date, e.g. "2025 – Present"
    description:
      "Co-lead the chapter's hackathon activities: designing quizzes and competitions for members, organizing hackathons, and taking part in team hackathons.",
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[]; // shown as "A · B · C"
  badge?: string; // optional pill above the category, e.g. "Team project"
  stat?: string; // chip at the bottom left
  cover: {
    eyebrow: string; // small pill at the top of the cover
    headline: string;
    accent: string; // second line, shown in italics
    sub: string;
    gradient: string;
  };
  logo?: string; // tiny icon inside the eyebrow pill
  screenshot?: string; // optional, shown at the bottom of the cover
  demo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "Shadi Seat Maxxing",
    category: "Constraint optimization",
    description:
      "Wedding seating planner that treats guest placement as a constraint problem, solved with OR-Tools CP-SAT behind a Django API and a React-Konva hall designer.",
    tags: ["React", "TypeScript", "Django", "OR-Tools"],
    badge: "Team project",
    stat: "100% of guests seated",
    cover: {
      eyebrow: "Django · OR-Tools · React-Konva",
      headline: "Every guest seated.",
      accent: "Every rule weighed.",
      sub: "CP-SAT solver with tiered rule relaxation",
      gradient: "linear-gradient(180deg, #0a0d2a 0%, #241a6e 100%)",
    },
    screenshot: "/shadimaxxing1.jpeg", // replace with your actual filename in public/
    demo: "https://shadi-seat-maxxing-coral.vercel.app/",
    github: "https://github.com/hamzaTheZeeshan/ShadiSeatMaxxing",
  },
  {
    title: "Welfare Trust Management System",
    category: "Full-stack web",
    description:
      "A full-stack charity platform with role-based access, multi-type donations, campaign tracking and admin controls.",
    tags: ["TypeScript", "Node.js", "Express", "MySQL"],
    stat: "7 route groups",
    cover: {
      eyebrow: "Node.js · Express · MySQL",
      headline: "Every donation tracked.",
      accent: "Every role secured.",
      sub: "JWT auth with role-based access control",
      gradient: "linear-gradient(180deg, #071a14 0%, #0e5c45 100%)",
    },
    logo: "/awt-system.avif",
    screenshot: "/awtsystem.jpeg", // replace with your actual filename in public/
    demo: "https://awt-system-edq6.vercel.app/",
    github: "https://github.com/hamzaTheZeeshan/AWT-System",
  },
  {
    title: "Receiptify",
    category: "Mobile app",
    description:
      "Android app that turns receipt photos into searchable data with the Gemini API, with export to PDF, CSV and Excel.",
    tags: ["React Native", "Expo", "Express", "PostgreSQL", "Gemini API"],
    stat: "PDF · CSV · Excel export",
    cover: {
      eyebrow: "React Native · Gemini API",
      headline: "Receipts in.",
      accent: "Data out.",
      sub: "From photo to structured record, automatically",
      gradient: "linear-gradient(180deg, #07142e 0%, #1456c8 100%)",
    },
    logo: "/receiptify.avif",
    screenshot: "/receiptify1.jpeg", // replace with your actual filename in public/
    demo: "https://receiptify-frontend-chi.vercel.app/",
    github: "https://github.com/Habib332/Receiptify",
  },
  {
    title: "Word2Vec Visualizer",
    category: "Machine learning",
    description:
      "Skip-Gram with Negative Sampling built from scratch in NumPy, plus an interactive t-SNE view of the learned embeddings.",
    tags: ["Python", "NumPy", "scikit-learn", "React", "TypeScript"],
    stat: "Built from scratch",
    cover: {
      eyebrow: "Python · NumPy · t-SNE",
      headline: "Words become vectors.",
      accent: "Built from scratch.",
      sub: "Skip-Gram with negative sampling",
      gradient: "linear-gradient(180deg, #120a0a 0%, #7a2e12 100%)",
    },
    logo: "/word2vec.avif",
    screenshot: "/word2vec1.jpeg", // replace with your actual filename in public/
    demo: "https://word2-vec.vercel.app/",
    github: "https://github.com/Habib332/Word2Vec",
  },
  {
    title: "InstaInsights",
    category: "Data analytics",
    description:
      "Privacy-first analytics for Instagram chat exports, computed entirely in the browser with no uploads.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    stat: "25+ metrics",
    cover: {
      eyebrow: "React · TypeScript · Vite",
      headline: "25+ metrics.",
      accent: "Zero uploads.",
      sub: "Chat analytics that never leave your browser",
      gradient: "linear-gradient(180deg, #14061c 0%, #7a1466 100%)",
    },
    logo: "/insta-insights.avif",
    screenshot: "/instainsights1.jpeg",
    demo: "https://insta-insights-nu.vercel.app/",
    github: "https://github.com/hamzaTheZeeshan/InstaInsights",
  },
];

export type Skill = {
  name: string;
  category: string;
  Icon: IconType;
  color?: string; // brand color; omit for icons that should follow the theme
};

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Language", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "Language", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", category: "Language", Icon: SiPython, color: "#3776AB" },
  { name: "Java", category: "Language", Icon: FaJava, color: "#ED8B00" },
  { name: "C/C++", category: "Language", Icon: SiCplusplus, color: "#00599C" },
  { name: "x86 Assembly", category: "Language", Icon: FiCpu },
  { name: "HTML5", category: "Frontend", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", category: "Styling", Icon: SiCss, color: "#1572B6" },
  // Frameworks
  { name: "React", category: "Frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "React Native", category: "Mobile", Icon: SiReact, color: "#61DAFB" },
  { name: "Expo", category: "Mobile", Icon: SiExpo },
  { name: "Tailwind CSS", category: "Styling", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", category: "Backend", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", category: "Backend", Icon: SiExpress },
  { name: "Django", category: "Backend", Icon: SiDjango, color: "#44B78B" },
  // Libraries
  { name: "NumPy", category: "Library", Icon: SiNumpy, color: "#4DABCF" },
  { name: "scikit-learn", category: "Library", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "Mongoose", category: "Library", Icon: SiMongoose, color: "#CC3333" },
  { name: "OR-Tools", category: "Optimization", Icon: SiGoogle, color: "#4285F4" },
  // Databases
  { name: "MySQL", category: "Database", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", category: "Database", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", category: "Database", Icon: SiMongodb, color: "#47A248" },
  { name: "Supabase", category: "Database", Icon: SiSupabase, color: "#3FCF8E" },
  // Tools
  { name: "Git", category: "Tools", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", category: "Tools", Icon: SiGithub },
  { name: "Docker", category: "DevOps", Icon: SiDocker, color: "#2496ED" },
  { name: "AWS (basics)", category: "Cloud", Icon: FaAws, color: "#FF9900" },
  { name: "Vite", category: "Tooling", Icon: SiVite, color: "#646CFF" },
  { name: "Postman", category: "Tools", Icon: SiPostman, color: "#FF6C37" },
  { name: "VS Code", category: "Editor", Icon: VscVscode, color: "#007ACC" },
  { name: "Visual Studio", category: "Editor", Icon: FiCode, color: "#8661C5" },
  { name: "IntelliJ IDEA", category: "Editor", Icon: SiIntellijidea },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/Habib332", Icon: FiGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/habibahmed5ba3004", Icon: FiLinkedin },
  { name: "Email", href: "mailto:habib.ahmed4781@gmail.com", Icon: FiMail },
];

export const nav = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];