const { Worker } = require("bullmq");
const { sendWelcomeEmail } = require("../lib/mailer");
const connection = require("../lib/redis");
require("dotenv").config();

const worker = new Worker(
  "emailQueue",
  async (job) => {
    if (job.name === "sendWelcomeEmail") {
      const { email, username } = job.data;
      await sendWelcomeEmail(email, username);
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});
