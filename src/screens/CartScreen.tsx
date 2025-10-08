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


const CartScreen: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Remove item do carrinho com feedback visual
  const handleRemoveItem = (productId: string) => {
    try {
      removeFromCart(productId);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o item.');
    }
  };

  // Atualiza quantidade ou remove item se quantidade for zero
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
      try {
        updateQuantity(productId, newQuantity);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar a quantidade.');
      }
    }
  };

  // Finaliza compra com notificação e feedback visual
  const handleCheckout = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Notificações',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: 'Compra finalizada',
        body: 'Sua compra foi realizada com sucesso!',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
          sound: 'default',
          vibrationPattern: [300, 500],
        },
      });

      items.forEach((item) => removeFromCart(item.product.id));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível finalizar a compra.');
    }
  };

  // Renderiza cada item do carrinho
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
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<CartFooter total={getTotalPrice()} onCheckout={handleCheckout} />}
          />
        </>
      ) : (
        <EmptyCart />
      )}
    </ScreenContainer>
  );
};


const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cartList: {
    flexGrow: 1,
    paddingBottom: 16,
  },
});

export default CartScreen;