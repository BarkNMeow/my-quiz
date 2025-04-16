import { redirect } from "next/navigation"

export default async function Home() {
    const nextQuiz = await fetch(`${process.env.URL}/api/quiz/0/next`)
    const data = await nextQuiz.json()
    redirect(`/solve/${data.id}`)
}