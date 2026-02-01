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
                session.user.role = token.role as string;

                // 🚀 Fetch fresh data from DB to ensure updates are reflected
                // despite the JWT strategy.
                try {
                    const freshUser = await db.user.findUnique({
                        where: { id: token.sub },
                        select: { name: true, image: true, role: true }
                    });

                    if (freshUser) {
                        session.user.name = freshUser.name;
                        session.user.image = freshUser.image;
                        session.user.role = freshUser.role; // Ensure role is also fresh
                    }
                } catch (error) {
                    console.error("Error fetching fresh user data:", error);
                }
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
