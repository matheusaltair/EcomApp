import { useAuthStore } from '../../store/authStore';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock do persistAuth
jest.mock('../../store/authPersist', () => ({
  persistAuth: jest.fn(() => Promise.resolve()),
}));

describe('AuthStore - Logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Limpa o store
    useAuthStore.getState().logout();
  });

  test('deve fazer logout com sucesso', async () => {
    const store = useAuthStore.getState();

    // Primeiro faz login
    await store.login('test@example.com', 'password', 'Test User');

    // Verifica se está logado
    let state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();

    // Faz logout
    store.logout();

    // Verifica se o logout foi bem-sucedido
    state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  test('deve chamar persistAuth após logout', async () => {
    const { persistAuth } = require('../../store/authPersist');
    const store = useAuthStore.getState();

    // Primeiro faz login
    await store.login('test@example.com', 'password', 'Test User');

    // Limpa os mocks para verificar apenas a chamada do logout
    jest.clearAllMocks();

    // Faz logout
    store.logout();

    // Verifica se persistAuth foi chamado
    expect(persistAuth).toHaveBeenCalled();
  });

  test('deve manter o estado limpo após logout', async () => {
    const store = useAuthStore.getState();

    // Primeiro faz login
    await store.login('test@example.com', 'password', 'Test User');

    // Faz logout
    store.logout();

    // Verifica se todos os dados do usuário foram limpos
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  test('deve permitir logout mesmo quando não logado', () => {
    const store = useAuthStore.getState();

    // Verifica estado inicial
    let state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();

    // Tenta fazer logout
    store.logout();

    // Verifica se continua com estado limpo
    state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  test('deve funcionar independentemente de erros existentes', async () => {
    const store = useAuthStore.getState();

    // Tenta fazer login com credenciais inválidas para gerar erro
    await store.login('invalid@example.com', 'wrongpassword');

    // Faz logout
    store.logout();

    // Verifica se o estado foi limpo corretamente
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});