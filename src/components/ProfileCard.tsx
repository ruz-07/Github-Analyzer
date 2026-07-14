import { motion } from "framer-motion";
import type { GHUser } from "@/services/github";
import {
  MapPin,
  Building2,
  LinkIcon,
  Twitter,
  CalendarDays,
  Users,
  UserPlus,
  BookMarked,
  ExternalLink,
  Heart,
  Copy,
  Share2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { developerScore, profileCompletion } from "@/utils/developerScore";
import type { GHRepo } from "@/services/github";
import { toast } from "sonner";
import { AnimatedCounter } from "./AnimatedCounter";

export function ProfileCard({ user, repos }: { user: GHUser; repos: GHRepo[] }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(user.login);
  const score = developerScore(user, repos);
  const completion = profileCompletion(user);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied");
  };
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `@${user.login} on GitHub`, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface overflow-hidden"
    >
      <div className="relative h-24 bg-linear-to-br from-primary/25 via-accent/15 to-transparent" />
      <div className="-mt-12 px-6 pb-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <motion.img
              whileHover={{ scale: 1.03 }}
              src={user.avatar_url}
              alt={user.login}
              className="h-24 w-24 shrink-0 rounded-2xl border-4 border-background object-cover shadow-lg"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-2xl font-bold">{user.name || user.login}</h1>
                {user.hireable && (
                  <span className="chip bg-success/15! text-success! border-success/30!">
                    Hireable
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">@{user.login}</div>
              {user.bio && <p className="mt-2 max-w-xl text-sm text-foreground/90">{user.bio}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => toggleFavorite(user.login)} className="btn-ghost text-sm">
              <Heart
                size={14}
                className="mr-1.5"
                fill={fav ? "currentColor" : "none"}
                color={fav ? "#f85149" : "currentColor"}
              />
              {fav ? "Saved" : "Save"}
            </button>
            <button onClick={copyLink} className="btn-ghost text-sm">
              <Copy size={14} className="mr-1.5" /> Copy
            </button>
            <button onClick={share} className="btn-ghost text-sm">
              <Share2 size={14} className="mr-1.5" /> Share
            </button>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              <ExternalLink size={14} className="mr-1.5 inline" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<Users size={14} />} label="Followers" value={user.followers} />
          <Stat icon={<UserPlus size={14} />} label="Following" value={user.following} />
          <Stat icon={<BookMarked size={14} />} label="Repos" value={user.public_repos} />
          <Stat icon={<BookMarked size={14} />} label="Gists" value={user.public_gists} />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <MetaBar label="Developer score" value={score} suffix="/100" tone="primary" />
          <MetaBar label="Profile completion" value={completion} suffix="%" tone="success" />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {user.company && <Info icon={<Building2 size={14} />}>{user.company}</Info>}
          {user.location && <Info icon={<MapPin size={14} />}>{user.location}</Info>}
          {user.blog && (
            <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer">
              <Info icon={<LinkIcon size={14} />}>
                <span className="text-primary hover:underline">{user.blog}</span>
              </Info>
            </a>
          )}
          {user.twitter_username && (
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noreferrer">
              <Info icon={<Twitter size={14} />}>
                <span className="text-primary hover:underline">@{user.twitter_username}</span>
              </Info>
            </a>
          )}
          <Info icon={<CalendarDays size={14} />}>
            Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </Info>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">
        <AnimatedCounter value={value} />
      </div>
    </div>
  );
}

function MetaBar({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: number;
  suffix: string;
  tone: "primary" | "success";
}) {
  const color = tone === "primary" ? "var(--primary)" : "var(--success)";
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function Info({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {children}
    </span>
  );
}
