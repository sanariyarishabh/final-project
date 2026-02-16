"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt, decrypt } from '@/lib/session-crypto';

const COOKIE_NAME = 'session';


export async function createSession(userId: number, role: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, role, expires });

    // Await valid cookies()
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME)?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect('/login');
}
