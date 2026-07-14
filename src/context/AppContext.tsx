import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Ctx = {
  recent: string[];
  addRecent: (u: string) => void;
  clearRecent: () => void;
  favorites: string[];
  toggleFavorite: (u: string) => void;
  isFavorite: (u: string) => boolean;
  accent: string;
  setAccent: (c: string) => void;
  clearAll: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [recent, setRecent] = useLocalStorage<string[]>("gh:recent", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("gh:favs", []);
  const [accent, setAccent] = useLocalStorage<string>("gh:accent", "#58a6ff");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--primary", accent);
      document.documentElement.style.setProperty("--ring", accent);
    }
  }, [accent]);

  const addRecent = useCallback(
    (u: string) => {
      const login = u.trim();
      if (!login) return;
      setRecent((r) => [login, ...r.filter((x) => x.toLowerCase() !== login.toLowerCase())].slice(0, 8));
    },
    [setRecent],
  );

  const toggleFavorite = useCallback(
    (u: string) => {
      setFavorites((f) =>
        f.includes(u) ? f.filter((x) => x !== u) : [u, ...f].slice(0, 50),
      );
    },
    [setFavorites],
  );

  const value = useMemo<Ctx>(
    () => ({
      recent,
      addRecent,
      clearRecent: () => setRecent([]),
      favorites,
      toggleFavorite,
      isFavorite: (u) => favorites.includes(u),
      accent,
      setAccent,
      clearAll: () => {
        setRecent([]);
        setFavorites([]);
        setAccent("#58a6ff");
      },
    }),
    [recent, addRecent, setRecent, favorites, toggleFavorite, accent, setAccent],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
