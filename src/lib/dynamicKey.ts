const DYNAMIC_KEY_KEY = "dynamicKey";

interface DynamicKeyData {
    key: string;
    expiration: number;
    accountNumber: string; // Asociar la clave a una cuenta específica
}

export const generateDynamicKey = (accountNumber: string): string => {
    const key = Math.floor(100000 + Math.random() * 900000).toString(); // Clave de 6 dígitos
    const expiration = Date.now() + 60000; // Válida por 60 segundos
    const dynamicKeyData: DynamicKeyData = { key, expiration, accountNumber };
    localStorage.setItem(DYNAMIC_KEY_KEY, JSON.stringify(dynamicKeyData));
    return key;
};

export const validateDynamicKey = (inputKey: string, accountNumber: string): boolean => {
    const storedKey = localStorage.getItem(DYNAMIC_KEY_KEY);
    if (!storedKey) return false;

    const { key, expiration, accountNumber: storedAccountNumber } = JSON.parse(storedKey) as DynamicKeyData;

    // Verificar si la clave es para la cuenta correcta y no ha expirado
    if (accountNumber !== storedAccountNumber || Date.now() > expiration) {
        return false; // Clave expirada o no corresponde a la cuenta
    }

    return inputKey === key;
};

export const clearDynamicKey = (): void => {
    localStorage.removeItem(DYNAMIC_KEY_KEY);
};