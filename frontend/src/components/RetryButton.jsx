import React, { useState } from "react";
import { retryWebhook } from "../services/api";

export default function RetryButton({ id, onRetry }) {
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    setLoading(true);
    try {
      await retryWebhook(id);
      onRetry(); // refresh logs in parent
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleRetry} disabled={loading}>
      {loading ? "Retrying..." : "Retry"}
    </button>
  );
}
