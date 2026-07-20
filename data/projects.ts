export type ProjectStatus = "Live" | "In Progress" | "Research";

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  caseStudy?: string;
  previewImage?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "pentest-manager",
    title: "AI-Powered Pentest Manager",
    category: "AI Security",
    status: "Research",
    description:
      "An AI-assisted penetration-testing management platform for reconnaissance, vulnerability prioritisation, risk scoring and professional report generation.",
    technologies: [
      "Python",
      "FastAPI",
      "Docker",
      "LLM",
      "Nmap",
      "OWASP",
    ],
    github: "#",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
  {
    id: "command-center",
    title: "Cybersecurity Command Center",
    category: "SOC Platform",
    status: "Research",
    description:
      "A central security operations platform for threat intelligence, attack-surface monitoring, MITRE ATT&CK mapping and executive security reporting.",
    technologies: [
      "Next.js",
      "Python",
      "Splunk",
      "Wazuh",
      "MITRE ATT&CK",
    ],
    github: "#",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
  {
    id: "aegisrange",
    title: "AegisRange",
    category: "Cyber Range",
    status: "In Progress",
    description:
      "A practical enterprise cyber range for attack simulation, detection engineering, SOC investigations and offensive and defensive security training.",
    technologies: [
      "VMware",
      "Windows",
      "Linux",
      "Wazuh",
      "Sigma",
      "Docker",
    ],
    github: "#",
    demo: "#",
    caseStudy: "#",
    featured: true,
  },
];