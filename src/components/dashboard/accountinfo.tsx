"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "@/lib/session";
import {findAccountByNumber, findAccountByOnlyNumber} from "@/lib/storage";
import { generateDynamicKey, clearDynamicKey } from "@/lib/dynamicKey";
import { FaUser, FaWallet, FaMoneyBillAlt, FaKey, FaSignOutAlt, FaStopCircle, FaPlayCircle } from "react-icons/fa";

export const AccountInfo = () => {
    const router = useRouter();
    const accountNumber = getSession();
    const account = findAccountByOnlyNumber(accountNumber || "");

    const [key, setKey] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (isActive && timeLeft === 0) {
            const newKey = generateDynamicKey(accountNumber || "");
            setKey(newKey);
            setTimeLeft(60);
        }

        return () => clearTimeout(timer);
    }, [isActive, timeLeft, accountNumber]);

    const handleGenerateKey = () => {
        setIsActive(true);
        const newKey = generateDynamicKey(accountNumber || "");
        setKey(newKey);
        setTimeLeft(60);
    };

    const handleStopGeneration = () => {
        setIsActive(false);
        clearDynamicKey();
        setKey("");
        setTimeLeft(60);
    };

    const handleLogout = () => {
        clearSession();
        router.push("/login");
    };

    if (!account) {
        return <p>No se encontró la cuenta.</p>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Información de la Cuenta</h2>


            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <FaUser className="text-gray-500 text-2xl" />
                        <p><span className="font-semibold">Nombre:</span> {account.firstName}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaWallet className="text-gray-500 text-2xl" />
                        <p><span className="font-semibold">Número de Cuenta:</span> {account.accountNumber}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaMoneyBillAlt className="text-gray-500 text-2xl" />
                        <p><span className="font-semibold">Saldo:</span> ${account.balance.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaKey className="text-gray-500 text-2xl" />
                        <p><span className="font-semibold">Tipo de Cuenta:</span> {account.type}</p>
                    </div>
                </div>
            </div>


            {account.type === "nequi" && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Clave Dinámica</h2>
                    {key ? (
                        <div className="text-center">
                            <p className="text-4xl font-bold text-gray-800">{key}</p>
                            <p className="text-sm text-gray-500 mt-2">Válida por {timeLeft} segundos</p>
                            <button
                                onClick={handleStopGeneration}
                                className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 mt-4 flex items-center justify-center space-x-2"
                            >
                                <FaStopCircle className="text-xl" />
                                <span>Detener Generación</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerateKey}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
                        >
                            <FaPlayCircle className="text-xl" />
                            <span>Generar Clave</span>
                        </button>
                    )}
                </div>
            )}


            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300 flex items-center justify-center space-x-2"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};