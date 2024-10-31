import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Package, TrendingUp } from 'lucide-react';

export function VendorDashboard() {
  const { user, iceCreams, branches, updateStock, sales } = useStore();
  const [selectedTab, setSelectedTab] = useState<'inventario' | 'ventas'>('inventario');
  const [inventoryInputs, setInventoryInputs] = useState<Record<string, number>>({});

  const branch = branches.find((b) => b.id === user?.branchId);
  const branchSales = sales.filter((sale) => sale.branchId === user?.branchId);

  const handleInventoryChange = (iceCreamId: string, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setInventoryInputs((prev) => ({
      ...prev,
      [iceCreamId]: numValue,
    }));
  };

  const handleUpdateStock = (iceCreamId: string) => {
    if (user?.branchId && typeof inventoryInputs[iceCreamId] === 'number') {
      updateStock(user.branchId, iceCreamId, inventoryInputs[iceCreamId]);
    }
  };

  React.useEffect(() => {
    if (branch) {
      const currentInventory: Record<string, number> = {};
      iceCreams.forEach((iceCream) => {
        currentInventory[iceCream.id] = branch.inventory[iceCream.id] || 0;
      });
      setInventoryInputs(currentInventory);
    }
  }, [branch, iceCreams]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Panel de Control</h1>
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('inventario')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'inventario'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package size={20} />
                <span>Inventario</span>
              </div>
            </button>
            <button
              onClick={() => setSelectedTab('ventas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'ventas'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Ventas</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {selectedTab === 'inventario' ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Inventario Actual
          </h2>
          <div className="grid gap-6">
            {iceCreams.map((iceCream) => (
              <div
                key={iceCream.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={iceCream.image}
                    alt={iceCream.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{iceCream.name}</h3>
                    <p className="text-gray-600">
                      Existencias: {branch?.inventory[iceCream.id] || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="0"
                    value={inventoryInputs[iceCream.id] || 0}
                    onChange={(e) => handleInventoryChange(iceCream.id, e.target.value)}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <button 
                    onClick={() => handleUpdateStock(iceCream.id)}
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Historial de Ventas</h2>
          {branchSales.length === 0 ? (
            <div className="text-center text-gray-600">
              No hay ventas registradas
            </div>
          ) : (
            <div className="space-y-6">
              {branchSales.map((sale) => (
                <div key={sale.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">
                      {new Date(sale.date).toLocaleString()}
                    </span>
                    <span className="font-bold text-pink-600">
                      Total: ${sale.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {sale.items.map((item) => (
                      <div key={item.iceCream.id} className="flex justify-between text-sm">
                        <span>{item.iceCream.name} x {item.quantity}</span>
                        <span>${(item.iceCream.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}