import { Link } from "react-router";
import type { CarProduct } from "~/types/product";

export default function ProductCard({ product }: { product: CarProduct }) {
  const displayName = product.modelName;
  const imageUrl = product.imagens?.[0];
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {displayName}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-purple-600 line-clamp-1 text-sm sm:text-base">
            {displayName}
          </h3>
          <span className="text-xs sm:text-sm text-gray-900 whitespace-nowrap">{product.year}</span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-900 line-clamp-1">
          Tipo: {product.type}
        </p>
        {product.description && (
          <p className="mt-2 text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-3">
          <Link
            to={`/produto/${product._id}`}
            className="block rounded-md bg-purple-600 px-3 py-2 text-center text-xs sm:text-sm text-white hover:bg-purple-700 transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
