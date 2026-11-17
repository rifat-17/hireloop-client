const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const getUserPremiumById = async (userId: string) => {
    const response = await fetch(`${API_URL}/users/${userId}/premium`);
    return response.json();
};

/**
 * Placeholder for updating a user's role.
 * User will implement this later.
 */
export const updateUserRole = async (userId: string, role: string) => {
    console.log("updateUserRole placeholder called for user:", userId, "new role:", role);
    return { success: true };
};
