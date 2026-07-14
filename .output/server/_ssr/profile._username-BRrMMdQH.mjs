import { o as __toESM } from "../_runtime.mjs";
import { n as motion, r as AnimatePresence, t as animate } from "../_libs/framer-motion.mjs";
import { i as require_jsx_runtime, r as require_react, t as useQueries } from "../_libs/react+tanstack__react-query.mjs";
import { a as profileCompletion, i as github, n as Skeleton, r as developerScore, t as Loader } from "./Skeleton-BaqNmrL8.mjs";
import { A as Building2, C as Copy, M as ArrowUpDown, S as ExternalLink, T as CircleAlert, _ as HardDrive, d as Search, f as Scale, g as Heart, h as Link, i as Twitter, j as BookMarked, k as CalendarDays, l as Share2, m as MapPin, n as Users, r as UserPlus, s as Star, w as CircleDot, x as Eye, y as GitFork } from "../_libs/lucide-react.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as BarChart, o as Line, p as Legend, r as LineChart, s as CartesianGrid, t as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { g as Link$1 } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useApp } from "./AppContext-CQgsX5ue.mjs";
import { t as Route } from "./profile._username-B29Rjm-0.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._username-BRrMMdQH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimatedCounter({ value, duration = 1.2 }) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	const prev = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const controls = animate(prev.current, value, {
			duration,
			ease: "easeOut",
			onUpdate: (v) => setDisplay(v)
		});
		prev.current = value;
		return () => controls.stop();
	}, [value, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Math.round(display).toLocaleString() });
}
function ProfileCard({ user, repos }) {
	const { isFavorite, toggleFavorite } = useApp();
	const fav = isFavorite(user.login);
	const score = developerScore(user, repos);
	const completion = profileCompletion(user);
	const copyLink = async () => {
		await navigator.clipboard.writeText(window.location.href);
		toast.success("Profile link copied");
	};
	const share = async () => {
		const url = window.location.href;
		if (navigator.share) try {
			await navigator.share({
				title: `@${user.login} on GitHub`,
				url
			});
		} catch {}
		else {
			await navigator.clipboard.writeText(url);
			toast.success("Link copied");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "card-surface overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative h-24 bg-linear-to-br from-primary/25 via-accent/15 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mt-12 px-6 pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							whileHover: { scale: 1.03 },
							src: user.avatar_url,
							alt: user.login,
							className: "h-24 w-24 shrink-0 rounded-2xl border-4 border-background object-cover shadow-lg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "truncate text-2xl font-bold",
										children: user.name || user.login
									}), user.hireable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "chip bg-success/15! text-success! border-success/30!",
										children: "Hireable"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["@", user.login]
								}),
								user.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm text-foreground/90",
									children: user.bio
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggleFavorite(user.login),
								className: "btn-ghost text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 14,
									className: "mr-1.5",
									fill: fav ? "currentColor" : "none",
									color: fav ? "#f85149" : "currentColor"
								}), fav ? "Saved" : "Save"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: copyLink,
								className: "btn-ghost text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									size: 14,
									className: "mr-1.5"
								}), " Copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: share,
								className: "btn-ghost text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
									size: 14,
									className: "mr-1.5"
								}), " Share"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: user.html_url,
								target: "_blank",
								rel: "noreferrer",
								className: "btn-primary text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									size: 14,
									className: "mr-1.5 inline"
								}), "View on GitHub"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }),
							label: "Followers",
							value: user.followers
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 14 }),
							label: "Following",
							value: user.following
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { size: 14 }),
							label: "Repos",
							value: user.public_repos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { size: 14 }),
							label: "Gists",
							value: user.public_gists
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaBar, {
						label: "Developer score",
						value: score,
						suffix: "/100",
						tone: "primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaBar, {
						label: "Profile completion",
						value: completion,
						suffix: "%",
						tone: "success"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
					children: [
						user.company && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 14 }),
							children: user.company
						}),
						user.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }),
							children: user.location
						}),
						user.blog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`,
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { size: 14 }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary hover:underline",
									children: user.blog
								})
							})
						}),
						user.twitter_username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://twitter.com/${user.twitter_username}`,
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { size: 14 }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary hover:underline",
									children: ["@", user.twitter_username]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 14 }),
							children: ["Joined ", new Date(user.created_at).toLocaleDateString(void 0, {
								month: "long",
								year: "numeric"
							})]
						})
					]
				})
			]
		})]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-secondary/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-xs text-muted-foreground",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xl font-semibold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value })
		})]
	});
}
function MetaBar({ label, value, suffix, tone }) {
	const color = tone === "primary" ? "var(--primary)" : "var(--success)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-secondary/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-semibold",
				children: [value, suffix]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 h-1.5 overflow-hidden rounded-full bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { width: 0 },
				animate: { width: `${Math.min(100, value)}%` },
				transition: {
					duration: .8,
					ease: "easeOut"
				},
				className: "h-full",
				style: { background: color }
			})
		})]
	});
}
function Info({ icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [icon, children]
	});
}
var languageColors = {
	JavaScript: "#f1e05a",
	TypeScript: "#3178c6",
	Python: "#3572A5",
	Java: "#b07219",
	"C++": "#f34b7d",
	C: "#555555",
	"C#": "#178600",
	Go: "#00ADD8",
	Rust: "#dea584",
	Ruby: "#701516",
	PHP: "#4F5D95",
	Swift: "#F05138",
	Kotlin: "#A97BFF",
	Dart: "#00B4AB",
	HTML: "#e34c26",
	CSS: "#563d7c",
	SCSS: "#c6538c",
	Shell: "#89e051",
	Vue: "#41b883",
	Svelte: "#ff3e00",
	Astro: "#ff5a03",
	Elixir: "#6e4a7e",
	Haskell: "#5e5086",
	Lua: "#000080",
	R: "#198CE7",
	Scala: "#c22d40",
	Perl: "#0298c3",
	ObjectiveC: "#438eff",
	Zig: "#ec915c"
};
var colorFor = (lang) => lang && languageColors[lang] || "#8b949e";
function RepoCard({ repo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: { y: -3 },
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 24
		},
		className: "card-surface flex h-full flex-col gap-3 p-4 hover:border-primary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: repo.html_url,
					target: "_blank",
					rel: "noreferrer",
					className: "min-w-0 truncate text-base font-semibold text-primary hover:underline",
					children: repo.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: repo.html_url,
					target: "_blank",
					rel: "noreferrer",
					className: "shrink-0 text-muted-foreground hover:text-foreground",
					"aria-label": "Open repository in new tab",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })
				})]
			}),
			repo.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm text-muted-foreground",
				children: repo.description
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm italic text-muted-foreground/60",
				children: "No description"
			}),
			repo.topics?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: repo.topics.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip bg-primary/10! text-primary! border-primary/20!",
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground",
				children: [
					repo.language && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2.5 w-2.5 rounded-full",
							style: { background: colorFor(repo.language) }
						}), repo.language]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 12 }),
							" ",
							repo.stargazers_count
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, { size: 12 }),
							" ",
							repo.forks_count
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 12 }),
							" ",
							repo.watchers_count
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { size: 12 }),
							" ",
							repo.open_issues_count
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 12 }),
							" ",
							(repo.size / 1024).toFixed(1),
							" MB"
						]
					}),
					repo.license?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { size: 12 }),
							" ",
							repo.license.name
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[11px] text-muted-foreground/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Updated ", new Date(repo.updated_at).toLocaleDateString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: repo.html_url,
					target: "_blank",
					rel: "noreferrer",
					className: "btn-ghost py-1! px-2! text-xs",
					children: "Visit"
				})]
			})
		]
	});
}
function UserGrid({ users }) {
	if (users.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-sm text-muted-foreground",
		children: "No users to show."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
		children: users.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { delay: Math.min(i * .015, .4) },
			className: "card-surface flex items-center gap-3 p-3 hover:border-primary/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: u.avatar_url,
				alt: u.login,
				className: "h-10 w-10 rounded-full border border-border"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-medium",
					children: u.login
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						to: "/profile/$username",
						params: { username: u.login },
						className: "text-primary hover:underline",
						children: "View"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: u.html_url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground",
						children: ["GitHub ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 10 })]
					})]
				})]
			})]
		}, u.id))
	});
}
var chartTheme = {
	grid: "#21262d",
	axis: "#8b949e",
	tooltipBg: "#161b22",
	tooltipBorder: "#30363d"
};
var tooltipStyle = {
	backgroundColor: chartTheme.tooltipBg,
	border: `1px solid ${chartTheme.tooltipBorder}`,
	borderRadius: 8,
	fontSize: 12
};
function LanguagePie({ repos }) {
	const counts = {};
	for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
	const data = Object.entries(counts).map(([name, value]) => ({
		name,
		value
	})).sort((a, b) => b.value - a.value).slice(0, 8);
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "No language data" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title: "Languages used",
		subtitle: "Top languages across public repositories",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 260,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "name",
					outerRadius: 90,
					innerRadius: 50,
					paddingAngle: 2,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
						fill: colorFor(d.name),
						stroke: "#0d1117"
					}, d.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
					fontSize: 11,
					color: chartTheme.axis
				} })
			] })
		})
	});
}
function StarsBar({ repos }) {
	const data = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10).map((r) => ({
		name: r.name,
		stars: r.stargazers_count,
		forks: r.forks_count
	}));
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "No repositories" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title: "Top repositories",
		subtitle: "By stars, with forks overlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 280,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: -18,
					bottom: 40
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: chartTheme.grid,
						strokeDasharray: "3 3",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: chartTheme.axis,
							fontSize: 11
						},
						angle: -25,
						textAnchor: "end",
						interval: 0,
						height: 60
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
						fill: chartTheme.axis,
						fontSize: 11
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						fontSize: 11,
						color: chartTheme.axis
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "stars",
						fill: "var(--primary)",
						radius: [
							6,
							6,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "forks",
						fill: "#3fb950",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			})
		})
	});
}
function GrowthLine({ repos }) {
	const buckets = {};
	for (const r of repos) {
		const key = r.created_at.slice(0, 7);
		buckets[key] = (buckets[key] || 0) + 1;
	}
	const sorted = Object.keys(buckets).sort();
	let running = 0;
	const data = sorted.map((k) => {
		running += buckets[k];
		return {
			month: k,
			repos: running
		};
	});
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "No repositories" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title: "Repository growth",
		subtitle: "Cumulative public repos over time",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 260,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 12,
					left: -18,
					bottom: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: chartTheme.grid,
						strokeDasharray: "3 3",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "month",
						tick: {
							fill: chartTheme.axis,
							fontSize: 11
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
						fill: chartTheme.axis,
						fontSize: 11
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "repos",
						stroke: "var(--primary)",
						strokeWidth: 2,
						dot: false
					})
				]
			})
		})
	});
}
function SizeBar({ repos }) {
	const data = [...repos].sort((a, b) => b.size - a.size).slice(0, 8).map((r) => ({
		name: r.name,
		mb: +(r.size / 1024).toFixed(1)
	}));
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "No repositories" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title: "Largest repositories",
		subtitle: "Repository size in MB",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 260,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: -18,
					bottom: 40
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: chartTheme.grid,
						strokeDasharray: "3 3",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: chartTheme.axis,
							fontSize: 11
						},
						angle: -25,
						textAnchor: "end",
						interval: 0,
						height: 60
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
						fill: chartTheme.axis,
						fontSize: 11
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "mb",
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
		})
	});
}
function ChartCard({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: subtitle
			})]
		}), children]
	});
}
function Empty({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card-surface grid h-40 place-items-center text-sm text-muted-foreground",
		children: label
	});
}
/**
* Approximate contribution heatmap using public events (last ~90 days).
* GitHub's true contribution graph requires GraphQL with auth; we use
* public event counts as a client-only proxy.
*/
function ContributionGraph({ events }) {
	const { grid, total, maxDay } = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const e of events) {
			const day = e.created_at.slice(0, 10);
			const weight = e.type === "PushEvent" ? e.payload.commits?.length || 1 : 1;
			counts.set(day, (counts.get(day) || 0) + weight);
		}
		const weeks = 15;
		const days = [];
		const now = /* @__PURE__ */ new Date();
		now.setHours(0, 0, 0, 0);
		const start = new Date(now);
		start.setDate(start.getDate() - (weeks * 7 - 1));
		for (let i = 0; i < weeks * 7; i++) {
			const d = new Date(start);
			d.setDate(d.getDate() + i);
			const key = d.toISOString().slice(0, 10);
			days.push({
				date: key,
				count: counts.get(key) || 0
			});
		}
		const grid = [];
		for (let w = 0; w < weeks; w++) grid.push(days.slice(w * 7, w * 7 + 7));
		return {
			grid,
			total: days.reduce((s, d) => s + d.count, 0),
			maxDay: days.reduce((m, d) => d.count > m.count ? d : m, {
				date: "",
				count: 0
			})
		};
	}, [events]);
	const level = (n) => {
		if (n === 0) return "bg-secondary/60";
		if (n < 2) return "bg-primary/25";
		if (n < 5) return "bg-primary/50";
		if (n < 10) return "bg-primary/75";
		return "bg-primary";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: "Recent activity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground",
				children: [
					"~",
					total,
					" public actions in the last ",
					grid.length,
					" weeks",
					maxDay.date && ` · busiest: ${new Date(maxDay.date).toLocaleDateString()} (${maxDay.count})`
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-[10px] text-muted-foreground",
				children: [
					"Less",
					[
						0,
						1,
						3,
						6,
						12
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-3 w-3 rounded-sm ${level(n)}` }, n)),
					"More"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 overflow-x-auto no-scrollbar",
			children: grid.map((week, wi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: week.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					title: `${d.date}: ${d.count} events`,
					className: `h-3.5 w-3.5 rounded-sm ${level(d.count)} transition-transform hover:scale-125`
				}, d.date))
			}, wi))
		})]
	});
}
function Profile() {
	const { username } = Route.useParams();
	const [userQ, reposQ, followersQ, followingQ, eventsQ] = useQueries({ queries: [
		{
			queryKey: ["user", username],
			queryFn: () => github.user(username),
			retry: 1
		},
		{
			queryKey: ["repos", username],
			queryFn: () => github.repos(username),
			retry: 1
		},
		{
			queryKey: ["followers", username],
			queryFn: () => github.followers(username),
			retry: 1
		},
		{
			queryKey: ["following", username],
			queryFn: () => github.following(username),
			retry: 1
		},
		{
			queryKey: ["events", username],
			queryFn: () => github.events(username),
			retry: 1
		}
	] });
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [q, setQ] = (0, import_react.useState)("");
	const [lang, setLang] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("updated");
	const [page, setPage] = (0, import_react.useState)(1);
	const perPage = 9;
	const repos = reposQ.data ?? [];
	const languages = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		repos.forEach((r) => r.language && s.add(r.language));
		return Array.from(s).sort();
	}, [repos]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = [...repos];
		if (q) list = list.filter((r) => (r.name + " " + (r.description || "")).toLowerCase().includes(q.toLowerCase()));
		if (lang) list = list.filter((r) => r.language === lang);
		list.sort((a, b) => {
			switch (sort) {
				case "stars": return b.stargazers_count - a.stargazers_count;
				case "forks": return b.forks_count - a.forks_count;
				case "name": return a.name.localeCompare(b.name);
				case "created": return +new Date(b.created_at) - +new Date(a.created_at);
				default: return +new Date(b.updated_at) - +new Date(a.updated_at);
			}
		});
		return list;
	}, [
		repos,
		q,
		lang,
		sort
	]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
	const paged = filtered.slice((page - 1) * perPage, page * perPage);
	if (userQ.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (userQ.error || !userQ.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorScreen, {
		error: userQ.error,
		username,
		onRetry: () => userQ.refetch()
	});
	const user = userQ.data;
	const pinned = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
				user,
				repos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-14.25 z-30 -mx-4 mt-6 border-b border-border bg-background/70 px-4 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto no-scrollbar",
					children: [
						"overview",
						"repos",
						"followers",
						"following",
						"stats"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(t),
						className: `relative shrink-0 px-4 py-3 text-sm capitalize transition-colors ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							t,
							t === "followers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs text-muted-foreground",
								children: [
									"(",
									user.followers,
									")"
								]
							}),
							t === "following" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs text-muted-foreground",
								children: [
									"(",
									user.following,
									")"
								]
							}),
							t === "repos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs text-muted-foreground",
								children: [
									"(",
									user.public_repos,
									")"
								]
							}),
							tab === t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								layoutId: "tab-underline",
								className: "absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
							})
						]
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						transition: { duration: .2 },
						children: [
							tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									eventsQ.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributionGraph, { events: eventsQ.data }),
									pinned.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 inline-flex items-center gap-2 text-sm font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											size: 14,
											className: "text-warning"
										}), " Top repositories"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
										children: pinned.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoCard, { repo: r }, r.id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePie, { repos })
								]
							}),
							tab === "repos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 md:grid-cols-[1fr_auto_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "glass flex items-center gap-2 rounded-md border border-border px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
												size: 14,
												className: "text-muted-foreground"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: q,
												onChange: (e) => {
													setQ(e.target.value);
													setPage(1);
												},
												placeholder: "Search repositories",
												className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: lang,
											onChange: (e) => {
												setLang(e.target.value);
												setPage(1);
											},
											className: "rounded-md border border-border bg-secondary px-3 py-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "All languages"
											}), languages.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: l,
												children: l
											}, l))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
												size: 14,
												className: "text-muted-foreground"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: sort,
												onChange: (e) => setSort(e.target.value),
												className: "bg-transparent outline-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "updated",
														children: "Newest updated"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "created",
														children: "Newest created"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "stars",
														children: "Most stars"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "forks",
														children: "Most forks"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "name",
														children: "Name"
													})
												]
											})]
										})
									]
								}), reposQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoGridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "card-surface p-8 text-center text-sm text-muted-foreground",
									children: "No repositories match your filters."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: paged.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoCard, { repo: r }, r.id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: [
											(page - 1) * perPage + 1,
											"–",
											Math.min(page * perPage, filtered.length),
											" of ",
											filtered.length
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "btn-ghost py-1! text-sm",
												disabled: page === 1,
												onClick: () => setPage((p) => p - 1),
												children: "Prev"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "chip",
												children: [
													page,
													" / ",
													totalPages
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "btn-ghost py-1! text-sm",
												disabled: page === totalPages,
												onClick: () => setPage((p) => p + 1),
												children: "Next"
											})
										]
									})]
								})] })]
							}),
							tab === "followers" && (followersQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading followers" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGrid, { users: followersQ.data ?? [] })),
							tab === "following" && (followingQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading following" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGrid, { users: followingQ.data ?? [] })),
							tab === "stats" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 lg:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePie, { repos }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsBar, { repos }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthLine, { repos }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeBar, { repos })
								]
							})
						]
					}, tab)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					to: "/compare",
					className: "hover:text-foreground",
					children: [
						"Compare @",
						user.login,
						" with another developer →"
					]
				})
			})
		]
	});
}
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-surface p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-24 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-1/3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-2/3" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-4 gap-3",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16" }, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepoGridSkeleton, { className: "mt-6" })]
	});
}
function RepoGridSkeleton({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`,
		children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40" }, i))
	});
}
function ErrorScreen({ error, username, onRetry }) {
	const status = error?.response?.status;
	const isNotFound = status === 404;
	const isRateLimit = status === 403;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-destructive/15 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: isNotFound ? "User not found" : isRateLimit ? "Rate limit reached" : "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: isNotFound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"No GitHub user with the login ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-foreground",
						children: ["@", username]
					}),
					"."
				] }) : isRateLimit ? "The unauthenticated GitHub API allows ~60 requests/hour per IP. Please try again later." : error?.message || "The GitHub API request failed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onRetry,
					className: "btn-primary",
					children: "Retry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					to: "/",
					className: "btn-ghost",
					children: "Search another"
				})]
			})
		]
	});
}
//#endregion
export { Profile as component };
