"use server"

import { UserRole } from "@/types";
import { protectedMutation } from "../core/session";



const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const updateUserRole = async (userId: string, newRole: UserRole) => {

    const api = `${API_URL}/users/${userId}/role`;
    const response = await protectedMutation(api, "PATCH", { newRole });
    return response.json();

} 