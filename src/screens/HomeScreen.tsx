import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { Platform } from 'react-native';
import notifee from '@notifee/react-native';

const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Smartphone Plus',
    price: 199,
    image: 'https://i.pinimg.com/1200x/71/e0/56/71e056cb3577ea325f9e3779bdafdda2.jpg',
    resizeMode: 'contain'
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    price: 199,
    image: 'https://i.pinimg.com/736x/43/15/ae/4315ae69df9daa2550203db798b0d77f.jpg',
    resizeMode: 'cover'
  },
  {
    id: '3',
    title: 'Smart Watch',
    price: 299,
    image: 'https://i.pinimg.com/736x/d1/09/01/d109019339766e957c893c0918c88bf1.jpg',
    resizeMode: 'cover'
  },
  {
    id: '4',
    title: 'Bluetooth Speaker',
    price: 129,
    image: 'https://i.pinimg.com/736x/c6/a1/91/c6a191fa3511c9c36472eaccf5dc3276.jpg',
    resizeMode: 'cover'
  },
];

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  resizeMode: 'cover' | 'contain';
}
const HomeScreen = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 5000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`${product.title} foi adicionado ao carrinho!`);
  };

  const animatedValues = useRef(PRODUCTS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(120, // tempo entre cada card
      animatedValues.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [animatedValues]);

  const renderItem = ({ item, index }: { item: Product, index: number }) => (
    <Animated.View
      style={[
        styles.productCard,
        {
          opacity: animatedValues[index],
          transform: [{ translateY: animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode={item.resizeMode} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>R${item.price},00</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Comprar</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const handleNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus < 1) {
        // Permissão negada
        return;
      }
    }
  };

  useEffect(() => {
    handleNotificationPermission();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Produtos</Text>
        <FlatList
          data={PRODUCTS}
          renderItem={(props) => renderItem({ ...props, index: props.index })}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
        {toastVisible && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    padding: 5,
  },
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 'auto'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4
  },
  addButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  toast: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;