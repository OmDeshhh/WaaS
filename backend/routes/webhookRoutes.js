import express from "express";
import { handleWebhook, getWebhookLogs, retryWebhook } from "../controllers/webhookController.js";

const router = express.Router();

export default (db) => {
  router.post("/", (req, res) => handleWebhook(req, res, db));
  router.get("/", (req, res) => getWebhookLogs(req, res, db));
  router.post("/retry", (req, res) => retryWebhook(req, res, db)); // ✅ retry endpoint
  return router;
};
