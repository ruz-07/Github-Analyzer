import type { GHRepo } from "@/services/github";
import { colorFor } from "@/utils/languageColors";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartTheme = {
  grid: "#21262d",
  axis: "#8b949e",
  tooltipBg: "#161b22",
  tooltipBorder: "#30363d",
};

const tooltipStyle = {
  backgroundColor: chartTheme.tooltipBg,
  border: `1px solid ${chartTheme.tooltipBorder}`,
  borderRadius: 8,
  fontSize: 12,
};

export function LanguagePie({ repos }: { repos: GHRepo[] }) {
  const counts: Record<string, number> = {};
  for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (data.length === 0) return <Empty label="No language data" />;

  return (
    <ChartCard title="Languages used" subtitle="Top languages across public repositories">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50} paddingAngle={2}>
            {data.map((d) => (
              <Cell key={d.name} fill={colorFor(d.name)} stroke="#0d1117" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, color: chartTheme.axis }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function StarsBar({ repos }: { repos: GHRepo[] }) {
  const data = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .map((r) => ({ name: r.name, stars: r.stargazers_count, forks: r.forks_count }));
  if (data.length === 0) return <Empty label="No repositories" />;
  return (
    <ChartCard title="Top repositories" subtitle="By stars, with forks overlay">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 40 }}>
          <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: chartTheme.axis, fontSize: 11 }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, color: chartTheme.axis }} />
          <Bar dataKey="stars" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="forks" fill="#3fb950" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function GrowthLine({ repos }: { repos: GHRepo[] }) {
  const buckets: Record<string, number> = {};
  for (const r of repos) {
    const key = r.created_at.slice(0, 7);
    buckets[key] = (buckets[key] || 0) + 1;
  }
  const sorted = Object.keys(buckets).sort();
  let running = 0;
  const data = sorted.map((k) => {
    running += buckets[k];
    return { month: k, repos: running };
  });
  if (data.length === 0) return <Empty label="No repositories" />;
  return (
    <ChartCard title="Repository growth" subtitle="Cumulative public repos over time">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 8 }}>
          <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: chartTheme.axis, fontSize: 11 }} />
          <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="repos" stroke="var(--primary)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SizeBar({ repos }: { repos: GHRepo[] }) {
  const data = [...repos]
    .sort((a, b) => b.size - a.size)
    .slice(0, 8)
    .map((r) => ({ name: r.name, mb: +(r.size / 1024).toFixed(1) }));
  if (data.length === 0) return <Empty label="No repositories" />;
  return (
    <ChartCard title="Largest repositories" subtitle="Repository size in MB">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 40 }}>
          <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: chartTheme.axis, fontSize: 11 }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="mb" fill="#a371f7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-4">
      <div className="mb-2">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="card-surface grid h-40 place-items-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
