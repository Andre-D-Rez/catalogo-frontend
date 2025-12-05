import { Link, NavLink, useNavigate } from "react-router";
import { authService } from "~/services/auth";
import { useEffect, useState } from "react";
import type { User } from "~/types/product";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <Link to="/" className="font-semibold text-purple-600 text-sm sm:text-base">
          Catálogo de Carros
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/vitrine"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Catálogo
          </NavLink>
          
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
              }
            >
              Admin
            </NavLink>
          )}
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-gray-700 hidden sm:inline">Olá, {user.name.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="text-gray-900 hover:text-purple-600 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Cadastrar
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
