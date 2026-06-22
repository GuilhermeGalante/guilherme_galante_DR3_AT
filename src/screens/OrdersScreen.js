import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { EmptyState } from '../components/EmptyState';
import { useOrders } from '../contexts/OrdersContext';
import { useAppTheme } from '../contexts/ThemeContext';
import { statusSteps } from '../data/orders';
import { formatCurrency } from '../utils/format';

export function OrdersScreen() {
  const { colors } = useAppTheme();
  const { orders } = useOrders();

  return (
    <Screen>
      <FlatList
        testID="orders-list"
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, !orders.length && styles.emptyContent]}
        ListHeaderComponent={<Text style={[styles.heading, { color: colors.text }]}>Meus pedidos</Text>}
        ListEmptyComponent={
          <EmptyState emoji="🧾" title="Nenhum pedido ainda" description="Seus pedidos aparecerão aqui." />
        }
        renderItem={({ item }) => {
          const activeIndex = statusSteps.findIndex((step) => step.key === item.status);
          return (
            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.header}>
                <View>
                  <Text style={[styles.id, { color: colors.text }]}>Pedido #{item.id}</Text>
                  <Text style={[styles.date, { color: colors.muted }]}>{item.date}</Text>
                </View>
                <Text style={[styles.total, { color: colors.primary }]}>{formatCurrency(item.total)}</Text>
              </View>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
              {item.items.map((description) => (
                <Text key={description} style={[styles.item, { color: colors.muted }]}>• {description}</Text>
              ))}
              <View style={styles.progress}>
                {statusSteps.map((step, index) => {
                  const completed = index <= activeIndex;
                  return (
                    <View key={step.key} style={styles.step}>
                      <View style={styles.dotRow}>
                        <View style={[styles.dot, { backgroundColor: completed ? colors.secondary : colors.border }]} />
                        {index < statusSteps.length - 1 ? (
                          <View style={[styles.track, { backgroundColor: index < activeIndex ? colors.secondary : colors.border }]} />
                        ) : null}
                      </View>
                      <Text style={[styles.stepLabel, { color: completed ? colors.text : colors.muted }]}>{step.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 35 },
  emptyContent: { flexGrow: 1 },
  heading: { fontSize: 27, fontWeight: '700', marginBottom: 17 },
  card: { borderWidth: 1, borderRadius: 12, padding: 17, marginBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  id: { fontSize: 17, fontWeight: '700' },
  date: { fontSize: 12, marginTop: 3 },
  total: { fontSize: 17, fontWeight: '700' },
  line: { height: 1, marginVertical: 13 },
  item: { fontSize: 13, lineHeight: 20 },
  progress: { flexDirection: 'row', marginTop: 18 },
  step: { flex: 1 },
  dotRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  track: { height: 3, flex: 1 },
  stepLabel: { fontSize: 9, fontWeight: '700', marginTop: 6, marginRight: 3 },
});
