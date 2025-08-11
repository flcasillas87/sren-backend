import prisma from './db/prismaClient';

async function main() {
  const users = await prisma.user.findMany();
  console.log('Usuarios en la base de datos:', users);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });