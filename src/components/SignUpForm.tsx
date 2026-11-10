"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/ui/password-input";
import { USER_ROLES } from "@/constants";
import type { SignUpFormData } from "@/types";

export type { SignUpFormData };

const initialFormData: SignUpFormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker",
    acceptTerms: false,
};

export function SignUpForm() {
    const router = useRouter();

    const [formData, setFormData] =
        useState<SignUpFormData>(initialFormData);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle Sign Up
    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.acceptTerms) {
            setError("Please accept the terms and conditions.");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                callbackURL: "/",
            });

            if (error) {
                setError(error.message || "Registration failed.");
                return;
            }

            setSuccess("Account created successfully!");

            console.log("Sign Up Successful:", {
                user: data?.user,
            });

            // Redirect to homepage on success
            if (data?.user) {
                router.replace("/");
                router.refresh();
            }

        } catch (err) {
            console.error("Sign Up Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500";

    const labelClass = "mb-2 block text-sm font-medium text-gray-300";

    return (
        <AuthCard
            title="Create your account"
            subtitle="Start your journey with Hireloop today."
            footerText="Already have an account?"
            footerLinkText="Log In"
            footerLinkHref="/login"
        >
            <form onSubmit={handleSignUp} className="space-y-5">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className={labelClass}>
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="name"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className={labelClass}>
                        Email Address
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="email"
                        required
                    />
                </div>

                {/* Role */}
                <div role="radiogroup" aria-label="Account type">
                    <span id="role-label" className={labelClass}>
                        Account Type
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                        {USER_ROLES.map((role) => (
                            <label
                                key={role}
                                className="flex cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 py-3 text-sm capitalize text-gray-400 transition has-[:checked]:border-violet-500 has-[:checked]:bg-violet-500/10 has-[:checked]:text-white"
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={role}
                                    checked={formData.role === role}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                {role}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className={labelClass}>
                        Password
                    </label>

                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                        Confirm Password
                    </label>

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-400">
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="mt-1 size-4 accent-violet-600"
                    />

                    <span>
                        I agree to the{" "}
                        <Link href="/terms" className="text-violet-400 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-violet-400 hover:underline">
                            Privacy Policy
                        </Link>
                    </span>
                </label>

                {/* Feedback */}
                {error && (
                    <p role="alert" className="text-sm text-red-400">
                        {error}
                    </p>
                )}

                {success && (
                    <p role="status" className="text-sm text-green-400">
                        {success}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </AuthCard>
    );
}
