import React from 'react';
import { Trash2, Printer } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export function Cart() {
  const { cart, removeFromCart, completeSale, clearCart } = useStore();
  const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + item.iceCream.price * item.quantity,
    0
  );

  const handleCompleteSale = () => {
    completeSale(cart, total);
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Tu Venta</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">No hay productos en la venta actual</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {cart.map((item) => (
              <div
                key={item.iceCream.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.iceCream.image}
                    alt={item.iceCream.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.iceCream.name}
                    </h3>
                    <p className="text-gray-600">
                      ${item.iceCream.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-bold text-gray-900">
                    ${(item.iceCream.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.iceCream.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-pink-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleCompleteSale}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-md hover:opacity-90 transition flex items-center justify-center space-x-2"
              >
                <span>Completar Venta</span>
                <Printer size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}