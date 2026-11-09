import { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const createJob = async (jobData: JobFormData) => {
    const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(jobData)   ,
    }); 
    return response.json();
};