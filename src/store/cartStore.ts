import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          items: [...state.items, { product, quantity }],
        };
      }
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  },
}));