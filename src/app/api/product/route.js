import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const product = await prisma.product.findMany();

    return NextResponse.json({ product })
}

export async function POST(request) {
    const data = await request.json();

    const res = await prisma.product.create({
        data:data
    });

    return NextResponse.json({ ...res })
}

export async function DELETE(request) {

    const data = await request.json();

    const res = await prisma.product.delete({
        where: {id: parseInt(data.id)}
    });

    return NextResponse.json({ ...res })

}


export async function PUT(request) {
    const data = await request.json();

    const res = await prisma.product.update({
        data: {
            ...data
        },
        where: {
            id: parseInt(data.id),
        },
    });

    return Response.json(res);
}
