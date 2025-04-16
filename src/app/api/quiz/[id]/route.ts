import { NextResponse } from "next/server";
import { PrismaClient } from "@/prisma"
import { shuffleArray } from "@/lib/arrayUtil";

const prisma = new PrismaClient()

export async function GET(request: Request, context: { params: { id: string } }) {
    const { id } = await context.params
    const _id = Number(id)

    try {
        if (isNaN(_id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const quiz = await prisma.quiz.findFirst({
            select: {
                id: true,
                question: true,
                supplementary: true,
                tryCount: true,
                correctCount: true,
                options: {
                    select: {
                        id: true,
                        text: true,
                        isAnswer: true,
                    }
                },
                QuizTag: {
                    select: {
                        tag: {
                            select: {
                                id: true,
                                text: true
                            }
                        }
                    }
                }
            },
            where: {
                id: _id,
            },
        });

        if (!quiz) {
            return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
        }

        const options = shuffleArray(quiz.options)
        const isMultipleChoice = options.filter((opt) => opt.isAnswer).length !== 1;
        const tags = quiz.QuizTag.map(v => v.tag)

        return NextResponse.json({
            quiz,
            options,
            tags,
            isMultipleChoice,
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}