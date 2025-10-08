import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import ScreenContainer from '../../../components/layout/ScreenContainer';

// Mock do SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: any) => (
    <View style={style} testID="safe-area-view">
      {children}
    </View>
  ),
}));

describe('ScreenContainer', () => {
  it('deve renderizar children corretamente', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>Conteúdo de teste</Text>
      </ScreenContainer>
    );
    
    expect(getByText('Conteúdo de teste')).toBeTruthy();
  });

  it('deve aplicar estilos padrão', () => {
    const { getByTestId } = render(
      <ScreenContainer>
        <Text>Teste</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    expect(container).toHaveStyle({
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    });
  });

  it('deve aplicar estilos customizados', () => {
    const customStyles = {
      backgroundColor: '#ffffff',
      padding: 20,
    };
    
    const { getByTestId } = render(
      <ScreenContainer styles={customStyles}>
        <Text>Teste</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    expect(container).toHaveStyle(customStyles);
  });

  it('deve combinar estilos padrão com customizados', () => {
    const customStyles = {
      backgroundColor: '#ffffff',
    };
    
    const { getByTestId } = render(
      <ScreenContainer styles={customStyles}>
        <Text>Teste</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    
    // Deve manter flex: 1 do estilo padrão
    expect(container).toHaveStyle({ flex: 1 });
    // Deve aplicar backgroundColor customizado
    expect(container).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  it('deve renderizar múltiplos children', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>Primeiro texto</Text>
        <Text>Segundo texto</Text>
        <View>
          <Text>Texto aninhado</Text>
        </View>
      </ScreenContainer>
    );
    
    expect(getByText('Primeiro texto')).toBeTruthy();
    expect(getByText('Segundo texto')).toBeTruthy();
    expect(getByText('Texto aninhado')).toBeTruthy();
  });

  it('deve funcionar sem estilos customizados', () => {
    const { getByTestId } = render(
      <ScreenContainer>
        <Text>Teste sem estilos</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    expect(container).toBeTruthy();
  });

  it('deve aceitar estilos como array', () => {
    const style1 = { backgroundColor: '#fff' };
    const style2 = { padding: 10 };
    
    const { getByTestId } = render(
      <ScreenContainer styles={[style1, style2]}>
        <Text>Teste</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    expect(container).toHaveStyle(style1);
    expect(container).toHaveStyle(style2);
  });

  it('deve renderizar com children do tipo ReactNode', () => {
    const { getByTestId } = render(
      <ScreenContainer>
        {null}
        {'String literal'}
        {42}
        <Text>Component</Text>
      </ScreenContainer>
    );
    
    const container = getByTestId('safe-area-view');
    expect(container).toBeTruthy();
  });
});