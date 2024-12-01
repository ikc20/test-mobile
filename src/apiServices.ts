import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Types des données reçues depuis l'API
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface LoginResponse {
  token: string;
}

// Login API
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('Tentative de connexion avec les identifiants:', email);
    const response = await api.post<LoginResponse>('/login', { email, password });
    console.log('Réponse de l\'API:', response.data); // Afficher la réponse complète de l'API

    if (response.data.token) {
      const token = response.data.token;
      await AsyncStorage.setItem('token', token); // Sauvegarder le token dans AsyncStorage
      console.log('Token enregistré dans AsyncStorage:', token);
      return response.data;
    } else {
      throw new Error('Aucun token trouvé dans la réponse de l\'API.');
    }
  } catch (err: any) {
    console.error('Erreur lors de la connexion:', err.response ? err.response.data : err.message);
    throw new Error('Erreur de connexion. Vérifiez vos identifiants.');
  }
};


// Products API
export const fetchProducts = async (page = 1): Promise<PaginatedResponse<Product>> => {
  try {
    console.log('Appel API pour récupérer les produits');
    const response = await api.get<PaginatedResponse<Product>>(`/products?page[size]=10&page[number]=${page}`);
    console.log('Réponse des produits:', response.data);  // Vérifiez la réponse des produits
    return response.data;
  } catch (err: any) {
    console.error('Erreur lors du chargement des produits:', err.response || err.message || err);
    throw new Error('Erreur de chargement des produits');
  }
};

// Categories API
export const fetchCategories = async (page = 1): Promise<PaginatedResponse<{ id: number; name: string }>> => {
  try {
    const response = await api.get<PaginatedResponse<{ id: number; name: string }>>(`/product-categories?page[size]=10&page[number]=${page}`);
    return response.data;
  } catch (err: any) {
    console.error('Erreur lors du chargement des catégories:', err.response || err.message || err);
    throw new Error('Erreur de chargement des catégories');
  }
};

// Brands API
export const fetchBrands = async (page = 1): Promise<PaginatedResponse<{ id: number; name: string }>> => {
  try {
    const response = await api.get<PaginatedResponse<{ id: number; name: string }>>(`/brands?page[size]=10&page[number]=${page}&sort=-products_count`);
    return response.data;
  } catch (err: any) {
    console.error('Erreur lors du chargement des marques:', err.response || err.message || err);
    throw new Error('Erreur de chargement des marques');
  }
};
