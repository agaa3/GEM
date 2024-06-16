import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const userID = searchParams.get('userId');
        console.log(userID)
        const productID = searchParams.get('productId');
        console.log(productID)

        if (!userID) {
            return NextResponse.error(new Error('User ID is required'), { status: 400 });
        }
        if (!productID) {
            return NextResponse.error(new Error('Product ID is required'), { status: 400 });
        }

        const purchases = await prisma.purchase.findFirst({
            where: {
                userId: parseInt(userID),
                productId: parseInt(productID),
            },
        });

        /*const purchasesInfo = purchases.map((purchase) => ({
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
        }));*/

        return NextResponse.json({ purchases });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return NextResponse.error(new Error('Failed to fetch purchases'), { status: 500 });
    }
}
