# T6 - API e Tela de Login com JWT (Frontend)

## Visão Geral
Implementação da tela de login com autenticação JWT, gerenciamento de token e verificação de acesso.

---

## 1. Tipos (app/types/product.ts)

```typescript
export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
```

---

## 2. Serviço de Autenticação (app/services/auth.ts)

```typescript
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
```

---

## 3. Página de Login (app/routes/login.tsx)

```typescript
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authService } from "~/services/auth";
import MainStyle from "~/components/MainStyle";
import toast from "react-hot-toast";

export function meta() {
  return [
    { title: "Login - Catálogo de Carros" },
    { name: "description", content: "Entre na sua conta" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await authService.login(email, password);
      toast.success(`Bem-vindo, ${user.name}!`, { icon: "👋" });
      navigate("/vitrine");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainStyle>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mb-8">Entre para acessar o catálogo</p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/50 rounded-xl border p-6 sm:p-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Não tem conta?{" "}
            <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </MainStyle>
  );
}
```

---

## 4. Navbar com Autenticação (app/components/Navbar.tsx)

```typescript
import { Link, NavLink, useNavigate } from "react-router";
import { authService } from "~/services/auth";
import { useEffect, useState } from "react";
import type { User } from "~/types/product";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <Link to="/" className="font-semibold text-purple-600 text-sm sm:text-base">
          Catálogo de Carros
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/vitrine"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Catálogo
          </NavLink>
          
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
              }
            >
              Admin
            </NavLink>
          )}
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-gray-700 hidden sm:inline">Olá, {user.name.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="text-gray-900 hover:text-purple-600 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Cadastrar
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
```

---

## 5. Gerenciamento de Token

### Armazenamento:
```javascript
localStorage.setItem("authToken", token);      // JWT Token
localStorage.setItem("user", JSON.stringify(user)); // Dados do usuário
```

### Recuperação:
```javascript
const token = localStorage.getItem("authToken");
const user = JSON.parse(localStorage.getItem("user"));
```

### Autorização:
```javascript
const headers = {
  "Authorization": `Bearer ${token}`
};
```

---

## 6. Fluxo de Autenticação

```
1. Usuário acessa /login
   ↓
2. Preenche email e senha
   ↓
3. Clica "Entrar"
   ↓
4. Frontend valida inputs
   ↓
5. POST /api/auth/login { email, password }
   ↓
6. Backend valida e retorna { user, token }
   ↓
7. Frontend salva token + user no localStorage
   ↓
8. Toast "Bem-vindo!"
   ↓
9. Redirecionamento para /vitrine
```

---

## 7. Rotas (app/routes.ts)

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/vitrine", "routes/vitrine.tsx"),
	route("/produto/:id", "routes/produto.$id.tsx"),
	route("/login", "routes/login.tsx"),
	route("/register", "routes/register.tsx"),
	route("/admin", "routes/admin.tsx"),
] satisfies RouteConfig;
```

---

## 8. Checklist de Implementação

- [ ] Criar tipos `User` e `AuthResponse` em `app/types/product.ts`
- [ ] Implementar `login()` em `app/services/auth.ts`
- [ ] Implementar `logout()` e `getUser()` em `app/services/auth.ts`
- [ ] Implementar `isAdmin()` e `getRole()` em `app/services/auth.ts`
- [ ] Criar página `login.tsx` em `app/routes/login.tsx`
- [ ] Adicionar rota `/login` em `app/routes.ts`
- [ ] Atualizar Navbar com lógica de autenticação
- [ ] Testar login bem-sucedido
- [ ] Testar credenciais inválidas
- [ ] Testar armazenamento de token
- [ ] Testar logout (limpar localStorage)
- [ ] Testar verificação de admin na navbar
- [ ] Testar persistência de sessão (F5)
- [ ] Validar token expirado no backend
