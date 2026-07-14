import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";

export function SearchBar({ autoFocus = false, size = "lg" }: { autoFocus?: boolean; size?: "lg" | "md" }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { addRecent } = useApp();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const login = q.trim();
    if (!login) return;
    addRecent(login);
    navigate({ to: "/profile/$username", params: { username: login } });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`glass flex items-center gap-2 rounded-2xl border border-border p-2 ${
        size === "lg" ? "shadow-[0_20px_60px_-20px_rgba(88,166,255,0.35)]" : ""
      }`}
    >
      <Search className="ml-2 text-muted-foreground" size={size === "lg" ? 20 : 16} />
      <input
        autoFocus={autoFocus}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Enter a GitHub username, e.g. torvalds"
        className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${
          size === "lg" ? "py-3 text-base" : "py-1.5 text-sm"
        }`}
      />
      <button type="submit" className="btn-primary shrink-0">
        Analyze
      </button>
    </form>
  );
}
