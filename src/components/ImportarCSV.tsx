import Papa from "papaparse";
import type { Transacao } from "../types/transacao";
import {
  carregarTransacoes,
  salvarTransacoes,
} from "../services/transacoesStorage";
import { categorizar } from "../services/categorizador";

export default function ImportarCSV() {
  function importar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (resultado) => {
        const dados = resultado.data as any[];

        const transacoesExistentes =
          carregarTransacoes();

        const novasTransacoes: Transacao[] =
          dados.map(
            (item, index) => {
              const descricao =
                item.Descrição ||
                item.title ||
                "";

              const valor = Number(
                String(
                  item.Valor ??
                    item.amount ??
                    0
                ).replace(",", ".")
              );

              return {
                id:
                  Date.now() +
                  index,

                data:
                  item.Data ||
                  item.date ||
                  "",

                descricao,

                valor:
                  Math.abs(valor),

                tipo:
                  valor >= 0
                    ? "receita"
                    : "despesa",

categoria:
  categorizar(
    descricao
  ),

                origem:
                  item.title
                    ? "cartao"
                    : "conta",
              };
            }
          );

        const todas =
          [
            ...transacoesExistentes,
            ...novasTransacoes,
          ];

        salvarTransacoes(
          todas
        );

        alert(
          `${novasTransacoes.length} transações importadas`
        );

        console.log(
          todas
        );
      },
    });
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
      }}
    >
      <h2>
        Importar CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={importar}
      />
    </div>
  );
}