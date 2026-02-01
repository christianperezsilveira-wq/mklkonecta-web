import type { NextAuthConfig } from "next-auth";


export const authConfig = {
    providers: [], // Providers defined in auth.ts
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
            }

            // Support manual trigger update if needed
            if (trigger === "update" && session) {
                token.name = session.user.name;
                token.role = session.user.role;
            }
            return token;
        }
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig;
