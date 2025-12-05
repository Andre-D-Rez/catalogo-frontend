import type { AuthResponse, User } from "~/types/product";

const API_BASE = import.meta.env.VITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";
const TOKEN_KEY = "authToken";
const USER_KEY = "user";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Credenciais inválidas");
    }

    const data: AuthResponse = await response.json();
    
    // Salvar no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    return data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === "admin";
  },

  getRole(): 'admin' | 'customer' | null {
    const user = this.getUser();
    return user?.role || null;
  },
};
