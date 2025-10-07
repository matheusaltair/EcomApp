import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './authStore';

export const restoreAuth = async () => {
  const savedUser = await AsyncStorage.getItem('userLogin');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    useAuthStore.setState({
      user: { id: '1', name: user.name, email: user.email },
      isAuthenticated: true,
    });
  }
};

export const persistAuth = async () => {
  const { user, isAuthenticated } = useAuthStore.getState();
  if (isAuthenticated && user) {
    await AsyncStorage.setItem('userLogin', JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem('userLogin');
  }
}
