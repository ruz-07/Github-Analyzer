import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { github } from "@/services/github";
import { ProfileCard } from "@/components/ProfileCard";
import { RepoCard } from "@/components/RepoCard";
import { UserGrid } from "@/components/UserGrid";
import { LanguagePie, StarsBar, GrowthLine, SizeBar } from "@/components/Charts";
import { ContributionGraph } from "@/components/ContributionGraph";
import { Skeleton, Loader } from "@/components/Skeleton";
import { AlertCircle, Search, Star, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/profile/$username")({
  component: Profile,
});

type Tab = "overview" | "repos" | "followers" | "following" | "stats";
type Sort = "updated" | "created" | "stars" | "forks" | "name";

function Profile() {
  const { username } = Route.useParams();

  const results = useQueries({
    queries: [
      { queryKey: ["user", username], queryFn: () => github.user(username), retry: 1 },
      { queryKey: ["repos", username], queryFn: () => github.repos(username), retry: 1 },
      { queryKey: ["followers", username], queryFn: () => github.followers(username), retry: 1 },
      { queryKey: ["following", username], queryFn: () => github.following(username), retry: 1 },
      { queryKey: ["events", username], queryFn: () => github.events(username), retry: 1 },
    ],
  });
  const [userQ, reposQ, followersQ, followingQ, eventsQ] = results;

  const [tab, setTab] = useState<Tab>("overview");
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<string>("");
  const [sort, setSort] = useState<Sort>("updated");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const repos = reposQ.data ?? [];
  const languages = useMemo(() => {
    const s = new Set<string>();
    repos.forEach((r) => r.language && s.add(r.language));
    return Array.from(s).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    let list = [...repos];
    if (q) list = list.filter((r) => (r.name + " " + (r.description || "")).toLowerCase().includes(q.toLowerCase()));
    if (lang) list = list.filter((r) => r.language === lang);
    list.sort((a, b) => {
      switch (sort) {
        case "stars": return b.stargazers_count - a.stargazers_count;
        case "forks": return b.forks_count - a.forks_count;
        case "name": return a.name.localeCompare(b.name);
        case "created": return +new Date(b.created_at) - +new Date(a.created_at);
        default: return +new Date(b.updated_at) - +new Date(a.updated_at);
      }
    });
    return list;
  }, [repos, q, lang, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  if (userQ.isLoading) return <LoadingScreen />;

  if (userQ.error || !userQ.data) {
    return <ErrorScreen error={userQ.error as Error | null} username={username} onRetry={() => userQ.refetch()} />;
  }

  const user = userQ.data;
  const pinned = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ProfileCard user={user} repos={repos} />

      <div className="sticky top-14.25 z-30 -mx-4 mt-6 border-b border-border bg-background/70 px-4 backdrop-blur">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {(["overview", "repos", "followers", "following", "stats"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative shrink-0 px-4 py-3 text-sm capitalize transition-colors ${
                tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              {t === "followers" && <span className="ml-1 text-xs text-muted-foreground">({user.followers})</span>}
              {t === "following" && <span className="ml-1 text-xs text-muted-foreground">({user.following})</span>}
              {t === "repos" && <span className="ml-1 text-xs text-muted-foreground">({user.public_repos})</span>}
              {tab === t && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "overview" && (
              <div className="space-y-6">
                {eventsQ.data && <ContributionGraph events={eventsQ.data} />}
                {pinned.length > 0 && (
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold">
                      <Star size={14} className="text-warning" /> Top repositories
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {pinned.map((r) => <RepoCard key={r.id} repo={r} />)}
                    </div>
                  </div>
                )}
                <LanguagePie repos={repos} />
              </div>
            )}

            {tab === "repos" && (
              <div className="space-y-4">
                <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
                  <div className="glass flex items-center gap-2 rounded-md border border-border px-3 py-2">
                    <Search size={14} className="text-muted-foreground" />
                    <input
                      value={q}
                      onChange={(e) => { setQ(e.target.value); setPage(1); }}
                      placeholder="Search repositories"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <select
                    value={lang}
                    onChange={(e) => { setLang(e.target.value); setPage(1); }}
                    className="rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                  >
                    <option value="">All languages</option>
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm">
                    <ArrowUpDown size={14} className="text-muted-foreground" />
                    <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent outline-none">
                      <option value="updated">Newest updated</option>
                      <option value="created">Newest created</option>
                      <option value="stars">Most stars</option>
                      <option value="forks">Most forks</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>

                {reposQ.isLoading ? (
                  <RepoGridSkeleton />
                ) : filtered.length === 0 ? (
                  <div className="card-surface p-8 text-center text-sm text-muted-foreground">
                    No repositories match your filters.
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {paged.map((r) => <RepoCard key={r.id} repo={r} />)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground">
                        {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-ghost py-1! text-sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                          Prev
                        </button>
                        <span className="chip">{page} / {totalPages}</span>
                        <button className="btn-ghost py-1! text-sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {tab === "followers" && (
              followersQ.isLoading ? <Loader label="Loading followers" /> :
              <UserGrid users={followersQ.data ?? []} />
            )}
            {tab === "following" && (
              followingQ.isLoading ? <Loader label="Loading following" /> :
              <UserGrid users={followingQ.data ?? []} />
            )}
            {tab === "stats" && (
              <div className="grid gap-4 lg:grid-cols-2">
                <LanguagePie repos={repos} />
                <StarsBar repos={repos} />
                <GrowthLine repos={repos} />
                <SizeBar repos={repos} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        <Link to="/compare" className="hover:text-foreground">Compare @{user.login} with another developer →</Link>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="card-surface p-6">
        <div className="flex gap-4">
          <Skeleton className="h-24 w-24 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
        </div>
      </div>
      <RepoGridSkeleton className="mt-6" />
    </div>
  );
}

function RepoGridSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
    </div>
  );
}

function ErrorScreen({ error, username, onRetry }: { error: Error | null; username: string; onRetry: () => void }) {
  const status = (error as unknown as { response?: { status?: number } })?.response?.status;
  const isNotFound = status === 404;
  const isRateLimit = status === 403;
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-destructive/15 text-destructive">
        <AlertCircle />
      </div>
      <h1 className="text-2xl font-bold">
        {isNotFound ? "User not found" : isRateLimit ? "Rate limit reached" : "Something went wrong"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isNotFound
          ? <>No GitHub user with the login <span className="text-foreground">@{username}</span>.</>
          : isRateLimit
          ? "The unauthenticated GitHub API allows ~60 requests/hour per IP. Please try again later."
          : error?.message || "The GitHub API request failed."}
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={onRetry} className="btn-primary">Retry</button>
        <Link to="/" className="btn-ghost">Search another</Link>
      </div>
    </div>
  );
}
