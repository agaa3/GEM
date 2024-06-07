import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('query');

    try {
        // Pobierz dane z bazy danych, filtrowane po tytule
        const product = await prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: searchQuery } }, // Wyszukiwanie frazy w polu "title"
                    { author: { contains: searchQuery } } // Wyszukiwanie frazy w polu "author"
                ]
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