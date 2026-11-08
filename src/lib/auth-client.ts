import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

// `inferAdditionalFields<typeof auth>()` gives the client type-safety for the
// server's custom user fields (e.g. `role`) without importing server code.
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()]
})

export const { signIn, signUp, signOut, useSession } = authClient;
