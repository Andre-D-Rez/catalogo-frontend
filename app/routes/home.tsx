import { Link } from "react-router";

export function meta() {
  return [
    { title: "Catálogo de Veículos" },
    { name: "description", content: "Bem-vindo ao catálogo de veículos" },
  ];
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-5xl font-bold text-purple-600 mb-6">
        Catálogo de Veículos
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Encontre o veículo perfeito para você
      </p>
      <Link
        to="/vitrine"
        className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors"
      >
        Ver Catálogo
      </Link>
    </div>
  );
}
