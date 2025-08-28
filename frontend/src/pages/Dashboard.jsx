import React, { useEffect, useState } from "react";
import { fetchWebhookLogs } from "../services/api";
import WebhookLogTable from "../components/WebhookLogTable";
import EventFilters from "../components/EventFilters";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ status: "", url: "" });

  // Use useEffect to reload logs whenever filters change
  useEffect(() => {
    const loadLogs = async () => {
      let data = await fetchWebhookLogs();

      // Apply filters
      if (filters.status) {
        data = data.filter((log) => log.status === filters.status);
      }
      if (filters.url) {
        data = data.filter((log) => log.url.includes(filters.url));
      }

      setLogs(data);
    };

    loadLogs();
    const interval = setInterval(loadLogs, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [filters]); // <-- dependency on filters ensures filtering runs

  return (
    <div style={{ padding: "20px" }}>
      <h1>Webhook Monitoring Dashboard</h1>
      <EventFilters
        onFilter={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
      />
      <WebhookLogTable logs={logs} onRetry={() => setLogs([...logs])} />
    </div>
  );
}
