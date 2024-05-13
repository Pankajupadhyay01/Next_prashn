export interface questions {
    title: string;
    askedBy: string;
    body: string;
    createdAt: string;
    _id: string;
    answers: Answer[]
}

export interface Answer {
    id: string;
    user: string;
    answer: string;
    upvote: number;
    downvote: number;
}
