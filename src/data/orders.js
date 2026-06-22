export const initialOrders = [
  {
    id: '1042',
    date: '21/06/2026, 18:40',
    total: 59.3,
    status: 'preparing',
    items: ['1x Burger Carioca', '1x Suco de Laranja', '1x Brownie'],
  },
  {
    id: '1031',
    date: '18/06/2026, 12:15',
    total: 39.9,
    status: 'delivered',
    items: ['1x Executivo da Casa'],
  },
];

export const statusSteps = [
  { key: 'received', label: 'Recebido' },
  { key: 'preparing', label: 'Preparando' },
  { key: 'delivery', label: 'Em entrega' },
  { key: 'delivered', label: 'Entregue' },
];
