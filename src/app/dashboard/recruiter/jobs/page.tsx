"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    MapPin,
    Users,
    ExternalLink,
    Building2,
    Briefcase,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DeleteJobDialog } from "@/components/dashboard/DeleteJobDialog";
import { getJobs } from "@/lib/api/jobs";
import { formatSalary, formatDate } from "@/lib/formatters";
import type { JobListing } from "@/types";

export type { JobListing };

type StatusFilter = "All" | "Active" | "Expired";

export default function ManageJobsPage() {
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getJobs();
                setJobs(data || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const query = searchQuery.toLowerCase();
            const matchesQuery =
                job.title?.toLowerCase().includes(query) ||
                job.companyName?.toLowerCase().includes(query) ||
                job.category?.toLowerCase().includes(query) ||
                job.location?.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "All" ? true : job.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [jobs, searchQuery, statusFilter]);

    const handleJobDeleted = (jobId: string) => {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    };

    const activeCount = jobs.filter((j) => j.status === "Active").length;
    const expiredCount = jobs.filter((j) => j.status === "Expired").length;

    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Top Breadcrumb & Page Headings */}
            <PageHeader
                title="Manage Job Posts"
                description="Review live listings, monitor applicants, and update job details across your organization."
                breadcrumbs={[
                    { label: "Manage Jobs" },
                    { label: "Job Listings & Postings" },
                ]}
                actions={
                    <Link href="/dashboard/recruiter/jobs/new">
                        <Button className="h-11 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500">
                            <Plus className="mr-2 size-4" />
                            + New Job Post
                        </Button>
                    </Link>
                }
            />

            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, department, company..."
                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {(["All", "Active", "Expired"] as const).map((filter) => {
                        const count =
                            filter === "All"
                                ? jobs.length
                                : filter === "Active"
                                ? activeCount
                                : expiredCount;
                        const isSelected = statusFilter === filter;
                        return (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatusFilter(filter)}
                                className={`flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium transition ${
                                    isSelected
                                        ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                                        : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                }`}
                            >
                                <span>{filter}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                        isSelected
                                            ? "bg-white/20 text-white"
                                            : "bg-white/10 text-gray-400"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Responsive Table Card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-xl shadow-black/20">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            <TableHead className="min-w-[220px]">
                                Job Title &amp; Dept
                            </TableHead>
                            <TableHead className="min-w-[190px]">
                                Company &amp; Location
                            </TableHead>
                            <TableHead className="min-w-[110px]">Type</TableHead>
                            <TableHead className="min-w-[140px]">
                                Compensation
                            </TableHead>
                            <TableHead className="min-w-[140px]">
                                Applicants
                            </TableHead>
                            <TableHead className="min-w-[100px]">Status</TableHead>
                            <TableHead className="min-w-[130px]">
                                Deadline
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-36 text-center text-gray-400"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="size-5 animate-spin text-violet-400" />
                                        <span>Loading job postings...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredJobs.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-36 text-center text-gray-400"
                                >
                                    No job posts match your criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredJobs.map((job) => (
                                <TableRow
                                    key={job._id}
                                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                                >
                                    {/* Job Title & Dept */}
                                    <TableCell>
                                        <div className="flex items-start gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                                                <Briefcase className="size-4" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {job.title}
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {job.category}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Company & Location */}
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-200">
                                                <Building2 className="size-3.5 text-gray-500" />
                                                <span>{job.companyName}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <MapPin className="size-3 text-gray-500" />
                                                <span>
                                                    {job.isRemote
                                                        ? `Remote (${job.location})`
                                                        : job.location}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Type */}
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
                                            {job.jobType}
                                        </span>
                                    </TableCell>

                                    {/* Compensation */}
                                    <TableCell>
                                        <span className="text-sm font-medium text-gray-200">
                                            {formatSalary(
                                                job.minSalary,
                                                job.maxSalary,
                                                job.salaryFrequency
                                            )}
                                        </span>
                                    </TableCell>

                                    {/* Applicants */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Users className="size-4 text-violet-400" />
                                            <span className="text-sm font-semibold text-white">
                                                {job.applicantsCount} Candidates
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <StatusBadge status={job.status} />
                                    </TableCell>

                                    {/* Deadline */}
                                    <TableCell>
                                        <div>
                                            <p className="text-sm font-medium text-gray-300">
                                                {formatDate(job.deadline)}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {job.postedDate}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/jobs`}
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                                title="View public job"
                                            >
                                                <ExternalLink className="size-4" />
                                            </Link>
                                            <DeleteJobDialog
                                                job={job}
                                                onDeleted={handleJobDeleted}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
