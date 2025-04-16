import { PrismaClient } from '@/prisma'

const prisma = new PrismaClient()

async function main() {
    // const quiz = await prisma.quiz.create({
    //     data: {
    //         question: 'Which of the following is NOT a likely advantage of a persuasive virtual assistant over human persuaders?',
    //         explanation: 'Context data must be coupled with the ability to interpret it. While virtual assistants can handle data processing and analysis of the context data, they still lack human-like common sense to fully comprehend psychological nuances, social norms and contexts that human persuaders would naturally possess. This is exactly the reason why we need "human-in-the-loop". Therefore, 3 is the correct answer.'
    //     }
    // })
    // console.log(quiz)

    const quizzes = await prisma.quiz.findMany()
    console.log(quizzes)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })