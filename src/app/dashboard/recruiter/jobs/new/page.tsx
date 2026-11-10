"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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
import { toast } from "@/components/ui/toast";
import { FormField } from "@/components/ui/form-field";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { FormCard } from "@/components/dashboard/FormCard";
import { createJob } from "@/lib/actions/jobs";
import {
    JOB_CATEGORIES,
    JOB_TYPES,
    SALARY_FREQUENCIES,
    INITIAL_JOB_FORM_DATA,
} from "@/constants";
import type { JobFormData, JobType, SalaryFrequency } from "@/types";

export type { JobFormData, JobType, SalaryFrequency };

const inputClasses =
    "h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500";

const selectClasses =
    "h-11 w-full rounded-xl border border-white/10 bg-[#16161c] px-3.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500";

export default function NewJobPage() {
    const [formData, setFormData] = useState<JobFormData>(INITIAL_JOB_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);

        try {
            const result = await createJob(formData);
            console.log("Job Post Submitted:", result);

            setSuccess(true);
            toast.add({
                title: "Job Posted Successfully",
                description: `Position "${formData.title}" at ${formData.companyName} has been saved.`,
                type: "success",
            });

            router.push("/dashboard/recruiter/jobs");
        } catch (error) {
            console.error("Error creating job:", error);
            toast.add({
                title: "Failed to Post Job",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-16">
            <PageHeader
                title="Post a New Job"
                description="Fill in the position specifications to attract qualified talent across our network."
                breadcrumbs={[
                    {
                        label: "Manage Jobs",
                        href: "/dashboard/recruiter/jobs",
                    },
                    { label: "Create New Listing" },
                ]}
            />

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
                            setFormData(INITIAL_JOB_FORM_DATA);
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
                <FormCard step={1} title="Basic Information">
                    {/* Job Title */}
                    <FormField id="title" label="Job Title" required icon={Briefcase}>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Frontend Developer"
                            className={inputClasses}
                        />
                    </FormField>

                    {/* Company Name & Job Category */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                            id="companyName"
                            label="Company Name"
                            required
                            icon={Building2}
                        >
                            <Input
                                id="companyName"
                                name="companyName"
                                type="text"
                                required
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. HirePulse Network"
                                className={inputClasses}
                            />
                        </FormField>

                        <FormField id="category" label="Job Category" required>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={selectClasses}
                            >
                                {JOB_CATEGORIES.map((cat) => (
                                    <option
                                        key={cat}
                                        value={cat}
                                        className="bg-[#16161c] text-white"
                                    >
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </FormField>
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
                </FormCard>

                {/* Section 2: Location, Compensation & Timeline */}
                <FormCard step={2} title="Location, Compensation & Timeline">
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
                        <FormField
                            id="location"
                            label="Job Location (location)"
                            required
                            hint="Required"
                            icon={MapPin}
                        >
                            <Input
                                id="location"
                                name="location"
                                type="text"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. New York, USA"
                                className={inputClasses}
                            />
                        </FormField>

                        <FormField
                            id="deadline"
                            label="Application Deadline (deadline)"
                            icon={Calendar}
                        >
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                className={`${inputClasses} [color-scheme:dark]`}
                            />
                        </FormField>
                    </div>

                    {/* Salary Range */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">
                            Salary Range & Frequency
                        </Label>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="relative">
                                <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    name="minSalary"
                                    type="text"
                                    value={formData.minSalary}
                                    onChange={handleChange}
                                    placeholder="Min Salary / Rate"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="relative">
                                <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    name="maxSalary"
                                    type="text"
                                    value={formData.maxSalary}
                                    onChange={handleChange}
                                    placeholder="Max Salary / Rate"
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <select
                                    name="salaryFrequency"
                                    value={formData.salaryFrequency}
                                    onChange={handleChange}
                                    className={selectClasses}
                                >
                                    {SALARY_FREQUENCIES.map((freq) => (
                                        <option
                                            key={freq}
                                            value={freq}
                                            className="bg-[#16161c] text-white"
                                        >
                                            {freq}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </FormCard>

                {/* Section 3: Responsibilities & Requirements */}
                <FormCard step={3} title="Responsibilities & Requirements">
                    <FormField
                        id="responsibilities"
                        label={
                            <span className="flex items-center gap-2">
                                <FileText className="size-4 text-violet-400" />
                                <span>Key Responsibilities</span>
                            </span>
                        }
                        required
                    >
                        <Textarea
                            id="responsibilities"
                            name="responsibilities"
                            required
                            value={formData.responsibilities}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Showcase key responsibilities and expectations for this role..."
                        />
                    </FormField>

                    <FormField
                        id="requirements"
                        label={
                            <span className="flex items-center gap-2">
                                <FileText className="size-4 text-violet-400" />
                                <span>Qualifications & Requirements</span>
                            </span>
                        }
                        required
                    >
                        <Textarea
                            id="requirements"
                            name="requirements"
                            required
                            value={formData.requirements}
                            onChange={handleChange}
                            rows={4}
                            placeholder={"3+ years of experience with React, TypeScript...\nSolid understanding of modern frontend architectures..."}
                        />
                    </FormField>
                </FormCard>

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
