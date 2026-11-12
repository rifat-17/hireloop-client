
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";


export async function applyToAJob(data) {
    const response = await fetch(`${API_URL}/applications` , {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })
    return response.json();
}