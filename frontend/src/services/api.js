import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // backend URL

export const fetchWebhookLogs = async () => {
  const res = await axios.get(`${API_BASE}/webhooks`);
  return res.data;
};

export const retryWebhook = async (id) => {
  if (!id) throw new Error("Webhook ID is required");

  const res = await axios.post(`${API_BASE}/webhooks/retry`, {
    webhookId: id,  // <-- must match backend
  });

  return res.data;
};
