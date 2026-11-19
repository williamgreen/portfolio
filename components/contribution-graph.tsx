import CommitGraph from "@/components/commit-graph";
import { getContributions } from "@/lib/contributions";

export default async function ContributionGraph() {
  const data = await getContributions();
  if (!data) return null;

  return (
    <section className="mb-16 flex w-full max-w-[320px] flex-col gap-3">
      <CommitGraph days={data.days} />
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#a1a1a1] dark:text-[#525252]">Last 30 days</span>
        <span className="text-xs text-[#a1a1a1] dark:text-[#525252] tabular-nums">
          {data.last30} contributions
        </span>
      </div>
      <div className="border-t border-dotted border-[#e5e5e5] dark:border-[#404040]" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#a1a1a1] dark:text-[#525252]">Year to date</span>
        <span className="text-xs text-[#a1a1a1] dark:text-[#525252] tabular-nums">
          {data.yearToDate} contributions
        </span>
      </div>
    </section>
  );
}
