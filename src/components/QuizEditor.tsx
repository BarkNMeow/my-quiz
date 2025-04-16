import OptionInput from "@/app/add/components/OptionInput"
import TagDropdown from "@/app/add/components/TagDropdown"
import { TagInput } from "@/app/add/components/TagInput"
import { useState } from "react"
import { TagButton } from "./TagButton"
import TextArea from "./TextArea"
import TextInput from "./TextInput"
import { Option, Quiz, Tag } from "@/prisma"
import useOptionsHooks from "@/hook/add/useOptionsHooks"
import useQuizHooks from "@/hook/add/useQuizHooks"
import useAvailableTags from "@/hook/add/useAvailableTags"
import useTagsHooks from "@/hook/add/useTagsHooks"

export default function QuizEditor(props: {
    quiz: Quiz,
    options: Option[],
    tags: Tag[]
    setQuiz: (callback: (q: Quiz) => Quiz) => void,
    setOptions: (callback: (q: Option[]) => Option[]) => void,
    setTags: (callback: (q: Tag[]) => Tag[]) => void,
}) {
    const { quiz, options, tags, setQuiz, setOptions, setTags } = props

    const [isTagInputVisible, setIsTagInputVisible] = useState(false)
    const { availableTags, addAvailableTag } = useAvailableTags()

    const { setQuestion, setSupplementary, setExplanation } = useQuizHooks(setQuiz)
    const { removeOption, setOptionText, setIsAnswer, addOption } = useOptionsHooks(setOptions)
    const { addTag, removeTag } = useTagsHooks(setTags)

    return (
        <>
            <div className="mb-5">
                <FormTitle>Question</FormTitle>
                <TextInput className="w-full mb-2" value={quiz.question} onChange={setQuestion} />
                <div className="mb-1.5">Supplementary</div>
                <TextArea
                    value={quiz.supplementary}
                    className="w-full h-24 text-sm"
                    onChange={setSupplementary}
                />
            </div>
            <div className="mb-5">
                <FormTitle className="mb-2">Options</FormTitle>
                {
                    options.map((v, i) =>
                        <OptionInput
                            key={i}
                            value={v.text}
                            isAnswer={v.isAnswer}
                            removeThis={() => removeOption(i)}
                            onChange={(value) => setOptionText(i, value)}
                            toggleIsAnswer={() => setIsAnswer(i, !v.isAnswer)}
                        />
                    )
                }
                <button
                    className="w-full mt-2 p-1 border-2 border-gray-300 dark:border-stone-300 rounded-sm  hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors duration-100"
                    onClick={addOption}
                >
                    Add options
                </button>
            </div>
            <div className="mb-5">
                <FormTitle className="mb-2">Explanation</FormTitle>
                <TextArea
                    value={quiz.explanation}
                    className="w-full h-32"
                    onChange={setExplanation}
                />
            </div>
            <div className="mb-16">
                <FormTitle className="mb-2">Tag</FormTitle>
                <div>
                    {
                        tags.map((v, i) =>
                            <TagButton key={i} onClick={() => removeTag(i)}>{v.text}</TagButton>
                        )
                    }
                    {
                        isTagInputVisible && (
                            <TagInput
                                addTag={async v => addTag(await addAvailableTag(v))}
                                hideInput={() => setIsTagInputVisible(false)}
                            />
                        )
                    }
                    <TagDropdown tag={availableTags} showTagInput={() => setIsTagInputVisible(true)} addTag={addTag} />
                </div>
            </div>
        </>
    );
}


function FormTitle(props: {
    className?: string,
    children: React.ReactNode
}) {
    const { children, className } = props
    return (
        <div className={`font-medium text-2xl ${className}`}>
            {children}
        </div>
    )
}