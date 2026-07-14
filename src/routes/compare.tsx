import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { github, type GHRepo, type GHUser } from "@/services/github";
import { developerScore } from "@/utils/developerScore";
import { Search, Trophy, Users, BookMarked, Star, GitFork, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Loader } from "@/components/Skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/compare")({
  component: Compare,
});

function Compare() {
  const [a, setA] = useState("torvalds");
  const [b, setB] = useState("gaearon");
  const [pair, setPair] = useState<[string, string] | null>(["torvalds", "gaearon"]);

  const enabled = !!pair;
  const a0 = pair?.[0] ?? "";
  const b0 = pair?.[1] ?? "";
  const results = useQueries({
    queries: [
      { queryKey: ["user", a0], queryFn: () => github.user(a0), enabled, retry: 1 },
      { queryKey: ["repos", a0], queryFn: () => github.repos(a0), enabled, retry: 1 },
      { queryKey: ["user", b0], queryFn: () => github.user(b0), enabled, retry: 1 },
      { queryKey: ["repos", b0], queryFn: () => github.repos(b0), enabled, retry: 1 },
    ],
  });
  const [uA, rA, uB, rB] = results;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (a.trim() && b.trim()) setPair([a.trim(), b.trim()]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Compare developers</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter two GitHub usernames to see them head to head.</p>
      </div>

      <form onSubmit={submit} className="mx-auto mb-8 grid max-w-3xl gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Field value={a} onChange={setA} placeholder="First username" />
        <Field value={b} onChange={setB} placeholder="Second username" />
        <button className="btn-primary">Compare</button>
      </form>

      {pair && (
        <>
          {(uA.isLoading || uB.isLoading || rA.isLoading || rB.isLoading) && (
            <div className="flex justify-center py-10"><Loader label="Fetching" /></div>
          )}
          {(uA.error || uB.error) && (
            <div className="card-surface p-6 text-center text-sm text-destructive">
              Could not load one of the profiles. Check the usernames and try again.
            </div>
          )}
          {uA.data && uB.data && rA.data && rB.data && (
            <ComparePanels ua={uA.data} ub={uB.data} ra={rA.data} rb={rB.data} />
          )}
        </>
      )}
    </div>
  );
}

function Field({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="glass flex items-center gap-2 rounded-md border border-border px-3 py-2">
      <Search size={14} className="text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function ComparePanels({ ua, ub, ra, rb }: { ua: GHUser; ub: GHUser; ra: GHRepo[]; rb: GHRepo[] }) {
  const starsA = ra.reduce((s, r) => s + r.stargazers_count, 0);
  const starsB = rb.reduce((s, r) => s + r.stargazers_count, 0);
  const forksA = ra.reduce((s, r) => s + r.forks_count, 0);
  const forksB = rb.reduce((s, r) => s + r.forks_count, 0);
  const scoreA = developerScore(ua, ra);
  const scoreB = developerScore(ub, rb);
  const langsA = new Set(ra.map((r) => r.language).filter(Boolean)).size;
  const langsB = new Set(rb.map((r) => r.language).filter(Boolean)).size;

  const winner = scoreA === scoreB ? null : scoreA > scoreB ? ua.login : ub.login;

  const rows = [
    { label: "Followers", icon: <Users size={14} />, a: ua.followers, b: ub.followers },
    { label: "Repos", icon: <BookMarked size={14} />, a: ua.public_repos, b: ub.public_repos },
    { label: "Total stars", icon: <Star size={14} />, a: starsA, b: starsB },
    { label: "Total forks", icon: <GitFork size={14} />, a: forksA, b: forksB },
    { label: "Languages", icon: <BookMarked size={14} />, a: langsA, b: langsB },
    { label: "Joined", icon: <Calendar size={14} />, a: new Date(ua.created_at).getFullYear(), b: new Date(ub.created_at).getFullYear(), lowerBetter: true },
    { label: "Developer score", icon: <Trophy size={14} />, a: scoreA, b: scoreB },
  ];

  const chartData = [
    { metric: "Followers", [ua.login]: ua.followers, [ub.login]: ub.followers },
    { metric: "Repos", [ua.login]: ua.public_repos, [ub.login]: ub.public_repos },
    { metric: "Stars", [ua.login]: starsA, [ub.login]: starsB },
    { metric: "Forks", [ua.login]: forksA, [ub.login]: forksB },
    { metric: "Score", [ua.login]: scoreA, [ub.login]: scoreB },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <UserHead user={ua} winner={winner === ua.login} />
        <UserHead user={ub} winner={winner === ub.login} />
      </div>

      <div className="card-surface overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-1 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">
          <div>Metric</div>
          <div className="text-right">{ua.login}</div>
          <div className="text-center opacity-40">vs</div>
          <div className="text-right">{ub.login}</div>
        </div>
        <div>
          {rows.map((r) => {
            const aWins = r.lowerBetter ? r.a < r.b : r.a > r.b;
            const bWins = r.lowerBetter ? r.b < r.a : r.b > r.a;
            return (
              <div key={r.label} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-t border-border px-4 py-3">
                <div className="inline-flex items-center gap-2 text-sm">{r.icon} {r.label}</div>
                <div className={`text-right font-semibold ${aWins ? "text-primary" : ""}`}>{r.a.toLocaleString()}</div>
                <div className="text-center text-xs text-muted-foreground">·</div>
                <div className={`text-right font-semibold ${bWins ? "text-primary" : ""}`}>{r.b.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-surface p-4">
        <div className="mb-2 text-sm font-semibold">Head-to-head</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
            <CartesianGrid stroke="#21262d" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="metric" tick={{ fill: "#8b949e", fontSize: 11 }} />
            <YAxis tick={{ fill: "#8b949e", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#8b949e" }} />
            <Bar dataKey={ua.login} fill="var(--primary)" radius={[6, 6, 0, 0]} />
            <Bar dataKey={ub.login} fill="#a371f7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {winner && (
        <div className="card-surface flex items-center justify-center gap-2 p-4 text-sm">
          <Trophy className="text-warning" size={16} />
          <span className="font-semibold">@{winner}</span> takes the higher developer score.
        </div>
      )}
    </motion.div>
  );
}

function UserHead({ user, winner }: { user: GHUser; winner: boolean }) {
  return (
    <div className={`card-surface flex items-center gap-4 p-4 ${winner ? "border-primary/60! shadow-(--shadow-glow)" : ""}`}>
      <img src={user.avatar_url} alt={user.login} className="h-16 w-16 rounded-xl border border-border" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate font-semibold">{user.name || user.login}</div>
          {winner && <span className="chip bg-primary/15! text-primary! border-primary/30!"><Trophy size={11} /> Leader</span>}
        </div>
        <div className="text-xs text-muted-foreground">@{user.login}</div>
        {user.bio && <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{user.bio}</div>}
      </div>
    </div>
  );
}
