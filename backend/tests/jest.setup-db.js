const fs = require("fs");
const os = require("os");
const path = require("path");
const { Client } = require("pg");
const { execSync } = require("child_process");
const { GenericContainer } = require("testcontainers");

const STATE_FILE = path.join(os.tmpdir(), "clubhub-testcontainers-state.json");
const CONTAINER_NAME = "clubhub-test-db";

async function waitForDbReady(clientConfig, retries = 20, delayMs = 500) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const client = new Client(clientConfig);

    try {
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      return;
    } catch (error) {
      try {
        await client.end();
      } catch (_err) {}

      if (attempt === retries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

module.exports = async () => {
  try {
    execSync(`docker rm -f ${CONTAINER_NAME}`, { stdio: "ignore" });
  } catch (_error) {}

  const container = await new GenericContainer("postgres:16-alpine")
    .withName(CONTAINER_NAME)
    .withEnvironment({
      POSTGRES_USER: "postgres",
      POSTGRES_PASSWORD: "postgres",
      POSTGRES_DB: "clubhub_test",
    })
    .withExposedPorts({ container: 5432, host: 55432 })
    .start();

  const dbConfig = {
    host: "127.0.0.1",
    port: 55432,
    database: "clubhub_test",
    user: "postgres",
    password: "postgres",
  };

  await waitForDbReady(dbConfig);

  const schemaPath = path.resolve(__dirname, "../src/database/schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");

  const client = new Client(dbConfig);
  await client.connect();
  await client.query(schemaSql);
  await client.end();

  fs.writeFileSync(
    STATE_FILE,
    JSON.stringify({
      containerId: container.getId(),
    }),
    "utf-8",
  );
};
