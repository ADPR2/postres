import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { IceCream } from '../types';

interface Props {
  iceCream: IceCream;
  stock: number;
}

export function IceCreamCard({ iceCream, stock }: Props) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
      <img
        src={iceCream.image}
        alt={iceCream.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{iceCream.name}</h3>
        <p className="text-gray-600 mt-1">{iceCream.description}</p>
        <p className="text-sm text-gray-500 mt-1">Disponibles: {stock}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">
            ${iceCream.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              disabled={quantity >= stock}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <button
          onClick={() => addToCart(iceCream, quantity)}
          className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
          disabled={quantity > stock}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}