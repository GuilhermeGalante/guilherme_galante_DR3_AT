import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';

export function EmptyState({ emoji = '🍽️', title, description }) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.muted }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, alignItems: 'center', justifyContent: 'center', flex: 1 },
  emoji: { fontSize: 54, marginBottom: 12 },
  title: { fontSize: 21, fontWeight: '800', textAlign: 'center' },
  description: { fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 8 },
});
