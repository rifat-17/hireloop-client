import type { JobListing } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const getJobs = async (query = ""): Promise<JobListing[]> => {
    try {
        const response = await fetch(`${API_URL}/jobs?${query}`);
        if (!response.ok) return [];
        return response.json();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
};

export const getJobById = async (id: string): Promise<JobListing | null> => {
    try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            cache: "no-store",
        });
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return null;
    }
};
