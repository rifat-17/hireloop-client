import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export const getSession = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
}

export const requireRole = async(role: string)=> {
     const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session || session?.user.role !== role) {
        redirect("/unauthorized");
    }
    return session;
}