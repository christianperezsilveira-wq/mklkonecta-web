import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db) as any,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                try {
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data;

                        const user = await db.user.findUnique({ where: { email } });
                        if (!user || !user.password) return null;

                        const passwordsMatch = await bcrypt.compare(password, user.password);

                        if (passwordsMatch) {
                            if (!user.isApproved) {
                                return null;
                            }
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                isApproved: user.isApproved,
                            };
                        }
                    }
                    return null;
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account }) {
            if (account?.provider === "credentials") return true;

            if (account?.provider === "google") {
                const dbUser = await db.user.findUnique({
                    where: { email: user.email ?? "" }
                });

                if (!dbUser || !dbUser.isApproved) {
                    return "/login?error=PendingApproval";
                }
            }

            return true;
        }
    }
});

