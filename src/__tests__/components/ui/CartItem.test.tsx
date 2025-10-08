import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image } from 'react-native';
import CartItem from '../../../components/ui/CartItem';

// Mock do React Native Animated
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      parallel: jest.fn(() => ({ start: jest.fn() })),
      timing: jest.fn(() => ({ start: jest.fn() })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
      })),
      View: RN.View,
    },
  };
});

const mockCartItemProps = {
  title: 'Smartphone Teste',
  price: 199,
  image: 'https://test-image.jpg',
  quantity: 2,
  onRemove: jest.fn(),
  onQuantityChange: jest.fn(),
};

describe('CartItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar informações do produto corretamente', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    expect(getByText('Smartphone Teste')).toBeTruthy();
    expect(getByText('$199')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('deve exibir imagem do produto', () => {
    const { UNSAFE_getByType } = render(<CartItem {...mockCartItemProps} />);
    
    const image = UNSAFE_getByType(Image);
    expect(image.props.source.uri).toBe('https://test-image.jpg');
  });

  it('deve chamar onRemove quando botão remover for pressionado', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    const removeButton = getByText('Remover');
    fireEvent.press(removeButton);
    
    expect(mockCartItemProps.onRemove).toHaveBeenCalledTimes(1);
  });

  it('deve aumentar quantidade quando botão + for pressionado', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    const increaseButton = getByText('+');
    fireEvent.press(increaseButton);
    
    expect(mockCartItemProps.onQuantityChange).toHaveBeenCalledWith(3);
  });

  it('deve diminuir quantidade quando botão - for pressionado', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    const decreaseButton = getByText('-');
    fireEvent.press(decreaseButton);
    
    expect(mockCartItemProps.onQuantityChange).toHaveBeenCalledWith(1);
  });

  it('deve permitir diminuir quantidade mesmo quando é 1', () => {
    const props = { ...mockCartItemProps, quantity: 1 };
    const { getByText } = render(<CartItem {...props} />);
    
    const decreaseButton = getByText('-');
    fireEvent.press(decreaseButton);
    
    expect(mockCartItemProps.onQuantityChange).toHaveBeenCalledWith(0);
  });

  it('deve exibir quantidade correta', () => {
    const props = { ...mockCartItemProps, quantity: 5 };
    const { getByText } = render(<CartItem {...props} />);
    
    expect(getByText('5')).toBeTruthy();
  });

  it('deve calcular preço total correto', () => {
    const props = { ...mockCartItemProps, quantity: 3, price: 100 };
    const { getByText } = render(<CartItem {...props} />);
    
    expect(getByText('$300')).toBeTruthy();
  });

  it('deve ter estilos corretos aplicados', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    const title = getByText('Smartphone Teste');
    const price = getByText('$199');
    
    expect(title).toHaveStyle({
      fontSize: 16,
      fontWeight: 'bold',
    });
    
    expect(price).toHaveStyle({
      fontSize: 14,
      color: '#666',
    });
  });

  it('deve renderizar botões de quantidade com estilos corretos', () => {
    const { getByText } = render(<CartItem {...mockCartItemProps} />);
    
    const increaseButton = getByText('+');
    const decreaseButton = getByText('-');
    
    expect(increaseButton.parent).toHaveStyle({
      backgroundColor: '#6200ee',
      borderRadius: 4,
    });
    
    expect(decreaseButton.parent).toHaveStyle({
      backgroundColor: '#6200ee',
      borderRadius: 4,
    });
  });

  it('deve inicializar animações ao montar componente', () => {
    const mockStart = jest.fn();
    const mockParallel = jest.fn(() => ({ start: mockStart }));
    
    require('react-native').Animated.parallel = mockParallel;
    
    render(<CartItem {...mockCartItemProps} />);
    
    expect(mockParallel).toHaveBeenCalled();
  });

  it('deve lidar com preços decimais', () => {
    const props = { ...mockCartItemProps, price: 19.99, quantity: 1 };
    const { getByText } = render(<CartItem {...props} />);
    
    expect(getByText('$19.99')).toBeTruthy();
  });

  it('deve lidar com títulos longos', () => {
    const props = { 
      ...mockCartItemProps, 
      title: 'Este é um título muito longo para um produto que deveria ser truncado ou quebrado em múltiplas linhas' 
    };
    const { getByText } = render(<CartItem {...props} />);
    
    expect(getByText(props.title)).toBeTruthy();
  });

  it('deve manter proporção correta da imagem', () => {
    const { UNSAFE_getByType } = render(<CartItem {...mockCartItemProps} />);
    
    const image = UNSAFE_getByType(Image);
    expect(image).toHaveStyle({
      width: 60,
      height: 60,
    });
  });
});