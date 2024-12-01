import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchProducts, fetchCategories, fetchBrands } from '../apiServices';

type MainScreenProps = {
  navigation: any; // Vous pouvez améliorer ce type en fonction de votre configuration de navigation
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null); // Réinitialiser les erreurs
        const productsData = await fetchProducts(1);
        const categoriesData = await fetchCategories(1);
        const brandsData = await fetchBrands(1);

        setProducts(productsData.data);
        setCategories(categoriesData.data);
        setBrands(brandsData.data);
      } catch (error) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur lors du chargement des données', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  const navigateToProductsScreen = () => {
    navigation.navigate('Products');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produits</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Products', { productId: item.id })} // Naviguer vers ProductsScreen avec l'ID du produit
          >
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}€</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Voir tous les produits" onPress={navigateToProductsScreen} />

      <Text style={styles.title}>Catégories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Marques</Text>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MainScreen;
