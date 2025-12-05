import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Registro - Catálogo de Veículos" },
    { name: "description", content: "Crie sua conta" },
  ];
}

export default function Register() {
  return (
    <MainStyle>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 mb-2">Criar Conta</h1>
        <p className="text-gray-600 mb-8">Registre-se para acessar o sistema</p>
        
        <div className="bg-white/50 rounded-xl border p-8">
          <p className="text-gray-600 text-center">
            Formulário de registro em desenvolvimento
          </p>
        </div>
      </div>
    </MainStyle>
  );
}
