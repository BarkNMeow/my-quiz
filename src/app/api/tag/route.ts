import { NextResponse } from "next/server";
import { PrismaClient } from "@/prisma"

const prisma = new PrismaClient()

export async function GET() {
    try {
        const tag = await prisma.tag.findMany()

        return NextResponse.json({ tag });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    const { text } = body

    try {
        const tag = await prisma.tag.create({
            data: {
                text
            }
        })

        return NextResponse.json({ tag });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}