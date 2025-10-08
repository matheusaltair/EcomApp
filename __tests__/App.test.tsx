/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock dos módulos necessários para o App
jest.mock('../src/navigation', () => {
  const mockReact = require('react');
  const MockedNavigation = () => mockReact.createElement('View');
  return MockedNavigation;
});

jest.mock('../src/store/authPersist', () => ({
  restoreAuth: jest.fn().mockResolvedValue(undefined),
}));

describe('App', () => {
  test('renders correctly', async () => {
    let component: ReactTestRenderer.ReactTestRenderer;
    
    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(<App />);
      // Aguarda um pouco para o useEffect ser executado
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));
    });
    
    expect(component!).toBeTruthy();
  });
});
