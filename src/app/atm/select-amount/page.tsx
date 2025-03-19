"use client";


import { useSearchParams } from "next/navigation";
import {SelectAmountForm} from "@/components/atm/selectAmount";

export default function SelectAmountPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const account = searchParams.get("account");

    if (!type || !account) {
        return <div>Error: Faltan parámetros en la URL.</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <SelectAmountForm type={type} account={account} />
        </div>
    );
}