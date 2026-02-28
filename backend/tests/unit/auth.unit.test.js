const jwt = require("jsonwebtoken");
const { authenticate } = require("../../src/middleware/authMiddleware");

jest.mock("jsonwebtoken");

const buildRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authenticate middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifies requests without an Authorization header are rejected.
  test("returns 401 when token is missing", () => {
    const req = { headers: {} };
    const res = buildRes();
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  // Verifies malformed or unverifiable tokens return an invalid token error.
  test("returns 401 when token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid-token" } };
    const res = buildRes();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error("invalid");
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  // Verifies expired JWTs return the specific token expired error.
  test("returns 401 when token is expired", () => {
    const req = { headers: { authorization: "Bearer expired-token" } };
    const res = buildRes();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      const error = new Error("expired");
      error.name = "TokenExpiredError";
      throw error;
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token expired" });
    expect(next).not.toHaveBeenCalled();
  });

  // Verifies valid tokens attach user context and continue middleware chain.
  test("attaches user info and calls next when token is valid", () => {
    const req = { headers: { authorization: "Bearer valid-token" } };
    const res = buildRes();
    const next = jest.fn();

    jwt.verify.mockReturnValue({ userId: 42, role: "student" });

    authenticate(req, res, next);

    expect(req.userId).toBe(42);
    expect(req.userRole).toBe("student");
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
