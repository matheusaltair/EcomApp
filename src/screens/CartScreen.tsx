import React from 'react';
import { Text, FlatList, StyleSheet, Alert } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCartStore } from '../store/cartStore';
import ScreenContainer from '../components/layout/ScreenContainer';
import CartItem from '../components/ui/CartItem';
import CartFooter from '../components/layout/CartFooter';
import EmptyCart from '../components/ui/EmptyCart';

interface CartItem {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

type RootStackParamList = {
  Home: undefined;
};

const CartScreen = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  console.log('Cart Items:', items);
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      Alert.alert(
        'Remover item',
        'Deseja remover este item do carrinho?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sim', onPress: () => handleRemoveItem(productId) },
        ],
        { cancelable: true }
      );
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Função para notificação local ao finalizar compra
  const handleCheckout = async () => {
    // Cria o canal de notificação (apenas na primeira vez)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Exibe a notificação
    await notifee.displayNotification({
      title: 'Compra finalizada',
      body: 'Compra finalizada com sucesso',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        // Opcional: para garantir heads-up, pode adicionar sound e vibration
        sound: 'default',
        vibrationPattern: [300, 500],
      },
    });

    // Limpa o carrinho
    items.forEach((item) => removeFromCart(item.product.id));

    // Retorna para a Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <CartItem
      title={item.product.title}
      price={item.product.price}
      image={item.product.image}
      quantity={item.quantity}
      onRemove={() => handleRemoveItem(item.product.id)}
      onQuantityChange={(newQuantity) => handleQuantityChange(item.product.id, newQuantity)}
    />
  );

  return (
    <ScreenContainer>
      <Text style={styles.header}>Carrinho</Text>
      {Array.isArray(items) && items.length > 0 ? (
        <>
          <FlatList
            data={items as CartItem[]}
            renderItem={renderItem}
            keyExtractor={(item) => item.product.id}
            contentContainerStyle={styles.cartList}
          />
          <CartFooter total={getTotalPrice()} onCheckout={handleCheckout} />
        </>
      ) : (
        <EmptyCart />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartList: {
    flexGrow: 1,
  },
});

export default CartScreen;