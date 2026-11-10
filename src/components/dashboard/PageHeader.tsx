import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    breadcrumbs,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    {breadcrumbs.map((crumb, idx) => {
                        const isLast = idx === breadcrumbs.length - 1;
                        return (
                            <React.Fragment key={crumb.label}>
                                {idx > 0 && (
                                    <ChevronRight className="size-4 text-gray-600" />
                                )}
                                {crumb.href && !isLast ? (
                                    <Link
                                        href={crumb.href}
                                        className="transition hover:text-violet-400"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={
                                            isLast
                                                ? "font-medium text-gray-200"
                                                : "text-gray-400"
                                        }
                                    >
                                        {crumb.label}
                                    </span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </nav>
            )}

            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-gray-400">
                            {description}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex items-center gap-3">{actions}</div>
                )}
            </div>
        </div>
    );
}

