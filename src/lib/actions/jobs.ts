"use server"

import type { JobFormData, DeleteJobResponse } from "@/types";
import { protectedMutation } from "../core/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const createJob = async (jobData: JobFormData) => {

    const api = `${API_URL}/jobs`;
    const res = await protectedMutation(api, "POST", jobData)
    return res.json();

   
};

export const deleteJob = async (jobId: string): Promise<DeleteJobResponse> => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
    });

    return response.json();
};
