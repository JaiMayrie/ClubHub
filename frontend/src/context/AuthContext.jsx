import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
const TOKEN_KEY = "clubhub_token";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const fetchCurrentUser = useCallback(
    async (activeToken) => {
      if (!activeToken) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });

        if (!response.ok) {
          clearAuth();
          return;
        }

        const data = await response.json();
        setUser(data.user ?? null);
      } catch {
        clearAuth();
      }
    },
    [clearAuth],
  );

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (!token) {
        if (mounted) {
          setIsLoading(false);
        }
        return;
      }

      await fetchCurrentUser(token);

      if (mounted) {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [fetchCurrentUser, token]);

  const login = useCallback(async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Login failed");
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user ?? null);

    return data;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Registration failed");
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user ?? null);

    return data;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      register,
      logout,
    }),
    [token, user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
