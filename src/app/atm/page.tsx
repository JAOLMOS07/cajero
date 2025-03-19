"use client";

import Link from "next/link";
import { FaMoneyBillAlt, FaPiggyBank, FaWallet } from "react-icons/fa";
import { setATMSession } from "@/lib/atmSession";

export default function SeleccionarRetiroPage() {
    const handleSelectType = (type: string) => {
        setATMSession({type});
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Seleccionar Tipo de Retiro</h1>
                <div className="space-y-6">
                    <Link
                        href="/atm/enter-data"
                        onClick={() => handleSelectType("nequi")}
                        className="block w-full bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-4"
                    >
                        <FaMoneyBillAlt className="text-2xl" />
                        <span className="text-xl">Retiro Nequi</span>
                    </Link>
                    <Link
                        href="/atm/enter-data"
                        onClick={() => handleSelectType("ahorro")}
                        className="block w-full bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 transition duration-300 flex items-center justify-center space-x-4"
                    >
                        <FaPiggyBank className="text-2xl" />
                        <span className="text-xl">Retiro Ahorro a la Mano</span>
                    </Link>
                    <Link
                        href="/atm/enter-data"
                        onClick={() => handleSelectType("corriente")}
                        className="block w-full bg-purple-500 text-white p-6 rounded-xl hover:bg-purple-600 transition duration-300 flex items-center justify-center space-x-4"
                    >
                        <FaWallet className="text-2xl" />
                        <span className="text-xl">Retiro Cuenta Corriente</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}