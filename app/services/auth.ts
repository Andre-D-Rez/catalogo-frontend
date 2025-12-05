import type { AuthResponse, User } from "~/types/product";
import { apiService } from "./api";

const TOKEN_KEY = "authToken";
const USER_KEY = "user";

export const authService = {
  async register(name: string, email: string, password: string): Promise<User> {
    const user = await apiService.post("/api/auth/register", { name, email, password });
    return user;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await apiService.post("/api/auth/login", { email, password });
    
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
    return this.getUser()?.role === "admin";
  },

  getRole(): 'admin' | 'customer' | null {
    return this.getUser()?.role || null;
  },
};
