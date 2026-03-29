const request = require("supertest");
const app = require("../../src/server");

describe("Server error handling", () => {
  // Verifies unknown routes return 404 with a meaningful message.
  test("GET unknown route returns 404", async () => {
    const res = await request(app).get("/api/does-not-exist");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Not found");
    expect(res.body).toHaveProperty("message");
  });

  // Verifies POST to unknown route also returns 404.
  test("POST unknown route returns 404", async () => {
    const res = await request(app).post("/api/made-up-endpoint").send({});

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Not found");
  });

  // Verifies health check is always reachable.
  test("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});