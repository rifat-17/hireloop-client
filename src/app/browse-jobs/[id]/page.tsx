import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Briefcase } from "lucide-react";
import { getJobById } from "@/lib/api/jobs";
import {
    JobDetailHeader,
    JobDetailOverview,
    JobDetailContent,
    CompanyInfoCard,
} from "@/components/jobs";
import { Button } from "@/components/ui/button";

interface JobDetailsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: JobDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        return {
            title: "Job Not Found | HireLoop",
        };
    }

    return {
        title: `${job.title} at ${job.companyName} | HireLoop`,
        description: `Apply for ${job.title} at ${job.companyName}. Located in ${
            job.location || "Remote"
        }.`,
    };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        return (
            <main className="min-h-screen bg-[#09090c] px-4 py-20 text-slate-100">
                <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#101014] p-8 text-center shadow-2xl">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
                        <Briefcase className="size-6" />
                    </div>
                    <h1 className="mt-4 text-xl font-bold text-white">
                        Job Posting Not Found
                    </h1>
                    <p className="mt-2 text-xs text-gray-400">
                        The job listing you are looking for may have been removed, expired, or is temporarily unavailable.
                    </p>
                    <div className="mt-6">
                        <Link href="/browse-jobs">
                            <Button className="h-10 rounded-xl bg-violet-600 px-6 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 hover:bg-violet-500">
                                <ArrowLeft className="mr-2 size-4" />
                                Return to Browse Jobs
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#09090c] pb-24 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
                {/* Hero / Header Card */}
                <JobDetailHeader job={job} />

                {/* 2-Column Content Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Left Column: Job Details */}
                    <div className="lg:col-span-2">
                        <JobDetailContent job={job} />
                    </div>

                    {/* Right Sidebar Column: Overview & Company Info */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="sticky top-20 space-y-6">
                            <JobDetailOverview job={job} />
                            <CompanyInfoCard job={job} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
