"use client";

import React from "react";
import { Users, User, Briefcase, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { AppUser } from "@/types";

interface UserStatsCardsProps {
    users: AppUser[];
}

export function UserStatsCards({ users }: UserStatsCardsProps) {
    const total = users.length;
    const seekers = users.filter((u) => u.role === "seeker").length;
    const recruiters = users.filter((u) => u.role === "recruiter").length;
    const admins = users.filter((u) => u.role === "admin").length;
    const verified = users.filter((u) => Boolean(u.emailVerified)).length;

    const stats = [
        {
            label: "Total Accounts",
            value: total,
            icon: Users,
            color: "text-white",
            bg: "border-white/10 bg-[#101014]",
            iconColor: "text-violet-400",
        },
        {
            label: "Job Seekers",
            value: seekers,
            icon: User,
            color: "text-emerald-300",
            bg: "border-emerald-500/20 bg-emerald-500/5",
            iconColor: "text-emerald-400",
        },
        {
            label: "Recruiters",
            value: recruiters,
            icon: Briefcase,
            color: "text-sky-300",
            bg: "border-sky-500/20 bg-sky-500/5",
            iconColor: "text-sky-400",
        },
        {
            label: "Administrators",
            value: admins,
            icon: ShieldCheck,
            color: "text-purple-300",
            bg: "border-purple-500/20 bg-purple-500/5",
            iconColor: "text-purple-400",
        },
        {
            label: "Verified Emails",
            value: verified,
            icon: CheckCircle2,
            color: "text-teal-300",
            bg: "border-teal-500/20 bg-teal-500/5",
            iconColor: "text-teal-400",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className={`rounded-2xl border p-4 shadow-sm transition hover:border-white/20 ${stat.bg}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400">
                                {stat.label}
                            </span>
                            <div className={`rounded-lg bg-white/5 p-1.5 ${stat.iconColor}`}>
                                <Icon className="size-4" />
                            </div>
                        </div>
                        <p className={`mt-3 text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

