import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialOrders } from '../data/orders';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  const createOrder = ({ items, total, address, payment }) => {
    const order = {
      id: String(Date.now()).slice(-6),
      date: new Date().toLocaleString('pt-BR'),
      total,
      status: 'received',
      address,
      payment,
      items: items.map((item) => `${item.quantity}x ${item.name}`),
    };
    setOrders((current) => [order, ...current]);
    return order;
  };

  const value = useMemo(() => ({ orders, createOrder }), [orders]);
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export const useOrders = () => useContext(OrdersContext);
