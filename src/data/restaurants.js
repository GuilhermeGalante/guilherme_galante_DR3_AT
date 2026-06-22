const menuImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=900',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900',
];

const locations = [
  ['Bistrô Carioca', 'Av. Rio Branco, 156', -22.9075, -43.1762],
  ['Sabor do Centro', 'Rua do Ouvidor, 60', -22.9037, -43.1776],
  ['Estação Gourmet', 'Praça Floriano, 7', -22.9108, -43.1757],
  ['Casa da Lapa', 'Rua do Lavradio, 120', -22.9131, -43.1811],
  ['Cais Natural', 'Praça Mauá, 1', -22.8968, -43.1816],
  ['Rio Burger', 'Rua da Carioca, 45', -22.9084, -43.1818],
  ['Tempero Imperial', 'Praça Tiradentes, 20', -22.9068, -43.1828],
  ['Cantina República', 'Av. Presidente Vargas, 509', -22.9025, -43.1813],
  ['Doce Confeitaria', 'Rua Sete de Setembro, 88', -22.9056, -43.1784],
  ['Mercado 360', 'Rua Primeiro de Março, 66', -22.9021, -43.1745],
];

export const restaurants = locations.map(([name, address, latitude, longitude], index) => ({
  id: `restaurant-${index + 1}`,
  name,
  address: `${address}, Centro, Rio de Janeiro - RJ`,
  latitude,
  longitude,
  description: 'Culinária brasileira contemporânea, ingredientes frescos e entrega rápida no Centro.',
  image: `https://images.unsplash.com/photo-${[
    '1517248135467-4c7edcad34c4',
    '1552566626-52f8b828add9',
    '1555396273-367ea4eb4db5',
    '1515003197210-e0cd71810b5f',
    '1578474846511-04ba529f0b88',
    '1559339352-11d035aa65de',
    '1569058242253-92a9c755a0ec',
    '1544148103-0773bf10d330',
    '1551632436-cbf8dd35adfa',
    '1516211697506-8360dbcfe9a4',
  ][index]}?w=900`,
  rating: (4.3 + (index % 6) / 10).toFixed(1),
  openingHours: '11h às 23h',
  menuItem: {
    name: ['Burger Carioca', 'Executivo Brasileiro', 'Penne Artesanal'][index % 3],
    price: [34.9, 38.5, 36.0][index % 3],
    image: menuImages[index % 3],
  },
}));
