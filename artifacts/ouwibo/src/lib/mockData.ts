export interface AirdropTask {
  name: string;
  types: string[];  // e.g. ["Hold","Liquidity"] or ["Fill The Form"]
  cost: number;     // USD, 0 = free
  timeMin: number;
  url: string;
}

export interface Airdrop {
  id: number;
  slug: string;
  name: string;
  ticker?: string;
  logoUrl?: string;
  logoColor: string;
  logoInitial: string;
  isNew: boolean;
  status: "Confirmed" | "Potential" | "Reward Available";
  statusDate: string;
  rewardType: "Airdrop" | "Whitelist/Waitlist" | "Points" | "Token Sale" | "NFT";
  raiseFunds?: string;
  backers?: { color: string; initial: string }[];
  backersExtra?: number;
  moniScore: number;
  tasks: AirdropTask[];
}

export const mockAirdrops: Airdrop[] = [
  {
    id: 1, slug: "strato", name: "STRATO", ticker: "STRATO",
    logoColor: "#2563eb", logoInitial: "ST", isNew: true,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Airdrop", moniScore: 875,
    tasks: [{ name: "Hold & Provide Liquidity", types: ["Hold", "Liquidity"], cost: 100, timeMin: 17, url: "#" },
            { name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 10, url: "#" },
            { name: "Referral", types: ["Referral"], cost: 0, timeMin: 5, url: "#" },
            { name: "Testnet", types: ["Testnet"], cost: 0, timeMin: 30, url: "#" }],
  },
  {
    id: 2, slug: "netrun", name: "Netrun",
    logoColor: "#374151", logoInitial: "NR", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop", moniScore: 184,
    tasks: [{ name: "Join Testnet", types: ["Testnet"], cost: 0, timeMin: 34, url: "#" },
            { name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 10, url: "#" },
            { name: "Referral", types: ["Referral"], cost: 0, timeMin: 5, url: "#" },
            { name: "Discord Activity", types: ["Community"], cost: 0, timeMin: 15, url: "#" }],
  },
  {
    id: 3, slug: "boost-rabbithole", name: "Boost (RabbitHole)",
    logoColor: "#16a34a", logoInitial: "BR", isNew: false,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Whitelist/Waitlist", raiseFunds: "$21.60M",
    backers: [{ color: "#6366f1", initial: "M" }, { color: "#f59e0b", initial: "F" }, { color: "#3b82f6", initial: "G" }],
    backersExtra: 10,
    moniScore: 7024,
    tasks: [{ name: "Fill The Form", types: ["Fill The Form"], cost: 0, timeMin: 3, url: "https://www.rabbithole.gg/" }],
  },
  {
    id: 4, slug: "hotstuff", name: "Hotstuff (Prev. Syndr Protocol)",
    logoColor: "#0f172a", logoInitial: "HS", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    backers: [{ color: "#10b981", initial: "O" }, { color: "#8b5cf6", initial: "V" }], backersExtra: 21,
    moniScore: 1495,
    tasks: [{ name: "Provide Liquidity", types: ["Liquidity"], cost: 80, timeMin: 96, url: "#" },
            { name: "Mainnet Interaction", types: ["Mainnet"], cost: 0, timeMin: 30, url: "#" },
            { name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 10, url: "#" },
            { name: "Referral Program", types: ["Referral"], cost: 0, timeMin: 5, url: "#" },
            { name: "Discord Activity", types: ["Community"], cost: 0, timeMin: 20, url: "#" },
            { name: "Testnet", types: ["Testnet"], cost: 0, timeMin: 40, url: "#" }],
  },
  {
    id: 5, slug: "popdex", name: "PopDEX",
    logoColor: "#7c3aed", logoInitial: "PD", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: "$30.00M",
    backers: [{ color: "#f97316", initial: "P" }],
    moniScore: 921,
    tasks: [{ name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 16, url: "#" },
            { name: "Discord Activity", types: ["Community"], cost: 0, timeMin: 10, url: "#" },
            { name: "Testnet", types: ["Testnet"], cost: 0, timeMin: 25, url: "#" }],
  },
  {
    id: 6, slug: "beep", name: "Beep",
    logoColor: "#db2777", logoInitial: "BP", isNew: false,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Airdrop", moniScore: 884,
    tasks: [{ name: "Trading", types: ["Trading"], cost: 78, timeMin: 70, url: "#" },
            { name: "Referral", types: ["Referral"], cost: 0, timeMin: 5, url: "#" },
            { name: "Social", types: ["Social"], cost: 0, timeMin: 10, url: "#" },
            { name: "Hold", types: ["Hold"], cost: 50, timeMin: 10, url: "#" },
            { name: "Staking", types: ["Staking"], cost: 100, timeMin: 15, url: "#" },
            { name: "Community", types: ["Community"], cost: 0, timeMin: 20, url: "#" },
            { name: "Testnet", types: ["Testnet"], cost: 0, timeMin: 30, url: "#" }],
  },
  {
    id: 7, slug: "solstice", name: "Solstice", ticker: "SLX",
    logoColor: "#0f172a", logoInitial: "SL", isNew: false,
    status: "Reward Available", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: "$371.04K",
    moniScore: 3894,
    tasks: [],
  },
  {
    id: 8, slug: "nado", name: "Nado",
    logoColor: "#1d4ed8", logoInitial: "ND", isNew: false,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Airdrop", moniScore: 4219,
    tasks: [{ name: "Trading", types: ["Trading"], cost: 50, timeMin: 30, url: "#" }],
  },
  {
    id: 9, slug: "k25ai", name: "K25.ai",
    logoColor: "#111827", logoInitial: "K2", isNew: true,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Whitelist/Waitlist", raiseFunds: "$2.00M",
    backers: [{ color: "#e5e7eb", initial: "W" }],
    moniScore: 1340,
    tasks: [{ name: "Fill The Form", types: ["Fill The Form"], cost: 0, timeMin: 2, url: "#" }],
  },
  {
    id: 10, slug: "grove", name: "Grove",
    logoColor: "#92400e", logoInitial: "GV", isNew: true,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Points", moniScore: 1153,
    tasks: [{ name: "Hold Assets", types: ["Hold"], cost: 100, timeMin: 5, url: "#" }],
  },
  {
    id: 11, slug: "konnex", name: "Konnex",
    logoColor: "#374151", logoInitial: "KX", isNew: false,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Airdrop", raiseFunds: "$15.00M",
    backers: [{ color: "#6366f1", initial: "L" }, { color: "#06b6d4", initial: "W" }, { color: "#3b82f6", initial: "L" }],
    backersExtra: 2,
    moniScore: 1218,
    tasks: [{ name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 18, url: "#" },
            { name: "Referral", types: ["Referral"], cost: 0, timeMin: 5, url: "#" },
            { name: "Discord", types: ["Community"], cost: 0, timeMin: 10, url: "#" },
            { name: "Testnet", types: ["Testnet"], cost: 0, timeMin: 25, url: "#" }],
  },
  {
    id: 12, slug: "sui", name: "Sui", ticker: "SUI",
    logoColor: "#3b82f6", logoInitial: "SU", isNew: true,
    status: "Potential", statusDate: "May 21, 2026",
    rewardType: "Airdrop", raiseFunds: "$405.37M",
    backers: [{ color: "#f59e0b", initial: "A" }, { color: "#6366f1", initial: "C" }, { color: "#ec4899", initial: "K" }],
    backersExtra: 14,
    moniScore: 3086,
    tasks: [{ name: "Fill The Form", types: ["Fill The Form"], cost: 0, timeMin: 15, url: "#" },
            { name: "Social Tasks", types: ["Social"], cost: 0, timeMin: 10, url: "#" },
            { name: "Staking", types: ["Staking"], cost: 100, timeMin: 20, url: "#" },
            { name: "Trading", types: ["Trading"], cost: 50, timeMin: 30, url: "#" },
            { name: "Referral", types: ["Referral"], cost: 0, timeMin: 5, url: "#" }],
  },
];

export const mockNews: any[]     = [];
export const mockTasks: any[]    = [];
export const mockActivity: any[] = [];
export const mockArticles: any[] = [];
