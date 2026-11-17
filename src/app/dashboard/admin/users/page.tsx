import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UsersManagementView } from "@/components/admin";
import { getUsers } from "@/lib/server/users";
import type { AppUser } from "@/types";

export const metadata: Metadata = {
    title: "Users Management | Admin Dashboard | HireLoop",
    description: "Manage users, monitor registrations, and configure account roles across HireLoop.",
};

export default async function AdminUsersPage() {
    let initialUsers: AppUser[] = [];

    try {
        const rawResult = await getUsers();

        if (rawResult) {
            // Better-auth returns { users: [...], total: number } or an array directly
            if (Array.isArray((rawResult as { users?: unknown }).users)) {
                initialUsers = (rawResult as { users: AppUser[] }).users;
            } else if (Array.isArray(rawResult)) {
                initialUsers = rawResult as AppUser[];
            }
        }
    } catch (err) {
        console.error("Failed to load users in AdminUsersPage:", err);
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8 pb-16">
            {/* Top Breadcrumb & Page Headings */}
            <PageHeader
                title="Users Management"
                description="Manage user directory, monitor account verifications, and toggle access permissions across your platform."
                breadcrumbs={[
                    { label: "Admin", href: "/dashboard/admin" },
                    { label: "Users Management" },
                ]}
            />

            {/* Interactive Users Management View */}
            <UsersManagementView initialUsers={initialUsers} />
        </div>
    );
}
