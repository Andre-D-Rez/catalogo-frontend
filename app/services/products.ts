import type { CarProduct } from "~/types/product";

const API_BASE = (import.meta.env.VITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

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
