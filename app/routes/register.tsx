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
