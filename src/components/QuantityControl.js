import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';

export function QuantityControl({ quantity, onDecrease, onIncrease, compact = false }) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceAlt }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Diminuir quantidade"
        onPress={onDecrease}
        style={[styles.action, compact && styles.compact]}
      >
        <Text style={[styles.symbol, { color: colors.primary }]}>−</Text>
      </Pressable>
      <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Aumentar quantidade"
        onPress={onIncrease}
        style={[styles.action, compact && styles.compact]}
      >
        <Text style={[styles.symbol, { color: colors.primary }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', borderRadius: 10 },
  action: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  compact: { width: 38, height: 38 },
  symbol: { fontSize: 24, fontWeight: '800' },
  quantity: { minWidth: 28, textAlign: 'center', fontSize: 17, fontWeight: '800' },
});
