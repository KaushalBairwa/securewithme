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
      "Windows workstation configured with enhanced logging, Sysmon telemetry and endpoint attack simulations.",
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
    status: "Building",
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
      "Centralised monitoring environment for log ingestion, threat detection, investigation and attack correlation.",
    status: "Building",
    technologies: [
      "Wazuh",
      "Elastic",
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
      "Discover exposed hosts, services, operating systems and potential attack paths across the simulated environment.",
    techniques: [
      "Port Scanning",
      "Service Enumeration",
      "OS Fingerprinting",
    ],
    status: "Available",
  },
  {
    id: "windows-detection",
    title: "Windows Attack Detection",
    category: "Detection Engineering",
    difficulty: "Intermediate",
    description:
      "Generate suspicious PowerShell and Windows activity, then identify it through Sysmon and SIEM telemetry.",
    techniques: [
      "PowerShell Logging",
      "Sysmon",
      "Sigma Rules",
    ],
    status: "Building",
  },
  {
    id: "active-directory-attack",
    title: "Active Directory Attack Path",
    category: "Identity Security",
    difficulty: "Advanced",
    description:
      "Map identity relationships and identify a controlled privilege-escalation route through the lab domain.",
    techniques: [
      "BloodHound",
      "Kerberos",
      "Privilege Escalation",
    ],
    status: "Building",
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
      "Safely simulate selected ransomware behaviours and develop behavioural detections without using real destructive malware.",
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