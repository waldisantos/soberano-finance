import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import type { Transacao } from '../types/transacao';
import { loadData, saveData } from '../services/storage';
import { categorizar } from '../services/categorizador';

type ImportStatus = 'idle' | 'importing' | 'success' | 'error';

interface ImportSummary {
  total: number;
  importadas: number;
  duplicadas: number;
  invalidas: number;
}

const parseCurrency = (value: string): number => {
  const clean = value.replace(/R\$\s?/, '').replace(/\./g, '').replace(',', '.');
  return parseFloat(clean) || 0;
};

const buildDedupKey = (t: Pick<Transacao, 'data' | 'descricao' | 'valor' | 'tipo'>) => 
  `${t.data}-${t.descricao}-${t.valor}-${t.tipo}`;

export const ImportarCSV: React.FC = () => {
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('importing');
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const existing = loadData(
  "transacoes",
  []
);
        const existingKeys = new Set(existing.map(buildDedupKey));
        
        let importadas = 0;
        let duplicadas = 0;
        let invalidas = 0;
        const novasTransacoes: Transacao[] = [...existing];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const cols = lines[i].split(',');
          
          const rawData = { 
            data: cols[headers.findIndex(h => ['data', 'date'].includes(h))], 
            desc: cols[headers.findIndex(h => ['descrição', 'descricao', 'description', 'title'].includes(h))], 
            valor: cols[headers.findIndex(h => ['valor', 'value', 'amount'].includes(h))],
            cat: cols[headers.findIndex(h => ['categoria', 'category'].includes(h))]
          };

          if (!rawData.data || !rawData.desc || !rawData.valor) {
            invalidas++;
            continue;
          }

          const valor = parseCurrency(rawData.valor);
          const tipo = valor < 0 ? 'despesa' : 'receita';
          const transacao: Transacao = {
            id: Date.now() + i,
            data: rawData.data.trim(),
            descricao: rawData.desc.trim(),
            valor: Math.abs(valor),
            tipo,
            categoria: rawData.cat?.trim() || categorizar(rawData.desc.trim()),
            origem: 'conta'
          };

          const key = buildDedupKey(transacao);
          if (existingKeys.has(key)) {
            duplicadas++;
          } else {
            novasTransacoes.push(transacao);
            existingKeys.add(key);
            importadas++;
          }
        }

        saveData(
  "transacoes",
  novasTransacoes
);
        setSummary({ total: lines.length - 1, importadas, duplicadas, invalidas });
        setStatus('success');
      } catch (err) {
        setStatus('error');
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-bold mb-2">Importar CSV</h3>
      <input 
        type="file" 
        accept=".csv" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      
      {status === 'importing' && <p className="mt-2 text-blue-600">Processando...</p>}
      {status === 'error' && <p className="mt-2 text-red-600">Erro ao processar arquivo.</p>}
      {status === 'success' && summary && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 text-sm rounded">
          <p className="font-semibold">Importação concluída!</p>
          <ul className="list-disc ml-4">
            <li>Importadas: {summary.importadas}</li>
            <li>Duplicadas: {summary.duplicadas}</li>
            <li>Inválidas: {summary.invalidas}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ImportarCSV;