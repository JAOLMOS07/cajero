"use client";


import {Invoice} from "@/components/atm/invoice";

export default function InvoicePage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <Invoice />
        </div>
    );
}