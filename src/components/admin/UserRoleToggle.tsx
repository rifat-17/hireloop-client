"use client";

import React from "react";
import { ShieldCheck, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface UserRoleToggleProps {
    currentRole: UserRole | string;
    onRoleChange: (newRole: UserRole) => void;
    disabled?: boolean;
    className?: string;
}

interface RoleOption {
    role: UserRole;
    label: string;
    icon: typeof User;
    activeClass: string;
}

const ROLES: RoleOption[] = [
    {
        role: "seeker",
        label: "Seeker",
        icon: User,
        activeClass:
            "bg-emerald-600 text-white shadow-sm shadow-emerald-950/40 font-semibold",
    },
    {
        role: "recruiter",
        label: "Recruiter",
        icon: Briefcase,
        activeClass:
            "bg-sky-600 text-white shadow-sm shadow-sky-950/40 font-semibold",
    },
    {
        role: "admin",
        label: "Admin",
        icon: ShieldCheck,
        activeClass:
            "bg-purple-600 text-white shadow-sm shadow-purple-950/40 font-semibold",
    },
];

export function UserRoleToggle({
    currentRole,
    onRoleChange,
    disabled = false,
    className,
}: UserRoleToggleProps) {
    const normalizedRole = (currentRole || "seeker").toLowerCase() as UserRole;

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-xl border border-white/10 bg-[#16161d] p-1 shadow-inner",
                disabled && "opacity-60 pointer-events-none",
                className
            )}
            role="group"
            aria-label="Toggle user role"
        >
            {ROLES.map(({ role, label, icon: Icon, activeClass }) => {
                const isActive = normalizedRole === role;

                return (
                    <button
                        key={role}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            if (!isActive) {
                                onRoleChange(role);
                            }
                        }}
                        className={cn(
                            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150",
                            isActive
                                ? activeClass
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                        )}
                        title={`Make ${label}`}
                        aria-pressed={isActive}
                    >
                        <Icon className="size-3" />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}

