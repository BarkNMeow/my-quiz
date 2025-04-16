import { Tag } from "@/prisma";

export default function useTags(
    setTags: (callback: (tags: Tag[]) => Tag[]) => void
) {
    const addTag = (t: Tag) => setTags(tags => {
        if (tags.map(v => v.id).includes(t.id)) return tags
        return [...tags, t]
    })

    const removeTag = (index: number) => setTags(tags => {
        const newv = [...tags]
        newv.splice(index, 1)
        return newv
    })

    return { addTag, removeTag }
}