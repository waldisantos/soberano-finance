import { useEffect, useState } from "react";
import type { Transacao } from "../types/transacao";
import {
  carregarTransacoes,
} from "../services/transacoesStorage";

export default function Transacoes() {
  const [transacoes, setTransacoes] =
    useState<Transacao[]>([]);

  useEffect(() => {
    setTransacoes(
      carregarTransacoes()
    );
  }, []);

  return (
    <div>
      <h2>Transações</h2>

      <p>
        Total de registros:
        {" "}
        {transacoes.length}
      </p>

      {transacoes.map(
        (item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <strong>
              {item.descricao}
            </strong>

            <p>
              {item.data}
            </p>

            <p>
              {item.categoria}
            </p>

           <h4>
  {Number(
    item.valor || 0
  ).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}
</h4>
          </div>
        )
      )}
    </div>
  );
}