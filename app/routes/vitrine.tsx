import ProductGrid from "~/components/ProductGrid";
import MainStyle from "~/components/MainStyle";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "~/services/products";
import type { CarProduct, VeiculoType } from "~/types/product";

export function meta() {
  return [
    { title: "Catálogo Completo - Catálogo de Carros" },
    { name: "description", content: "Todos os veículos disponíveis" },
  ];
}

const VEHICLE_TYPES: VeiculoType[] = [
  'SUV', 'Sedan', 'Hatch', 'Convertible', 'Coupe', 
  'Minivan', 'Pickup Truck', 'Wagon', 'Van', 'Other'
];

export default function Vitrine() {
  const [products, setProducts] = useState<CarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    brand: "",
    type: "",
    year: "",
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchAllProducts({
      brand: filters.brand || undefined,
      type: filters.type || undefined,
      year: filters.year ? Number(filters.year) : undefined,
    });
    setProducts(data);
    
    // Extrair marcas únicas para o select
    const uniqueBrands = [...new Set(data.map(p => p.brand))].sort();
    setBrands(uniqueBrands);
    setLoading(false);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ brand: "", type: "", year: "" });
  };

  return (
    <MainStyle>
      <section className="max-w-6xl">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600">Catálogo Completo</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-900">
              Explore todos os veículos disponíveis. Use os filtros para refinar sua busca.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/50 rounded-xl border p-4 sm:p-6 mb-6">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">Filtros</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label htmlFor="brand" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <select
                id="brand"
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Todas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Todos</option>
                {VEHICLE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Ano
              </label>
              <select
                id="year"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Todos</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-xs sm:text-sm text-gray-600">
            {products.length} veículo{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="mt-6 text-center text-gray-600">Carregando...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </MainStyle>
  );
}
