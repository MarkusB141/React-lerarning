import { useState, useEffect } from "react";

type Post = {
    body: string;
    id: number;
    title: string;
    userId: number;
}
type NewPost = {
    body: string;
    title: string;
    userId: number;
}

export function ApiTestPage() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts(){
        try{
            setIsLoading(true);
            setError(null);
            setPosts([]);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!response.ok){
                throw new Error('Daten konnten nicht geladen werden.');
            }
            const data: unknown = await response.json();

            if(!Array.isArray(data)){
                throw new Error('Ungültiges Datenformat.');
            }

            setPosts(data as Post[]);
        }catch(err){
            console.log('Fehler: ' + err);
            setError('Daten konnten nicht geladen werden.');
        }finally{
            setIsLoading(false);
        }
        
    }

    async function createPost(){
        const newPost: NewPost = {
            body: 'Hello',
            title: 'Hello',
            userId: 2333
        }
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
            if(!response.ok){
                throw new Error('Daten konnten nicht geladen werden.');
            }
            const data = (await response.json()) as Post;
            setPosts(previousPosts => [
                ...previousPosts,
                data
            ]);
        }catch(err){
            console.log('Fehler: ' + err);
            setError('Daten konnten nicht geladen werden.');
        }
    }
    async function deletePost(id: number) {
        try {
            const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method: 'DELETE'
            }
            );

            if (!response.ok) {
            throw new Error('Post konnte nicht gelöscht werden.');
            }

            setPosts(previousPosts =>
            previousPosts.filter(post => post.id !== id)
            );
        } catch (err) {
            console.log('Fehler: ' + err);
            setError('Post konnte nicht gelöscht werden.');
        }
    }
    async function updatePost(id: number) {
        const updatedData = {
            title: 'Geänderter Titel'
        };

        try {
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

            setPosts(previousPosts =>
            previousPosts.map(post => {
                if (post.id === id) {
                return updatedPost;
                }

                return post;
            })
            );
        } catch (err) {
            console.log('Fehler: ' + err);
            setError('Post konnte nicht aktualisiert werden.');
        }
    }

    return(
        <div>
            <button onClick={createPost}>Post erstellen</button>
            
            <button onClick={loadPosts} disabled={isLoading}>Neu laden</button>
            {isLoading && <p>Daten werden geladen...</p>}
            {error && <p>{error}</p>}
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <button onClick={() => updatePost(post.id)}>
                        Bearbeiten
                    </button>
                    <button onClick={() => deletePost(post.id)}>
                        Löschen
                    </button>
                </div>
            ))}
            {!isLoading && !error && posts.length === 0 && (
                <p>Keine Posts vorhanden.</p>
            )}
        </div>
    )
}