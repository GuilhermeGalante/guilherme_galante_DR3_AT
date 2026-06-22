import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { CartScreen } from '../screens/CartScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { RestaurantsScreen } from '../screens/RestaurantsScreen';
import { RestaurantDetailsScreen } from '../screens/RestaurantDetailsScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, color, size, badge }) {
  return (
    <View>
      <Ionicons name={name} color={color} size={size} />
      {badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

function MainTabs() {
  const { colors } = useAppTheme();
  const { count } = useCart();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);
  const screens = [
    ['Início', HomeScreen, 'home-outline'],
    ['Pedidos', OrdersScreen, 'receipt-outline'],
    ['Restaurantes', RestaurantsScreen, 'map-outline'],
    ['Carrinho', CartScreen, 'bag-handle-outline'],
    ['Perfil', ProfileScreen, 'person-outline'],
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.tab,
          borderTopColor: colors.border,
          height: 58 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 7,
        },
        tabBarItemStyle: { paddingVertical: 1 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      }}
    >
      {screens.map(([name, component, icon]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon name={icon} color={color} size={size} badge={name === 'Carrinho' ? count : 0} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Produtos" component={ProductsScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="DetalhesProduto" component={ProductDetailsScreen} options={{ title: 'Detalhes do produto' }} />
      <Stack.Screen name="DetalhesRestaurante" component={RestaurantDetailsScreen} options={{ title: 'Restaurante' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name="Configurações" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  const { user } = useAuth();
  const { colors, isDark } = useAppTheme();
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <AuthenticatedStack />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  badge: { position: 'absolute', top: -7, right: -10, minWidth: 17, height: 17, borderRadius: 9, backgroundColor: '#D94F2B', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '900' },
});
