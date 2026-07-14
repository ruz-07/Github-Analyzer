import { o as __toESM } from "../_runtime.mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { i as require_jsx_runtime, r as require_react, t as useQueries } from "../_libs/react+tanstack__react-query.mjs";
import { i as github, r as developerScore, t as Loader } from "./Skeleton-BaqNmrL8.mjs";
import { O as Calendar, a as Trophy, d as Search, j as BookMarked, n as Users, s as Star, y as GitFork } from "../_libs/lucide-react.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, n as BarChart, p as Legend, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-Dq0DsIl1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Compare() {
	const [a, setA] = (0, import_react.useState)("torvalds");
	const [b, setB] = (0, import_react.useState)("gaearon");
	const [pair, setPair] = (0, import_react.useState)(["torvalds", "gaearon"]);
	const enabled = !!pair;
	const a0 = pair?.[0] ?? "";
	const b0 = pair?.[1] ?? "";
	const [uA, rA, uB, rB] = useQueries({ queries: [
		{
			queryKey: ["user", a0],
			queryFn: () => github.user(a0),
			enabled,
			retry: 1
		},
		{
			queryKey: ["repos", a0],
			queryFn: () => github.repos(a0),
			enabled,
			retry: 1
		},
		{
			queryKey: ["user", b0],
			queryFn: () => github.user(b0),
			enabled,
			retry: 1
		},
		{
			queryKey: ["repos", b0],
			queryFn: () => github.repos(b0),
			enabled,
			retry: 1
		}
	] });
	const submit = (e) => {
		e.preventDefault();
		if (a.trim() && b.trim()) setPair([a.trim(), b.trim()]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					children: "Compare developers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Enter two GitHub usernames to see them head to head."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mx-auto mb-8 grid max-w-3xl gap-3 md:grid-cols-[1fr_1fr_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						value: a,
						onChange: setA,
						placeholder: "First username"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						value: b,
						onChange: setB,
						placeholder: "Second username"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						children: "Compare"
					})
				]
			}),
			pair && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				(uA.isLoading || uB.isLoading || rA.isLoading || rB.isLoading) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Fetching" })
				}),
				(uA.error || uB.error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-surface p-6 text-center text-sm text-destructive",
					children: "Could not load one of the profiles. Check the usernames and try again."
				}),
				uA.data && uB.data && rA.data && rB.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparePanels, {
					ua: uA.data,
					ub: uB.data,
					ra: rA.data,
					rb: rB.data
				})
			] })
		]
	});
}
function Field({ value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass flex items-center gap-2 rounded-md border border-border px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			size: 14,
			className: "text-muted-foreground"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
		})]
	});
}
function ComparePanels({ ua, ub, ra, rb }) {
	const starsA = ra.reduce((s, r) => s + r.stargazers_count, 0);
	const starsB = rb.reduce((s, r) => s + r.stargazers_count, 0);
	const forksA = ra.reduce((s, r) => s + r.forks_count, 0);
	const forksB = rb.reduce((s, r) => s + r.forks_count, 0);
	const scoreA = developerScore(ua, ra);
	const scoreB = developerScore(ub, rb);
	const langsA = new Set(ra.map((r) => r.language).filter(Boolean)).size;
	const langsB = new Set(rb.map((r) => r.language).filter(Boolean)).size;
	const winner = scoreA === scoreB ? null : scoreA > scoreB ? ua.login : ub.login;
	const rows = [
		{
			label: "Followers",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }),
			a: ua.followers,
			b: ub.followers
		},
		{
			label: "Repos",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { size: 14 }),
			a: ua.public_repos,
			b: ub.public_repos
		},
		{
			label: "Total stars",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 14 }),
			a: starsA,
			b: starsB
		},
		{
			label: "Total forks",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, { size: 14 }),
			a: forksA,
			b: forksB
		},
		{
			label: "Languages",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { size: 14 }),
			a: langsA,
			b: langsB
		},
		{
			label: "Joined",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 14 }),
			a: new Date(ua.created_at).getFullYear(),
			b: new Date(ub.created_at).getFullYear(),
			lowerBetter: true
		},
		{
			label: "Developer score",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { size: 14 }),
			a: scoreA,
			b: scoreB
		}
	];
	const chartData = [
		{
			metric: "Followers",
			[ua.login]: ua.followers,
			[ub.login]: ub.followers
		},
		{
			metric: "Repos",
			[ua.login]: ua.public_repos,
			[ub.login]: ub.public_repos
		},
		{
			metric: "Stars",
			[ua.login]: starsA,
			[ub.login]: starsB
		},
		{
			metric: "Forks",
			[ua.login]: forksA,
			[ub.login]: forksB
		},
		{
			metric: "Score",
			[ua.login]: scoreA,
			[ub.login]: scoreB
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserHead, {
					user: ua,
					winner: winner === ua.login
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserHead, {
					user: ub,
					winner: winner === ub.login
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-1 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Metric" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: ua.login
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center opacity-40",
							children: "vs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: ub.login
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: rows.map((r) => {
					const aWins = r.lowerBetter ? r.a < r.b : r.a > r.b;
					const bWins = r.lowerBetter ? r.b < r.a : r.b > r.a;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 border-t border-border px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-sm",
								children: [
									r.icon,
									" ",
									r.label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-right font-semibold ${aWins ? "text-primary" : ""}`,
								children: r.a.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center text-xs text-muted-foreground",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-right font-semibold ${bWins ? "text-primary" : ""}`,
								children: r.b.toLocaleString()
							})
						]
					}, r.label);
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-sm font-semibold",
					children: "Head-to-head"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 300,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						margin: {
							top: 8,
							right: 8,
							left: -18,
							bottom: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#21262d",
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "metric",
								tick: {
									fill: "#8b949e",
									fontSize: 11
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
								fill: "#8b949e",
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								backgroundColor: "#161b22",
								border: "1px solid #30363d",
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
								fontSize: 11,
								color: "#8b949e"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: ua.login,
								fill: "var(--primary)",
								radius: [
									6,
									6,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: ub.login,
								fill: "#a371f7",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})]
			}),
			winner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface flex items-center justify-center gap-2 p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
						className: "text-warning",
						size: 16
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: ["@", winner]
					}),
					" takes the higher developer score."
				]
			})
		]
	});
}
function UserHead({ user, winner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `card-surface flex items-center gap-4 p-4 ${winner ? "border-primary/60! shadow-(--shadow-glow)" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: user.avatar_url,
			alt: user.login,
			className: "h-16 w-16 rounded-xl border border-border"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-semibold",
						children: user.name || user.login
					}), winner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "chip bg-primary/15! text-primary! border-primary/30!",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { size: 11 }), " Leader"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: ["@", user.login]
				}),
				user.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
					children: user.bio
				})
			]
		})]
	});
}
//#endregion
export { Compare as component };
