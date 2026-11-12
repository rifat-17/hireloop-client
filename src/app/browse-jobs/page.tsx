import React from "react";
import { getJobs } from "@/lib/api/jobs";
import { JobSearchBar, JobFilterSidebar, JobCard } from "@/components/jobs";
import { Briefcase } from "lucide-react";
import type { JobListing } from "@/types";

interface BrowseJobsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowseJobsPage({
    searchParams,
}: BrowseJobsPageProps) {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();

    let jobs: JobListing[] = [];
    try {
        const result = await getJobs(query);
        jobs = Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Failed to load jobs:", error);
    }

    return (
        <main className="min-h-screen bg-[#09090c] pb-24 text-slate-100">
            {/* Top Search & Hero Section */}
            <div className="relative border-b border-white/5 bg-gradient-to-b from-[#101014] to-[#09090c] px-4 pt-10 pb-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-600/10 px-3.5 py-1 text-xs font-medium text-violet-400">
                        <span className="size-1.5 rounded-full bg-violet-400" />
                        Explore Available Roles
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Find Your Next Opportunity
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
                        Browse thousands of curated opportunities from leading tech companies, startups, and remote teams.
                    </p>

                    <div className="mt-8">
                        <JobSearchBar />
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Left Column: Filter Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20">
                            <JobFilterSidebar />
                        </div>
                    </div>

                    {/* Right Column: Job Listings Feed */}
                    <div className="lg:col-span-3">
                        {/* Results Count & Meta Header */}
                        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    All Job Postings
                                </h2>
                                <p className="text-xs text-gray-400">
                                    Showing{" "}
                                    <span className="font-medium text-violet-400">
                                        {jobs.length}
                                    </span>{" "}
                                    available {jobs.length === 1 ? "position" : "positions"}
                                </p>
                            </div>
                        </div>

                        {/* Jobs Grid / List */}
                        {jobs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101014] p-12 text-center">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
                                    <Briefcase className="size-6" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-white">
                                    No job posts found
                                </h3>
                                <p className="mt-1 max-w-sm text-xs text-gray-400">
                                    There are currently no listings matching your search criteria. Check back soon or try adjusting your filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:gap-5">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
