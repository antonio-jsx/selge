import type { RemoveStore } from '@/lib/types';
import { create } from 'zustand';

export const useRemove = create<RemoveStore>()((set) => ({
  id: 0,
  section: 'products',
  title: '',
  modal: false,
  remove: (section, { id, title }) => set({ id, section, title, modal: true }),
  closeModal: (state) => set({ modal: state }),
}));
