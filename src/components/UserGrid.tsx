import { Link } from "@tanstack/react-router";
import type { GHUserMini } from "@/services/github";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function UserGrid({ users }: { users: GHUserMini[] }) {
  if (users.length === 0) return <div className="text-sm text-muted-foreground">No users to show.</div>;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {users.map((u, i) => (
        <motion.div
          key={u.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.015, 0.4) }}
          className="card-surface flex items-center gap-3 p-3 hover:border-primary/40"
        >
          <img src={u.avatar_url} alt={u.login} className="h-10 w-10 rounded-full border border-border" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{u.login}</div>
            <div className="flex items-center gap-2 text-xs">
              <Link
                to="/profile/$username"
                params={{ username: u.login }}
                className="text-primary hover:underline"
              >
                View
              </Link>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                GitHub <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
