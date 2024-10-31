import React from 'react';
import { IceCreamCard } from '../components/IceCreamCard';
import { useStore } from '../store/useStore';

export function Home() {
  const { iceCreams, branches, user } = useStore();
  const branch = branches.find((b) => b.id === user?.branchId);

  // Filtrar helados con inventario disponible
  const availableIceCreams = iceCreams.filter((iceCream) => 
    branch?.inventory[iceCream.id] && branch.inventory[iceCream.id] > 0
  );

  if (!user || user.role !== 'vendor') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h1>
        <p className="text-gray-600">Debes iniciar sesión como vendedor para realizar ventas.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Nuestros Deliciosos Postres
      </h1>
      {availableIceCreams.length === 0 ? (
        <p className="text-center text-gray-600">No hay helados disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableIceCreams.map((iceCream) => (
            <IceCreamCard 
              key={iceCream.id} 
              iceCream={iceCream} 
              stock={branch?.inventory[iceCream.id] || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}