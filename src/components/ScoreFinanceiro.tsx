interface Props {
  essenciais: number;
  naoEssenciais: number;
  investimentoIntelectual: number;
  investimentos: number;
}

export default function ScoreFinanceiro({
  essenciais,
  naoEssenciais,
  investimentoIntelectual,
  investimentos,
}: Props) {
  let score = 0;

  if (essenciais <= 40) score += 25;

  if (naoEssenciais <= 15) score += 25;

  if (investimentoIntelectual >= 8)
    score += 25;

  if (investimentos >= 37)
    score += 25;

  let mensagem = "";

  if (score >= 90)
    mensagem = "Excelente";

  else if (score >= 70)
    mensagem = "Boa";

  else if (score >= 50)
    mensagem = "Atenção";

  else
    mensagem = "Crítica";

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <h2>
        🏆 Score Financeiro
      </h2>

      <h1
        style={{
          color: "#0B57D0",
          fontSize: "48px",
        }}
      >
        {score}/100
      </h1>

      <h3>
        Situação:
        {" "}
        {mensagem}
      </h3>
    </div>
  );
}
