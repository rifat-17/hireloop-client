import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    hint?: React.ReactNode;
    error?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
    className?: string;
}

export function FormField({
    id,
    label,
    required,
    hint,
    error,
    icon: Icon,
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <div className="flex items-center justify-between">
                    <Label htmlFor={id} className="text-sm font-medium text-gray-300">
                        {label} {required && <span className="text-violet-400">*</span>}
                    </Label>
                    {hint && <span className="text-xs text-gray-500">{hint}</span>}
                </div>
            )}
            {Icon ? (
                <div className="relative">
                    <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    {children}
                </div>
            ) : (
                children
            )}
            {error && (
                <p role="alert" className="text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

