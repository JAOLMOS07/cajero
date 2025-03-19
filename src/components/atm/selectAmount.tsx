"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormInput } from "@/components/shared/formInput";

interface SelectAmountFormProps {
    type: string;
    account: string;
}

export const SelectAmountForm = ({ type, account }: SelectAmountFormProps) => {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    console.log(account);
    const handleNext = () => {
        console.log("type")
        if (validateAmount(amount)) {
            if (type === "nequi") {
                router.push(`/atm/dynamic-key?type=${type}&account=${account}&amount=${amount}`);
            } else {
                router.push(`/atm/invoice?type=${type}&account=${account}&amount=${amount}`);
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
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Seleccionar Monto</h1>
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
                onChange={(e) => handleAmountChange(e.target.value)} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleNext}
                disabled={!validateAmount(amount)}
                className={`w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-4 ${
                    !validateAmount(amount) ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Siguiente
            </button>
        </div>
    );
};