import "server-only";
import nodemailer from "nodemailer";

const domain = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.zoho.com",
    port: 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendPendingApprovalEmail = async (email: string, name: string) => {
    console.log(`📧 Enviando email de registro recibido (SMTP) a: ${email}`);

    try {
        await transporter.sendMail({
            from: `"MKL Konecta" <${process.env.EMAIL_USER}>`,
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
        return { success: true };
    } catch (error) {
        console.error("❌ Error SMTP (Registro):", error);
        return { error };
    }
};

export const sendApprovalEmail = async (email: string, name: string) => {
    const loginLink = `${domain}/login`;

    console.log(`📧 Enviando email de aprobación (SMTP) a: ${email}`);

    try {
        await transporter.sendMail({
            from: `"MKL Konecta" <${process.env.EMAIL_USER}>`,
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
        return { success: true };
    } catch (error) {
        console.error("❌ Error SMTP (Aprobación):", error);
        return { error };
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    console.log(`📧 Enviando email de verificación (SMTP) a: ${email}`);

    try {
        await transporter.sendMail({
            from: `"MKL Konecta" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirma tu cuenta - MKL Konecta",
            html: `
                <h1>Bienvenido a MKL Konecta</h1>
                <p>Haz clic en el siguiente enlace para activar tu cuenta corporativa:</p>
                <a href="${confirmLink}">Confirmar Cuenta</a>
            `
        });
        return { success: true };
    } catch (error) {
        console.error("❌ Error SMTP (Verificación):", error);
        return { error };
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    console.log(`📧 Enviando email de reset de password (SMTP) a: ${email}`);

    try {
        const info = await transporter.sendMail({
            from: `"MKL Konecta" <${process.env.EMAIL_USER}>`,
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
        console.log("✅ Email de reset enviado:", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("❌ Error SMTP (Reset):", error);
        return { error };
    }
};

export const sendContactEmail = async (formData: {
    name: string;
    email: string;
    company?: string;
    message: string;
}) => {
    const { name, email, company, message } = formData;

    console.log(`📧 Enviando formulario de contacto (SMTP) desde: ${email}`);

    try {
        await transporter.sendMail({
            from: `"Web MKL" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Se auto-envía a contacto@mklkonecta.com
            replyTo: email,
            subject: `Nuevo Mensaje: ${name} (${company || "Sin empresa"})`,
            html: `
                <h1>Nuevo mensaje desde la web</h1>
                <p><strong>De:</strong> ${name} (${email})</p>
                <p><strong>Empresa:</strong> ${company || "N/A"}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        });
        return { success: true };
    } catch (error) {
        console.error("❌ Error SMTP (Contact):", error);
        return { error };
    }
};
