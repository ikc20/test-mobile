import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définir une instance axios avec une base URL
const api = axios.create({
  baseURL: 'https://api.caisse.fcpo.agency/api', // La base URL pour l'API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le token dans les requêtes
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    console.log('Token récupéré dans l\'intercepteur:', token); // Vérifiez si le token est bien récupéré

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token ajouté aux en-têtes de la requête');
    } else {
      console.log('Aucun token trouvé');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
