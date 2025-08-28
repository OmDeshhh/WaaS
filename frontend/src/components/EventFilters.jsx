import React, { useState } from "react";

export default function EventFilters({ onFilter }) {
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");

  const handleFilter = () => {
    onFilter({ status, url });
  };

  const handleReset = () => {
    setStatus("");
    setUrl("");
    onFilter({ status: "", url: "" });
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        type="text"
        placeholder="Filter by URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: "10px" }}>
        <option value="">All Status</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
      </select>
      <button onClick={handleFilter} style={{ marginRight: "5px" }}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
