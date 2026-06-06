export function categorizar(
  descricao: string
) {
  const texto =
    descricao.toUpperCase();

  if (
    texto.includes("UBER") ||
    texto.includes("POSTO") ||
    texto.includes("FARMACIA") ||
    texto.includes("DROGARIA")
  ) {
    return "Essenciais";
  }

  if (
    texto.includes("IFOOD") ||
    texto.includes("NETFLIX") ||
    texto.includes("SPOTIFY") ||
    texto.includes("YOUTUBE")
  ) {
    return "Não Essenciais";
  }

  if (
    texto.includes("UDEMY") ||
    texto.includes("ALURA") ||
    texto.includes("HOTMART") ||
    texto.includes("LIVRO")
  ) {
    return "Investimento Intelectual";
  }

  if (
    texto.includes("CLEAR") ||
    texto.includes("XP") ||
    texto.includes("INTER") ||
    texto.includes("RICO")
  ) {
    return "Investimentos";
  }

  return "Outros";
}
export function movimentacaoInterna(
  descricao: string
) {
  const texto =
    descricao.toUpperCase();

  return (
    texto.includes("PAGAMENTO DE FATURA") ||
    texto.includes("TRANSFERÊNCIA") ||
    texto.includes("TRANSFERENCIA") ||
    texto.includes("PIX") ||
    texto.includes("RESGATE") ||
    texto.includes("APLICAÇÃO") ||
    texto.includes("APLICACAO")
  );
}