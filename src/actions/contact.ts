import { sendContactEmail as sendMail } from "@/lib/mail";

export const sendContactEmail = async (formData: {
    name: string;
    email: string;
    company?: string;
    message: string;
}) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        return { error: "Error de configuración: Credenciales de Zoho no configuradas." };
    }

    try {
        const { name, email, message } = formData;
        if (!name || !email || !message) {
            return { error: "Por favor, complete los campos obligatorios." };
        }

        const result = await sendMail(formData);

        if ("error" in result) {
            return { error: "No se pudo enviar el mensaje a Zoho. Asegurese de que la contraseña sea correcta." };
        }

        return { success: "Mensaje enviado con éxito. Un asesor se comunicará a la brevedad." };
    } catch (error) {
        console.error("❌ ERROR CRÍTICO EN CONTACT ACTION:", error);
        return { error: "Ocurrió un error interno al procesar su solicitud." };
    }
};
