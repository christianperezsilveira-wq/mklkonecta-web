import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export const authConfig = {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await db.user.findUnique({ where: { email } });
                    console.log("Login Attempt:", email);
                    console.log("User Found:", !!user);

                    if (!user || !user.password) {
                        console.log("User not found or no password");
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log("Password Match:", passwordsMatch);

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        }
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig;
