import React from "react";
import Link from "next/link";
import {
    Building2,
    MapPin,
    DollarSign,
    Calendar,
    Users,
    ArrowUpRight,
    Globe2,
} from "lucide-react";
import { formatSalary, formatDate } from "@/lib/formatters";
import type { JobListing } from "@/types";

interface JobCardProps {
    job: JobListing;
    className?: string;
}

export function JobCard({ job, className = "" }: JobCardProps) {
    return (
        <div
            className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#101014] p-5 sm:p-6 shadow-xl shadow-black/20 transition-all duration-200 hover:border-violet-500/40 hover:bg-[#131318] ${className}`}
        >
            <div>
                {/* Header: Company & Title */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-600/20 transition-colors">
                            <Building2 className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
                                {job.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                <span className="font-medium text-gray-300">
                                    {job.companyName}
                                </span>
                                <span>•</span>
                                <span>{job.category}</span>
                            </div>
                        </div>
                    </div>

                    <Link
                        href={`/jobs/${job._id || ""}`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:border-violet-500/40 hover:bg-violet-600 hover:text-white"
                        aria-label={`View details for ${job.title}`}
                    >
                        <ArrowUpRight className="size-4" />
                    </Link>
                </div>

                {/* Badges / Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {/* Job Type */}
                    <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
                        {job.jobType}
                    </span>

                    {/* Workplace / Remote */}
                    {job.isRemote && (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                            <Globe2 className="size-3" />
                            Remote
                        </span>
                    )}

                    {/* Location */}
                    {job.location && (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400">
                            <MapPin className="size-3 text-gray-500" />
                            {job.location}
                        </span>
                    )}

                    {/* Compensation */}
                    <span className="inline-flex items-center gap-1 rounded-lg border border-violet-500/20 bg-violet-600/10 px-2.5 py-1 text-xs font-semibold text-violet-300">
                        <DollarSign className="size-3" />
                        {formatSalary(
                            job.minSalary,
                            job.maxSalary,
                            job.salaryFrequency
                        )}
                    </span>
                </div>

                {/* Responsibilities / Snippet if available */}
                {job.responsibilities && (
                    <p className="mt-3.5 line-clamp-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {job.responsibilities}
                    </p>
                )}
            </div>

            {/* Footer info: Applicants & Deadline */}
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-gray-400" />
                    <span>
                        <strong className="text-gray-300">
                            {job.applicantsCount || 0}
                        </strong>{" "}
                        applicants
                    </span>
                </div>

                {job.deadline && (
                    <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-gray-400" />
                        <span>Deadline: {formatDate(job.deadline)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

