export interface Transacao {
  id: number;

  data: string;

  descricao: string;

  valor: number;

  tipo:
    | "receita"
    | "despesa";

  categoria: string;

  subcategoria?: string;

  origem:
    | "conta"
    | "cartao";
}