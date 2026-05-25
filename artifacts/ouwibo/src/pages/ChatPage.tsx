import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PASTEL  = { sky: "#b8d8f0", mint: "#b8e8c8", peach: "#f0c4a8", lavender: "#d4c0f0" };

interface Message { id: string; role: "user" | "assistant"; content: string; }

const SUGGESTIONS = [
  "What are the best active airdrops right now?",
  "Show me easy airdrops for beginners",
  "What upcoming airdrops should I watch?",
  "How do I maximize my airdrop earnings?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "best active airdrops": "Right now, the top active airdrops include **Berachain** (est. $500-2000), **Scroll** (est. $300-1500), **Linea** (est. $200-800), and **EigenLayer** (est. $500-3000). Berachain and Scroll are particularly hot right now due to their Proof of Liquidity and zkRollup tech. ",
  "easy airdrops": "For beginners, I'd recommend **Scroll** (easy difficulty, 5 tasks), **Linea** (easy, 6 tasks), and **Manta Network** (easy, 5 tasks). These have straightforward tasks like bridging assets and following social accounts. Great for getting started! 💪",
  "upcoming airdrops": "Watch out for **zkSync Era** (est. $1000-5000) and **Starknet** (est. $800-4000). Both are highly anticipated L2 solutions. The mainnet launches haven't happened yet, so now's a great time to get positioned early! ⏰",
  "maximize earnings": "Here are my top tips to maximize airdrop earnings:\n\n1. **Start early** - Get in before the hype builds\n2. **Complete ALL tasks** - Every task counts\n3. **Stay consistent** - Regular activity is rewarded\n4. **Diversify** - Don't put all eggs in one basket\n5. **Use multiple wallets** - But never with the same IP/device for the same airdrop\n\nGood luck! 🍀",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  
  if (lower.includes("berachain")) return "**Berachain** is a high-performance EVM-identical L1 using Proof of Liquidity consensus. Est. reward: $500-2000. It's currently active with 8 tasks and 450K+ participants. Highly recommended! ";
  if (lower.includes("scroll")) return "**Scroll** is an Ethereum-equivalent zkRollup. Est. reward: $300-1500. Easy difficulty with 5 tasks. Great for beginners! 890K+ participants already.";
  if (lower.includes("linea")) return "**Linea** is a Type 2 zkEVM by ConsenSys. Est. reward: $200-800. Easy difficulty with 6 tasks. 1.2M+ participants - very popular!";
  if (lower.includes("eigenlayer")) return "**EigenLayer** is a restaking protocol. Est. reward: $500-3000. Hard difficulty with 4 tasks. 320K participants. Great if you already have staked ETH!";
  
  return "I'm here to help you find the best crypto airdrops! You can ask me about:\n\n• **Active airdrops** - What's hot right now\n• **Easy airdrops** - Beginner-friendly options\n• **Upcoming airdrops** - Get in early\n• **Specific projects** - Details about any airdrop\n\nWhat would you like to know? ";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "Hello! I'm your Airdrop AI assistant  I can help you find the best crypto airdrops, explain how to complete tasks, and answer questions about specific projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const content = text ?? input.trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-10), // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again! 🙏"
      }]);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-primary border-2 border-foreground flex items-center justify-center" style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }}><Bot size={18} color="white" /></div><div><h1 style={{ fontSize: "1.2rem", fontWeight: 700 }}>AI Airdrop Assistant</h1><p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>Ask anything about crypto airdrops</p></div><span className="ml-auto px-2.5 py-1 rounded-full border-2 border-foreground/20 flex items-center gap-1" style={{ backgroundColor: PASTEL.mint, fontSize: "0.6rem", fontWeight: 700 }}><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Online
        </span></div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}><div
              className={cn("w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 mt-0.5", msg.role === "assistant" ? "bg-primary border-foreground" : "bg-foreground border-foreground")}
              style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}
            >
              {msg.role === "assistant" ? <Bot size={14} color="white" /> : <User size={14} color="hsl(var(--background))" />}
            </div><div
              className={cn("max-w-[78%] px-4 py-3 rounded-2xl border-2 text-sm leading-relaxed", msg.role === "assistant" ? "border-foreground/15" : "border-foreground")}
              style={{
                backgroundColor: msg.role === "assistant" ? PASTEL.sky : "hsl(var(--foreground))",
                color: msg.role === "user" ? "hsl(var(--background))" : undefined,
                boxShadow: "3px 3px 0 hsl(var(--border))",
                fontFamily: msg.role === "user" ? MONO : undefined,
                fontSize: msg.role === "user" ? "0.75rem" : undefined,
              }}
            >
              {msg.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line.split('**').map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                  {i < msg.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div></div>
        ))}
        {isLoading && (
          <div className="flex gap-3"><div className="w-8 h-8 rounded-xl border-2 border-foreground bg-primary flex items-center justify-center shrink-0" style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}><Bot size={14} color="white" /></div><div className="px-4 py-3 rounded-2xl border-2 border-foreground/15 flex items-center gap-2" style={{ backgroundColor: PASTEL.sky, boxShadow: "3px 3px 0 hsl(var(--border))" }}><Loader2 size={14} className="animate-spin text-muted-foreground" /><span className="text-muted-foreground text-xs">Thinking…</span></div></div>
        )}
        <div ref={bottomRef} /></div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-left p-3 rounded-2xl border-2 border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/50 transition-all hover:-translate-y-0.5"
              style={{ fontSize: "0.62rem", boxShadow: "2px 2px 0 hsl(var(--border))" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2"><input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about airdrops…"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-border bg-background focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
          style={{ fontSize: "0.75rem", boxShadow: "3px 3px 0 hsl(var(--border))" }}
        /><button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="w-12 h-12 rounded-2xl bg-primary text-white border-2 border-foreground flex items-center justify-center hover:-translate-y-px transition-all disabled:opacity-50 shrink-0"
          style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }}
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button></div><p className="text-center text-muted-foreground mt-2" style={{ fontSize: "0.58rem" }}>
        Connect your LLM API in settings to unlock full AI capabilities
      </p></div>
  );
}
