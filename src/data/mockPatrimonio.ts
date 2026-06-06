import type { Patrimonio } from "../types/patrimonio";

export const MOCK_PATRIMONIO: Patrimonio[] = [
  {
    id: 1,
    tipo: "Imóvel",
    descricao: "Lote",
    instituicao: "Particular",
    valor: 180000,
    dataAtualizacao: "2026-06-05",
    observacoes: "",
  },

  {
    id: 2,
    tipo: "Veículo",
    descricao: "HB20 Sedan Comfort Plus 2015",
    instituicao: "Particular",
    valor: 43000,
    dataAtualizacao: "2026-06-05",
    observacoes: "",
  },

  {
    id: 3,
    tipo: "Ações",
    descricao: "Carteira",
    instituicao: "Clear",
    valor: 22000,
    dataAtualizacao: "2026-06-05",
    observacoes: "",
  },

  {
    id: 4,
    tipo: "Conta Bancária",
    descricao: "Saldo",
    instituicao: "Nubank",
    valor: 65000,
    dataAtualizacao: "2026-06-05",
    observacoes: "",
  },
];