import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export function AdminDashboard() {
  const { branches, vendors, addVendor, updateVendor } = useStore();
  const [selectedTab, setSelectedTab] = useState<'sucursales' | 'vendedores'>('sucursales');

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Panel de Administración</h1>
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('sucursales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'sucursales'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sucursales
            </button>
            <button
              onClick={() => setSelectedTab('vendedores')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'vendedores'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vendedores
            </button>
          </nav>
        </div>
      </div>

      {selectedTab === 'sucursales' ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Gestión de Sucursales</h2>
            <button className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition">
              <Plus size={20} />
              <span>Agregar Sucursal</span>
            </button>
          </div>
          
          <div className="grid gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{branch.name}</h3>
                  <p className="text-gray-600">{branch.address}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-pink-600 transition">
                    <Edit2 size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Gestión de Vendedores</h2>
            <button className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition">
              <Plus size={20} />
              <span>Agregar Vendedor</span>
            </button>
          </div>
          
          <div className="grid gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                  <p className="text-gray-600">Sucursal: {vendor.branchId}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-pink-600 transition">
                    <Edit2 size={20} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}