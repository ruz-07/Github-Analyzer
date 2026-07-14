import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { useApp } from "@/context/AppContext";
import { Github, Sparkles, LineChart, GitCompareArrows, Heart, Trash2 } from "lucide-react";

const POPULAR = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj", "addyosmani", "kentcdodds", "sebmarkbage"];

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { recent, clearRecent, favorites } = useApp();
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
        >
          <Sparkles size={12} className="text-primary" /> Public GitHub data · no login required
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-balance text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Understand any{" "}
          <span className="bg-linear-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            GitHub profile
          </span>{" "}
          in seconds.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground"
        >
          Explore repositories, languages, followers, activity and a developer score — all rendered
          from the public GitHub REST API, right in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <SearchBar autoFocus />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Try popular</div>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR.map((u) => (
              <Link
                key={u}
                to="/profile/$username"
                params={{ username: u }}
                className="chip hover:border-primary/40! hover:text-foreground!"
              >
                <Github size={12} /> {u}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="pointer-events-none mx-auto mt-10 grid h-32 w-32 place-items-center rounded-full bg-primary/10 text-primary"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Github size={64} />
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        <PanelList
          title="Recent searches"
          items={recent}
          empty="Your recent lookups will appear here."
          onClear={recent.length ? clearRecent : undefined}
          icon={<Sparkles size={14} />}
        />
        <PanelList
          title="Favorites"
          items={favorites}
          empty="Save profiles from the analyzer to build a shortlist."
          icon={<Heart size={14} />}
        />
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Everything you need to size up a developer</h2>
          <p className="mt-2 text-sm text-muted-foreground">Fast, private, and beautifully visualized.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Feature
            icon={<LineChart className="text-primary" />}
            title="Deep statistics"
            body="Language mix, top repositories by stars and size, and repo growth over time."
          />
          <Feature
            icon={<GitCompareArrows className="text-primary" />}
            title="Side-by-side compare"
            body="Pit two developers against each other with charts and a highlighted winner."
          />
          <Feature
            icon={<Heart className="text-primary" />}
            title="Favorites & recents"
            body="Everything you save lives in your browser — no accounts, no tracking."
          />
        </div>
      </section>
    </div>
  );
}

function PanelList({
  title,
  items,
  empty,
  onClear,
  icon,
}: {
  title: string;
  items: string[];
  empty: string;
  onClear?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-sm font-semibold">
          {icon} {title}
        </div>
        {onClear && (
          <button onClick={onClear} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Trash2 size={12} /> Clear
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">{empty}</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((u) => (
            <Link
              key={u}
              to="/profile/$username"
              params={{ username: u }}
              className="chip hover:border-primary/40! hover:text-foreground!"
            >
              <Github size={12} /> {u}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card-surface p-5"
    >
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/10">{icon}</div>
      <div className="mb-1 font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{body}</div>
    </motion.div>
  );
}
