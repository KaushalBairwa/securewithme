export type LabNodeStatus =
  | "Online"
  | "Building"
  | "Planned";

export interface LabNode {
  id: string;
  title: string;
  shortName: string;
  category: string;
  description: string;
  status: LabNodeStatus;
  technologies: string[];
  position: {
    x: number;
    y: number;
  };
}

export interface LabScenario {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  techniques: string[];
  status: "Available" | "Building" | "Planned";
  duration?: string;
  exercises?: number;
  environment?: string;
  platform?: string;
  launchUrl?: string;
  walkthroughUrl?: string;
}

export const labNodes: LabNode[] = [
  {
    id: "attacker",
    title: "Kali Linux Attacker",
    shortName: "KALI",
    category: "Offensive Security",
    description:
      "Primary offensive workstation used for reconnaissance, vulnerability validation, exploitation and adversary simulation.",
    status: "Online",
    technologies: [
      "Kali Linux",
      "Nmap",
      "Burp Suite",
      "Metasploit",
    ],
    position: {
      x: 10,
      y: 42,
    },
  },
  {
    id: "firewall",
    title: "Security Gateway",
    shortName: "GATEWAY",
    category: "Network Security",
    description:
      "Controlled gateway for segmentation, traffic monitoring and simulated perimeter-security policies.",
    status: "Building",
    technologies: [
      "Firewall",
      "IDS/IPS",
      "Network Segmentation",
    ],
    position: {
      x: 34,
      y: 42,
    },
  },
  {
    id: "windows",
    title: "Windows Enterprise Endpoint",
    shortName: "WIN-11",
    category: "Endpoint Security",
    description:
      "Windows workstation represented through realistic Sysmon, PowerShell and Windows Security telemetry for controlled investigation exercises.",
    status: "Online",
    technologies: [
      "Windows 11",
      "Sysmon",
      "PowerShell",
      "Event Logs",
    ],
    position: {
      x: 58,
      y: 18,
    },
  },
  {
    id: "ubuntu",
    title: "Ubuntu Application Server",
    shortName: "UBUNTU",
    category: "Server Security",
    description:
      "Linux server hosting intentionally vulnerable services, application workloads and infrastructure telemetry.",
    status: "Online",
    technologies: [
      "Ubuntu Server",
      "Docker",
      "Nginx",
      "OpenSSH",
    ],
    position: {
      x: 58,
      y: 65,
    },
  },
  {
    id: "active-directory",
    title: "Active Directory Lab",
    shortName: "AD-DC",
    category: "Identity Security",
    description:
      "Enterprise identity environment for privilege escalation, credential attacks and access-control testing.",
    status: "Online",
    technologies: [
      "Active Directory",
      "Kerberos",
      "BloodHound",
      "Group Policy",
    ],
    position: {
      x: 80,
      y: 18,
    },
  },
  {
    id: "siem",
    title: "Detection & Monitoring",
    shortName: "SIEM",
    category: "Blue Team",
    description:
      "Centralised monitoring environment for log analysis, threat detection, investigation and attack correlation.",
    status: "Online",
    technologies: [
      "Wazuh",
      "Sysmon",
      "Sigma",
      "MITRE ATT&CK",
    ],
    position: {
      x: 80,
      y: 65,
    },
  },
];

export const labScenarios: LabScenario[] = [
  {
    id: "reconnaissance",
    title: "External Attack-Surface Discovery",
    category: "Reconnaissance",
    difficulty: "Beginner",
    description:
      "Map a controlled target, discover exposed TCP services, fingerprint the web server, locate hidden content and retrieve the final assessment flag.",
    techniques: [
      "Nmap Scanning",
      "Service Enumeration",
      "HTTP Analysis",
      "Hidden Path Discovery",
      "Netcat",
      "Attack-Surface Mapping",
    ],
    status: "Available",
    duration: "25â€“35 minutes",
    exercises: 6,
    environment: "Disposable Ubuntu browser terminal",
    platform: "Killercoda",
    launchUrl:
      "https://killercoda.com/kaushalkumar/scenario/external-attack-surface",
  },
  {
    id: "windows-detection",
    title: "Suspicious PowerShell Detection",
    category: "Detection Engineering",
    difficulty: "Intermediate",
    description:
      "Investigate a suspicious Microsoft Office-to-PowerShell execution chain using prepared Sysmon, Windows Security, PowerShell Script Block and Wazuh telemetry.",
    techniques: [
      "PowerShell Logging",
      "Sysmon",
      "Windows Event 4688",
      "Sigma Rules",
      "Wazuh",
      "MITRE ATT&CK",
    ],
    status: "Available",
    duration: "30â€“40 minutes",
    exercises: 8,
    environment: "Browser-based SOC investigation",
    platform: "Killercoda",
    launchUrl:
      "https://killercoda.com/kaushalkumar/scenario/powershell-detection",
  },
  {
    id: "active-directory-attack",
    title: "Active Directory Attack-Path Investigation",
    category: "Identity Security",
    difficulty: "Advanced",
    description:
      "Analyse controlled identity relationships and identify the shortest privilege-escalation path to a domain controller.",
    techniques: [
      "BloodHound-Style Analysis",
      "Identity Relationships",
      "Privilege Escalation",
      "Attack-Path Mapping",
    ],
    status: "Building",
    duration: "30â€“45 minutes",
    exercises: 7,
    environment: "Browser-based identity investigation",
    platform: "Killercoda",
  },
  {
    id: "linux-compromise",
    title: "Linux Server Compromise",
    category: "Offensive Security",
    difficulty: "Intermediate",
    description:
      "Exploit an intentionally vulnerable Linux service and investigate the resulting activity from the defensive platform.",
    techniques: [
      "Vulnerability Validation",
      "Linux Logs",
      "Incident Investigation",
    ],
    status: "Planned",
  },
  {
    id: "ransomware-simulation",
    title: "Ransomware Behaviour Simulation",
    category: "Threat Detection",
    difficulty: "Advanced",
    description:
      "Safely simulate selected ransomware behaviours and develop behavioural detections without using destructive malware.",
    techniques: [
      "File Behaviour",
      "Process Monitoring",
      "Detection Tuning",
    ],
    status: "Planned",
  },
  {
    id: "cloud-identity",
    title: "Cloud Identity Misconfiguration",
    category: "Cloud Security",
    difficulty: "Advanced",
    description:
      "Investigate risky permissions, identity misuse and cloud audit events in a controlled cloud-security scenario.",
    techniques: [
      "IAM Analysis",
      "CloudTrail",
      "Privilege Review",
    ],
    status: "Planned",
  },
];