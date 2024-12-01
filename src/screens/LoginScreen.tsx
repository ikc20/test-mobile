import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { login } from '../apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('admin@chakibdrugstore.com');
  const [password, setPassword] = useState<string>('123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Tentative de connexion avec les identifiants
      const response = await login(email, password);
      console.log('Utilisateur connecté avec succès', response);

      // Vérification du token dans AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('Token sauvegardé:', token);

      if (token) {
        // Redirection après connexion réussie
        navigation.navigate('Home'); // Remplacez par la route de votre écran d'accueil
      } else {
        setError('Le token est introuvable.');
      }
    } catch (err: unknown) {
      console.error('Erreur de connexion:', err);

      // Vérification que l'erreur est bien un objet Error avant d'accéder à ses propriétés
      if (err instanceof Error) {
        setError(err.message || 'Erreur lors de la connexion. Vérifiez vos identifiants.');
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Se connecter" onPress={handleLogin} disabled={loading} />
      {loading && <Text>Chargement...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
