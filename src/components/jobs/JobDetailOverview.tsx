import React from "react";
import {
    Briefcase,
    Calendar,
    DollarSign,
    Globe2,
    MapPin,
    Users,
    Clock,
    Layers,
} from "lucide-react";
import { formatSalary, formatDate } from "@/lib/formatters";
import type { JobListing } from "@/types";

interface JobDetailOverviewProps {
    job: JobListing;
    className?: string;
}

export function JobDetailOverview({
    job,
    className = "",
}: JobDetailOverviewProps) {
    const overviewItems = [
        {
            icon: Briefcase,
            label: "Employment Type",
            value: job.jobType,
        },
        {
            icon: Layers,
            label: "Department / Category",
            value: job.category,
        },
        {
            icon: Globe2,
            label: "Workplace",
            value: job.isRemote ? "Remote Allowed" : "On-site",
        },
        {
            icon: MapPin,
            label: "Location",
            value: job.location || "Not specified",
        },
        {
            icon: DollarSign,
            label: "Salary Range",
            value: formatSalary(
                job.minSalary,
                job.maxSalary,
                job.salaryFrequency
            ),
        },
        {
            icon: Users,
            label: "Applications",
            value: `${job.applicantsCount || 0} Candidates`,
        },
        {
            icon: Calendar,
            label: "Application Deadline",
            value: job.deadline ? formatDate(job.deadline) : "Ongoing",
        },
        {
            icon: Clock,
            label: "Date Posted",
            value: job.postedDate || "Recently",
        },
    ];

    return (
        <div
            className={`rounded-2xl border border-white/10 bg-[#101014] p-5 shadow-xl shadow-black/20 sm:p-6 ${className}`}
        >
            <h2 className="border-b border-white/5 pb-4 text-base font-semibold text-white">
                Job Overview
            </h2>

            <div className="mt-4 space-y-4">
                {overviewItems.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-start gap-3.5 text-xs sm:text-sm"
                    >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                            <item.icon className="size-4" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-400">{item.label}</p>
                            <p className="font-medium text-gray-200">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

