import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";

dotenv.config();
const slackClient = new WebClient(process.env.SLACK_TOKEN);

export const notifySlack = async ({ url, error, status, time }) => {
  try {
    await slackClient.chat.postMessage({
      channel: process.env.SLACK_CHANNEL, // e.g. "#questions"
      text: `🚨 Webhook ${status.toUpperCase()}!
URL: ${url}
Error: ${error || "None"}
Time: ${time}`,
    });
  } catch (err) {
    console.error("Failed to send Slack notification:", err);
  }
};
