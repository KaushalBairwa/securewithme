// experience.ts
// Experience data for security engineer portfolio

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  location?: string;
  role: string;
  employmentType: "Full-time" | "Contract" | "Freelance" | "Internship";
  startDate: string; // e.g. "2022-05"
  endDate: string | "Present";
  summary?: string;
  highlights: string[];
  tools?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "secureandcode",
    company: "Secureandcode (Independent Practice)",
    location: "Remote",
    role: "Founder & Freelance Cybersecurity Engineer",
    employmentType: "Freelance",
    startDate: "2022-05",
    endDate: "Present",
    summary:
      "Independent security consultancy delivering detection engineering, SOC support, and offensive security assessments to startups and small businesses under signed NDAs.",
    highlights: [
      "Built and tuned custom SIEM detections using Sigma, YAML, and cloud/endpoint telemetry, cutting false positives by ~30% through iterative tuning and anomaly refinement.",
      "Performed threat hunting, attack surface monitoring, and vulnerability assessment & penetration testing (VAPT) across cloud, web, and API-based client systems.",
      "Simulated attacker techniques to validate logging coverage and detection effectiveness.",
      "Secured client network infrastructure for local businesses as independent engagements.",
      "Designed and delivered security training curricula, roadmaps, and hands-on labs for individuals and small teams.",
    ],
    tools: ["Sigma", "YAML", "SIEM", "Threat Hunting", "VAPT"],
  },
  {
    id: "quest-glt",
    company: "Quest GLT",
    role: "Cybersecurity & Cloud Infrastructure Engineer",
    employmentType: "Contract",
    startDate: "2025-06",
    endDate: "2025-08",
    summary:
      "Blockchain security and cloud infrastructure consulting for an early-stage startup, including VAPT and IAM/cloud hardening for client platforms.",
    highlights: [
      "Provided blockchain security and cloud infrastructure consulting for an early-stage startup, including VAPT and threat assessment.",
      "Supported cloud security posture and IAM/IaaS hardening for client platforms.",
      "Designed and tuned Python/YAML-based detections for identity and cloud-native threats across AWS and Azure environments.",
      "Analyzed identity-based attack techniques — OAuth abuse, MFA bypass attempts, and privilege escalation — using cloud telemetry.",
      "Automated detection validation and enrichment workflows, improving signal context and investigation quality.",
      "Improved SIEM detection accuracy by ~25% through rule tuning, MITRE ATT&CK mapping, and coverage-gap analysis.",
    ],
    tools: ["AWS", "Azure", "Python", "YAML", "MITRE ATT&CK", "IAM"],
  },
  {
    id: "technoglobe",
    company: "Technoglobe",
    location: "Jaipur, Rajasthan",
    role: "SOC Analyst & Security Engineer",
    employmentType: "Full-time",
    startDate: "2025-02",
    endDate: "2025-06",
    highlights: [
      "Developed detection rules for ransomware activity, lateral movement, and identity-based threats.",
      "Led structured threat-hunting exercises using Splunk, Elastic, and Wazuh.",
      "Built automated incident response playbooks, reducing analyst workload by ~20%.",
      "Delivered corporate cybersecurity training programs for students and professionals, and executed freelance security projects for corporate clients under the Secureandcode brand.",
      "Prioritized detection quality over alert volume across SOC operations.",
    ],
    tools: ["Splunk", "Elastic", "Wazuh"],
  },
  {
    id: "rci-hyderabad",
    company: "RCI",
    location: "Hyderabad",
    role: "Cybersecurity Intern",
    employmentType: "Internship",
    startDate: "2023-06",
    endDate: "2023-08",
    highlights: [
      "Conducted OSINT, exploit analysis, and telemetry capture for red-team simulations.",
      "Mapped attack chains to MITRE ATT&CK and validated system logging and detection gaps.",
      "Gained attacker-centric perspective that continues to inform current detection engineering and threat-hunting work.",
    ],
    tools: ["OSINT", "MITRE ATT&CK"],
  },
];