"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Alert } from "@/components/shared/alert";
import { withdrawAmount } from "@/lib/atm";
import { FaSignOutAlt } from "react-icons/fa";
import { clearSession } from "@/lib/session";

export const Invoice = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get("type");
    const account = searchParams.get("account");
    const amount = searchParams.get("amount");

    if (!type || !account || !amount) {
        return <Alert message="Error: Faltan parámetros en la URL." type="error" />;
    }

    const amountNumber = Number(amount);
    const withdrawalResult = withdrawAmount(amountNumber);

    if (!withdrawalResult.success) {
        return <Alert message={withdrawalResult.error!} type="error" />;
    }

    const bills = withdrawalResult.bills!;

    const handleLogout = () => {
        router.push("/atm");
    };

    return (
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Recibo de Retiro</h1>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-semibold">Tipo de Retiro:</span>
                    <span className="text-gray-700">{type }</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Número de Cuenta:</span>
                    <span className="text-gray-700">{account}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Monto Retirado:</span>
                    <span className="text-gray-700">${amountNumber.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Fecha y Hora:</span>
                    <span className="text-gray-700">{new Date().toLocaleString()}</span>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Billetes Entregados</h2>
                    <ul className="space-y-2">
                        {Object.entries(bills).map(([denom, count]) => (
                            <li key={denom} className="flex justify-between">
                                <span className="text-gray-700">{count} billete(s) de</span>
                                <span className="font-semibold">${Number(denom).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">Gracias por utilizar nuestro servicio.</p>
            </div>
            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span>Cerrar factura</span>
                </button>
            </div>
        </div>
    );
};