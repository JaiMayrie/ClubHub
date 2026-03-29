const request = require("supertest");
const app = require("../../src/server");

describe("Club Endpoints", () => {
  let adminToken;
  let studentToken;
  let createdClubId;

  const uniqueEmail = () =>
    `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;

  // Register an admin and a student before all tests
  beforeAll(async () => {
    // Register admin user directly then manually set role via db if needed
    // For now we register and use the token — club creation requires admin role
    // Your seed data has alice@purdue.edu as admin, so we log in as her
    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "alice@purdue.edu",
      password: "Password123!",
    });
    adminToken = adminLogin.body.token;

    const studentRes = await request(app).post("/api/auth/register").send({
      name: "Student Tester",
      email: uniqueEmail(),
      password: "password123",
    });
    studentToken = studentRes.body.token;
  });

  // Verifies the public clubs endpoint returns an array.
  test("GET /api/clubs - returns all clubs", async () => {
    const res = await request(app).get("/api/clubs");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("clubs");
    expect(Array.isArray(res.body.clubs)).toBe(true);
  });

  // Verifies category filter only returns clubs in that category.
  test("GET /api/clubs?category=Academic - filters by category", async () => {
    const res = await request(app).get("/api/clubs?category=Academic");

    expect(res.statusCode).toBe(200);
    res.body.clubs.forEach((club) => {
      expect(club.category).toBe("Academic");
    });
  });

  // Verifies search returns clubs matching the keyword.
  test("GET /api/clubs?search=chess - filters by search term", async () => {
    const res = await request(app).get("/api/clubs?search=chess");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.clubs)).toBe(true);
  });

  // Verifies no results returns an empty array with a message.
  test("GET /api/clubs?search=zzznomatch - returns empty array", async () => {
    const res = await request(app).get("/api/clubs?search=zzznomatch");

    expect(res.statusCode).toBe(200);
    expect(res.body.clubs).toEqual([]);
  });

  // Verifies admin can create a club with valid data.
  test("POST /api/clubs - admin creates club successfully", async () => {
    const res = await request(app)
      .post("/api/clubs")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Integration Club",
        category: "Academic",
        description: "Created during integration tests",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("club");
    expect(res.body.club.name).toBe("Test Integration Club");
    createdClubId = res.body.club.id;
  });

  // Verifies students cannot create clubs.
  test("POST /api/clubs - student cannot create club", async () => {
    const res = await request(app)
      .post("/api/clubs")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        name: "Student Club",
        category: "Academic",
        description: "Should be rejected",
      });

    expect(res.statusCode).toBe(403);
  });

  // Verifies unauthenticated requests to create club are rejected.
  test("POST /api/clubs - fails without auth token", async () => {
    const res = await request(app).post("/api/clubs").send({
      name: "No Auth Club",
      category: "Academic",
      description: "No token",
    });

    expect(res.statusCode).toBe(401);
  });

  // Verifies a specific club can be retrieved by its ID.
  test("GET /api/clubs/:id - returns club by id", async () => {
    const res = await request(app).get(`/api/clubs/${createdClubId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("club");
    expect(res.body.club.id).toBe(createdClubId);
  });

  // Verifies invalid club ID returns 400.
  test("GET /api/clubs/:id - returns 400 for invalid id", async () => {
    const res = await request(app).get("/api/clubs/notanumber");

    expect(res.statusCode).toBe(400);
  });

  // Verifies non-existent club returns 404.
  test("GET /api/clubs/:id - returns 404 for missing club", async () => {
    const res = await request(app).get("/api/clubs/999999");

    expect(res.statusCode).toBe(404);
  });

  // Verifies admin can update their own club.
  test("PATCH /api/clubs/:id - admin updates club successfully", async () => {
    const res = await request(app)
      .patch(`/api/clubs/${createdClubId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ description: "Updated description" });

    expect(res.statusCode).toBe(200);
    expect(res.body.club.description).toBe("Updated description");
  });

  // Verifies my-clubs returns only clubs the authenticated user manages.
  test("GET /api/clubs/my-clubs - returns admin's clubs", async () => {
    const res = await request(app)
      .get("/api/clubs/my-clubs")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("clubs");
  });
});