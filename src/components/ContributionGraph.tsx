import type { GHEvent } from "@/services/github";
import { useMemo } from "react";

/**
 * Approximate contribution heatmap using public events (last ~90 days).
 * GitHub's true contribution graph requires GraphQL with auth; we use
 * public event counts as a client-only proxy.
 */
export function ContributionGraph({ events }: { events: GHEvent[] }) {
  const { grid, total, maxDay } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of events) {
      const day = e.created_at.slice(0, 10);
      const weight = e.type === "PushEvent" ? (e.payload.commits?.length || 1) : 1;
      counts.set(day, (counts.get(day) || 0) + weight);
    }

    const weeks = 15;
    const days: { date: string; count: number }[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const start = new Date(now);
    start.setDate(start.getDate() - (weeks * 7 - 1));

    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: counts.get(key) || 0 });
    }

    const grid: { date: string; count: number }[][] = [];
    for (let w = 0; w < weeks; w++) grid.push(days.slice(w * 7, w * 7 + 7));

    const total = days.reduce((s, d) => s + d.count, 0);
    const maxDay = days.reduce((m, d) => (d.count > m.count ? d : m), { date: "", count: 0 });

    return { grid, total, maxDay };
  }, [events]);

  const level = (n: number) => {
    if (n === 0) return "bg-secondary/60";
    if (n < 2) return "bg-primary/25";
    if (n < 5) return "bg-primary/50";
    if (n < 10) return "bg-primary/75";
    return "bg-primary";
  };

  return (
    <div className="card-surface p-4">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold">Recent activity</div>
          <div className="text-xs text-muted-foreground">
            ~{total} public actions in the last {grid.length} weeks
            {maxDay.date && ` · busiest: ${new Date(maxDay.date).toLocaleDateString()} (${maxDay.count})`}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          Less
          {[0, 1, 3, 6, 12].map((n) => (
            <span key={n} className={`h-3 w-3 rounded-sm ${level(n)}`} />
          ))}
          More
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.count} events`}
                className={`h-3.5 w-3.5 rounded-sm ${level(d.count)} transition-transform hover:scale-125`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
