// lib/atm.ts
const ATM_BILLS_KEY = "atmBills";

export const initializeATM = (): void => {
    if (typeof window !== "undefined" && !localStorage.getItem(ATM_BILLS_KEY)) {
        const initialBills = {
            10000: 100,
            20000: 100,
            50000: 100,
            100000: 100,
        };
        localStorage.setItem(ATM_BILLS_KEY, JSON.stringify(initialBills));
    }
};


export const getATMBills = (): Record<number, number> => {
    if (typeof window !== "undefined") {
        const storedBills = localStorage.getItem(ATM_BILLS_KEY);
        if (!storedBills) {

            const defaultBills = {
                10000: 100,
                20000: 100,
                50000: 100,
                100000: 100,
            };
            localStorage.setItem(ATM_BILLS_KEY, JSON.stringify(defaultBills));
            return defaultBills;
        }
        return JSON.parse(storedBills);
    }
    return {};
};
export const updateATMBills = (bills: Record<number, number>): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(ATM_BILLS_KEY, JSON.stringify(bills));
    }
};
const Denominations = [10000, 20000, 50000, 100000]; // Denominations in descending order

export const withdrawAmount = (amount: number): { success: boolean; bills?: Record<number, number>; error?: string } => {
    const bills = getATMBills();

    if (amount % 10000 !== 0) {
        return { success: false, error: "El monto debe ser múltiplo de 10,000." };
    }

    const billetesUsados: Record<number, number> = { 100000: 0, 50000: 0, 20000: 0, 10000: 0 };
    let acumulador = 0;

    while (acumulador < amount) {
        for (let i = 0; i < Denominations.length; i++) {
            for (let j = i; j < Denominations.length; j++) {
                const denom = Denominations[j];
                if (acumulador + denom <= amount && bills[denom] > 0) {
                    acumulador += denom;
                    billetesUsados[denom]++;
                    bills[denom]--;
                }
            }
        }
    }

    if (acumulador === amount) {
        replenishBills(bills)
        return { success: true, bills: billetesUsados };

    } else {
        return { success: false, error: "No hay suficientes billetes para realizar el retiro." };
    }
};

export const replenishBills = (newBills: Record<number, number>): void => {
    const currentBills = getATMBills();
    const updatedBills = { ...currentBills };

    for (const [denom, count] of Object.entries(newBills)) {
        updatedBills[Number(denom)] = (updatedBills[Number(denom)] || 0) + count;
    }

    updateATMBills(updatedBills);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    return phoneNumber.length === 10;
};

export const validatePassword = (accountNumber: string, password: string): boolean => {
    return password.length === 4;
};