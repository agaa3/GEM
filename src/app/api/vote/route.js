import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {
    const req = await request.json();
    const vote = await prisma.vote.create({
        data: {
            gameId: req.gameId,
        },
    });

    return NextResponse.json({ vote });
}

export async function GET() {
    const voteCounts = await prisma.vote.groupBy({
        by: ['gameId'],
        _count: {
          id: true,
        },
      });

    return NextResponse.json({ voteCounts });
}
