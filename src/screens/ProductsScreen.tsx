import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProducts, Product, login } from '../apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null); // Réinitialiser l'erreur
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token récupéré dans ProductsScreen:', token);

        if (!token) {
          console.log('Aucun token trouvé, tentative de login...');
          await login('admin@chakibdrugstore.com', '123456');
        }

        const data = await fetchProducts(page);
        setProducts(data.data);
        setTotalPages(data.meta.totalPages); // Mettre à jour le nombre total de pages
      } catch (err) {
        console.error('Erreur de chargement des produits:', err);
        setError('Une erreur est survenue lors du chargement des produits.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      {/* Pagination */}
      <View style={styles.pagination}>
        <Button
          title="Précédent"
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        />
        <Text>Page {page} sur {totalPages}</Text>
        <Button
          title="Suivant"
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Remplacement du style inline par une clé dans styles
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default ProductsScreen;
