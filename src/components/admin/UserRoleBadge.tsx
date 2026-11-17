"use client";

import React from "react";
import { ShieldCheck, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface UserRoleBadgeProps {
    role: UserRole | string;
    className?: string;
    showIcon?: boolean;
}

export function UserRoleBadge({
    role,
    className,
    showIcon = true,
}: UserRoleBadgeProps) {
    const normalizedRole = (role || "seeker").toLowerCase() as UserRole;

    const config = {
        admin: {
            label: "Admin",
            icon: ShieldCheck,
            badgeClass: "border-purple-500/20 bg-purple-500/10 text-purple-400",
            dotClass: "bg-purple-400",
        },
        recruiter: {
            label: "Recruiter",
            icon: Briefcase,
            badgeClass: "border-sky-500/20 bg-sky-500/10 text-sky-400",
            dotClass: "bg-sky-400",
        },
        seeker: {
            label: "Job Seeker",
            icon: User,
            badgeClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
            dotClass: "bg-emerald-400",
        },
    }[normalizedRole] || {
        label: role,
        icon: User,
        badgeClass: "border-white/10 bg-white/5 text-gray-300",
        dotClass: "bg-gray-400",
    };

    const Icon = config.icon;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                config.badgeClass,
                className
            )}
        >
            {showIcon && <Icon className="size-3" />}
            <span>{config.label}</span>
        </span>
    );
}

