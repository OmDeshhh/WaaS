import express from "express";
import { handleSlackCommand } from "../controllers/slackController.js";

const router = express.Router();

export default (db) => {
  router.post("/", (req, res) => handleSlackCommand(req, res, db));
  return router;
};
