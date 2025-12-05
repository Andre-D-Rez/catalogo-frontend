import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchProductById } from "~/services/products";
import type { CarProduct } from "~/types/product";
import MainStyle from "~/components/MainStyle";

export function meta() {
  return [
    { title: "Detalhe do Veículo - Catálogo de Carros" },
    { name: "description", content: "Detalhes do veículo selecionado" },
  ];
}

export default function Produto() {
  const params = useParams();
  const [product, setProduct] = useState<CarProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return (
      <MainStyle>
        <div className="text-center text-gray-600">Carregando...</div>
      </MainStyle>
    );
  }

  if (!product) {
    return (
      <MainStyle>
        <div className="text-center">
          <p className="text-gray-600">Veículo não encontrado.</p>
        </div>
      </MainStyle>
    );
  }

  const displayName = product.modelName;
  const images = product.imagens || [];
  const currentImage = images[selectedImage];

  return (
    <MainStyle>
      <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border shadow-sm bg-gray-200">
            {currentImage ? (
              <img 
                src={currentImage} 
                alt={`${displayName} - ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                {displayName}
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-purple-600' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600 leading-tight">
            {displayName}
          </h1>
          <p className="text-sm text-gray-900">
            {product.brand} • Ano {product.year} • {product.type}
          </p>
          {product.description && (
            <p className="text-gray-900 leading-relaxed max-w-prose">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </MainStyle>
  );
}
