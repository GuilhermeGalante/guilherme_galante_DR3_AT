import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { useAuth } from '../contexts/AuthContext';
import { useAppTheme } from '../contexts/ThemeContext';

export function ProfileScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { user, signOut } = useAuth();
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: colors.text }]}>Meu perfil</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.email, { color: colors.muted }]}>{user.email}</Text>
        </View>
        <View style={[styles.info, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.muted }]}>Endereço padrão</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>Centro, Rio de Janeiro - RJ</Text>
            </View>
          </View>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={22} color={colors.primary} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.muted }]}>Pagamento favorito</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>Pix</Text>
            </View>
          </View>
        </View>
        <AppButton title="Configurações" variant="outline" onPress={() => navigation.navigate('Configurações')} style={styles.button} />
        <AppButton title="Sair da conta" onPress={signOut} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: 20 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  card: { borderWidth: 1, borderRadius: 12, padding: 24, alignItems: 'center' },
  avatar: { width: 116, height: 116, borderRadius: 58, backgroundColor: '#E8D9CE' },
  name: { fontSize: 21, fontWeight: '700', marginTop: 14 },
  email: { fontSize: 14, marginTop: 4 },
  info: { borderWidth: 1, borderRadius: 12, padding: 17, marginVertical: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoLabel: { fontSize: 11, fontWeight: '700' },
  infoValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  line: { height: 1, marginVertical: 15 },
  button: { marginBottom: 10 },
});
