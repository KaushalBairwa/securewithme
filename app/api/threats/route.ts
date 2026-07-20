import { NextResponse } from "next/server";

interface CisaVulnerability {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
}

interface CisaKevResponse {
  title: string;
  catalogVersion: string;
  dateReleased: string;
  count: number;
  vulnerabilities: CisaVulnerability[];
}

export interface PublicThreatItem {
  id: string;
  title: string;
  description: string;
  severity: "Critical" | "High" | "Medium";
  source: string;
  dateAdded: string;
  cve: string;
  ransomwareUse: boolean;
}

const CISA_KEV_URL =
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

export async function GET() {
  try {
    const response = await fetch(CISA_KEV_URL, {
      next: {
        revalidate: 3600,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `CISA request failed with status ${response.status}`,
      );
    }

    const data = (await response.json()) as CisaKevResponse;

    const vulnerabilities = [...data.vulnerabilities]
      .sort(
        (first, second) =>
          new Date(second.dateAdded).getTime() -
          new Date(first.dateAdded).getTime(),
      )
      .slice(0, 8)
      .map<PublicThreatItem>((item) => {
        const ransomwareUse =
          item.knownRansomwareCampaignUse
            .trim()
            .toLowerCase() === "known";

        return {
          id: item.cveID,
          title: item.vulnerabilityName,
          description: `${item.vendorProject} ${item.product} — ${item.shortDescription}`,
          severity: ransomwareUse ? "Critical" : "High",
          source: "CISA KEV",
          dateAdded: item.dateAdded,
          cve: item.cveID,
          ransomwareUse,
        };
      });

    return NextResponse.json({
      source: "CISA Known Exploited Vulnerabilities",
      isLivePublicData: true,
      mapIsIllustrative: true,
      lastUpdated: data.dateReleased,
      totalCount: data.count,
      vulnerabilities,
    });
  } catch (error) {
    console.error("Unable to fetch CISA KEV data:", error);

    return NextResponse.json(
      {
        source: "CISA Known Exploited Vulnerabilities",
        isLivePublicData: false,
        mapIsIllustrative: true,
        error: "Threat intelligence is temporarily unavailable.",
        vulnerabilities: [],
      },
      {
        status: 503,
      },
    );
  }
}