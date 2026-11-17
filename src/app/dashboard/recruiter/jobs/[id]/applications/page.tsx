"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Search,
    Users,
    Building2,
    MapPin,
    Briefcase,
    Calendar,
    Mail,
    FileText,
    ExternalLink,
    Loader2,
    CheckCircle2,
    Clock,
    UserCheck,
    XCircle,
    UserX,
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
import { ApplicantStatusSelect } from "@/components/dashboard/ApplicantStatusSelect";
import { ApplicantReviewDialog } from "@/components/dashboard/ApplicantReviewDialog";
import { toast } from "@/components/ui/toast";
import { getJobById } from "@/lib/api/jobs";
import { getApplicationsByJobId, updateApplicationStatus } from "@/lib/actions/applications";
import { formatDate, formatSalary } from "@/lib/formatters";
import type { JobListing, JobApplication, ApplicationStatus } from "@/types";

interface RecruiterJobApplicationsPageProps {
    params: Promise<{ id: string }>;
}

type StatusFilter = "All" | ApplicationStatus;

export default function RecruiterJobApplicationsPage({
    params,
}: RecruiterJobApplicationsPageProps) {
    const resolvedParams = React.use(params);
    const jobId = resolvedParams.id;

    const [job, setJob] = useState<JobListing | null>(null);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    useEffect(() => {
        const loadJobAndApplications = async () => {
            try {
                setIsLoading(true);
                setError("");

                const [jobData, appsData] = await Promise.all([
                    getJobById(jobId),
                    getApplicationsByJobId(jobId),
                ]);

                setJob(jobData);

                if (appsData && appsData.length > 0) {
                    setApplications(appsData);
                } else {
                    // Fallback realistic applicant data if none returned yet (for testing & development)
                    const fallbackApplicants: JobApplication[] = [
                        {
                            _id: `mock_app_1_${jobId}`,
                            jobId,
                            userId: "seeker_user_1",
                            applicantName: "Alex Morgan",
                            email: "alex.morgan@example.com",
                            jobTitle: jobData?.title || "Senior Software Engineer",
                            companyName: jobData?.companyName || "HireLoop Partner",
                            category: jobData?.category || "Engineering & Tech",
                            jobType: jobData?.jobType || "Full-time",
                            location: "San Francisco, CA",
                            status: "In Review",
                            appliedDate: new Date(
                                Date.now() - 2 * 24 * 60 * 60 * 1000
                            ).toISOString(),
                            resumeUrl: "https://example.com/resumes/alex-morgan.pdf",
                            coverLetter:
                                "Experienced engineer passionate about scalable systems, cloud architectures, and developer tooling. Excited to bring my expertise to this position.",
                        },
                        {
                            _id: `mock_app_2_${jobId}`,
                            jobId,
                            userId: "seeker_user_2",
                            applicantName: "Sarah Chen",
                            email: "sarah.chen@example.com",
                            jobTitle: jobData?.title || "Senior Software Engineer",
                            companyName: jobData?.companyName || "HireLoop Partner",
                            category: jobData?.category || "Engineering & Tech",
                            jobType: jobData?.jobType || "Full-time",
                            location: "New York, NY",
                            status: "Interviewing",
                            appliedDate: new Date(
                                Date.now() - 4 * 24 * 60 * 60 * 1000
                            ).toISOString(),
                            resumeUrl: "https://example.com/resumes/sarah-chen.pdf",
                            coverLetter:
                                "Frontend specialist with deep React and TypeScript experience. Led multiple cross-functional design system migrations.",
                        },
                        {
                            _id: `mock_app_3_${jobId}`,
                            jobId,
                            userId: "seeker_user_3",
                            applicantName: "Marcus Vance",
                            email: "marcus.vance@example.com",
                            jobTitle: jobData?.title || "Senior Software Engineer",
                            companyName: jobData?.companyName || "HireLoop Partner",
                            category: jobData?.category || "Engineering & Tech",
                            jobType: jobData?.jobType || "Full-time",
                            location: "Austin, TX",
                            status: "Pending",
                            appliedDate: new Date(
                                Date.now() - 1 * 24 * 60 * 60 * 1000
                            ).toISOString(),
                            coverLetter:
                                "Full-stack developer with 5+ years building distributed backends and high-performance APIs.",
                        },
                        {
                            _id: `mock_app_4_${jobId}`,
                            jobId,
                            userId: "seeker_user_4",
                            applicantName: "Priya Patel",
                            email: "priya.patel@example.com",
                            jobTitle: jobData?.title || "Senior Software Engineer",
                            companyName: jobData?.companyName || "HireLoop Partner",
                            category: jobData?.category || "Engineering & Tech",
                            jobType: jobData?.jobType || "Full-time",
                            location: "Seattle, WA",
                            status: "Offered",
                            appliedDate: new Date(
                                Date.now() - 7 * 24 * 60 * 60 * 1000
                            ).toISOString(),
                            resumeUrl: "https://example.com/resumes/priya-patel.pdf",
                            coverLetter:
                                "Senior architect experienced with microservices, Kafka, and Kubernetes deployment pipelines.",
                        },
                        {
                            _id: `mock_app_5_${jobId}`,
                            jobId,
                            userId: "seeker_user_5",
                            applicantName: "Liam O'Connor",
                            email: "liam.oconnor@example.com",
                            jobTitle: jobData?.title || "Senior Software Engineer",
                            companyName: jobData?.companyName || "HireLoop Partner",
                            category: jobData?.category || "Engineering & Tech",
                            jobType: jobData?.jobType || "Full-time",
                            location: "Remote",
                            status: "Rejected",
                            appliedDate: new Date(
                                Date.now() - 10 * 24 * 60 * 60 * 1000
                            ).toISOString(),
                        },
                    ];
                    setApplications(fallbackApplicants);
                }
            } catch (err) {
                console.error("Error loading job applications:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load job details and applications"
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadJobAndApplications();
    }, [jobId]);

    // Handle applicant status update
    // Note: The database update of status update for an applicant will be implemented later by user.
    const handleStatusChange = async (
        applicantId: string,
        newStatus: ApplicationStatus
    ) => {

        const result = await updateApplicationStatus(applicantId, newStatus);

        console.log('update result ', result);

        if (result.modifiedCount > 0) {

            setApplications((prev) =>
                prev.map((app) =>
                    app._id === applicantId ? { ...app, status: newStatus } : app
                )
            );
            const targetApplicant = applications.find(
                (app) => app._id === applicantId
            );
            const name = targetApplicant?.applicantName || "Applicant";

            toast.add({
                title: "Status Updated",
                description: `${name}'s status has been changed to "${newStatus}".`,
                type: "success",
            });
        }






        // 2. Ready for backend integration when user adds the endpoint:
        // updateApplicationStatus(applicantId, newStatus).catch(console.error);
    };

    // Filter and search logic
    const filteredApplications = useMemo(() => {
        return applications.filter((app) => {
            const query = searchQuery.toLowerCase().trim();
            const nameMatch =
                app.applicantName?.toLowerCase().includes(query) ?? false;
            const emailMatch = app.email?.toLowerCase().includes(query) ?? false;
            const locationMatch =
                app.location?.toLowerCase().includes(query) ?? false;
            const notesMatch = app.notes?.toLowerCase().includes(query) ?? false;

            const matchesQuery =
                query === "" ||
                nameMatch ||
                emailMatch ||
                locationMatch ||
                notesMatch;

            const matchesStatus =
                statusFilter === "All" ? true : app.status === statusFilter;

            return matchesQuery && matchesStatus;
        });
    }, [applications, searchQuery, statusFilter]);

    // Pipeline counts
    const counts = useMemo(() => {
        return {
            total: applications.length,
            pending: applications.filter((a) => a.status === "Pending").length,
            inReview: applications.filter((a) => a.status === "In Review").length,
            interviewing: applications.filter((a) => a.status === "Interviewing")
                .length,
            offered: applications.filter((a) => a.status === "Offered").length,
            rejected: applications.filter((a) => a.status === "Rejected").length,
        };
    }, [applications]);

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
            <div className="mx-auto flex min-h-[450px] max-w-7xl flex-col items-center justify-center gap-3">
                <Loader2 className="size-8 animate-spin text-violet-500" />
                <p className="text-sm font-medium text-gray-400">
                    Loading job applications & candidate pipeline...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Page Header with Breadcrumbs */}
            <PageHeader
                title="Review Job Applications"
                description={`Review candidates, assess applicant materials, and update hiring pipeline statuses for ${job?.title || "this job post"
                    }.`}
                breadcrumbs={[
                    { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
                    { label: job?.title || "Job Posting" },
                    { label: "Applications" },
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard/recruiter/jobs">
                            <Button
                                variant="outline"
                                className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-xs font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                            >
                                <ArrowLeft className="mr-2 size-4" />
                                Back to All Jobs
                            </Button>
                        </Link>
                        {job && (
                            <Link href={`/browse-jobs/${job._id}`}>
                                <Button className="h-11 rounded-xl bg-violet-600 px-5 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500">
                                    <ExternalLink className="mr-2 size-4" />
                                    View Live Job
                                </Button>
                            </Link>
                        )}
                    </div>
                }
            />

            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Job Summary Banner */}
            {job && (
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-5 shadow-xl shadow-black/20 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                                <Briefcase className="size-6" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h2 className="text-xl font-bold text-white">
                                        {job.title}
                                    </h2>
                                    <StatusBadge status={job.status} />
                                </div>
                                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5 font-medium text-gray-300">
                                        <Building2 className="size-3.5 text-gray-500" />
                                        {job.companyName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="size-3.5 text-gray-500" />
                                        {job.isRemote
                                            ? `Remote (${job.location})`
                                            : job.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase className="size-3.5 text-gray-500" />
                                        {job.jobType}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5 text-gray-500" />
                                        Posted {formatDate(job.postedDate)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 sm:gap-6">
                            <div>
                                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                    Compensation
                                </p>
                                <p className="mt-0.5 text-sm font-semibold text-white">
                                    {formatSalary(
                                        job.minSalary,
                                        job.maxSalary,
                                        job.salaryFrequency
                                    )}
                                </p>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div>
                                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                    Total Candidates
                                </p>
                                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-violet-400">
                                    <Users className="size-4" />
                                    <span>{applications.length} Applicants</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hiring Pipeline Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <div className="rounded-xl border border-white/10 bg-[#101014] p-3.5">
                    <div className="flex items-center justify-between text-gray-400">
                        <span className="text-xs font-medium">Total</span>
                        <Users className="size-4 text-gray-400" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-white">
                        {counts.total}
                    </p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                    <div className="flex items-center justify-between text-amber-400">
                        <span className="text-xs font-medium">Pending</span>
                        <Clock className="size-4" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-amber-300">
                        {counts.pending}
                    </p>
                </div>

                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3.5">
                    <div className="flex items-center justify-between text-sky-400">
                        <span className="text-xs font-medium">In Review</span>
                        <UserCheck className="size-4" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-sky-300">
                        {counts.inReview}
                    </p>
                </div>

                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3.5">
                    <div className="flex items-center justify-between text-violet-400">
                        <span className="text-xs font-medium">Interviewing</span>
                        <Briefcase className="size-4" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-violet-300">
                        {counts.interviewing}
                    </p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                    <div className="flex items-center justify-between text-emerald-400">
                        <span className="text-xs font-medium">Offered</span>
                        <CheckCircle2 className="size-4" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-emerald-300">
                        {counts.offered}
                    </p>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5">
                    <div className="flex items-center justify-between text-red-400">
                        <span className="text-xs font-medium">Rejected</span>
                        <UserX className="size-4" />
                    </div>
                    <p className="mt-2 text-xl font-bold text-red-300">
                        {counts.rejected}
                    </p>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search candidate name, email, location..."
                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                    />
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {statusOptions.map((filter) => {
                        const count =
                            filter === "All"
                                ? counts.total
                                : filter === "Pending"
                                    ? counts.pending
                                    : filter === "In Review"
                                        ? counts.inReview
                                        : filter === "Interviewing"
                                            ? counts.interviewing
                                            : filter === "Offered"
                                                ? counts.offered
                                                : counts.rejected;

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
                                Candidate
                            </TableHead>
                            <TableHead className="min-w-[140px]">
                                Applied Date
                            </TableHead>
                            <TableHead className="min-w-[150px]">
                                Resume &amp; CV
                            </TableHead>
                            <TableHead className="min-w-[120px]">
                                Current Status
                            </TableHead>
                            <TableHead className="min-w-[170px]">
                                Update Status
                            </TableHead>
                            <TableHead className="text-right min-w-[120px]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredApplications.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-44 text-center text-gray-400"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <XCircle className="size-6 text-gray-500" />
                                        <p className="text-sm font-medium text-gray-300">
                                            No applicants match your criteria
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Try adjusting your search query or status filter.
                                        </p>
                                        {(searchQuery || statusFilter !== "All") && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setStatusFilter("All");
                                                }}
                                                className="mt-2 h-8 rounded-lg border-white/10 bg-white/5 text-xs text-gray-300 hover:bg-white/10 hover:text-white"
                                            >
                                                Clear Filters
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredApplications.map((app) => {
                                const candidateName =
                                    app.applicantName || "Applicant";
                                const initials = candidateName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase();

                                return (
                                    <TableRow
                                        key={app._id}
                                        className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                                    >
                                        {/* Candidate */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10 text-xs font-bold text-violet-400">
                                                    {initials}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-white truncate">
                                                        {candidateName}
                                                    </p>
                                                    <a
                                                        href={`mailto:${app.email}`}
                                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-violet-400 hover:underline truncate"
                                                        title={app.email}
                                                    >
                                                        <Mail className="size-3 shrink-0" />
                                                        <span className="truncate">
                                                            {app.email}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Applied Date */}
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-medium text-gray-300">
                                                    {formatDate(app.appliedDate)}
                                                </p>
                                                {app.location && (
                                                    <p className="text-[11px] text-gray-500">
                                                        {app.location}
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Resume & CV */}
                                        <TableCell>
                                            {app.resumeUrl ? (
                                                <a
                                                    href={app.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300 transition hover:border-violet-500/40 hover:bg-violet-600/10 hover:text-violet-300"
                                                >
                                                    <FileText className="size-3.5 text-violet-400" />
                                                    <span>View Resume</span>
                                                    <ExternalLink className="size-3 opacity-60" />
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                                    <FileText className="size-3.5 text-gray-500" />
                                                    <span>Profile CV</span>
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Current Status */}
                                        <TableCell>
                                            <StatusBadge status={app.status} />
                                        </TableCell>

                                        {/* Update Status */}
                                        <TableCell>
                                            <ApplicantStatusSelect
                                                status={app.status}
                                                onStatusChange={(newStatus) =>
                                                    handleStatusChange(
                                                        app._id,
                                                        newStatus
                                                    )
                                                }
                                            />
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <ApplicantReviewDialog
                                                    application={app}
                                                    onStatusChange={(newStatus) =>
                                                        handleStatusChange(
                                                            app._id,
                                                            newStatus
                                                        )
                                                    }
                                                />
                                                <a
                                                    href={`mailto:${app.email}?subject=Regarding your application for ${encodeURIComponent(
                                                        app.jobTitle
                                                    )}`}
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                                    title="Email candidate"
                                                >
                                                    <Mail className="size-4" />
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
