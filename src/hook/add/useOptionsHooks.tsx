'use client'
import { getDefaultOption } from "@/constant"
import { Option } from "@/prisma"

export default function useOptionsHooks(
    setOptions: (callback: (v: Option[]) => Option[]) => void
) {

    const setOptionText = (index: number, text: string) => setOptions(options => {
        const newOptions = [...options]
        newOptions[index].text = text
        return newOptions
    })

    const setIsAnswer = (index: number, isAnswer: boolean) => setOptions(options => {
        const newOptions = [...options]
        newOptions[index].isAnswer = isAnswer
        return newOptions
    })

    const addOption = () => {
        setOptions(v => [...v, getDefaultOption()])
    }

    const removeOption = (index: number) => setOptions(options => {
        const newOptions = [...options]
        newOptions.splice(index, 1)
        return newOptions
    })

    const resetOption = () => {
        setOptions(() => [getDefaultOption()])
    }

    return { setOptionText, setIsAnswer, addOption, removeOption, resetOption }
}