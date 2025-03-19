"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/shared/formInput";
import { Alert } from "@/components/shared/alert";
import { findAccountByNumber, findAccountByPhoneNumber } from "@/lib/storage";
import { getATMSession, setATMSession } from "@/lib/atmSession";

export const LoginATMForm = () => {
    const router = useRouter();
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Obtener el tipo de retiro desde el localStorage
    const session = getATMSession();
    const type = session?.type;

    if (!type) {
        return <Alert message="Error: No se ha seleccionado un tipo de retiro." type="error" />;
    }

    const validateInput = (value: string): boolean => {
        if (type === "nequi") {
            if (value.length === 0) return true;
            return /^3\d{0,9}$/.test(value);
        } else if (type === "ahorro" || type === "ahorro_a_la_mano") {
            if (value.length === 0) return true;
            if (value.length === 1) return /^[01]$/.test(value);
            if (value.length === 2) return /^[01]3$/.test(value);
            return /^[01]3\d{0,9}$/.test(value);
        } else if (type === "corriente") {
            return /^\d{0,11}$/.test(value);
        }
        return true;
    };

    const handleNext = () => {
        if (!accountNumber) {
            setError("Por favor ingrese un número válido.");
            return;
        }

        if (type === "nequi") {
            const account = findAccountByPhoneNumber(accountNumber, type);
            if (account) {
                setATMSession({ ...session, accountNumber: account.accountNumber });
                router.push("/atm/select-amount");
            } else {
                setError("Número de teléfono inválido.");
            }
        } else if (type === "ahorro" || type === "corriente" || type === "ahorro_a_la_mano") {
            const account = findAccountByNumber(accountNumber, type);
            if (account?.password === password) {
                setATMSession({ ...session, accountNumber: account.accountNumber }); // Guardar el número de cuenta
                router.push("/atm/select-amount");
            } else {
                setError("Número de cuenta o contraseña inválidos.");
            }
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Ingresar Datos</h1>
            <div className="space-y-6">
                <FormInput
                    type="text"
                    maxLength={type === "nequi" ? 10 : 11}
                    placeholder={
                        type === "nequi"
                            ? "Número de teléfono (10 dígitos)"
                            : "Número de cuenta (11 dígitos)"
                    }
                    value={accountNumber}
                    onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(/\D/g, ""); // Solo números
                        if (validateInput(sanitizedValue)) {
                            setAccountNumber(sanitizedValue);
                            setError("");
                        }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {type !== "nequi" && (
                    <FormInput
                        type="password"
                        placeholder="Clave de la cuenta (4 dígitos)"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value.replace(/\D/g, "").slice(0, 4));
                            setError("");
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
                {error && <Alert message={error} type="error" />}
                <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};