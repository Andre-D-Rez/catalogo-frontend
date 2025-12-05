import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Login - Catálogo de Veículos" },
    { name: "description", content: "Faça login na sua conta" },
  ];
}

export default function Login() {
  return (
    <MainStyle>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 mb-2">Login</h1>
        <p className="text-gray-600 mb-8">Acesse sua conta</p>
        
        <div className="bg-white/50 rounded-xl border p-8">
          <p className="text-gray-600 text-center">
            Formulário de login em desenvolvimento
          </p>
        </div>
      </div>
    </MainStyle>
  );
}
