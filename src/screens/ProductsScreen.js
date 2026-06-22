import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { EmptyState } from '../components/EmptyState';
import { products } from '../data/catalog';
import { useAppTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/format';

export function ProductsScreen({ route, navigation }) {
  const { colors } = useAppTheme();
  const filtered = products.filter((product) => product.categoryId === route.params.categoryId);
  return (
    <Screen edges={['right', 'bottom', 'left']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={[styles.heading, { color: colors.text }]}>
            {route.params.title}
          </Text>
        }
        ListEmptyComponent={
          <EmptyState title="Nenhum produto disponível" description="Novos pratos chegarão em breve." />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('DetalhesProduto', { product: item })}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && styles.pressed,
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.copy}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text numberOfLines={2} style={[styles.description, { color: colors.muted }]}>{item.description}</Text>
              <View style={styles.footer}>
                <Text style={[styles.price, { color: colors.primary }]}>{formatCurrency(item.price)}</Text>
                <View style={styles.rating}>
                  <Ionicons name="star" size={14} color="#F4A261" />
                  <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  card: { flexDirection: 'row', minHeight: 132, borderRadius: 12, borderWidth: 1, padding: 10, marginBottom: 11 },
  image: { width: 112, minHeight: 108, borderRadius: 8, backgroundColor: '#E8D9CE' },
  copy: { flex: 1, paddingLeft: 13, paddingVertical: 3 },
  name: { fontSize: 17, fontWeight: '700' },
  description: { fontSize: 13, lineHeight: 18, marginTop: 5 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  price: { fontSize: 17, fontWeight: '700' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '700' },
  pressed: { opacity: 0.8 },
});
