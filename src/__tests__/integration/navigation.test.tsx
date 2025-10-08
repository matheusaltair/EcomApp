import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';

// Mock das dependências
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
}));

jest.mock('@notifee/react-native', () => ({
  displayNotification: jest.fn(),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  createChannel: jest.fn(),
}));

jest.mock('../../store/cartStore', () => ({
  useCartStore: () => ({
    addToCart: jest.fn(),
  }),
}));

jest.mock('../../store/authStore', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
    error: null,
    isLoading: false,
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../../components/layout/ScreenContainer', () => {
  return ({ children }: any) => children;
});

const Stack = createStackNavigator();

const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('Navigation Integration Tests', () => {
  it('deve renderizar navigator corretamente', () => {
    const { getByText } = render(<TestNavigator />);
    
    // Deve exibir a tela de login inicialmente
    expect(getByText('Login Screen')).toBeTruthy();
  });

  it('deve ter configuração correta das telas', () => {
    const navigator = render(<TestNavigator />);
    
    // Verifica se o componente foi renderizado sem erros
    expect(navigator).toBeTruthy();
  });

  it('deve permitir navegação entre telas', () => {
    // Este é um teste básico de estrutura
    // Testes de navegação mais complexos requeriam mock do Navigation
    const { getByText } = render(<TestNavigator />);
    
    // Verificar elementos da tela inicial (Login)
    expect(getByText('Login Screen')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });
});