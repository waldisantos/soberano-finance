import type { Transacao } from "../types/transacao";

const KEY = "transacoes";

export function carregarTransacoes(): Transacao[] {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function salvarTransacoes(
  transacoes: Transacao[]
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(transacoes)
  );
}