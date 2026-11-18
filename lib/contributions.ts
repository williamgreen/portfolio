export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionData {
  days: ContributionDay[];
  last30: number;
  yearToDate: number;
}

const GITHUB_USER = "williamgreen";

export async function getContributions(): Promise<ContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json: { contributions: ContributionDay[] } = await res.json();

    const today = new Date().toISOString().slice(0, 10);
    const all = json.contributions
      .filter((d) => d.date <= today)
      .map(({ date, count }) => ({ date, count }));
    if (all.length === 0) return null;

    const days = all.slice(-30);
    const year = today.slice(0, 4);
    return {
      days,
      last30: days.reduce((sum, d) => sum + d.count, 0),
      yearToDate: all
        .filter((d) => d.date.startsWith(year))
        .reduce((sum, d) => sum + d.count, 0),
    };
  } catch {
    return null;
  }
}
