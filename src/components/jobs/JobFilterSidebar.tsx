"use client";

import React, { useState } from "react";
import {
    SlidersHorizontal,
    RotateCcw,
    Briefcase,
    DollarSign,
    Globe,
    Layers,
} from "lucide-react";
import {
    JOB_CATEGORIES,
    JOB_TYPES,
    SALARY_FREQUENCIES,
} from "@/constants";
import type { JobType, SalaryFrequency } from "@/types";

interface JobFilterSidebarProps {
    selectedCategory?: string;
    selectedJobType?: JobType | "";
    /** Kept for backward compatibility */
    selectedJobTypes?: JobType[];
    isRemoteOnly?: boolean;
    selectedFrequency?: SalaryFrequency | "";
    onCategoryChange?: (category: string) => void;
    onJobTypeChange?: (jobType: JobType | "") => void;
    onRemoteChange?: (isRemote: boolean) => void;
    onFrequencyChange?: (frequency: SalaryFrequency | "") => void;
    onResetFilters?: () => void;
    className?: string;
}

export function JobFilterSidebar({
    selectedCategory: controlledCategory,
    selectedJobType: controlledJobType,
    selectedJobTypes,
    isRemoteOnly: controlledRemote,
    selectedFrequency: controlledFrequency,
    onCategoryChange = () => {},
    onJobTypeChange = () => {},
    onRemoteChange = () => {},
    onFrequencyChange = () => {},
    onResetFilters = () => {},
    className = "",
}: JobFilterSidebarProps) {
    // Support both controlled and uncontrolled usage
    const [internalCategory, setInternalCategory] = useState<string>("");
    const [internalJobType, setInternalJobType] = useState<JobType | "">("");
    const [internalRemote, setInternalRemote] = useState<boolean>(false);
    const [internalFrequency, setInternalFrequency] = useState<SalaryFrequency | "">("");

    // Resolve active values (controlled props take precedence if defined)
    const activeCategory =
        controlledCategory !== undefined ? controlledCategory : internalCategory;
    const activeJobType =
        controlledJobType !== undefined
            ? controlledJobType
            : selectedJobTypes && selectedJobTypes.length > 0
            ? selectedJobTypes[0]
            : internalJobType;
    const activeRemote =
        controlledRemote !== undefined ? controlledRemote : internalRemote;
    const activeFrequency =
        controlledFrequency !== undefined ? controlledFrequency : internalFrequency;

    const handleCategorySelect = (category: string) => {
        const next = activeCategory === category ? "" : category;
        if (controlledCategory === undefined) {
            setInternalCategory(next);
        }
        onCategoryChange(next);
    };

    const handleJobTypeSelect = (type: JobType) => {
        const next = activeJobType === type ? "" : type;
        if (controlledJobType === undefined) {
            setInternalJobType(next);
        }
        onJobTypeChange(next);
    };

    const handleRemoteToggle = (checked: boolean) => {
        if (controlledRemote === undefined) {
            setInternalRemote(checked);
        }
        onRemoteChange(checked);
    };

    const handleFrequencySelect = (freq: SalaryFrequency) => {
        const next = activeFrequency === freq ? "" : freq;
        if (controlledFrequency === undefined) {
            setInternalFrequency(next);
        }
        onFrequencyChange(next);
    };

    const handleReset = () => {
        setInternalCategory("");
        setInternalJobType("");
        setInternalRemote(false);
        setInternalFrequency("");
        onResetFilters();
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
                    <h2 className="text-base font-semibold text-white">Filter Jobs</h2>
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
                        <h3 className="text-sm font-medium text-gray-200">Workplace</h3>
                    </div>
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]">
                        <span className="text-xs font-medium text-gray-300">
                            Remote positions only
                        </span>
                        <input
                            type="checkbox"
                            checked={activeRemote}
                            onChange={(e) => handleRemoteToggle(e.target.checked)}
                            className="size-4 rounded border-white/20 bg-white/5 accent-violet-600"
                        />
                    </label>
                </div>

                {/* Job Types (Single Select) */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="size-4 text-violet-400" />
                            <h3 className="text-sm font-medium text-gray-200">Employment Type</h3>
                        </div>
                        <span className="text-[11px] text-gray-500">Single select</span>
                    </div>
                    <div className="space-y-1.5" role="radiogroup" aria-label="Employment Type">
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
                                        name="jobTypeFilter"
                                        value={type}
                                        checked={isSelected}
                                        onChange={() => handleJobTypeSelect(type)}
                                        onClick={(e) => {
                                            if (isSelected) {
                                                e.preventDefault();
                                                handleJobTypeSelect(type);
                                            }
                                        }}
                                        className="size-4 border-white/20 bg-white/5 accent-violet-600"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Categories (Single Select) */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="size-4 text-violet-400" />
                            <h3 className="text-sm font-medium text-gray-200">Category</h3>
                        </div>
                        <span className="text-[11px] text-gray-500">Single select</span>
                    </div>
                    <div className="space-y-1.5" role="radiogroup" aria-label="Job Category">
                        {JOB_CATEGORIES.map((category) => {
                            const isSelected = activeCategory === category;
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
                                        name="categoryFilter"
                                        value={category}
                                        checked={isSelected}
                                        onChange={() => handleCategorySelect(category)}
                                        onClick={(e) => {
                                            if (isSelected) {
                                                e.preventDefault();
                                                handleCategorySelect(category);
                                            }
                                        }}
                                        className="size-4 border-white/20 bg-white/5 accent-violet-600"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Salary Frequency */}
                <div className="py-5">
                    <div className="mb-3.5 flex items-center gap-2">
                        <DollarSign className="size-4 text-violet-400" />
                        <h3 className="text-sm font-medium text-gray-200">Salary Frequency</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {SALARY_FREQUENCIES.map((freq) => {
                            const isSelected = activeFrequency === freq;
                            return (
                                <button
                                    key={freq}
                                    type="button"
                                    onClick={() => handleFrequencySelect(freq)}
                                    className={`rounded-lg border px-2.5 py-2 text-center text-xs font-medium capitalize transition ${
                                        isSelected
                                            ? "border-violet-500 bg-violet-600/20 text-white"
                                            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                    }`}
                                >
                                    {freq.replace("per ", "")}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}
