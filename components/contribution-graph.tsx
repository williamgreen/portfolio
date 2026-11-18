import CommitGraph from "@/components/commit-graph";
import { getContributions } from "@/lib/contributions";

export default async function ContributionGraph() {
  const data = await getContributions();
  if (!data) return null;

  return (
    <section className="mb-16 flex flex-col gap-3">
      <CommitGraph days={data.days} />
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400 dark:text-neutral-600">Last 30 days</span>
        <span className="text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">
          {data.last30} contributions
        </span>
      </div>
      <div className="border-t border-dotted border-neutral-200 dark:border-neutral-700" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400 dark:text-neutral-600">Year to date</span>
        <span className="text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">
          {data.yearToDate} contributions
        </span>
      </div>
    </section>
  );
}
