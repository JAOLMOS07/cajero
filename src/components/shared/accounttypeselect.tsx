// components/shared/AccountTypeSelect.tsx
import React from "react";
import { AccountType } from "@/types";

interface AccountTypeSelectProps {
    value: AccountType;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({ value, onChange }) => (
    <select
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="corriente">Cuenta Corriente</option>
        <option value="ahorro">Ahorro a la Mano</option>
        <option value="nequi">Nequi</option>
    </select>
);