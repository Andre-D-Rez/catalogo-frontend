export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
export type VeiculoType = 
  | 'SUV'
  | 'Sedan'
  | 'Hatch'
  | 'Convertible'
  | 'Coupe'
  | 'Minivan'
  | 'Pickup Truck'
  | 'Wagon'
  | 'Van'
  | 'Other';

export type CarProduct = {
  _id: string;
  brand: string;
  modelName: string;
  type: VeiculoType;
  year: number;
  description?: string;
  imagens?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt?: string;
};

export type VehicleCreate = {
  brand: string;
  modelName: string;
  year: number;
  type: VeiculoType;
  description?: string;
};
