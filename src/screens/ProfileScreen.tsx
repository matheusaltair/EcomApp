import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sair', 'Você tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      {user ? (
        <View style={styles.profileDetails}>
          <Text style={styles.name}>Nome: {user.name}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text style={styles.noUser}>Nenhum usuário autenticado.</Text>
      )}
      <Button
        title="Sair"
        onPress={handleLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
        backgroundColor="#ff3d00"
        textColor="#fff"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileDetails: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#757575',
  },
  noUser: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 24,
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#ff0000ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;