export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      provider: process.env.OPENAI_API_KEY ? "openai" : "fallback",
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      configured: Boolean(process.env.OPENAI_API_KEY),
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    return res.status(200).json({
      message: fallbackReply(message),
      meta: {
        provider: "fallback",
        configured: false,
        reason: "OPENAI_API_KEY is not configured",
      },
    });
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter(
          (msg) =>
            ["user", "assistant"].includes(msg?.role) &&
            typeof msg?.content === "string",
        )
        .slice(-10)
        .map((msg) => ({ role: msg.role, content: msg.content.slice(0, 4000) }))
    : [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are Ouwibo AI, a concise crypto airdrop assistant. Help users find active opportunities, explain tasks, compare risk/reward, and avoid scams. Be practical, current-aware when context is provided, and never invent guaranteed rewards.",
          },
          ...safeHistory,
          { role: "user", content: message.slice(0, 4000) },
        ],
        max_tokens: 700,
        temperature: 0.6,
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "OpenAI API error:",
        response.status,
        errorText.slice(0, 500),
      );
      return res.status(200).json({
        message: fallbackReply(message),
        meta: {
          provider: "fallback",
          configured: true,
          upstreamStatus: response.status,
        },
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      message: reply || fallbackReply(message),
      meta: { provider: "openai", model },
    });
  } catch (error) {
    clearTimeout(timeout);
    console.error(
      "Chat API error:",
      error?.name || "Error",
      error?.message || error,
    );
    return res.status(200).json({
      message: fallbackReply(message),
      meta: {
        provider: "fallback",
        configured: true,
        reason: error?.name || "request_failed",
      },
    });
  }
}

function fallbackReply(input) {
  const lower = input.toLowerCase();

  if (lower.includes("best") || lower.includes("active")) {
    return "API model is not responding yet, so I am using fallback mode. For active airdrops, prioritize projects with clear official campaigns, low task cost, real backers, and no private-key/signature risks. Start with the dashboard list, complete only official links, and avoid paying fees unless the project is highly credible.";
  }

  if (lower.includes("easy") || lower.includes("beginner")) {
    return "Fallback mode: choose beginner-friendly airdrops with social tasks, testnet tasks, free mints, or simple quests. Avoid campaigns that require large deposits, suspicious wallet signatures, or unknown bridge contracts.";
  }

  if (lower.includes("scam") || lower.includes("risk")) {
    return "Fallback mode: red flags include private-key requests, seed phrase prompts, unlimited token approvals, fake airdrop claim sites, and tasks requiring large upfront deposits. Always verify links from the project’s official X/Discord/docs.";
  }

  return "The live AI provider is not responding right now, so this is fallback mode. Ask about active airdrops, easy tasks, risk checks, or how to prioritize opportunities and I will still help with a safe baseline answer.";
}
