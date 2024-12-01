import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';  
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import BrandsScreen from './screens/BrandsScreen';

type RootDrawerParamList = {
  Login: undefined;        // Pas de paramètres pour Login
  Main: undefined;         // Pas de paramètres pour Main
  Products: undefined;     // Pas de paramètres pour Products
  Categories: undefined;   // Pas de paramètres pour Categories
  Brands: undefined;       // Pas de paramètres pour Brands
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();  // Utilisation du Drawer Navigator

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="Products" component={ProductsScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Brands" component={BrandsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
