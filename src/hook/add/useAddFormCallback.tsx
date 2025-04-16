'use client'

import { useCallback, useMemo } from "react";
import { Option, Quiz, Tag } from "@/prisma";

export default function useAddFormCallback(
    quiz: Quiz,
    options: Option[],
    tags: Tag[],
    initForm: () => void,
) {
    const onSubmit = useCallback(async () => {
        const res = await fetch('api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: quiz.question,
                supplementary: quiz.supplementary,
                explanation: quiz.explanation,
                options: options.map(v => ({ isAnswer: v.isAnswer, text: v.text })),
                tags: tags.map(v => ({ tagId: v.id })),
            }),
        });

        if (res.status != 200) {
            alert('Something is wrong...')
            return
        }
        initForm()

    }, [quiz, options, tags, initForm])

    const isValid = useMemo(() => {
        if (quiz.question === '') return false

        if (options.length == 0) return false

        let isSomethingAnswer = false
        for (const option of options) {
            if (option.text === '') return false
            isSomethingAnswer ||= option.isAnswer
        }

        if (!isSomethingAnswer) return false;
        return true
    }, [quiz, options])

    return { onSubmit, isValid }
}