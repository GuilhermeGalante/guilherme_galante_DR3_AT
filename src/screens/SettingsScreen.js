import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { useAppTheme } from '../contexts/ThemeContext';

export function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  return (
    <Screen edges={['right', 'bottom', 'left']}>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: colors.text }]}>Configurações</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={23} color={colors.primary} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.title, { color: colors.text }]}>Tema escuro</Text>
            <Text style={[styles.description, { color: colors.muted }]}>
              {isDark ? 'Tema escuro ativado' : 'Tema claro ativado'}
            </Text>
          </View>
          <Switch
            testID="theme-switch"
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor="#FFFFFF"
          />
        </View>
        <View style={[styles.preview, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
          <Text style={styles.previewEmoji}>{isDark ? '🌙' : '☀️'}</Text>
          <Text style={[styles.previewTitle, { color: colors.text }]}>Preferência aplicada</Text>
          <Text style={[styles.previewText, { color: colors.muted }]}>
            O tema altera navegação, telas, cards e formulários durante toda a sessão.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 20 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 16 },
  icon: { width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, paddingHorizontal: 13 },
  title: { fontSize: 16, fontWeight: '700' },
  description: { fontSize: 12, marginTop: 3 },
  preview: { alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 28, marginTop: 18 },
  previewEmoji: { fontSize: 48 },
  previewTitle: { fontSize: 19, fontWeight: '700', marginTop: 12 },
  previewText: { fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 6 },
});
