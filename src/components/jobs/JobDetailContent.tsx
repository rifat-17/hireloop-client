"use client";

import React from "react";
import { FileText, CheckCircle2, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JobListing } from "@/types";

interface JobDetailContentProps {
    job: JobListing;
    onApply?: () => void;
    className?: string;
}

function FormattedList({ text }: { text: string }) {
    if (!text) return null;

    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) return null;

    return (
        <ul className="space-y-3">
            {lines.map((line, idx) => {
                const cleanLine = line.replace(/^[-*•]\s*/, "");
                return (
                    <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                    >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                        <span>{cleanLine}</span>
                    </li>
                );
            })}
        </ul>
    );
}

export function JobDetailContent({
    job,
    onApply = () => {},
    className = "",
}: JobDetailContentProps) {
    return (
        <div className={`space-y-6 sm:space-y-8 ${className}`}>
            {/* Responsibilities Section */}
            {job.responsibilities && (
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-5 flex items-center gap-2.5 border-b border-white/5 pb-4">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                            <FileText className="size-4" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">
                            Key Responsibilities
                        </h2>
                    </div>

                    <FormattedList text={job.responsibilities} />
                </div>
            )}

            {/* Requirements Section */}
            {job.requirements && (
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-5 flex items-center gap-2.5 border-b border-white/5 pb-4">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                            <CheckCircle2 className="size-4" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">
                            Qualifications &amp; Requirements
                        </h2>
                    </div>

                    <FormattedList text={job.requirements} />
                </div>
            )}

            {/* Bottom CTA Card */}
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/30 via-[#101014] to-violet-950/20 p-6 sm:p-8 shadow-2xl">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-violet-400">
                            <Sparkles className="size-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">
                                Career Opportunity
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">
                            Ready to join {job.companyName}?
                        </h3>
                        <p className="text-xs text-gray-400 sm:text-sm">
                            Submit your profile and resume now to connect with the hiring team.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={onApply}
                        className="h-11 shrink-0 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 active:scale-[0.99]"
                    >
                        <Send className="mr-2 size-4" />
                        Apply for this Role
                    </Button>
                </div>
            </div>
        </div>
    );
}

