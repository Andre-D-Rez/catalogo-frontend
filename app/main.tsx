import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-purple-600 mt-16">
            Bem-vindo ao Catálogo
          </h1>
          <p className="text-center text-gray-600 mt-4">
            Estrutura base configurada com sucesso!
          </p>
        </div>
      </main>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
