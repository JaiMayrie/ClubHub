const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/server");

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

  // Verifies a valid registration request returns 201 and a JWT token.
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

  // Verifies duplicate registration attempts are blocked with a 409 conflict.
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

  // Verifies registration fails when required fields are missing.
  test("Register fails if fields missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "All fields required");
  });

  // Verifies registration enforces valid email formatting.
  test("Register fails with invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "invalidemail",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid email format");
  });

  // Verifies registration enforces minimum password length.
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

  // Verifies login succeeds for a registered user with correct credentials.
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

  // Verifies login normalizes email casing before user lookup.
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

  // Verifies login fails when required credentials are not provided.
  test("Login fails if missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Email and password required");
  });

  // Verifies login rejects valid email with incorrect password.
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

  // Verifies login rejects unknown users with unauthorized response.
  test("Login fails for unknown email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: uniqueEmail(),
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });

  // Verifies a valid JWT grants access to the protected /me endpoint.
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

  // Verifies protected routes reject requests without an authorization token.
  test("Protected route fails without JWT token", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "No token provided");
  });

  // Verifies protected routes reject malformed or invalid JWTs.
  test("Protected route fails with invalid JWT token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalid.token.value");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid token");
  });

  // Verifies expired JWTs are rejected with the correct error message.
  test("Protected route fails with expired JWT token", async () => {
    const expiredToken = jwt.sign(
      {
        userId: 999,
        role: "student",
        exp: Math.floor(Date.now() / 1000) - 10,
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
