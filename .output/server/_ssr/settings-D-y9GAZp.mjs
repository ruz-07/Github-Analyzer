import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as Check, o as Trash2, p as Palette } from "../_libs/lucide-react.mjs";
import { n as useApp } from "./AppContext-CQgsX5ue.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-D-y9GAZp.js
var import_jsx_runtime = require_jsx_runtime();
var ACCENTS = [
	{
		name: "GitHub Blue",
		value: "#58a6ff"
	},
	{
		name: "Iris",
		value: "#a371f7"
	},
	{
		name: "Emerald",
		value: "#3fb950"
	},
	{
		name: "Amber",
		value: "#d29922"
	},
	{
		name: "Coral",
		value: "#f78166"
	},
	{
		name: "Rose",
		value: "#f85149"
	}
];
function Settings() {
	const { accent, setAccent, clearAll } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Configure appearance and manage locally stored data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 inline-flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { size: 14 }), " Theme"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 text-xs text-muted-foreground",
								children: "The app is optimized for a dark GitHub-style theme."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), " Dark"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip opacity-50",
									children: "Light (coming soon)"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-sm font-semibold",
								children: "Accent color"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 text-xs text-muted-foreground",
								children: "Applies across buttons, links and charts."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [ACCENTS.map((a) => {
									const active = a.value.toLowerCase() === accent.toLowerCase();
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setAccent(a.value),
										className: `flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${active ? "border-primary bg-secondary" : "border-border hover:border-primary/50"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-4 w-4 rounded-full ring-2 ring-background",
												style: { background: a.value }
											}),
											a.name,
											active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												size: 12,
												className: "text-primary"
											})
										]
									}, a.value);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm",
									children: ["Custom", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: accent,
										onChange: (e) => setAccent(e.target.value),
										className: "h-6 w-8 cursor-pointer bg-transparent"
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-sm font-semibold",
								children: "Local data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 text-xs text-muted-foreground",
								children: "Recent searches, favorites and preferences are stored in your browser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									clearAll();
									toast.success("Cleared local data");
								},
								className: "btn-ghost inline-flex text-sm text-destructive! hover:border-destructive/40!",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									size: 14,
									className: "mr-1.5"
								}), " Clear all local data"]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Settings as component };
