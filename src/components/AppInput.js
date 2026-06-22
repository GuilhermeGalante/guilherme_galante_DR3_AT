import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';

export function AppInput({ label, error, style, ...props }) {
  const { colors } = useAppTheme();
  return (
    <View style={style}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
          },
        ]}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '700', marginBottom: 7 },
  input: { height: 52, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16 },
  error: { fontSize: 12, marginTop: 5 },
});
