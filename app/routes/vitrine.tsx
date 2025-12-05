import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Vitrine - Catálogo de Veículos" },
    { name: "description", content: "Navegue por nossa coleção de veículos" },
  ];
}

export default function Vitrine() {
  return (
    <MainStyle>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 mb-2">Vitrine de Veículos</h1>
        <p className="text-gray-600 mb-8">Explore nossa coleção completa</p>
        
        <div className="bg-white/50 rounded-xl border p-8 text-center">
          <p className="text-gray-600">
            Carregando veículos...
          </p>
        </div>
      </div>
    </MainStyle>
  );
}
