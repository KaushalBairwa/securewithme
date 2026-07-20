export interface SecurityMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
  progress?: number;
}

export const securityMetrics: SecurityMetric[] = [
  {
    id: "experience",
    label: "Years Experience",
    value: 3,
    suffix: "+",
    description: "Cloud, SOC and security engineering",
  },
  {
    id: "projects",
    label: "Security Projects",
    value: 10,
    suffix: "+",
    description: "Research, labs and security platforms",
  },
  {
    id: "students",
    label: "Students Trained",
    value: 20,
    suffix: "+",
    description: "Practical cybersecurity training",
  },
  {
    id: "workshops",
    label: "Workshops Delivered",
    value: 5,
    suffix: "+",
    description: "Corporate and technical workshops",
  },
];

export const capabilityMetrics = [
  {
    label: "Cloud Security",
    value: 90,
  },
  {
    label: "Detection Engineering",
    value: 88,
  },
  {
    label: "AI Security",
    value: 82,
  },
  {
    label: "Threat Hunting",
    value: 86,
  },
];