import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        console.log("tutak");
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        console.log("tutak132");

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        return NextResponse.error(error.message, { status: 500 });
    }
}
