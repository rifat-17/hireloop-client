import { headers } from "next/headers";
import { auth } from "../auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";


export const getUsers = async () => {
    const users = await auth.api.listUsers({
        query: {
            
            sortBy: "name", // The field to sort by.
            sortDirection: "desc", // The direction to sort by.
            
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return users;
}


export const getUserPremiumById = async (userId: string) => {
    const response = await fetch(`${API_URL}/users/${userId}/premium`)
    return response.json();
}

