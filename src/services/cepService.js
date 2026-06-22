import { onlyDigits } from '../utils/format';

export async function lookupCep(cep) {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) throw new Error('Informe um CEP com 8 dígitos.');

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!response.ok) throw new Error('Não foi possível consultar o CEP.');

  const data = await response.json();
  if (data.erro) throw new Error('CEP não encontrado.');

  return {
    cep: data.cep,
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
    formatted: [data.logradouro, data.bairro, `${data.localidade} - ${data.uf}`]
      .filter(Boolean)
      .join(', '),
  };
}
