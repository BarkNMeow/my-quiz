'use client'
import QuizEditor from "@/components/QuizEditor";
import RoundButton from "@/components/RoundButton";
import { getDefaultOption } from "@/constant";
import useAddFormCallback from "@/hook/add/useAddFormCallback";
import { Tag } from "@/prisma";
import { useState } from "react";

export default function Home() {
    const [quiz, setQuiz] = useState(defaultQuiz)
    const [options, setOptions] = useState([getDefaultOption()])
    const [tags, setTags] = useState<Tag[]>([])

    const { onSubmit, isValid } = useAddFormCallback(quiz, options, tags, () => { })

    return (
        <>
            <QuizEditor
                quiz={quiz}
                options={options}
                tags={tags}
                setQuiz={setQuiz}
                setOptions={setOptions}
                setTags={setTags}
            />
            <div className="flex justify-center mb-8">
                <RoundButton disabled={!isValid} onClick={async () => await onSubmit()}>Edit</RoundButton>
            </div>
        </>
    )
}