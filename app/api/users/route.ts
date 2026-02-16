import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.users.findMany({
            orderBy: { Created: 'desc' }
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.UserName || !body.EmailAddress || !body.Password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { UserName: body.UserName },
                    { EmailAddress: body.EmailAddress }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const newUser = await prisma.users.create({
            data: {
                UserName: body.UserName,
                EmailAddress: body.EmailAddress,
                Password: body.Password,
                Role: body.Role || 'USER',
                MobileNo: body.MobileNo || '',
            }
        });

        return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Create User Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
