"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormInput } from "@/components/shared/formInput";
import { Alert } from "@/components/shared/alert";
import { validateDynamicKey } from "@/lib/dynamicKey";
import { getATMSession } from "@/lib/atmSession";
import { FaKey, FaArrowRight } from "react-icons/fa";

export const DynamicKeyForm = () => {
    const router = useRouter();
    const [dynamicKey, setDynamicKey] = useState("");
    const [error, setError] = useState("");

    const session = getATMSession();

    if (!session || !session.type || !session.accountNumber || !session.amount) {
        return <Alert message="Error: No se ha completado la información necesaria." type="error" />;
    }

    const { type, accountNumber, amount } = session;

    const handleNext = () => {
        if (!validateDynamicKey(dynamicKey, accountNumber)) {
            setError("Clave dinámica inválida o expirada.");
            return;
        }
        router.push("/atm/invoice"); // Redirigir sin parámetros en la URL
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Clave Dinámica</h1>
            <div className="space-y-6">
                <div className="relative">
                    <FormInput
                        type="password"
                        placeholder="Ingrese la clave dinámica"
                        value={dynamicKey}
                        onChange={(e) => {
                            setDynamicKey(e.target.value);
                            setError("");
                        }}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-400" />
                    </span>
                </div>
                {error && <Alert message={error} type="error" />}
                <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
                >
                    <span>Siguiente</span>
                    <FaArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    );
};