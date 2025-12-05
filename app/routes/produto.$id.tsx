import { useParams } from "react-router";
import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Detalhes do Veículo" },
    { name: "description", content: "Veja os detalhes completos do veículo" },
  ];
}

export default function ProdutoDetail() {
  const { id } = useParams();

  return (
    <MainStyle>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 mb-8">Detalhes do Veículo</h1>
        
        <div className="bg-white/50 rounded-xl border p-8">
          <p className="text-gray-600">
            Carregando detalhes do veículo ID: {id}
          </p>
        </div>
      </div>
    </MainStyle>
  );
}
