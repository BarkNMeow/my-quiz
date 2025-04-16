import { NextResponse } from "next/server";
import { PrismaClient, Quiz } from "@/prisma"
import { shuffleArray } from "@/lib/arrayUtil";

const prisma = new PrismaClient()

export async function GET(request: Request, context: { params: { id: string } }) {
    const { id } = await context.params
    const _id = Number(id)

    try {
        if (isNaN(_id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }
        // (SELECT CASE WHEN "tryCount" = 0 THEN 0 ELSE "correctCount" / "tryCount" END) * (1 + EXP(-ABS(id - ${_id}) * 2 / Cnt.cnt)) * random()
        // const randomQuiz = await prisma.$queryRaw<Quiz[]>`SELECT id FROM "Quiz" TABLESAMPLE SYSTEM_ROWS(10);`
        const randomQuiz = await prisma.$queryRaw<Quiz[]>`SELECT id FROM "Quiz" WHERE "correctCount" = 1 AND id != ${_id} ORDER BY random() LIMIT 10`
        let randomQuizId = -1
        if (randomQuiz) {
            const filteredRandomQuizId = randomQuiz.filter(v => (v.id != _id)).map(v => v.id)
            randomQuizId = shuffleArray(filteredRandomQuizId)[0]
        }

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