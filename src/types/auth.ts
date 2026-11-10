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

