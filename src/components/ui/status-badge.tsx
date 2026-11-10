import * as React from "react";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    status: JobStatus | string;
}

const statusStyles: Record<string, string> = {
    Active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Expired: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Draft: "border-white/10 bg-white/5 text-gray-400",
};

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
    const style =
        statusStyles[status] || "border-white/10 bg-white/5 text-gray-400";

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                style,
                className
            )}
            {...props}
        >
            {status}
        </span>
    );
}

