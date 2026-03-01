import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../../src/context/AuthContext";
import { useAuth } from "../../src/hooks/useAuth";

// Builds minimal fetch-like responses for mocked API calls.
function jsonResponse({ ok, body }) {
  return {
    ok,
    json: async () => body,
  };
}

// Exposes auth state/actions in the DOM so provider behavior can be asserted.
function AuthProbe() {
  const { isLoading, isAuthenticated, user, login, register, logout } =
    useAuth();

  return (
    <div>
      <p data-testid="loading">{String(isLoading)}</p>
      <p data-testid="authenticated">{String(isAuthenticated)}</p>
      <p data-testid="username">{user?.name ?? "none"}</p>

      <button
        type="button"
        onClick={() => login({ email: "ada@clubhub.com", password: "secret" })}
      >
        Login Action
      </button>
      <button
        type="button"
        onClick={() =>
          register({
            name: "Ada",
            email: "ada@clubhub.com",
            password: "secret123",
          })
        }
      >
        Register Action
      </button>
      <button type="button" onClick={logout}>
        Logout Action
      </button>
    </div>
  );
}

describe("AuthProvider (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    global.fetch = jest.fn();
  });

  // Verifies initial app boot without a stored token stays logged out and avoids unnecessary API calls.
  test("initializes as unauthenticated when no token exists", async () => {
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("username")).toHaveTextContent("none");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // Verifies persisted token bootstraps user state by calling /api/auth/me with the Bearer token.
  test("hydrates user from /me when token already exists", async () => {
    localStorage.setItem("clubhub_token", "existing-token");

    global.fetch.mockResolvedValueOnce(
      jsonResponse({
        ok: true,
        body: {
          user: {
            id: 1,
            name: "Ada",
            email: "ada@clubhub.com",
            role: "student",
          },
        },
      }),
    );

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
      expect(screen.getByTestId("username")).toHaveTextContent("Ada");
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/me",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer existing-token",
        }),
      }),
    );
  });

  // Verifies login updates auth state, stores token, performs follow-up /me hydration, and logout clears state.
  test("supports login and logout lifecycle", async () => {
    const user = userEvent.setup();

    global.fetch
      .mockResolvedValueOnce(
        jsonResponse({
          ok: true,
          body: {
            token: "login-token",
            user: {
              id: 2,
              name: "Lin",
              email: "lin@clubhub.com",
              role: "student",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          ok: true,
          body: {
            user: {
              id: 2,
              name: "Lin",
              email: "lin@clubhub.com",
              role: "student",
            },
          },
        }),
      );

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    await user.click(screen.getByRole("button", { name: "Login Action" }));
    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
      expect(screen.getByTestId("username")).toHaveTextContent("Lin");
      expect(localStorage.getItem("clubhub_token")).toBe("login-token");
    });

    await user.click(screen.getByRole("button", { name: "Logout Action" }));
    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("username")).toHaveTextContent("none");
      expect(localStorage.getItem("clubhub_token")).toBeNull();
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "http://localhost:5000/api/auth/login",
      expect.objectContaining({ method: "POST" }),
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "http://localhost:5000/api/auth/me",
      expect.objectContaining({ method: "GET" }),
    );
  });

  // Verifies register updates auth state, stores token, and performs follow-up /me hydration.
  test("supports register lifecycle", async () => {
    const user = userEvent.setup();

    global.fetch
      .mockResolvedValueOnce(
        jsonResponse({
          ok: true,
          body: {
            token: "register-token",
            user: {
              id: 3,
              name: "Mia",
              email: "mia@clubhub.com",
              role: "student",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          ok: true,
          body: {
            user: {
              id: 3,
              name: "Mia",
              email: "mia@clubhub.com",
              role: "student",
            },
          },
        }),
      );

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    await user.click(screen.getByRole("button", { name: "Register Action" }));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
      expect(screen.getByTestId("username")).toHaveTextContent("Mia");
      expect(localStorage.getItem("clubhub_token")).toBe("register-token");
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "http://localhost:5000/api/auth/register",
      expect.objectContaining({ method: "POST" }),
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "http://localhost:5000/api/auth/me",
      expect.objectContaining({ method: "GET" }),
    );
  });
});
