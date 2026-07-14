import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Skeleton-BaqNmrL8.js
var import_jsx_runtime = require_jsx_runtime();
var api = axios.create({
	baseURL: "https://api.github.com",
	headers: { Accept: "application/vnd.github+json" }
});
var github = {
	user: (u) => api.get(`/users/${u}`).then((r) => r.data),
	repos: (u) => api.get(`/users/${u}/repos`, { params: {
		per_page: 100,
		sort: "updated"
	} }).then((r) => r.data),
	followers: (u) => api.get(`/users/${u}/followers`, { params: { per_page: 100 } }).then((r) => r.data),
	following: (u) => api.get(`/users/${u}/following`, { params: { per_page: 100 } }).then((r) => r.data),
	events: (u) => api.get(`/users/${u}/events/public`, { params: { per_page: 100 } }).then((r) => r.data)
};
function developerScore(user, repos) {
	const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
	const forks = repos.reduce((s, r) => s + r.forks_count, 0);
	const followerScore = Math.log10(user.followers + 1) * 20;
	const repoScore = Math.min(user.public_repos, 200) * .4;
	const starScore = Math.log10(stars + 1) * 25;
	const forkScore = Math.log10(forks + 1) * 15;
	const ageYears = (Date.now() - new Date(user.created_at).getTime()) / (1e3 * 60 * 60 * 24 * 365);
	const ageScore = Math.min(ageYears, 15) * 1.5;
	return Math.min(100, Math.round(followerScore + repoScore + starScore + forkScore + ageScore));
}
function profileCompletion(user) {
	const fields = [
		user.name,
		user.bio,
		user.avatar_url,
		user.location,
		user.company,
		user.blog,
		user.twitter_username,
		user.email
	];
	const filled = fields.filter(Boolean).length;
	return Math.round(filled / fields.length * 100);
}
function Skeleton({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `animate-pulse rounded-md bg-secondary/60 ${className}`,
		style: {
			backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
			backgroundSize: "200% 100%"
		}
	});
}
function Loader({ label = "Loading" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 text-sm text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
			label,
			"…"
		]
	});
}
//#endregion
export { profileCompletion as a, github as i, Skeleton as n, developerScore as r, Loader as t };
