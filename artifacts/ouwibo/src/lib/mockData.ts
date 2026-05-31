export interface AirdropTask {
  name: string;
  types: string[];
  cost: number; // 0 = free
  timeMin: number;
  url: string;
}

export interface Airdrop {
  id: number;
  slug: string;
  name: string;
  ticker?: string;
  logoUrl: string; // unavatar.io/twitter/{handle}
  logoColor: string; // fallback bg color
  logoInitial: string; // fallback text
  isNew: boolean;
  status: "Confirmed" | "Potential" | "Reward Available";
  statusDate: string;
  rewardType:
    | "Airdrop"
    | "Whitelist/Waitlist"
    | "Points"
    | "Token Sale"
    | "NFT";
  raiseFunds?: string;
  backers?: Backer[];
  backersExtra?: number;
  tasks: AirdropTask[];
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  chain?: string;
  network?: "Testnet" | "Mainnet" | "Both";
}

export interface Backer {
  name: string;
  logoUrl: string;
  initial: string;
  color: string;
}

const VC: Record<string, Backer> = {
  framework: {
    name: "Framework Ventures",
    logoUrl: "https://unavatar.io/twitter/framework",
    initial: "FW",
    color: "#7c3aed",
  },
  paradigm: {
    name: "Paradigm",
    logoUrl: "https://unavatar.io/twitter/paradigm",
    initial: "PA",
    color: "#2563eb",
  },
  coinbase: {
    name: "Coinbase Ventures",
    logoUrl: "https://unavatar.io/twitter/CoinbaseVentures",
    initial: "CB",
    color: "#1d4ed8",
  },
  dragonfly: {
    name: "Dragonfly",
    logoUrl: "https://unavatar.io/twitter/dragonfly_xyz",
    initial: "DF",
    color: "#0369a1",
  },
  a16z: {
    name: "a16z",
    logoUrl: "https://unavatar.io/twitter/a16z",
    initial: "A",
    color: "#1e40af",
  },
  pantera: {
    name: "Pantera Capital",
    logoUrl: "https://unavatar.io/twitter/PanteraCapital",
    initial: "PC",
    color: "#15803d",
  },
  binance: {
    name: "Binance Labs",
    logoUrl: "https://unavatar.io/twitter/BinanceLabs",
    initial: "BL",
    color: "#b45309",
  },
  mirana: {
    name: "Mirana Ventures",
    logoUrl: "https://unavatar.io/twitter/MiranaVentures",
    initial: "MV",
    color: "#6d28d9",
  },
  wintermute: {
    name: "Wintermute",
    logoUrl: "https://unavatar.io/twitter/wintermute_t",
    initial: "WM",
    color: "#047857",
  },
  multicoin: {
    name: "Multicoin Capital",
    logoUrl: "https://unavatar.io/twitter/multicoincap",
    initial: "MC",
    color: "#0891b2",
  },
  g500: {
    name: "500 Global",
    logoUrl: "https://unavatar.io/twitter/500global",
    initial: "5G",
    color: "#dc2626",
  },
  qcp: {
    name: "QCP Capital",
    logoUrl: "https://unavatar.io/twitter/QCPCapital",
    initial: "QC",
    color: "#7c2d12",
  },
  slow: {
    name: "Slow Ventures",
    logoUrl: "https://unavatar.io/twitter/slowventures",
    initial: "SV",
    color: "#374151",
  },
  jump: {
    name: "Jump Crypto",
    logoUrl: "https://unavatar.io/twitter/JumpCryptoHQ",
    initial: "JC",
    color: "#1f2937",
  },
  gnosis: {
    name: "Gnosis",
    logoUrl: "https://unavatar.io/twitter/gnosisdao",
    initial: "GN",
    color: "#065f46",
  },
  kraken: {
    name: "Kraken",
    logoUrl: "https://unavatar.io/twitter/krakenfx",
    initial: "KR",
    color: "#1d4ed8",
  },
  robot: {
    name: "Robot Ventures",
    logoUrl: "https://unavatar.io/twitter/robotventures",
    initial: "RV",
    color: "#78350f",
  },
  selini: {
    name: "Selini Capital",
    logoUrl: "https://unavatar.io/twitter/selini_capital",
    initial: "SC",
    color: "#4f46e5",
  },
  sony: {
    name: "Sony Innovation Fund",
    logoUrl: "https://unavatar.io/twitter/sony_ventures",
    initial: "SF",
    color: "#111827",
  },
  nimbus: {
    name: "Nimbus Capital",
    logoUrl: "https://unavatar.io/twitter/nimbuscap",
    initial: "NC",
    color: "#1e3a5f",
  },
};

export const mockAirdrops: Airdrop[] = [
  {
    id: 1,
    slug: "the-beacon-season-one",
    name: "The Beacon",
    ticker: "BCN",
    logoUrl: "https://pbs.twimg.com/profile_images/1931698210840797185/7a51VGa8_400x400.png",
    logoColor: "#3b82f6",
    logoInitial: "TB",
    isNew: true,
    status: "Potential",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: undefined,
    backers: [],
    description:
      "Season-based on-chain treasure hunt built on Treasure DAO ecosystem (Arbitrum). Play the current season 'Goblin's Gambit', complete tasks and climb the leaderboard for future token rewards.",
    website: "https://app.thebeacon.gg",
    twitter: "thebeacon_gg",
    telegram: "https://t.me/thebeacongg",
    discord: "https://discord.gg/thebeacon",
    chain: "Arbitrum",
    network: "Mainnet",
    tasks: [
      {
        name: "Sign Up via Referral",
        types: ["Social"],
        cost: 0,
        timeMin: 2,
        url: "https://app.thebeacon.gg/season-one?referralCode=EQKYL2YBVF",
      },
      {
        name: "Follow X (Twitter)",
        types: ["Social"],
        cost: 0,
        timeMin: 1,
        url: "https://twitter.com/thebeacon_gg",
      },
      {
        name: "Join Telegram",
        types: ["Social"],
        cost: 0,
        timeMin: 1,
        url: "https://t.me/thebeacongg",
      },
      {
        name: "Play 'Goblin's Gambit'",
        types: ["Game"],
        cost: 0,
        timeMin: 10,
        url: "https://app.thebeacon.gg/season-one",
      },
    ],
  },
  {
    id: 2,
    slug: "strato",
    name: "STRATO",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/strato_net",
    logoColor: "#1a56db",
    logoInitial: "ST",
    isNew: true,
    status: "Confirmed",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: "$18.50M",
    backers: [VC.framework, VC.slow, VC.paradigm],
    backersExtra: 4,
    description:
      "DeFi protocol with liquidity pools, CDP stablecoin minting, staking, and lending — all on Ethereum mainnet.",
    website: "https://strato.nexus",
    twitter: "strato_net",
    telegram: "https://t.me/strato_official",
    discord: "https://discord.gg/strato",
    chain: "Ethereum",
    network: "Mainnet",
    tasks: [
      {
        name: "Provide Liquidity to Swap Pools",
        types: ["Liquidity"],
        cost: 50,
        timeMin: 15,
        url: "https://strato.nexus/app",
      },
      {
        name: "Mint USDST via CDP",
        types: ["Mainnet"],
        cost: 100,
        timeMin: 10,
        url: "https://strato.nexus/app",
      },
      {
        name: "Stake in Safety Module",
        types: ["Staking"],
        cost: 50,
        timeMin: 5,
        url: "https://strato.nexus/app",
      },
      {
        name: "Deposit in Lending Pool",
        types: ["Staking"],
        cost: 20,
        timeMin: 5,
        url: "https://strato.nexus/app",
      },
    ],
  },
  {
    id: 3,
    slug: "netrun",
    name: "Netrun",
    ticker: "NET",
    logoUrl: "https://unavatar.io/twitter/netrun_xyz",
    logoColor: "#1a1a2e",
    logoInitial: "NR",
    isNew: false,
    status: "Potential",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: undefined,
    backers: [VC.dragonfly, VC.multicoin],
    backersExtra: 2,
    description:
      "Permissionless token launchpad with built-in DEX, NFT engine, and custom domains — currently live on testnet.",
    website: "https://netrun.xyz",
    twitter: "netrun_xyz",
    telegram: "https://t.me/netrun_xyz",
    discord: "https://discord.gg/netrun",
    chain: "Ethereum",
    network: "Testnet",
    tasks: [
      {
        name: "Apply & Join Testnet",
        types: ["Testnet"],
        cost: 0,
        timeMin: 5,
        url: "https://join.netrun.xyz",
      },
      {
        name: "Create Token on Testnet",
        types: ["Testnet"],
        cost: 0,
        timeMin: 10,
        url: "https://app.netrun.xyz",
      },
      {
        name: "Launch NFT Collection",
        types: ["Testnet"],
        cost: 0,
        timeMin: 10,
        url: "https://app.netrun.xyz",
      },
      {
        name: "Set Up Custom Domain",
        types: ["Testnet"],
        cost: 0,
        timeMin: 10,
        url: "https://app.netrun.xyz",
      },
    ],
  },
  {
    id: 4,
    slug: "boost-rabbithole",
    name: "Boost (RabbitHole)",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/rabbithole_gg",
    logoColor: "#ea580c",
    logoInitial: "BR",
    isNew: false,
    status: "Confirmed",
    statusDate: "May 25, 2026",
    rewardType: "Whitelist/Waitlist",
    raiseFunds: "$21.60M",
    backers: [VC.framework, VC.slow, VC.paradigm, VC.coinbase],
    backersExtra: 10,
    description:
      "On-chain quest platform that rewards users for completing DeFi and Web3 tasks across multiple chains.",
    website: "https://rabbithole.gg",
    twitter: "rabbithole_gg",
    telegram: "https://t.me/rabbithole_gg",
    discord: "https://discord.gg/rabbithole",
    chain: "Multi-chain",
    network: "Mainnet",
    tasks: [
      {
        name: "Fill Waitlist Form",
        types: ["Fill The Form"],
        cost: 0,
        timeMin: 3,
        url: "https://www.rabbithole.gg",
      },
    ],
  },
  {
    id: 5,
    slug: "hotstuff",
    name: "Hotstuff (Prev. Syndr Protocol)",
    ticker: undefined,
    logoUrl: "",
    logoColor: "#1f2937",
    logoInitial: "HS",
    isNew: false,
    status: "Potential",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: undefined,
    backers: [VC.mirana, VC.wintermute],
    backersExtra: 3,
    description:
      "Perpetual futures DEX on Arbitrum with a points program, trading competitions, and liquidity vaults.",
    website: "https://hotstuff.xyz",
    twitter: "HotstuffXYZ",
    telegram: "https://t.me/hotstuff_xyz",
    discord: "https://discord.gg/hotstuff",
    chain: "Arbitrum",
    network: "Mainnet",
    tasks: [
      {
        name: "Trade Perpetuals (Points Program)",
        types: ["Trading"],
        cost: 80,
        timeMin: 60,
        url: "https://app.hotstuff.xyz",
      },
      {
        name: "Provide Liquidity to Vault",
        types: ["Liquidity"],
        cost: 100,
        timeMin: 15,
        url: "https://app.hotstuff.xyz",
      },
      {
        name: "Complete Trading Expeditions",
        types: ["Mainnet"],
        cost: 0,
        timeMin: 20,
        url: "https://app.hotstuff.xyz",
      },
      {
        name: "Weekly Trading Competition",
        types: ["Trading"],
        cost: 80,
        timeMin: 30,
        url: "https://app.hotstuff.xyz",
      },
      {
        name: "Refer Friends",
        types: ["Referral"],
        cost: 0,
        timeMin: 5,
        url: "https://app.hotstuff.xyz",
      },
      {
        name: "Complete Social Missions",
        types: ["Social"],
        cost: 0,
        timeMin: 10,
        url: "https://app.hotstuff.xyz",
      },
    ],
  },
  {
    id: 6,
    slug: "popdex",
    name: "PopDEX",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/popdex_io",
    logoColor: "#7c3aed",
    logoInitial: "PD",
    isNew: false,
    status: "Potential",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: "$30.00M",
    backers: [VC.paradigm, VC.coinbase, VC.pantera],
    backersExtra: 5,
    description:
      "Community-driven DEX on Arbitrum with liquidity incentives, social missions, and referral rewards.",
    website: "https://popdex.io",
    twitter: "popdex_io",
    telegram: "https://t.me/popdex_io",
    discord: "https://discord.gg/popdex",
    chain: "Arbitrum",
    network: "Mainnet",
    tasks: [
      {
        name: "Complete Social Missions",
        types: ["Social"],
        cost: 0,
        timeMin: 10,
        url: "https://popdex.io",
      },
      {
        name: "Provide Liquidity",
        types: ["Liquidity"],
        cost: 50,
        timeMin: 15,
        url: "https://popdex.io/app",
      },
      {
        name: "Refer & Earn Bonus Points",
        types: ["Referral"],
        cost: 0,
        timeMin: 5,
        url: "https://popdex.io",
      },
    ],
  },
  {
    id: 7,
    slug: "beep",
    name: "Beep",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/beep_fi",
    logoColor: "#0d9488",
    logoInitial: "BP",
    isNew: false,
    status: "Confirmed",
    statusDate: "May 25, 2026",
    rewardType: "Airdrop",
    raiseFunds: undefined,
    backers: [VC.robot, VC.mirana, VC.wintermute],
    backersExtra: 5,
    description:
      "On-chain trading protocol built on Ethereum with a wallet-native UX for swapping ETH and stablecoins.",
    website: "https://beep.fi",
    twitter: "beep_fi",
    telegram: "https://t.me/beep_fi",
    discord: "https://discord.gg/beep",
    chain: "Ethereum",
    network: "Mainnet",
    tasks: [
      {
        name: "Connect Wallet & Trade ETH/USDC",
        types: ["Trading", "On-Chain Activity"],
        cost: 0,
        timeMin: 10,
        url: "https://beep.fi",
      },
    ],
  },
  {
    id: 8,
    slug: "nado",
    name: "Nado",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/nadodex",
    logoColor: "#1d4ed8",
    logoInitial: "ND",
    isNew: false,
    status: "Confirmed",
    statusDate: "May 22, 2026",
    rewardType: "Airdrop",
    raiseFunds: undefined,
    backers: [VC.dragonfly, VC.coinbase, VC.jump],
    backersExtra: 3,
    description:
      "Arbitrum-native perpetuals DEX with liquidity vaults, lending markets, and a points-farming program.",
    website: "https://nado.xyz",
    twitter: "nadodex",
    telegram: "https://t.me/nadodex",
    discord: "https://discord.gg/nado",
    chain: "Arbitrum",
    network: "Mainnet",
    tasks: [
      {
        name: "Trade Perpetuals (Farm Points)",
        types: ["Trading"],
        cost: 50,
        timeMin: 30,
        url: "https://nado.xyz/trade",
      },
      {
        name: "Provide Liquidity to NLP Vault",
        types: ["Liquidity"],
        cost: 50,
        timeMin: 15,
        url: "https://nado.xyz/earn",
      },
      {
        name: "Lend & Borrow Assets",
        types: ["Staking"],
        cost: 20,
        timeMin: 10,
        url: "https://nado.xyz/lend",
      },
    ],
  },
  {
    id: 9,
    slug: "k25-ai",
    name: "K25.ai",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/k25ai",
    logoColor: "#111827",
    logoInitial: "K2",
    isNew: true,
    status: "Confirmed",
    statusDate: "May 22, 2026",
    rewardType: "Whitelist/Waitlist",
    raiseFunds: "$2.00M",
    backers: [VC.g500, VC.selini],
    backersExtra: 0,
    description:
      "AI-powered analytics layer for crypto traders on Solana, with an early access waitlist and token rewards.",
    website: "https://k25.ai",
    twitter: "k25ai",
    telegram: "https://t.me/k25ai",
    discord: "https://discord.gg/k25ai",
    chain: "Solana",
    network: "Mainnet",
    tasks: [
      {
        name: "Register Waitlist",
        types: ["Fill The Form"],
        cost: 0,
        timeMin: 2,
        url: "https://k25.ai",
      },
    ],
  },
  {
    id: 10,
    slug: "grove",
    name: "Grove",
    ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/groveprotocol",
    logoColor: "#92400e",
    logoInitial: "GV",
    isNew: true,
    status: "Confirmed",
    statusDate: "May 21, 2026",
    rewardType: "Points",
    raiseFunds: undefined,
    backers: [VC.slow, VC.coinbase],
    backersExtra: 1,
    description:
      "Earn points by holding assets in Grove's smart vaults on Ethereum — points convert to tokens at TGE.",
    website: "https://grove.fi",
    twitter: "groveprotocol",
    telegram: "https://t.me/grove_fi",
    discord: "https://discord.gg/grove",
    chain: "Ethereum",
    network: "Mainnet",
    tasks: [
      {
        name: "Hold Assets to Earn Points",
        types: ["Hold"],
        cost: 100,
        timeMin: 5,
        url: "https://grove.fi",
      },
    ],
  },
  {
    id: 11,
    slug: "konnex",
    name: "Konnex",
    ticker: "KNX",
    logoUrl: "https://unavatar.io/twitter/konnex_world",
    logoColor: "#374151",
    logoInitial: "KX",
    isNew: false,
    status: "Confirmed",
    statusDate: "May 21, 2026",
    rewardType: "Airdrop",
    raiseFunds: "$15.00M",
    backers: [VC.dragonfly, VC.pantera, VC.a16z, VC.coinbase],
    backersExtra: 2,
    description:
      "Web3 social protocol connecting users across chains with daily tasks, leaderboards, and referral rewards.",
    website: "https://konnex.world",
    twitter: "konnex_world",
    telegram: "https://t.me/konnex_world",
    discord: "https://discord.gg/konnex",
    chain: "Multi-chain",
    network: "Both",
    tasks: [
      {
        name: "Complete Social Missions",
        types: ["Social"],
        cost: 0,
        timeMin: 15,
        url: "https://konnex.world",
      },
      {
        name: "Complete Daily Tasks",
        types: ["Social"],
        cost: 0,
        timeMin: 10,
        url: "https://konnex.world/tasks",
      },
      {
        name: "Join Leaderboard Challenge",
        types: ["Community"],
        cost: 0,
        timeMin: 5,
        url: "https://konnex.world/leaderboard",
      },
      {
        name: "Refer Friends",
        types: ["Referral"],
        cost: 0,
        timeMin: 5,
        url: "https://konnex.world/ref",
      },
    ],
  },
];

export const mockNews: any[] = [];
export const mockTasks: any[] = [];
export const mockActivity: any[] = [];

export const mockArticles: any[] = [
  {
    id: "art-2026-05-28-bitcoin-liquidity-shock",
    slug: "bitcoin-liquidity-shock-funding-stablecoins-etf-flows",
    title: "Bitcoin’s Liquidity Shock: Why Funding, Stablecoins, and ETF Flows Matter More Than the Headline Price",
    excerpt:
      "Bitcoin traded like a macro asset again as oil, rates, and ETF flows all pulled in different directions. The real story is the market plumbing underneath the move.",
    content: `
Bitcoin's latest move looks simple on a chart and messy everywhere else. The price action was driven by a mix of risk-off macro flows, renewed energy-market stress, and a steady structural bid from ETF buyers. That combination matters because it changes the shape of the market: Bitcoin is increasingly being priced as a liquid macro asset, not just a speculative token.

The biggest clue is in derivatives. When funding turns negative or flat while spot demand stays sticky, it usually means traders are de-risking faster than long-term buyers are exiting. That can create sharp but temporary dips that later recover once spot absorbs the supply. In plain English: weak leverage can make the market look worse than the underlying demand really is.

Stablecoin flows also matter. If USDT and USDC issuance stays firm, it usually means fresh dry powder is entering crypto rails. If issuance slows while exchange reserves fall, liquidity can feel tighter even if price looks stable.

The takeaway is that investors should stop reading Bitcoin as one number. The real signal is the interaction between ETF inflows, derivatives positioning, and stablecoin liquidity.
    `,
    category: "News",
    tags: ["Bitcoin", "ETF", "Liquidity", "Stablecoins", "Macro"],
    author: "Ouwibo Markets Desk",
    coverImage: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 6,
    featured: true,
  },
  {
    id: "art-2026-05-28-ethereum-activity",
    slug: "ethereum-activity-fees-layer2-demand",
    title: "Ethereum’s Quiet Strength: Activity Is Shifting, Not Disappearing",
    excerpt:
      "Ethereum fees and usage keep being re-routed through Layer 2s, but the core network still acts as the settlement anchor.",
    content: `
Ethereum doesn't need loud headlines to matter. The chain still sits at the center of stablecoins, DeFi settlement, and Layer 2 security. What has changed is where the activity lives: more of the user experience happens on rollups, while Ethereum itself remains the final settlement layer.

That split is healthy, but it can confuse observers. Lower mainnet fees do not automatically mean lower relevance. They can also mean better scaling and more room for apps to grow. The right question is whether economic activity is moving away from Ethereum or simply becoming cheaper to process.

The deeper signal is capital formation. Projects still choose Ethereum when they want the broadest liquidity, the deepest tooling, and the cleanest path to institutional familiarity. That is not a meme. It is a network effect.

Bottom line: the ETH thesis is less about raw transaction counts and more about whether Ethereum remains the base layer that everything else settles into.
    `,
    category: "Analysis",
    tags: ["Ethereum", "Layer 2", "DeFi", "Fees", "Settlement"],
    author: "Ouwibo Research",
    coverImage: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 5,
    featured: false,
  },
  {
    id: "art-2026-05-28-stablecoin-rails",
    slug: "stablecoin-rails-payments-cash-app-mastercard",
    title: "Stablecoins Are Moving From Trading Tool to Payments Rail",
    excerpt:
      "Cash App, Mastercard, and other large brands are turning stablecoins into actual consumer and merchant infrastructure.",
    content: `
Stablecoins are no longer just a crypto-trader convenience. The bigger story is that consumer apps and payments companies are wiring them into the real economy.

That matters for three reasons. First, it reduces the gap between crypto balances and usable money. Second, it creates a less volatile way for users to move value across chains and apps. Third, it pushes the discussion from "should crypto exist?" to "which rails will win?"

The likely outcome is not one stablecoin to rule them all. It is a layered market: USDC for compliance-heavy flows, USDT for broad liquidity, and branded or region-specific products for specialized use cases.

For users, the most important effect is boring in the best way: faster settlement, lower friction, and fewer steps between earning money and spending it.
    `,
    category: "DeFi",
    tags: ["Stablecoins", "Payments", "USDC", "Mastercard", "Cash App"],
    author: "Ouwibo Payments Desk",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 5,
    featured: false,
  },
  {
    id: "art-2026-05-28-solana-liquidity",
    slug: "solana-liquidity-trading-activity-meme-season",
    title: "Solana’s Liquidity Is Deepening Again — But This Time the Signal Looks Cleaner",
    excerpt:
      "The SOL market is being supported by better liquidity conditions rather than just retail meme churn.",
    content: `
Solana has always been fast. The real question is whether it can remain durable once the meme-cycle excitement fades. Right now, the answer looks better than it did in prior runs.

Liquidity is deeper, execution is cleaner, and trading activity is no longer purely a retail-led event. That makes the market less fragile. When liquidity improves, large orders have less impact and price discovery becomes less chaotic.

The next test is whether builders keep shipping. A chain can survive on speculation for a while, but the stronger version of the Solana thesis is about consumer apps, payments, and onchain trading infrastructure that users actually keep returning to.

If that continues, Solana can hold a position as the high-throughput venue for active onchain users rather than just the home of the loudest cycle.
    `,
    category: "Layer 1",
    tags: ["Solana", "Liquidity", "Trading", "DeFi", "Apps"],
    author: "Ouwibo Research",
    coverImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 5,
    featured: false,
  },
  {
    id: "art-2026-05-28-crypto-policy-gemini",
    slug: "crypto-policy-gemini-cftc-reversal-regulatory-shift",
    title: "A Gemini Penalty Reversal Could Signal a Bigger U.S. Crypto Policy Shift",
    excerpt:
      "A regulator moving to withdraw a penalty against Gemini may be small on paper, but it suggests a larger change in enforcement tone.",
    content: `
When regulators reverse or soften past actions, the headline size usually understates the impact. A withdrawn penalty tells markets that the enforcement environment may be entering a different phase.

For the industry, that matters because policy clarity changes capital allocation. Exchanges, custodians, and payments firms make hiring, product, and compliance decisions based on the expected regulatory temperature. If the temperature drops, investment usually follows.

This does not mean the U.S. becomes crypto-friendly overnight. It means the argument is shifting from punishment-first to framework-first. That is a meaningful distinction for institutional players who want rules they can model.

The market should watch whether this is isolated or part of a wider pattern across CFTC, SEC, and Treasury attitudes.
    `,
    category: "News",
    tags: ["Policy", "Regulation", "Gemini", "CFTC", "United States"],
    author: "Ouwibo Policy Desk",
    coverImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 6,
    featured: false,
  },
  {
    id: "art-2026-05-28-political-market-map",
    slug: "politics-trump-texas-paxton-cornyn-crypto-policy",
    title: "Politics Is Now a Crypto Market Variable — Here’s Why the Texas Senate Fight Matters",
    excerpt:
      "The Texas Republican runoff is not just politics; it affects the regulatory mood for crypto and risk assets.",
    content: `
Crypto traders still pretend politics is separate from markets, then act surprised when it moves prices. The Texas Senate fight is a useful example: leadership changes, regulatory priorities shift, and those shifts affect everything from enforcement to stablecoin legislation.

The broader point is that crypto has become politically legible. Candidates talk about it in fundraising, policy committees treat it as a real issue, and industry groups now behave like traditional lobby blocs. That means political outcomes increasingly feed into market expectations.

If a crypto-friendly bloc gains power, the effect is not just symbolic. It can change how much uncertainty companies face when launching products, listing tokens, or applying for licenses.

This is why a good crypto site should include politics coverage alongside market news. The two are too connected to separate anymore.
    `,
    category: "Analysis",
    tags: ["Politics", "Texas", "Crypto Policy", "Senate", "Markets"],
    author: "Ouwibo Editorial",
    coverImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 5,
    featured: false,
  },
  {
    id: "art-2026-05-28-fed-liquidity",
    slug: "fed-liquidity-risk-assets-crypto-correlation",
    title: "The Fed, Liquidity, and Why Crypto Still Trades Like a Risk Asset",
    excerpt:
      "Inflation prints, rate expectations, and risk appetite still matter more than most crypto headlines admit.",
    content: `
Crypto often claims to be uncorrelated until the macro tape reminds everyone otherwise. Liquidity is still the main driver. When traders expect easier financial conditions, risk assets tend to re-rate together.

That correlation matters because Bitcoin and major alts now attract a mix of speculative, institutional, and treasury-driven capital. Each group reacts differently to inflation data, bond yields, and central bank commentary.

The practical lesson: if you want to understand crypto, you also need to understand rates. The cost of capital affects leverage, market-making, and the appetite for long-duration bets.

In short, the Fed is still one of crypto’s biggest invisible exchanges.
    `,
    category: "News",
    tags: ["Fed", "Liquidity", "Bitcoin", "Macro", "Rates"],
    author: "Ouwibo Macro Desk",
    coverImage: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 5,
    featured: false,
  },
  {
    id: "art-2026-05-28-defi-reality-check",
    slug: "defi-reality-check-yield-dex-onchain-usage",
    title: "DeFi’s Real Story in 2026: Less Hype, More Usable Infrastructure",
    excerpt:
      "The best DeFi projects now look like financial infrastructure, not just yield experiments.",
    content: `
The strongest DeFi projects in 2026 are not trying to win by yelling the loudest. They win by making the chain easier to use, cheaper to bridge, and safer to hold value in.

That shift matters because the old DeFi playbook was built around incentives. The newer playbook is built around usefulness: borrowing, swapping, payments, and yield products that feel less like a campaign and more like a product.

Users care less about narratives and more about execution. If a protocol can handle liquidity without constant emissions and can survive without heroic token incentives, it has a better chance of lasting.

This is the version of DeFi that institutions can actually evaluate.
    `,
    category: "DeFi",
    tags: ["DeFi", "Yield", "DEX", "Infrastructure", "Onchain"],
    author: "Ouwibo DeFi Desk",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 4,
    featured: false,
  },
  {
    id: "art-2026-05-28-ethereum-policy",
    slug: "ethereum-policy-stablecoins-security-settlement",
    title: "Why Ethereum Still Wins the Policy Game Even When Price Is Quiet",
    excerpt:
      "The network’s compliance, settlement, and stablecoin position keeps it important even without constant hype.",
    content: `
Ethereum's policy advantage is underappreciated. It is the chain most financial teams already know how to describe to lawyers, auditors, and risk committees.

That does not guarantee the highest price performance in every cycle, but it helps Ethereum stay embedded in the parts of crypto that are hardest to dislodge: stablecoins, settlement, and tokenized financial workflows.

Whenever regulations tighten, the networks that can explain themselves clearly tend to keep the most useful institutional relationships.

For Ethereum, that is often enough to preserve relevance even when sentiment cools.
    `,
    category: "Analysis",
    tags: ["Ethereum", "Policy", "Stablecoins", "Settlement", "Compliance"],
    author: "Ouwibo Editorial",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 4,
    featured: false,
  },
  {
    id: "art-2026-05-28-crypto-politics-x",
    slug: "crypto-politics-x-sources-trusted-accounts",
    title: "What Trusted X Accounts Are Watching Today: Crypto Policy, Senate Moves, and Market Tone",
    excerpt:
      "A fast summary of the political and crypto-policy posts most relevant to traders and builders today.",
    content: `
Trusted X accounts are flagging the same themes: crypto policy is getting more political, stablecoins are becoming real payment rails, and market structure is being shaped as much by Washington as by Wall Street.

That matters because X often surfaces the first public signal before a longer article lands. For a daily news desk, those posts are useful context, but they should never stand alone. The right way to use them is as a lead-in to confirmed reporting from Reuters, AP, Politico, CoinDesk, or The Block.

Today's mix of posts and reporting points to one conclusion: the market is no longer just reacting to token headlines. It is reacting to regulation, elections, and the growing institutionalization of crypto infrastructure.

That makes political coverage a core part of any serious crypto news page.
    `,
    category: "News",
    tags: ["X", "Politics", "Crypto Policy", "Reuters", "CoinDesk"],
    author: "Ouwibo Editorial",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop",
    publishedAt: "May 28, 2026",
    readTime: 4,
    featured: false,
  },
];
