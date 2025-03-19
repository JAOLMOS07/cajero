// components/dashboard/WithdrawalReceipt.tsx
"use client";
import { getSession } from "@/lib/session";
import { findAccountByNumber } from "@/lib/storage";

interface WithdrawalReceiptProps {
    amount: number;
    bills: Record<number, number>;
}

export const WithdrawalReceipt = ({ amount, bills }: WithdrawalReceiptProps) => {
    const accountNumber = getSession();
    const account = findAccountByNumber(accountNumber || "");

    if (!account) {
        return <p>No se encontró la cuenta.</p>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Recibo de Retiro</h2>
            <div className="space-y-2">
                <p><span className="font-semibold">Nombre:</span> {account.firstName}</p>
                <p><span className="font-semibold">Número de Cuenta:</span> {account.accountNumber}</p>
                <p><span className="font-semibold">Monto Retirado:</span> ${amount.toLocaleString()}</p>
                <p><span className="font-semibold">Fecha y Hora:</span> {new Date().toLocaleString()}</p>
                <p><span className="font-semibold">Billetes Entregados:</span></p>
                <ul>
                    {Object.entries(bills).map(([denom, count]) => (
                        <li key={denom}>
                            {count} billete(s) de ${Number(denom).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};