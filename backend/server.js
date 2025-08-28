import express from "express";
import bodyParser from "body-parser";
import cors from "cors";               // ✅ import cors
import dotenv from "dotenv";
import { initDB } from "./db.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import slackRoutes from "./routes/slackRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173",   // React frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Parse JSON request bodies
app.use(bodyParser.json());

const startServer = async () => {
  const db = await initDB();

  // Routes
  app.use("/api/webhooks", webhookRoutes(db));
  app.use("/api/slack", slackRoutes(db));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
