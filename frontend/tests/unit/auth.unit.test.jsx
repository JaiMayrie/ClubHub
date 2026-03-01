import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../src/components/ProtectedRoute";
import { useAuth } from "../../src/hooks/useAuth";

jest.mock("../../src/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("ProtectedRoute (unit)", () => {
  // Verifies route guard shows a loading placeholder while auth status is still being resolved.
  test("shows loading state while auth is loading", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute requireAuth />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Content</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // Verifies protected routes redirect unauthenticated users to the configured login route.
  test("redirects unauthenticated user to login for protected routes", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<ProtectedRoute requireAuth redirectTo="/login" />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Content</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Content")).toBeInTheDocument();
  });

  // Verifies guest-only routes redirect authenticated users to the configured post-login route.
  test("redirects authenticated user away from guest-only routes", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            element={
              <ProtectedRoute requireAuth={false} redirectTo="/dashboard" />
            }
          >
            <Route path="/login" element={<div>Login Content</div>} />
          </Route>
          <Route path="/dashboard" element={<div>Dashboard Content</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });
});
