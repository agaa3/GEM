import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const gra = parseInt(searchParams.get('gra'))

    const game = await prisma.game.findUnique({
        where: {
            id: gra,
        },
        include: {
            comments: true,
        },
    });

    return NextResponse.json({ game });
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
