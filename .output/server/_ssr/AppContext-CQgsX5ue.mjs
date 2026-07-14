import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppContext-CQgsX5ue.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useLocalStorage(key, initial) {
	const [value, setValue] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return initial;
		try {
			const raw = window.localStorage.getItem(key);
			return raw ? JSON.parse(raw) : initial;
		} catch {
			return initial;
		}
	});
	(0, import_react.useEffect)(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	}, [key, value]);
	return [value, setValue];
}
var AppCtx = (0, import_react.createContext)(null);
function AppProvider({ children }) {
	const [recent, setRecent] = useLocalStorage("gh:recent", []);
	const [favorites, setFavorites] = useLocalStorage("gh:favs", []);
	const [accent, setAccent] = useLocalStorage("gh:accent", "#58a6ff");
	(0, import_react.useEffect)(() => {
		if (typeof document !== "undefined") {
			document.documentElement.style.setProperty("--primary", accent);
			document.documentElement.style.setProperty("--ring", accent);
		}
	}, [accent]);
	const addRecent = (0, import_react.useCallback)((u) => {
		const login = u.trim();
		if (!login) return;
		setRecent((r) => [login, ...r.filter((x) => x.toLowerCase() !== login.toLowerCase())].slice(0, 8));
	}, [setRecent]);
	const toggleFavorite = (0, import_react.useCallback)((u) => {
		setFavorites((f) => f.includes(u) ? f.filter((x) => x !== u) : [u, ...f].slice(0, 50));
	}, [setFavorites]);
	const value = (0, import_react.useMemo)(() => ({
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
		}
	}), [
		recent,
		addRecent,
		setRecent,
		favorites,
		toggleFavorite,
		accent,
		setAccent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppCtx.Provider, {
		value,
		children
	});
}
function useApp() {
	const ctx = (0, import_react.useContext)(AppCtx);
	if (!ctx) throw new Error("useApp must be used within AppProvider");
	return ctx;
}
//#endregion
export { useApp as n, AppProvider as t };
