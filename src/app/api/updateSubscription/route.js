import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(request) {
    try {

        const body = await request.json();  // Parse the request body
        const { id, email, subscriptionType, creditsNumber } = body;
        console.log(id);
        console.log(subscriptionType);
        console.log(creditsNumber);
        if (!email || !subscriptionType || creditsNumber === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Update the user using their unique id
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                subscriptionType: subscriptionType,
                creditsNumber: creditsNumber,
            },
        });


            return NextResponse.json({ updatedUser });

    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
