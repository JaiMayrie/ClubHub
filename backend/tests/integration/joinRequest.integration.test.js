const request = require("supertest");
const app = require("../../src/server");

describe("Join Request Endpoints", () => {
  let studentToken;
  let adminToken;
  let clubId;
  let requestId;

  const uniqueEmail = () =>
    `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;

  beforeAll(async () => {
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "alice@purdue.edu",
      password: "Password123!",
    });
    adminToken = adminLogin.body.token;

    const studentRes = await request(app).post("/api/auth/register").send({
      name: "Join Tester",
      email: uniqueEmail(),
      password: "password123",
    });
    studentToken = studentRes.body.token;

    // Create a club to use in tests
    const clubRes = await request(app)
      .post("/api/clubs")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Join Request Test Club",
        category: "Academic",
        description: "For join request testing",
      });
    clubId = clubRes.body.club.id;
  });

  // Verifies a student can submit a join request with a message.
  test("POST /api/join-requests - student submits join request", async () => {
    const res = await request(app)
      .post("/api/join-requests")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ club_id: clubId, message: "I would love to join!" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("request");
    expect(res.body.request.status).toBe("pending");
    requestId = res.body.request.id;
  });

  // Verifies a student cannot submit a duplicate pending request.
  test("POST /api/join-requests - fails on duplicate request", async () => {
    const res = await request(app)
      .post("/api/join-requests")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ club_id: clubId });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/already have a pending request/);
  });

  // Verifies missing club_id returns a validation error.
  test("POST /api/join-requests - fails without club_id", async () => {
    const res = await request(app)
      .post("/api/join-requests")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Club ID is required");
  });

  // Verifies join request for non-existent club returns 404.
  test("POST /api/join-requests - fails for non-existent club", async () => {
    const res = await request(app)
      .post("/api/join-requests")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ club_id: 999999 });

    expect(res.statusCode).toBe(404);
  });

  // Verifies student can view their own join requests.
  test("GET /api/join-requests/my-requests - returns user's requests", async () => {
    const res = await request(app)
      .get("/api/join-requests/my-requests")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("requests");
    expect(Array.isArray(res.body.requests)).toBe(true);
    expect(res.body.requests.length).toBeGreaterThan(0);
  });

  // Verifies admin can view pending requests for their club.
  test("GET /api/clubs/:id/join-requests - admin sees pending requests", async () => {
    const res = await request(app)
      .get(`/api/clubs/${clubId}/join-requests`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("requests");
    expect(res.body.requests.length).toBeGreaterThan(0);
  });

  // Verifies a non-admin cannot view another club's join requests.
  test("GET /api/clubs/:id/join-requests - student is forbidden", async () => {
    const res = await request(app)
      .get(`/api/clubs/${clubId}/join-requests`)
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(403);
  });

  // Verifies admin can approve a pending request, creating a membership.
  test("PATCH /api/join-requests/:id - admin approves request", async () => {
    const res = await request(app)
      .patch(`/api/join-requests/${requestId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "approved" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "approved");
  });

  // Verifies an already-processed request cannot be actioned again.
  test("PATCH /api/join-requests/:id - fails on already processed request", async () => {
    const res = await request(app)
      .patch(`/api/join-requests/${requestId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "rejected" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/already been processed/);
  });

  // Verifies invalid status value is rejected.
  test("PATCH /api/join-requests/:id - fails with invalid status", async () => {
    const res = await request(app)
      .patch(`/api/join-requests/${requestId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "maybe" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/approved.*rejected/i);
  });
});