import type { SelectCategory } from '@bakan/database/schemas/category';
import type { SelectProduct } from '@bakan/database/schemas/products';
import type { SelectSettings } from '@bakan/database/schemas/settings';
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

export interface HeroSettings extends SelectSettings {
  metaData: {
    btnTitle: string;
    btnUrl: string;
  };
}

export interface TaxSettings extends SelectSettings {
  metaData: {
    taxValue: number;
  };
}

export interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductsWithCategory extends SelectProduct {
  category: SelectCategory | null;
}
