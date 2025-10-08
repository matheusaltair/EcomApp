// Setup básico para testes React Native
import 'react-native-gesture-handler/jestSetup';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock básico do React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
    // Mockando apenas componentes necessários
    NativeModules: {
      ...RN.NativeModules,
    },
  };
});

// Suprime warnings durante os testes
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('deprecated') || 
     args[0].includes('extracted from react-native core'))
  ) {
    return;
  }
  originalWarn(...args);
};