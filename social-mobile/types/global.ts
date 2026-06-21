export type UserType = {
    id: string;
    name: string;
    username: string;
    bio?: string;
}

export type PostType = {
    id: string;
    content: string;
    user: UserType;
    comments: CommentType[];
    created: string;
}

export type CommentType = {
    id: string;
    content: string;
    post: PostType;
    user: UserType;
    created: string;
}