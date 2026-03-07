"use server";

import { Resend } from "resend";

export const sendContactEmail = async (formData: {
    name: string;
    email: string;
    company?: string;
    message: string;
}) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
        console.error("❌ RESEND_API_KEY is missing in environment variables.");
        return { error: "Error de configuración: API key no encontrada en el servidor." };
    }
    try {
        const { name, email, company, message } = formData;

        if (!name || !email || !message) {
            return { error: "Por favor, complete los campos obligatorios." };
        }

        console.log(`📧 Enviando formulario de contacto de: ${name} (${email})`);

        // Enviamos el correo a la dirección corporativa
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Cambiar a info@mklkonecta.com una vez verificado el dominio
            to: "contacto@mklkonecta.com",
            subject: `Nuevo Mensaje de Contacto: ${name}`,
            html: `
                <h1>Nuevo mensaje desde la web de MKL Konecta</h1>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Empresa:</strong> ${company || "No especificada"}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <br />
                <hr />
                <p>Este correo fue enviado automáticamente desde el formulario de contacto.</p>
            `
        });

        if (error) {
            console.error("❌ Error de Resend al enviar contacto:", error);
            return { error: `No se pudo enviar el mensaje: ${error.message}` };
        }

        return { success: "Mensaje enviado con éxito. Un asesor se comunicará a la brevedad." };
    } catch (error) {
        console.error("❌ ERROR CRÍTICO EN CONTACT ACTION:", error);
        return { error: "Ocurrió un error interno al procesar su solicitud." };
    }
};
