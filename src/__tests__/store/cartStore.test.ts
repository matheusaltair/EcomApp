// Testes unitários da lógica do carrinho sem Zustand

const mockProduct = {
  id: '1',
  title: 'Produto Teste',
  price: 100,
  image: 'test-image.jpg',
  description: 'Descrição do produto teste',
};

const mockProduct2 = {
  id: '2',
  title: 'Produto Teste 2',
  price: 200,
  image: 'test-image2.jpg',
};


type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

function addToCart(items: CartItem[], product: Product, quantity: number = 1): CartItem[] {
  const existingItem = items.find((item: CartItem) => item.product.id === product.id);
  if (existingItem) {
    return items.map((item: CartItem) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    return [...items, { product, quantity }];
  }
}

function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item: CartItem) => item.product.id !== productId);
}

function updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  return items.map((item: CartItem) =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  ).filter((item: CartItem) => item.quantity > 0);
}

function getTotalItems(items: CartItem[]): number {
  return items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
}

function getTotalPrice(items: CartItem[]): number {
  return items.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
}

describe('CartStore Logic', () => {

  describe('addToCart', () => {
    it('deve adicionar novo produto ao carrinho', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe('1');
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('deve incrementar quantidade se produto já existe no carrinho', () => {
      const { result } = renderHook(() => useCartStore());
      
      // Adicionar produto primeira vez
      result.current.addToCart(mockProduct, 2);
      
      // Adicionar mesmo produto novamente
      result.current.addToCart(mockProduct, 1);
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('deve adicionar múltiplos produtos diferentes', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      result.current.addToCart(mockProduct2, 2);
      
      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].product.id).toBe('1');
      expect(result.current.items[1].product.id).toBe('2');
      expect(result.current.items[1].quantity).toBe(2);
    });

    it('deve usar quantidade padrão de 1 quando não especificada', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct);
      
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('deve remover produto do carrinho', () => {
      const { result } = renderHook(() => useCartStore());
      
      // Adicionar produtos
      result.current.addToCart(mockProduct, 1);
      result.current.addToCart(mockProduct2, 2);
      
      // Remover um produto
      result.current.removeFromCart('1');
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe('2');
    });

    it('não deve fazer nada se produto não existe', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      
      // Tentar remover produto inexistente
      result.current.removeFromCart('inexistente');
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe('1');
    });
  });

  describe('updateQuantity', () => {
    it('deve atualizar quantidade do produto', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      result.current.updateQuantity('1', 5);
      
      expect(result.current.items[0].quantity).toBe(5);
    });

    it('deve remover item se quantidade for 0', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      result.current.updateQuantity('1', 0);
      
      expect(result.current.items).toHaveLength(0);
    });

    it('deve remover item se quantidade for negativa', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 5);
      result.current.updateQuantity('1', -1);
      
      expect(result.current.items).toHaveLength(0);
    });

    it('não deve fazer nada se produto não existe', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 1);
      result.current.updateQuantity('inexistente', 5);
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('deve limpar todos os itens do carrinho', () => {
      const { result } = renderHook(() => useCartStore());
      
      // Adicionar itens
      result.current.addToCart(mockProduct, 1);
      result.current.addToCart(mockProduct2, 2);
      
      // Limpar carrinho
      result.current.clearCart();
      
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getTotalItems', () => {
    it('deve retornar total de itens no carrinho', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 2);
      result.current.addToCart(mockProduct2, 3);
      
      const total = result.current.getTotalItems();
      
      expect(total).toBe(5);
    });

    it('deve retornar 0 para carrinho vazio', () => {
      const { result } = renderHook(() => useCartStore());
      
      const total = result.current.getTotalItems();
      
      expect(total).toBe(0);
    });
  });

  describe('getTotalPrice', () => {
    it('deve calcular preço total corretamente', () => {
      const { result } = renderHook(() => useCartStore());
      
      result.current.addToCart(mockProduct, 2); // 100 * 2 = 200
      result.current.addToCart(mockProduct2, 1); // 200 * 1 = 200
      
      const total = result.current.getTotalPrice();
      
      expect(total).toBe(400);
    });

    it('deve retornar 0 para carrinho vazio', () => {
      const { result } = renderHook(() => useCartStore());
      
      const total = result.current.getTotalPrice();
      
      expect(total).toBe(0);
    });

    it('deve calcular preço com decimais corretamente', () => {
      const { result } = renderHook(() => useCartStore());
      
      const productWithDecimalPrice = { 
        ...mockProduct, 
        price: 19.99 
      };
      
      result.current.addToCart(productWithDecimalPrice, 3);
      
      const total = result.current.getTotalPrice();
      
      expect(total).toBe(59.97);
    });
  });
});