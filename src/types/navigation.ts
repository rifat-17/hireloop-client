import type { LucideIcon } from "lucide-react";

export interface MenuItem {
    id: string;
    name: string;
    url: string;
    icon: LucideIcon;
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

