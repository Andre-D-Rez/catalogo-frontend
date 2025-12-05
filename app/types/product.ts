// Tipos de produto (customizável)
export type ProductType = 
  | 'Category1'
  | 'Category2'
  | 'Category3';

// Entidade principal de produto
export type Product = {
  _id: string;
  name: string;
  category: ProductType;
  year?: number;
  description?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};

// Dados de usuário
export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt?: string;
};

// Resposta de autenticação
export type AuthResponse = {
  user: User;
  token: string;
};

// Criação de produto (formulário)
export type ProductCreate = {
  name: string;
  category: ProductType;
  year?: number;
  description?: string;
};
