// Setup básico para testes React Native
import 'react-native-gesture-handler/jestSetup';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock do react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock do react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
    key: 'test',
    name: 'test',
  }),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

// Mock do React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const MockedRN = {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
    NativeModules: {
      ...RN.NativeModules,
      DevMenu: {},
    },
    TurboModuleRegistry: {
      get: jest.fn(),
      getEnforcing: jest.fn(),
    },
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      Version: 14,
      select: jest.fn((obj) => obj.ios || obj.default),
    },
  };
  
  return MockedRN;
});

// Suprime warnings durante os testes
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('deprecated') || 
     args[0].includes('extracted from react-native core') ||
     args[0].includes('TurboModuleRegistry'))
  ) {
    return;
  }
  originalWarn(...args);
};

// Teste simples para garantir que o setup está funcionando
describe('Setup', () => {
  it('should be configured correctly', () => {
    expect(true).toBe(true);
  });
});