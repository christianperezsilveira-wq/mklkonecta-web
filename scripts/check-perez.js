const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findFirst({
    where: {
      email: {
        contains: 'perez'
      }
    }
  });
  console.log('User found:', user);
}
main().catch(console.error).finally(() => prisma.$disconnect());
