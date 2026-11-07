
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";

type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};

const initialFormData: SignUpFormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
};

export function SignUpForm() {
    const [formData, setFormData] =
        useState<SignUpFormData>(initialFormData);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-2xl shadow-violet-950/10 sm:p-8">

            {/* Heading */}
            <div className="mb-8 text-center">
                <Link
                    href="/"
                    className="mb-6 inline-block text-2xl font-bold tracking-tight text-white"
                >
                    Hire<span className="text-violet-500">loop.</span>
                </Link>

                <h1 className="text-2xl font-semibold text-white">
                    Create your account
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                    Start your journey with Hireloop today.
                </p>
            </div>

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

                {/* Password */}
                <div>
                    <label htmlFor="password" className={labelClass}>
                        Password
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${inputClass} pr-16`}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-violet-400"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`${inputClass} pr-16`}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-violet-400"
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
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

            {/* Sign In Link */}
            <p className="mt-7 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-violet-400 hover:text-violet-300"
                >
                    Log In
                </Link>
            </p>
        </div>
    );
}
