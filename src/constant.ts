import { Option } from "./prisma";

export const getDefaultOption = () => ({ id: 0, quizId: 0, text: '', isAnswer: false } as Option)