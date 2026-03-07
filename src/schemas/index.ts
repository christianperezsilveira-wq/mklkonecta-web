import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email es requerido" }),
    password: z.string().min(1, { message: "Contraseña es requerida" }),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    name: z.string().min(1, { message: "Nombre requerido" }),
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

export const ContactSchema = z.object({
    name: z.string().min(1, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    company: z.string().optional(),
    message: z.string().min(1, "Mensaje requerido"),
});
