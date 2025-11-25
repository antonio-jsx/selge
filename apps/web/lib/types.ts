import type { SelectCategory } from '@selge/database/schemas/category';
import type { SelectProduct } from '@selge/database/schemas/products';
import type { SelectSettings } from '@selge/database/schemas/settings';
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

export interface HomeSettings extends SelectSettings {
  metaData: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface TaxSettings extends SelectSettings {
  metaData: {
    taxValue: number;
  };
}

export interface ShippingSettings extends SelectSettings {
  metaData: {
    free: boolean;
    limit: number;
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

export type Section = 'category' | 'products';

export type TitleId = {
  id: number;
  title: string;
};

export interface RemoveStore {
  id: number;
  section: Section;
  title: string;
  modal: boolean;
  remove: (section: Section, options: TitleId) => void;
  closeModal: (state: boolean) => void;
}

export type SectionPages = SelectSettings['section'];
export interface SettingsContextValue {
  getSettingsBySection: (section: SectionPages) => SelectSettings | undefined;
}

export interface ProductContextValue {
  category: SelectCategory[];
}
