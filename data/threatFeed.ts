export type ThreatSeverity = "Critical" | "High" | "Medium";

export interface ThreatFeedItem {
  id: string;
  time: string;
  title: string;
  description: string;
  severity: ThreatSeverity;
}

/*
  Illustrative portfolio demo data only.
  This is not connected to a real production threat feed.
*/
export const threatFeed: ThreatFeedItem[] = [
  {
    id: "cloud-identity",
    time: "19:03:12",
    title: "Cloud Identity Abuse",
    description: "Suspicious privilege escalation detected in AWS IAM",
    severity: "Critical",
  },
  {
    id: "ransomware",
    time: "19:02:45",
    title: "Ransomware Activity",
    description: "Lateral movement via SMB across internal network",
    severity: "High",
  },
  {
    id: "oauth",
    time: "19:02:10",
    title: "OAuth Application Risk",
    description: "Unusual consent permission request observed",
    severity: "Medium",
  },
  {
    id: "endpoint",
    time: "19:01:38",
    title: "Endpoint Anomaly",
    description: "Abnormal PowerShell execution chain detected",
    severity: "High",
  },
  {
    id: "malware-download",
    time: "19:01:02",
    title: "Malware Download",
    description: "Potential malware download from suspicious domain",
    severity: "Medium",
  },
];