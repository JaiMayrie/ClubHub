const request = require("supertest");
const app = require("../../src/server");

describe("Membership Endpoints", () => {
  let studentToken;
  let adminToken;
  let clubId;

  const uniqueEmail = () =>
    `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;

  beforeAll(async () => {
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "alice@purdue.edu",
      password: "Password123!",
    });
    adminToken = adminLogin.body.token;

    const studentRes = await request(app).post("/api/auth/register").send({
      name: "Membership Tester",
      email: uniqueEmail(),
      password: "password123",
    });
    studentToken = studentRes.body.token;

    // Create club, submit and approve join request to set up membership
    const clubRes = await request(app)
      .post("/api/clubs")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Membership Test Club",
        category: "Sports",
        description: "For membership testing",
      });
    clubId = clubRes.body.club.id;

    const joinRes = await request(app)
      .post("/api/join-requests")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ club_id: clubId });

    const requestId = joinRes.body.request.id;

    await request(app)
      .patch(`/api/join-requests/${requestId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "approved" });
  });

  // Verifies a member can see their club memberships.
  test("GET /api/memberships/my-memberships - returns user memberships", async () => {
    const res = await request(app)
      .get("/api/memberships/my-memberships")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("memberships");
    expect(Array.isArray(res.body.memberships)).toBe(true);
    expect(res.body.memberships.length).toBeGreaterThan(0);
  });

  // Verifies membership includes expected club fields.
  test("GET /api/memberships/my-memberships - membership has club details", async () => {
    const res = await request(app)
      .get("/api/memberships/my-memberships")
      .set("Authorization", `Bearer ${studentToken}`);

    const membership = res.body.memberships[0];
    expect(membership).toHaveProperty("club_name");
    expect(membership).toHaveProperty("category");
    expect(membership).toHaveProperty("joined_at");
  });

  // Verifies unauthenticated requests are rejected.
  test("GET /api/memberships/my-memberships - fails without token", async () => {
    const res = await request(app).get("/api/memberships/my-memberships");

    expect(res.statusCode).toBe(401);
  });

  // Verifies a member can leave a club they belong to.
  test("DELETE /api/memberships/:clubId - student leaves club", async () => {
    const res = await request(app)
      .delete(`/api/memberships/${clubId}`)
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Successfully left the club");
  });

  // Verifies leaving a club they're not in returns 404.
  test("DELETE /api/memberships/:clubId - fails if not a member", async () => {
    const res = await request(app)
      .delete(`/api/memberships/${clubId}`)
      .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "You are not a member of this club");
  });
});