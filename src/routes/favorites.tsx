import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { Heart, X, Github } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
  const { favorites, toggleFavorite } = useApp();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="inline-flex items-center gap-2 text-3xl font-bold">
          <Heart className="text-destructive" /> Favorites
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Profiles you&apos;ve saved. Stored locally in your browser.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-secondary">
            <Heart className="text-muted-foreground" />
          </div>
          <div className="font-semibold">No favorites yet</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Analyze a profile and tap Save to add it here.
          </div>
          <Link to="/" className="btn-primary mt-4 inline-flex">Find developers</Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {favorites.map((u, i) => (
            <motion.div
              key={u}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card-surface flex items-center justify-between gap-3 p-3 hover:border-primary/40"
            >
              <Link
                to="/profile/$username"
                params={{ username: u }}
                className="flex min-w-0 items-center gap-3"
              >
                <img
                  src={`https://avatars.githubusercontent.com/${u}`}
                  alt={u}
                  className="h-10 w-10 rounded-full border border-border"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{u}</div>
                  <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Github size={11} /> View profile
                  </div>
                </div>
              </Link>
              <button
                onClick={() => toggleFavorite(u)}
                aria-label="Remove"
                className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
