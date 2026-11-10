import type { JobListing } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const getJobs = async (): Promise<JobListing[]> => {
    const response = await fetch(`${API_URL}/jobs`);
    return response.json();
};
