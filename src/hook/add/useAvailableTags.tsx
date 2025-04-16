import { Tag } from "@/prisma";
import { useCallback, useEffect, useState } from "react";

export default function useAvailableTags() {
    const [availableTags, setAvailableTags] = useState<Tag[]>([])

    useEffect(() => {
        async function getTags(): Promise<Tag[]> {
            const res = await fetch('api/tag')

            if (res.status !== 200) {
                alert('Something is wrong...')
                return [] as Tag[]
            }

            const result = await res.json();
            return result.tag
        }

        getTags().then((res) => {
            setAvailableTags(res)
        })
    }, [])

    const addAvailableTag = useCallback(async (text: string) => {
        if (text === '') return

        const res = await fetch('api/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text
            }),
        })

        if (res.status !== 200) {
            alert('Something is wrong...')
            return
        }

        const result = await res.json();
        console.log(result)
        setAvailableTags(v => [...v, result.tag])
        return result.tag
    }, [])

    return { availableTags, addAvailableTag }
}