import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//import { prisma } from '@/lib/prisma'; // Upewnij się, że importujesz odpowiednio instancję Prisma

export async function handler(req, res) {
    const { email, displayName } = req.body;

    if (req.method === 'POST') {
        try {
            let user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        email,
                        login: displayName,
                        subscriptionType: "Nieaktywna",
                        creditsNumber: 0,
                        accountType: 1,
                    },
                });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}

export async function POST(request) {
    const req = await request.json();
    const vote = await prisma.vote.create({
        data: {
            email: req.email,
        },
    });

    return NextResponse.json({ XXXXXXX });
}
