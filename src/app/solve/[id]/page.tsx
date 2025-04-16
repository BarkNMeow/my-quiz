import { Tag } from "@/prisma"
import QuizContent from "./components/QuizContent"
import { TagButton } from "@/components/TagButton"

interface Props {
    params: {
        id: number
    }
}

const getQuiz = async (id: number) => {
    const data = await fetch(`${process.env.URL}/api/quiz/${id}`)
    return data.json()
}

const getNextQuiz = async (id: number) => {
    const data = await fetch(`${process.env.URL}/api/quiz/${id}/next`)
    return data.json()
}

export default async function Home({ params }: Props) {
    const { id } = await params
    const data = await getQuiz(id)
    const nextQuiz = await getNextQuiz(id)
    await fetch(`${process.env.URL}/api/quiz/${id}/try-count`, { method: 'PUT' })

    return (
        <main className="w-full max-w-3xl h-full mx-auto">
            <div className="mb-1">
                {
                    data.tags.map((v: Tag, i: number) =>
                        <TagButton key={i} size={'xs'}>{v.text}</TagButton>
                    )
                }
            </div>
            {data.isMultipleChoice && <span className="text-sm text-orange-400">Multiple Choice</span>}
            <h3 className="font-medium text-lg mb-3">{data.quiz.question}</h3>

            <QuizContent
                quizId={id}
                isMultipleChoice={data.isMultipleChoice}
                options={data.options}
                nextQuizId={nextQuiz.id}
                randomQuizId={nextQuiz.randomId}
            />
        </main>
    );
}