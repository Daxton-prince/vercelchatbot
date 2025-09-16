export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: "Bot token or chat ID not set" });
  }

  const text = `📩 New message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Telegram API Error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
}
