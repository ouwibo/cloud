import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What are the best active airdrops right now?",
  "Show me easy airdrops for beginners",
  "What upcoming airdrops should I watch?",
  "How do I maximize my airdrop earnings?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "best active airdrops":
    "Right now, the top active airdrops include **Berachain** (est. $500-2000), **Scroll** (est. $300-1500), **Linea** (est. $200-800), and **EigenLayer** (est. $500-3000). Berachain and Scroll are particularly hot right now due to their Proof of Liquidity and zkRollup tech.",
  "easy airdrops":
    "For beginners, I'd recommend **Scroll** (easy difficulty, 5 tasks), **Linea** (easy, 6 tasks), and **Manta Network** (easy, 5 tasks). These have straightforward tasks like bridging assets and following social accounts. Great for getting started! 💪",
  "upcoming airdrops":
    "Watch out for **zkSync Era** (est. $1000-5000) and **Starknet** (est. $800-4000). Both are highly anticipated L2 solutions. The mainnet launches haven't happened yet, so now's a great time to get positioned early! ⏰",
  "maximize earnings":
    "Here are my top tips to maximize airdrop earnings:\n\n1. **Start early** - Get in before the hype builds\n2. **Complete ALL tasks** - Every task counts\n3. **Stay consistent** - Regular activity is rewarded\n4. **Diversify** - Don't put all eggs in one basket\n5. **Use multiple wallets** - But never with the same IP/device for the same airdrop\n\nGood luck! 🍀",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();

  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }

  if (lower.includes("berachain")) {
    return "**Berachain** is a high-performance EVM-identical L1 using Proof of Liquidity consensus. Est. reward: $500-2000. It's currently active with 8 tasks and 450K+ participants. Highly recommended!";
  }
  if (lower.includes("scroll")) {
    return "**Scroll** is an Ethereum-equivalent zkRollup. Est. reward: $300-1500. Easy difficulty with 5 tasks. Great for beginners! 890K+ participants already.";
  }
  if (lower.includes("linea")) {
    return "**Linea** is a Type 2 zkEVM by ConsenSys. Est. reward: $200-800. Easy difficulty with 6 tasks. 1.2M+ participants - very popular!";
  }
  if (lower.includes("eigenlayer")) {
    return "**EigenLayer** is a restaking protocol. Est. reward: $500-3000. Hard difficulty with 4 tasks. 320K participants. Great if you already have staked ETH!";
  }

  return "I'm here to help you find the best crypto airdrops! You can ask me about:\n\n• **Active airdrops** - What's hot right now\n• **Easy airdrops** - Beginner-friendly options\n• **Upcoming airdrops** - Get in early\n• **Specific projects** - Details about any airdrop\n\nWhat would you like to know?";
}

function renderMessage(content: string) {
  return content.split("\n").map((line, i) => (
    <span key={i}>
      {line
        .split("**")
        .map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
        )}
      {i < content.split("\n").length - 1 && <br />}
    </span>
  ));
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello! I'm your Airdrop AI assistant. I can help you find the best crypto airdrops, explain how to complete tasks, and answer questions about specific projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(text?: string) {
    const content = text ?? input.trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = [...messages.slice(-10), userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getMockResponse(content),
        },
      ]);
    }

    setIsLoading(false);
  }

  return (
    <div className="premium-page flex min-h-[calc(100vh-6rem)] flex-col gap-4 pb-4 lg:min-h-[calc(100vh-7rem)]">
      <section className="premium-panel relative overflow-hidden rounded-3xl border p-4 sm:p-5">
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="premium-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Bot className="relative z-10 h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-[18px] font-black sm:text-[24px]">
                AI Airdrop Assistant
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
              Ask anything about crypto airdrops. Layout dan warna otomatis
              mengikuti mode siang/malam.
            </p>
          </div>
        </div>
      </section>

      <section className="premium-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" && "flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border shadow-sm",
                  msg.role === "assistant"
                    ? "border-primary/25 bg-primary/10 text-primary"
                    : "border-foreground/15 bg-foreground text-background",
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[84%] rounded-3xl border px-4 py-3 text-[13px] leading-7 shadow-sm sm:max-w-[72%]",
                  msg.role === "assistant"
                    ? "border-border/70 bg-card/85 text-foreground"
                    : "border-primary/30 bg-primary text-primary-foreground",
                )}
              >
                {renderMessage(msg.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-3xl border border-border/70 bg-card/85 px-4 py-3 text-[13px] text-muted-foreground shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="border-t border-border/60 px-4 py-3 sm:px-5">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Quick prompts
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="rounded-2xl border border-border/70 bg-muted/35 p-3 text-left text-[12px] font-semibold leading-5 text-muted-foreground transition-[background-color,color,transform,border-color] hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border/60 bg-background/50 p-3 sm:p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              placeholder="Ask about airdrops…"
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-2xl border border-border bg-card/85 px-4 py-3 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
            <Zap className="h-3 w-3" /> API fallback aktif saat endpoint belum
            tersedia.
          </p>
        </div>
      </section>
    </div>
  );
}
