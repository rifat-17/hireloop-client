export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type SalaryFrequency = "per hour" | "per month" | "per year";

export type JobStatus = "Active" | "Expired" | "Draft";

export interface JobFormData {
    title: string;
    companyName: string;
    category: string;
    jobType: JobType;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: SalaryFrequency;
    responsibilities: string;
    requirements: string;
    status: JobStatus;
    applicantsCount: number;
}

export interface JobListing extends JobFormData {
    _id: string;
    postedDate: string;
}

export interface DeleteJobResponse {
    acknowledged?: boolean;
    deletedCount: number;
}

