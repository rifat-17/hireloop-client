
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const checkoutVerify = async (sessionId: string) => {
    const response = await fetch(`${API_URL}/payments/checkout-verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    })

    return response.json();
}