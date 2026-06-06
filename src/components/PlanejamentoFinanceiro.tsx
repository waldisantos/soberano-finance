import { PLANEJAMENTO_PADRAO } from "../data/planejamentoPadrao";
import { carregarTransacoes } from "../services/transacoesStorage";
import { carregarConfiguracao } from "../services/configuracaoStorage";
import ScoreFinanceiro from "./ScoreFinanceiro";
import InsightsFinanceiros from "./InsightsFinanceiros";
import SimuladorFinanceiro from "./SimuladorFinanceiro";

export default function PlanejamentoFinanceiro() {
  const transacoes =
    carregarTransacoes();

  const configuracao =
    carregarConfiguracao();

  const rendaLiquida =
    configuracao.rendaLiquida || 0;

  const despesas = transacoes.filter(
    (t) => t.tipo === "despesa"
  );

  const essenciais = despesas
    .filter(
      (t) =>
        t.categoria ===
        "Essenciais"
    )
    .reduce(
      (acc, t) => acc + t.valor,
      0
    );

  const naoEssenciais = despesas
    .filter(
      (t) =>
        t.categoria ===
        "Não Essenciais"
    )
    .reduce(
      (acc, t) => acc + t.valor,
      0
    );

  const investimentoIntelectual =
    despesas
      .filter(
        (t) =>
          t.categoria ===
          "Investimento Intelectual"
      )
      .reduce(
        (acc, t) =>
          acc + t.valor,
        0
      );

  const investimentos = despesas
    .filter(
      (t) =>
        t.categoria ===
        "Investimentos"
    )
    .reduce(
      (acc, t) => acc + t.valor,
      0
    );

  const percentualEssenciais =
    rendaLiquida > 0
      ? (essenciais /
          rendaLiquida) *
        100
      : 0;

  const percentualNaoEssenciais =
    rendaLiquida > 0
      ? (naoEssenciais /
          rendaLiquida) *
        100
      : 0;

  const percentualInvestimentoIntelectual =
    rendaLiquida > 0
      ? (investimentoIntelectual /
          rendaLiquida) *
        100
      : 0;

  const percentualInvestimentos =
    rendaLiquida > 0
      ? (investimentos /
          rendaLiquida) *
        100
      : 0;

  const card = (
    titulo: string,
    valor: number,
    meta: number
  ) => {
    const percentual =
      rendaLiquida > 0
        ? (
            (valor /
              rendaLiquida) *
            100
          ).toFixed(1)
        : "0";

    const dentro =
      titulo ===
        "Investimento Intelectual" ||
      titulo ===
        "Investimentos"
        ? Number(percentual) >=
          meta
        : Number(percentual) <=
          meta;

    const metaEmReais =
      (rendaLiquida * meta) /
      100;

    const diferenca =
      metaEmReais - valor;

    return (
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "12px",
        }}
      >
        <h3>{titulo}</h3>

        <p>Meta: {meta}%</p>

        <p>
          Valor Meta:{" "}
          {metaEmReais.toLocaleString(
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
          Realizado:{" "}
          {percentual}%
        </p>

        <strong>
          {valor.toLocaleString(
            "pt-BR",
            {
              style:
                "currency",
              currency:
                "BRL",
            }
          )}
        </strong>

        <p>
          Diferença:{" "}
          {diferenca.toLocaleString(
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
          {dentro
            ? "✅ Dentro da meta"
            : "⚠ Fora da meta"}
        </p>
      </div>
    );
  };

  return (
    <div>
      <ScoreFinanceiro
        essenciais={
          percentualEssenciais
        }
        naoEssenciais={
          percentualNaoEssenciais
        }
        investimentoIntelectual={
          percentualInvestimentoIntelectual
        }
        investimentos={
          percentualInvestimentos
        }
      />
<InsightsFinanceiros
  rendaLiquida={
    rendaLiquida
  }
  essenciais={
    essenciais
  }
  naoEssenciais={
    naoEssenciais
  }
  investimentoIntelectual={
    investimentoIntelectual
  }
  investimentos={
    investimentos
  }
/>
<SimuladorFinanceiro
  naoEssenciais={
    naoEssenciais
  }
/>
      <h2>
        Planejamento Financeiro
      </h2>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Renda Líquida
        </h3>

        <strong>
          {rendaLiquida.toLocaleString(
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

      {card(
        "Essenciais",
        essenciais,
        PLANEJAMENTO_PADRAO
          .essenciais
      )}

      {card(
        "Não Essenciais",
        naoEssenciais,
        PLANEJAMENTO_PADRAO
          .naoEssenciais
      )}

      {card(
        "Investimento Intelectual",
        investimentoIntelectual,
        PLANEJAMENTO_PADRAO
          .investimentoIntelectual
      )}

      {card(
        "Investimentos",
        investimentos,
        PLANEJAMENTO_PADRAO
          .investimentos
      )}
    </div>
  );
}