import { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "react";

const TOKEN_KEY = "clubhub_token";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthContext = createContext(null);

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
        console.log('❌ No token, skipping user fetch');
        setUser(null);
        return;
      }

      try {
        console.log('🔍 Fetching current user with token...');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });

        if (!response.ok) {
          console.log('❌ User fetch failed, clearing auth');
          clearAuth();
          return;
        }

        const data = await response.json();
        console.log('✅ User fetched:', data.user);
        setUser(data.user ?? null);
      } catch (error) {
        console.error('❌ Error fetching user:', error);
        clearAuth();
      }
    },
    [clearAuth],
  );

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      console.log('🚀 Initializing auth, token:', token ? 'exists' : 'none');
      
      if (!token) {
        console.log('✅ No token found, setting loading to false');
        if (mounted) {
          setIsLoading(false);
        }
        return;
      }

      await fetchCurrentUser(token);

      if (mounted) {
        console.log('✅ Auth initialized, setting loading to false');
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [fetchCurrentUser, token]);

  const login = useCallback(async ({ email, password }) => {
    try {
      console.log('🔐 Attempting login...');
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

      console.log('✅ Login successful');
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user ?? null);

      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    try {
      console.log('📝 Attempting registration...');
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

      console.log('✅ Registration successful');
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user ?? null);

      return data;
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    console.log('👋 Logging out');
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

  console.log('🔍 AuthContext render - isLoading:', isLoading, 'user:', user);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>Loading ClubHub...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Check console for logs</div>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}