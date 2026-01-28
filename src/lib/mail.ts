import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://${process.env.VERCEL_URL || "localhost:3000"}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev", // En producción deberías configurar tu dominio real
        to: email,
        subject: "Confirma tu cuenta - MKL Konecta",
        html: `
            <h1>Bienvenido a MKL Konecta</h1>
            <p>Haz clic en el siguiente enlace para activar tu cuenta corporativa:</p>
            <a href="${confirmLink}">Confirmar Cuenta</a>
        `
    });
};
