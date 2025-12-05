import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import './index.css'
import Navbar from './components/Navbar'

// Importar rotas
import Home from './routes/home'
import Vitrine from './routes/vitrine'
import ProdutoDetail from './routes/produto.$id'
import Login from './routes/login'
import Register from './routes/register'
import Admin from './routes/admin'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vitrine" element={<Vitrine />} />
          <Route path="/produto/:id" element={<ProdutoDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
)
