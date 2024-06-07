import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET({userID}) {
    try {
        const userId = parseInt(userID);

        const purchases = await prisma.purchase.findMany({
            where: {
                user: userID
            }
        });

        const products = [];

        for (const purchase of purchases) {
            const product = await prisma.product.findUnique({
                where: {
                    id: purchase.productId
                }
            });

            if(product) {
                products.push({
                    id: purchase.id,
                    user: purchase.userId,
                    author: product.author,
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    date: purchase.date,
                    downloadURL: product.downloadURL,
                    image: product.image
                });
            }
        }

        return NextResponse.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        // Jeśli wystąpił błąd, zwróć odpowiedź z kodem błędu
        return NextResponse.error(new Error('Failed to fetch products'), { status: 500 });
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