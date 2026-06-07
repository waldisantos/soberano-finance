import { useEffect, useState } from "react";
import {
  DEFAULT_ACCOUNTS,
  DEFAULT_ASSET_TYPES,
  DEFAULT_CATEGORIES,
  DEFAULT_GOALS,
} from "./data/defaults";

import { loadData, saveData } from "./services/storage";

import PatrimonioPage from "./components/Patrimonio";
import { MOCK_PATRIMONIO } from "./data/mockPatrimonio";
import type { Patrimonio } from "./types/patrimonio";
import PatrimonioChart from "./components/PatrimonioChart";
import ImportarCSV from "./components/ImportarCSV";
import Transacoes from "./components/Transacoes";
import {
  carregarTransacoes,
} from "./services/transacoesStorage";
import TopGastos from "./components/TopGastos";
import {
  categorizar,
  movimentacaoInterna,
} from "./services/categorizador";
import PlanejamentoFinanceiro from "./components/PlanejamentoFinanceiro";
import MetaPatrimonial from "./components/MetaPatrimonial";
import { DashboardLayout, SummaryCard, TransactionTable, UploadCSV } from './components/DashboardComponents';

function App() {
  return (
    <DashboardLayout>
      <UploadCSV />
      <SummaryCard data={{ balance: 5000, monthlyExpenses: 1200, projection: 1260, savings: 800 }} />
      <TransactionTable />
    </DashboardLayout>
  );
}


export default function App() {
  const [page, setPage] = useState("dashboard");

  const [accounts] = useState(() =>
    loadData("accounts", DEFAULT_ACCOUNTS)
  );

  const [categories] = useState(() =>
    loadData("categories", DEFAULT_CATEGORIES)
  );

  const [assetTypes] = useState(() =>
    loadData("assetTypes", DEFAULT_ASSET_TYPES)
  );

  const [goals] = useState(() =>
    loadData("goals", DEFAULT_GOALS)
  );

  const [patrimonio, setPatrimonio] =
    useState<Patrimonio[]>(() =>
      loadData("patrimonio", MOCK_PATRIMONIO)
    );

  function adicionarPatrimonio(
    item: Patrimonio
  ) {
    setPatrimonio((prev) => [
      ...prev,
      item,
    ]);
  }

  function excluirPatrimonio(
    id: number
  ) {
    setPatrimonio((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  useEffect(() => {
    saveData(
      "patrimonio",
      patrimonio
    );
  }, [patrimonio]);
const transacoes =
  carregarTransacoes();

const receitas = transacoes
  .filter(
    (t) =>
      t.tipo === "receita" &&
      !movimentacaoInterna(
        t.descricao
      )
  )
  .reduce(
    (acc, t) => acc + t.valor,
    0
  );

const despesas = transacoes
  .filter(
    (t) =>
      t.tipo === "despesa" &&
      !movimentacaoInterna(
        t.descricao
      )
  )
  .reduce(
    (acc, t) => acc + t.valor,
    0
  );

const saldo =
  receitas - despesas;

const taxaPoupanca =
  receitas > 0
    ? (
        (saldo / receitas) *
        100
      ).toFixed(1)
    : "0";
  const patrimonioTotal =
    patrimonio.reduce(
      (acc, item) =>
        acc + item.valor,
      0
    );

  const liquidez = patrimonio
    .filter(
      (item) =>
        item.tipo ===
          "Conta Bancária" ||
        item.tipo === "Ações" ||
        item.tipo === "FII"
    )
    .reduce(
      (acc, item) =>
        acc + item.valor,
      0
    );

  const totalImoveis =
    patrimonio
      .filter(
        (item) =>
          item.tipo ===
          "Imóvel"
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

  const totalVeiculos =
    patrimonio
      .filter(
        (item) =>
          item.tipo ===
          "Veículo"
      )
      .reduce(
        (acc, item) =>
          acc + item.valor,
        0
      );

 const totalInvestimentos = patrimonio
  .filter(
    (item) =>
      item.tipo === "Ações" ||
      item.tipo === "FII"
  )
  .reduce(
    (acc, item) =>
      acc + item.valor,
    0
  );

const chartData = Object.entries(
  patrimonio.reduce(
    (acc, item) => {
      acc[item.tipo] =
        (acc[item.tipo] || 0) +
        item.valor;

      return acc;
    },
    {} as Record<string, number>
  )
).map(([name, value]) => ({
  name,
  value,
}));
  const card = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  };

  const menuButton = {
    border: "none",
    background: "#0B57D0",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "24px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0B57D0",
          marginBottom: "24px",
        }}
      >
        Soberano Finance
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent:
            "center",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <button
          style={menuButton}
          onClick={() =>
            setPage(
              "dashboard"
            )
          }
        >
          Dashboard
        </button>
<button
  style={menuButton}
  onClick={() =>
    setPage("planejamento")
  }
>
  Planejamento
</button>
<button
  style={menuButton}
  onClick={() =>
    setPage("metaPatrimonial")
  }
>
  Meta Patrimonial
</button>
        <button
          style={menuButton}
          onClick={() =>
            setPage(
              "patrimonio"
            )
          }
        >
          Patrimônio
        </button>

       <button
  style={menuButton}
  onClick={() =>
    setPage("transacoes")
  }
>
  Transações
</button>

<button
  style={menuButton}
  onClick={() =>
    setPage("metas")
  }
>
  Metas
</button>
        <button
          style={menuButton}
          onClick={() =>
            setPage("config")
          }
        >
          Configurações
        </button>
<button
  style={menuButton}
  onClick={() => setPage("importacao")}
>
  Importação
</button>
      </div>
      {page ===
        "dashboard" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
              marginBottom:
                "20px",
            }}
          >
            <div style={card}>
              <h3>
                💰 Patrimônio
                Total
              </h3>
              <h2>
                {patrimonioTotal.toLocaleString(
                  "pt-BR",
                  {
                    style:
                      "currency",
                    currency:
                      "BRL",
                  }
                )}
              </h2>
            </div>

           <div style={card}>
  <h3>
    💵 Receitas
  </h3>

  <h2>
    {receitas.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}
  </h2>
</div>

<div style={card}>
  <h3>
    💸 Despesas
  </h3>

  <h2>
    {despesas.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}
  </h2>
</div>

<div style={card}>
  <h3>
    📈 Saldo
  </h3>

  <h2>
    {saldo.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}
  </h2>
</div>

<div style={card}>
  <h3>
    🎯 Taxa de Poupança
  </h3>

  <h2>
    {taxaPoupanca}%
  </h2>
</div>
          </div>

    <div style={card}>
  <h2>
    Resumo Patrimonial
  </h2>
  <p>
    Patrimônio consolidado e
    atualizado automaticamente.
  </p>
</div>

<PatrimonioChart
  data={chartData}
/>
<TopGastos />       
 </>
      )}
{page === "planejamento" && (
  <PlanejamentoFinanceiro />
)}
{page === "metaPatrimonial" && (
  <MetaPatrimonial />
)}
      {page === "patrimonio" && (
        <PatrimonioPage
          patrimonio={
            patrimonio
          }
          onAdd={
            adicionarPatrimonio
          }
          onDelete={
            excluirPatrimonio
          }
        />
      )}

      {page === "metas" && (
        <div style={card}>
          <h2>Metas</h2>

          {goals.map(
            (goal: any) => {
              const percent =
                goal.target >
                0
                  ? (
                      (goal.current /
                        goal.target) *
                      100
                    ).toFixed(
                      1
                    )
                  : 0;

              return (
                <div
                  key={
                    goal.id
                  }
                  style={{
                    marginBottom:
                      "20px",
                  }}
                >
                  <strong>
                    {
                      goal.name
                    }
                  </strong>

                  <p>
                    R${" "}
                    {goal.current.toLocaleString(
                      "pt-BR"
                    )}{" "}
                    / R${" "}
                    {goal.target.toLocaleString(
                      "pt-BR"
                    )}
                  </p>

                  <p>
                    {
                      percent
                    }
                    %
                    concluído
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
{page === "transacoes" && (
  <Transacoes />
)}

{page === "importacao" && (
  <ImportarCSV />
)}

{page ===
  "config" && (        <div style={card}>
          <h2>
            Configurações
          </h2>

          <h3>Contas</h3>
          <ul>
            {accounts.map(
              (
                item: string
              ) => (
                <li
                  key={
                    item
                  }
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <hr />

          <h3>
            Categorias
          </h3>
          <ul>
            {categories.map(
              (
                item: string
              ) => (
                <li
                  key={
                    item
                  }
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <hr />

          <h3>
            Tipos de
            Patrimônio
          </h3>
          <ul>
            {assetTypes.map(
              (
                item: string
              ) => (
                <li
                  key={
                    item
                  }
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}