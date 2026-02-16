
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const userId = parseInt(id);
        const user = await prisma.users.findUnique({
            where: { UserID: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const userId = parseInt(id);
        const body = await request.json();

        // Check if user exists
        const user = await prisma.users.findUnique({
            where: { UserID: userId }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prepare update data
        const updateData: any = {};
        if (body.UserName) updateData.UserName = body.UserName;
        if (body.EmailAddress) updateData.EmailAddress = body.EmailAddress;
        if (body.Role) updateData.Role = body.Role;
        if (body.MobileNo) updateData.MobileNo = body.MobileNo;
        if (body.Password) updateData.Password = body.Password;

        const updatedUser = await prisma.users.update({
            where: { UserID: userId },
            data: updateData
        });

        return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error("Update User Error:", err);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        await prisma.users.delete({
            where: { UserID: userId }
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
