import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const user = await prisma.user.findMany();

    return NextResponse.json({ user })
}


export async function POST(request) {
    const data = await request.json();

    const res = await prisma.user.create({
        data:data
    });

    return NextResponse.json({ ...res })
}

export async function DELETE(request) {

    const data = await request.json();

    const res = await prisma.user.delete({
        where: {id: parseInt(data.id)}
    });

    return NextResponse.json({ ...res })

}


export async function PUT(request) {
    const data = await request.json();

    const res = await prisma.user.update({
        data: {
            ...data
        },
        where: {
            id: parseInt(data.id),
        },
    });

    return Response.json(res);
}
