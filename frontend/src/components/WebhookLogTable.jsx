import React from "react";
import RetryButton from "./RetryButton";

export default function WebhookLogTable({ logs, onRetry }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>URL</th>
          <th>Status</th>
          <th>Time</th>
          <th>Error</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.url}</td>
            <td>{log.status}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.error || "-"}</td>
            <td>
              {log.status === "failed" && (
                <RetryButton id={log.id} onRetry={onRetry} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
