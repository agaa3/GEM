import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function handler(req, res) {
    const { email, subscriptionType, creditsNumber } = req.body;
    console.log(email);
    console.log(subscriptionType);
    console.log(creditsNumber);

    if (req.method === 'PUT') {
        try {
            const user = await prisma.user.update({
                where: { email },
                data: {
                    subscriptionType,
                    creditsNumber,
                },
            });
            return NextResponse.json({ user });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
