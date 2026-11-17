"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyTransactionIdProps {
    transactionId: string;
}

export function CopyTransactionId({ transactionId }: CopyTransactionIdProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof window !== "undefined" && transactionId) {
            navigator.clipboard.writeText(transactionId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <code className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-violet-300 select-all sm:text-sm">
                {transactionId}
            </code>
            <button
                type="button"
                onClick={handleCopy}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition hover:border-violet-500/30 hover:bg-violet-600/10 hover:text-white"
                title={copied ? "Copied to clipboard!" : "Copy Transaction ID"}
                aria-label="Copy Transaction ID"
            >
                {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                ) : (
                    <Copy className="size-3.5" />
                )}
            </button>
        </div>
    );
}

