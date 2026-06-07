import { CONFIGURACAO_PADRAO } from "../data/ConfiguracaoPadrao";

const KEY =
  "configuracaoFinanceira";

export function carregarConfiguracao() {
  const data =
    localStorage.getItem(KEY);

  if (!data)
    return CONFIGURACAO_PADRAO;

  return JSON.parse(data);
}

export function salvarConfiguracao(
  configuracao: any
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(configuracao)
  );
}