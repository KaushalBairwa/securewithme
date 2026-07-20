"use client";

import { useCallback, useEffect, useState } from "react";

export type LiveThreatSeverity =
  | "Critical"
  | "High"
  | "Medium";

export interface LiveThreatItem {
  id: string;
  title: string;
  description: string;
  severity: LiveThreatSeverity;
  source: string;
  dateAdded: string;
  cve: string;
  ransomwareUse: boolean;
}

interface ThreatApiResponse {
  source: string;
  isLivePublicData: boolean;
  mapIsIllustrative: boolean;
  lastUpdated?: string;
  totalCount?: number;
  vulnerabilities: LiveThreatItem[];
  error?: string;
}

interface ThreatFeedState {
  data: ThreatApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useThreatFeed() {
  const [state, setState] = useState<ThreatFeedState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadThreats = useCallback(async () => {
    try {
      setState((current) => ({
        ...current,
        isLoading: true,
        error: null,
      }));

      const response = await fetch("/api/threats", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          "Public threat intelligence is unavailable.",
        );
      }

      const data =
        (await response.json()) as ThreatApiResponse;

      setState({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load threat intelligence.",
      });
    }
  }, []);

  useEffect(() => {
    void loadThreats();

    const refreshTimer = window.setInterval(() => {
      void loadThreats();
    }, 15 * 60 * 1000);

    return () => {
      window.clearInterval(refreshTimer);
    };
  }, [loadThreats]);

  return {
    ...state,
    refresh: loadThreats,
  };
}