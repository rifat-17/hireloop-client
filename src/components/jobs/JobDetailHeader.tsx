"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    MapPin,
    DollarSign,
    Globe2,
    Send,
    Bookmark,
    Share2,
    Check,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatSalary } from "@/lib/formatters";
import type { JobListing, JobApplicationInput } from "@/types";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { applyToAJob, getApplicationsCount } from "@/lib/actions/applications";
import { toast } from "@/components/ui/toast";

interface JobDetailHeaderProps {
    job: JobListing;
    onApply?: () => void;
    onSave?: () => void;
}

export function JobDetailHeader({
    job,
    onApply = () => { },
    onSave = () => { },
}: JobDetailHeaderProps) {
    const [copied, setCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter();

    const handleApplyNow = async () => {
        if (!user) {
            router.push(`/login/?redirectTo=/browse-jobs/${job._id}`);
            return;
        }

        if (user.role !== "seeker") {
            toast.add({
                title: "Action Not Permitted",
                description: "Only job seekers can apply for positions.",
                type: "warning",
            });
            return;
        }

        setIsApplying(true);

        try {

            // number of jobs applied by this user,

            const countResult = await getApplicationsCount(`applicantId=${user.id}`);
            //less more than 10 and not premium user
            if (countResult.count >= 10) {
                // redirect to the payment page
                router.push('/payment');
                return;
            }

            else {
                const application: JobApplicationInput = {
                    jobId: job._id,
                    userId: user.id,
                    email: user.email,
                    applicantName: user.name || "Job Seeker",
                    jobTitle: job.title,
                    companyName: job.companyName,
                    category: job.category,
                    jobType: job.jobType,
                    location: job.location,
                    isRemote: Boolean(job.isRemote),
                    salary: formatSalary(
                        job.minSalary,
                        job.maxSalary,
                        job.salaryFrequency
                    ),
                    minSalary: job.minSalary,
                    maxSalary: job.maxSalary,
                    salaryFrequency: job.salaryFrequency,
                    deadline: job.deadline,
                    status: "Pending",
                    appliedDate: new Date().toISOString(),
                };

                const result = await applyToAJob(application);

                if (result.insertedId || result.acknowledged) {
                    toast.add({
                        title: "Application Submitted Successfully!",
                        description: `Your application for ${job.title} at ${job.companyName} has been received.`,
                        type: "success",
                    });
                    onApply();
                    router.push("/dashboard/seeker/applications");
                } else {
                    toast.add({
                        title: "Submission Failed",
                        description:
                            result.message ||
                            "Could not submit your application. Please try again.",
                        type: "error",
                    });
                }
            }


        } catch (error) {
            console.error("Application error:", error);
            toast.add({
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
                type: "error",
            });
        } finally {
            setIsApplying(false);
        }
    };

    const handleShare = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSaveToggle = () => {
        setIsSaved((prev) => !prev);
        onSave();
    };

    return (
        <div className="space-y-6">
            {/* Back Link */}
            <div>
                <Link
                    href="/browse-jobs"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-violet-400"
                >
                    <ArrowLeft className="size-4" />
                    <span>Back to all jobs</span>
                </Link>
            </div>

            {/* Header Card */}
            <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-black/40 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Company & Title info */}
                    <div className="flex items-start gap-4 sm:gap-5">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-600/10 text-violet-400 sm:size-16">
                            <Building2 className="size-7 sm:size-8" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-sm font-semibold text-gray-300">
                                    {job.companyName}
                                </span>
                                <span className="text-gray-600">•</span>
                                <span className="text-xs text-gray-400">
                                    {job.category}
                                </span>
                                <StatusBadge status={job.status} />
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                                {job.title}
                            </h1>

                            {/* Badges Row */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                                    {job.jobType}
                                </span>

                                {job.isRemote && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                        <Globe2 className="size-3.5" />
                                        Remote Work
                                    </span>
                                )}

                                {job.location && (
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                                        <MapPin className="size-3.5 text-gray-400" />
                                        {job.location}
                                    </span>
                                )}

                                <span className="inline-flex items-center gap-1 rounded-lg border border-violet-500/20 bg-violet-600/10 px-3 py-1 text-xs font-semibold text-violet-300">
                                    <DollarSign className="size-3.5" />
                                    {formatSalary(
                                        job.minSalary,
                                        job.maxSalary,
                                        job.salaryFrequency
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleSaveToggle}
                            className={`h-11 rounded-xl border-white/10 bg-white/5 px-4 text-xs font-medium transition ${isSaved
                                ? "border-violet-500/40 bg-violet-600/20 text-violet-300"
                                : "text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                                }`}
                            aria-label="Save this job"
                        >
                            <Bookmark
                                className={`mr-2 size-4 ${isSaved ? "fill-violet-400 text-violet-400" : ""
                                    }`}
                            />
                            {isSaved ? "Saved" : "Save Job"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleShare}
                            className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-xs font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                            aria-label="Share this job link"
                        >
                            {copied ? (
                                <>
                                    <Check className="mr-2 size-4 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Share2 className="mr-2 size-4" />
                                    Share
                                </>
                            )}
                        </Button>

                        <Button
                            type="button"
                            onClick={handleApplyNow}
                            disabled={isApplying}
                            className="h-11 rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 active:scale-[0.99] disabled:opacity-60"
                        >
                            {isApplying ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 size-4" />
                                    Apply Now
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

