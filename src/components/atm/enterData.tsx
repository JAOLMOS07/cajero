"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/shared/formInput";
import { Alert } from "@/components/shared/alert";
import { validatePhoneNumber } from "@/lib/atm";
import {findAccountByNumber, findAccountByPhoneNumber} from "@/lib/storage";

interface LoginFormProps {
    type: string;
}

export const LoginATMForm = ({ type }: LoginFormProps) => {
    const router = useRouter();
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleNext = () => {

        if (type === "nequi") {
            const account = findAccountByPhoneNumber(accountNumber, type);
            if (account) {
                router.push(`/atm/select-amount?type=${type}&account=${account.accountNumber}`);
            } else {
                setError("Número de teléfono inválido.");
            }
        } else if (type === "ahorro" || type === "corriente") {
            const account = findAccountByNumber(accountNumber, type);
            if(account?.password === password) {
                router.push(`/atm/select-amount?type=${type}&account=${account.accountNumber}`);
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
                    maxLength={type === "nequi"?10:11}
                    placeholder={
                        type === "nequi"
                            ? "Número de teléfono (10 dígitos)"
                            : "Número de cuenta (11 dígitos)"
                    }
                    value={accountNumber}
                    onChange={(e) => {
                        setAccountNumber(e.target.value.replace(/\D/g, ""));
                        setError("");
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