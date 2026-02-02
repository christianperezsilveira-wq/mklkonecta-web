import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

import Credentials from "next-auth/providers/credentials";
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
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    console.log("🛠️ AUTH: Iniciando validación de campos...");
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data;
                        console.log("🛠️ AUTH: Buscando usuario:", email);

                        const user = await db.user.findUnique({ where: { email } });
                        if (!user || !user.password) {
                            console.log("🛠️ AUTH: Usuario no encontrado o sin password.");
                            return null;
                        }

                        console.log("🛠️ AUTH: Comparando contraseñas...");
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (passwordsMatch) {
                            console.log("🛠️ AUTH: Match exitoso! Retornando usuario.");
                            return user;
                        }
                        console.log("🛠️ AUTH: Contraseña incorrecta.");
                    }
                    return null;
                } catch (error) {
                    console.error("❌ AUTH Error en authorize:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // Merge with authConfig callbacks if needed, but here we override 'session'
        // to add the DB fetch for the image.
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as string;

                try {
                    const freshUser = await db.user.findUnique({
                        where: { id: token.sub },
                        select: { name: true, image: true, role: true }
                    });

                    if (freshUser) {
                        session.user.name = freshUser.name;
                        session.user.image = freshUser.image;
                        session.user.role = freshUser.role;
                    }
                } catch (error) {
                    console.error("Error fetching fresh user data:", error);
                }
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            // Re-implement or call super if possible? 
            // Simpler to just re-implement standard logic here to be safe.
            if (user) {
                token.sub = user.id;
                token.role = user.role;
            }
            if (trigger === "update" && session) {
                token.name = session.user.name;
                token.role = session.user.role;
            }
            return token;
        }
    }
});
