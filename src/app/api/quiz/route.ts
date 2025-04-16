import { NextResponse } from "next/server";
import { PrismaClient } from "@/prisma"

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const body = await request.json()
    const { question, explanation, supplementary, options, tags } = body

    const res = await prisma.quiz.create({
        data: {
            question,
            explanation,
            supplementary,
            options: {
                create: options
            },
            QuizTag: {
                createMany: {
                    data: tags
                }
            }
        }
    }).then(async () => {
        await prisma.$disconnect()
        return NextResponse.json({})
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    })

    return res
}