export type ResearchStatus =
  | "Published"
  | "In Progress"
  | "Concept";

export interface ResearchItem {
  id: string;
  title: string;
  category: string;
  status: ResearchStatus;
  summary: string;
  topics: string[];
  year: string;
  link?: string;
  featured: boolean;
}

export const researchItems: ResearchItem[] = [
  {
    id: "legacy-protocol-security",
    title: "Legacy Security Protocols vs AI-Driven Security",
    category: "Security Research",
    status: "In Progress",
    summary:
      "A comparative study of legacy security protocols and modern AI-assisted approaches, focusing on detection accuracy, automation, scalability and operational risk.",
    topics: [
      "Legacy Protocols",
      "AI Security",
      "Detection",
      "Security Architecture",
    ],
    year: "2026",
    link: "#",
    featured: true,
  },
  {
    id: "ai-threat-detection",
    title: "AI-Assisted Threat Detection in Modern SOCs",
    category: "Detection Research",
    status: "Concept",
    summary:
      "Research into how machine learning and generative AI can support anomaly detection, alert prioritisation and security investigation workflows.",
    topics: [
      "Machine Learning",
      "SOC",
      "Threat Detection",
      "Anomaly Detection",
    ],
    year: "2026",
    link: "#",
    featured: true,
  },
  {
    id: "cloud-identity-risk",
    title: "Cloud Identity Attack Paths and Risk Exposure",
    category: "Cloud Security",
    status: "Concept",
    summary:
      "A practical analysis of identity-based attack paths across cloud environments, including privilege escalation, OAuth abuse and misconfigured access controls.",
    topics: [
      "Cloud IAM",
      "OAuth",
      "Privilege Escalation",
      "Zero Trust",
    ],
    year: "2026",
    link: "#",
    featured: true,
  },
];