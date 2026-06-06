import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const menuStyle = {
    padding: "12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600,
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#0B57D0",
          marginBottom: "20px",
        }}
      >
        Soberano Finance
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button style={menuStyle} onClick={() => setPage("dashboard")}>
          Dashboard
        </button>

        <button style={menuStyle} onClick={() => setPage("transacoes")}>
          Transações
        </button>

        <button style={menuStyle} onClick={() => setPage("patrimonio")}>
          Patrimônio
        </button>

        <button style={menuStyle} onClick={() => setPage("metas")}>
          Metas
        </button>
      </div>

      {page === "dashboard" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "15px",
            }}
          >
            <div style={cardStyle}>
              <h3>Patrimônio Total</h3>
              <h2>R$ 0,00</h2>
            </div>

            <div style={cardStyle}>
              <h3>Receitas</h3>
              <h2>R$ 0,00</h2>
            </div>

            <div style={cardStyle}>
              <h3>Despesas</h3>
              <h2>R$ 0,00</h2>
            </div>

            <div style={cardStyle}>
              <h3>Saldo</h3>
              <h2>R$ 0,00</h2>
            </div>
          </div>
        </>
      )}

      {page === "transacoes" && (
        <div style={cardStyle}>
          <h2>Transações</h2>
          <p>Nenhuma transação cadastrada.</p>
        </div>
      )}

      {page === "patrimonio" && (
        <div style={cardStyle}>
          <h2>Patrimônio</h2>
          <p>Nenhum patrimônio cadastrado.</p>
        </div>
      )}

      {page === "metas" && (
        <div style={cardStyle}>
          <h2>Metas</h2>
          <p>Nenhuma meta cadastrada.</p>
        </div>
      )}
    </div>
  );
}