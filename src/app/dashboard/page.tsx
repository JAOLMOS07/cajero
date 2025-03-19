// app/dashboard/page.tsx
"use client";
import { WithdrawalOptions } from "@/components/dashboard/WithdrawalOptions";
import {AccountInfo} from "@/components/dashboard/accountinfo";

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AccountInfo/>
        </div>
    );
}