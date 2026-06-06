import { useState } from "react";

interface Props {
  onAdd: (item: any) => void;
}

export default function PatrimonioForm({
  onAdd,
}: Props) {
  const [tipo, setTipo] =
    useState("Conta Bancária");

  const [descricao, setDescricao] =
    useState("");

  const [instituicao, setInstituicao] =
    useState("");

  const [valor, setValor] =
    useState("");

  function salvar() {
    if (!descricao || !valor) return;

    onAdd({
      id: Date.now(),
      tipo,
      descricao,
      instituicao,
      valor: Number(valor),
      dataAtualizacao:
        new Date().toISOString(),
      observacoes: "",
    });

    setDescricao("");
    setInstituicao("");
    setValor("");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "20px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          color: "#0B57D0",
          marginBottom: "20px",
        }}
      >
        Novo Patrimônio
      </h2>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        <select
          style={inputStyle}
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value)
          }
        >
          <option>
            Conta Bancária
          </option>

          <option>Ações</option>

          <option>FII</option>

          <option>Imóvel</option>

          <option>Veículo</option>

          <option>Empresa</option>

          <option>Outros</option>
        </select>

        <input
          style={inputStyle}
          placeholder="Descrição"
          value={descricao}
          onChange={(e) =>
            setDescricao(
              e.target.value
            )
          }
        />

        <input
          style={inputStyle}
          placeholder="Instituição"
          value={instituicao}
          onChange={(e) =>
            setInstituicao(
              e.target.value
            )
          }
        />

        <input
          style={inputStyle}
          placeholder="Valor (R$)"
          type="number"
          value={valor}
          onChange={(e) =>
            setValor(
              e.target.value
            )
          }
        />

        <button
          onClick={salvar}
          style={{
            background:
              "linear-gradient(135deg,#0B57D0,#003B95)",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Salvar Patrimônio
        </button>
      </div>
    </div>
  );
}