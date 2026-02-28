const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
const db = require("../src/db");

const STATE_FILE = path.join(os.tmpdir(), "clubhub-testcontainers-state.json");

module.exports = async () => {
  try {
    await db.pool.end();
  } catch (_error) {}

  if (!fs.existsSync(STATE_FILE)) {
    return;
  }

  const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));

  try {
    execSync(`docker rm -f ${state.containerId}`, { stdio: "ignore" });
  } catch (_error) {}

  fs.rmSync(STATE_FILE, { force: true });
};
