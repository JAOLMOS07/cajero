import React from "react";
import { IconType } from "react-icons";

interface FormInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    minLength?: number;
    icon?: IconType;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
                                                        type,
                                                        placeholder,
                                                        value,
                                                        onChange,
                                                        maxLength,
                                                        minLength,
                                                        icon: Icon, // Icono como componente
                                                        className = "", // Clases adicionales
                                                    }) => {
    return (
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="text-gray-400" />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    Icon ? "pl-10" : ""
                } ${className}`}
            />
        </div>
    );
};