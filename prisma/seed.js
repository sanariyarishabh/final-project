const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
    // Admin
    let admin = await prisma.users.findFirst({ where: { UserName: 'admin' } });
    if (!admin) {
        admin = await prisma.users.create({
            data: {
                UserName: 'admin',
                EmailAddress: 'admin@example.com',
                Password: 'admin',
                Role: 'ADMIN',
                MobileNo: '1234567890'
            }
        });
        console.log('Admin user created:', admin);
    } else {
        console.log('Admin user already exists:', admin);
    }

    // User
    let user = await prisma.users.findFirst({ where: { UserName: 'user' } });
    if (!user) {
        user = await prisma.users.create({
            data: {
                UserName: 'user',
                EmailAddress: 'user@example.com',
                Password: 'user',
                Role: 'USER',
                MobileNo: '0987654321'
            }
        });
        console.log('Standard user created:', user);
    } else {
        console.log('Standard user already exists:', user);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
