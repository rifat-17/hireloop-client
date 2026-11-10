import type { SalaryFrequency } from "@/types";

export function formatSalary(
    min?: string,
    max?: string,
    freq: SalaryFrequency = "per year"
): string {
    const formatNum = (val: string) => {
        const n = Number(val);
        if (isNaN(n) || n === 0) return val;
        if (n >= 1000) return `${Math.round(n / 1000)}k`;
        return `${n}`;
    };

    const freqLabel =
        freq === "per hour" ? "/ hr" : freq === "per month" ? "/ mo" : "/ yr";

    if (min && max) {
        return `$${formatNum(min)} - $${formatNum(max)} ${freqLabel}`;
    }
    if (min) {
        return `$${formatNum(min)} ${freqLabel}`;
    }
    return "Competitive";
}

export function formatDate(dateStr?: string): string {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

