# Catálogo Frontend - Sistema de Veículos

Frontend completo para catálogo de veículos com área administrativa.

## 🚀 Tecnologias

- **React 18** + TypeScript
- **React Router 7** (rotas)
- **Vite** (build tool)
- **TailwindCSS** (estilização)
- **React Hot Toast** (notificações)

## 📁 Estrutura do Projeto

```
app/
├── types/          # Tipos TypeScript
├── services/       # Chamadas de API
├── routes/         # Páginas da aplicação
├── components/     # Componentes reutilizáveis
└── main.tsx        # Entry point
```

## 🎯 Rotas Disponíveis

- `/` - Home
- `/vitrine` - Lista de veículos
- `/produto/:id` - Detalhes do veículo
- `/login` - Login
- `/register` - Registro
- `/admin` - Cadastro de veículos (protegido)

## 🛠️ Instalação

```bash
npm install
```

## 🚀 Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 📚 Documentação

- **[IMPLEMENTACAO-T1.md](./IMPLEMENTACAO-T1.md)** - Detalhes da implementação
- **[EXEMPLOS-USO.md](./EXEMPLOS-USO.md)** - Exemplos de uso da API
- **[CHECKLIST.md](./CHECKLIST.md)** - Checklist completo

## 🔐 Autenticação

O sistema utiliza autenticação JWT. A página `/admin` é protegida e requer:
- Token válido
- Role de `admin`

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env`:

```env
VITE_URL=http://localhost:3000
```

## ✅ Status

**T1 - API e Tela de Cadastro de Veículos: 100% COMPLETO**

- [x] Tipos de veículos
- [x] Serviços de API
- [x] Página admin completa
- [x] Upload de múltiplas imagens
- [x] Validações e segurança
- [x] Rotas configuradas

## 📝 Tipos de Veículos

SUV, Sedan, Hatch, Convertible, Coupe, Minivan, Pickup Truck, Wagon, Van, Other
