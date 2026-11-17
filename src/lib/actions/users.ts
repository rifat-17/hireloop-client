import { UserRole } from "@/types";



const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const updateUserRole = async (userId: string, newRole: UserRole) => {
    const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({newRole}),
    })
    return response.json();
} 