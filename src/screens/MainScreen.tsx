/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Définir les routes disponibles
type RootStackParamList = {
  Main: undefined;
};

// Typage des props pour l'écran principal
type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran principal</Text>
      <View style={styles.buttonContainer}></View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});

export default MainScreen;
