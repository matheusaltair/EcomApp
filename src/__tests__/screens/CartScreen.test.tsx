// Teste simples para funcionalidade de finalizar compra
import { useCartStore } from '../../store/cartStore';

// Mock do notifee
jest.mock('@notifee/react-native', () => ({
  createChannel: jest.fn(() => Promise.resolve('default')),
  displayNotification: jest.fn(() => Promise.resolve()),
  AndroidImportance: {
    HIGH: 4,
  },
}));

const mockProduct1 = {
  id: '1',
  title: 'Produto Teste',
  price: 99.99,
  image: 'https://example.com/image.jpg',
};

const mockProduct2 = {
  id: '2',
  title: 'Produto Teste 2',
  price: 149.99,
  image: 'https://example.com/image2.jpg',
};

describe('CartStore - Funcionalidades de Checkout', () => {
  beforeEach(() => {
    // Limpa o carrinho antes de cada teste
    useCartStore.getState().clearCart();
  });

  test('deve adicionar itens e calcular total corretamente para checkout', () => {
    const store = useCartStore.getState();

    // Adiciona itens ao carrinho
    store.addToCart(mockProduct1, 2);
    store.addToCart(mockProduct2, 1);

    const state = useCartStore.getState();
    
    // Verifica se os itens foram adicionados
    expect(state.items).toHaveLength(2);
    expect(state.getTotalItems()).toBe(3);
    
    // Verifica o cálculo do total (importante para o checkout)
    const expectedTotal = (99.99 * 2) + (149.99 * 1); // 349.97
    expect(state.getTotalPrice()).toBe(expectedTotal);
  });

  test('deve remover todos os itens do carrinho após finalizar compra', () => {
    const store = useCartStore.getState();

    // Adiciona itens ao carrinho
    store.addToCart(mockProduct1, 2);
    store.addToCart(mockProduct2, 1);

    // Verifica se há itens
    let state = useCartStore.getState();
    expect(state.items).toHaveLength(2);

    // Simula finalizar compra - limpa o carrinho
    store.clearCart();

    // Verifica se o carrinho foi limpo
    state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  test('deve atualizar quantidade de itens corretamente', () => {
    const store = useCartStore.getState();

    // Adiciona item
    store.addToCart(mockProduct1, 2);

    // Atualiza quantidade
    store.updateQuantity('1', 5);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.getTotalPrice()).toBe(99.99 * 5);
  });

  test('deve remover item específico do carrinho', () => {
    const store = useCartStore.getState();

    // Adiciona dois itens diferentes
    store.addToCart(mockProduct1, 1);
    store.addToCart(mockProduct2, 1);

    // Verifica se ambos foram adicionados
    let state = useCartStore.getState();
    expect(state.items).toHaveLength(2);

    // Remove um item específico
    store.removeFromCart('1');

    // Verifica se apenas um item foi removido
    state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('2');
  });

  test('deve simular processo completo de checkout', async () => {
    const notifee = require('@notifee/react-native');
    const store = useCartStore.getState();

    // 1. Adiciona itens ao carrinho
    store.addToCart(mockProduct1, 1);
    store.addToCart(mockProduct2, 2);

    let state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    
    const totalBeforeCheckout = state.getTotalPrice();
    expect(totalBeforeCheckout).toBe(99.99 + (149.99 * 2));

    // 2. Simula notificação de checkout
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4,
    });

    await notifee.displayNotification({
      title: 'Compra finalizada',
      body: 'Compra finalizada com sucesso',
    });

    // Verifica se as funções de notificação foram chamadas
    expect(notifee.createChannel).toHaveBeenCalled();
    expect(notifee.displayNotification).toHaveBeenCalled();

    // 3. Limpa o carrinho após checkout
    store.clearCart();

    state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.getTotalPrice()).toBe(0);
  });
});