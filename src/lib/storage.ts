// lib/storage.ts
import { Account } from "@/types";

const STORAGE_KEY = "accounts";

export const saveAccount = (account: Account): void => {
    if (typeof window !== "undefined") {
        const accounts = getAccounts();
        accounts.push(account);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    }
};

export const getAccounts = (): Account[] => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }
    return [];
};

export const findAccountByNumber = (accountNumber: string,acountType: string): Account | undefined => {
    if (typeof window !== "undefined") {
        const accounts = getAccounts();
        return accounts.find((account) => account.accountNumber  === accountNumber && account.type === acountType);
    }
    return undefined;
};
export const findAccountByOnlyNumber = (accountNumber: string): Account | undefined => {
    if (typeof window !== "undefined") {
        const accounts = getAccounts();
        return accounts.find((account) => account.accountNumber  === accountNumber);
    }
    return undefined;
};
export const findAccountByPhoneNumber = (accountNumber: string,acountType: string): Account | undefined => {
    if (typeof window !== "undefined") {
        const accounts = getAccounts();
        return accounts.find((account) => account.phone === accountNumber && account.type === acountType);
    }
    return undefined;
};
export const findAccountByPhone = (phone: string): Account | undefined => {
    if (typeof window !== "undefined") {
        const accounts = getAccounts();
        return accounts.find((account) => account.phone === phone);
    }
    return undefined;
};