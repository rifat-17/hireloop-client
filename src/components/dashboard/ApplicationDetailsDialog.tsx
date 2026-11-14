"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Eye,
    Building2,
    Calendar,
    DollarSign,
    MapPin,
    Globe2,
    Briefcase,
    ExternalLink,
    FileText,
    Clock,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/formatters";
import type { JobApplication } from "@/types";

interface ApplicationDetailsDialogProps {
    application: JobApplication;
}

export function ApplicationDetailsDialog({
    application,
}: ApplicationDetailsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="h-8 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                title="View application details"
            >
                <Eye className="size-4" />
                <span className="sr-only">View Details</span>
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-black/80 sm:p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-white/5 pb-4">
                            <div className="flex items-start gap-3.5">
                                <div className="flex size-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10 text-violet-400">
                                    <Building2 className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white sm:text-lg">
                                        {application.jobTitle}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {application.companyName} • {application.category}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                aria-label="Close dialog"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Status & Meta Summary */}
                        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                            <span className="text-xs text-gray-400">Current Status</span>
                            <StatusBadge status={application.status} />
                        </div>

                        {/* Details Grid */}
                        <div className="mt-5 grid grid-cols-2 gap-3.5 text-xs">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Briefcase className="size-3.5 text-violet-400" />
                                    <span>Employment</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {application.jobType || "Full-time"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Globe2 className="size-3.5 text-violet-400" />
                                    <span>Workplace</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {application.isRemote ? "Remote Work" : "On-site"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <DollarSign className="size-3.5 text-violet-400" />
                                    <span>Compensation</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {application.salary || "Competitive"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin className="size-3.5 text-violet-400" />
                                    <span>Location</span>
                                </div>
                                <p className="mt-1 truncate font-medium text-gray-200">
                                    {application.location || "Remote"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar className="size-3.5 text-violet-400" />
                                    <span>Applied On</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {formatDate(application.appliedDate)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock className="size-3.5 text-violet-400" />
                                    <span>Deadline</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {formatDate(application.deadline)}
                                </p>
                            </div>
                        </div>

                        {/* Notes / Updates */}
                        {application.notes && (
                            <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-600/5 p-3.5">
                                <div className="flex items-center gap-2 text-xs font-medium text-violet-400">
                                    <FileText className="size-3.5" />
                                    <span>Application Notes &amp; Updates</span>
                                </div>
                                <p className="mt-1.5 text-xs text-gray-300 leading-relaxed">
                                    {application.notes}
                                </p>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                            <Link
                                href={`/browse-jobs/${application.jobId}`}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300"
                            >
                                <span>View live job listing</span>
                                <ExternalLink className="size-3.5" />
                            </Link>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

