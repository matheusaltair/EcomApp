import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Produtos mock para testes
export const mockProducts = [
  {
    id: '1',
    title: 'Smartphone Plus',
    price: 199,
    image: 'test-image-1.jpg',
    description: 'Smartphone de última geração',
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    price: 199,
    image: 'test-image-2.jpg',
    description: 'Fones de ouvido sem fio',
  },
  {
    id: '3',
    title: 'Smart Watch',
    price: 299,
    image: 'test-image-3.jpg',
    description: 'Relógio inteligente',
  },
];

// Usuário mock para testes
export const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
};

// Navegação mock
export const createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

// Store mock para Zustand
export const createMockStore = (initialState = {}) => {
  let state = { ...initialState };
  
  const setState = (newState: any) => {
    if (typeof newState === 'function') {
      state = { ...state, ...newState(state) };
    } else {
      state = { ...state, ...newState };
    }
  };

  const getState = () => state;

  return { setState, getState, state };
};

// Helper para renderizar com providers
export const renderWithProviders = (
  component: React.ReactElement,
  options = {}
) => {
  return render(component, options);
};

// Matchers customizados para estilos
export const expectToHaveStyle = (element: any, style: object) => {
  expect(element).toHaveStyle(style);
};

// Helper para aguardar carregamento
export const waitForLoadingToFinish = async (getByTestId: any, testId = 'loading') => {
  try {
    await waitFor(() => {
      expect(() => getByTestId(testId)).toThrow();
    }, { timeout: 3000 });
  } catch (error) {
    // Loading não encontrado, assume que já terminou
  }
};

// Mock de resposta de API
export const mockApiResponse = {
  success: (data: any) => ({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  }),
  error: (status = 400, message = 'Bad Request') => ({
    ok: false,
    status,
    json: () => Promise.resolve({ error: message }),
  }),
};

// Helper para criar eventos de input
export const createInputEvent = (value: string) => ({
  target: { value },
  nativeEvent: { text: value },
});

// Funções de mock comuns
export const commonMocks = {
  asyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  
  notifee: {
    displayNotification: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(1)),
    createChannel: jest.fn(),
  },
  
  navigation: {
    useNavigation: () => createMockNavigation(),
    useFocusEffect: jest.fn(),
  },
  
  vectorIcons: 'Icon',
};

// Helper para limpar todos os mocks
export const clearAllMocks = () => {
  jest.clearAllMocks();
};

// Timeout padrão para testes assíncronos
export const DEFAULT_TIMEOUT = 5000;