// components/shared/Alert.tsx
import React from "react";

interface AlertProps {
    message: string;
    type: "error" | "success";
}

export const Alert: React.FC<AlertProps> = ({ message, type }) => (
    <div className={`p-2 rounded ${type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
        {message}
    </div>
);