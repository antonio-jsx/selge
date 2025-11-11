import type { SelectProduct } from '@bakan/database/schemas/products';
import type { LucideIcon } from 'lucide-react';

export interface Menu {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface CartItem extends SelectProduct {
  quantity: number;
}

export interface ShoppingStore {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}
