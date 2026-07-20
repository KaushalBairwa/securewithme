export type ReportSeverity =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export interface ReportFinding {
  id: string;
  title: string;
  severity: ReportSeverity;
  cvss?: number;
  summary: string;
  recommendation: string;
}

export interface ReportMethodologyPhase {
  title: string;
  description: string;
}

export interface RemediationLevel {
  level: string;
  focus: string;
  findingsClosed: string;
  estimatedCost: string;
}

export interface ClientReport {
  id: string;
  title: string;
  shortTitle: string;
  client: string;
  consultancy: string;
  engagementType: string;
  assessmentWindow: string;
  industry: string;
  environment: string;
  reportDate: string;
  description: string;
  status: string;
  totalFindings: number;
  attackSurface: {
    subdomains: string;
    indexedAssets: string;
  };
  severitySummary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  executiveSummary: string[];
  keyOutcomes: string[];
  scope: string[];
  methodology: ReportMethodologyPhase[];
  findings: ReportFinding[];
  remediationRoadmap: RemediationLevel[];
  conclusion: string[];
}

export const clientReports: ClientReport[] = [
  {
    id: "sample-vapt-2025",

    title:
      "Vulnerability Assessment & Penetration Test Report",

    shortTitle: "Web, Cloud & Blockchain VAPT",

    client: "Client Identity Redacted",

    consultancy:
      "Secureandcode — Independent Cybersecurity Consultancy",

    engagementType:
      "Web Application VAPT, Cloud Infrastructure Review & Attack Surface Audit",

    assessmentWindow: "Q3 2025",

    industry: "Web3 / Blockchain Technology",

    environment:
      "Public Web Application, Node.js APIs, AWS EC2 and Blockchain Services",

    reportDate: "Q3 2025",

    description:
      "A sanitised sample demonstrating the structure, technical depth and remediation approach used during a web application, cloud infrastructure and blockchain security assessment.",

    status: "Sanitised Sample",

    totalFindings: 15,

    attackSurface: {
      subdomains: "17+",
      indexedAssets: "400+",
    },

    severitySummary: {
      critical: 5,
      high: 2,
      medium: 4,
      low: 4,
    },

    executiveSummary: [
      "The engagement assessed the external web application, cloud infrastructure and subdomain attack surface of a platform combining a public website, Node.js and Express APIs, blockchain bridge services and Ethereum-compatible testnet infrastructure hosted on AWS EC2.",

      "Testing combined automated vulnerability scanning, manual verification, API and NoSQL injection testing, attack-surface analysis and blockchain-specific exposure testing.",

      "The assessment identified 15 distinct findings spanning internet-facing infrastructure exposure, missing security controls and application-layer weaknesses.",
    ],

    keyOutcomes: [
      "Five critical or high-severity CVEs affecting the production web server were identified and addressed through version upgrades and configuration hardening.",

      "More than 17 publicly resolvable subdomains were identified and reviewed. Unused staging, testnet and bridge services were decommissioned or placed behind authentication.",

      "Sensitive credential and key-related file types were found accessible from the web root and removed within 24 hours of disclosure.",

      "An unauthenticated blockchain RPC endpoint was restricted to localhost and placed behind a controlled access layer.",

      "A three-tier remediation roadmap enabled approximately 70% of findings to be addressed without additional infrastructure costs.",
    ],

    scope: [
      "Public client-facing website and dashboard",

      "Node.js and Express backend APIs",

      "Associated microservices",

      "More than 17 subdomains identified during reconnaissance",

      "Blockchain bridge, faucet and Ethereum-compatible testnet RPC services",

      "AWS EC2 infrastructure, security groups and IAM configuration",
    ],

    methodology: [
      {
        title: "Phase 1 — Reconnaissance & Enumeration",
        description:
          "Subdomain discovery, DNS and WHOIS analysis, technology fingerprinting, exposed-service review and CDN or WAF posture assessment.",
      },
      {
        title:
          "Phase 2 — Automated Scanning & Manual Verification",
        description:
          "CVE-mapped vulnerability scanning, security-header analysis, sensitive-file checks, directory-listing review and manual validation.",
      },
      {
        title: "Phase 3 — API & Injection Testing",
        description:
          "Input-validation fuzzing, NoSQL injection probing, HTTP-method abuse testing and error-handling or information-disclosure analysis.",
      },
      {
        title:
          "Phase 4 — Blockchain-Specific Testing",
        description:
          "RPC exposure analysis, bridge and faucet authentication review and blockchain administrative module access testing.",
      },
    ],

    findings: [
      {
        id: "cve-2024-38476",
        title: "CVE-2024-38476 — Apache HTTP Server",
        severity: "Critical",
        cvss: 9.8,
        summary:
          "Affected Apache versions could allow malicious response headers to trigger information disclosure, server-side request forgery or local script execution.",
        recommendation:
          "Upgrade Apache HTTP Server to version 2.4.60 or later.",
      },
      {
        id: "cve-2024-38474",
        title: "CVE-2024-38474 — Substitution Encoding",
        severity: "Critical",
        cvss: 9.8,
        summary:
          "A substitution-encoding weakness could permit script execution in directories that should otherwise remain restricted.",
        recommendation:
          "Upgrade Apache and remove unsafe RewriteRule configurations.",
      },
      {
        id: "cve-2023-25690",
        title: "CVE-2023-25690 — HTTP Request Smuggling",
        severity: "Critical",
        cvss: 9.8,
        summary:
          "Unsafe RewriteRules used with mod_proxy could enable HTTP request-smuggling attacks.",
        recommendation:
          "Upgrade Apache, sanitise RewriteRules and disable affected proxy rules.",
      },
      {
        id: "cve-2024-38475",
        title: "CVE-2024-38475 — Unsafe URL Mapping",
        severity: "Critical",
        cvss: 9.1,
        summary:
          "Improper output escaping could allow URLs to map to unintended filesystem locations.",
        recommendation:
          "Upgrade Apache and disable unsafe substitution functionality.",
      },
      {
        id: "cve-2022-36760",
        title: "CVE-2022-36760 — AJP Request Smuggling",
        severity: "Critical",
        cvss: 9,
        summary:
          "Inconsistent HTTP parsing in mod_proxy_ajp could enable request-smuggling behaviour.",
        recommendation:
          "Patch to the latest release or disable AJP proxying.",
      },
      {
        id: "sensitive-files",
        title: "Sensitive key and credential files exposed",
        severity: "High",
        summary:
          "Files using extensions associated with private keys, certificates, Java keystores and deployment archives were accessible from the web root.",
        recommendation:
          "Remove exposed files immediately, block sensitive extensions and add pre-deployment secret scanning.",
      },
      {
        id: "blockchain-rpc",
        title: "Unauthenticated blockchain RPC endpoint",
        severity: "High",
        summary:
          "A Geth-compatible testnet and bridge RPC service was publicly reachable without suitable access restrictions.",
        recommendation:
          "Bind RPC services to localhost, restrict enabled modules and place access behind a VPN or Zero-Trust control.",
      },
      {
        id: "directory-listing",
        title: "Directory listing enabled",
        severity: "Medium",
        summary:
          "Several asset directories publicly displayed their complete contents.",
        recommendation:
          "Disable indexing through web-server configuration.",
      },
      {
        id: "verbose-errors",
        title: "Verbose error and stack-trace disclosure",
        severity: "Medium",
        summary:
          "Malformed API requests returned internal file paths and framework stack traces.",
        recommendation:
          "Enable production error handling and return standardised API error responses.",
      },
      {
        id: "mixed-content",
        title: "Mixed HTTP and HTTPS content",
        severity: "Medium",
        summary:
          "Some assets were served over unencrypted HTTP despite the main application using HTTPS.",
        recommendation:
          "Force HTTPS globally and replace hardcoded insecure links.",
      },
      {
        id: "http-methods",
        title: "Unrestricted HTTP methods",
        severity: "Medium",
        summary:
          "Endpoints accepted unsupported request methods and produced verbose error responses.",
        recommendation:
          "Enforce method-based routing and return HTTP 405 for unsupported methods.",
      },
      {
        id: "security-headers",
        title: "Missing security headers",
        severity: "Low",
        summary:
          "HSTS, CSP, X-Frame-Options and X-Content-Type-Options were absent from several responses.",
        recommendation:
          "Deploy suitable security-header middleware or equivalent server directives.",
      },
      {
        id: "smtp-banner",
        title: "SMTP banner disclosure",
        severity: "Low",
        summary:
          "The mail server banner revealed software and version information.",
        recommendation:
          "Use a generic SMTP banner and enforce modern TLS.",
      },
      {
        id: "email-authentication",
        title: "Incomplete SPF, DKIM and DMARC",
        severity: "Low",
        summary:
          "A basic SPF policy existed, but DKIM signing and an enforced DMARC policy were not confirmed.",
        recommendation:
          "Implement DKIM and progressively deploy a DMARC enforcement policy.",
      },
      {
        id: "whois-exposure",
        title: "Partial WHOIS and registrar exposure",
        severity: "Low",
        summary:
          "Registrar and DNS-provider metadata remained publicly visible despite the use of a privacy proxy.",
        recommendation:
          "Enable registrar-level domain locking and DNSSEC where supported.",
      },
    ],

    remediationRoadmap: [
      {
        level: "Level 1",
        focus:
          "Infrastructure hardening, SSH key-only authentication, security-group lockdown, Apache upgrades and exposed-file cleanup.",
        findingsClosed: "9 of 15",
        estimatedCost: "$0",
      },
      {
        level: "Level 2",
        focus:
          "Application hardening, security headers, input validation, CSRF protection, token rotation and CORS restrictions.",
        findingsClosed: "4 of 15",
        estimatedCost: "$0 infrastructure cost",
      },
      {
        level: "Level 3",
        focus:
          "Continuous security monitoring, WAF, GuardDuty, VPN or Zero-Trust access, host IDS and central cloud audit logging.",
        findingsClosed: "2 of 15",
        estimatedCost: "$80–$170 per month",
      },
    ],

    conclusion: [
      "The assessment revealed an external attack surface substantially larger than the client’s internal inventory, including more than 17 subdomains, more than 400 indexed endpoints and five critical CVEs affecting internet-facing infrastructure.",

      "All critical and high findings were remediated during the engagement window, and the organisation retained a documented security baseline for recurring reassessment.",

      "The displayed report is redacted. Raw scan output, proof-of-concept requests and client-specific configuration information remain protected under NDA.",
    ],
  },
];