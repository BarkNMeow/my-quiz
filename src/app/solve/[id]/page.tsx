import { Tag } from "@/prisma"
import QuizContent from "./components/QuizContent"
import { TagButton } from "@/components/TagButton"
import { correctColorScheme, wrongColorScheme } from "@/constant"

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

    const colorScheme = (() => {
        if (data.quiz.tryCount == 0) {
            return 'bg-gray-200 dark:bg-stone-500'
        }
        const correctRate = data.quiz.correctCount / data.quiz.tryCount
        if (correctRate >= 0.7) {
            return correctColorScheme
        } else if (correctRate >= 0.3) {
            return 'bg-orange-100 text-orange-800 dark:bg-orange-300 dark:text-orange-950'
        } else {
            return wrongColorScheme
        }
    })()

    return (
        <main className="w-full max-w-3xl h-full mx-auto">
            <div className="mb-3">
                <div className={`rounded w-fit px-2 py-1 text-xs mb-1 ${colorScheme}`}>
                    Correct: {data.quiz.correctCount} / Tried: {data.quiz.tryCount}
                </div>
                <div className="mb-1">
                    {
                        data.tags.map((v: Tag, i: number) =>
                            <TagButton key={i} size={'xs'}>{v.text}</TagButton>
                        )
                    }
                </div>
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