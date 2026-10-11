export type Post = {
    body: string;
    id: number;
    title: string;
    userId: number;
}
export type NewPost = {
    body: string;
    title: string;
    userId: number;
}
export type UpdatePost = Partial<Pick<Post, 'title' | 'body'>>;