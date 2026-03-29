export interface Answer{
    id: number,
    answerText: string,
}

export interface QuizElement {
    questionId: number,
    question: string,
    imageURL: string,
    answers: Answer[],
    answerId: number 
}