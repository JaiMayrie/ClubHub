const request = require("supertest");
const db = require("../src/config/db");
const app = require("../src/server");

describe("Auth Endpoints", () => {
  const uniqueEmail = () =>
    `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;

  afterAll(async () => {
    await db.pool.end();
  });

  test("Register new user - success", async () => {
    const email = uniqueEmail();

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email,
      password: "password123",
    });
    console.log("register response:", res.statusCode, res.body); // temp
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("Register fails if fields missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com" });

    expect(res.statusCode).toBe(400);
  });

  test("Register fails with invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "invalidemail",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("Register fails with short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@test.com",
      password: "123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("Login success", async () => {
    const email = uniqueEmail();

    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email,
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Login fails if missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
    });

    expect(res.statusCode).toBe(400);
  });
});
