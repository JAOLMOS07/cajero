// types/index.ts
export type AccountType = "corriente" | "ahorro" | "nequi";

export interface Account {
    type: AccountType;
    accountNumber: string;
    identification: string;
    balance: number;
    phone: string;
    firstName: string;
    password: string;
}