"use server"

import type {
    JobApplication,
    JobApplicationInput,
    ApplyJobResponse,
} from "@/types";
import { authFetch, protectedMutation } from "../core/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function applyToAJob(
    data: JobApplicationInput
): Promise<ApplyJobResponse> {

    const api = `${API_URL}/applications`;
    const res = await protectedMutation(api, "POST", data);
    return res.json();

}

export async function getMyApplications(
    email?: string
): Promise<JobApplication[]> {
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    const api = `${API_URL}/applications?${query}`
    const res = await authFetch(api)
    return res.json()

}


export const getApplicationsCount = async (query = ""): Promise<{ count: number }> => {
    const response = await fetch(`${API_URL}/applications/count?${query}`, {
        cache: "no-store",
    });
    return response.json();
};

export async function getApplicationsByJobId(
    jobId: string
): Promise<JobApplication[]> {
    try {
        const response = await fetch(
            `${API_URL}/applications?jobId=${encodeURIComponent(jobId)}`,
            {
                cache: "no-store",
            }
        );
        if (!response.ok) return [];
        const data = await response.json();
        if (Array.isArray(data)) {
            // Filter to guarantee we match jobId if API returns full set
            const filtered = data.filter((app: JobApplication) => app.jobId === jobId);
            return filtered.length > 0 ? filtered : data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching applications for job:", error);
        return [];
    }
}

/**
 * Placeholder for updating an applicant's status in the database.
 * To be connected by the user later.
 */
export interface UpdateStatusResponse {
    success?: boolean;
    acknowledged?: boolean;
    modifiedCount?: number;
    matchedCount?: number;
    message?: string;
}

export async function updateApplicationStatus(
    applicationId: string,
    status: string
): Promise<UpdateStatusResponse> {

    const api = `${API_URL}/applications/${applicationId}`;
    const res = await protectedMutation(api, "PARCH", applicationId)
    return res.json();

    try {
        const response = await fetch(`${API_URL}/applications/${applicationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            return { success: false, message: "Failed to update status on server" };
        }
        return response.json();
    } catch (error) {
        console.error("Error updating application status:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update status",
        };
    }
}
