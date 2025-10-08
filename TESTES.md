# Testes Unitários - EcomApp

Este projeto contém uma suíte abrangente de testes unitários desenvolvidos com **Jest** e **React Native Testing Library**.

## 📋 Estrutura dos Testes

```
src/
├── __tests__/
│   ├── setup.ts                    # Configuração global dos testes
│   ├── utils/
│   │   └── testUtils.ts           # Utilitários e helpers para testes
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.test.tsx    # Testes do componente Button
│   │   │   ├── Input.test.tsx     # Testes do componente Input
│   │   │   └── CartItem.test.tsx  # Testes do componente CartItem
│   │   └── layout/
│   │       └── ScreenContainer.test.tsx # Testes do layout
│   ├── screens/
│   │   ├── HomeScreen.test.tsx    # Testes da tela principal
│   │   └── auth/
│   │       └── LoginScreen.test.tsx # Testes da tela de login
│   ├── store/
│   │   └── cartStore.test.ts      # Testes do store do carrinho
│   └── integration/
│       └── navigation.test.tsx    # Testes de integração de navegação
```

## 🧪 Cobertura de Testes

### Componentes UI
- ✅ **Button**: Renderização, eventos, estilos customizados, estados
- ✅ **Input**: Entrada de texto, toggle de senha, validações
- ✅ **CartItem**: Exibição de produto, controles de quantidade, animações

### Componentes de Layout
- ✅ **ScreenContainer**: SafeAreaView, estilos, children

### Telas
- ✅ **HomeScreen**: Lista de produtos, adição ao carrinho, notificações
- ✅ **LoginScreen**: Autenticação, validações, navegação

### Store (Zustand)
- ✅ **CartStore**: Adicionar/remover itens, atualizar quantidades, cálculos

### Integração
- ✅ **Navigation**: Configuração de rotas, navegação entre telas

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

### Executar testes para CI/CD
```bash
npm run test:ci
```

### Executar testes específicos
```bash
# Testar apenas componentes UI
npm test -- components/ui

# Testar apenas uma tela específica
npm test -- HomeScreen.test.tsx

# Testar com padrão específico
npm test -- --testNamePattern="Button"
```

## 🛠️ Configuração

### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/src/__tests__/setup.ts'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-navigation)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

## 📦 Dependências de Teste

As seguintes bibliotecas são utilizadas para testes:

- **@testing-library/react-native**: Testing utilities para React Native
- **@testing-library/jest-native**: Matchers adicionais para Jest
- **jest**: Framework de testes
- **react-test-renderer**: Renderização de componentes para testes

## 🎯 Metas de Cobertura

- **Linhas**: Mínimo 70%
- **Funções**: Mínimo 70%
- **Branches**: Mínimo 70%
- **Statements**: Mínimo 70%

## 🔧 Mocks Configurados

### Bibliotecas Externas
- **React Native Vector Icons**: Mockado como componente simples
- **AsyncStorage**: Métodos mockados para testes
- **React Navigation**: Hooks e métodos de navegação mockados
- **Notifee**: Métodos de notificação mockados
- **Zustand**: Store mockado para isolamento de testes

### Componentes Nativos
- **Animated**: Animações desabilitadas nos testes
- **Image**: Componente mockado para performance
- **SafeAreaView**: Substituído por View simples

## 📝 Padrões de Teste

### Estrutura de Teste
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve ter comportamento esperado', () => {
    // Arrange
    const props = { /* props do teste */ };
    
    // Act
    const { getByText } = render(<Component {...props} />);
    
    // Assert
    expect(getByText('Texto esperado')).toBeTruthy();
  });
});
```

### Testes de Eventos
```typescript
it('deve chamar função ao clicar', () => {
  const mockFunction = jest.fn();
  const { getByText } = render(<Button onPress={mockFunction} title="Clique" />);
  
  fireEvent.press(getByText('Clique'));
  
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
```

### Testes Assíncronos
```typescript
it('deve aguardar operação assíncrona', async () => {
  const { getByText } = render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(getByText('Carregado')).toBeTruthy();
  });
});
```

## 🏃‍♂️ Executando Testes em Desenvolvimento

Para melhor experiência durante desenvolvimento:

1. **Modo Watch**: `npm run test:watch`
2. **Arquivo específico**: `npm test Button.test.tsx`
3. **Debug mode**: Adicione `debugger` no código e use `node --inspect-brk`

## 📊 Relatórios

Os relatórios de cobertura são gerados em `coverage/` e incluem:
- **HTML Report**: `coverage/lcov-report/index.html`
- **JSON Report**: `coverage/coverage-final.json`
- **LCOV Report**: `coverage/lcov.info`

## 🚨 Troubleshooting

### Problemas Comuns

1. **Metro bundler conflicts**: Pare o metro antes de executar testes
2. **Module resolution**: Verifique paths nos imports
3. **Mock issues**: Confirme se todos os mocks estão configurados
4. **Timeout errors**: Aumente timeout para testes assíncronos

### Limpeza de Cache
```bash
# Limpar cache do Jest
npm test -- --clearCache

# Limpar cache do Metro
npx react-native start --reset-cache
```

## 🤝 Contribuindo

Ao adicionar novos componentes ou funcionalidades:

1. **Sempre crie testes correspondentes**
2. **Mantenha cobertura acima de 70%**
3. **Siga padrões estabelecidos**
4. **Documente casos de teste complexos**
5. **Use mocks appropriados**

---

**Desenvolvido com ❤️ para garantir qualidade e confiabilidade do EcomApp**