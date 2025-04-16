import { Option } from "./prisma";

export const getDefaultOption = () => ({ id: 0, quizId: 0, text: '', isAnswer: false } as Option)

export const wrongColorScheme = 'border-red-800 bg-red-100 text-red-800 dark:border-red-950 dark:bg-red-300 dark:text-red-950'
export const correctColorScheme = 'border-green-800 bg-green-100 text-green-800 dark:border-green-950 dark:bg-green-300 dark:text-green-950'