import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(password);
      navigate('/');
    } catch (err) {
      setError('Contraseña inválida');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-pink-100 p-3 rounded-full">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Ingresar a Postres de Litro
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}