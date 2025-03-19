// components/dashboard/WithdrawalOptions.tsx
"use client";
import { useState } from "react";
import { withdrawAmount, updateATMBills } from "@/lib/atm";
import { Alert } from "@/components/shared/alert";
import { WithdrawalReceipt } from "./WithdrawalReceipt";

export const WithdrawalOptions = () => {
    const [amount, setAmount] = useState("");
    const [customAmount, setCustomAmount] = useState("");
    const [result, setResult] = useState<{ success: boolean; bills?: Record<number, number>; error?: string } | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [dispensedBills, setDispensedBills] = useState<Record<number, number> | null>(null);

    const handleWithdraw = (amount: number) => {
        const withdrawalResult = withdrawAmount(amount);
        setResult(withdrawalResult);
        if (withdrawalResult.success) {
            setDispensedBills(withdrawalResult.bills!);
        }
    };

    const handleCustomWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = Number(customAmount);
        if (amount % 10000 !== 0) {
            setResult({ success: false, error: "El monto debe ser múltiplo de 10,000." });
            return;
        }
        handleWithdraw(amount);
    };

    const handleConfirmWithdrawal = () => {
        if (dispensedBills) {
            updateATMBills(dispensedBills);
            setShowReceipt(true);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Retirar Dinero</h2>
            <div className="grid grid-cols-2 gap-4">
                {[50000, 100000, 200000, 500000].map((amount) => (
                    <button
                        key={amount}
                        onClick={() => handleWithdraw(amount)}
                        className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
                    >
                        ${amount.toLocaleString()}
                    </button>
                ))}
            </div>
            <form onSubmit={handleCustomWithdraw} className="mt-4">
                <input
                    type="number"
                    placeholder="Ingrese otro monto (múltiplo de 10,000)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Calcular Retiro
                </button>
            </form>
            {result && !result.success && <Alert message={result.error!} type="error" />}
            {result?.success && dispensedBills && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Billetes a Entregar:</h3>
                    <ul>
                        {Object.entries(dispensedBills).map(([denom, count]) => (
                            <li key={denom}>
                                {count} billete(s) de ${Number(denom).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleConfirmWithdrawal}
                        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
                    >
                        Confirmar Retiro
                    </button>
                </div>
            )}
            {showReceipt && dispensedBills && (
                <WithdrawalReceipt amount={Number(customAmount || amount)} bills={dispensedBills} />
            )}
        </div>
    );
};