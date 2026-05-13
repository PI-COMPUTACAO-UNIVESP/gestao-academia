'use client';

import { useState } from 'next';

export default function ChurnForm() {
    const [frequenciaSemanal, setFrequenciaSemanal] = useState<number>(0);
    const [atrasosPagamento, setAtrasosPagamento] = useState<number>(0);
    const [result, setResult] = useState<{
        churn_risk?: number;
        alert?: boolean;
        message?: string;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            // Using the new Vercel Python endpoint
            const res = await fetch('/api/py/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    frequencia_semanal: frequenciaSemanal,
                    atrasos_pagamento: atrasosPagamento,
                }),
            });

            const data = await res.json();

            if (data.status === 'success') {
                setResult({
                    churn_risk: data.churn_risk,
                    alert: data.alert,
                });
            } else {
                setResult({ message: data.message || 'Erro ao prever churn' });
            }
        } catch (_error) {
            setResult({ message: 'Erro na conexão com a API de IA.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='frequencia'>
                Frequência Semanal (Acessos)
                <input
                    type='number'
                    id='frequencia'
                    name='frequencia'
                    step='1'
                    min='0'
                    max='7'
                    value={frequenciaSemanal}
                    onChange={(e) =>
                        setFrequenciaSemanal(Number(e.target.value))
                    }
                    required
                />
            </label>

            <label htmlFor='atrasos'>
                Atrasos de Pagamento
                <input
                    type='number'
                    id='atrasos'
                    name='atrasos'
                    step='1'
                    min='0'
                    value={atrasosPagamento}
                    onChange={(e) =>
                        setAtrasosPagamento(Number(e.target.value))
                    }
                    required
                />
            </label>

            <button type='submit' aria-busy={loading} disabled={loading}>
                {loading ? 'Analisando...' : 'Prever risco de Churn'}
            </button>

            {result && (
                <article style={{ marginTop: '1rem' }}>
                    {result.message ? (
                        <p style={{ color: 'red' }}>{result.message}</p>
                    ) : (
                        <>
                            <h3 style={{ marginBottom: '0.5rem' }}>
                                Resultado da Análise
                            </h3>
                            <p>
                                <strong>Risco de cancelamento:</strong>{' '}
                                {(result.churn_risk! * 100).toFixed(0)}%
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                {result.alert ? (
                                    <mark
                                        style={{
                                            backgroundColor: '#ffcccc',
                                            color: '#cc0000',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Risco Alto (Alerta)
                                    </mark>
                                ) : (
                                    <mark
                                        style={{
                                            backgroundColor: '#ccffcc',
                                            color: '#006600',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Risco Baixo
                                    </mark>
                                )}
                            </p>
                        </>
                    )}
                </article>
            )}
        </form>
    );
}
