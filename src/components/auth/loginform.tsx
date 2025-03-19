"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findAccountByPhoneNumber } from "@/lib/storage";
import Link from "next/link";
import { AccountType } from "@/types";
import { setSession } from "@/lib/session";
import { AccountTypeSelect } from "@/components/shared/accounttypeselect";
import { FormInput } from "@/components/shared/formInput";
import { Alert } from "@/components/shared/alert";
import { FaUser, FaLock, FaPhone, FaIdCard } from "react-icons/fa";

export const LoginForm = () => {
    const [accountType, setAccountType] = useState<AccountType>("corriente");
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const validateInput = (value: string): boolean => {
        if (value.length === 0) return true;
        return /^3\d{0,9}$/.test(value);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const account = findAccountByPhoneNumber(accountNumber, accountType);
        if (account && account.password === password) {
            setSession(account.accountNumber); // Set session
            router.push("/dashboard");
        } else {
            setError("Número de cuenta o contraseña incorrectos.");
        }
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cuenta</label>
                    <AccountTypeSelect
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value as AccountType)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {accountType === "corriente" ? "Número de Cuenta" : "Número de Teléfono"}
                    </label>
                    <FormInput
                        type="number"
                        placeholder={
                            accountType === "corriente"
                                ? "Número de teléfono (10 dígitos)"
                                : "Número de teléfono (10 dígitos)"
                        }
                        value={accountNumber}
                        onChange={(e) => {
                            const sanitizedValue = e.target.value.replace(/\D/g, ""); // Solo números
                            if (validateInput(sanitizedValue)) {
                                setAccountNumber(sanitizedValue);
                                setError("");
                            }
                        }

                    }

                        icon={accountType === "corriente" ? FaIdCard : FaPhone}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <FormInput
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        maxLength={4}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={FaLock}
                    />
                </div>
                {error && <Alert message={error} type="error" />}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Iniciar Sesión
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link href="/create-account" className="text-blue-500 hover:text-blue-700 hover:underline">
                    ¿No tienes una cuenta? <span className="font-semibold">Crear cuenta</span>
                </Link>
            </div>
        </div>
    );
};