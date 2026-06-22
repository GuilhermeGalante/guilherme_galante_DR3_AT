import React from 'react';
import { FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { restaurants } from '../data/restaurants';
import { useAppTheme } from '../contexts/ThemeContext';

export function RestaurantsScreen({ navigation }) {
  const { colors } = useAppTheme();
  const openMap = () => Linking.openURL('https://www.google.com/maps/search/restaurantes+Centro+Rio+de+Janeiro');

  return (
    <Screen>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.headingRow}>
              <View>
                <Text style={[styles.heading, { color: colors.text }]}>Perto de você</Text>
                <Text style={[styles.subheading, { color: colors.muted }]}>10 restaurantes no Centro do Rio</Text>
              </View>
              <Pressable onPress={openMap} style={[styles.mapButton, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons name="open-outline" size={21} color={colors.primary} />
              </Pressable>
            </View>
            <View style={[styles.map, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
              <View style={[styles.road, styles.roadOne, { backgroundColor: colors.border }]} />
              <View style={[styles.road, styles.roadTwo, { backgroundColor: colors.border }]} />
              <View style={[styles.road, styles.roadThree, { backgroundColor: colors.border }]} />
              {restaurants.map((restaurant, index) => (
                <Pressable
                  key={restaurant.id}
                  accessibilityLabel={`Marcador ${index + 1}: ${restaurant.name}`}
                  onPress={() => navigation.navigate('DetalhesRestaurante', { restaurant })}
                  style={[
                    styles.marker,
                    {
                      backgroundColor: colors.primary,
                      left: `${8 + ((index * 29) % 82)}%`,
                      top: `${12 + ((index * 23) % 70)}%`,
                    },
                  ]}
                >
                  <Text style={styles.markerText}>{index + 1}</Text>
                </Pressable>
              ))}
              <View style={[styles.mapLabel, { backgroundColor: colors.surface }]}>
                <Text style={[styles.mapLabelTitle, { color: colors.text }]}>Centro, Rio de Janeiro</Text>
                <Text style={[styles.mapLabelText, { color: colors.muted }]}>Mapa simulado • toque nos marcadores</Text>
              </View>
            </View>
            <Text style={[styles.listTitle, { color: colors.text }]}>Restaurantes</Text>
          </>
        }
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate('DetalhesRestaurante', { restaurant: item })}
            style={({ pressed }) => [
              styles.restaurant,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && styles.pressed,
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.copy}>
              <Text style={[styles.name, { color: colors.text }]}>{index + 1}. {item.name}</Text>
              <Text numberOfLines={2} style={[styles.address, { color: colors.muted }]}>{item.address}</Text>
              <View style={styles.meta}>
                <Text style={[styles.rating, { color: colors.warning }]}>★ {item.rating}</Text>
                <Text style={[styles.open, { color: colors.success }]}>Aberto</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 36 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 17 },
  heading: { fontSize: 27, fontWeight: '700' },
  subheading: { fontSize: 13, marginTop: 3 },
  mapButton: { width: 45, height: 45, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  map: { height: 260, borderRadius: 12, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  road: { position: 'absolute', height: 9, width: '130%', opacity: 0.8 },
  roadOne: { top: 62, left: -30, transform: [{ rotate: '12deg' }] },
  roadTwo: { top: 158, left: -20, transform: [{ rotate: '-17deg' }] },
  roadThree: { top: 120, left: -90, transform: [{ rotate: '72deg' }] },
  marker: { position: 'absolute', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF', elevation: 3 },
  markerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  mapLabel: { position: 'absolute', left: 12, right: 12, bottom: 12, borderRadius: 8, padding: 11, opacity: 0.94 },
  mapLabelTitle: { fontSize: 14, fontWeight: '700' },
  mapLabelText: { fontSize: 11, marginTop: 2 },
  listTitle: { fontSize: 20, fontWeight: '700', marginTop: 24, marginBottom: 12 },
  restaurant: { flexDirection: 'row', alignItems: 'center', minHeight: 91, borderRadius: 12, borderWidth: 1, padding: 10, marginBottom: 10 },
  image: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#E8D9CE' },
  copy: { flex: 1, paddingHorizontal: 11 },
  name: { fontSize: 15, fontWeight: '700' },
  address: { fontSize: 11, lineHeight: 16, marginTop: 3 },
  meta: { flexDirection: 'row', gap: 12, marginTop: 5 },
  rating: { fontSize: 11, fontWeight: '800' },
  open: { fontSize: 11, fontWeight: '800' },
  pressed: { opacity: 0.78 },
});
