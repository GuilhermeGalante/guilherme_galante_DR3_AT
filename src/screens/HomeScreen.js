import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { categories } from '../data/catalog';
import { useAppTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function HomeScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { user } = useAuth();

  return (
    <Screen>
      <FlatList
        testID="categories-list"
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={15} color={colors.primary} />
                  <Text style={[styles.eyebrow, { color: colors.muted }]}>Centro, Rio de Janeiro</Text>
                </View>
                <Text style={[styles.greeting, { color: colors.text }]}>
                  Olá, {user?.name.split(' ')[0]}!
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Abrir carrinho"
                style={[styles.cartShortcut, { backgroundColor: colors.surfaceAlt }]}
                onPress={() => navigation.navigate('Carrinho')}
              >
                <Ionicons name="bag-handle-outline" size={24} color={colors.primary} />
              </Pressable>
            </View>
            <View style={[styles.hero, { backgroundColor: colors.primary }]}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroTag}>DESTAQUE DO DIA</Text>
                <Text style={styles.heroTitle}>Entrega grátis no primeiro pedido</Text>
                <Text style={styles.heroText}>Válido para pedidos feitos hoje.</Text>
              </View>
              <View style={styles.heroIcon}>
                <Ionicons name="bicycle-outline" size={30} color="#8E321B" />
              </View>
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Categorias</Text>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Produtos', { categoryId: item.id, title: item.name })}
            style={({ pressed }) => [
              styles.category,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={26} color="#493E37" />
            </View>
            <View style={styles.categoryCopy}>
              <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.categoryDescription, { color: colors.muted }]}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.muted} />
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eyebrow: { fontSize: 12, fontWeight: '600' },
  greeting: { fontSize: 26, fontWeight: '700', marginTop: 5 },
  cartShortcut: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  hero: { borderRadius: 12, padding: 19, minHeight: 132, flexDirection: 'row', alignItems: 'center' },
  heroCopy: { flex: 1, zIndex: 2 },
  heroTag: { alignSelf: 'flex-start', color: '#7B2A16', backgroundColor: '#FFD9C9', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 5, fontWeight: '700', fontSize: 10, letterSpacing: 0.8 },
  heroTitle: { color: '#FFFFFF', fontSize: 20, lineHeight: 25, fontWeight: '700', marginTop: 10, maxWidth: 250 },
  heroText: { color: '#FFE9E2', fontSize: 13, marginTop: 6 },
  heroIcon: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#FFD9C9', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '700', marginTop: 25, marginBottom: 12 },
  category: { minHeight: 82, flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 11, marginBottom: 10 },
  categoryIcon: { width: 54, height: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  categoryCopy: { flex: 1, paddingHorizontal: 14 },
  categoryName: { fontSize: 16, fontWeight: '700' },
  categoryDescription: { fontSize: 13, lineHeight: 18, marginTop: 3 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
