const username =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || "jituchoudhary367";

function headers(): HeadersInit {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/vnd.github+json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function fetchGitHubStats() {
  const query = `
    query {
      user(login: "${username}") {
        name
        bio
        avatarUrl
        location
        repositories(affiliations: [OWNER], first: 1, privacy: PUBLIC) {
          totalCount
        }
        starredRepositories(first: 1) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        followers { totalCount }
        following { totalCount }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              url
              primaryLanguage { name color }
            }
          }
        }
      }
    }
  `;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query }),
  });
  return res.json() as Promise<{
    data?: {
      user: GitHubGraphUser | null;
    };
    errors?: { message: string }[];
  }>;
}

export type GitHubGraphUser = {
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  location: string | null;
  repositories: { totalCount: number };
  starredRepositories: { totalCount: number };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: { contributionCount: number; date: string }[];
      }[];
    };
  };
  followers: { totalCount: number };
  following: { totalCount: number };
  pinnedItems: {
    nodes: Array<{
      name: string;
      description: string | null;
      stargazerCount: number;
      forkCount: number;
      url: string;
      primaryLanguage: { name: string; color: string } | null;
    } | null>;
  };
};

export async function fetchPublicRepos(page = 1, perPage = 6) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=${perPage}&page=${page}&type=owner`,
    { headers: headers(), next: { revalidate: 300 } },
  );
  if (!res.ok) {
    console.error(`GitHub API error: ${res.status} ${res.statusText}`);
    throw new Error("Failed to load repositories");
  }
  return res.json() as Promise<GitHubRepo[]>;
}

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
};

export async function fetchRepoLanguages(repoName: string) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`,
    { headers: headers(), next: { revalidate: 600 } },
  );
  if (!res.ok) return {};
  return res.json() as Promise<Record<string, number>>;
}

export function getGithubUsername() {
  return username;
}
