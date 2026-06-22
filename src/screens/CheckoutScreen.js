import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { Screen } from '../components/Screen';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { lookupCep } from '../services/cepService';
import { scheduleOrderNotification } from '../services/notificationService';
import { formatCep, formatCurrency, onlyDigits } from '../utils/format';

const paymentOptions = [
  { id: 'pix', label: 'Pix', icon: 'qr-code-outline' },
  { id: 'card', label: 'Cartão', icon: 'card-outline' },
  { id: 'cash', label: 'Dinheiro', icon: 'cash-outline' },
];

export function CheckoutScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [errors, setErrors] = useState({});
  const [loadingCep, setLoadingCep] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const scale = useRef(new Animated.Value(0.5)).current;

  const searchCep = async () => {
    setLoadingCep(true);
    setErrors((current) => ({ ...current, cep: undefined }));
    try {
      const result = await lookupCep(cep);
      setCep(result.cep);
      setAddress(result.formatted);
    } catch (error) {
      setErrors((current) => ({ ...current, cep: error.message }));
    } finally {
      setLoadingCep(false);
    }
  };

  const confirmOrder = async () => {
    const nextErrors = {};
    if (!address.trim()) nextErrors.address = 'Informe o endereço de entrega.';
    if (!payment) nextErrors.payment = 'Selecione o método de pagamento.';
    if (!items.length) nextErrors.cart = 'Seu carrinho está vazio.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setConfirming(true);
    const order = createOrder({ items, total, address, payment });
    const notification = await scheduleOrderNotification(order.id);
    clearCart();
    setConfirmation({ order, notification });
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    setConfirming(false);
  };

  const finish = () => {
    setConfirmation(null);
    navigation.navigate('MainTabs', { screen: 'Pedidos' });
  };

  return (
    <Screen edges={['right', 'bottom', 'left']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={[styles.heading, { color: colors.text }]}>Finalizar pedido</Text>
          <View style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumo</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={[styles.summaryItem, { color: colors.muted }]}>{item.quantity}x {item.name}</Text>
                <Text style={[styles.summaryPrice, { color: colors.text }]}>{formatCurrency(item.price * item.quantity)}</Text>
              </View>
            ))}
            {!items.length ? <Text style={[styles.errorText, { color: colors.error }]}>Seu carrinho está vazio.</Text> : null}
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
              <Text style={[styles.total, { color: colors.primary }]}>{formatCurrency(total)}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, styles.formTitle, { color: colors.text }]}>Endereço de entrega</Text>
          <View style={styles.cepRow}>
            <AppInput
              testID="cep-input"
              label="CEP"
              value={cep}
              onChangeText={(value) => setCep(formatCep(value))}
              keyboardType="number-pad"
              placeholder="00000-000"
              error={errors.cep}
              style={styles.cepInput}
            />
            <Pressable
              testID="cep-search"
              accessibilityRole="button"
              accessibilityLabel="Buscar CEP"
              disabled={loadingCep || onlyDigits(cep).length !== 8}
              onPress={searchCep}
              style={[styles.cepButton, { backgroundColor: colors.secondary }, (loadingCep || onlyDigits(cep).length !== 8) && styles.disabled]}
            >
              {loadingCep ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="search" size={22} color="#FFFFFF" />}
            </Pressable>
          </View>
          <AppInput
            testID="address-input"
            label="Endereço completo *"
            value={address}
            onChangeText={(value) => {
              setAddress(value);
              setErrors((current) => ({ ...current, address: undefined }));
            }}
            placeholder="Rua, número, complemento, bairro e cidade"
            multiline
            error={errors.address}
          />

          <Text style={[styles.sectionTitle, styles.formTitle, { color: colors.text }]}>Pagamento *</Text>
          <View style={styles.paymentRow}>
            {paymentOptions.map((option) => {
              const selected = option.id === payment;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  key={option.id}
                  onPress={() => {
                    setPayment(option.id);
                    setErrors((current) => ({ ...current, payment: undefined }));
                  }}
                  style={[
                    styles.payment,
                    {
                      backgroundColor: selected ? colors.surfaceAlt : colors.surface,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Ionicons name={option.icon} size={24} color={selected ? colors.primary : colors.muted} />
                  <Text style={[styles.paymentLabel, { color: selected ? colors.primary : colors.text }]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
          {errors.payment ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.payment}</Text> : null}
          <AppButton
            testID="confirm-order-button"
            title="Confirmar pedido"
            loading={confirming}
            onPress={confirmOrder}
            style={styles.confirm}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={Boolean(confirmation)} animationType="fade" onRequestClose={finish}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modal, { backgroundColor: colors.surface, transform: [{ scale }] }]}>
            <View style={[styles.successIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="checkmark" size={48} color="#FFFFFF" />
            </View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Pedido confirmado!</Text>
            <Text style={[styles.modalText, { color: colors.muted }]}>
              Pedido #{confirmation?.order.id} recebido e encaminhado para preparo.
            </Text>
            <View style={[styles.notificationInfo, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
              <Text style={[styles.notificationText, { color: colors.text }]}>
                {confirmation?.notification.delivered
                  ? 'Notificação local enviada.'
                  : confirmation?.notification.reason}
              </Text>
            </View>
            <AppButton title="Acompanhar pedido" onPress={finish} style={styles.modalButton} />
          </Animated.View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 20, paddingBottom: 38 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  summary: { borderWidth: 1, borderRadius: 12, padding: 17 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 9 },
  summaryItem: { flex: 1, fontSize: 13 },
  summaryPrice: { fontSize: 13, fontWeight: '800' },
  line: { height: 1, marginVertical: 13 },
  totalLabel: { fontSize: 17, fontWeight: '700' },
  total: { fontSize: 20, fontWeight: '700' },
  formTitle: { marginTop: 24, marginBottom: 12 },
  cepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginBottom: 13 },
  cepInput: { flex: 1 },
  cepButton: { width: 54, height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  disabled: { opacity: 0.45 },
  paymentRow: { flexDirection: 'row', gap: 8 },
  payment: { flex: 1, minHeight: 78, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  paymentLabel: { fontSize: 12, fontWeight: '800', marginTop: 6 },
  errorText: { fontSize: 12, marginTop: 7 },
  confirm: { marginTop: 25 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.62)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { width: '100%', maxWidth: 430, borderRadius: 14, padding: 24, alignItems: 'center' },
  successIcon: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  modalTitle: { fontSize: 24, fontWeight: '900', marginTop: 18 },
  modalText: { fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 7 },
  notificationInfo: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 12, borderRadius: 14, marginTop: 17 },
  notificationText: { flex: 1, fontSize: 12, lineHeight: 17 },
  modalButton: { width: '100%', marginTop: 18 },
});
