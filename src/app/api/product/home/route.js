import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    try {
        // Pobierz dane z bazy danych, filtrowane po tytule
        const product = await prisma.product.findMany({
            where: {
                id: {
                    in: [1, 4, 5, 12, 15]
                }
            }
        });

        return NextResponse.json({ product });
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        return NextResponse.error(error.message, { status: 500 });
    }
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