import { useState } from "react";

interface Props {
  naoEssenciais: number;
}

export default function SimuladorFinanceiro({
  naoEssenciais,
}: Props) {
  const [economia, setEconomia] =
    useState(0);

  const novoValor =
    naoEssenciais - economia;

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        marginBottom: "20px",
      }}
    >
      <h2>
        Simulador Financeiro
      </h2>

      <p>
        Quanto pretende reduzir
        dos gastos não essenciais?
      </p>

      <input
        type="number"
        value={economia}
        onChange={(e) =>
          setEconomia(
            Number(
              e.target.value
            )
          )
        }
      />

      <p>
        Novo gasto:
        {" "}
        {novoValor.toLocaleString(
          "pt-BR",
          {
            style:
              "currency",
            currency:
              "BRL",
          }
        )}
      </p>

      <p>
        Valor liberado para
        investir:
        {" "}
        {economia.toLocaleString(
          "pt-BR",
          {
            style:
              "currency",
            currency:
              "BRL",
          }
        )}
      </p>
    </div>
  );
}