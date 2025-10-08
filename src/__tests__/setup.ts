import '@testing-library/jest-native/extend-expect';

// Mock para React Native Vector Icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock para Zustand
jest.mock('zustand', () => ({
  create: jest.fn(() => () => ({})),
}));

// Mock para AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock para React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

// Mock para Notifee
jest.mock('@notifee/react-native', () => ({
  displayNotification: jest.fn(),
  requestPermission: jest.fn(),
  createChannel: jest.fn(),
}));

// Silenciar warnings desnecessários nos testes
console.warn = jest.fn();
console.error = jest.fn();