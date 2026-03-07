import { Resend } from "resend";

const getResend = () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not defined");
    }
    return new Resend(apiKey);
};

export const sendPendingApprovalEmail = async (email: string, name: string) => {
    console.log(`📧 Enviando email de registro recibido a: ${email}`);
    const result = await getResend().emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Registro Recibido - MKL Konecta",
        html: `
            <h1>¡Hola ${name}!</h1>
            <p>Hemos recibido tu solicitud de registro con éxito.</p>
            <p>Tu cuenta se encuentra actualmente en estado <strong>Pendiente de Aprobación</strong>.</p>
            <p>Un administrador revisará tu solicitud y te notificaremos por correo electrónico una vez que tu acceso haya sido habilitado.</p>
            <br />
            <p>Gracias,</p>
            <p>El equipo de MKL Konecta</p>
        `
    });
    if (result.error) console.error("❌ Error enviando email de registro:", result.error);
    return result;
};

export const sendApprovalEmail = async (email: string, name: string) => {
    const loginLink = `http://${process.env.VERCEL_URL || "localhost:3000"}/login`;

    console.log(`📧 Enviando email de aprobación a: ${email}`);
    const result = await getResend().emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "¡Cuenta Aprobada! - MKL Konecta",
        html: `
            <h1>¡Bienvenido a MKL Konecta!</h1>
            <p>Nos complace informarte que tu cuenta ha sido <strong>APROBADA</strong>.</p>
            <p>Ya tienes acceso completo a la plataforma.</p>
            <p>Haz clic en el siguiente enlace para iniciar sesión:</p>
            <a href="${loginLink}" style="background-color: #E60000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Acceder al Portal</a>
        `
    });
    if (result.error) console.error("❌ Error enviando email de aprobación:", result.error);
    return result;
};

// Mantener por compatibilidad si es necesario, pero el flujo principal ahora usará las de arriba
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://${process.env.VERCEL_URL || "localhost:3000"}/auth/new-verification?token=${token}`;

    console.log(`📧 Enviando email de verificación a: ${email}`);
    const result = await getResend().emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirma tu cuenta - MKL Konecta",
        html: `
            <h1>Bienvenido a MKL Konecta</h1>
            <p>Haz clic en el siguiente enlace para activar tu cuenta corporativa:</p>
            <a href="${confirmLink}">Confirmar Cuenta</a>
        `
    });
    if (result.error) console.error("❌ Error enviando email de verificación:", result.error);
    return result;
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const domain = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    console.log(`📧 Enviando email de reset de password a: ${email}`);
    const result = await getResend().emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Restablecer contraseña - MKL Konecta",
        html: `
            <h1>MKL Konecta - Restablecer Contraseña</h1>
            <p>Has solicitado restablecer tu contraseña corporativa.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <a href="${resetLink}" style="background-color: #E60000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Restablecer Contraseña</a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste esto, puedes ignorar este correo.</p>
        `
    });
    if (result.error) console.error("❌ Error enviando email de reset:", result.error);
    return result;
};
