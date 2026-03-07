"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken, generatePasswordResetToken } from "@/lib/tokens";
import { sendVerificationEmail, sendPendingApprovalEmail, sendPasswordResetEmail } from "@/lib/mail";

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

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email es requerido"
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Mínimo 6 caracteres requeridos"
    }),
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

        console.log("🔑 LOGIN: Intentando signIn...");
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // ¡IMPORTANTE! Manejaremos la redirección en el cliente
        });

        if (result?.error) {
            console.log("❌ LOGIN: Error de credentials", result.error);
            return { error: "Credenciales inválidas" };
        }

        console.log("✅ LOGIN: Éxito total. Retornando al cliente.");
        return { success: true };
    } catch (error) {
        console.error("❌ LOGIN ERROR CRÍTICO:", error);

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales inválidas" };
                default:
                    return { error: "Algo salió mal al iniciar sesión" };
            }
        }

        return { error: `Error interno: ${error instanceof Error ? error.message : "Desconocido"}` };
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

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Email inválido" };
    }

    const { email: rawEmail } = validatedFields.data;
    const email = rawEmail.toLowerCase();

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (!existingUser) {
        return { error: "Email no encontrado" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    const result = await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    if (result?.error) {
        return { error: "No se pudo enviar el correo. Verifique la configuración de Resend." };
    }

    return { success: "Correo de restablecimiento enviado" };
};

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) {
        return { error: "¡Token ausente!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { password } = validatedFields.data;

    const existingToken = await db.passwordResetToken.findUnique({
        where: { token }
    });

    if (!existingToken) {
        return { error: "¡Token inválido!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "¡El token ha expirado!" };
    }

    const existingUser = await db.user.findUnique({
        where: { email: existingToken.email }
    });

    if (!existingUser) {
        return { error: "¡El email no existe!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "¡Contraseña actualizada!" };
};

export const logout = async () => {
    await signOut({ redirectTo: "/login" });
};
