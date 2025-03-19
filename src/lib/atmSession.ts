const ATM_SESSION_KEY = "atmSession";

interface ATMSession {
    type: string;
    accountNumber?: string;
    amount?: string;
}

export const setATMSession = (session: ATMSession): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(ATM_SESSION_KEY, JSON.stringify(session));
    }
};

export const getATMSession = (): ATMSession | null => {
    if (typeof window !== "undefined") {
        const session = localStorage.getItem(ATM_SESSION_KEY);
        return session ? JSON.parse(session) : null;
    }
    return null;
};

export const clearATMSession = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(ATM_SESSION_KEY);
    }
};