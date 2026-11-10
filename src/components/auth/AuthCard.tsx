import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
    className?: string;
}

export function AuthCard({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
    className,
}: AuthCardProps) {
    return (
        <div
            className={cn(
                "w-full max-w-md rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-violet-950/10 sm:p-8",
                className
            )}
        >
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="mb-6 inline-block text-2xl font-bold tracking-tight text-white"
                >
                    Hire<span className="text-violet-500">loop.</span>
                </Link>

                <h1 className="text-2xl font-semibold text-white">{title}</h1>

                <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
            </div>

            {children}

            {footerText && footerLinkText && footerLinkHref && (
                <p className="mt-7 text-center text-sm text-gray-400">
                    {footerText}{" "}
                    <Link
                        href={footerLinkHref}
                        className="font-semibold text-violet-400 hover:text-violet-300"
                    >
                        {footerLinkText}
                    </Link>
                </p>
            )}
        </div>
    );
}

