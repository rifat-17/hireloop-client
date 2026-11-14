import type {
    JobApplication,
    JobApplicationInput,
    ApplyJobResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function applyToAJob(
    data: JobApplicationInput
): Promise<ApplyJobResponse> {
    try {
        const response = await fetch(`${API_URL}/applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error("Error applying to job:", error);
        return {
            acknowledged: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to submit application",
        };
    }
}

export async function getMyApplications(
    email?: string
): Promise<JobApplication[]> {
    try {
        const query = email ? `?email=${encodeURIComponent(email)}` : "";
        const response = await fetch(`${API_URL}/applications${query}`, {
            cache: "no-store",
        });
        if (!response.ok) return [];
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching applications:", error);
        return [];
    }
}
