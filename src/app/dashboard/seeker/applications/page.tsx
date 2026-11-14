"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    Building2,
    Calendar,
    Globe2,
    ExternalLink,
    Plus,
    FileText,
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
import { ApplicationStats } from "@/components/dashboard/ApplicationStats";
import { ApplicationDetailsDialog } from "@/components/dashboard/ApplicationDetailsDialog";

import { getMyApplications } from "@/lib/actions/applications";
import { useSession } from "@/lib/auth-client";
import { formatDate } from "@/lib/formatters";
import type { JobApplication, ApplicationStatus } from "@/types";

type StatusFilter = "All" | ApplicationStatus;

export default function SeekerApplicationsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    // Attempt to load live applications if available; fallback to dummy data
    useEffect(() => {
        const loadApplications = async () => {
            if (!user?.email) {
                setIsLoading(false);
                return;
            }

            try {
                const data = await getMyApplications(user.email);
                setApplications(data || []);
            } catch (error) {
                console.error("Failed to load applications:", error);
                setApplications([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadApplications();
    }, [user?.email]);

    const filteredApplications = useMemo(() => {
        return applications.filter((app) => {
            const query = searchQuery.toLowerCase();
            const matchesQuery =
                app.jobTitle.toLowerCase().includes(query) ||
                app.companyName.toLowerCase().includes(query) ||
                (app.category && app.category.toLowerCase().includes(query)) ||
                (app.location && app.location.toLowerCase().includes(query));

            const matchesStatus =
                statusFilter === "All" ? true : app.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [applications, searchQuery, statusFilter]);

    const statusOptions: StatusFilter[] = [
        "All",
        "Pending",
        "In Review",
        "Interviewing",
        "Offered",
        "Rejected",
    ];
    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-400">Loading applications...</p>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Page Header */}
            <PageHeader
                title="My Applications"
                description="Monitor the real-time review progress and feedback for all your submitted job applications."
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard/seeker" },
                    { label: "My Applications" },
                ]}
                actions={
                    <Link href="/browse-jobs">
                        <Button className="h-11 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500">
                            <Plus className="mr-2 size-4" />
                            Explore Jobs
                        </Button>
                    </Link>
                }
            />

            {/* Quick Stats Grid */}
            <ApplicationStats applications={applications} />

            {/* Search and Status Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by job title, company, or category..."
                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                    />
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {statusOptions.map((filter) => {
                        const count =
                            filter === "All"
                                ? applications.length
                                : applications.filter(
                                    (a) => a.status === filter
                                ).length;

                        const isSelected = statusFilter === filter;

                        return (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatusFilter(filter)}
                                className={`flex h-9 items-center gap-2 rounded-xl px-3.5 text-xs font-medium transition ${isSelected
                                        ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                                        : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                <span>{filter}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${isSelected
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

            {/* Applications Table Card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-xl shadow-black/20">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            <TableHead className="min-w-[220px]">
                                Job Title &amp; Company
                            </TableHead>
                            <TableHead className="min-w-[150px]">
                                Type &amp; Workplace
                            </TableHead>
                            <TableHead className="min-w-[140px]">
                                Compensation
                            </TableHead>
                            <TableHead className="min-w-[140px]">
                                Location
                            </TableHead>
                            <TableHead className="min-w-[130px]">
                                Applied Date
                            </TableHead>
                            <TableHead className="min-w-[110px]">
                                Status
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredApplications.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-44 text-center text-gray-400"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
                                            <FileText className="size-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">
                                                No job applications found
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Try adjusting your search criteria or explore new openings.
                                            </p>
                                        </div>
                                        <Link href="/browse-jobs">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-2 rounded-xl border-white/10 bg-white/5 text-xs text-violet-400 hover:border-violet-500/30 hover:bg-violet-600/10 hover:text-violet-300"
                                            >
                                                Browse Jobs
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredApplications.map((app) => (
                                <TableRow
                                    key={app._id}
                                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                                >
                                    {/* Job Title & Company */}
                                    <TableCell>
                                        <div className="flex items-start gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-600/10 text-violet-400">
                                                <Building2 className="size-4" />
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/browse-jobs/${app.jobId}`}
                                                    className="font-semibold text-white transition hover:text-violet-300"
                                                >
                                                    {app.jobTitle}
                                                </Link>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <span>{app.companyName}</span>
                                                    {app.category && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{app.category}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Type & Workplace */}
                                    <TableCell>
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                                                {app.jobType || "Full-time"}
                                            </span>
                                            {app.isRemote && (
                                                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                                                    <Globe2 className="size-3" />
                                                    <span>Remote</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Compensation */}
                                    <TableCell>
                                        <span className="text-xs font-medium text-gray-200">
                                            {app.salary || "Competitive"}
                                        </span>
                                    </TableCell>

                                    {/* Location */}
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                            <MapPin className="size-3 text-gray-500" />
                                            <span>{app.location || "Remote"}</span>
                                        </div>
                                    </TableCell>

                                    {/* Applied Date */}
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                            <Calendar className="size-3 text-gray-500" />
                                            <span>{formatDate(app.appliedDate)}</span>
                                        </div>
                                    </TableCell>

                                    {/* Status Badge */}
                                    <TableCell>
                                        <StatusBadge status={app.status} />
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <ApplicationDetailsDialog application={app} />
                                            <Link
                                                href={`/browse-jobs/${app.jobId}`}
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                                title="View live job post"
                                            >
                                                <ExternalLink className="size-4" />
                                            </Link>
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
