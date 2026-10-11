import type { Post, NewPost, UpdatePost } from "../types/post";

export async function getPosts(): Promise<Post[]> {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Daten konnten nicht geladen werden.');
    }
    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Ungültiges Datenformat.');
    }

    return data as Post[];

}

export async function createPost(newPost: NewPost): Promise<Post> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    if (!response.ok) {
        throw new Error('Post konnte nicht erstellt werden.');
    }
    const data = (await response.json()) as Post;
    return data;
}

export async function deletePost(id: number): Promise<void> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: 'DELETE'
        }
    );

    if (!response.ok) {
        throw new Error('Post konnte nicht gelöscht werden.');
    }
}

export async function updatePost(id: number, updatedData: UpdatePost): Promise<Post> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        }
    );

    if (!response.ok) {
        throw new Error('Post konnte nicht aktualisiert werden.');
    }

    const updatedPost = (await response.json()) as Post;
    return updatedPost;
}