import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Github, Heart, GitCompareArrows, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/compare", label: "Compare", icon: GitCompareArrows },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 text-foreground"
        >
          <motion.span
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary"
          >
            <Github size={18} />
          </motion.span>
          <div className="text-left">
            <div className="text-sm font-semibold leading-none">GH Analyzer</div>
            <div className="text-[10px] tracking-wider text-muted-foreground">PROFILE INSIGHTS</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
            const Icon = "icon" in l ? l.icon : null;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {Icon ? <Icon size={14} /> : null}
                  {l.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-md bg-secondary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost hidden sm:inline-flex text-sm"
        >
          <Github size={14} className="mr-1.5" /> GitHub
        </a>
      </div>
    </header>
  );
}
