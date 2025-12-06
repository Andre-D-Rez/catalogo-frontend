import type { CarProduct } from "~/types/product";

const API_BASE = (import.meta.env.VITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export async function fetchAllProducts(filters?: { 
  brand?: string; 
  type?: string; 
  year?: number;
  page?: number;
  limit?: number;
}): Promise<CarProduct[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.brand) params.append("brand", filters.brand);
    if (filters?.type) params.append("type", filters.type);
    if (filters?.year) params.append("year", filters.year.toString());
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    
    const queryString = params.toString();
    const path = queryString ? `/api/veiculos?${queryString}` : "/api/veiculos";
    
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
      console.error(`Falha ao buscar lista de veículos. Status: ${response.status}`);
      return [];
    }
    const data = await response.json();
    
    // Log para debug
    console.log("Resposta da API:", data);
    
    // Se a resposta contiver 'data', é o array de veículos
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // Se for um array direto
    if (Array.isArray(data)) {
      return data;
    }
    
    console.warn("Formato de resposta inesperado:", data);
    return [];
  } catch (error) {
    console.error("Erro de rede ao buscar produtos:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<CarProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/api/veiculos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Veículo ${id} não encontrado (404).`);
        return null;
      }
      console.error(`Falha ao buscar veículo ${id}. Status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data as CarProduct;
  } catch (error) {
    console.error(`Erro de rede ao buscar produto ${id}:`, error);
    return null;
  }
}

export async function createVehicle(vehicle: any, token: string): Promise<CarProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/api/veiculos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao criar veículo");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    throw error;
  }
}

export async function uploadVehicleImage(vehicleId: string, file: File, token: string): Promise<CarProduct | null> {
  try {
    const formData = new FormData();
    formData.append("foto", file);

    const response = await fetch(`${API_BASE}/api/veiculos/${vehicleId}/imagens`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao fazer upload da imagem");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw error;
  }
}
