export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  category: string;
  featured: boolean;
}

export const services: Service[] = [
  {
    id: "cloud-security",
    title: "Cloud Security Assessment",
    category: "Cloud Security",
    description:
      "Security review of AWS, Azure and GCP environments with focus on identity, access control, logging, misconfiguration and attack paths.",
    deliverables: [
      "Cloud security assessment",
      "IAM and privilege review",
      "Misconfiguration findings",
      "Risk-prioritised remediation plan",
    ],
    featured: true,
  },
  {
    id: "detection-engineering",
    title: "Detection Engineering",
    category: "SOC Operations",
    description:
      "Development and tuning of security detections for SIEM, endpoint and cloud telemetry using practical threat scenarios.",
    deliverables: [
      "Detection rule development",
      "MITRE ATT&CK mapping",
      "False-positive tuning",
      "Detection coverage review",
    ],
    featured: true,
  },
  {
    id: "security-research",
    title: "Security Research & Threat Intelligence",
    category: "Threat Research",
    description:
      "Research support for emerging threats, attack techniques, cloud abuse patterns and AI-related security risks.",
    deliverables: [
      "Threat research report",
      "Attack-path analysis",
      "Technical recommendations",
      "Executive summary",
    ],
    featured: true,
  },
  {
    id: "grc-advisory",
    title: "GRC & Security Documentation",
    category: "Governance",
    description:
      "Support for cybersecurity policies, risk registers, audit documentation and control mapping across major frameworks.",
    deliverables: [
      "Risk assessment",
      "Policy documentation",
      "Control mapping",
      "Audit-readiness support",
    ],
    featured: true,
  },
];