import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { authService } from "~/services/auth";
import { createVehicle, uploadVehicleImage } from "~/services/products";
import MainStyle from "~/components/MainStyle";
import toast from "react-hot-toast";
import type { VeiculoType } from "~/types/product";

export function meta() {
  return [
    { title: "Admin - Cadastrar Veículo" },
    { name: "description", content: "Área administrativa" },
  ];
}

const VEHICLE_TYPES: VeiculoType[] = [
  'SUV', 'Sedan', 'Hatch', 'Convertible', 'Coupe', 
  'Minivan', 'Pickup Truck', 'Wagon', 'Van', 'Other'
];

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    modelName: "",
    year: new Date().getFullYear(),
    type: "Sedan" as VeiculoType,
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (!authService.isAdmin()) {
      toast.error("Acesso negado. Apenas administradores.");
      navigate("/vitrine");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = authService.getToken();
      if (!token) {
        toast.error("Token não encontrado. Faça login novamente.");
        navigate("/login");
        return;
      }

      const vehicle = await createVehicle(formData, token);
      if (!vehicle) {
        throw new Error("Erro ao criar veículo");
      }

      toast.success("Veículo cadastrado com sucesso!");

      // Upload de imagens se houver
      if (images.length > 0) {
        setUploadingImages(true);
        for (const image of images) {
          await uploadVehicleImage(vehicle._id, image, token);
        }
        toast.success(`${images.length} imagem(ns) enviada(s)!`);
      }

      // Resetar form
      setFormData({
        brand: "",
        modelName: "",
        year: new Date().getFullYear(),
        type: "Sedan",
        description: "",
      });
      setImages([]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao cadastrar veículo");
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <MainStyle>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-purple-600 mb-2">Cadastrar Veículo</h1>
        <p className="text-gray-600 mb-8">Adicione um novo veículo ao catálogo</p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/50 rounded-xl border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-900 mb-2">
                Marca *
              </label>
              <input
                id="brand"
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label htmlFor="modelName" className="block text-sm font-medium text-gray-900 mb-2">
                Modelo *
              </label>
              <input
                id="modelName"
                type="text"
                value={formData.modelName}
                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Corolla"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-900 mb-2">
                Ano *
              </label>
              <input
                id="year"
                type="number"
                min={1900}
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
                Tipo *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as VeiculoType })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {VEHICLE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Único dono, revisões em dia..."
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-900 mb-2">
              Imagens
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {images.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">{images.length} imagem(ns) selecionada(s)</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : uploadingImages ? "Enviando imagens..." : "Cadastrar Veículo"}
          </button>
        </form>
      </div>
    </MainStyle>
  );
}
