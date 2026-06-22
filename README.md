# InfnetFood

Aplicativo acadêmico de pedidos e delivery desenvolvido em React Native com Expo.

## Funcionalidades

- Login com validação e fluxo público/autenticado;
- categorias e produtos com `FlatList`;
- detalhes de produto e seletor de quantidade;
- carrinho global com edição e total;
- checkout com endereço, pagamento e consulta ViaCEP;
- pedidos com indicador de progresso;
- mapa simulado com 10 restaurantes do Centro do Rio de Janeiro;
- detalhes de restaurante e item de cardápio;
- perfil de usuário;
- tema claro e escuro;
- feedback animado;
- notificações locais em dispositivo compatível;
- layout responsivo para Android, iOS e web.

## Credenciais para avaliação

```text
E-mail: admin@admin.com
Senha: admin123
```

Outros e-mails com formato válido e senha não vazia também utilizam o fluxo mockado.

## Requisitos

- Node.js 20 ou superior;
- npm;
- Expo Go no dispositivo, Android Studio, Xcode ou navegador moderno.

## Instalação e execução

```bash
npm install
npm start
```

Atalhos:

```bash
npm run web
npm run android
npm run ios
```

Validação do projeto:

```bash
npm run check
npm run export:web
```

## Fluxo principal de teste

1. Entre com as credenciais de avaliação.
2. Abra uma categoria e selecione um produto.
3. Altere a quantidade e adicione ao carrinho.
4. Abra o carrinho e prossiga para o checkout.
5. Consulte o CEP exemplo `20040-020` ou informe o endereço manualmente.
6. Selecione Pix, cartão ou dinheiro.
7. Confirme e acompanhe o pedido na tela Pedidos.
8. Abra Perfil → Configurações para alternar o tema.
9. Acesse Restaurantes para visualizar os 10 pontos no mapa simulado.

## API externa

O checkout consome a API pública [ViaCEP](https://viacep.com.br/) usando `fetch`. A aplicação:

- valida o CEP;
- exibe carregamento;
- preenche logradouro, bairro, cidade e UF;
- trata CEP inexistente e falhas de rede;
- permite edição manual do endereço.

## Expo Snack

O código foi estruturado com dependências compatíveis com Expo. ACesso:

> https://snack.expo.dev/@ggalante/dac790

## Notificações

Em Android/iOS, o app solicita permissão e envia uma notificação local após confirmar o pedido. Na web, o modal animado de confirmação informa explicitamente que substitui a notificação local.

Dependendo da versão do Expo Go, notificações podem exigir um development build. Essa limitação não interrompe o fluxo do pedido.

## Mapa

Para evitar chave privada e manter compatibilidade com Snack, foi adotado o fallback permitido no enunciado: mapa visual simulado com 10 marcadores, lista de restaurantes e abertura da coordenada real pelo aplicativo de mapas via `Linking`.

## Estrutura

```text
src/
├── components/
├── contexts/
├── data/
├── navigation/
├── screens/
├── services/
├── styles/
└── utils/
```

## Documentação

- [Documentação final em PDF](./docs/InfnetFood-Documentacao-Final.pdf)
- Evidências: `docs/evidencias/`
