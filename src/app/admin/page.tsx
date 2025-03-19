"use client";
import { useState, useEffect } from "react";
import { getATMBills, updateATMBills } from "@/lib/atm";
import {Alert} from "@/components/shared/alert";

export default function GestionarBilletesPage() {
    const [bills, setBills] = useState<Record<number, number>>({
        10000: 0,
        20000: 0,
        50000: 0,
        100000: 0,
    });
    const [success, setSuccess] = useState(false);

    // Load current bill counts on page load
    useEffect(() => {
        const currentBills = getATMBills();
        setBills(currentBills);
    }, []);

    const handleInputChange = (denom: number, value: string) => {
        const newValue = Number(value);
        if (!isNaN(newValue) && newValue >= 0) {
            setBills((prev) => ({ ...prev, [denom]: newValue }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateATMBills(bills);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    };

    return (
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Gestionar Billetes del Cajero</h1>
            <form onSubmit={handleSave}>
                {Object.entries(bills).map(([denom, count]) => (
                    <div key={denom} className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Billetes de ${Number(denom).toLocaleString()}:
                        </label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => handleInputChange(Number(denom), e.target.value)}
                            className="w-full p-2 border rounded"
                            min={0}
                        />
                    </div>
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Guardar Cambios
                </button>
            </form>
            {success && <Alert message="¡Billetes actualizados exitosamente!" type="success" />}
        </div>
    );
}