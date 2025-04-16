import { NextResponse } from "next/server";
import { PrismaClient } from "@/prisma"

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'))

    try {
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const quiz = await prisma.quiz.findFirst({
            select: {
                explanation: true
            },
            where: {
                id: id,
            },
        });

        if (!quiz) {
            return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
        }

        const options = await prisma.option.findMany({
            where: {
                quizId: id,
                isAnswer: true
            },
            select: {
                id: true,
            },
        });

        return NextResponse.json({
            explanation: quiz.explanation,
            answer: options.map(v => v.id)
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}