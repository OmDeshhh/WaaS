import { notifySlack } from "../utils/slackNotifier.js";

export const handleWebhook = async (req, res, db) => {
  const { url, payload } = req.body;

  try {
    const isSuccess = Math.random() > 0.5;
    const status = isSuccess ? "success" : "failed";
    const error = isSuccess ? null : "Delivery failed";

    await db.run(
      `INSERT INTO webhook_events (url, payload, status, error) VALUES (?, ?, ?, ?)`,
      [url, JSON.stringify(payload), status, error]
    );

    // Notify Slack if initial webhook fails
    if (!isSuccess) {
      await notifySlack({
        url,
        status,
        error,
        time: new Date().toISOString(),
      });
    }

    res.json({ message: "Webhook processed", status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWebhookLogs = async (req, res, db) => {
  const logs = await db.all(
    `SELECT * FROM webhook_events ORDER BY timestamp DESC LIMIT 20`
  );
  res.json(logs);
};

// -------------------- Retry Webhook --------------------
export const retryWebhook = async (req, res, db) => {
  const { webhookId } = req.body;

  if (!webhookId) {
    return res.status(400).json({ error: "Missing webhookId in request body" });
  }

  try {
    const webhook = await db.get(
      `SELECT * FROM webhook_events WHERE id = ?`,
      [webhookId]
    );

    if (!webhook) {
      return res.status(404).json({ error: "Webhook not found" });
    }

    // Simulate retry success/failure
    const isSuccess = Math.random() > 0.5;
    const status = isSuccess ? "success" : "failed";
    const error = isSuccess ? null : "Delivery failed";

    // Update DB with retry result
    await db.run(
      `UPDATE webhook_events SET status = ?, error = ?, timestamp = CURRENT_TIMESTAMP WHERE id = ?`,
      [status, error, webhookId]
    );

    // ✅ Notify Slack if retry fails
    if (!isSuccess) {
      await notifySlack({
        url: webhook.url,
        status,
        error,
        time: new Date().toISOString(),
      });
    }

    res.json({ message: "Webhook retried", status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
