import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { AppButton } from '../components/AppButton';
import { QuantityControl } from '../components/QuantityControl';
import { Toast } from '../components/Toast';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/format';

export function ProductDetailsScreen({ route, navigation }) {
  const product = route.params.product;
  const { colors } = useAppTheme();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Screen edges={['right', 'bottom', 'left']}>
      <Toast visible={added} message={`${quantity} item(ns) adicionado(s)`} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>{product.name}</Text>
          <View style={[styles.rating, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="star" size={15} color="#F4A261" />
            <Text style={[styles.ratingText, { color: colors.text }]}>{product.rating}</Text>
          </View>
        </View>
        <Text style={[styles.description, { color: colors.muted }]}>{product.description}</Text>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.quantityRow}>
          <View>
            <Text style={[styles.label, { color: colors.muted }]}>Quantidade</Text>
            <Text style={[styles.price, { color: colors.primary }]}>
              {formatCurrency(product.price * quantity)}
            </Text>
          </View>
          <QuantityControl
            quantity={quantity}
            onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
            onIncrease={() => setQuantity((current) => current + 1)}
          />
        </View>
        <AppButton
          title={added ? 'Adicionado ao carrinho ✓' : 'Adicionar ao carrinho'}
          onPress={add}
          variant={added ? 'secondary' : 'primary'}
          style={styles.button}
        />
        <AppButton
          title="Ver carrinho"
          variant="outline"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Carrinho' })}
          style={styles.cartButton}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 35 },
  image: { width: '100%', aspectRatio: 1.35, backgroundColor: '#E8D9CE' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingHorizontal: 20, marginTop: 21 },
  title: { flex: 1, fontSize: 27, fontWeight: '900' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14 },
  ratingText: { fontWeight: '800' },
  description: { fontSize: 15, lineHeight: 23, marginTop: 10, paddingHorizontal: 20 },
  divider: { height: 1, margin: 20 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  label: { fontSize: 13, fontWeight: '700' },
  price: { fontSize: 23, fontWeight: '900', marginTop: 3 },
  button: { width: '78%', alignSelf: 'center', marginTop: 25, marginBottom: 10 },
  cartButton: { width: '78%', alignSelf: 'center' },
});
