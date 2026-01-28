import { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: string;
            isApproved: boolean;
            /**
             * By default, TypeScript expects the standard NextAuth user fields.
             * We extend it here.
             */
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
        isApproved: boolean;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        role: string;
        isApproved: boolean;
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        role: string;
        isApproved: boolean;
    }
}
