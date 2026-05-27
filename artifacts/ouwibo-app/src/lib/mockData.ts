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
  backers?: Backer[];
  backersExtra?: number;
  tasks: AirdropTask[];
  moniScore?: number;
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
    description: "DeFi protocol with liquidity pools, CDP stablecoin minting, staking, and lending — all on Ethereum mainnet.",
    website: "https://strato.nexus", twitter: "strato_net",
    telegram: "https://t.me/strato_official", discord: "https://discord.gg/strato",
    chain: "Ethereum", network: "Mainnet",
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
    description: "Permissionless token launchpad with built-in DEX, NFT engine, and custom domains — currently live on testnet.",
    website: "https://netrun.xyz", twitter: "netrun_xyz",
    telegram: "https://t.me/netrun_xyz", discord: "https://discord.gg/netrun",
    chain: "Ethereum", network: "Testnet",
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
    description: "On-chain quest platform that rewards users for completing DeFi and Web3 tasks across multiple chains.",
    website: "https://rabbithole.gg", twitter: "rabbithole_gg",
    telegram: "https://t.me/rabbithole_gg", discord: "https://discord.gg/rabbithole",
    chain: "Multi-chain", network: "Mainnet",
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
    description: "Perpetual futures DEX on Arbitrum with a points program, trading competitions, and liquidity vaults.",
    website: "https://hotstuff.xyz", twitter: "HotstuffXYZ",
    telegram: "https://t.me/hotstuff_xyz", discord: "https://discord.gg/hotstuff",
    chain: "Arbitrum", network: "Mainnet",
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
    description: "Community-driven DEX on Arbitrum with liquidity incentives, social missions, and referral rewards.",
    website: "https://popdex.io", twitter: "popdex_io",
    telegram: "https://t.me/popdex_io", discord: "https://discord.gg/popdex",
    chain: "Arbitrum", network: "Mainnet",
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
    description: "On-chain trading protocol built on Ethereum with a wallet-native UX for swapping ETH and stablecoins.",
    website: "https://beep.fi", twitter: "beep_fi",
    telegram: "https://t.me/beep_fi", discord: "https://discord.gg/beep",
    chain: "Ethereum", network: "Mainnet",
    tasks: [
      { name: "Connect Wallet & Trade ETH/USDC", types: ["Trading", "On-Chain Activity"], cost: 0, timeMin: 10, url: "https://beep.fi" },
    ],
  },
  {
    id: 7, slug: "nado",
    name: "Nado", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/nadodex",
    logoColor: "#1d4ed8", logoInitial: "ND", isNew: false,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Airdrop", raiseFunds: undefined,
    backers: [VC.dragonfly, VC.coinbase, VC.jump], backersExtra: 3,
    moniScore: 4500,
    description: "Arbitrum-native perpetuals DEX with liquidity vaults, lending markets, and a points-farming program.",
    website: "https://nado.xyz", twitter: "nadodex",
    telegram: "https://t.me/nadodex", discord: "https://discord.gg/nado",
    chain: "Arbitrum", network: "Mainnet",
    tasks: [
      { name: "Trade Perpetuals (Farm Points)",  types: ["Trading"],   cost: 50, timeMin: 30, url: "https://nado.xyz/trade" },
      { name: "Provide Liquidity to NLP Vault",  types: ["Liquidity"], cost: 50, timeMin: 15, url: "https://nado.xyz/earn" },
      { name: "Lend & Borrow Assets",            types: ["Staking"],   cost: 20, timeMin: 10, url: "https://nado.xyz/lend" },
    ],
  },
  {
    id: 8, slug: "k25-ai",
    name: "K25.ai", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/k25ai",
    logoColor: "#111827", logoInitial: "K2", isNew: true,
    status: "Confirmed", statusDate: "May 22, 2026",
    rewardType: "Whitelist/Waitlist", raiseFunds: "$2.00M",
    backers: [VC.g500, VC.selini], backersExtra: 0,
    moniScore: 3800,
    description: "AI-powered analytics layer for crypto traders on Solana, with an early access waitlist and token rewards.",
    website: "https://k25.ai", twitter: "k25ai",
    telegram: "https://t.me/k25ai", discord: "https://discord.gg/k25ai",
    chain: "Solana", network: "Mainnet",
    tasks: [
      { name: "Register Waitlist", types: ["Fill The Form"], cost: 0, timeMin: 2, url: "https://k25.ai" },
    ],
  },
  {
    id: 9, slug: "grove",
    name: "Grove", ticker: undefined,
    logoUrl: "https://unavatar.io/twitter/groveprotocol",
    logoColor: "#92400e", logoInitial: "GV", isNew: true,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Points", raiseFunds: undefined,
    backers: [VC.slow, VC.coinbase], backersExtra: 1,
    moniScore: 5500,
    description: "Earn points by holding assets in Grove's smart vaults on Ethereum — points convert to tokens at TGE.",
    website: "https://grove.fi", twitter: "groveprotocol",
    telegram: "https://t.me/grove_fi", discord: "https://discord.gg/grove",
    chain: "Ethereum", network: "Mainnet",
    tasks: [
      { name: "Hold Assets to Earn Points", types: ["Hold"], cost: 100, timeMin: 5, url: "https://grove.fi" },
    ],
  },
  {
    id: 10, slug: "konnex",
    name: "Konnex", ticker: "KNX",
    logoUrl: "https://unavatar.io/twitter/konnex_world",
    logoColor: "#374151", logoInitial: "KX", isNew: false,
    status: "Confirmed", statusDate: "May 21, 2026",
    rewardType: "Airdrop", raiseFunds: "$15.00M",
    backers: [VC.dragonfly, VC.pantera, VC.a16z, VC.coinbase], backersExtra: 2,
    moniScore: 4900,
    description: "Web3 social protocol connecting users across chains with daily tasks, leaderboards, and referral rewards.",
    website: "https://konnex.world", twitter: "konnex_world",
    telegram: "https://t.me/konnex_world", discord: "https://discord.gg/konnex",
    chain: "Multi-chain", network: "Both",
    tasks: [
      { name: "Complete Social Missions",   types: ["Social"],    cost: 0, timeMin: 15, url: "https://konnex.world" },
      { name: "Complete Daily Tasks",       types: ["Social"],    cost: 0, timeMin: 10, url: "https://konnex.world/tasks" },
      { name: "Join Leaderboard Challenge", types: ["Community"], cost: 0, timeMin: 5,  url: "https://konnex.world/leaderboard" },
      { name: "Refer Friends",              types: ["Referral"],  cost: 0, timeMin: 5,  url: "https://konnex.world/ref" },
    ],
  },
];

export const mockNews:     any[] = [];
export const mockTasks:    any[] = [];
export const mockActivity: any[] = [];

export const mockArticles: any[] = [
  {
    id: "art-2026-05-27-terawulf",
    slug: "terawulf-pivots-bitcoin-mining-to-ai-data-centers-kentucky",
    title: "TeraWulf Walks Away From Bitcoin Mining — Quietly Becoming One of the Largest AI Data Center Plays in the East",
    excerpt: "Maryland-based miner TeraWulf just acquired a 285-acre site in Kentucky and announced plans for 1+ GW of AI capacity. It's the loudest signal yet that public Bitcoin miners are converting hash power into GPU power — and the implications stretch from BTC supply economics to NVIDIA's next earnings call.",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80&auto=format&fit=crop",
    category: "Infrastructure",
    tags: ["Bitcoin", "Mining", "AI", "Data Centers", "TeraWulf", "Energy"],
    author: "Ouwibo Research",
    publishedAt: "2026-05-27T03:30:00.000Z",
    readTime: 9,
    featured: true,
    content: `# TeraWulf Walks Away From Bitcoin Mining — Quietly Becoming One of the Largest AI Data Center Plays in the East

When TeraWulf announced this week that it had acquired the **Muskie Data Campus** — a 285-acre site inside Kentucky's EastPark Industrial Park — most retail traders saw it as just another mining-company press release. It is not. It is, by a comfortable margin, the most candid admission from a publicly traded Bitcoin miner that **the future of their business is no longer Bitcoin**.

The company plans to build **more than one gigawatt of AI and HPC capacity** at the site, with the first 500 MW targeted for 2028 and the remaining 500 MW by 2030. Kentucky Power is already constructing a **345-kV substation** connected to a **765-kV transmission network** to serve it. That is utility-scale infrastructure normally reserved for hyperscalers — Microsoft, Amazon, Meta — not crypto miners.

## Why this isn't just "diversification"

For the past two years, every public miner has used the same talking points: *"We are expanding into HPC and AI as a complementary revenue stream."* That phrasing is doing a lot of work. In TeraWulf's case, the new site dwarfs anything they currently operate as a Bitcoin facility. The Muskie campus is not complementary — it is the company.

> The Kentucky pivot reframes TeraWulf as an energy-and-real-estate company that happens to mine BTC, rather than a BTC miner that happens to own real estate.

The shift makes sense if you study the unit economics. Bitcoin mining margins compressed brutally after the 2024 halving. Even at $100,000 per BTC, an S21 Pro running at $0.045/kWh produces single-digit profit margins on a good day. **A leased GPU rack to a Tier-1 AI customer can produce 5–10× the gross margin of the same megawatt running ASICs**, with multi-year contracts and creditworthy counterparties.

## The signal for Bitcoin's hashrate

This is the part traders should care about. If TeraWulf is the leading edge — and the announcement language strongly suggests it is — expect a wave of similar declarations from CleanSpark, Iris Energy, Hut 8, and Cipher Mining over the next 12 months. The biggest two consequences:

- **Hashrate growth slows.** Net new ASIC deployment shrinks as megawatts are diverted to GPUs. We may finally see hashrate plateau in 2026–2027 instead of grinding higher.
- **Difficulty adjustments turn miner-friendly.** A slower hashrate growth curve is unambiguously positive for surviving miners' margins.

Both are structurally bullish for BTC even before considering any demand-side ETF flow.

## What Kentucky gets

The Muskie site sits on about 1,000 acres at Eastpark Industrial Park, with 285 controlled for hyperscale development and room to expand. Local officials are pitching it as a shovel-ready job-creation play — long-term skilled jobs and tax base — which has emerged as the new political honeypot replacing manufacturing announcements of the 2010s.

### Why eastern Kentucky?

Three reasons in order of importance:

- **Stranded energy.** The region has cheap coal-to-grid power and surplus transmission capacity that hyperscalers in Northern Virginia desperately need but cannot get.
- **Tax incentives.** Kentucky has aggressively courted data centers with property tax abatements and accelerated depreciation.
- **Latency tolerance.** Unlike trading or gaming workloads, AI training is not latency-sensitive. A site can be 400 km from the nearest fiber hub and still command premium pricing.

## The investor angle: TeraWulf vs. the comp set

WULF closed Tuesday up ~7% on the announcement. The stock has lagged peers like CleanSpark and Iris Energy on a 12-month basis because investors were treating it as a pure BTC miner. With this pivot, the comp set arguably changes from RIOT, MARA, CLSK to **Applied Digital (APLD), Crusoe, and Coreweave** — companies trading at radically different multiples.

If WULF earns its way into the AI infrastructure peer group, the multiple expansion alone could re-rate the stock 50–100% even before the first GPU ships. That is the trade thesis being assembled this week.

## Risks and caveats

Two things to watch:

- **Execution risk.** Building a 1 GW facility is not the same as mining BTC. TeraWulf has never operated a hyperscale data center. Procurement of GPUs, cooling, and customer contracts is a different sport.
- **Anchor tenant uncertainty.** The press release notably did not name a customer. AI demand is real but increasingly concentrated in 4–5 hyperscalers who can dictate terms.

## The bigger picture

Step back and the move is part of a much larger story: **the merger of crypto-native energy infrastructure with AI workloads**. Bitcoin mining built out 30+ gigawatts of behind-the-meter power agreements over the last decade — agreements that AI companies are now desperate to inherit. The miners that survive the next cycle will be the ones who pivot fastest, hardest, and earliest.

TeraWulf just rang the bell.

If you are tracking the energy-AI-crypto convergence as a thematic, **WULF is now a Tier-1 name on the board**, alongside APLD and the private incumbents. The Muskie campus is the single largest physical bet a former pure-play BTC miner has placed on the AI thesis. Whether it pays off depends on customers, capital, and execution — but the direction of travel is unmistakable.

> When a Bitcoin miner walks away from mining, the cycle is not over. The cycle is evolving.`,
  },
  {
    id: "art-2026-05-27-btc-100k",
    slug: "bitcoin-100k-iran-war-etf-flows-deep-analysis",
    title: "Bitcoin Tests $100K Again — Iran War Volatility, ETF Flows, and Why the 'Boring Range' Is About to Break",
    excerpt: "BTC is grinding sideways inside the daily Ichimoku Cloud while geopolitical risk explodes around it. Here's why on-balance volume, the first TBO Close Long since October, and structural ETF demand are setting up the next directional move — and how to position for it.",
    coverImage: "https://images.unsplash.com/photo-1518544866330-95a2bec01dd0?w=1200&q=80&auto=format&fit=crop",
    category: "Analysis",
    tags: ["Bitcoin", "BTC", "Macro", "ETF", "Technical Analysis", "Iran"],
    author: "Ouwibo Markets Desk",
    publishedAt: "2026-05-27T08:15:00.000Z",
    readTime: 8,
    featured: true,
    content: `# Bitcoin Tests $100K Again — Iran War Volatility, ETF Flows, and Why the 'Boring Range' Is About to Break

Bitcoin price prediction headlines are once again converging on **$100,000** as the market digests Iran-war tail risk, oil-market pressure, ETF demand swings, and renewed institutional positioning. The chart, however, is doing something more interesting than the headlines suggest.

## The technical setup nobody is talking about

BTC is on track to print its **first TBO Close Long since October 2025**. For those unfamiliar, TBO (True Buy/Sell Open) is a high-conviction confluence signal across moving averages and momentum. The last TBO Close Long preceded a 38% rally over six weeks. If this one confirms at the daily close, it puts the bears on notice.

Layered on top of that:

- BTC remains **range-bound within the daily Ichimoku Cloud** on below-average volume.
- **On-balance volume (OBV)** sits beneath its moving average — a bearish divergence — but is now curling, suggesting a "top of the rollercoaster" reversal.
- **ETH** remains structurally bearish below the daily Cloud, with OBV confirming downward pressure.
- **Bitcoin dominance** is consolidating; **Others.D** is showing bearish divergence (higher highs in price, lower highs in RSI).

The TOTAL3.D chart — altcoins excluding ETH and stablecoins — remains strongly bearish beneath the daily Cloud, with OBV below its moving average. RSI still above 25 suggests **one more capitulation flush** before the bottom is in for the long tail.

> Translation: BTC is set up to lead. Alts are still cleaning up. This is not a "buy everything" tape.

## The macro overlay

Iran war volatility has done two things to the crypto market simultaneously:

- **Spiked safe-haven demand.** Gold has actually rolled over (more on that), but stablecoin issuance and BTC spot demand from non-US wallets have ticked up.
- **Suppressed risk-on flows.** The same headlines keep retail on the sidelines, exactly where institutional accumulators want them.

Oil-market pressure is the wildcard. If Brent breaks above $95 sustainably, the Fed's easing path narrows — bearish for risk assets including BTC. If oil mean-reverts as Iran tensions de-escalate, the path to a Q3 rate cut clears, which is structurally bullish.

### Gold's tell

Gold persists in **strong bearish mode under its daily Cloud and OBV**, and silver is initiating a TBO Open Short, down over 2% on the session. That matters because it means the *safe haven trade is not in gold right now*. If geopolitical risk continues to escalate, the marginal hedge flow has nowhere obvious to go except **Treasuries, the dollar, and Bitcoin**.

## ETF flows: the quiet bid that refuses to die

Through Q1 and Q2 2026, US spot BTC ETFs have absorbed an estimated **+$14B in net inflows**, with IBIT alone crossing $80B AUM. The pace slowed in May but never reversed — a meaningful contrast to the Grayscale-driven outflow regime that defined early 2024.

Bank of America's latest 13F filing, disclosed this week, revealed **massive indirect crypto exposure** through ETF holdings and stock positions in Strategy (formerly MicroStrategy), Block, Coinbase, and Robinhood. The institutional adoption story is no longer a forecast — it is a footnote in the largest US bank's quarterly filing.

## How to position

Three tactical setups for the next two weeks:

- **BTC long on confirmation of TBO Close Long.** Entry above $99,400 spot, invalidation $94,800. Target $108K–$112K cluster.
- **ETH/BTC mean-reversion short.** ETH structurally weak vs BTC; ratio below 0.036 confirms continuation toward 0.030.
- **Selective alt long basket** — only L1s with confirmed ETF chatter (SOL, XRP) and DeFi names tied to stablecoin yield (covered separately in our Clarity Act note).

### What invalidates the bull case

- A daily close below $93,500 on BTC. That reopens the $87K–$89K range that anchored Q1.
- Sustained oil above $98 forcing the Fed back to hawkish forward guidance.
- A failed Clarity Act vote (unlikely per current whip counts) that knocks ETH and SOL down 8–12% in a single session.

## The setup in one paragraph

BTC is coiled. The technicals are turning bullish at the same moment macro fear peaks and structural demand keeps absorbing every dip. Alts are still washing out. The asymmetric trade is **BTC long with a tight stop, paired with patience on the alt rotation**. The "boring range" of the last six weeks is the calm before the directional move. If TBO confirms, the directional move is up.

> Position before the headline, not after.

We update this thesis daily in the Markets channel. Subscribe for live alerts.`,
  },
  {
    id: "art-2026-05-27-clarity-act",
    slug: "clarity-act-senate-ethereum-solana-xrp-stablecoins",
    title: "The Clarity Act Hits the Senate by July 4 — What It Actually Changes for ETH, SOL, and XRP",
    excerpt: "The Digital Asset Market Clarity Act could become law in six weeks. If it passes with the current stablecoin-rewards provision intact, it rewrites the economics of every yield-bearing L1 token. Here's the line-by-line analysis traders are actually using.",
    coverImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80&auto=format&fit=crop",
    category: "News",
    tags: ["Regulation", "Ethereum", "Solana", "XRP", "Stablecoins", "Clarity Act"],
    author: "Ouwibo Policy",
    publishedAt: "2026-05-26T22:00:00.000Z",
    readTime: 10,
    featured: false,
    content: `# The Clarity Act Hits the Senate by July 4 — What It Actually Changes for ETH, SOL, and XRP

The **Digital Asset Market Clarity Act** ("Clarity Act") is on track for a Senate floor vote as early as July 4, 2026. If it passes in anything close to its current form, it will be the most consequential US crypto legislation since the original BitLicense — and the trade implications are larger than most retail investors realize.

## The two-paragraph summary

The Clarity Act does three things:

- **Splits jurisdiction** between the SEC (digital asset securities) and CFTC (digital commodities), with a clear definition of which is which.
- **Permits regulated entities to offer stablecoin yield** under a defined framework, ending the years-long enforcement freeze that killed BlockFi, Gemini Earn, and similar products.
- **Creates a federal market structure** for spot trading of digital commodities, displacing the patchwork of state money-transmitter regimes.

Each of these has direct implications for specific tokens.

## Why ETH wins

Ethereum is the largest stablecoin settlement layer on the planet — over $130B in USDC and USDT circulate on it. If the Clarity Act greenlights **stablecoin rewards** (i.e., yield-bearing stablecoins under a regulated framework), the demand for ETH as the gas asset spikes immediately:

- Every dollar of new regulated stablecoin yield issued on Ethereum needs ETH gas to mint, redeem, and rebalance.
- L2s that settle to Ethereum (Base, Arbitrum, Optimism) capture incremental fees, which translate into ETH burn via base fees.

> Conservatively, regulated stablecoin yield could add 8–12% to annual ETH burn within 18 months of passage.

### What this means for the ETH/BTC ratio

ETH/BTC has been bleeding for two years. A passed Clarity Act with the stablecoin provision intact would be the first **fundamentally bullish catalyst** for the ratio since the Merge. Expect a 15–25% re-rating in the ratio within 90 days of signature, even before the rules take effect.

## Why SOL wins too

Solana is the second-largest stablecoin venue and the fastest-growing. If regulated yield-bearing stablecoins become legal:

- Solana's superior throughput becomes a real moat for yield-bearing products that need frequent rebalancing.
- Major issuers (Circle, Paxos, Anchorage) are already prepared to issue Solana-native compliant products.

The thesis: SOL is the better growth play, ETH is the better quality play. Both win on the same legislation.

## Why XRP gets a boost

XRP has been the political football of US crypto regulation for five years. The Clarity Act effectively settles the *"is XRP a security?"* question by codifying the commodity classification of payment-focused tokens. Add the SEC settlement framework already in place, and Ripple becomes the **default cross-border settlement rail** for regulated US financial institutions.

A core provision of the legislation is making it *safe for financial institutions to build on-chain*. That is the bull case for XRP in three words.

## What about BTC?

Bitcoin is largely unaffected — it is already classified as a commodity by both regulators, and the ETF framework is mature. The Clarity Act is **modestly bullish** for BTC only insofar as it accelerates institutional adoption of the broader space.

If anything, BTC dominance compresses in the 60 days after passage as ETH and SOL outperform.

## The bear case

Three risks worth taking seriously:

- **Stablecoin yield provision gets stripped.** Senate Banking Democrats have signaled they want the rewards section weakened. If it gets gutted, ETH and SOL lose the single most important catalyst.
- **CFTC underfunding.** Giving the CFTC exclusive authority over digital commodities means little if Congress doesn't fund the build-out. The bill currently allocates only modest additional resources.
- **State pushback.** Governors and state AGs from both parties are aligned in opposition, particularly on prediction markets (separate fight, same legislation). The political math is messier than the Senate vote count suggests.

## The trade construction

If you are positioning for passage:

- **Long ETH** outright, with a tight stop below $2,400.
- **Long SOL/ETH** as a high-beta expression of the same thesis.
- **Long XRP** as a binary catalyst trade with a defined stop ahead of the vote.
- **Long COIN, HOOD** as the regulated US venue beneficiaries.

If you are positioning for failure:

- **Short ETH/BTC** as the Clarity Act fade.
- **Long stablecoins**, wait for the dust to settle, and buy the dip in 6–8 weeks.

## What to watch this week

- Senate Banking markup is scheduled for the week of June 9.
- Treasury and Federal Reserve testimony expected mid-June.
- Final whip count emerges around June 25.
- Floor vote target: **July 4 weekend**.

This is the single most important regulatory catalyst between now and the end of the year. We will publish a daily tracker as the vote approaches. **Read every word of the markup language — that is where the real money is made or lost.**`,
  },
  {
    id: "art-2026-05-26-solstice-finance",
    slug: "solstice-finance-slx-bitget-listing-solana-defi-deep-dive",
    title: "Solstice Finance (SLX) Lists on Bitget — A Deep Dive Into Solana's Newest Yield Engine",
    excerpt: "Bitget added SLX to its Solana ecosystem zone this week. Underneath the listing is a permissionless DeFi protocol blending fully collateralized stablecoins with automated funding-rate vaults. Here's how the mechanism works, where the airdrop fits in, and what to watch.",
    coverImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&q=80&auto=format&fit=crop",
    category: "DeFi",
    tags: ["Solana", "DeFi", "Stablecoins", "Yield", "Bitget", "Airdrop"],
    author: "Ouwibo DeFi",
    publishedAt: "2026-05-26T16:45:00.000Z",
    readTime: 9,
    featured: false,
    content: `# Solstice Finance (SLX) Lists on Bitget — A Deep Dive Into Solana's Newest Yield Engine

Bitget added **Solstice Finance (SLX)** to its Solana ecosystem zone for spot trading this week, instantly bringing one of the more interesting DeFi designs of the cycle onto a top-five global exchange. If you missed the airdrop, this article is the catch-up; if you caught it, this is the structural analysis to decide whether to hold.

## What Solstice actually is

Solstice Finance is a **permissionless yield protocol on Solana** built around two coupled primitives:

- A **fully collateralized synthetic dollar**, backed 1:1 by USDC and USDT held in audited custody.
- An **automated liquidity vault** that captures returns from funding rate arbitrage and basis trades between Solana perps and CEX futures.

The result is a stablecoin-denominated yield product that is **not** dependent on lending demand, recursive farming, or token emissions. It is a real-yield product — funded by the actual basis spread between Solana perps and centralized futures markets.

> Solstice is one of the cleaner expressions of the "Ethena on Solana" thesis: stablecoin yield as a product, not a token-emission game.

## The mechanism in three layers

### Layer 1: Mint

Users deposit USDC or USDT, receive sUSD (the protocol's synthetic dollar) at a 1:1 ratio. The deposit is held in qualified custody and never touches the trading engine directly.

### Layer 2: Vault

A parallel automated vault opens a short position in SOL-PERP on a centralized venue while holding the equivalent spot SOL. The delta is hedged. The basis — the funding rate paid by longs to shorts — accrues to the vault.

### Layer 3: Distribution

Yield from the vault is distributed pro-rata to sUSD stakers (sometimes called "sSLX" or similar staking receipt). Holders can either stake for yield or hold sUSD as a stable medium for other Solana DeFi protocols.

## The token: SLX

SLX is the governance and fee-capture token. Mechanics worth knowing:

- **Total supply:** capped, with a meaningful slice allocated to airdrop recipients.
- **Fee share:** a portion of vault performance fees accrues to staked SLX.
- **Governance:** decisions on supported collateral, vault parameters, and venue exposure flow through SLX holder voting.

The Bitget listing is meaningful because it is the **first top-tier CEX listing** for SLX, opening it to retail liquidity beyond the Solana-native DEX bootstrapping phase.

## The airdrop trail

Solstice ran a multi-phase airdrop campaign through Q1–Q2 2026:

- **Early depositors** to the testnet vault qualified for the largest tier.
- **Liquidity providers** on Orca and Raydium SLX pairs received a smaller allocation.
- **Loyalty NFT holders** from a partnered Solana mint had a separate snapshot.

If you participated in any of these tracks, check the official claim portal. The claim window typically closes 30–60 days after the listing — if you've been sleeping on a wallet, this is the week to check.

### For those who missed it

A **second-round airdrop** is rumored — typical Solana playbook — and will likely require staking sUSD, providing liquidity, or holding SLX for a defined period. Watch the official channels.

## The competitive landscape

Solstice competes with:

- **Ethena (USDe / sUSDe)** — Ethereum-native, larger TVL, more mature.
- **Resolv** — multi-chain, more conservative vault construction.
- **Native Solana stablecoin issuers** — PYUSD, USDC, USDT, none yield-bearing.

The bet on Solstice is that **Solana's lower transaction costs and higher throughput** make a yield-bearing stablecoin product structurally more attractive on SOL than on ETH — particularly for retail-sized depositors who get eaten by Ethereum gas at small notional.

## The risks

Three to take seriously:

- **Funding rate compression.** If perp basis goes negative for an extended period (rare but possible), the vault earns nothing or pays out. This has happened twice on ETH-based equivalents.
- **Custody risk.** The 1:1 stablecoin backing depends on qualified custody. Read the audit reports carefully.
- **Regulatory risk.** Yield-bearing stablecoins are at the center of the Clarity Act debate. A bad outcome there could force redesign.

## What to watch

- **Vault TVL.** Already growing through the listing. Cross $200M and the product is structurally validated.
- **sUSD adoption** in adjacent Solana DeFi (lending markets, AMM pairs). The faster sUSD becomes a base trading pair, the better.
- **Funding rate environment.** If SOL perps stay in positive funding, the yield product prints. If they roll negative for weeks, look elsewhere.

## The bottom line

Solstice is one of the more thoughtful designs in the current Solana DeFi cohort. The Bitget listing is a meaningful liquidity event, not just a vanity announcement. If you understand the basis-trade mechanic and trust the custody design, it deserves a slot in a diversified Solana DeFi portfolio.

If you don't understand the basis trade — read it again, and read the audit reports. Yield products are easy to oversimplify and dangerous when they break. This one looks well-built; that does not make it riskless.

> Real yield is back. The question is which protocols know how to capture it without blowing up.`,
  },
  {
    id: "art-2026-05-27-bofa-13f",
    slug: "bank-of-america-13f-148m-crypto-exposure-institutional",
    title: "Bank of America Just Disclosed $148M in Crypto Exposure — The Institutional Tape Has Quietly Flipped",
    excerpt: "BofA's latest 13F reveals indirect exposure to BTC, ETH, SOL, and XRP through ETFs and crypto-equity holdings. The total is small relative to the bank's balance sheet — but the signal is enormous. Here's what changed and what it tells us about the next 12 months.",
    coverImage: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&q=80&auto=format&fit=crop",
    category: "News",
    tags: ["Institutional", "Bank of America", "ETF", "Bitcoin", "Ethereum", "13F"],
    author: "Ouwibo Markets",
    publishedAt: "2026-05-26T19:00:00.000Z",
    readTime: 7,
    featured: false,
    content: `# Bank of America Just Disclosed $148M in Crypto Exposure — The Institutional Tape Has Quietly Flipped

Bank of America's latest **13F filing** with the SEC revealed massive indirect exposure to Bitcoin, XRP, Ethereum, and Solana through ETF holdings and stock positions in crypto-native companies. The total clocks in near $148M across spot crypto ETFs and equities — small in the context of BAC's $3T balance sheet, but **enormous as a signal**.

## What changed

For the first time, Bank of America's quarterly 13F filing shows:

- Material positions in spot Bitcoin ETFs (primarily IBIT and FBTC).
- Material positions in spot Ethereum ETFs.
- Direct equity holdings in **Strategy (MSTR)**, **Block, Inc.**, **Coinbase**, and **Robinhood**.
- Smaller positions in Solana-related public proxies.

These positions did not exist — at least not at a reportable scale — 12 months ago.

## Why this is bigger than the dollar figure

13F filings are infamous for understating real institutional exposure. They cover only US-registered long equity positions; derivatives, prime brokerage exposure, and overseas holdings are not captured. The **$148M is the floor, not the ceiling**, of BAC's crypto involvement.

> When a major US money-center bank quietly accumulates spot crypto ETF positions, the *narrative* of crypto in traditional finance has lost the past tense.

Three years ago, Bank of America's own research desk was publishing notes calling crypto a speculative bubble. Today, the firm has disclosed positions in the four largest crypto assets via ETFs *and* equity proxies. That is not a research note. That is a balance sheet decision.

## The broader institutional tape

Layer this filing onto what we already know:

- **BlackRock's IBIT** has crossed $80B AUM, faster than any ETF in history.
- **Fidelity, Franklin Templeton, and Bitwise** have all crossed $5B+ in their respective spot BTC/ETH products.
- **Goldman Sachs and Morgan Stanley** have approved BTC ETF allocations for select wealth management clients.
- **JPMorgan**, despite Jamie Dimon's public skepticism, custodies stablecoin reserves and processes settlement for major crypto firms.

The pattern is consistent: **public skepticism, private accumulation.** That gap is closing as 13Fs catch up.

## What it means for the cycle

Three direct implications:

### 1. The "institutions are coming" trade is over

That trade ended in Q4 2025. The institutions arrived. The trade now is **figuring out how aggressive the second wave will be** — endowments, sovereign wealth funds, corporate treasuries that follow the money-center banks.

### 2. ETF flows become structural, not cyclical

When BAC and its peers establish a position, they rebalance quarterly. That creates a **structural quarterly bid** for BTC and ETH that did not exist in prior cycles. Even on flat days, this changes the base-rate flow.

### 3. Volatility compresses, then explodes

Institutional positioning typically reduces day-to-day vol while increasing the magnitude of regime-change moves. Expect BTC realized vol to drift lower through 2026, punctuated by sharp 8–15% moves on macro catalysts.

## What the bears are saying

The strongest bear argument: **most of this exposure is hedged, not directional**. Banks hold ETFs as inventory against client demand, not as proprietary bets. Half the BAC position may be hedged against short futures, leaving net long exposure trivial.

That argument has merit but misses the point. **Even fully hedged inventory requires the bank to develop crypto operations, custody, settlement, and compliance infrastructure.** Once those exist, they are used. The cultural switch inside the bank is more important than the directional position.

## The trade implications

For positioning:

- **MSTR and COIN** become higher-quality long-duration plays. Their largest customers (banks, funds) are no longer customers in name only.
- **HOOD** benefits disproportionately as retail crypto trading volumes follow institutional validation.
- **Native crypto tokens** (BTC, ETH, SOL) get a structural bid floor.
- **Smaller exchange tokens** without institutional integration (BNB, OKB) face relative headwinds.

## The signal in one sentence

When the second-largest US bank discloses crypto positions in its 13F, the question is no longer *will institutions adopt crypto?* but *which crypto assets do institutions choose?* That choice — BTC, ETH, SOL, XRP — is now visible in plain SEC filings.

Read the 13F. Read it again. The future is hiding in plain sight.

> The institutional tape has flipped. The chart has not yet caught up.`,
  },
  {
    id: "art-2026-05-27-airdrop-strategy",
    slug: "airdrop-farming-strategy-2026-roi-time-efficient-guide",
    title: "How to Actually Farm Airdrops in 2026 — A Time-Efficient Playbook That Doesn't Burn You Out",
    excerpt: "Airdrop farming in 2026 is harder than in 2021 and more rewarding than in 2024. Sybil filters are sharper, project budgets are bigger, and the meta has shifted. This is the playbook we use internally to allocate hours across projects without losing our minds.",
    coverImage: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=1200&q=80&auto=format&fit=crop",
    category: "Guide",
    tags: ["Airdrop", "Strategy", "DeFi", "Guide", "Farming", "Sybil"],
    author: "Ouwibo Guides",
    publishedAt: "2026-05-27T05:00:00.000Z",
    readTime: 11,
    featured: false,
    content: `# How to Actually Farm Airdrops in 2026 — A Time-Efficient Playbook That Doesn't Burn You Out

Airdrop farming has evolved into a different sport. The "use 50 wallets and pray" strategy that worked in 2021 will get every one of those wallets filtered out by 2026 sybil detection. At the same time, **the best airdrops of 2026 have paid out more than any cycle before** — Berachain, Monad, Plasma, Hyperliquid, and the wave of Sui-based protocols have made eligible wallets meaningful sums.

This is the playbook we actually use. It is opinionated, narrow, and assumes you have **6–10 hours per week** to allocate.

## Step 1: Pick your meta (don't farm everything)

You cannot farm everything in 2026. The best operators specialize in 1–2 metas. The current options:

- **Sui ecosystem** — Sui itself, plus protocols like Cetus, Suilend, NAVI, Bluefin.
- **Berachain + EVM L1s** — Berachain, Monad, Sei, MegaETH.
- **Solana DeFi** — Solstice (just listed), Jito ecosystem, Sanctum, Drift.
- **Bitcoin L2s** — Babylon, Botanix, Citrea, Bitlayer.
- **Account abstraction / consumer apps** — Farcaster ecosystem, Lens, Worldcoin.

Pick **one primary meta** based on (a) where the upcoming token launches are concentrated and (b) where your existing skills/relationships sit. Treat the rest as low-effort opportunistic plays.

## Step 2: Quality wallets, not quantity wallets

The sybil-detection arms race has been won by protocols. The current frontier filters detect:

- **Transaction-time clustering** (all your wallets active in the same 5-minute window).
- **Funding chain analysis** (all your wallets funded from the same CEX deposit).
- **Behavioral fingerprinting** (same swap sizes, same protocol order, same gas settings).
- **Cross-protocol overlap** (wallets that appear together in every protocol).

> One well-aged wallet that looks like a real user beats fifty fresh wallets every single time.

**Optimal setup:** 2–4 wallets, each with at least 30 days of organic-looking activity, funded from different CEXes via different on-ramps, used at different times of day for different mixes of protocols. Yes, this is more work per wallet. It is also the difference between collecting and being filtered.

## Step 3: The 70/20/10 allocation

For each week of farming time:

- **70%** on confirmed airdrops with public points programs (Hyperliquid was the canonical example; today: select Sui DeFi, Babylon, Plasma).
- **20%** on high-probability speculative targets (Berachain DEX layer, Sui MM layer).
- **10%** on lottery tickets (new launches, untested protocols with potential).

The mistake most farmers make is inverting this. They spend 70% of their time on lottery tickets because the upside *sounds* better, and zero of those tickets pay off. Confirmed programs print money — boring money — that compounds.

## Step 4: Task economics, not yield

Here is the framework we use to decide whether a task is worth doing:

\`Expected airdrop value / Hours spent + Gas cost\`

If the result is below your hourly rate, **skip the task**. There is no shame in skipping. The hardest discipline in airdrop farming is saying no to volume.

### Example

A protocol asks for: complete 10 swaps (~30 min), provide LP for 7 days (~$200 capital lockup), refer 3 friends (impossible if you don't want to spam). Estimated airdrop value at TGE: $80–200.

Math: 30 minutes + $200 capital + reputational cost of spamming = **easy skip**, unless you genuinely want exposure to the protocol's product.

## Step 5: Capital allocation

A small bag of "active farming capital" deployed across high-conviction protocols beats a large bag in CEX collecting dust. Suggested mix for a $5,000 active farming budget:

- 40% in stablecoins for LP and lending positions.
- 30% in the L1 token of your primary meta (e.g., SUI, BERA, SOL).
- 20% rotating between high-conviction protocol tokens.
- 10% gas / unbonded reserve.

This is **not financial advice** — it is a framework for how active farmers allocate.

## Step 6: Snapshot timing

Most retail farmers miss this entirely. Protocols set snapshot dates that often align with one of:

- **Token generation event (TGE)** — the day the token launches.
- **Mainnet milestone** — first major upgrade.
- **End of public testnet phase.**

Once snapshot has passed, **your activity from that point forward is worth zero** for the first allocation. Pay attention to roadmaps. The single biggest airdrop wins come from realizing you've already done the work and just need to maintain.

## Step 7: Claim discipline

The number of farmers who do months of work and miss the claim window is staggering. Discipline:

- Bookmark every claim portal you might be eligible for.
- Set calendar reminders on TGE day.
- Don't sell into the first 30 minutes of trading. The optimal sell window for most 2025–2026 airdrops has been **day 3 to day 14** after TGE, after the early dump and before the long bleed.

## Step 8: Tax tracking

US-based farmers: every airdrop received is taxable as ordinary income at the fair market value on the day of receipt. If you sell later, it becomes a capital gain or loss from that basis.

Use a tracker (Koinly, CoinTracker, or a custom spreadsheet) **from day one**. The pain of reconstructing 18 months of cross-chain activity in March is real and avoidable.

## The mental model

The most successful airdrop farmers in 2026 are **portfolio managers, not gamblers**. They have a thesis, an allocation, a risk budget, a return target, and a defined cut-loss. They specialize. They say no to most opportunities. They track everything.

If that sounds boring, that is because it is. Boring farming makes money. Exciting farming makes content.

> The best alpha in airdrop farming has been the same for three cycles: pick fewer projects, do the work, and claim before the window closes.

We track the highest-quality programs on the Ouwibo airdrop tracker. Bookmark your watchlist, set notifications, and farm with intention.`,
  },
];
