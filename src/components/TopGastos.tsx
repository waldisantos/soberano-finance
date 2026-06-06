import { carregarTransacoes } from "../services/transacoesStorage";
import {
  movimentacaoInterna,
} from "../services/categorizador";

export default function TopGastos() {
  const gastos = carregarTransacoes()
    .filter(
  (t) =>
    t.tipo === "despesa" &&
    !movimentacaoInterna(
      t.descricao
    )
)
    .sort(
      (a, b) =>
        b.valor - a.valor
    )
    .slice(0, 10);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "20px",
      }}
    >
      <h2>
        Top 10 Gastos
      </h2>

      {gastos.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            padding: "10px 0",
            borderBottom:
              "1px solid #eee",
          }}
        >
          <span>
            {item.descricao}
          </span>

          <strong>
            {item.valor.toLocaleString(
              "pt-BR",
              {
                style:
                  "currency",
                currency:
                  "BRL",
              }
            )}
          </strong>
        </div>
      ))}
    </div>
  );
}