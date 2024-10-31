export interface IceCream {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  flavors: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  inventory: Record<string, number>;
}

export interface Vendor {
  id: string;
  name: string;
  branchId: string;
  password: string;
  role: 'vendor' | 'admin';
}

export interface CartItem {
  iceCream: IceCream;
  quantity: number;
}

export interface User {
  id: string;
  role: 'vendor' | 'admin';
  branchId?: string;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  branchId: string;
  vendorId: string;
}