



const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const getJobs = async () => {
    const response = await fetch(`${API_URL}/jobs`,)
    return response.json();
};

