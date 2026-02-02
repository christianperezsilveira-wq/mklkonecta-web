"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail, sendPendingApprovalEmail } from "@/lib/mail";

// Schema de Validación
const RegisterSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    name: z.string().min(1, { message: "Nombre requerido" }),
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { email: rawEmail, password } = validatedFields.data;
    const email = rawEmail.toLowerCase();

    try {
        const existingUser = await db.user.findUnique({ where: { email } });

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: "Email no existe!" };
        }

        if (!existingUser.isApproved) {
            return { error: "Tu cuenta está pendiente de aprobación." };
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales inválidas" };
                default:
                    return { error: "Algo salió mal al iniciar sesión" };
            }
        }

        // ¡CRÍTICO! Next.js necesita que los errores de redirección se propaguen
        // para que la redirección realmente ocurra.
        throw error;
    }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { email: rawEmail, password, name } = validatedFields.data;
    const email = rawEmail.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return { error: "El email ya está en uso" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(verificationToken.identifier, verificationToken.token);
    await sendPendingApprovalEmail(email, name);

    return { success: "¡Cuenta creada! Esperando aprobación del administrador." };
};

export const newVerification = async (token: string) => {
    const existingToken = await db.verificationToken.findUnique({
        where: { token }
    });

    if (!existingToken) {
        return { error: "Token inválido o no existe" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "El token ha expirado" };
    }

    const existingUser = await db.user.findUnique({
        where: { email: existingToken.identifier }
    });

    if (!existingUser) {
        return { error: "Email no existe" };
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.identifier
        }
    });

    await db.verificationToken.delete({
        where: { token: existingToken.token }
    });

    return { success: "¡Email verificado! Ya puedes iniciar sesión." };
};

export const logout = async () => {
    await signOut({ redirectTo: "/login" });
};
