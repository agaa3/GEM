import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const gra = parseInt(searchParams.get('gra'))

    const product = await prisma.product.findMany({
        where: {
            category: "Game3"
        }
    });

    return NextResponse.json({ product });
}

export async function POST(request) {
    const req = await request.json();
    const comment = await prisma.comment.create({
        data: {
            name: req.name,
            comment: req.comment,
            gameId: req.gameId,
        },
    });
    return NextResponse.json({ comment });
}
