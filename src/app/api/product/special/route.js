import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const product = await prisma.product.findMany({
        where: {
            id: {
                in: [14, 15, 16, 17, 18]
            }}
    });

    return NextResponse.json({ product })
}


// export async function POST(request) {
//     const req = await request.json();
//     const comment = await prisma.comment.create({
//         data: {
//             name: req.name,
//             comment: req.comment,
//             gameId: req.gameId,
//         },
//     });
//     return NextResponse.json({ comment });
// }

//srakka