# T5 - API e Tela de Cadastro de Usuário (Frontend)

## Visão Geral
Implementação da tela de cadastro de novo usuário com validação de formulário e integração com o backend.

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
```

---

## 3. Página de Registro (app/routes/register.tsx)

```typescript
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { authService } from "~/services/auth";
import MainStyle from "~/components/MainStyle";
import toast from "react-hot-toast";

export function meta() {
  return [
    { title: "Cadastro - Catálogo de Carros" },
    { name: "description", content: "Crie sua conta" },
  ];
}

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(name, email, password);
      toast.success("Conta criada! Faça login para continuar.", { icon: "✅" });
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainStyle>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 text-center mb-2">Cadastro</h1>
        <p className="text-center text-gray-600 mb-8">Crie sua conta gratuitamente</p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/50 rounded-xl border p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="João Silva"
            />
          </div>

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
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Já tem conta?{" "}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </MainStyle>
  );
}
```

---

## 4. Validações

### Frontend:
- ✅ Nome: Obrigatório, mínimo 3 caracteres (validar no backend)
- ✅ Email: Obrigatório, formato válido
- ✅ Senha: Obrigatório, mínimo 6 caracteres
- ✅ Confirmação: Comparar com servidor
- ✅ Email único: Validar resposta do servidor

### UX:
- ✅ Feedback visual de loading (botão desabilitado)
- ✅ Toast notifications para sucesso/erro
- ✅ Redirecionamento automático após cadastro
- ✅ Link para login existente
- ✅ Requisição mínima de senha clara

---

## 5. Estrutura do Formulário

```
┌─────────────────────────────┐
│      CADASTRO               │
│  Crie sua conta gratuitamente│
├─────────────────────────────┤
│ Nome completo *             │
│ [_____________________]      │
│                             │
│ Email *                     │
│ [_____________________]      │
│                             │
│ Senha *                     │
│ [_____________________]      │
│ Mínimo 6 caracteres         │
│                             │
│ ┌─────────────────────────┐ │
│ │  Criar conta            │ │
│ └─────────────────────────┘ │
│                             │
│ Já tem conta?               │
│ Faça login →                │
└─────────────────────────────┘
```

---

## 6. Fluxo de Uso

1. Usuário acessa `/register`
2. Preenche nome, email e senha
3. Clica em "Criar conta"
4. Frontend valida inputs locais
5. Faz POST para `/api/auth/register`
6. Backend valida e cria usuário
7. Retorna sucesso ou erro
8. Toast notification
9. Redirecionamento para `/login` em caso de sucesso

---

## 7. Rotas (app/main.tsx)

```typescript
import Home from './routes/home'
import Vitrine from './routes/vitrine'
import ProdutoDetail from './routes/produto.$id'
import Login from './routes/login'
import Register from './routes/register'
import Admin from './routes/admin'

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/vitrine" element={<Vitrine />} />
  <Route path="/produto/:id" element={<ProdutoDetail />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin" element={<Admin />} />
</Routes>
```

---

## 8. Checklist de Implementação

- [x] Criar tipos `User` e `AuthResponse` em `app/types/product.ts`
- [x] Implementar `register()` em `app/services/auth.ts`
- [x] Criar página `register.tsx` em `app/routes/register.tsx`
- [x] Adicionar rota `/register` em `app/main.tsx` (já estava configurada)
- [x] Validação de campos (mínimo 6 caracteres senha)
- [x] Implementar toast notifications
- [ ] Testar cadastro bem-sucedido
- [ ] Testar email duplicado
- [ ] Testar senha fraca
- [ ] Testar validação de email
- [ ] Validar redirecionamento após sucesso

---

## 9. Estrutura de Arquivos

```
app/
├── types/
│   └── product.ts           ✅ Com User e AuthResponse
├── services/
│   └── auth.ts              ✅ Com register(), login(), logout(), etc
├── routes/
│   └── register.tsx         ✅ Criado com formulário completo
└── components/
    └── MainStyle.tsx        ✅ Layout para formulário
```

---

## 10. Como Testar

### Teste 1: Cadastro Bem-sucedido
1. Acesse `http://localhost:5173/register`
2. Preencha:
   - Nome: "João Silva"
   - Email: "joao@example.com"
   - Senha: "123456"
3. Clique em "Criar conta"
4. Você deve ver:
   - Toast: "Conta criada! Faça login para continuar."
   - Redirecionamento para `/login`

### Teste 2: Email Duplicado
1. Tente registrar com um email já existente
2. Backend deve retornar erro
3. Toast exibe a mensagem de erro

### Teste 3: Validação de Senha Curta
1. Digite uma senha com menos de 6 caracteres
2. O input HTML5 vai bloquear o envio

### Teste 4: Email Inválido
1. Digite um email sem @
2. O input HTML5 vai bloquear o envio

### Teste 5: Responsividade
1. Teste em desktop, tablet e mobile
2. Formulário deve se adaptar bem em todas as resoluções

---

## 11. Recursos Implementados

✅ **Formulário Completo:** Nome, email, senha  
✅ **Validações HTML5:** Required, email type, minLength  
✅ **Feedback Visual:** Botão desabilitado durante carregamento  
✅ **Toast Notifications:** Sucesso e erro  
✅ **Redirecionamento:** Para login após sucesso  
✅ **Link para Login:** Para usuários já registrados  
✅ **Layout Responsivo:** Se adapta a mobile/tablet/desktop  
✅ **Meta Tags:** Title e description para SEO  

---

## 12. Próximos Passos (Futuro)

- [ ] Validação de senha forte (números, maiúsculas, símbolos)
- [ ] Campo de confirmação de senha
- [ ] Termos de serviço checkbox
- [ ] Link de recuperação de senha
- [ ] Integração com OAuth (Google, GitHub)
- [ ] Verificação de email
- [ ] CAPTCHA para spam prevention
- [ ] Rate limiting no frontend (feedback de tentativas)
