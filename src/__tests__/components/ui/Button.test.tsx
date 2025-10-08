import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../components/ui/Button';

describe('Button Component', () => {
  it('deve renderizar corretamente com título', () => {
    const { getByText } = render(<Button title="Clique aqui" />);
    
    expect(getByText('Clique aqui')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Teste" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Teste'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar cor de fundo customizada', () => {
    const { getByText } = render(
      <Button title="Botão" backgroundColor="#ff0000" />
    );
    
    const button = getByText('Botão').parent;
    expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('deve aplicar cor de texto customizada', () => {
    const { getByText } = render(
      <Button title="Botão" textColor="#00ff00" />
    );
    
    const text = getByText('Botão');
    expect(text).toHaveStyle({ color: '#00ff00' });
  });

  it('deve aplicar estilos customizados', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Button title="Botão" style={customStyle} />
    );
    
    const button = getByText('Botão').parent;
    expect(button).toHaveStyle(customStyle);
  });

  it('deve estar desabilitado quando disabled é true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Desabilitado" onPress={onPressMock} disabled={true} />
    );
    
    const button = getByText('Desabilitado').parent;
    if (button) {
      fireEvent.press(button);
    }
    
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('deve ter activeOpacity correto', () => {
    const { getByText } = render(<Button title="Teste" />);
    
    const button = getByText('Teste').parent;
    expect(button?.props.activeOpacity).toBe(0.7);
  });

  it('deve renderizar com estilo padrão correto', () => {
    const { getByText } = render(<Button title="Padrão" />);
    
    const button = getByText('Padrão').parent;
    const text = getByText('Padrão');
    
    expect(button).toHaveStyle({
      backgroundColor: '#6200ee',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    });
    
    expect(text).toHaveStyle({
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    });
  });
});