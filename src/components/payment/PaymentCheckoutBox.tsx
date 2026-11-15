"use client";

import React, { useState } from "react";
import {
    Lock,
    CreditCard,
    Shield,
    Loader2,
    ArrowRight,
    User,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";

interface PaymentCheckoutBoxProps {
    onPay?: () => Promise<void> | void;
    className?: string;
}

export function PaymentCheckoutBox({
    onPay,
    className = "",
}: PaymentCheckoutBoxProps) {
    const { data: session } = useSession();
    const user = session?.user;

    const [isProcessing, setIsProcessing] = useState(false);

    const handleProceedToStripe = async () => {
        setIsProcessing(true);

        try {
            if (onPay) {
                await onPay();
            } else {
                // Placeholder until Stripe Checkout session endpoint is connected
                toast.add({
                    title: "Connecting to Stripe Checkout",
                    description: "Stripe checkout session integration will redirect you to secure checkout.",
                    type: "info",
                });
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.add({
                title: "Checkout Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "Unable to start checkout. Please try again.",
                type: "error",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div
            className={`rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-black/40 sm:p-8 ${className}`}
        >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                        <CreditCard className="size-4" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                        Order Summary
                    </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Lock className="size-3 text-emerald-400" />
                    <span>Secure Checkout</span>
                </div>
            </div>

            {/* Account Details */}
            {user && (
                <div className="my-5 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-xs">
                    <p className="font-medium text-gray-400 mb-2">
                        Billed To Account:
                    </p>
                    <div className="space-y-1 text-gray-200">
                        <div className="flex items-center gap-2">
                            <User className="size-3.5 text-gray-500" />
                            <span className="font-medium text-white">
                                {user.name || "Job Seeker"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="size-3.5 text-gray-500" />
                            <span className="text-gray-400">{user.email}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 border-b border-white/5 py-4 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-300">
                    <span>HireLoop Pro (Monthly Plan)</span>
                    <span className="font-semibold text-white">$19.00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Platform &amp; Application Processing</span>
                    <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Estimated Tax</span>
                    <span className="text-gray-400">$0.00</span>
                </div>
            </div>

            {/* Total Due */}
            <div className="my-5 flex items-baseline justify-between">
                <div>
                    <p className="text-sm font-semibold text-white">Total Due Today</p>
                    <p className="text-[11px] text-gray-500">Renews automatically. Cancel anytime.</p>
                </div>
                <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    $19.00
                </span>
            </div>

            {/* Stripe Badge Note */}
            <div className="mb-6 rounded-xl border border-violet-500/20 bg-violet-600/5 p-3 text-xs text-gray-300">
                <div className="flex items-center gap-2 font-medium text-violet-400">
                    <Shield className="size-4" />
                    <span>Powered by Stripe</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-400 leading-relaxed">
                    You will be redirected to Stripe&apos;s encrypted payment portal to complete your transaction with card, Apple Pay, or Google Pay.
                </p>
            </div>

            {/* Pay Button */}
            <Button
                type="button"
                onClick={handleProceedToStripe}
                disabled={isProcessing}
                className="h-12 w-full rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 active:scale-[0.99] disabled:opacity-60 sm:h-14 sm:text-base"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="mr-2 size-5 animate-spin" />
                        <span>Preparing Checkout...</span>
                    </>
                ) : (
                    <>
                        <span>Proceed to Stripe Checkout</span>
                        <ArrowRight className="ml-2 size-4" />
                    </>
                )}
            </Button>

            {/* Security Assurance Footer */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <Lock className="size-3" />
                <span>256-bit SSL encrypted • Safe &amp; confidential</span>
            </div>
        </div>
    );
}

