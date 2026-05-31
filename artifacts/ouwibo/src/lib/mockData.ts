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
    logoUrl: "https://pbs.twimg.com/profile_images/1740080990133878784/S3Ygy13G_400x400.png",
    logoColor: "#1e3a5f",
    logoInitial: "BCN",
    isNew: true,
    status: "Potential",
    statusDate: "2026-05-31",
    rewardType: "Airdrop",
    raiseFunds: "Part of Treasure DAO",
    backers: [
      {
        name: "ZKsync",
        logoUrl: "https://unavatar.io/twitter/zksync",
        initial: "ZK",
        color: "#8b5cf6",
      },
      {
        name: "Chainlink Labs",
        logoUrl: "https://unavatar.io/twitter/chainlink",
        initial: "CL",
        color: "#2dd360",
      },
    ],
    description:
      "Free-to-play dungeon crawler on Arbitrum/Treasure DAO. Season 1 'Goblin's Gambit' features 7.7M $BCN reward pool. Play, collect Umbra Shards, convert to chests or Gobloonz, compete in Kraken Klash. 220k+ DAUs in past events.",
    website: "https://thebeacon.gg",
    twitter: "The_Beacon_GG",
    discord: "https://discord.com/invite/thebeacon",
    chain: "Arbitrum",
    network: "Mainnet",
    tasks: [
      { name: "Sign up via referral link", types: ["Social"], cost: 0, timeMin: 2, url: "https://app.thebeacon.gg/season-one?referralCode=EQKYL2YBVF" },
      { name: "Follow X/Twitter", types: ["Social"], cost: 0, timeMin: 1, url: "https://x.com/The_Beacon_GG" },
      { name: "Join Discord", types: ["Social"], cost: 0, timeMin: 2, url: "https://discord.com/invite/thebeacon" },
      { name: "Complete profile setup", types: ["Onboarding"], cost: 0, timeMin: 5, url: "https://app.thebeacon.gg/season-one?referralCode=EQKYL2YBVF" },
      { name: "Login daily & run dungeons", types: ["Play"], cost: 0, timeMin: 10, url: "https://app.thebeacon.gg/season-one?referralCode=EQKYL2YBVF" },
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
