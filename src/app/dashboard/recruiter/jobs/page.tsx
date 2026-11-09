"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Plus,
    Search,
    MapPin,
    Users,
    Trash2,
    ExternalLink,
    Building2,
    Briefcase,
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
import type {
    JobFormData,
    SalaryFrequency,
} from "@/app/dashboard/recruiter/jobs/new/page";

export interface JobListing extends JobFormData {
    id: string;
    status: "Active" | "Expired" | "Draft";
    applicantsCount: number;
    postedDate: string;
}

const DUMMY_JOBS: JobListing[] = [
    {
        id: "job-1",
        title: "Frontend Developer",
        companyName: "HirePulse Network",
        category: "Engineering & Tech",
        jobType: "Full-time",
        isRemote: true,
        location: "New York, USA",
        deadline: "2025-05-30",
        minSalary: "40",
        maxSalary: "55",
        salaryFrequency: "per hour",
        responsibilities:
            "Deliver exceptional UI experiences and collaborate with system designers to craft micro-interactions.",
        requirements:
            "3+ years of experience with React, TypeScript, and modern state architectures.",
        status: "Active",
        applicantsCount: 34,
        postedDate: "Posted 4d ago",
    },
    {
        id: "job-2",
        title: "Senior Product Designer",
        companyName: "HirePulse Labs",
        category: "Design & Creative",
        jobType: "Full-time",
        isRemote: false,
        location: "London, UK (Hybrid)",
        deadline: "2025-06-15",
        minSalary: "90000",
        maxSalary: "115000",
        salaryFrequency: "per year",
        responsibilities:
            "Lead end-to-end design across mobile and desktop interfaces, crafting scalable design tokens.",
        requirements:
            "5+ years of experience in Figma, design systems, and rapid prototyping.",
        status: "Active",
        applicantsCount: 19,
        postedDate: "Posted 1w ago",
    },
    {
        id: "job-3",
        title: "DevOps Specialist",
        companyName: "HirePulse Platform",
        category: "Engineering & Tech",
        jobType: "Full-time",
        isRemote: false,
        location: "Berlin, Germany",
        deadline: "2025-06-30",
        minSalary: "95000",
        maxSalary: "120000",
        salaryFrequency: "per year",
        responsibilities:
            "Automate CI/CD pipelines, manage Kubernetes clusters, and optimize cloud infrastructure.",
        requirements:
            "Kubernetes, Docker, Terraform, AWS/GCP, and monitoring tools.",
        status: "Active",
        applicantsCount: 12,
        postedDate: "Posted 2w ago",
    },
    {
        id: "job-4",
        title: "Product Marketing Lead",
        companyName: "HirePulse Network",
        category: "Marketing & Sales",
        jobType: "Full-time",
        isRemote: true,
        location: "Remote (EU/US)",
        deadline: "2025-07-10",
        minSalary: "85000",
        maxSalary: "105000",
        salaryFrequency: "per year",
        responsibilities:
            "Drive go-to-market strategies, campaign execution, and user acquisition pipelines.",
        requirements:
            "Proven track record in B2B SaaS growth and successful product launches.",
        status: "Active",
        applicantsCount: 27,
        postedDate: "Posted 3w ago",
    },
    {
        id: "job-5",
        title: "QA Automation Engineer",
        companyName: "HirePulse Network",
        category: "Engineering & Tech",
        jobType: "Part-time",
        isRemote: false,
        location: "Dublin, Ireland (Hybrid)",
        deadline: "2025-05-01",
        minSalary: "50",
        maxSalary: "65",
        salaryFrequency: "per hour",
        responsibilities:
            "Build robust automated test suites with Playwright, Jest, and integration test runners.",
        requirements:
            "2+ years automation experience, API testing, and CI pipeline integrations.",
        status: "Expired",
        applicantsCount: 8,
        postedDate: "Closed",
    },
];

function formatSalary(
    min: string,
    max: string,
    freq: SalaryFrequency
): string {
    const formatNum = (val: string) => {
        const n = Number(val);
        if (isNaN(n) || n === 0) return val;
        if (n >= 1000) return `${Math.round(n / 1000)}k`;
        return `${n}`;
    };

    const freqLabel =
        freq === "per hour" ? "/ hr" : freq === "per month" ? "/ mo" : "/ yr";
    if (min && max) {
        return `$${formatNum(min)} - $${formatNum(max)} ${freqLabel}`;
    }
    if (min) {
        return `$${formatNum(min)} ${freqLabel}`;
    }
    return "Competitive";
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export default function ManageJobsPage() {
    const [jobs, setJobs] = useState<JobListing[]>(DUMMY_JOBS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Expired">("All");

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesQuery =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "All" ? true : job.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [jobs, searchQuery, statusFilter]);

    const handleDelete = (id: string) => {
        setJobs((prev) => prev.filter((j) => j.id !== id));
    };

    const activeCount = jobs.filter((j) => j.status === "Active").length;
    const expiredCount = jobs.filter((j) => j.status === "Expired").length;

    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Top Breadcrumb & Page Headings */}
            <div>
                <nav className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-gray-400">Manage Jobs</span>
                    <ChevronRight className="size-4 text-gray-600" />
                    <span className="font-medium text-gray-200">
                        Job Listings &amp; Postings
                    </span>
                </nav>

                <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Manage Job Posts
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Review live listings, monitor applicants, and update job details across your organization.
                        </p>
                    </div>

                    <Link href="/dashboard/recruiter/jobs/new">
                        <Button className="h-11 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500">
                            <Plus className="mr-2 size-4" />
                            + New Job Post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
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
                                className={`flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-medium transition ${isSelected
                                    ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                                    : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                <span>{filter}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${isSelected
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
            <div className="rounded-2xl border border-white/10 bg-[#101014] shadow-xl shadow-black/20">
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
                        {filteredJobs.length === 0 ? (
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
                                    key={job.id}
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
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${job.status === "Active"
                                                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                                                }`}
                                        >
                                            {job.status}
                                        </span>
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
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(job.id)}
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                                                title="Delete posting"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
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
