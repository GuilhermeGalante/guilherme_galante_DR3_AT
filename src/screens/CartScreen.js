import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { AppButton } from '../components/AppButton';
import { EmptyState } from '../components/EmptyState';
import { QuantityControl } from '../components/QuantityControl';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/format';

export function CartScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { items, total, changeQuantity, removeItem } = useCart();
  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, !items.length && styles.emptyContent]}
        ListHeaderComponent={
          items.length ? <Text style={[styles.heading, { color: colors.text }]}>Seu carrinho</Text> : null
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Seu carrinho está vazio"
            description="Escolha uma categoria e adicione algo gostoso."
          />
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemCopy}>
              <View style={styles.nameRow}>
                <Text numberOfLines={1} style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                <Pressable accessibilityLabel={`Remover ${item.name}`} onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </Pressable>
              </View>
              <Text style={[styles.unitPrice, { color: colors.muted }]}>{formatCurrency(item.price)} cada</Text>
              <View style={styles.itemFooter}>
                <QuantityControl
                  compact
                  quantity={item.quantity}
                  onDecrease={() => changeQuantity(item.id, -1)}
                  onIncrease={() => changeQuantity(item.id, 1)}
                />
                <Text style={[styles.subtotal, { color: colors.primary }]}>
                  {formatCurrency(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          items.length ? (
            <View style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.muted }]}>Subtotal</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>{formatCurrency(total)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.muted }]}>Entrega</Text>
                <Text style={[styles.free, { color: colors.success }]}>Grátis</Text>
              </View>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>{formatCurrency(total)}</Text>
              </View>
              <AppButton title="Ir para checkout" onPress={() => navigation.navigate('Checkout')} style={styles.checkout} />
            </View>
          ) : (
            <AppButton title="Explorar cardápio" onPress={() => navigation.navigate('Início')} style={styles.explore} />
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  emptyContent: { flexGrow: 1 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  item: { flexDirection: 'row', borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 10 },
  image: { width: 88, height: 96, borderRadius: 8, backgroundColor: '#E8D9CE' },
  itemCopy: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  name: { flex: 1, fontSize: 16, fontWeight: '700' },
  unitPrice: { fontSize: 12, marginTop: 4 },
  itemFooter: { marginTop: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subtotal: { fontSize: 15, fontWeight: '700' },
  summary: { borderWidth: 1, borderRadius: 12, padding: 18, marginTop: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontWeight: '700' },
  free: { fontWeight: '900' },
  line: { height: 1, marginVertical: 11 },
  totalLabel: { fontSize: 18, fontWeight: '700' },
  totalValue: { fontSize: 23, fontWeight: '700' },
  checkout: { marginTop: 17 },
  explore: { marginTop: 'auto' },
});
