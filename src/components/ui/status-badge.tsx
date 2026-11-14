import * as React from "react";
import { cn } from "@/lib/utils";
import type { JobStatus, ApplicationStatus } from "@/types";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    status: JobStatus | ApplicationStatus | string;
}

const statusStyles: Record<string, string> = {
    // Job Statuses
    Active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Expired: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Draft: "border-white/10 bg-white/5 text-gray-400",

    // Application Statuses
    Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    "In Review": "border-sky-500/20 bg-sky-500/10 text-sky-400",
    Interviewing: "border-violet-500/20 bg-violet-600/10 text-violet-400",
    Offered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Rejected: "border-red-500/20 bg-red-500/10 text-red-400",
    Withdrawn: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
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
