import React from "react";
import { FileText, Clock, Users, CheckCircle2 } from "lucide-react";
import type { JobApplication } from "@/types";

interface ApplicationStatsProps {
    applications: JobApplication[];
}

export function ApplicationStats({ applications }: ApplicationStatsProps) {
    const total = applications.length;
    const inReview = applications.filter(
        (app) => app.status === "Pending" || app.status === "In Review"
    ).length;
    const interviewing = applications.filter(
        (app) => app.status === "Interviewing"
    ).length;
    const offers = applications.filter((app) => app.status === "Offered").length;

    const stats = [
        {
            label: "Total Applications",
            value: total,
            icon: FileText,
            color: "text-violet-400 bg-violet-600/10 border-violet-500/20",
        },
        {
            label: "In Review / Pending",
            value: inReview,
            icon: Clock,
            color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        },
        {
            label: "Interviewing",
            value: interviewing,
            icon: Users,
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        },
        {
            label: "Offers Received",
            value: offers,
            icon: CheckCircle2,
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#101014] p-4 shadow-xl shadow-black/20 sm:p-5"
                >
                    <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${stat.color}`}
                    >
                        <stat.icon className="size-5" />
                    </div>
                    <div>
                        <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            {stat.value}
                        </p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

