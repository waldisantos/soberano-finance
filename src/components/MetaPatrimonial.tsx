import { useState } from "react";

import {
  carregarMetaPatrimonial,
  salvarMetaPatrimonial,
} from "../services/metaPatrimonialStorage";
import ProjecaoPatrimonial from "./ProjecaoPatrimonial";

export default function MetaPatrimonial() {
  const dados =
    carregarMetaPatrimonial();

  const [
    patrimonioAtual,
    setPatrimonioAtual,
  ] = useState(
    dados.patrimonioAtual
  );

  const [
    patrimonioObjetivo,
    setPatrimonioObjetivo,
  ] = useState(
    dados.patrimonioObjetivo
  );

  const [
    aporteMensal,
    setAporteMensal,
  ] = useState(
    dados.aporteMensal
  );

  const [
    rentabilidadeMensal,
    setRentabilidadeMensal,
  ] = useState(
    dados.rentabilidadeMensal
  );

  function salvar() {
    salvarMetaPatrimonial({
      patrimonioAtual,
      patrimonioObjetivo,
      aporteMensal,
      rentabilidadeMensal,
    });

    alert("Meta salva");
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
        Meta Patrimonial
      </h2>

      <p>
        Patrimônio Atual
      </p>

      <input
        type="number"
        value={patrimonioAtual}
        onChange={(e) =>
          setPatrimonioAtual(
            Number(
              e.target.value
            )
          )
        }
      />

      <p>
        Meta Patrimonial
      </p>

      <input
        type="number"
        value={
          patrimonioObjetivo
        }
        onChange={(e) =>
          setPatrimonioObjetivo(
            Number(
              e.target.value
            )
          )
        }
      />

      <p>
        Aporte Mensal
      </p>

      <input
        type="number"
        value={aporteMensal}
        onChange={(e) =>
          setAporteMensal(
            Number(
              e.target.value
            )
          )
        }
      />

      <p>
        Rentabilidade Mensal (%)
      </p>

      <input
        type="number"
        step="0.1"
        value={
          rentabilidadeMensal
        }
        onChange={(e) =>
          setRentabilidadeMensal(
            Number(
              e.target.value
            )
          )
        }
      />

      <br />
      <br />

      <button
        onClick={salvar}
      >
        Salvar
      </button>
<ProjecaoPatrimonial />16:36 06/06/202616:36 06/06/2026
    </div>
  );
}