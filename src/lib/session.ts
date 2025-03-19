// lib/session.ts
const SESSION_KEY = "currentAccount";

export const setSession = (accountNumber: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, accountNumber);
    }
};

export const getSession = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(SESSION_KEY);
    }
    return null;
};

export const clearSession = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY);
    }
};