const clubController = require("../../src/controllers/clubController");
const db = require("../../src/db");

jest.mock("../../src/db");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("clubController - createClub validation", () => {
  beforeEach(() => jest.clearAllMocks());

  // Verifies missing required fields are rejected before hitting the database.
  test("returns 400 when name is missing", async () => {
    const req = {
      body: { category: "Academic", description: "A club" },
      userId: 1,
      userRole: "admin",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Name, category, and description are required",
    });
  });

  // Verifies club name must meet minimum length requirement.
  test("returns 400 when name is too short", async () => {
    const req = {
      body: { name: "AB", category: "Academic", description: "A club" },
      userId: 1,
      userRole: "admin",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Club name must be between 3 and 150 characters",
    });
  });

  // Verifies only predefined categories are accepted.
  test("returns 400 when category is invalid", async () => {
    const req = {
      body: { name: "Cool Club", category: "Invalid", description: "A club" },
      userId: 1,
      userRole: "admin",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0].error).toMatch(/Invalid category/);
  });

  // Verifies non-admin users cannot create clubs.
  test("returns 403 when user is not admin", async () => {
    const req = {
      body: { name: "Cool Club", category: "Academic", description: "A club" },
      userId: 1,
      userRole: "student",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Only administrators can create clubs",
    });
  });

  // Verifies invalid contact email format is caught before insert.
  test("returns 400 when contact_email is invalid", async () => {
    const req = {
      body: {
        name: "Cool Club",
        category: "Academic",
        description: "A club",
        contact_email: "notanemail",
      },
      userId: 1,
      userRole: "admin",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid contact email format",
    });
  });

  // Verifies a valid request calls the database and returns 201.
  test("returns 201 when club is created successfully", async () => {
    const fakeClub = {
      id: 1,
      name: "Robotics Club",
      category: "Academic",
      description: "Build robots",
    };

    db.query.mockResolvedValueOnce({ rows: [fakeClub] });

    const req = {
      body: { name: "Robotics Club", category: "Academic", description: "Build robots" },
      userId: 1,
      userRole: "admin",
    };
    const res = buildRes();

    await clubController.createClub(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Club created successfully",
      club: fakeClub,
    });
  });
});

describe("clubController - getAllClubs", () => {
  beforeEach(() => jest.clearAllMocks());

  // Verifies empty results return an empty array with a message.
  test("returns empty array when no clubs found", async () => {
    db.query.mockResolvedValueOnce({ rows: [] });

    const req = { query: {} };
    const res = buildRes();

    await clubController.getAllClubs(req, res);

    expect(res.json).toHaveBeenCalledWith({
      clubs: [],
      count: 0,
      message: "No clubs found matching your criteria",
    });
  });

  // Verifies clubs are returned with count when results exist.
  test("returns clubs array with count", async () => {
    const fakeClubs = [
      { id: 1, name: "Chess Club", category: "Special Interest" },
      { id: 2, name: "Robotics Club", category: "Academic" },
    ];
    db.query.mockResolvedValueOnce({ rows: fakeClubs });

    const req = { query: {} };
    const res = buildRes();

    await clubController.getAllClubs(req, res);

    expect(res.json).toHaveBeenCalledWith({ clubs: fakeClubs, count: 2 });
  });
});