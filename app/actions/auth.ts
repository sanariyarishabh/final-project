'use server'

import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { message: "Please enter both username and password." };
    }

    try {
        console.log("Attempting login for:", username);
        // 1. Find user
        const user = await prisma.users.findFirst({
            where: { UserName: username }
        });
        console.log("User found:", user ? "Yes" : "No");

        // 2. Verify password (plaintext for now as per lab project style)
        if (!user || user.Password !== password) {
            console.log("Invalid credentials or user not found");
            return { message: "Invalid credentials." };
        }

        // 3. Create Session
        const role = user.Role ? user.Role.toUpperCase() : 'USER';
        console.log("Creating session for role:", role);
        await createSession(user.UserID, role);

        // 4. Redirect based on role
        if (role === 'ADMIN') {
            redirect('/dashboard/admin');
        } else {
            redirect('/dashboard/user');
        }
    } catch (error) {
        // Next.js redirects work by throwing an error, so we need to re-throw it if it's a redirect
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        // Also check for the internal digest property which newer Next.js versions use
        if (error && typeof error === 'object' && 'digest' in error && (error as any).digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        console.error("Login error:", error);
        return { message: "An error occurred during login. Please try again." };
    }
}

export async function registerAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const mobile = formData.get('mobile') as string;
    const role = (formData.get('role') as string)?.toUpperCase() || 'USER'; // Default to USER

    if (!username || !email || !password || !mobile) {
        return { message: "Please fill in all fields." };
    }

    try {
        // 1. Check if user already exists
        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { UserName: username },
                    { EmailAddress: email }
                ]
            }
        });

        if (existingUser) {
            return { message: "User with this username or email already exists." };
        }

        // 2. Create User
        const newUser = await prisma.users.create({
            data: {
                UserName: username,
                EmailAddress: email,
                Password: password, // Plaintext as per existing pattern
                MobileNo: mobile,
                Role: role,
            }
        });

        // 3. Create Session
        await createSession(newUser.UserID, role);

        // 4. Redirect based on role
        if (role === 'ADMIN') {
            redirect('/dashboard/admin');
        } else {
            redirect('/dashboard/user');
        }
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        if (error && typeof error === 'object' && 'digest' in error && (error as any).digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        console.error("Registration error:", error);
        return { message: "An error occurred during registration. Please try again." };
    }
}
