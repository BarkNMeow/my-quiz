import { Quiz } from "@/prisma";

export default function useQuizHooks(
    setQuiz: (callback: (q: Quiz) => Quiz) => void
) {
    const setQuestion = (v: string) => setQuiz(q => {
        const newQ = { ...q }
        newQ.question = v
        return newQ
    })

    const setSupplementary = (v: string) => setQuiz(q => {
        const newQ = { ...q }
        newQ.supplementary = v
        return newQ
    })

    const setExplanation = (v: string) => setQuiz(q => {
        const newQ = { ...q }
        newQ.explanation = v
        return newQ
    })

    return { setQuestion, setSupplementary, setExplanation }
}