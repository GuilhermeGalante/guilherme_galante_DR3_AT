import fs from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve('docs/evidencias');
await fs.mkdir(outputDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pages = await fetch('http://127.0.0.1:9222/json').then((response) => response.json());
const target =
  pages.find((page) => page.type === 'page' && page.url.includes('localhost:8081')) ||
  pages.find((page) => page.type === 'page' && page.url === 'about:blank') ||
  pages.find((page) => page.type === 'page');
if (!target) throw new Error('Nenhuma página disponível no navegador headless.');

const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 1;

socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
};

await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

const screenshot = async (name) => {
  const result = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  await fs.writeFile(path.join(outputDir, name), Buffer.from(result.data, 'base64'));
};

const clickTestId = async (testID) => {
  const clicked = await evaluate(`(() => {
    const element = document.querySelector('[data-testid="${testID}"]');
    if (!element) return false;
    element.click();
    return true;
  })()`);
  if (!clicked) throw new Error(`Elemento não encontrado: ${testID}`);
  await sleep(900);
};

const clickText = async (text) => {
  const clicked = await evaluate(`(() => {
    const nodes = [...document.querySelectorAll('*')];
    const label = ${JSON.stringify(text)};
    const textNode = nodes.find((node) => node.children.length === 0 && node.textContent.trim() === label);
    if (!textNode) return false;
    const action = textNode.closest('[role="button"], [role="tab"], a') || textNode.parentElement;
    action.click();
    return true;
  })()`);
  if (!clicked) throw new Error(`Texto clicável não encontrado: ${text}`);
  await sleep(900);
};

const setInput = async (testID, value) => {
  const changed = await evaluate(`(() => {
    const input = document.querySelector('[data-testid="${testID}"]');
    if (!input) return false;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, ${JSON.stringify(value)});
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  })()`);
  if (!changed) throw new Error(`Input não encontrado: ${testID}`);
  await sleep(300);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 430,
  height: 900,
  deviceScaleFactor: 1,
  mobile: true,
});
await evaluate(`location.href = 'http://localhost:8081'`);
await sleep(4500);

await screenshot('tarefa-01-ambiente.png');
await screenshot('tarefa-02-login.png');

await clickTestId('login-button');
await screenshot('tarefa-03-categorias.png');
await screenshot('tarefa-11-autenticacao.png');

await clickText('Lanches');
await clickText('Burger Carioca');
await screenshot('tarefa-04-produtos.png');
await clickText('Adicionar ao carrinho');
await screenshot('tarefa-12-feedback.png');

await clickText('Carrinho');
await screenshot('tarefa-05-carrinho.png');

await clickText('Perfil');
await screenshot('tarefa-06-perfil.png');
await clickText('Configurações');
await clickTestId('theme-switch');
await screenshot('tarefa-13-tema.png');
await evaluate('location.reload()');
await sleep(3500);
await clickTestId('login-button');

await clickText('Pedidos');
await screenshot('tarefa-07-pedidos.png');

await clickText('Restaurantes');
await screenshot('tarefa-08-mapa.png');
await clickText('1. Bistrô Carioca');
await screenshot('tarefa-09-restaurante.png');
await evaluate('location.reload()');
await sleep(3500);
await clickTestId('login-button');
await clickText('Lanches');
await clickText('Burger Carioca');
await clickText('Adicionar ao carrinho');
await clickText('Carrinho');
await clickText('Ir para checkout');
await screenshot('tarefa-10-checkout.png');
await setInput('cep-input', '20040020');
await clickText('Buscar CEP').catch(() => clickTestId('cep-search'));
await sleep(1800);
await screenshot('tarefa-15-viacep.png');

await clickText('Pix');
await clickTestId('confirm-order-button');
await sleep(1600);

await clickText('Acompanhar pedido');
await screenshot('tarefa-16-publicacao.png');

socket.close();
console.log('Evidências capturadas em docs/evidencias.');
