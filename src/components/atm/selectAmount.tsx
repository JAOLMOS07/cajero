"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormInput } from "@/components/shared/formInput";
import { getATMSession, setATMSession } from "@/lib/atmSession";

export const SelectAmountForm = () => {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    // Obtener la sesión del cajero automático desde el localStorage
    const session = getATMSession();

    if (!session || !session.type || !session.accountNumber) {
        return <p>Error: No se ha completado la información necesaria.</p>;
    }

    const { type, accountNumber } = session;

    const handleNext = () => {
        if (validateAmount(amount)) {
            // Guardar el monto en el localStorage
            setATMSession({ ...session, amount });

            if (type === "nequi") {
                router.push("/atm/dynamic-key"); // Redirigir sin parámetros en la URL
            } else {
                router.push("/atm/invoice"); // Redirigir sin parámetros en la URL
            }
        } else {
            setError("El monto debe ser un múltiplo de 10,000.");
        }
    };

    const validateAmount = (amount: string) => {
        const amountNumber = Number(amount);
        return amountNumber > 0 && amountNumber % 10000 === 0;
    };

    const handleAmountChange = (value: string) => {
        setAmount(value);
        if (error && validateAmount(value)) {
            setError("");
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Seleccionar Monto</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {[50000, 100000, 200000, 500000].map((amountOption) => (
                    <button
                        key={amountOption}
                        onClick={() => setAmount(amountOption.toString())}
                        className={`bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300 ${
                            amount === amountOption.toString() ? "ring-2 ring-blue-700" : ""
                        }`}
                    >
                        ${amountOption.toLocaleString()}
                    </button>
                ))}
            </div>
            <FormInput
                type="number"
                placeholder="Ingrese otro monto (múltiplo de 10,000)"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleNext}
                disabled={!validateAmount(amount)}
                className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 mt-4 ${
                    !validateAmount(amount) ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Siguiente
            </button>
        </div>
    );
};