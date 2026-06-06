import { useState } from "react";

import {
  carregarConfiguracao,
  salvarConfiguracao,
} from "../services/configuracaoStorage";

export default function ConfiguracaoFinanceira() {
  const config =
    carregarConfiguracao();

  const [
    rendaLiquida,
    setRendaLiquida,
  ] = useState(
    config.rendaLiquida
  );

  function salvar() {
    salvarConfiguracao({
      rendaLiquida:
        Number(
          rendaLiquida
        ),
    });

    alert(
      "Configuração salva"
    );
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
        Planejamento Financeiro
      </h2>

      <p>
        Renda líquida mensal
      </p>

      <input
        type="number"
        value={rendaLiquida}
        onChange={(e) =>
          setRendaLiquida(
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
    </div>
  );
}