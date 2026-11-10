import type { JobFormData, JobType, SalaryFrequency, UserRole } from "@/types";

export const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product & Management",
    "Marketing & Sales",
    "Customer Support",
    "Finance & Accounting",
] as const;

export const JOB_TYPES: JobType[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
];

export const SALARY_FREQUENCIES: SalaryFrequency[] = [
    "per hour",
    "per month",
    "per year",
];

export const USER_ROLES: readonly UserRole[] = ["seeker", "recruiter", "admin"] as const;

export const INITIAL_JOB_FORM_DATA: JobFormData = {
    title: "",
    companyName: "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryFrequency: "per year",
    responsibilities: "",
    requirements: "",
    status: "Active",
    applicantsCount: 0,
};

