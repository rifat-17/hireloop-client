import type { JobType, SalaryFrequency } from "./job";

export type ApplicationStatus =
    | "Pending"
    | "In Review"
    | "Interviewing"
    | "Offered"
    | "Rejected"
    | "Withdrawn";

export interface JobApplicationInput {
    jobId: string;
    userId: string;
    email: string;
    applicantName?: string;
    jobTitle: string;
    companyName: string;
    category?: string;
    jobType?: JobType;
    location?: string;
    isRemote?: boolean;
    salary?: string;
    minSalary?: string;
    maxSalary?: string;
    salaryFrequency?: SalaryFrequency;
    deadline?: string;
    status: ApplicationStatus;
    appliedDate: string;
    resumeUrl?: string;
    coverLetter?: string;
}

export interface JobApplication extends JobApplicationInput {
    _id: string;
    updatedDate?: string;
    notes?: string;
}

export interface ApplyJobResponse {
    acknowledged?: boolean;
    insertedId?: string;
    message?: string;
}

