import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { OrdersProvider } from './src/contexts/OrdersContext';
import { ThemeProvider, useAppTheme } from './src/contexts/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppContent() {
  const { isDark } = useAppTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <OrdersProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </OrdersProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
