import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, IceCream, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Header() {
  const { user, cart, logout } = useStore();

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <IceCream size={32} />
            <span className="text-2xl font-bold">Postres de Litro</span>
          </Link>

          <nav className="flex items-center space-x-6">
            {user && (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-pink-200 transition">
                    Panel de Admin
                  </Link>
                )}
                {user.role === 'vendor' && (
                  <Link to="/vendor" className="hover:text-pink-200 transition">
                    Panel de Vendedor
                  </Link>
                )}
              </>
            )}
            
            <Link to="/cart" className="relative hover:text-pink-200 transition">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 hover:text-pink-200 transition"
              >
                <LogOut size={20} />
                <span>Salir</span>
              </button>
            ) : (
              <Link to="/login" className="hover:text-pink-200 transition">
                Ingresar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}