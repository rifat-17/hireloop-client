import React from "react";
import Link from "next/link";
import { Building2, CheckCircle2, MapPin, ExternalLink } from "lucide-react";
import type { JobListing } from "@/types";

interface CompanyInfoCardProps {
    job: JobListing;
    className?: string;
}

export function CompanyInfoCard({ job, className = "" }: CompanyInfoCardProps) {
    return (
        <div
            className={`rounded-2xl border border-white/10 bg-[#101014] p-5 shadow-xl shadow-black/20 sm:p-6 ${className}`}
        >
            <h2 className="border-b border-white/5 pb-4 text-base font-semibold text-white">
                About the Company
            </h2>

            <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3.5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10 text-violet-400">
                        <Building2 className="size-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-white">
                                {job.companyName}
                            </h3>
                            <span title="Verified Employer">
                                <CheckCircle2
                                    className="size-4 text-emerald-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                        <p className="text-xs text-gray-400">{job.category}</p>
                    </div>
                </div>

                {job.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <MapPin className="size-3.5 text-gray-400" />
                        <span>Based in {job.location}</span>
                    </div>
                )}

                <p className="text-xs text-gray-400 leading-relaxed">
                    {job.companyName} is actively hiring top talent through HireLoop. Verified and compliant organization.
                </p>

                <div className="pt-2">
                    <Link
                        href={`/browse-jobs?q=${encodeURIComponent(job.companyName)}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-gray-300 transition hover:border-violet-500/30 hover:bg-violet-600/10 hover:text-white"
                    >
                        <span>More jobs from this company</span>
                        <ExternalLink className="size-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
