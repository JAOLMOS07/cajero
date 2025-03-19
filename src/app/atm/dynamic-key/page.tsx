"use client";
import React from "react";

import {DynamicKeyForm} from "@/components/atm/dynamicKey";
export default function DynamicKeyPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <DynamicKeyForm  />
        </div>
    );
}