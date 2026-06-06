import type { Patrimonio } from "../types/patrimonio";
import PatrimonioForm from "./PatrimonioForm";

interface Props {
  patrimonio: Patrimonio[];
  onAdd: (item: Patrimonio) => void;
  onDelete: (id: number) => void;
}

export default function PatrimonioPage({
  patrimonio,
  onAdd,
  onDelete,
}: Props) {
  const total = patrimonio.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  const liquidez = patrimonio
    .filter(
      (item) =>
        item.tipo === "Conta Bancária" ||
        item.tipo === "Ações" ||
        item.tipo === "FII"
    )
    .reduce((acc, item) => acc + item.valor, 0);

  return (
    <div>
      <PatrimonioForm onAdd={onAdd} />

      <div
        style={{
          background:
            "linear-gradient(135deg,#0B57D0,#003B95)",
          color: "#fff",
          padding: "24px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>Patrimônio Total</h3>

        <h1>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h1>

        <hr
          style={{
            borderColor: "rgba(255,255,255,.2)",
          }}
        />

        <p>
          Liquidez Imediata:
          {" "}
          {liquidez.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {patrimonio.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <strong
              style={{
                fontSize: "18px",
              }}
            >
              {item.descricao}
            </strong>

            <p>{item.tipo}</p>

            <p>{item.instituicao}</p>

            <h3
              style={{
                color: "#0B57D0",
              }}
            >
              {item.valor.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </h3>

            <button
              onClick={() =>
                onDelete(item.id)
              }
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}