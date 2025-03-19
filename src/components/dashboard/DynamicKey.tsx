"use client";
import { useState, useEffect } from "react";
import { generateDynamicKey } from "@/lib/dynamicKey";

export const DynamicKey = () => {
    const [key, setKey] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setKey(generateDynamicKey());
            setTimeLeft(60);
        }
    }, [timeLeft]);

    const handleGenerateKey = () => {
        setKey(generateDynamicKey());
        setTimeLeft(60);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Clave Dinámica</h2>
            {key ? (
                <div>
                    <p className="text-2xl font-bold">{key}</p>
                    <p className="text-sm text-gray-500">Válida por {timeLeft} segundos</p>
                </div>
            ) : (
                <button
                    onClick={handleGenerateKey}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Generar Clave
                </button>
            )}
        </div>
    );
};