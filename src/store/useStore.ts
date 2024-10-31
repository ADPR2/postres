import { create } from 'zustand';
import type { IceCream, Branch, Vendor, CartItem, User, Sale } from '../types';

interface State {
  user: User | null;
  cart: CartItem[];
  iceCreams: IceCream[];
  branches: Branch[];
  vendors: Vendor[];
  sales: Sale[];
  
  login: (password: string) => Promise<void>;
  logout: () => void;
  addToCart: (iceCream: IceCream, quantity: number) => void;
  removeFromCart: (iceCreamId: string) => void;
  clearCart: () => void;
  updateStock: (branchId: string, iceCreamId: string, quantity: number) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (vendorId: string, updates: Partial<Vendor>) => void;
  completeSale: (items: CartItem[], total: number) => void;
}

export const useStore = create<State>((set, get) => ({
  user: null,
  cart: [],
  sales: [],
  iceCreams: [
    {
      id: '1',
      name: 'Vainilla Clásica',
      description: 'Helado suave y cremoso de vainilla',
      price: 45,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=600',
      flavors: ['vainilla'],
    },
    {
      id: '2',
      name: 'Chocolate Intenso',
      description: 'Rico helado de chocolate oscuro',
      price: 50,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600',
      flavors: ['chocolate'],
    },
    {
      id: '3',
      name: 'Fresa Natural',
      description: 'Helado de fresa con trozos de fruta',
      price: 48,
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600',
      flavors: ['fresa'],
    },
  ],
  branches: [{
    id: '1',
    name: 'Sucursal Centro',
    address: 'Calle Principal 123',
    inventory: {
      '1': 10,
      '2': 15,
      '3': 8,
    },
  }],
  vendors: [],

  login: async (password) => {
    const mockUser = {
      id: '1',
      role: password === 'admin' ? 'admin' : 'vendor',
      branchId: password === 'admin' ? undefined : '1',
    } as User;
    set({ user: mockUser });
  },

  logout: () => set({ user: null }),

  addToCart: (iceCream, quantity) => 
    set((state) => ({
      cart: [...state.cart, { iceCream, quantity }],
    })),

  removeFromCart: (iceCreamId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.iceCream.id !== iceCreamId),
    })),

  clearCart: () => set({ cart: [] }),

  updateStock: (branchId, iceCreamId, quantity) =>
    set((state) => ({
      branches: state.branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              inventory: {
                ...branch.inventory,
                [iceCreamId]: quantity,
              },
            }
          : branch
      ),
    })),

  completeSale: (items, total) => {
    const { user, branches } = get();
    if (!user?.branchId) return;

    // Actualizar inventario
    set((state) => ({
      branches: state.branches.map((branch) => {
        if (branch.id === user.branchId) {
          const newInventory = { ...branch.inventory };
          items.forEach((item) => {
            newInventory[item.iceCream.id] = (newInventory[item.iceCream.id] || 0) - item.quantity;
          });
          return { ...branch, inventory: newInventory };
        }
        return branch;
      }),
      // Agregar venta al historial
      sales: [...state.sales, {
        id: Date.now().toString(),
        items,
        total,
        date: new Date(),
        branchId: user.branchId,
        vendorId: user.id,
      }],
    }));
  },

  addVendor: (vendor) =>
    set((state) => ({
      vendors: [...state.vendors, { ...vendor, id: Date.now().toString() }],
    })),

  updateVendor: (vendorId, updates) =>
    set((state) => ({
      vendors: state.vendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, ...updates } : vendor
      ),
    })),
}));