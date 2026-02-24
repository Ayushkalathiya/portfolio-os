"use client";

import { useState, useEffect } from "react";

const GITHUB_USERNAME = "Ayushkalathiya";
const GITHUB_API = "https://api.github.com";

export interface GitHubProfile {
    name: string;
    avatar: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
}

export interface GitHubRepo {
    name: string;
    stars: number;
    forks: number;
    language: string | null;
    updatedAt: string;
}

export interface GitHubEvent {
    type: string;
    repo: string;
    createdAt: string;
    message?: string;
}

export interface GitHubStats {
    profile: GitHubProfile | null;
    repos: GitHubRepo[];
    events: GitHubEvent[];
    totalStars: number;
    totalForks: number;
    topLanguages: { name: string; count: number }[];
    loading: boolean;
    error: string | null;
}

export function useGitHubData(): GitHubStats {
    const [data, setData] = useState<GitHubStats>({
        profile: null,
        repos: [],
        events: [],
        totalStars: 0,
        totalForks: 0,
        topLanguages: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [profileRes, reposRes, eventsRes] = await Promise.all([
                    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
                    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
                    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events?per_page=30`),
                ]);

                if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
                    throw new Error("GitHub API rate limit or fetch error");
                }

                const profileJson = await profileRes.json();
                const reposJson = await reposRes.json();
                const eventsJson = await eventsRes.json();

                // Parse profile
                const profile: GitHubProfile = {
                    name: profileJson.name || GITHUB_USERNAME,
                    avatar: profileJson.avatar_url,
                    publicRepos: profileJson.public_repos,
                    followers: profileJson.followers,
                    following: profileJson.following,
                    createdAt: profileJson.created_at,
                };

                // Parse repos
                const repos: GitHubRepo[] = reposJson.map((r: any) => ({
                    name: r.name,
                    stars: r.stargazers_count,
                    forks: r.forks_count,
                    language: r.language,
                    updatedAt: r.updated_at,
                }));

                // Calculate totals
                const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
                const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);

                // Top languages
                const langMap: Record<string, number> = {};
                repos.forEach((r) => {
                    if (r.language) {
                        langMap[r.language] = (langMap[r.language] || 0) + 1;
                    }
                });
                const topLanguages = Object.entries(langMap)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 8);

                // Parse events into a readable format
                const events: GitHubEvent[] = eventsJson
                    .filter((e: any) =>
                        ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent", "WatchEvent", "ForkEvent"].includes(e.type)
                    )
                    .slice(0, 10)
                    .map((e: any) => {
                        let message = "";
                        switch (e.type) {
                            case "PushEvent":
                                const commits = e.payload?.commits?.length || 0;
                                message = `Pushed ${commits} commit${commits !== 1 ? "s" : ""} to ${e.repo.name}`;
                                break;
                            case "CreateEvent":
                                message = `Created ${e.payload?.ref_type || "repo"} ${e.payload?.ref ? `"${e.payload.ref}"` : ""} in ${e.repo.name}`;
                                break;
                            case "PullRequestEvent":
                                message = `${e.payload?.action} PR #${e.payload?.pull_request?.number} in ${e.repo.name}`;
                                break;
                            case "IssuesEvent":
                                message = `${e.payload?.action} issue #${e.payload?.issue?.number} in ${e.repo.name}`;
                                break;
                            case "WatchEvent":
                                message = `Starred ${e.repo.name}`;
                                break;
                            case "ForkEvent":
                                message = `Forked ${e.repo.name}`;
                                break;
                            default:
                                message = `${e.type.replace("Event", "")} on ${e.repo.name}`;
                        }

                        return {
                            type: e.type.replace("Event", "").toUpperCase(),
                            repo: e.repo.name,
                            createdAt: e.created_at,
                            message,
                        };
                    });

                setData({
                    profile,
                    repos,
                    events,
                    totalStars,
                    totalForks,
                    topLanguages,
                    loading: false,
                    error: null,
                });
            } catch (err: any) {
                setData((prev) => ({
                    ...prev,
                    loading: false,
                    error: err.message || "Failed to fetch GitHub data",
                }));
            }
        };

        fetchAll();
    }, []);

    return data;
}

// Format event timestamps into relative times
export function formatEventTime(dateStr: string): string {
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Map event types to log levels
export function getEventLevel(type: string): { level: string; color: string } {
    switch (type) {
        case "PUSH":
            return { level: "PUSH", color: "text-primary" };
        case "CREATE":
            return { level: "CREATE", color: "text-emerald-500" };
        case "PULLREQUEST":
            return { level: "PR", color: "text-amber-500" };
        case "ISSUES":
            return { level: "ISSUE", color: "text-rose-400" };
        case "WATCH":
            return { level: "STAR", color: "text-yellow-400" };
        case "FORK":
            return { level: "FORK", color: "text-purple-400" };
        default:
            return { level: type, color: "text-slate-400" };
    }
}
