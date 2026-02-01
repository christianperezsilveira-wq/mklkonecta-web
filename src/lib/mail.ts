import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPendingApprovalEmail = async (email: string, name: string) => {
    await resend.emails.send({
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
};

export const sendApprovalEmail = async (email: string, name: string) => {
    const loginLink = `http://${process.env.VERCEL_URL || "localhost:3000"}/login`;

    await resend.emails.send({
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
};

// Mantener por compatibilidad si es necesario, pero el flujo principal ahora usará las de arriba
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://${process.env.VERCEL_URL || "localhost:3000"}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirma tu cuenta - MKL Konecta",
        html: `
            <h1>Bienvenido a MKL Konecta</h1>
            <p>Haz clic en el siguiente enlace para activar tu cuenta corporativa:</p>
            <a href="${confirmLink}">Confirmar Cuenta</a>
        `
    });
};
