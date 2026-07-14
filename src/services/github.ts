import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github+json" },
});

export type GHUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type GHRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: { name: string } | null;
  topics: string[];
  default_branch: string;
};

export type GHUserMini = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GHEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: unknown[] };
};

export const github = {
  user: (u: string) => api.get<GHUser>(`/users/${u}`).then((r) => r.data),
  repos: (u: string) =>
    api
      .get<GHRepo[]>(`/users/${u}/repos`, { params: { per_page: 100, sort: "updated" } })
      .then((r) => r.data),
  followers: (u: string) =>
    api.get<GHUserMini[]>(`/users/${u}/followers`, { params: { per_page: 100 } }).then((r) => r.data),
  following: (u: string) =>
    api.get<GHUserMini[]>(`/users/${u}/following`, { params: { per_page: 100 } }).then((r) => r.data),
  events: (u: string) =>
    api.get<GHEvent[]>(`/users/${u}/events/public`, { params: { per_page: 100 } }).then((r) => r.data),
};
