const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/server");

describe("Auth Endpoints", () => {
  const uniqueEmail = () =>
    `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;

  const registerAndGetToken = async () => {
    const email = uniqueEmail();
    const registerRes = await request(app).post("/api/auth/register").send({
      name: "Token User",
      email,
      password: "password123",
    });

    return {
      token: registerRes.body.token,
      user: registerRes.body.user,
    };
  };

  test("Register new user - success", async () => {
    const email = uniqueEmail();

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email,
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("Register fails with duplicate email", async () => {
    const email = uniqueEmail();

    await request(app).post("/api/auth/register").send({
      name: "Original User",
      email,
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Duplicate User",
      email,
      password: "password123",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("error", "Email already registered");
  });

  test("Register fails if fields missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "All fields required");
  });

  test("Register fails with invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "invalidemail",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid email format");
  });

  test("Register fails with short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@test.com",
      password: "123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "Password must be at least 6 characters",
    );
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

  test("Login success is case-insensitive for email", async () => {
    const email = uniqueEmail();
    const upperCasedEmail = email.toUpperCase();

    await request(app).post("/api/auth/register").send({
      name: "Case User",
      email,
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: upperCasedEmail,
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
    expect(res.body).toHaveProperty("error", "Email and password required");
  });

  test("Login fails with wrong password", async () => {
    const email = uniqueEmail();

    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email,
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });

  test("Login fails for unknown email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: uniqueEmail(),
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });

  test("JWT token grants access to protected route", async () => {
    const { token, user } = await registerAndGetToken();

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  });

  test("Protected route fails without JWT token", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "No token provided");
  });

  test("Protected route fails with invalid JWT token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalid.token.value");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid token");
  });

  test("Protected route fails with expired JWT token", async () => {
    const expiredToken = jwt.sign(
      {
        userId: 999,
        role: "student",
        exp: Math.floor(Date.now() / 1000) - 10, // Set expiration in the past
      },
      process.env.JWT_SECRET,
    );

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Token expired");
  });
});
