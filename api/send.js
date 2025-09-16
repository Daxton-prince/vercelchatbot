import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const botToken = "8369883883:AAEwStouglzBaRWDWXpEiasDMDntnxOfvzk";
    const chatId = "5963539655"; // your personal Telegram ID
    const text = `New message from portfolio:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

