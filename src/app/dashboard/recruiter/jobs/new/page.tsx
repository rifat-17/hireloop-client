"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Send,
    CheckCircle2,
    Briefcase,
    Building2,
    MapPin,
    DollarSign,
    Calendar,
    FileText,
    Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type SalaryFrequency = "per hour" | "per month" | "per year";

export interface JobFormData {
    title: string;
    companyName: string;
    category: string;
    jobType: JobType;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: SalaryFrequency;
    responsibilities: string;
    requirements: string;
}

const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product & Management",
    "Marketing & Sales",
    "Customer Support",
    "Finance & Accounting",
];

const JOB_TYPES: JobType[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
];

const SALARY_FREQUENCIES: SalaryFrequency[] = [
    "per hour",
    "per month",
    "per year",
];

const initialFormData: JobFormData = {
    title: "",
    companyName: "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryFrequency: "per year",
    responsibilities: "",
    requirements: "",
};

export default function NewJobPage() {
    const [formData, setFormData] = useState<JobFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Simple, clean change handler for inputs & textareas
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleJobTypeChange = (type: JobType) => {
        setFormData((prev) => ({
            ...prev,
            jobType: type,
        }));
    };

    const handleRemoteToggle = () => {
        setFormData((prev) => ({
            ...prev,
            isRemote: !prev.isRemote,
        }));
    };

    // Easy data collection on submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);

        try {
            // Collected form data ready for API dispatch
            console.log("Job Post Submitted:", formData);

            // Brief delay to reflect action
            await new Promise((resolve) => setTimeout(resolve, 500));
            setSuccess(true);
        } catch (error) {
            console.error("Error creating job:", error);
        } finally { 
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-16">
            {/* Breadcrumb Navigation Trail */}
            <div>
                <nav className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="transition hover:text-violet-400"
                    >
                        Manage Jobs
                    </Link>
                    <ChevronRight className="size-4 text-gray-600" />
                    <span className="font-medium text-gray-200">
                        Create New Listing
                    </span>
                </nav>

                <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Post a New Job
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Fill in the position specifications to attract qualified talent across our network.
                        </p>
                    </div>

                    
                </div>
            </div>

            {/* Submission Feedback */}
            {success && (
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-400 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                        <div>
                            <p className="font-semibold text-white">
                                Job Published Successfully!
                            </p>
                            <p className="text-xs text-emerald-300/80">
                                Position &quot;{formData.title}&quot; at {formData.companyName} has been saved.
                            </p>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setFormData(initialFormData);
                            setSuccess(false);
                        }}
                        className="border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/20"
                    >
                        Post Another Job
                    </Button>
                </div>
            )}

            {/* Job Creation Form */}
            <form id="new-job-form" onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Basic Information */}
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-violet-600/20 text-xs font-semibold text-violet-400">
                            1
                        </span>
                        <h2 className="text-lg font-semibold text-white">
                            Basic Information
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Job Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                                Job Title <span className="text-violet-400">*</span>
                            </Label>
                            <div className="relative">
                                <Briefcase className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Frontend Developer"
                                    className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                                />
                            </div>
                        </div>

                        {/* Company Name & Job Category */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <Label htmlFor="companyName" className="text-sm font-medium text-gray-300">
                                    Company Name <span className="text-violet-400">*</span>
                                </Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="e.g. HirePulse Network"
                                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                                    />
                                </div>
                            </div>

                            {/* Job Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium text-gray-300">
                                    Job Category <span className="text-violet-400">*</span>
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-white/10 bg-[#16161c] px-3.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                >
                                    {JOB_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[#16161c] text-white">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Job Type Options */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">
                                Job Type <span className="text-violet-400">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {JOB_TYPES.map((type) => {
                                    const isSelected = formData.jobType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleJobTypeChange(type)}
                                            className={`flex h-11 items-center justify-center rounded-xl border text-sm font-medium transition ${
                                                isSelected
                                                    ? "border-violet-500 bg-violet-600/20 text-white shadow-sm shadow-violet-500/20"
                                                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Location, Compensation & Timeline */}
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-violet-600/20 text-xs font-semibold text-violet-400">
                            2
                        </span>
                        <h2 className="text-lg font-semibold text-white">
                            Location, Compensation & Timeline
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Remote Allowed Toggle */}
                        <div
                            onClick={handleRemoteToggle}
                            className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                                    <Globe2 className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        Remote Work Allowed (isRemote)
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Enable worldwide or distributed candidate applications
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                aria-checked={formData.isRemote}
                                role="switch"
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    formData.isRemote ? "bg-violet-600" : "bg-white/20"
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        formData.isRemote ? "translate-x-5" : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Location & Application Deadline */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Job Location */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="location" className="text-sm font-medium text-gray-300">
                                        Job Location (location) <span className="text-violet-400">*</span>
                                    </Label>
                                    <span className="text-xs text-gray-500">Required</span>
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. New York, USA"
                                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                                    />
                                </div>
                            </div>

                            {/* Application Deadline */}
                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="text-sm font-medium text-gray-300">
                                    Application Deadline (deadline)
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500 [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Salary Range */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-300">
                                Salary Range & Frequency
                            </Label>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {/* Min Salary */}
                                <div className="relative">
                                    <DollarSign className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        name="minSalary"
                                        type="text"
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        placeholder="Min Salary / Rate"
                                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                                    />
                                </div>

                                {/* Max Salary */}
                                <div className="relative">
                                    <DollarSign className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        name="maxSalary"
                                        type="text"
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        placeholder="Max Salary / Rate"
                                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                                    />
                                </div>

                                {/* Frequency */}
                                <div>
                                    <select
                                        name="salaryFrequency"
                                        value={formData.salaryFrequency}
                                        onChange={handleChange}
                                        className="h-11 w-full rounded-xl border border-white/10 bg-[#16161c] px-3.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                    >
                                        {SALARY_FREQUENCIES.map((freq) => (
                                            <option key={freq} value={freq} className="bg-[#16161c] text-white">
                                                {freq}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Responsibilities & Requirements */}
                <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-xl shadow-black/20 sm:p-8">
                    <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-violet-600/20 text-xs font-semibold text-violet-400">
                            3
                        </span>
                        <h2 className="text-lg font-semibold text-white">
                            Responsibilities & Requirements
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Key Responsibilities */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="size-4 text-violet-400" />
                                <Label htmlFor="responsibilities" className="text-sm font-medium text-gray-300">
                                    Key Responsibilities <span className="text-violet-400">*</span>
                                </Label>
                            </div>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                required
                                value={formData.responsibilities}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Showcase key responsibilities and expectations for this role..."
                            />
                        </div>

                        {/* Qualifications & Requirements */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="size-4 text-violet-400" />
                                <Label htmlFor="requirements" className="text-sm font-medium text-gray-300">
                                    Qualifications & Requirements <span className="text-violet-400">*</span>
                                </Label>
                            </div>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                required
                                value={formData.requirements}
                                onChange={handleChange}
                                rows={4}
                                placeholder="3+ years of experience with React, TypeScript...&#10;Solid understanding of modern frontend architectures..."
                            />
                        </div>
                    </div>
                </div>

                {/* Form Footer Action */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        Cancel
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-11 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 disabled:opacity-60"
                    >
                        <Send className="mr-2 size-4" />
                        {isSubmitting ? "Publishing Job..." : "Publish Job"}
                    </Button>
                    
                </div>
            </form>
        </div>
    );
}
