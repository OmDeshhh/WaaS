export const handleSlackCommand = async (req, res, db) => {
  const text = req.body.text; // e.g., "failed 5"
  const [status, limit = 5] = text.split(" ");

  const logs = await db.all(
    `SELECT * FROM webhook_events WHERE status = ? ORDER BY timestamp DESC LIMIT ?`,
    [status, limit]
  );

  const responseText = logs.length
    ? logs.map(l => `${l.id}. ${l.url} | ${l.status} | ${l.timestamp}`).join("\n")
    : "No logs found.";

  res.json({
    response_type: "ephemeral",
    text: `Latest ${status} webhooks:\n${responseText}`,
  });
};
