"use client";
import React from "react";

import {LoginATMForm} from "@/components/atm/enterData";
import {useParams, useSearchParams} from "next/navigation";
export default function EnterDataPage() {
    const searchParams = useSearchParams()

    const type = searchParams.get('type')
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <LoginATMForm type={type??""} />
        </div>
    );
}