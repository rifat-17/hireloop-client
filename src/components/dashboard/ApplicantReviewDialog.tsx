"use client";

import React, { useState } from "react";
import {
    Eye,
    Mail,
    Calendar,
    Briefcase,
    Building2,
    MapPin,
    FileText,
    ExternalLink,
    X,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicantStatusSelect } from "./ApplicantStatusSelect";
import { formatDate } from "@/lib/formatters";
import type { JobApplication, ApplicationStatus } from "@/types";

interface ApplicantReviewDialogProps {
    application: JobApplication;
    onStatusChange?: (newStatus: ApplicationStatus) => void;
    trigger?: React.ReactNode;
}

export function ApplicantReviewDialog({
    application,
    onStatusChange,
    trigger,
}: ApplicantReviewDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const candidateName = application.applicantName || "Applicant";
    const initials = candidateName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <>
            {trigger ? (
                <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    className="h-8 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                    title="View candidate details"
                >
                    <Eye className="size-4" />
                    <span className="sr-only">View candidate details</span>
                </Button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-black/80 sm:p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-white/5 pb-5">
                            <div className="flex items-start gap-3.5">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-600/15 text-sm font-bold text-violet-300">
                                    {initials || <User className="size-5" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {candidateName}
                                    </h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                        <a
                                            href={`mailto:${application.email}`}
                                            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 hover:underline"
                                        >
                                            <Mail className="size-3" />
                                            <span>{application.email}</span>
                                        </a>
                                        <span>•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Calendar className="size-3 text-gray-500" />
                                            Applied {formatDate(application.appliedDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                aria-label="Close dialog"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Status Pipeline Action */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Candidate Status
                                </p>
                                <p className="text-xs text-gray-500">
                                    Select the current stage in your hiring process
                                </p>
                            </div>
                            {onStatusChange ? (
                                <ApplicantStatusSelect
                                    status={application.status}
                                    onStatusChange={(newStatus) => {
                                        onStatusChange(newStatus);
                                    }}
                                />
                            ) : (
                                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                                    {application.status}
                                </span>
                            )}
                        </div>

                        {/* Applied Job Info */}
                        <div className="mt-5 space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Position Applied
                            </h4>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-white">
                                            {application.jobTitle}
                                        </p>
                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="size-3 text-gray-500" />
                                                {application.companyName}
                                            </span>
                                            {application.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="size-3 text-gray-500" />
                                                    {application.location}
                                                </span>
                                            )}
                                            {application.jobType && (
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="size-3 text-gray-500" />
                                                    {application.jobType}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {application.salary && (
                                        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
                                            {application.salary}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Resume & Documents */}
                        <div className="mt-5 space-y-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Application Documents
                            </h4>
                            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                                        <FileText className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Resume / CV
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {application.resumeUrl
                                                ? "Candidate uploaded resume"
                                                : "HireLoop Verified Profile & Resume"}
                                        </p>
                                    </div>
                                </div>

                                {application.resumeUrl ? (
                                    <a
                                        href={application.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
                                    >
                                        <span>View</span>
                                        <ExternalLink className="size-3" />
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                        Standard CV Attached
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter or Notes */}
                        {(application.coverLetter || application.notes) && (
                            <div className="mt-5 space-y-3">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Candidate Statement & Notes
                                </h4>
                                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-relaxed text-gray-300">
                                    {application.coverLetter || application.notes}
                                </div>
                            </div>
                        )}

                        {/* Actions Footer */}
                        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                            <a
                                href={`mailto:${application.email}?subject=Regarding your application for ${encodeURIComponent(
                                    application.jobTitle
                                )}`}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <Mail className="size-3.5" />
                                Contact Candidate
                            </a>

                            <Button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="h-9 rounded-xl bg-violet-600 px-5 text-xs font-semibold text-white shadow-md shadow-violet-900/30 transition hover:bg-violet-500"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

