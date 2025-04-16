'use client'

import RoundButton from "@/components/RoundButton"
import { correctColorScheme, wrongColorScheme } from "@/constant"
import { arraysEqual } from "@/lib/arrayUtil"
import { ArrowBigRight, Check, Shuffle, X } from "lucide-react"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

enum CorrectState {
    NOT_CHECKED,
    CORRECT,
    INCORRECT
}

export default function QuizContent(props: {
    quizId: number,
    isMultipleChoice: boolean,
    options: { id: number, text: string }[]
    nextQuizId: number,
    randomQuizId: number,
}) {
    const { quizId, isMultipleChoice, options, nextQuizId, randomQuizId } = props
    console.log(nextQuizId, randomQuizId)

    const [isSelected, setIsSelected] = useState(options.map(() => false))
    const [explanation, setExplanation] = useState('')
    const [isCorrect, setIsCorrect] = useState(CorrectState.NOT_CHECKED)
    const [isOptionCorrect, setIsOptionCorrect] = useState(options.map(() => CorrectState.NOT_CHECKED))
    const isSomethingSelected = useMemo(() => {
        return isSelected.reduce((a, b) => a || b, false)
    }, [isSelected])

    const onSubmit = useCallback(async () => {
        const res = await fetch('/api/answer?id=' + quizId);

        if (res.status != 200) alert('Something is wrong...')

        const result = await res.json();
        const selectedIndex = isSelected.map((v, i) => v ? options[i].id : -1).filter(v => v > 0)
        const correctness = arraysEqual(result.answer, selectedIndex)

        if (correctness) await fetch(`/api/quiz/${quizId}/correct-count`, { method: 'PUT' })

        setIsCorrect(correctness ? CorrectState.CORRECT : CorrectState.INCORRECT)
        setIsOptionCorrect(options.map((_, i) => result.answer.includes(options[i].id) ? CorrectState.CORRECT : CorrectState.INCORRECT))
        setExplanation(result.explanation)
    }, [quizId, options, isSelected])

    const toggleIsSelected = (index: number) => {
        setIsSelected(v => {
            const newv = [...v]
            const newValue = !v[index]

            if (newValue == false || isMultipleChoice) {
                newv[index] = newValue
                return newv
            }

            // newValue == true and is NOT a multiple choice question
            return options.map((_, i) => i == index ? newValue : false)
        })
    }

    return (
        <>
            <div className="mb-5">
                {
                    options.map((v, i) =>
                        <QuizOption
                            key={i}
                            isSelected={isSelected[i]}
                            isCorrect={isOptionCorrect[i]}
                            onClick={() => toggleIsSelected(i)}
                        >
                            {String.fromCharCode(i + 65)}. {v.text}
                        </QuizOption>
                    )
                }
            </div>
            {
                isCorrect != CorrectState.NOT_CHECKED && (
                    <QuizExplanation isCorrect={isCorrect == CorrectState.CORRECT}>
                        {explanation}
                    </QuizExplanation>
                )
            }
            <div className="flex justify-center">
                {
                    isCorrect == CorrectState.NOT_CHECKED ?
                        (<RoundButton disabled={!isSomethingSelected} onClick={onSubmit}>Submit</RoundButton>)
                        :
                        (<>
                            <Link href={`/solve/${nextQuizId}`}>
                                <RoundButton><ArrowBigRight className="inline-block align-text-bottom" />Next</RoundButton>
                            </Link>
                            {
                                (randomQuizId != -1) &&
                                <Link href={`/solve/${randomQuizId}`}>
                                    <span className="ml-1" />
                                    <RoundButton><Shuffle className="inline-block align-text-bottom mr-1.5 mb-0.5" size={20} />Random</RoundButton>
                                </Link>
                            }
                        </>
                        )
                }

            </div>
        </>
    )
}

function QuizOption(props: {
    isSelected: boolean,
    isCorrect: CorrectState,
    onClick: () => void,
    children: React.ReactNode
}) {
    const { isSelected, isCorrect, onClick, children } = props

    const colorScheme = (() => {
        switch (isCorrect) {
            case CorrectState.NOT_CHECKED:
                return `border-gray-300 dark:border-stone-600 ${isSelected ? 'bg-gray-100 dark:bg-stone-800' : ''} hover:bg-gray-50 dark:hover:bg-stone-800`
            case CorrectState.CORRECT:
                return correctColorScheme
            case CorrectState.INCORRECT:
                return isSelected ? wrongColorScheme : 'border-gray-300 dark:border-stone-600'
        }
    })()

    return (
        <div
            className={`px-2 py-1 mb-1 border-2 rounded-sm ${colorScheme} transition-colors ${isCorrect == CorrectState.NOT_CHECKED ? 'duration-100' : 'duration-500'}`}
            onClick={() => { if (isCorrect == CorrectState.NOT_CHECKED) onClick() }}
        >
            {children}
        </div>
    )
}

function QuizExplanation(props: {
    isCorrect: boolean,
    children: React.ReactNode
}) {
    const { isCorrect, children } = props
    const divClassName = isCorrect ? correctColorScheme : wrongColorScheme

    return (
        <div className={`mb-5 p-2 border-2 ${divClassName} rounded-md`}>
            <div className="font-bold mb-0.5">
                {
                    isCorrect ?
                        (
                            <><Check className="inline align-text-top" /> Correct!</>
                        )
                        :
                        (
                            <><X className="inline align-text-top" /> Wrong!</>
                        )
                }
            </div>
            {children}
        </div>
    )
}