
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    const email = "christianperezsilveira@gmail.com";

    console.log(`🔍 Buscando usuario: ${email}...`);

    const user = await db.user.findUnique({
        where: { email }
    });

    if (!user) {
        console.error("❌ Usuario no encontrado. Asegúrate de haberte registrado primero.");
        return;
    }

    console.log("✅ Usuario encontrado. Actualizando permisos...");

    await db.user.update({
        where: { email },
        data: {
            role: "ADMIN",
            isApproved: true,
            emailVerified: new Date()
        }
    });

    console.log("🎉 ¡ÉXITO! Ahora eres ADMIN y tu cuenta está APROBADA.");
    console.log("Ahora puedes acceder al dashboard y gestionar otros usuarios.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
