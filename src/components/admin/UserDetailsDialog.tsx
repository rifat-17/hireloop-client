"use client";

import React, { useState } from "react";
import {
    Eye,
    Mail,
    Calendar,
    Copy,
    Check,
    X,
    User,
    CheckCircle2,
    Clock,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserRoleToggle } from "./UserRoleToggle";
import { formatDate } from "@/lib/formatters";
import type { AppUser, UserRole } from "@/types";

interface UserDetailsDialogProps {
    user: AppUser;
    onRoleChange?: (newRole: UserRole) => void;
    trigger?: React.ReactNode;
}

export function UserDetailsDialog({
    user,
    onRoleChange,
    trigger,
}: UserDetailsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedId, setCopiedId] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const initials = (user.name || "User")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleCopyId = () => {
        navigator.clipboard.writeText(user.id);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(user.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <>
            {trigger ? (
                <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    className="h-8 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                    title="View user details"
                >
                    <Eye className="size-4" />
                    <span className="sr-only">View Details</span>
                </Button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-black/80 sm:p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-white/5 pb-5">
                            <div className="flex items-start gap-4">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-600/15 text-base font-bold text-violet-300">
                                    {initials || <User className="size-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">
                                        {user.name || "Anonymous User"}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                                        <span>{user.email}</span>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="rounded p-1 hover:bg-white/10 hover:text-white transition"
                                            title="Copy email"
                                        >
                                            {copiedEmail ? (
                                                <Check className="size-3 text-emerald-400" />
                                            ) : (
                                                <Copy className="size-3 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <UserRoleBadge role={user.role} />
                                        {user.emailVerified ? (
                                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-400">
                                                <CheckCircle2 className="size-3" />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-400">
                                                <Clock className="size-3" />
                                                Unverified
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                aria-label="Close dialog"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Interactive Role Switcher Section */}
                        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        Assigned Role
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Toggle role permissions for this account
                                    </p>
                                </div>
                                {onRoleChange && (
                                    <UserRoleToggle
                                        currentRole={user.role}
                                        onRoleChange={onRoleChange}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Account Information Grid */}
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                                <div className="flex items-center justify-between text-gray-400">
                                    <span>User ID</span>
                                    <button
                                        type="button"
                                        onClick={handleCopyId}
                                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white transition"
                                    >
                                        {copiedId ? (
                                            <>
                                                <Check className="size-2.5 text-emerald-400" />
                                                <span className="text-emerald-400">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-2.5" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-1 font-mono text-[11px] text-gray-300 truncate">
                                    {user.id}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Calendar className="size-3.5 text-violet-400" />
                                    <span>Joined Date</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {formatDate(
                                        user.createdAt
                                            ? typeof user.createdAt === "string"
                                                ? user.createdAt
                                                : user.createdAt.toISOString()
                                            : undefined
                                    )}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Shield className="size-3.5 text-violet-400" />
                                    <span>Account Status</span>
                                </div>
                                <p className="mt-1 font-medium text-emerald-400">
                                    {user.banned ? "Suspended" : "Active"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <CheckCircle2 className="size-3.5 text-violet-400" />
                                    <span>Email Verification</span>
                                </div>
                                <p className="mt-1 font-medium text-gray-200">
                                    {user.emailVerified ? "Confirmed" : "Pending"}
                                </p>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                            <a
                                href={`mailto:${user.email}`}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                <Mail className="size-3.5" />
                                Contact User
                            </a>

                            <Button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="h-9 rounded-xl bg-violet-600 px-5 text-xs font-semibold text-white shadow-md shadow-violet-900/30 transition hover:bg-violet-500"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

