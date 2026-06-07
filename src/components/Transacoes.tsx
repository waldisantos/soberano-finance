import React, { useState, useEffect, useMemo } from 'react';
import type { Transacao } from '../types/transacao';
import { carregarTransacoes } from '../services/transacoesStorage';

const formatarMoeda = (valor: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const formatarData = (data: string) => 
  new Date(data).toLocaleDateString('pt-BR');

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dados = carregarTransacoes();
    setTransacoes(dados);
    setLoading(false);
  }, []);

  const resumo = useMemo(() => {
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
  }, [transacoes]);

  const listaOrdenada = useMemo(() => 
    [...transacoes].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()), 
  [transacoes]);

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando transações...</div>;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-600 font-medium">Receitas</p>
          <p className="text-2xl font-bold text-green-700">{formatarMoeda(resumo.totalReceitas)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <p className="text-sm text-red-600 font-medium">Despesas</p>
          <p className="text-2xl font-bold text-red-700">{formatarMoeda(resumo.totalDespesas)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-600 font-medium">Saldo</p>
          <p className="text-2xl font-bold text-blue-700">{formatarMoeda(resumo.saldo)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Histórico de Transações</h2>
          <span className="text-sm text-gray-500">{transacoes.length} registros</span>
        </div>

        {listaOrdenada.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Nenhuma transação encontrada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3">Origem</th>
                  <th className="px-6 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listaOrdenada.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{formatarData(t.data)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{t.descricao}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t.categoria} {t.subcategoria && <span className="text-gray-400">/ {t.subcategoria}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.origem === 'conta' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {t.origem}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.tipo === 'receita' ? '+' : '-'} {formatarMoeda(t.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}