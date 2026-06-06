import {
  carregarMetaPatrimonial,
} from "../services/metaPatrimonialStorage";

export default function ProjecaoPatrimonial() {
  const meta =
    carregarMetaPatrimonial();

  let patrimonio =
    meta.patrimonioAtual;

  let meses = 0;

  const taxa =
    meta.rentabilidadeMensal /
    100;

  while (
    patrimonio <
      meta.patrimonioObjetivo &&
    meses < 1000
  ) {
    patrimonio =
      patrimonio *
        (1 + taxa) +
      meta.aporteMensal;

    meses++;
  }

  const anos = Math.floor(
    meses / 12
  );

  const mesesRestantes =
    meses % 12;

  const dataMeta =
    new Date();

  dataMeta.setMonth(
    dataMeta.getMonth() +
      meses
  );

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
        Projeção Patrimonial
      </h2>

      <p>
        Meta:
        {" "}
        {meta.patrimonioObjetivo.toLocaleString(
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
        Prazo estimado:
        {" "}
        {anos}
        {" "}
        anos e
        {" "}
        {mesesRestantes}
        {" "}
        meses
      </p>

      <p>
        Data prevista:
        {" "}
        {dataMeta.toLocaleDateString(
          "pt-BR",
          {
            month:
              "long",
            year:
              "numeric",
          }
        )}
      </p>

      <p>
        Patrimônio projetado:
        {" "}
        {patrimonio.toLocaleString(
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