"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordInput } from "@/components/ui/password-input";
import type { SignInFormData } from "@/types";
import { useSearchParams } from "next/navigation";

export type { SignInFormData };

const initialFormData: SignInFormData = {
    email: "",
    password: "",
    rememberMe: false,
};

export function SignInForm() {
    const [formData, setFormData] =
        useState<SignInFormData>(initialFormData);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle Sign In
    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {



        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
                callbackURL: redirectTo,
            });

            if (error) {
                setError(error.message || "Login failed.");
                return;
            }

            console.log("Sign In Successful:", {
                user: data?.user,
            });

        } catch (err) {
            console.error("Sign In Error:", err);
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
            title="Welcome Back"
            subtitle="Sign in to continue to your account."
            footerText="Don't have an account?"
            footerLinkText="Create an account"
            footerLinkHref="/register"
        >
            <form onSubmit={handleSignIn} className="space-y-5">
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
                        autoComplete="current-password"
                        required
                    />
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-gray-400">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="size-4 accent-violet-600"
                        />
                        Remember me
                    </label>

                    <Link
                        href="/forgot-password"
                        className="text-violet-400 hover:text-violet-300"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <p role="alert" className="text-sm text-red-400">
                        {error}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Signing In..." : "Log In"}
                </button>
            </form>
        </AuthCard>
    );
}
