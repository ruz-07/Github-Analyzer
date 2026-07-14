import { motion } from "framer-motion";
import type { GHRepo } from "@/services/github";
import { Star, GitFork, Eye, CircleDot, Scale, ExternalLink, HardDrive } from "lucide-react";
import { colorFor } from "@/utils/languageColors";

export function RepoCard({ repo }: { repo: GHRepo }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="card-surface flex h-full flex-col gap-3 p-4 hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 truncate text-base font-semibold text-primary hover:underline"
        >
          {repo.name}
        </a>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Open repository in new tab"
        >
          <ExternalLink size={14} />
        </a>
      </div>
      {repo.description ? (
        <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
      ) : (
        <p className="text-sm italic text-muted-foreground/60">No description</p>
      )}

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="chip bg-primary/10! text-primary! border-primary/20!">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: colorFor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star size={12} /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork size={12} /> {repo.forks_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <Eye size={12} /> {repo.watchers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <CircleDot size={12} /> {repo.open_issues_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <HardDrive size={12} /> {(repo.size / 1024).toFixed(1)} MB
        </span>
        {repo.license?.name && (
          <span className="inline-flex items-center gap-1">
            <Scale size={12} /> {repo.license.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn-ghost py-1! px-2! text-xs">
          Visit
        </a>
      </div>
    </motion.div>
  );
}
