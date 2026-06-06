import React, { useState, useEffect } from 'react';

// Types
interface Transaction { id: string; date: string; description: string; amount: number; category: string; }
interface SummaryData { balance: number; monthlyExpenses: number; projection: number; savings: number; }

// DashboardLayout.tsx
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex bg-gray-50">
    <aside className="w-64 bg-slate-900 text-white p-6">Soberano Finance</aside>
    <main className="flex-1 p-8">{children}</main>
  </div>
);

// SummaryCard.tsx
export const SummaryCard: React.FC<{ data: SummaryData }> = ({ data }) => (
  <div className="grid grid-cols-4 gap-4">
    {Object.entries(data).map(([key, val]) => (
      <div key={key} className="bg-white p-6 rounded-lg shadow">{key}: R$ {val.toFixed(2)}</div>
    ))}
  </div>
);

// TransactionTable.tsx
export const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => { fetch('/api/transactions').then(res => res.json()).then(setTransactions); }, []);
  return (
    <table className="w-full bg-white shadow rounded">
      <thead><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Categoria</th></tr></thead>
      <tbody>{transactions.map(t => <tr key={t.id}><td>{t.date}</td><td>{t.description}</td><td>{t.amount}</td><td>{t.category}</td></tr>)}</tbody>
    </table>
  );
};

// UploadCSV.tsx
export const UploadCSV: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setStatus('uploading');
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      await fetch('/api/upload', { method: 'POST', body: formData });
      setStatus('success');
    } catch { setStatus('error'); }
  };
  return (
    <div className="p-4 border-2 border-dashed">
      <input type="file" onChange={handleUpload} disabled={status === 'uploading'} />
      {status === 'uploading' && <p>Enviando...</p>}
      {status === 'success' && <p className="text-green-600">Sucesso!</p>}
    </div>
  );
};