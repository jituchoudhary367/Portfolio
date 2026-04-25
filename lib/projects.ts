export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  problem: string;
  solution: string;
  impact: string[];
  tradeoffs: string;
  failures: string;
  performance: string;
  liveUrl: string;
  codeUrl: string;
};

export const projects: Project[] = [
  {
    id: "01",
    number: "01 / 03",
    title: "VELOCITY",
    subtitle: "AI-Powered Analytics Platform",
    description:
      "Velocity helps product teams turn data into decisions with real-time insights, predictive metrics, and beautiful dashboards.",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Redis",
      "Chart.js",
    ],
    problem:
      "Teams had fragmented data tools, slow reporting, and no real-time visibility.",
    solution:
      "Built a unified analytics platform with real-time pipelines, smart insights, and customizable dashboards.",
    impact: [
      "35% increase in decision speed",
      "28% improvement in conversion",
      "Saved 120+ hours monthly",
    ],
    tradeoffs:
      "Chose custom analytics engine over third-party tools for flexibility and cost control.",
    failures:
      "Initial data pipeline caused delays and inconsistencies. Rebuilt with event-driven architecture.",
    performance:
      "Handles 1M+ events/day with real-time processing under 200ms latency.",
    liveUrl: "https://velocity.demo",
    codeUrl: "https://github.com/arjundev/velocity-analytics",
  },
  {
    id: "02",
    number: "02 / 03",
    title: "FLOWSTATE",
    subtitle: "Real-Time PM Collaboration",
    description:
      "Flowstate is a project management workspace with live cursors, shared boards, and async standups.",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Redis"],
    problem:
      "Distributed teams lost context in static tools; standups were noisy and action items slipped.",
    solution:
      "Shipped a real-time board with presence, threaded decisions, and automated recap digests.",
    impact: [
      "Cut meeting time by 22%",
      "Improved task completion rate",
      "Single source of truth for sprint health",
    ],
    tradeoffs:
      "Socket.io for speed over pure CRDT; added reconciliation layer for offline edge cases.",
    failures:
      "First websocket fan-out melted CPU; moved to room-sharded workers and capped payloads.",
    performance: "Sub-50ms updates for 500 concurrent users per workspace shard.",
    liveUrl: "https://flowstate.demo",
    codeUrl: "https://github.com/arjundev/flowstate",
  },
  {
    id: "03",
    number: "03 / 03",
    title: "PAYBRIDGE",
    subtitle: "Payment Infrastructure",
    description:
      "Paybridge orchestrates payouts, retries, and reconciliation for SaaS billing with Stripe-grade reliability.",
    techStack: ["Next.js", "GraphQL", "PostgreSQL", "Stripe", "Temporal"],
    problem:
      "Finance teams reconciled payouts manually; failures were opaque and revenue at risk.",
    solution:
      "Built idempotent payout orchestration with GraphQL admin API and ledger-grade Postgres.",
    impact: [
      "99.95% successful payout rate",
      "2-day reconciliation down to minutes",
      "Audit-ready exports",
    ],
    tradeoffs:
      "GraphQL for admin flexibility; kept hot path mutations minimal to avoid N+1.",
    failures:
      "Early double-charge bug from webhook retries; introduced idempotency keys everywhere.",
    performance: "P99 webhook handling under 180ms with queue-backed workers.",
    liveUrl: "https://paybridge.demo",
    codeUrl: "https://github.com/arjundev/paybridge",
  },
];
