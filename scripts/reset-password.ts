const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function main() {
    const email = "christianperezsilveira@gmail.com";
    const newPassword = "123456"; // Contraseña temporal

    console.log(`🔍 Buscando usuario: ${email}...`);

    const user = await db.user.findUnique({
        where: { email }
    });

    if (!user) {
        console.error("❌ Usuario no encontrado.");
        return;
    }

    console.log("✅ Usuario encontrado. Reseteando contraseña...");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where: { email },
        data: {
            password: hashedPassword,
        }
    });

    console.log(`🎉 ¡CONTRASEÑA CAMBIADA!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Nueva contraseña: ${newPassword}`);
    console.log("Intenta iniciar sesión ahora.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
