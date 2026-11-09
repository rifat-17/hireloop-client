"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    FileText,
    Wallet,
    Building2,
    Users,
    Settings,
    type LucideIcon,
    PlusCircle,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

export type Role = "seeker" | "recruiter" | "admin";

export interface MenuItem {
    id: string;
    name: string;
    url: string;
    icon: LucideIcon;
}

export const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        {
            id: "seeker-dashboard",
            name: "Dashboard",
            url: "/dashboard/seeker",
            icon: LayoutDashboard,
        },
        {
            id: "seeker-jobs",
            name: "Jobs",
            url: "/jobs",
            icon: Briefcase,
        },
        {
            id: "seeker-saved-jobs",
            name: "Saved Jobs",
            url: "/dashboard/seeker/saved-jobs",
            icon: Bookmark,
        },
        {
            id: "seeker-applications",
            name: "Applications",
            url: "/dashboard/seeker/applications",
            icon: FileText,
        },
        {
            id: "seeker-billing",
            name: "Billing",
            url: "/dashboard/seeker/billing",
            icon: Wallet,
        },
        {
            id: "seeker-settings",
            name: "Settings",
            url: "/dashboard/seeker/settings",
            icon: Settings,
        },
    ],
    recruiter: [
        {
            id: "recruiter-dashboard",
            name: "Dashboard",
            url: "/dashboard/recruiter",
            icon: LayoutDashboard,
        },
        {
            id: "recruiter-my-company",
            name: "My Company",
            url: "/dashboard/recruiter/company",
            icon: Building2,
        },
        {
            id: "recruiter-manage-jobs",
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: Briefcase,
        },
        {
            id: "recruiter-add-jobs",
            name: "Add Jobs",
            url: "/dashboard/recruiter/jobs/new",
            icon: PlusCircle,
        },
        {
            id: "recruiter-applications",
            name: "Applications",
            url: "/dashboard/recruiter/applications",
            icon: FileText,
        },
        {
            id: "recruiter-settings",
            name: "Settings",
            url: "/dashboard/recruiter/settings",
            icon: Settings,
        },
    ],
    admin: [
        {
            id: "admin-dashboard",
            name: "Dashboard",
            url: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            id: "admin-users",
            name: "Users",
            url: "/dashboard/admin/users",
            icon: Users,
        },
        {
            id: "admin-companies",
            name: "Companies",
            url: "/dashboard/admin/companies",
            icon: Building2,
        },
        {
            id: "admin-jobs",
            name: "Jobs",
            url: "/dashboard/admin/jobs",
            icon: Briefcase,
        },
        {
            id: "admin-payments",
            name: "Payments",
            url: "/dashboard/admin/payments",
            icon: Wallet,
        },
        {
            id: "admin-settings",
            name: "Settings",
            url: "/dashboard/admin/settings",
            icon: Settings,
        },
    ],
};

export function DashboardSidebar() {
    const { data: session } = useSession();
    const role = (session?.user?.role as Role) || "seeker";

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role]?.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}