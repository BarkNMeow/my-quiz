import { NextResponse } from "next/server";
import { PrismaClient } from "@/prisma"

const prisma = new PrismaClient()

export async function PUT(request: Request, context: { params: { id: string } }) {
    const { id } = await context.params
    const _id = Number(id)

    try {
        if (isNaN(_id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const updated = await prisma.quiz.update({
            where: {
                id: _id,
            },
            data: {
                tryCount: { increment: 1 }
            }
        })

        if (!updated) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({})

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}