// skills.ts
// Categorized skill set for Security Engineer / Security Researcher portfolio

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    category: "Programming Languages",
    skills: ["Python", "C", "C++", "Bash"],
  },
  {
    id: "cloud-identity-security",
    category: "Cloud & Identity Security",
    skills: [
      "AWS Security",
      "Azure Security",
      "AWS CloudTrail",
      "Azure AD / Entra ID",
      "GCP IAM",
      "IAM Monitoring",
      "OAuth Abuse Detection",
      "MFA Bypass Analysis",
      "RBAC",
      "Zero Trust",
    ],
  },
  {
    id: "detection-soc",
    category: "Detection Engineering & SOC Operations",
    skills: [
      "Detection Engineering",
      "SIEM Detection Engineering (Python, Sigma)",
      "Sigma Rules",
      "Splunk",
      "Wazuh",
      "ELK",
      "Threat Hunting",
      "Log Analysis",
      "Incident Investigation",
      "SOC Operations",
    ],
  },
  {
    id: "offensive-security",
    category: "Offensive Security & Research",
    skills: [
      "Penetration Testing",
      "Security Research",
      "Threat Intelligence",
      "MITRE ATT&CK",
      "Malware Analysis",
      "Digital Forensics",
      "Incident Response",
    ],
  },
  {
    id: "security-engineering-infra",
    category: "Security Engineering & Infrastructure",
    skills: [
      "Firewall & IDS/IPS",
      "Windows/Linux Security",
      "SOAR",
      "DevSecOps",
      "Cloud Security",
      "TCP/IP",
    ],
  },
  {
    id: "grc",
    category: "Governance, Risk & Compliance (GRC)",
    skills: [
      "Risk Assessment",
      "Security Governance",
      "ISO/IEC 27001",
      "NIST CSF",
      "SOC 2",
      "PCI DSS",
      "GDPR",
      "CIS Controls",
    ],
  },
  {
    id: "ai-security",
    category: "AI & Emerging Technology Security",
    skills: [
      "AI Security",
      "AI Governance",
      "Behavioral Analytics",
      "Anomaly Detection",
    ],
  },
];

// Flat list (useful for tag clouds, filters, or search)
export const skills: string[] = skillCategories.flatMap((c) => c.skills);