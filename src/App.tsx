import { useEffect, useMemo, useState } from 'react';
import { loadData, saveData } from './services/storage';
import { carregarTransacoes } from './services/transacoesStorage';
import { movimentacaoInterna } from './services/categorizador';
import { DEFAULT_ACCOUNTS, DEFAULT_ASSET_TYPES, DEFAULT_CATEGORIES, DEFAULT_GOALS } from './data/defaults';
import { MOCK_PATRIMONIO } from './data/mockPatrimonio';
import type { Patrimonio } from './types/patrimonio';
import type { Transacao } from './types/transacao';
import PatrimonioPage from './components/Patrimonio';
import PatrimonioChart from './components/PatrimonioChart';
import ImportarCSV from './components/ImportarCSV';
import Transacoes from './components/Transacoes';
import TopGastos from './components/TopGastos';
import PlanejamentoFinanceiro from './components/PlanejamentoFinanceiro';
import MetaPatrimonial from './components/MetaPatrimonial';

type Goal = { id: number | string; name: string; current: number; target: number };
type Page = 'dashboard' | 'planejamento' | 'metaPatrimonial' | 'patrimonio' | 'transacoes' | 'metas' | 'config' | 'importacao';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [patrimonio, setPatrimonio] = useState<Patrimonio[]>(() => loadData('patrimonio', MOCK_PATRIMONIO));
  const [accounts] = useState<string[]>(() => loadData('accounts', DEFAULT_ACCOUNTS));
  const [categories] = useState<string[]>(() => loadData('categories', DEFAULT_CATEGORIES));
  const [assetTypes] = useState<string[]>(() => loadData('assetTypes', DEFAULT_ASSET_TYPES));
  const [goals] = useState<Goal[]>(() => loadData('goals', DEFAULT_GOALS));

  useEffect(() => {
    setTransacoes(carregarTransacoes());
  }, [currentPage]);

  useEffect(() => {
    saveData('patrimonio', patrimonio);
  }, [patrimonio]);

  const stats = useMemo(() => {
    const filtradas = transacoes.filter(t => !movimentacaoInterna(t.descricao));
    const receitas = filtradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const despesas = filtradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    const totalPatrimonio = patrimonio.reduce((acc, p) => acc + p.valor, 0);
    const liquidez = patrimonio.filter(p => ['Conta Bancária', 'Ações', 'FII'].includes(p.tipo)).reduce((acc, p) => acc + p.valor, 0);
    const investimentos = patrimonio.filter(p => ['Ações', 'FII'].includes(p.tipo)).reduce((acc, p) => acc + p.valor, 0);
    const imoveis = patrimonio.filter(p => p.tipo === 'Imóvel').reduce((acc, p) => acc + p.valor, 0);
    
    return { receitas, despesas, saldo: receitas - despesas, taxaPoupanca: receitas > 0 ? ((receitas - despesas) / receitas) * 100 : 0, totalPatrimonio, liquidez, investimentos, imoveis };
  }, [transacoes, patrimonio]);

  const chartData = useMemo(() => {
    const map = patrimonio.reduce((acc, p) => {
      acc[p.tipo] = (acc[p.tipo] || 0) + p.valor;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [patrimonio]);

  const adicionarPatrimonio = (item: Patrimonio) => setPatrimonio([...patrimonio, item]);
  const excluirPatrimonio = (id: number) => setPatrimonio(patrimonio.filter(p => p.id !== id));

  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' }, { id: 'transacoes', label: 'Transações' },
    { id: 'patrimonio', label: 'Patrimônio' }, { id: 'metas', label: 'Metas' },
    { id: 'planejamento', label: 'Planejamento' }, { id: 'metaPatrimonial', label: 'Meta Patrimonial' },
    { id: 'config', label: 'Configurações' }, { id: 'importacao', label: 'Importar CSV' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Soberano Finance</h1>
        <nav className="space-y-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`block w-full text-left p-2 rounded ${currentPage === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {currentPage === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              {[ { label: 'Patrimônio', val: stats.totalPatrimonio }, { label: 'Receitas', val: stats.receitas }, { label: 'Despesas', val: stats.despesas }, { label: 'Saldo', val: stats.saldo }, { label: 'Poupança %', val: stats.taxaPoupanca.toFixed(1) } ].map(s => (
                <div key={s.label} className="bg-white p-4 rounded shadow">{s.label}<div className="text-xl font-bold">{s.val}</div></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <PatrimonioChart data={chartData} />
              <TopGastos />
            </div>
          </div>
        )}
        {currentPage === 'patrimonio' && <PatrimonioPage patrimonio={patrimonio} onAdd={adicionarPatrimonio} onDelete={excluirPatrimonio} />}
        {currentPage === 'transacoes' && <Transacoes />}
        {currentPage === 'metas' && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Metas Financeiras</h2>
            {goals.length === 0 ? <p>Nenhuma meta definida.</p> : goals.map(g => (
              <div key={g.id} className="mb-4"><div>{g.name}</div><progress value={g.current} max={g.target} className="w-full" /></div>
            ))}
          </div>
        )}
        {currentPage === 'config' && (
          <div className="grid grid-cols-3 gap-6">
            {[ { title: 'Contas', data: accounts }, { title: 'Categorias', data: categories }, { title: 'Tipos de Patrimônio', data: assetTypes } ].map(c => (
              <div key={c.title} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">{c.title}</h3>
                {c.data.length === 0 ? <p>Vazio</p> : c.data.map(i => <div key={i}>{i}</div>)}
              </div>
            ))}
          </div>
        )}
        {currentPage === 'importacao' && <ImportarCSV />}
        {currentPage === 'planejamento' && <PlanejamentoFinanceiro />}
        {currentPage === 'metaPatrimonial' && <MetaPatrimonial />}
      </main>
    </div>
  );
}