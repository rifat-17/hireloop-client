import React from "react";
import { cn } from "@/lib/utils";

interface FormCardProps {
    step?: number | string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function FormCard({
    step,
    title,
    children,
    className,
}: FormCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8",
                className
            )}
        >
            <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                {step !== undefined && (
                    <span className="flex size-7 items-center justify-center rounded-lg bg-violet-600/20 text-xs font-semibold text-violet-400">
                        {step}
                    </span>
                )}
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
            <div className="space-y-6">{children}</div>
        </div>
    );
}

