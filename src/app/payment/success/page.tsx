import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    CheckCircle2,
    Briefcase,
    FileText,
    Sparkles,
    ShieldCheck,
    Receipt,
    Calendar,
    Mail,
} from "lucide-react";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";
import { checkoutVerify } from "@/lib/actions/payments";
import { Button } from "@/components/ui/button";
import { CopyTransactionId } from "@/components/payment";

export const metadata = {
    title: "Payment Successful | HireLoop",
    description: "Your payment has been confirmed and your HireLoop Pro membership is active.",
};

interface PaymentSuccessPageProps {
    searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({
    searchParams,
}: PaymentSuccessPageProps) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id (`cs_test_...`)");
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    const { status, payment_status, customer_email, payment_intent } = session;

    if (status === "open") {
        return redirect("/");
    }

    // Call backend verification if completed
    if (status === "complete" && payment_status === "paid") {
        try {
            await checkoutVerify(session_id);
        } catch (error) {
            console.error("Backend checkout verification error:", error);
        }
    }

    const paymentIntentObj =
        typeof payment_intent === "object" && payment_intent !== null
            ? (payment_intent as Stripe.PaymentIntent)
            : null;

    // Transaction ID extracted from payment_intent.id
    const transactionId =
        paymentIntentObj?.id ||
        (typeof payment_intent === "string" ? payment_intent : session_id);

    const amountPaid = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : "$19.00";

    const currency = (session.currency || "USD").toUpperCase();

    const formattedDate = session.created
        ? new Date(session.created * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          });

    const planTitle =
        session.line_items?.data?.[0]?.description ||
        "HireLoop Pro Membership (Monthly)";

    const recipientEmail =
        customer_email ||
        paymentIntentObj?.receipt_email ||
        "your registered email address";

    const isPaid = status === "complete" && payment_status === "paid";

    return (
        <main className="min-h-screen bg-[#09090c] px-4 py-12 sm:py-20 text-slate-100 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#101014] p-6 sm:p-10 shadow-2xl shadow-black/60">
                {/* Status Icon */}
                <div className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-950/40">
                    <CheckCircle2 className="size-8 sm:size-10" />
                </div>

                {/* Headings */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
                        <Sparkles className="size-3.5" />
                        <span>Payment Confirmed</span>
                    </div>

                    <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {isPaid ? "Welcome to HireLoop Pro!" : "Payment Status"}
                    </h1>

                    <p className="mx-auto mt-2 max-w-md text-xs text-gray-400 sm:text-sm leading-relaxed">
                        Your transaction was processed successfully. You now have{" "}
                        <strong className="text-white">unlimited job applications</strong> and
                        all premium candidate features unlocked.
                    </p>
                </div>

                {/* Receipt & Transaction Information Card */}
                <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                        <Receipt className="size-4 text-violet-400" />
                        <h2 className="text-sm font-semibold text-white">
                            Payment Details
                        </h2>
                    </div>

                    {/* Transaction ID */}
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <span className="text-xs text-gray-400">Transaction ID</span>
                            <p className="text-[11px] text-gray-500 font-mono">
                                payment_intent.id
                            </p>
                        </div>
                        <CopyTransactionId transactionId={transactionId} />
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 text-xs">
                        <div>
                            <span className="text-gray-400">Product / Plan</span>
                            <p className="mt-0.5 font-medium text-white">{planTitle}</p>
                        </div>

                        <div>
                            <span className="text-gray-400">Amount Paid</span>
                            <p className="mt-0.5 font-semibold text-white">
                                {amountPaid} {currency}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-400">Payment Status</span>
                            <div className="mt-0.5">
                                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                                    {payment_status === "paid" ? "Paid" : payment_status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <span className="text-gray-400">Payment Date</span>
                            <div className="mt-0.5 flex items-center gap-1.5 text-gray-200">
                                <Calendar className="size-3 text-gray-500" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Billed To Email */}
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Receipt Email</span>
                        <div className="flex items-center gap-1.5 text-gray-200">
                            <Mail className="size-3.5 text-gray-500" />
                            <span className="font-medium text-white">{recipientEmail}</span>
                        </div>
                    </div>
                </div>

                {/* Unlocked Benefits Banner */}
                <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-600/5 p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-400">
                        <ShieldCheck className="size-4" />
                        <span>Active Pro Benefits</span>
                    </div>

                    <ul className="mt-2.5 grid grid-cols-1 gap-2 text-xs text-gray-300 sm:grid-cols-2">
                        <li className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-violet-400" />
                            <span>Unlimited job applications</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-violet-400" />
                            <span>Priority recruiter placement</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-violet-400" />
                            <span>Verified applicant badge</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-violet-400" />
                            <span>AI resume &amp; cover letter matching</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                    <Link href="/browse-jobs" className="w-full sm:w-auto">
                        <Button className="h-11 w-full rounded-xl bg-violet-600 px-6 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 sm:text-sm">
                            <Briefcase className="mr-2 size-4" />
                            Browse &amp; Apply to Jobs
                        </Button>
                    </Link>

                    <Link href="/dashboard/seeker/applications" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="h-11 w-full rounded-xl border-white/10 bg-white/5 px-6 text-xs font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-sm"
                        >
                            <FileText className="mr-2 size-4" />
                            My Applications
                        </Button>
                    </Link>
                </div>

                {/* Footer Notice */}
                <p className="mt-6 text-center text-[11px] text-gray-500">
                    A confirmation receipt was sent to {recipientEmail}. Need assistance? Reach us at{" "}
                    <a
                        href="mailto:support@hireloop.com"
                        className="text-violet-400 underline-offset-2 hover:underline"
                    >
                        support@hireloop.com
                    </a>
                    .
                </p>
            </div>
        </main>
    );
}
