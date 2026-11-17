import React from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { PaymentPlanCard, PaymentCheckoutBox } from "@/components/payment";

const FAQS = [
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription with a single click from your account dashboard. You will continue to have Pro benefits until the end of your billing period.",
    },
    {
        question: "What happens to applications I've already submitted?",
        answer: "All your existing job applications remain active and visible to employers, even if your subscription expires.",
    },
    {
        question: "How does the 14-day money-back guarantee work?",
        answer: "If HireLoop Pro doesn't meet your expectations, contact our support team within 14 days of upgrade for an immediate, hassle-free refund.",
    },
    {
        question: "Is my payment secure?",
        answer: "Yes, all payments are processed directly through Stripe's certified PCI-compliant servers with 256-bit bank-grade encryption. We never store your full card details.",
    },
];

export const metadata = {
    title: "Upgrade to HireLoop Pro | HireLoop",
    description: "Unlock unlimited job applications and fast-track your career with HireLoop Pro.",
};

export default async function PaymentPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {

    const { canceled } = await searchParams

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }

    return (
        <main className="min-h-screen bg-[#09090c] pb-24 text-slate-100">
            {/* Top Navigation & Header */}
            <div className="border-b border-white/5 bg-gradient-to-b from-[#101014] to-[#09090c] px-4 pt-10 pb-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6">
                        <Link
                            href="/browse-jobs"
                            className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 transition hover:text-violet-400 sm:text-sm"
                        >
                            <ArrowLeft className="size-4" />
                            <span>Back to Browse Jobs</span>
                        </Link>
                    </div>

                    <div className="max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-600/10 px-3.5 py-1 text-xs font-semibold text-violet-400">
                            <span className="size-1.5 rounded-full bg-violet-400" />
                            Application Limit Reached
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Unlock Unlimited Applications with HireLoop Pro
                        </h1>

                        <p className="text-sm text-gray-400 sm:text-base leading-relaxed">
                            You&apos;ve reached your 10 free job applications limit. Upgrade now to apply without limits, boost your profile visibility, and connect directly with hiring managers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Plan Benefits & Features */}
                    <div className="lg:col-span-7">
                        <PaymentPlanCard />
                    </div>

                    {/* Right Column: Checkout & Pay with Stripe */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-20">
                            <PaymentCheckoutBox />
                            
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 border-t border-white/5 pt-12">
                    <div className="mb-8 flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                            <HelpCircle className="size-4" />
                        </div>
                        <h2 className="text-xl font-bold text-white sm:text-2xl">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {FAQS.map((faq) => (
                            <div
                                key={faq.question}
                                className="rounded-2xl border border-white/10 bg-[#101014] p-5 sm:p-6"
                            >
                                <h3 className="text-sm font-semibold text-white sm:text-base">
                                    {faq.question}
                                </h3>
                                <p className="mt-2 text-xs text-gray-400 sm:text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
