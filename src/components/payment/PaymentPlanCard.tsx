import React from "react";
import { CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

interface PaymentPlanCardProps {
    className?: string;
}

const PLAN_FEATURES = [
    {
        title: "Unlimited Job Applications",
        description: "Apply to as many positions as you want without the 10-job free limit.",
    },
    {
        title: "Priority Candidate Placement",
        description: "Your applications appear at the top of recruiter candidate dashboards.",
    },
    {
        title: "Verified Applicant Badge",
        description: "Stand out to hiring managers with a verified talent status.",
    },
    {
        title: "Real-time Application Analytics",
        description: "See when recruiters review your profile and open your resume.",
    },
    {
        title: "AI Resume & Cover Letter Matching",
        description: "Tailor your credentials to job requirements with instant recommendations.",
    },
];

export function PaymentPlanCard({ className = "" }: PaymentPlanCardProps) {
    return (
        <div
            className={`rounded-2xl border border-violet-500/30 bg-[#101014] p-6 shadow-2xl shadow-violet-950/20 sm:p-8 ${className}`}
        >
            {/* Plan Badge & Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-600/10 px-3 py-1 text-xs font-semibold text-violet-400">
                        <Sparkles className="size-3.5" />
                        <span>HireLoop Pro</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                        Candidate Career Boost
                    </h2>
                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                        Everything you need to land interviews and accelerate your job search.
                    </p>
                </div>
            </div>

            {/* Price Banner */}
            <div className="my-6 flex items-baseline gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    $19
                </span>
                <span className="text-xs text-gray-400 sm:text-sm">
                    / month • billed monthly
                </span>
                <span className="ml-auto rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                    Cancel anytime
                </span>
            </div>

            {/* Features List */}
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    What&apos;s included:
                </p>

                <div className="space-y-3.5">
                    {PLAN_FEATURES.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-violet-400">
                                <CheckCircle2 className="size-3.5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-white sm:text-sm">
                                    {feature.title}
                                </h3>
                                <p className="text-[11px] text-gray-400 sm:text-xs">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-gray-400">
                <ShieldCheck className="size-5 shrink-0 text-violet-400" />
                <span>
                    <strong>14-day money-back guarantee.</strong> If you don&apos;t love HireLoop Pro, get a full refund no questions asked.
                </span>
            </div>
        </div>
    );
}
