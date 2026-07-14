import { o as __toESM } from "../_runtime.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as ChartLine, b as GitCompareArrows, c as Sparkles, d as Search, g as Heart, o as Trash2, v as Github } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useApp } from "./AppContext-CQgsX5ue.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CRc6uaeB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchBar({ autoFocus = false, size = "lg" }) {
	const [q, setQ] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const { addRecent } = useApp();
	const onSubmit = (e) => {
		e.preventDefault();
		const login = q.trim();
		if (!login) return;
		addRecent(login);
		navigate({
			to: "/profile/$username",
			params: { username: login }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: `glass flex items-center gap-2 rounded-2xl border border-border p-2 ${size === "lg" ? "shadow-[0_20px_60px_-20px_rgba(88,166,255,0.35)]" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "ml-2 text-muted-foreground",
				size: size === "lg" ? 20 : 16
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Enter a GitHub username, e.g. torvalds",
				className: `w-full bg-transparent outline-none placeholder:text-muted-foreground ${size === "lg" ? "py-3 text-base" : "py-1.5 text-sm"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "btn-primary shrink-0",
				children: "Analyze"
			})
		]
	});
}
var POPULAR = [
	"torvalds",
	"gaearon",
	"sindresorhus",
	"yyx990803",
	"tj",
	"addyosmani",
	"kentcdodds",
	"sebmarkbage"
];
function Home() {
	const { recent, clearRecent, favorites } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-4 pt-16 pb-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 12,
						className: "text-primary"
					}), " Public GitHub data · no login required"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .05 },
					className: "text-balance text-4xl font-bold tracking-tight sm:text-6xl",
					children: [
						"Understand any",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-linear-to-r from-primary via-primary to-accent bg-clip-text text-transparent",
							children: "GitHub profile"
						}),
						" ",
						"in seconds."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { delay: .15 },
					className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground",
					children: "Explore repositories, languages, followers, activity and a developer score — all rendered from the public GitHub REST API, right in your browser."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .25 },
					className: "mx-auto mt-8 max-w-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, { autoFocus: true })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: { delay: .35 },
					className: "mx-auto mt-8 max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-xs uppercase tracking-wider text-muted-foreground",
						children: "Try popular"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-2",
						children: POPULAR.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profile/$username",
							params: { username: u },
							className: "chip hover:border-primary/40! hover:text-foreground!",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 12 }),
								" ",
								u
							]
						}, u))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .85
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { delay: .4 },
					className: "pointer-events-none mx-auto mt-10 grid h-32 w-32 place-items-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { y: [
							0,
							-6,
							0
						] },
						transition: {
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 64 })
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelList, {
				title: "Recent searches",
				items: recent,
				empty: "Your recent lookups will appear here.",
				onClear: recent.length ? clearRecent : void 0,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelList, {
				title: "Favorites",
				items: favorites,
				empty: "Save profiles from the analyzer to build a shortlist.",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 14 })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto mt-16 max-w-6xl px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold sm:text-3xl",
					children: "Everything you need to size up a developer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Fast, private, and beautifully visualized."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "text-primary" }),
						title: "Deep statistics",
						body: "Language mix, top repositories by stars and size, and repo growth over time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompareArrows, { className: "text-primary" }),
						title: "Side-by-side compare",
						body: "Pit two developers against each other with charts and a highlighted winner."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "text-primary" }),
						title: "Favorites & recents",
						body: "Everything you save lives in your browser — no accounts, no tracking."
					})
				]
			})]
		})
	] });
}
function PanelList({ title, items, empty, onClear, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 text-sm font-semibold",
				children: [
					icon,
					" ",
					title
				]
			}), onClear && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onClear,
				className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " Clear"]
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: items.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/profile/$username",
				params: { username: u },
				className: "chip hover:border-primary/40! hover:text-foreground!",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { size: 12 }),
					" ",
					u
				]
			}, u))
		})]
	});
}
function Feature({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -2 },
		className: "card-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/10",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: body
			})
		]
	});
}
//#endregion
export { Home as component };
