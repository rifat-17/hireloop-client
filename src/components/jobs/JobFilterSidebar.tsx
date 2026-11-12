
"use client";

import {
    SlidersHorizontal,
    RotateCcw,
    Briefcase,
    Globe,
    Layers,
} from "lucide-react";

import {
    JOB_CATEGORIES,
    JOB_TYPES,
} from "@/constants";

import type { JobType } from "@/types";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

interface JobFilterSidebarProps {
    className?: string;
    onResetFilters?: () => void;
}

export function JobFilterSidebar({
    className = "",
    onResetFilters,
}: JobFilterSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get active filters from URL
    const activeCategory = searchParams.get("category") || "";

    const activeJobType =
        (searchParams.get("jobType") as JobType | "") || "";

    const activeRemote = searchParams.get("isRemote") === "true";

    // Reusable function to update URL parameters
    const updateFilter = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        const queryString = params.toString();

        router.replace(
            queryString ? `${pathname}?${queryString}` : pathname,
            { scroll: false }
        );
    };

    // Category filter
    const handleCategorySelect = (category: string) => {
        const nextValue =
            activeCategory === category ? "" : category;

        updateFilter("category", nextValue);
    };

    // Job type filter
    const handleJobTypeSelect = (type: JobType) => {
        const nextValue =
            activeJobType === type ? "" : type;

        updateFilter("jobType", nextValue);
    };

    // Remote filter
    const handleRemoteToggle = (checked: boolean) => {
        updateFilter("isRemote", checked ? "true" : "");
    };

    // Reset filters while preserving the search keyword
    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("category");
        params.delete("jobType");
        params.delete("isRemote");

        const queryString = params.toString();

        router.replace(
            queryString ? `${pathname}?${queryString}` : pathname,
            { scroll: false }
        );

        onResetFilters?.();
    };

    return (
        <aside
            className={`w-full rounded-2xl border border-white/10 bg-[#101014] p-5 shadow-xl shadow-black/20 sm:p-6 ${className}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                        <SlidersHorizontal className="size-4" />
                    </div>

                    <h2 className="text-base font-semibold text-white">
                        Filter Jobs
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-violet-400"
                >
                    <RotateCcw className="size-3" />
                    <span>Reset</span>
                </button>
            </div>

            <div className="divide-y divide-white/5">

                {/* Workplace / Remote Type */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center gap-2">
                        <Globe className="size-4 text-violet-400" />

                        <h3 className="text-sm font-medium text-gray-200">
                            Workplace
                        </h3>
                    </div>

                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]">
                        <span className="text-xs font-medium text-gray-300">
                            Remote positions only
                        </span>

                        <input
                            type="checkbox"
                            name="isRemote"
                            checked={activeRemote}
                            onChange={(e) =>
                                handleRemoteToggle(e.target.checked)
                            }
                            className="size-4 rounded border-white/20 bg-white/5 accent-violet-600"
                        />
                    </label>
                </div>

                {/* Employment Type */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="size-4 text-violet-400" />

                            <h3 className="text-sm font-medium text-gray-200">
                                Employment Type
                            </h3>
                        </div>

                        <span className="text-[11px] text-gray-500">
                            Single select
                        </span>
                    </div>

                    <div
                        className="space-y-1.5"
                        role="radiogroup"
                        aria-label="Employment Type"
                    >
                        {JOB_TYPES.map((type) => {
                            const isSelected = activeJobType === type;

                            return (
                                <label
                                    key={type}
                                    className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition ${
                                        isSelected
                                            ? "bg-violet-600/10 text-white font-medium"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <span>{type}</span>

                                    <input
                                        type="radio"
                                        name="jobType"
                                        value={type}
                                        checked={isSelected}
                                        onChange={() =>
                                            handleJobTypeSelect(type)
                                        }
                                        className="size-4 border-white/20 bg-white/5 accent-violet-600"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Categories */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="size-4 text-violet-400" />

                            <h3 className="text-sm font-medium text-gray-200">
                                Category
                            </h3>
                        </div>

                        <span className="text-[11px] text-gray-500">
                            Single select
                        </span>
                    </div>

                    <div
                        className="space-y-1.5"
                        role="radiogroup"
                        aria-label="Job Category"
                    >
                        {JOB_CATEGORIES.map((category) => {
                            const isSelected =
                                activeCategory === category;

                            return (
                                <label
                                    key={category}
                                    className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs transition ${
                                        isSelected
                                            ? "bg-violet-600/10 text-white font-medium"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <span>{category}</span>

                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={isSelected}
                                        onChange={() =>
                                            handleCategorySelect(category)
                                        }
                                        className="size-4 border-white/20 bg-white/5 accent-violet-600"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}
