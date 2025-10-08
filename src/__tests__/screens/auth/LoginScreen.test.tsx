import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../../screens/auth/LoginScreen';

// Mocks
const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  replace: mockReplace,
};

const mockLogin = jest.fn();
jest.mock('../../../store/authStore', () => ({
  useAuthStore: () => ({
    login: mockLogin,
    error: null,
    isLoading: false,
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../../../components/layout/ScreenContainer', () => {
  return ({ children }: any) => children;
});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    expect(getByText('Login Screen')).toBeTruthy();
    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('deve atualizar campos de input corretamente', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.changeText(passwordInput, '123456');
    
    expect(nameInput.props.value).toBe('João Silva');
    expect(emailInput.props.value).toBe('joao@email.com');
    expect(passwordInput.props.value).toBe('123456');
  });

  it('deve exibir erro quando campos obrigatórios não são preenchidos', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const loginButton = getByText('Entrar');
    fireEvent.press(loginButton);
    
    expect(getByText('Preencha todos os campos.')).toBeTruthy();
  });

  it('deve chamar login com dados corretos', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('joao@email.com', '123456', 'João Silva');
    });
  });

  it('deve salvar dados no AsyncStorage após login bem-sucedido', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'userLogin',
        JSON.stringify({ email: 'joao@email.com', name: 'João Silva' })
      );
    });
  });

  it('deve navegar para Home após login bem-sucedido', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('Home');
    });
  });

  it('deve verificar login salvo no AsyncStorage ao montar componente', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ email: 'test@email.com', name: 'Test User' })
    );
    
    render(<LoginScreen navigation={mockNavigation} />);
    
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userLogin');
      expect(mockReplace).toHaveBeenCalledWith('Home');
    });
  });

  it('deve limpar erro local ao fazer novo login', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    // Primeiro, provocar um erro
    const loginButton = getByText('Entrar');
    fireEvent.press(loginButton);
    expect(getByText('Preencha todos os campos.')).toBeTruthy();
    
    // Depois, preencher os campos e tentar novamente
    const nameInput = getByPlaceholderText('Nome');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Senha');
    
    fireEvent.changeText(nameInput, 'João Silva');
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(loginButton);
    
    // O erro deve ter desaparecido
    expect(queryByText('Preencha todos os campos.')).toBeNull();
  });

  it('deve validar apenas email e senha como obrigatórios', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const emailInput = getByPlaceholderText('Email');
    const loginButton = getByText('Entrar');
    
    // Preencher apenas email
    fireEvent.changeText(emailInput, 'joao@email.com');
    fireEvent.press(loginButton);
    
    // Deve mostrar erro pois senha não foi preenchida
    expect(getByText('Preencha todos os campos.')).toBeTruthy();
  });

  it('deve ter campo de senha com secureTextEntry', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation} />
    );
    
    const passwordInput = getByPlaceholderText('Senha');
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});