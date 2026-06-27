export type UserType = {
    id: number;
    name: string;
    username: string;
    bio?: string;
}

export type PostType = {
    id: number;
    content: string;
    user: UserType;
    comments: CommentType[];
    likes: LikeType[];
    created: string;
}

export type CommentType = {
    id: number;
    content: string;
    post: PostType;
    user: UserType;
    created: string;
}

export type LikeType = {
    userId: number;
}
