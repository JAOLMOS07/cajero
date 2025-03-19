// lib/validations.ts
import { AccountType, Account } from "@/types";
import { getAccounts } from "./storage";

export const validateAccountCreation = (type: AccountType, phone: string, identification:string): { error: string | null; accountNumber: string } => {
    const accounts = getAccounts();

    const hasAccountType = accounts.some((acc) => acc.type === type && acc.identification == identification);
    if (hasAccountType) {
        return { error: `Ya tienes una cuenta de tipo ${type}.`, accountNumber: "" };
    }

    let accountNumber = "";
    if (type === "corriente") {
        accountNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    } else if (type === "ahorro") {
        accountNumber = `0${phone}`;
        if (accounts.some((acc) => acc.accountNumber === accountNumber)) {
            accountNumber = `1${phone}`;
        }
    } else if (type === "nequi") {
        accountNumber = `0${phone}`;
    }

    const accountExists = accounts.some((acc) => acc.accountNumber === accountNumber);
    if (accountExists) {
        return { error: "El número de cuenta generado ya existe en el sistema.", accountNumber: "" };
    }

    return { error: null, accountNumber };
};