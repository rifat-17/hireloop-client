import type { JobListing } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const getJobs = async (query = ''): Promise<JobListing[]> => {
    const response = await fetch(`${API_URL}/jobs?${query}`);
    return response.json();
};
