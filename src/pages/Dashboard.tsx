import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Trash2, LayoutDashboard, ExternalLink } from "lucide-react";

type Category = "chain" | "defi" | "nft" | "testnet" | "node" | "other";

interface TaskLink {
  label: string;
  url: string;
}

interface Task {
  id: number;
  name: string;
  note?: string;
  category: Category;
  links: TaskLink[];
  addedAt: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  chain:   "Chain",
  defi:    "DeFi",
  nft:     "NFT",
  testnet: "Testnet",
  node:    "Node",
  other:   "Other",
};

const CAT_OPTIONS: Category[] = ["chain", "defi", "nft", "testnet", "node", "other"];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    name: "Monad Testnet — Daily Faucet",
    note: "Claim testnet MON every 24h",
    category: "testnet",
    links: [
      { label: "Faucet", url: "https://faucet.monad.xyz" },
      { label: "Explorer", url: "https://explorer.monad.xyz" },
    ],
    addedAt: "2025-06-03",
  },
  {
    id: 2,
    name: "Hyperliquid — Daily Trade",
    note: "Swap or perp trade for volume",
    category: "defi",
    links: [{ label: "Trade", url: "https://app.hyperliquid.xyz/trade" }],
    addedAt: "2025-06-02",
  },
  {
    id: 3,
    name: "Linea — Surge Daily Tasks",
    note: "Complete daily XP tasks on Surge",
    category: "chain",
    links: [
      { label: "Surge", url: "https://linea.build/surge" },
      { label: "Bridge", url: "https://bridge.linea.build" },
    ],
    addedAt: "2025-06-04",
  },
  {
    id: 4,
    name: "Scroll — Daily Interaction",
    note: "Bridge or swap on Scroll mainnet",
    category: "chain",
    links: [
      { label: "Bridge", url: "https://scroll.io/bridge" },
      { label: "Ambient DEX", url: "https://ambient.finance" },
    ],
    addedAt: "2025-06-04",
  },
  {
    id: 5,
    name: "Aztec Network — Node Check",
    note: "Verify node is syncing & healthy",
    category: "node",
    links: [{ label: "Docs", url: "https://docs.aztec.network" }],
    addedAt: "2025-06-04",
  },
  {
    id: 6,
    name: "Plume Testnet — Daily Stake",
    note: "Stake on Plume testnet dApp",
    category: "testnet",
    links: [{ label: "App", url: "https://testnet.plume.org" }],
    addedAt: "2025-06-05",
  },
  {
    id: 7,
    name: "EigenLayer — Check Points",
    note: "Restake or check dashboard daily",
    category: "defi",
    links: [{ label: "Dashboard", url: "https://app.eigenlayer.xyz" }],
    addedAt: "2025-06-05",
  },
  {
    id: 8,
    name: "Zora — Daily Mint",
    note: "Mint a free or cheap NFT on Zora",
    category: "nft",
    links: [{ label: "Explore", url: "https://zora.co/explore" }],
    addedAt: "2025-06-05",
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | Category>("all");

  const filtered = tasks.filter(t => filter === "all" || t.category === filter);

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const FILTERS: { label: string; value: "all" | Category }[] = [
    { label: "All", value: "all" },
    ...CAT_OPTIONS.map(c => ({ label: CATEGORY_LABELS[c], value: c })),
  ];

  return (
    <div className="dash-page">
      <div className="dash-overlay" />
      <div className="dash-inner">

        <header className="dash-header fade-up">
          <a href="/" className="dash-logo">
            <img src="/site-logo-transparent.webp" alt="logo" />
            <span className="dash-logo-name">Ouwi<span>bo</span></span>
          </a>
          <Link href="/" className="dash-back">
            <ArrowLeft size={13} /> Back to site
          </Link>
        </header>

        <div className="dash-body">
          <div className="dash-title-row fade-up delay-1">
            <div>
              <h1 className="dash-title">
                <LayoutDashboard size={20} style={{ display: "inline", marginRight: 8, verticalAlign: "middle", opacity: .7 }} />
                Daily Airdrop Tasks
              </h1>
              <p className="dash-subtitle">{tasks.length} tasks · click a chip to open the link</p>
            </div>
          </div>

          <div className="filter-row fade-up delay-2">
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? "active" : ""}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state fade-up">No tasks here yet.</div>
          )}

          <div className="task-grid fade-up delay-3">
            {filtered.map((task, i) => (
              <div
                key={task.id}
                className="task-item"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <span className={`task-tag tag-${task.category}`}>{CATEGORY_LABELS[task.category]}</span>

                <div className="task-item-body">
                  <span className="task-item-name">{task.name}</span>
                  {task.note && <span className="task-item-note">{task.note}</span>}
                </div>

                {task.links.length > 0 && (
                  <div className="task-link-row">
                    {task.links.map(lnk => (
                      <a
                        key={lnk.url}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer"
                        className="task-link-chip"
                      >
                        {lnk.label}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                )}

                <button
                  className="task-del"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <footer className="credit">Built by Ouwibo</footer>
      </div>
    </div>
  );
}
