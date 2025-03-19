"use client";
import React from "react";

import {LoginATMForm} from "@/components/atm/enterData";
export default function EnterDataPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <LoginATMForm  />
        </div>
    );
}