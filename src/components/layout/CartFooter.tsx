import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';

interface CartFooterProps {
  total: number;
  onCheckout: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ total, onCheckout }) => (
  <View style={styles.footer}>
    <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
    <Button
      title="Finalizar Compra"
      onPress={onCheckout}
      style={styles.checkoutButton}
      textStyle={styles.checkoutButtonText}
    />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartFooter;
