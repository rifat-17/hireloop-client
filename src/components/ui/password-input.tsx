"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    toggleLabelClassName?: string;
}

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ className, toggleLabelClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                ref={ref}
                type={showPassword ? "text" : "password"}
                className={cn(
                    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500",
                    className
                )}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors",
                    toggleLabelClassName
                )}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

