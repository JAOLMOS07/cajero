"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountType } from "@/types";
import { saveAccount } from "@/lib/storage";
import { validateAccountCreation } from "@/lib/validations";
import { AccountTypeSelect } from "@/components/shared/accounttypeselect";
import { FormInput } from "@/components/shared/formInput";
import { Alert } from "@/components/shared/alert";
import { FaUser, FaPhone, FaIdCard, FaLock } from "react-icons/fa";

export const CreateAccountForm = () => {
    const [accountType, setAccountType] = useState<AccountType>("corriente");
    const [phone, setPhone] = useState("");
    const [identification, setIdentification] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { error: validationError, accountNumber } = validateAccountCreation(accountType, phone, identification);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Create the new account
        const newAccount = {
            type: accountType,
            accountNumber,
            identification,
            balance: 0,
            phone,
            firstName,
            password,
        };
        saveAccount(newAccount);
        router.push("/login");
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Crear Cuenta</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cuenta</label>
                    <AccountTypeSelect
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value as AccountType)}   />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Teléfono</label>
                    <FormInput
                        type="text"
                        placeholder="Número de teléfono (10 dígitos)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        icon={FaPhone}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cédula</label>
                    <FormInput
                        type="text"
                        placeholder="Cédula"
                        value={identification}
                        maxLength={10}
                        onChange={(e) => setIdentification(e.target.value)}
                        icon={FaIdCard}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <FormInput
                        type="text"
                        placeholder="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        icon={FaUser}
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
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
};