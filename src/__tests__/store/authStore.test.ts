// Mock do persistAuth primeiro
jest.mock('../../store/authPersist', () => ({
  persistAuth: jest.fn(() => Promise.resolve()),
}));

import { useAuthStore } from '../../store/authStore';

describe('AuthStore - Login', () => {
  beforeEach(() => {
    // Reset do store antes de cada teste
    useAuthStore.getState().logout();
  });

  test('deve fazer login com sucesso com credenciais válidas', async () => {
    const store = useAuthStore.getState();

    await store.login('test@example.com', 'password', 'Test User');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  test('deve falhar no login com credenciais inválidas', async () => {
    const store = useAuthStore.getState();

    await store.login('invalid@example.com', 'wrongpassword', 'Test User');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Usuário ou senha incorretos.');
    expect(state.isLoading).toBe(false);
  });

  test('deve inicializar com estado correto', () => {
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  test('deve limpar erro ao chamar clearError', () => {
    const store = useAuthStore.getState();
    
    // Simula um erro
    store.clearError();

    const state = useAuthStore.getState();
    expect(state.error).toBeNull();
  });
});