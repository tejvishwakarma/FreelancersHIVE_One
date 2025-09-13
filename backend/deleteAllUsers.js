const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllUsers() {
  try {
    const deleteResult = await prisma.user.deleteMany();
    console.log(`✅ Successfully deleted ${deleteResult.count} users from the database.`);
    console.log('🔄 Database is now clean for fresh testing!');
  } catch (error) {
    console.error('❌ Error deleting users:', error);
  } finally {
    await prisma.$disconnect();
    console.log('📊 Database connection closed.');
  }
}

deleteAllUsers();
