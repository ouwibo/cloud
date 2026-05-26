export interface AirdropTask {
  name: string;
  types: string[];
  cost: number;       // 0 = free
  timeMin: number;
  url: string;
}

export interface Airdrop {
  id: number;
  slug: string;
  name: string;
  ticker?: string;
  logoUrl: string;          // unavatar.io/twitter/{handle}
  logoColor: string;        // fallback bg color
  logoInitial: string;      // fallback text
  isNew: boolean;
  status: "Confirmed" | "Potential" | "Reward Available";
  statusDate: string;
  rewardType: "Airdrop" | "Whitelist/Waitlist" | "Points" | "Token Sale" | "NFT";
  raiseFunds?: string;
  backers?: { color: string; initial: string }[];
  backersExtra?: number;
  tasks: AirdropTask[];
  moniScore?: number;
}

export interface Backer {
  name: string;
  logoUrl: string;
  initial: string;
  color: string;
}

const VC: Record<string, Backer> = {
  framework:    { name: "Framework Ventures",  logoUrl: "https://unavatar.io/twitter/framework",       initial: "FW", color: "#7c3aed" },
  paradigm:     { name: "Paradigm",             logoUrl: "https://unavatar.io/twitter/paradigm",        initial: "PA", color: "#2563eb" },
  coinbase:     { name: "Coinbase Ventures",    logoUrl: "https://unavatar.io/twitter/CoinbaseVentures",initial: "CB", color: "#1d4ed8" },
  dragonfly:    { name: "Dragonfly",            logoUrl: "https://unavatar.io/twitter/dragonfly_xyz",   initial: "DF", color: "#0369a1" },
  a16z:         { name: "a16z",                 logoUrl: "https://unavatar.io/twitter/a16z",            initial: "A",  color: "#1e40af" },
  pantera:      { name: "Pantera Capital",       logoUrl: "https://unavatar.io/twitter/PanteraCapital", initial: "PC", color: "#15803d" },
  binance:      { name: "Binance Labs",          logoUrl: "https://unavatar.io/twitter/BinanceLabs",    initial: "BL", color: "#b45309" },
  mirana:       { name: "Mirana Ventures",       logoUrl: "https://unavatar.io/twitter/MiranaVentures", initial: "MV", color: "#6d28d9" },
  wintermute:   { name: "Wintermute",            logoUrl: "https://unavatar.io/twitter/wintermute_t",   initial: "WM", color: "#047857" },
  multicoin:    { name: "Multicoin Capital",     logoUrl: "https://unavatar.io/twitter/multicoincap",   initial: "MC", color: "#0891b2" },
  g500:         { name: "500 Global",            logoUrl: "https://unavatar.io/twitter/500global",      initial: "5G", color: "#dc2626" },
  qcp:          { name: "QCP Capital",           logoUrl: "https://unavatar.io/twitter/QCPCapital",     initial: "QC", color: "#7c2d12" },
  slow:         { name: "Slow Ventures",         logoUrl: "https://unavatar.io/twitter/slowventures",   initial: "SV", color: "#374151" },
  jump:         { name: "Jump Crypto",           logoUrl: "https://unavatar.io/twitter/JumpCryptoHQ",   initial: "JC", color: "#1f2937" },
  gnosis:       { name: "Gnosis",                logoUrl: "https://unavatar.io/twitter/gnosisdao",      initial: "GN", color: "#065f46" },
  kraken:       { name: "Kraken",                logoUrl: "https://unavatar.io/twitter/krakenfx",       initial: "KR", color: "#1d4ed8" },
  robot:        { name: "Robot Ventures",        logoUrl: "https://unavatar.io/twitter/robotventures",  initial: "RV", color: "#78350f" },
  selini:       { name: "Selini Capital",        logoUrl: "https://unavatar.io/twitter/selini_capital", initial: "SC", color: "#4f46e5" },
  sony:         { name: "Sony Innovation Fund",  logoUrl: "https://unavatar.io/twitter/sony_ventures",  initial: "SF", color: "#111827" },
  nimbus:       { name: "Nimbus Capital",        logoUrl: "https://unavatar.io/twitter/nimbuscap",      initial: "NC", color: "#1e3a5f" },
};

export const mockAirdrops: Airdrop[] = [
  {
    id: 1, slug: "strato",
    name: "STRATO", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/strato_net",
    logoColor: "#1a56db", logoInitial: "ST", isNew: true,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: "$18.50M",
    backers: [VC.framework, VC.slow, VC.paradigm], backersExtra: 4,
    moniScore: 8800,
    tasks: [
      { name: "Provide Liquidity to Swap Pools",   types: ["Liquidity"],   cost: 50,  timeMin: 15, url: "https://strato.nexus/app" },
      { name: "Mint USDST via CDP",                types: ["Mainnet"],     cost: 100, timeMin: 10, url: "https://strato.nexus/app" },
      { name: "Stake in Safety Module",            types: ["Staking"],     cost: 50,  timeMin: 5,  url: "https://strato.nexus/app" },
      { name: "Deposit in Lending Pool",           types: ["Staking"],     cost: 20,  timeMin: 5,  url: "https://strato.nexus/app" },
    ],
  },
  {
    id: 2, slug: "netrun",
    name: "Netrun", ticker: "NET",
    logoUrl: "https://unavatar.io/twitter/netrun_xyz",
    logoColor: "#1a1a2e", logoInitial: "NR", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: undefined,
    backers: [VC.dragonfly, VC.multicoin], backersExtra: 2,
    moniScore: 6500,
    tasks: [
      { name: "Apply & Join Testnet",         types: ["Testnet"], cost: 0, timeMin: 5,  url: "https://join.netrun.xyz" },
      { name: "Create Token on Testnet",      types: ["Testnet"], cost: 0, timeMin: 10, url: "https://app.netrun.xyz" },
      { name: "Launch NFT Collection",        types: ["Testnet"], cost: 0, timeMin: 10, url: "https://app.netrun.xyz" },
      { name: "Set Up Custom Domain",         types: ["Testnet"], cost: 0, timeMin: 10, url: "https://app.netrun.xyz" },
    ],
  },
  {
    id: 3, slug: "boost-rabbithole",
    name: "Boost (RabbitHole)", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/rabbithole_gg",
    logoColor: "#ea580c", logoInitial: "BR", isNew: false,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Whitelist/Waitlist", raiseFunds: "$21.60M",
    backers: [VC.framework, VC.slow, VC.paradigm, VC.coinbase], backersExtra: 10,
    moniScore: 8200,
    tasks: [
      { name: "Fill Waitlist Form", types: ["Fill The Form"], cost: 0, timeMin: 3, url: "https://www.rabbithole.gg" },
    ],
  },
  {
    id: 4, slug: "hotstuff",
    name: "Hotstuff (Prev. Syndr Protocol)", ticker: undefined,
    logoUrl: "",
    logoColor: "#1f2937", logoInitial: "HS", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: undefined,
    backers: [VC.mirana, VC.wintermute], backersExtra: 3,
    moniScore: 7600,
    tasks: [
      { name: "Trade Perpetuals (Points Program)", types: ["Trading"],   cost: 80,  timeMin: 60, url: "https://app.hotstuff.xyz" },
      { name: "Provide Liquidity to Vault",        types: ["Liquidity"], cost: 100, timeMin: 15, url: "https://app.hotstuff.xyz" },
      { name: "Complete Trading Expeditions",      types: ["Mainnet"],   cost: 0,   timeMin: 20, url: "https://app.hotstuff.xyz" },
      { name: "Weekly Trading Competition",        types: ["Trading"],   cost: 80,  timeMin: 30, url: "https://app.hotstuff.xyz" },
      { name: "Refer Friends",                     types: ["Referral"],  cost: 0,   timeMin: 5,  url: "https://app.hotstuff.xyz" },
      { name: "Complete Social Missions",          types: ["Social"],    cost: 0,   timeMin: 10, url: "https://app.hotstuff.xyz" },
    ],
  },
  {
    id: 5, slug: "popdex",
    name: "PopDEX", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/popdex_io",
    logoColor: "#7c3aed", logoInitial: "PD", isNew: false,
    status: "Potential", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: "$30.00M",
    backers: [VC.paradigm, VC.coinbase, VC.pantera], backersExtra: 5,
    moniScore: 6200,
    tasks: [
      { name: "Complete Social Missions",     types: ["Social"],        cost: 0, timeMin: 10, url: "https://popdex.io" },
      { name: "Provide Liquidity",            types: ["Liquidity"],     cost: 50, timeMin: 15, url: "https://popdex.io/app" },
      { name: "Refer & Earn Bonus Points",    types: ["Referral"],      cost: 0, timeMin: 5,  url: "https://popdex.io" },
    ],
  },
  {
    id: 6, slug: "beep",
    name: "Beep", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/beep_fi",
    logoColor: "#0d9488", logoInitial: "BP", isNew: false,
    status: "Confirmed", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: undefined,
    backers: [VC.robot, VC.mirana, VC.wintermute], backersExtra: 5,
    moniScore: 5800,
    tasks: [
      { name: "Trade on Beep", types: ["Trading"], cost: 78, timeMin: 70, url: "https://beep.fi" },
    ],
  },
  {
    id: 7, slug: "solstice",
    name: "Solstice", ticker: "SLX",
    logoUrl: "https://unavatar.io/twitter/Solstice_SLX",
    logoColor: "#0f172a", logoInitial: "SL", isNew: false,
    status: "Reward Available", statusDate: "May 25, 2026",
    rewardType: "Airdrop", raiseFunds: "$371.04K",
    backers: [VC.binance, VC.coinbase], backersExtra: 2,
    moniScore: 7100,
    tasks: [],
  },
  {
    id: 8, slug: "nado",
    name: "Nado", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/nadodex",
    logoColor: "#1d4ed8", logoInitial: "ND", isNew: false,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Airdrop", raiseFunds: undefined,
    backers: [VC.dragonfly, VC.coinbase, VC.jump], backersExtra: 3,
    moniScore: 4500,
    tasks: [
      { name: "Trade Perpetuals (Farm Points)",  types: ["Trading"],   cost: 50, timeMin: 30, url: "https://nado.xyz/trade" },
      { name: "Provide Liquidity to NLP Vault",  types: ["Liquidity"], cost: 50, timeMin: 15, url: "https://nado.xyz/earn" },
      { name: "Lend & Borrow Assets",            types: ["Staking"],   cost: 20, timeMin: 10, url: "https://nado.xyz/lend" },
    ],
  },
  {
    id: 9, slug: "k25ai",
    name: "K25.ai", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/k25ai",
    logoColor: "#111827", logoInitial: "K2", isNew: true,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Whitelist/Waitlist", raiseFunds: "$2.00M",
    backers: [VC.g500, VC.selini], backersExtra: 0,
    moniScore: 3800,
    tasks: [
      { name: "Register Waitlist", types: ["Fill The Form"], cost: 0, timeMin: 2, url: "https://k25.ai" },
    ],
  },
  {
    id: 10, slug: "grove",
    name: "Grove", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/groveprotocol",
    logoColor: "#92400e", logoInitial: "GV", isNew: true,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Points", raiseFunds: undefined,
    backers: [VC.slow, VC.coinbase], backersExtra: 1,
    moniScore: 5500,
    tasks: [
      { name: "Hold Assets to Earn Points", types: ["Hold"], cost: 100, timeMin: 5, url: "https://grove.fi" },
    ],
  },
  {
    id: 11, slug: "konnex",
    name: "Konnex", ticker: "KNX",
    logoUrl: "https://unavatar.io/twitter/konnex_world",
    logoColor: "#374151", logoInitial: "KX", isNew: false,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Airdrop", raiseFunds: "$15.00M",
    backers: [VC.dragonfly, VC.pantera, VC.a16z, VC.coinbase], backersExtra: 2,
    moniScore: 4900,
    tasks: [
      { name: "Complete Social Missions",   types: ["Social"],    cost: 0, timeMin: 15, url: "https://konnex.world" },
      { name: "Complete Daily Tasks",       types: ["Social"],    cost: 0, timeMin: 10, url: "https://konnex.world/tasks" },
      { name: "Join Leaderboard Challenge", types: ["Community"], cost: 0, timeMin: 5,  url: "https://konnex.world/leaderboard" },
      { name: "Refer Friends",              types: ["Referral"],  cost: 0, timeMin: 5,  url: "https://konnex.world/ref" },
    ],
  },
  {
    id: 12, slug: "sui",
    name: "Sui", ticker: "SUI",
    logoUrl: "https://unavatar.io/twitter/SuiNetwork",
    logoColor: "#4f8ef7", logoInitial: "SU", isNew: true,
    status: "Potential", statusDate: "May 21, 2026",
    rewardType: "Airdrop", raiseFunds: "$405.37M",
    backers: [VC.a16z, VC.jump, VC.binance, VC.coinbase], backersExtra: 8,
    moniScore: 9500,
    tasks: [
      { name: "Fill Ecosystem Airdrop Form", types: ["Fill The Form"], cost: 0, timeMin: 15, url: "https://sui.io/ecosystem" },
      { name: "Trade on Sui DEX",            types: ["Trading"],       cost: 0, timeMin: 20, url: "https://app.cetus.zone" },
      { name: "Provide Liquidity on Sui",    types: ["Liquidity"],     cost: 50, timeMin: 15, url: "https://app.cetus.zone" },
      { name: "Stake SUI for Rewards",       types: ["Staking"],       cost: 50, timeMin: 10, url: "https://sui.io/stake" },
      { name: "Complete Social Missions",    types: ["Social"],        cost: 0, timeMin: 10, url: "https://sui.io/missions" },
    ],
  },
];

export const mockNews:     any[] = [];
export const mockTasks:    any[] = [];
export const mockActivity: any[] = [];
export const mockArticles: any[] = [];
