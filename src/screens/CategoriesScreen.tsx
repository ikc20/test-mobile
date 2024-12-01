import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchCategories } from '../apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoriesScreen: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null); // Réinitialiser l'erreur
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token récupéré dans CategoriesScreen:', token);

        if (!token) {
          console.log('Aucun token trouvé, tentative de login...');
          // Vous pouvez gérer ici une logique de connexion si nécessaire
        }

        const data = await fetchCategories(page);
        setCategories(data.data);
        setTotalPages(data.meta.totalPages); // Mettre à jour le nombre total de pages
      } catch (error) {
        console.error('Erreur de chargement des catégories:', error);
        setError('Une erreur est survenue lors du chargement des catégories.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default CategoriesScreen;
