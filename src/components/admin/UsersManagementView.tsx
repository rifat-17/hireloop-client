"use client";

import React, { useState, useMemo } from "react";
import {
    Search,
    Mail,
    Copy,
    Check,
    XCircle,
    ArrowUpDown,
    CheckCircle2,
    Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserRoleToggle } from "./UserRoleToggle";
import { UserDetailsDialog } from "./UserDetailsDialog";
import { UserStatsCards } from "./UserStatsCards";
import { toast } from "@/components/ui/toast";
import { formatDate } from "@/lib/formatters";
import type { AppUser, UserRole } from "@/types";

interface UsersManagementViewProps {
    initialUsers: AppUser[];
}

type RoleFilter = "All" | UserRole;
type SortOption = "name-asc" | "name-desc" | "date-desc" | "date-asc";

const DUMMY_FALLBACK_USERS: AppUser[] = [
    {
        id: "usr_admin_001",
        name: "Admin User",
        email: "admin@hireloop.com",
        role: "admin",
        emailVerified: true,
        createdAt: "2026-10-01T08:00:00.000Z",
    },
    {
        id: "usr_rec_002",
        name: "Eleanor Vance",
        email: "eleanor.vance@techcorp.io",
        role: "recruiter",
        emailVerified: true,
        createdAt: "2026-10-15T10:30:00.000Z",
    },
    {
        id: "usr_rec_003",
        name: "David Sterling",
        email: "david@innovatetalent.com",
        role: "recruiter",
        emailVerified: true,
        createdAt: "2026-11-01T14:15:00.000Z",
    },
    {
        id: "usr_seek_004",
        name: "Alex Morgan",
        email: "alex.morgan@hireloop.com",
        role: "seeker",
        emailVerified: true,
        createdAt: "2026-11-05T09:20:00.000Z",
    },
    {
        id: "usr_seek_005",
        name: "Sarah Chen",
        email: "sarah.chen@devmail.org",
        role: "seeker",
        emailVerified: true,
        createdAt: "2026-11-08T16:40:00.000Z",
    },
    {
        id: "usr_seek_006",
        name: "Marcus Vance",
        email: "marcus.vance@cloudsystems.net",
        role: "seeker",
        emailVerified: false,
        createdAt: "2026-11-12T11:05:00.000Z",
    },
    {
        id: "usr_seek_007",
        name: "Priya Patel",
        email: "priya.patel@engmail.io",
        role: "seeker",
        emailVerified: true,
        createdAt: "2026-11-14T13:50:00.000Z",
    },
];

export function UsersManagementView({ initialUsers }: UsersManagementViewProps) {
    const [users, setUsers] = useState<AppUser[]>(() => {
        return initialUsers && initialUsers.length > 0
            ? initialUsers
            : DUMMY_FALLBACK_USERS;
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
    const [sortOption, setSortOption] = useState<SortOption>("name-asc");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Event handler for toggling / changing user role
    // Requirement: "do not implement role update logic. you may have the event handler. i will implement this later."
    const handleRoleChange = (userId: string, newRole: UserRole) => {
        // 1. Optimistic / local state update
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );

        const targetUser = users.find((u) => u.id === userId);
        const userName = targetUser?.name || "User";

        toast.add({
            title: "Role Updated",
            description: `${userName}'s role set to "${newRole}". (Database update deferred)`,
            type: "success",
        });

        // 2. Note: The database update of role update for a user will be implemented later by user.
        // e.g. await updateUserRole(userId, newRole);
    };

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Filter and sort users
    const filteredUsers = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        const filtered = users.filter((user) => {
            const matchesQuery =
                query === "" ||
                (user.name && user.name.toLowerCase().includes(query)) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                user.id.toLowerCase().includes(query);

            const matchesRole =
                roleFilter === "All" ? true : user.role === roleFilter;

            return matchesQuery && matchesRole;
        });

        return filtered.sort((a, b) => {
            if (sortOption === "name-asc") {
                return (a.name || "").localeCompare(b.name || "");
            }
            if (sortOption === "name-desc") {
                return (b.name || "").localeCompare(a.name || "");
            }
            if (sortOption === "date-desc") {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            }
            if (sortOption === "date-asc") {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateA - dateB;
            }
            return 0;
        });
    }, [users, searchQuery, roleFilter, sortOption]);

    // Role count totals for filter tabs
    const roleCounts = useMemo(() => {
        return {
            All: users.length,
            admin: users.filter((u) => u.role === "admin").length,
            recruiter: users.filter((u) => u.role === "recruiter").length,
            seeker: users.filter((u) => u.role === "seeker").length,
        };
    }, [users]);

    const filterTabs: { label: string; value: RoleFilter; count: number }[] = [
        { label: "All Users", value: "All", count: roleCounts.All },
        { label: "Administrators", value: "admin", count: roleCounts.admin },
        { label: "Recruiters", value: "recruiter", count: roleCounts.recruiter },
        { label: "Job Seekers", value: "seeker", count: roleCounts.seeker },
    ];

    return (
        <div className="space-y-8">
            {/* Quick KPI Stats Summary */}
            <UserStatsCards users={users} />

            {/* Search, Filter Tabs & Sort Controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or user ID..."
                        className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Role Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {filterTabs.map((tab) => {
                            const isSelected = roleFilter === tab.value;
                            return (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setRoleFilter(tab.value)}
                                    className={`flex h-9 items-center gap-2 rounded-xl px-3.5 text-xs font-medium transition ${
                                        isSelected
                                            ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                                            : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                            isSelected
                                                ? "bg-white/20 text-white"
                                                : "bg-white/10 text-gray-400"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative inline-block">
                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value as SortOption)
                            }
                            className="h-9 appearance-none rounded-xl border border-white/10 bg-white/5 pl-3 pr-8 text-xs font-medium text-gray-300 transition hover:border-white/20 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                            <option value="name-asc" className="bg-[#18181f] text-gray-200">
                                Name (A-Z)
                            </option>
                            <option value="name-desc" className="bg-[#18181f] text-gray-200">
                                Name (Z-A)
                            </option>
                            <option value="date-desc" className="bg-[#18181f] text-gray-200">
                                Newest First
                            </option>
                            <option value="date-asc" className="bg-[#18181f] text-gray-200">
                                Oldest First
                            </option>
                        </select>
                        <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Users Table Card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-xl shadow-black/20">
                <Table>
                    <TableHeader className="bg-white/[0.02]">
                        <TableRow className="border-b border-white/10 hover:bg-transparent">
                            <TableHead className="min-w-[240px]">
                                User / Member
                            </TableHead>
                            <TableHead className="min-w-[130px]">
                                Current Role
                            </TableHead>
                            <TableHead className="min-w-[260px]">
                                Role Access (Toggle)
                            </TableHead>
                            <TableHead className="min-w-[130px]">
                                Verification
                            </TableHead>
                            <TableHead className="min-w-[130px]">
                                Joined Date
                            </TableHead>
                            <TableHead className="text-right min-w-[120px]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-44 text-center text-gray-400"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <XCircle className="size-6 text-gray-500" />
                                        <p className="text-sm font-medium text-gray-300">
                                            No users match your criteria
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Try adjusting your search query or role filter.
                                        </p>
                                        {(searchQuery || roleFilter !== "All") && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setRoleFilter("All");
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
                            filteredUsers.map((user) => {
                                const initials = (user.name || "User")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase();

                                return (
                                    <TableRow
                                        key={user.id}
                                        className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                                    >
                                        {/* User / Member */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10 text-xs font-bold text-violet-300">
                                                    {initials}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-white truncate">
                                                        {user.name || "Anonymous User"}
                                                    </p>
                                                    <a
                                                        href={`mailto:${user.email}`}
                                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-violet-400 hover:underline truncate"
                                                        title={user.email}
                                                    >
                                                        <Mail className="size-3 shrink-0" />
                                                        <span className="truncate">
                                                            {user.email}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Current Role */}
                                        <TableCell>
                                            <UserRoleBadge role={user.role} />
                                        </TableCell>

                                        {/* Role Access (Toggleable Buttons) */}
                                        <TableCell>
                                            <UserRoleToggle
                                                currentRole={user.role}
                                                onRoleChange={(newRole) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        newRole
                                                    )
                                                }
                                            />
                                        </TableCell>

                                        {/* Verification */}
                                        <TableCell>
                                            {user.emailVerified ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                                                    <CheckCircle2 className="size-3.5" />
                                                    <span>Verified</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                                                    <Clock className="size-3.5" />
                                                    <span>Pending</span>
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Joined Date */}
                                        <TableCell>
                                            <p className="text-xs font-medium text-gray-300">
                                                {formatDate(
                                                    user.createdAt
                                                        ? typeof user.createdAt ===
                                                          "string"
                                                            ? user.createdAt
                                                            : user.createdAt.toISOString()
                                                        : undefined
                                                )}
                                            </p>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <UserDetailsDialog
                                                    user={user}
                                                    onRoleChange={(newRole) =>
                                                        handleRoleChange(
                                                            user.id,
                                                            newRole
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopyId(user.id)
                                                    }
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                                    title="Copy User ID"
                                                >
                                                    {copiedId === user.id ? (
                                                        <Check className="size-4 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="size-4" />
                                                    )}
                                                </button>

                                                <a
                                                    href={`mailto:${user.email}?subject=HireLoop Account Update`}
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                                    title="Email user"
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
