import { NextResponse } from "next/server";
import { PrismaClient, Quiz } from "@/prisma"

const prisma = new PrismaClient()

export async function GET(request: Request, context: { params: { id: string } }) {
    const { id } = await context.params
    const _id = Number(id)

    try {
        if (isNaN(_id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const randomQuiz = await prisma.$queryRaw<Quiz[]>`
            SELECT * FROM "Quiz"
            JOIN (SELECT COUNT(*) AS cnt FROM "Quiz") as Cnt
            ON true
            WHERE "correctCount" = 0
            ORDER BY 1 / (1 + EXP(ABS(id - ${_id}) / (Cnt.cnt * 2))) * random() ASC
            LIMIT 1;`
        const randomQuizId = randomQuiz ? randomQuiz[0].id : -1

        const nextQuiz = await prisma.quiz.findFirst({
            select: {
                id: true,
            },
            where: {
                id: {
                    gt: _id
                }
            },
            orderBy: {
                id: 'asc'
            }
        });

        if (nextQuiz) return NextResponse.json({ id: nextQuiz.id, randomId: randomQuizId })

        const firstQuiz = await prisma.quiz.findFirst({
            select: {
                id: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        if (firstQuiz) return NextResponse.json({ id: firstQuiz.id, randomId: randomQuizId })
        else return NextResponse.json({ error: 'Not found ' }, { status: 404 })

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: Request) {
    const body = await request.json()
    const { question, explanation, options } = body

    const res = await prisma.quiz.create({
        data: {
            question,
            explanation,
            options: {
                create: options
            }
        }
    }).then(async () => {
        await prisma.$disconnect()
        return NextResponse.json({ success: true })
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        return NextResponse.json({ success: false })
    })

    return res
}