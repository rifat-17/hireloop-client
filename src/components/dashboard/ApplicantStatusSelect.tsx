"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

interface ApplicantStatusSelectProps {
    status: ApplicationStatus;
    onStatusChange: (status: ApplicationStatus) => void;
    disabled?: boolean;
    className?: string;
}

interface StatusOption {
    value: ApplicationStatus;
    label: string;
    dotClass: string;
    badgeClass: string;
}

const STATUS_OPTIONS: StatusOption[] = [
    {
        value: "Pending",
        label: "Pending",
        dotClass: "bg-amber-400",
        badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    },
    {
        value: "In Review",
        label: "In Review",
        dotClass: "bg-sky-400",
        badgeClass: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    },
    {
        value: "Interviewing",
        label: "Interviewing",
        dotClass: "bg-violet-400",
        badgeClass: "border-violet-500/30 bg-violet-600/10 text-violet-300",
    },
    {
        value: "Offered",
        label: "Offered",
        dotClass: "bg-emerald-400",
        badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    },
    {
        value: "Rejected",
        label: "Rejected",
        dotClass: "bg-red-400",
        badgeClass: "border-red-500/30 bg-red-500/10 text-red-300",
    },
];

export function ApplicantStatusSelect({
    status,
    onStatusChange,
    disabled = false,
    className,
}: ApplicantStatusSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentOption =
        STATUS_OPTIONS.find((opt) => opt.value === status) || {
            value: status,
            label: status,
            dotClass: "bg-gray-400",
            badgeClass: "border-white/10 bg-white/5 text-gray-300",
        };

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    "group flex h-8 items-center gap-2 rounded-xl border px-2.5 text-xs font-medium transition",
                    currentOption.badgeClass,
                    "hover:brightness-110 focus:outline-none focus:ring-1 focus:ring-violet-500",
                    disabled && "cursor-not-allowed opacity-50"
                )}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={cn("size-1.5 rounded-full", currentOption.dotClass)} />
                <span>{currentOption.label}</span>
                <ChevronDown
                    className={cn(
                        "size-3 opacity-60 transition-transform duration-200 group-hover:opacity-100",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-xl border border-white/10 bg-[#16161d] p-1.5 shadow-2xl shadow-black/80 backdrop-blur-md"
                >
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Update Status
                    </div>
                    {STATUS_OPTIONS.map((option) => {
                        const isSelected = option.value === status;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                    onStatusChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition",
                                    isSelected
                                        ? "bg-violet-600/15 font-semibold text-white"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "size-2 rounded-full",
                                            option.dotClass
                                        )}
                                    />
                                    <span>{option.label}</span>
                                </div>
                                {isSelected && (
                                    <Check className="size-3.5 text-violet-400" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

