import type { GHRepo, GHUser } from "@/services/github";

export function developerScore(user: GHUser, repos: GHRepo[]): number {
  const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const forks = repos.reduce((s, r) => s + r.forks_count, 0);
  const followerScore = Math.log10(user.followers + 1) * 20;
  const repoScore = Math.min(user.public_repos, 200) * 0.4;
  const starScore = Math.log10(stars + 1) * 25;
  const forkScore = Math.log10(forks + 1) * 15;
  const ageYears = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
  const ageScore = Math.min(ageYears, 15) * 1.5;
  return Math.min(100, Math.round(followerScore + repoScore + starScore + forkScore + ageScore));
}

export function profileCompletion(user: GHUser): number {
  const fields = [
    user.name,
    user.bio,
    user.avatar_url,
    user.location,
    user.company,
    user.blog,
    user.twitter_username,
    user.email,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}
