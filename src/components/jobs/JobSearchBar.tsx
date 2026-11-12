"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobSearchBarProps {
    defaultValue?: string;
    defaultLocation?: string;
    onSearch?: () => void;
    onKeywordChange?: (value: string) => void;
    onLocationChange?: (value: string) => void;
    className?: string;
}

export function JobSearchBar({
    defaultValue = "",
    defaultLocation = "",
    onSearch = () => {},
    onKeywordChange = () => {},
    onLocationChange = () => {},
    className = "",
}: JobSearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full rounded-2xl border border-white/10 bg-[#101014] p-2.5 shadow-2xl shadow-black/40 backdrop-blur-sm transition-all focus-within:border-violet-500/50 sm:p-3 ${className}`}
        >
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0">
                {/* Keyword Search Input */}
                <div className="relative flex flex-1 items-center">
                    <Search
                        className="pointer-events-none absolute left-4 size-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        name="q"
                        defaultValue={defaultValue}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        placeholder="Job title, keywords, or company..."
                        className="h-12 w-full rounded-xl bg-transparent pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition-colors focus:bg-white/[0.03] sm:h-14 sm:text-base"
                    />
                </div>

                {/* Divider */}
                <div
                    aria-hidden="true"
                    className="hidden h-8 w-px bg-white/10 sm:block sm:mx-2"
                />

                {/* Location Input */}
                <div className="relative flex flex-1 items-center">
                    <MapPin
                        className="pointer-events-none absolute left-4 size-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        name="location"
                        defaultValue={defaultLocation}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="Location or 'Remote'..."
                        className="h-12 w-full rounded-xl bg-transparent pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition-colors focus:bg-white/[0.03] sm:h-14 sm:text-base"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="h-12 rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 active:scale-[0.99] sm:h-14 sm:text-base"
                >
                    <Search className="mr-2 size-4" />
                    Find Jobs
                </Button>
            </div>
        </form>
    );
}

