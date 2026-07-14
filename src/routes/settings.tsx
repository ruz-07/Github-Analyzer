import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { Palette, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

const ACCENTS = [
  { name: "GitHub Blue", value: "#58a6ff" },
  { name: "Iris", value: "#a371f7" },
  { name: "Emerald", value: "#3fb950" },
  { name: "Amber", value: "#d29922" },
  { name: "Coral", value: "#f78166" },
  { name: "Rose", value: "#f85149" },
];

function Settings() {
  const { accent, setAccent, clearAll } = useApp();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Configure appearance and manage locally stored data.
      </p>

      <div className="mt-8 space-y-6">
        <section className="card-surface p-5">
          <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold">
            <Palette size={14} /> Theme
          </div>
          <div className="mb-4 text-xs text-muted-foreground">
            The app is optimized for a dark GitHub-style theme.
          </div>
          <div className="flex items-center gap-2">
            <span className="chip">
              <span className="h-2 w-2 rounded-full bg-primary" /> Dark
            </span>
            <span className="chip opacity-50">Light (coming soon)</span>
          </div>
        </section>

        <section className="card-surface p-5">
          <div className="mb-1 text-sm font-semibold">Accent color</div>
          <div className="mb-4 text-xs text-muted-foreground">
            Applies across buttons, links and charts.
          </div>
          <div className="flex flex-wrap gap-3">
            {ACCENTS.map((a) => {
              const active = a.value.toLowerCase() === accent.toLowerCase();
              return (
                <button
                  key={a.value}
                  onClick={() => setAccent(a.value)}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                    active ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="h-4 w-4 rounded-full ring-2 ring-background" style={{ background: a.value }} />
                  {a.name}
                  {active && <Check size={12} className="text-primary" />}
                </button>
              );
            })}
            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              Custom
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-6 w-8 cursor-pointer bg-transparent"
              />
            </label>
          </div>
        </section>

        <section className="card-surface p-5">
          <div className="mb-1 text-sm font-semibold">Local data</div>
          <div className="mb-4 text-xs text-muted-foreground">
            Recent searches, favorites and preferences are stored in your browser.
          </div>
          <button
            onClick={() => {
              clearAll();
              toast.success("Cleared local data");
            }}
            className="btn-ghost inline-flex text-sm text-destructive! hover:border-destructive/40!"
          >
            <Trash2 size={14} className="mr-1.5" /> Clear all local data
          </button>
        </section>
      </div>
    </div>
  );
}
