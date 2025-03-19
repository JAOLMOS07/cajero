"use client";
import React from "react";

import { useSearchParams} from "next/navigation";
import {DynamicKeyForm} from "@/components/atm/dynamicKey";
export default function DynamicKeyPage() {
    const searchParams = useSearchParams()

    const type = searchParams.get('type')
    const amount = searchParams.get('amount')
    const account = searchParams.get('account')

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <DynamicKeyForm type={type??""}  account={account??""} amount={amount??""} />
        </div>
    );
}