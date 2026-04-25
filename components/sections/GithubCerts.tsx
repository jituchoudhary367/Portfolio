"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BarChart2,
  BookOpen,
  GitFork,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import { IconGithub } from "@/components/icons/BrandIcons";
import {
  fetchGitHubStats,
  fetchPublicRepos,
  fetchRepoLanguages,
  getGithubUsername,
  type GitHubGraphUser,
  type GitHubRepo,
} from "@/lib/github";
import { certificates, type Certificate } from "@/lib/certs";
import NumberCounter from "@/components/ui/NumberCounter";
import CertificateModal from "@/components/ui/CertificateModal";
import DotGrid from "@/components/ui/DotGrid";

type PinnedRepo = NonNullable<
  GitHubGraphUser["pinnedItems"]["nodes"][number]
>;

function repoTagHints(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes("velocity") || n.includes("analytics"))
    return ["Next.js", "TypeScript", "PostgreSQL", "AWS"];
  if (n.includes("flow"))
    return ["React", "Node.js", "MongoDB", "Socket.io"];
  if (n.includes("pay") || n.includes("bridge"))
    return ["Next.js", "GraphQL", "PostgreSQL", "Stripe"];
  return [];
}

function Zigzag() {
  const d = Array.from({ length: 18 })
    .map((_, i) => `${i === 0 ? "M" : "L"}${i * 10},${i % 2 ? 10 : 0}`)
    .join(" ");
  return (
    <svg className="h-6 w-32 text-[var(--border)]" viewBox="0 0 180 12" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DonutChart({
  slices,
}: {
  slices: { label: string; value: number; color: string }[];
}) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  let acc = 0;
  const radius = 52;
  const cx = 60;
  const cy = 60;
  const paths = slices.map((s) => {
    const start = (acc / total) * Math.PI * 2;
    acc += s.value;
    const end = (acc / total) * Math.PI * 2;
    const x1 = cx + radius * Math.cos(start - Math.PI / 2);
    const y1 = cy + radius * Math.sin(start - Math.PI / 2);
    const x2 = cx + radius * Math.cos(end - Math.PI / 2);
    const y2 = cy + radius * Math.sin(end - Math.PI / 2);
    const large = end - start > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    return <path key={s.label} d={d} fill={s.color} stroke="#0d0d0d" strokeWidth="1" />;
  });
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-40 w-40" aria-hidden>
      {paths}
      <circle cx={cx} cy={cy} r={26} fill="#f5f4ef" stroke="#0d0d0d" strokeWidth="2" />
    </svg>
  );
}

export default function GithubCerts() {
  const [user, setUser] = useState<GitHubGraphUser | null>(null);
  const [pinned, setPinned] = useState<PinnedRepo[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [langBytes, setLangBytes] = useState<Record<string, number>>({});
  const [openCert, setOpenCert] = useState<Certificate | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const username = getGithubUsername();

  const heatmapWeeks = useMemo(() => {
    const weeks =
      user?.contributionsCollection.contributionCalendar.weeks ?? [];
    return weeks.slice(-20);
  }, [user]);

  const maxCount = useMemo(() => {
    let m = 0;
    heatmapWeeks.forEach((w) => {
      w.contributionDays.forEach((d) => {
        m = Math.max(m, d.contributionCount);
      });
    });
    return m || 1;
  }, [heatmapWeeks]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const json = await fetchGitHubStats();
      if (cancelled) return;
      const u = json.data?.user;
      if (u) {
        setUser(u);
        const nodes = (u.pinnedItems?.nodes ?? []).filter(Boolean) as PinnedRepo[];
        setPinned(nodes);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const first = await fetchPublicRepos(1, 6);
        if (cancelled) return;
        setRepos(first);
        setHasMore(first.length === 6);
      } catch {
        setRepos([]);
        setHasMore(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchNextPage = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const next = await fetchPublicRepos(page + 1, 6);
      setRepos((r) => {
        const names = new Set(r.map((x) => x.name));
        const merged = [...r];
        next.forEach((repo) => {
          if (!names.has(repo.name)) merged.push(repo);
        });
        return merged;
      });
      setPage((p) => p + 1);
      if (next.length < 6) setHasMore(false);
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, page]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) void fetchNextPage();
      },
      { threshold: 1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchNextPage]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const top = repos.slice(0, 8);
      const agg: Record<string, number> = {};
      for (const r of top) {
        try {
          const langs = await fetchRepoLanguages(r.name);
          Object.entries(langs).forEach(([k, v]) => {
            agg[k] = (agg[k] ?? 0) + v;
          });
        } catch {
          /* skip */
        }
      }
      if (!cancelled) setLangBytes(agg);
    })();
    return () => {
      cancelled = true;
    };
  }, [repos]);

  const donutSlices = useMemo(() => {
    const entries = Object.entries(langBytes).sort((a, b) => b[1] - a[1]);
    const palette = ["#00ff88", "#0d0d0d", "#777777", "#cccccc", "#222222"];
    return entries.slice(0, 5).map(([label, value], i) => ({
      label,
      value,
      color: palette[i % palette.length]!,
    }));
  }, [langBytes]);

  const forkTotal = useMemo(
    () => repos.reduce((acc, r) => acc + (r.forks_count ?? 0), 0),
    [repos],
  );

  const displayRepos = useMemo(() => {
    const pinnedNames = new Set(
      pinned.map((p) => p?.name).filter(Boolean) as string[],
    );
    const ordered: GitHubRepo[] = [];
    pinned.forEach((p) => {
      if (!p) return;
      const match = repos.find((r) => r.name === p.name);
      if (match) ordered.push(match);
    });
    repos.forEach((r) => {
      if (!pinnedNames.has(r.name)) ordered.push(r);
    });
    return ordered;
  }, [pinned, repos]);

  const stats = user
    ? {
        repos: user.repositories.totalCount,
        stars: user.starredRepositories.totalCount,
        forks: forkTotal,
        contribs:
          user.contributionsCollection.contributionCalendar.totalContributions,
      }
    : { repos: 0, stars: 0, forks: 0, contribs: 0 };

  return (
    <section
      id="github"
      className="relative overflow-hidden border-b-2 border-[var(--border)] py-20 md:py-24"
    >
      <DotGrid className="pointer-events-none absolute left-0 top-10 -z-10 h-48 w-48 opacity-50" />
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
            <div className="min-w-0 shrink-0">
              <p className="font-mono-label mb-2 flex items-center gap-2 text-xs text-[var(--accent)]">
                <span>CREDENTIALS &amp; CODE</span>
                <span
                  className="inline-block h-2 w-2 bg-[var(--accent)] shadow-[1px_1px_0_#0d0d0d]"
                  aria-hidden
                />
              </p>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[var(--text-primary)]">
                <span className="inline-flex flex-wrap items-end gap-2 md:gap-3">
                  <span>
                    CODE IS PUBLIC.
                    <br />
                    IMPACT IS REAL
                  </span>
                  <span
                    className="mb-[0.12em] inline-block h-[0.22em] min-h-[8px] w-[0.22em] min-w-[8px] bg-[var(--accent)] shadow-[2px_2px_0_#0d0d0d]"
                    aria-hidden
                  />
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)] lg:max-w-lg lg:pt-8">
              I believe in building in public and constantly leveling up.
              Here&apos;s where you can explore my work and learning journey.
            </p>
          </div>
          <div className="flex shrink-0 items-start gap-3 lg:pt-4">
            <svg
              className="h-[90px] w-[90px] shrink-0 text-[var(--border)] opacity-70"
              viewBox="0 0 120 120"
              aria-hidden
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <Zigzag />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="brutal-card relative flex flex-col bg-[var(--bg-card)] p-6">
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-dark)] text-white">
              <IconGithub className="h-5 w-5" />
            </span>
            <div className="mb-4 border-b-2 border-[var(--border)] pb-3 pr-12">
              <p className="font-mono-label text-xs text-[var(--accent)]">
                GITHUB OVERVIEW
              </p>
            </div>
            <div className="flex gap-4">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 border-2 border-[var(--border)] object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-dark)] font-display text-lg text-[var(--accent)]">
                  A.
                </div>
              )}
              <div>
                <p className="font-display text-2xl tracking-wide">
                  @{username}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {user?.bio ?? "Full-Stack Developer"}
                </p>
                <p className="mt-1 flex items-center gap-1 font-mono-label text-[10px] text-[var(--text-muted)]">
                  <MapPin className="h-3 w-3 shrink-0 text-[var(--accent)]" />
                  {user?.location ?? "India"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {(
                [
                  {
                    label: "Repositories",
                    value: stats.repos,
                    Icon: BookOpen,
                  },
                  { label: "Stars", value: stats.stars, Icon: Star },
                  { label: "Forks", value: stats.forks, Icon: GitFork },
                  {
                    label: "Contributions",
                    value: stats.contribs,
                    Icon: BarChart2,
                  },
                ] as const
              ).map((s) => (
                <div
                  key={s.label}
                  className="border-2 border-[var(--border)] bg-[var(--bg-primary)] p-3 text-center"
                >
                  <s.Icon
                    className="mx-auto mb-2 h-4 w-4 text-[var(--text-muted)]"
                    strokeWidth={1.5}
                  />
                  <p className="font-display text-2xl text-[var(--accent)]">
                    <NumberCounter target={s.value} />
                  </p>
                  <p className="font-mono-label text-[8px] uppercase tracking-wide text-[var(--text-muted)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {heatmapWeeks.length > 0 && (
              <div className="mt-6">
                <p className="font-mono-label mb-2 text-[10px] text-[var(--accent)]">
                  CONTRIBUTIONS (RECENT WEEKS)
                </p>
                <div className="flex max-w-full gap-[2px] overflow-x-auto pb-2">
                  {heatmapWeeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[2px]">
                      {week.contributionDays.map((d) => {
                        const level = d.contributionCount / maxCount;
                        const bg =
                          d.contributionCount === 0
                            ? "#e8e6e0"
                            : level < 0.25
                              ? "rgba(0,255,136,0.25)"
                              : level < 0.5
                                ? "rgba(0,255,136,0.45)"
                                : level < 0.75
                                  ? "rgba(0,255,136,0.65)"
                                  : "#00ff88";
                        return (
                          <div
                            key={d.date}
                            title={`${d.contributionCount} contributions on ${d.date}`}
                            className="h-2.5 w-2.5 border border-[var(--border)]"
                            style={{ background: bg }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {donutSlices.length > 0 && (
              <div className="mt-6 grid gap-4 md:grid-cols-2 md:items-center">
                <DonutChart slices={donutSlices} />
                <div className="font-mono-label text-[10px] text-[var(--text-secondary)]">
                  {donutSlices
                    .map((s) => {
                      const pct = Math.round(
                        (s.value /
                          donutSlices.reduce((a, x) => a + x.value, 0)) *
                          100,
                      );
                      return `${s.label} ${pct}%`;
                    })
                    .join(" · ")}
                </div>
              </div>
            )}

            <p className="font-mono-label mt-4 text-[10px] text-[var(--text-muted)]">
              TOP REPOSITORIES
            </p>
            <div
              className="repo-scroll mt-2 max-h-[280px] space-y-2 overflow-y-auto overscroll-y-contain pr-1 touch-pan-y"
              data-lenis-prevent
            >
              {displayRepos.map((repo, idx) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-3 border-2 border-[var(--border)] bg-white p-3 transition hover:translate-x-1 hover:bg-[var(--bg-primary)]"
                >
                  <span
                    className="mt-1 h-3 w-3 shrink-0 border border-[var(--border)]"
                    style={{
                      background:
                        idx % 3 === 0
                          ? "var(--accent)"
                          : idx % 3 === 1
                            ? "var(--bg-dark)"
                            : "#cccccc",
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono-label text-xs font-bold">
                      {repo.name}
                    </span>
                    <span className="line-clamp-2 text-[11px] text-[var(--text-secondary)]">
                      {repo.description}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1">
                      {(repoTagHints(repo.name).length
                        ? repoTagHints(repo.name)
                        : repo.language
                          ? [repo.language]
                          : []
                      ).map((tag) => (
                        <span
                          key={tag}
                          className="border border-[var(--border)] bg-[var(--bg-dark)] px-1.5 py-0.5 font-mono-label text-[8px] text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="font-mono-label text-[10px] text-[var(--text-muted)]">
                    ★ {repo.stargazers_count}
                  </span>
                </a>
              ))}
              <div ref={sentinelRef} className="h-2 w-full" />
              {loadingMore && (
                <p className="text-center font-mono-label text-[10px] text-[var(--text-muted)]">
                  Loading…
                </p>
              )}
            </div>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-dark)] py-3 font-mono-label text-[10px] text-white"
            >
              EXPLORE MORE ON GITHUB
              <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
            </a>
          </div>

          <div className="brutal-card flex flex-col bg-[var(--bg-card)] p-6">
            <div className="relative mb-4 border-b-2 border-[var(--border)] pb-3 pr-12">
              <p className="font-mono-label text-xs text-[var(--accent)]">
                CERTIFICATES
              </p>
              <span className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-dark)] text-white">
                <Award className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {certificates.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setOpenCert(c)}
                  className="brutal-card flex flex-col p-4 text-left transition hover:-translate-y-0.5"
                >
                  <p className="font-mono-label text-[9px] text-[var(--accent)]">
                    {c.provider}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt=""
                    className="my-3 h-8 w-auto object-contain"
                  />
                  <h3 className="font-display text-xl leading-none">{c.title}</h3>
                  <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                    {c.issuer} · Issued {c.issued}
                  </p>
                  <span className="mt-4 inline-flex h-8 w-8 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-dark)] text-[var(--accent)]">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-2 border-[var(--border)] bg-[var(--bg-dark)] p-6 text-white md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <Quote
              className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent)]"
              strokeWidth={1.5}
            />
            <p className="max-w-3xl text-sm leading-relaxed text-white/85">
              Learning never stops. Certifications validate, but building makes it
              real.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-stretch gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-center">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="font-display text-2xl text-[var(--accent)] md:text-3xl">
                <NumberCounter target={1200} suffix="+" />
              </p>
              <p className="font-mono-label text-[9px] uppercase tracking-wide text-white/60">
                Hours Invested
              </p>
            </div>
            <div className="hidden h-12 w-px bg-white/25 md:block" aria-hidden />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="font-display text-2xl text-[var(--accent)] md:text-3xl">
                <NumberCounter target={15} suffix="+" />
              </p>
              <p className="font-mono-label text-[9px] uppercase tracking-wide text-white/60">
                Certifications
              </p>
            </div>
            <div className="hidden h-12 w-px bg-white/25 md:block" aria-hidden />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="font-display text-2xl text-[var(--accent)] md:text-3xl">
                <NumberCounter target={30} suffix="+" />
              </p>
              <p className="font-mono-label text-[9px] uppercase tracking-wide text-white/60">
                Courses Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <CertificateModal openCert={openCert} onClose={() => setOpenCert(null)} />
    </section>
  );
}
