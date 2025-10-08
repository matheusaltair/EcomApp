import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Title from '../../components/ui/Title';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center' as any,
  },
  subtitleBox: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center' as any,
  },
  viewInputs: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  errorBox: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 0,
    textAlign: 'center' as any,
  },
});

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
        <View style={styles.card}>
          <Title style={styles.title}>Bem-vindo Usuário!</Title>
          <View style={styles.subtitleBox}>
            <Title style={styles.subtitle}>Acesse sua conta para continuar</Title>
          </View>
          <View style={styles.viewInputs}>
            <Input
              placeholder="Seu nome"
              keyboardType="default"
              autoCapitalize="words"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
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
            style={styles.button}
          />
        </View>
      </ScreenContainer>
  );
};

export default LoginScreen;