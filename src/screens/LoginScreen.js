import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { Screen } from '../components/Screen';
import { useAuth } from '../contexts/AuthContext';
import { useAppTheme } from '../contexts/ThemeContext';

export function LoginScreen() {
  const { colors } = useAppTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin123');
  const [errors, setErrors] = useState({});

  const submit = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Informe um e-mail válido.';
    if (!password) nextErrors.password = 'Informe sua senha.';
    else if (email.toLowerCase() === 'admin@admin.com' && password !== 'admin123') {
      nextErrors.password = 'Senha inválida para o usuário administrador.';
    }
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) signIn(email.trim());
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>IF</Text>
          </View>
          <Text style={[styles.brand, { color: colors.text }]}>InfnetFood</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Seu pedido favorito no Centro do Rio.
          </Text>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Boas-vindas</Text>
            <Text style={[styles.help, { color: colors.muted }]}>Entre para continuar seu pedido.</Text>
            <AppInput
              testID="email-input"
              label="E-mail"
              value={email}
              error={errors.email}
              onChangeText={(value) => {
                setEmail(value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              style={styles.field}
            />
            <AppInput
              testID="password-input"
              label="Senha"
              value={password}
              error={errors.password}
              onChangeText={(value) => {
                setPassword(value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
              secureTextEntry
              autoComplete="password"
              style={styles.field}
            />
            <AppButton testID="login-button" title="Entrar" onPress={submit} style={styles.submit} />
            <Text style={[styles.credentials, { color: colors.muted }]}>
              Acesso de avaliação: admin@admin.com / admin123
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 64, height: 64, borderRadius: 12, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', letterSpacing: 1 },
  brand: { fontSize: 31, fontWeight: '700', textAlign: 'center', marginTop: 14 },
  subtitle: { fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 6, marginBottom: 26 },
  card: { borderRadius: 12, borderWidth: 1, padding: 22 },
  title: { fontSize: 23, fontWeight: '700' },
  help: { fontSize: 14, marginTop: 5, marginBottom: 18 },
  field: { marginBottom: 14 },
  submit: { marginTop: 6 },
  credentials: { textAlign: 'center', fontSize: 12, marginTop: 14 },
});
