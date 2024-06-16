import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const userID = searchParams.get('userID');
        console.log(userID)

        if (!userID) {
            return NextResponse.error(new Error('User ID is required'), { status: 400 });
        }

        const purchases = await prisma.purchase.findMany({
            where: {
                userId: parseInt(userID),
            },
            include: {
                product: true,
                user: true,
            },
        });

        const purchasesInfo = purchases.map((purchase) => ({
            id: purchase.id,
            user: {
                id: purchase.user.id,
                login: purchase.user.login,
                email: purchase.user.email,
            },
            author: purchase.product.author,
            title: purchase.product.title,
            category: purchase.product.category,
            downloadURL: purchase.product.downloadURL,
            price: purchase.product.price,
            date: purchase.date.toISOString(),
            image: purchase.product.image,
        }));

        return NextResponse.json({ purchase: purchasesInfo });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return NextResponse.error(new Error('Failed to fetch purchases'), { status: 500 });
    }
}

export async function POST(request) {
    const data = await request.json();

    const res = await prisma.product.create({
        data:data
    });

    return NextResponse.json({ ...res })
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