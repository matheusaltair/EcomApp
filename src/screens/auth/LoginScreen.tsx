
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Title from '../../components/ui/Title';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const { login, error, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const savedUser = await AsyncStorage.getItem('userLogin');
      if (savedUser) {
        navigation.replace('Home');
      }
      setLoading(false);
    };
    checkLogin();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      setLocalError('Preencha todos os campos.');
      return;
    }
    setLocalError('');
    await login(email, password, name);
    // Se login foi bem-sucedido, salva no AsyncStorage
    if (!error) {
      await AsyncStorage.setItem('userLogin', JSON.stringify({ email, name }));
      navigation.replace('Home');
    }
  };

  if (loading) return null;

  return (
    <ScreenContainer styles={styles.container}>
      <Title>Login Screen</Title>
      <View style={styles.viewInputs}>
        <Input
          placeholder="Seu nome"
          keyboardType="default"
          autoCapitalize="none"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      {(localError || error) ? (
        <View style={styles.errorBox}>
          <Title style={styles.errorText}>{localError || error}</Title>
        </View>
      ) : null}

      <Button
        title={isLoading ? 'Entrando...' : 'Entrar'}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </ScreenContainer>
  );
};

const styles = {
  container: {
    justifyContent: 'center' as const,
    gap: 10,
  },
  viewInputs: {
    gap: 0
  },
  errorBox: {
    backgroundColor: '#ffeaea',
    borderColor: '#ff3d00',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center' as const,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 0,
  },
};

export default LoginScreen;