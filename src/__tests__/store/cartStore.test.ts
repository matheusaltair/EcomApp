import { useCartStore } from '../../store/cartStore';

const mockProduct = {
  id: '1',
  title: 'Produto Teste',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  description: 'Descrição do produto teste',
};

const mockProduct2 = {
  id: '2',
  title: 'Produto Teste 2',
  price: 149.99,
  image: 'https://example.com/image2.jpg',
  description: 'Descrição do produto teste 2',
};

describe('CartStore - Adicionar Item', () => {
  beforeEach(() => {
    // Reset do carrinho antes de cada teste
    useCartStore.getState().clearCart();
  });

  test('deve adicionar um novo produto ao carrinho', () => {
    const store = useCartStore.getState();
    
    store.addToCart(mockProduct, 1);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      product: mockProduct,
      quantity: 1,
    });
    expect(state.getTotalItems()).toBe(1);
    expect(state.getTotalPrice()).toBe(99.99);
  });

  test('deve adicionar múltiplas quantidades de um produto', () => {
    const store = useCartStore.getState();
    
    store.addToCart(mockProduct, 3);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getTotalItems()).toBe(3);
    expect(state.getTotalPrice()).toBeCloseTo(299.97, 2);
  });

  test('deve incrementar a quantidade se o produto já existir no carrinho', () => {
    const store = useCartStore.getState();

    // Adiciona o produto pela primeira vez
    store.addToCart(mockProduct, 2);
    // Adiciona o mesmo produto novamente
    store.addToCart(mockProduct, 1);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getTotalItems()).toBe(3);
    expect(state.getTotalPrice()).toBeCloseTo(299.97, 2);
  });

  test('deve adicionar produtos diferentes como itens separados', () => {
    const store = useCartStore.getState();

    store.addToCart(mockProduct, 1);
    store.addToCart(mockProduct2, 2);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.getTotalItems()).toBe(3);
    expect(state.getTotalPrice()).toBe(99.99 + (149.99 * 2));
  });

  test('deve usar quantidade padrão de 1 se não especificada', () => {
    const store = useCartStore.getState();

    store.addToCart(mockProduct);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(1);
    expect(state.getTotalItems()).toBe(1);
  });

  test('deve calcular o total de itens corretamente', () => {
    const store = useCartStore.getState();

    store.addToCart(mockProduct, 2);
    store.addToCart(mockProduct2, 3);

    const state = useCartStore.getState();
    expect(state.getTotalItems()).toBe(5);
  });

  test('deve calcular o preço total corretamente', () => {
    const store = useCartStore.getState();

    store.addToCart(mockProduct, 2); // 2 * 99.99 = 199.98
    store.addToCart(mockProduct2, 1); // 1 * 149.99 = 149.99

    const state = useCartStore.getState();
    expect(state.getTotalPrice()).toBe(349.97);
  });
});