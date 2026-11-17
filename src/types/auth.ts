export type UserRole = "seeker" | "recruiter" | "admin";

/** Alias for backward compatibility */
export type Role = UserRole;

export interface SignInFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    acceptTerms: boolean;
}

export interface AppUser {
    id: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string | null;
    role: UserRole;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    banned?: boolean | null;
    banReason?: string | null;
    premium?: boolean;
}


