interface Props {
  rendaLiquida: number;

  essenciais: number;
  naoEssenciais: number;
  investimentoIntelectual: number;
  investimentos: number;
}

export default function InsightsFinanceiros({
  rendaLiquida,
  essenciais,
  naoEssenciais,
  investimentoIntelectual,
  investimentos,
}: Props) {
  const insights: string[] = [];

  const metaEssenciais =
    rendaLiquida * 0.4;

  const metaNaoEssenciais =
    rendaLiquida * 0.15;

  const metaIntelectual =
    rendaLiquida * 0.08;

  const metaInvestimentos =
    rendaLiquida * 0.37;

  if (
    essenciais <= metaEssenciais
  ) {
    insights.push(
      "✅ Essenciais dentro da meta"
    );
  } else {
    insights.push(
      `⚠ Essenciais acima da meta em ${(
        essenciais -
        metaEssenciais
      ).toLocaleString(
        "pt-BR",
        {
          style:
            "currency",
          currency:
            "BRL",
        }
      )}`
    );
  }

  if (
    naoEssenciais <=
    metaNaoEssenciais
  ) {
    insights.push(
      "✅ Não Essenciais dentro da meta"
    );
  } else {
    insights.push(
      `⚠ Não Essenciais acima da meta em ${(
        naoEssenciais -
        metaNaoEssenciais
      ).toLocaleString(
        "pt-BR",
        {
          style:
            "currency",
          currency:
            "BRL",
        }
      )}`
    );
  }

  if (
    investimentoIntelectual >=
    metaIntelectual
  ) {
    insights.push(
      "✅ Investimento Intelectual dentro da meta"
    );
  } else {
    insights.push(
      `⚠ Investimento Intelectual abaixo da meta em ${(
        metaIntelectual -
        investimentoIntelectual
      ).toLocaleString(
        "pt-BR",
        {
          style:
            "currency",
          currency:
            "BRL",
        }
      )}`
    );
  }

  if (
    investimentos >=
    metaInvestimentos
  ) {
    insights.push(
      "✅ Investimentos dentro da meta"
    );
  } else {
    insights.push(
      `⚠ Investimentos abaixo da meta em ${(
        metaInvestimentos -
        investimentos
      ).toLocaleString(
        "pt-BR",
        {
          style:
            "currency",
          currency:
            "BRL",
        }
      )}`
    );
  }

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
        Insights Financeiros
      </h2>

      {insights.map(
        (
          insight,
          index
        ) => (
          <p key={index}>
            {insight}
          </p>
        )
      )}
    </div>
  );
}