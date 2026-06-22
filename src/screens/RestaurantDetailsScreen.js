import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { useAppTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/format';

export function RestaurantDetailsScreen({ route, navigation }) {
  const { colors } = useAppTheme();
  const { restaurant } = route.params;
  const openMap = () =>
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`);

  return (
    <Screen edges={['right', 'bottom', 'left']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: restaurant.image }} style={styles.hero} />
        <View style={styles.copy}>
          <Text style={[styles.title, { color: colors.text }]}>{restaurant.name}</Text>
          <View style={styles.meta}>
            <Text style={[styles.rating, { color: colors.warning }]}>★ {restaurant.rating}</Text>
            <Text style={[styles.open, { color: colors.success }]}>● Aberto • {restaurant.openingHours}</Text>
          </View>
          <Text style={[styles.description, { color: colors.muted }]}>{restaurant.description}</Text>
          <View style={[styles.addressCard, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
            <Text style={[styles.address, { color: colors.text }]}>{restaurant.address}</Text>
          </View>
          <AppButton title="Abrir no mapa" variant="outline" onPress={openMap} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Destaque do cardápio</Text>
          <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image source={{ uri: restaurant.menuItem.image }} style={styles.menuImage} />
            <View style={styles.menuCopy}>
              <Text style={[styles.menuName, { color: colors.text }]}>{restaurant.menuItem.name}</Text>
              <Text style={[styles.menuDescription, { color: colors.muted }]}>Preparado na hora com ingredientes selecionados.</Text>
              <Text style={[styles.menuPrice, { color: colors.primary }]}>{formatCurrency(restaurant.menuItem.price)}</Text>
            </View>
          </View>
          <AppButton
            title="Explorar cardápio"
            onPress={() => navigation.navigate('MainTabs', { screen: 'Início' })}
            style={styles.explore}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 36 },
  hero: { width: '100%', aspectRatio: 1.7, backgroundColor: '#E8D9CE' },
  copy: { padding: 20 },
  title: { fontSize: 28, fontWeight: '900' },
  meta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  rating: { fontWeight: '900' },
  open: { fontSize: 13, fontWeight: '800' },
  description: { fontSize: 15, lineHeight: 23, marginTop: 14 },
  addressCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 16, marginVertical: 18 },
  address: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: '700' },
  sectionTitle: { fontSize: 20, fontWeight: '900', marginTop: 27, marginBottom: 12 },
  menuCard: { borderWidth: 1, borderRadius: 20, overflow: 'hidden' },
  menuImage: { width: '100%', aspectRatio: 2, backgroundColor: '#E8D9CE' },
  menuCopy: { padding: 16 },
  menuName: { fontSize: 18, fontWeight: '900' },
  menuDescription: { fontSize: 13, lineHeight: 19, marginTop: 5 },
  menuPrice: { fontSize: 19, fontWeight: '900', marginTop: 10 },
  explore: { marginTop: 18 },
});
