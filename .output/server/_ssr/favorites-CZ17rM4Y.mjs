import { n as motion } from "../_libs/framer-motion.mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Heart, t as X, v as Github } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useApp } from "./AppContext-CQgsX5ue.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CZ17rM4Y.js
var import_jsx_runtime = require_jsx_runtime();
function Favorites() {
	const { favorites, toggleFavorite } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "inline-flex items-center gap-2 text-3xl font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "text-destructive" }), " Favorites"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Profiles you've saved. Stored locally in your browser."
			})]
		}), favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-surface p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: "No favorites yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Analyze a profile and tap Save to add it here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn-primary mt-4 inline-flex",
					children: "Find developers"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: favorites.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .03 },
				className: "card-surface flex items-center justify-between gap-3 p-3 hover:border-primary/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/profile/$username",
					params: { username: u },
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `https://avatars.githubusercontent.com/${u}`,
						alt: u,
						className: "h-10 w-10 rounded-full border border-border"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-semibold",
							children: u
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 11 }), " View profile"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => toggleFavorite(u),
					"aria-label": "Remove",
					className: "rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				})]
			}, u))
		})]
	});
}
//#endregion
export { Favorites as component };
