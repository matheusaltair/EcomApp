import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyCart: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Seu carrinho está vazio.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EmptyCart;
