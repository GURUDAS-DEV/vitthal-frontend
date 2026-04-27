import { create } from "zustand";

export type CartItem = {
  productId: string;
  productName: string;
  image: string;
  price: number;
  moq: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, vendorId: string) => void;
  updateQuantity: (productId: string, vendorId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.vendorId === item.vendorId
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.vendorId === item.vendorId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (productId, vendorId) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.vendorId === vendorId)
      ),
    })),

  updateQuantity: (productId, vendorId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.vendorId === vendorId
          ? { ...i, quantity: Math.max(i.moq, quantity) }
          : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
