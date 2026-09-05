import { useState, useEffect } from "react";

type Post = {
    body: string;
    id: number;
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

    return(
        <div>
            <button onClick={loadPosts} disabled={isLoading}>Neu laden</button>
            {isLoading && <p>Daten werden geladen...</p>}
            {error && <p>{error}</p>}
            {posts.map(post => (
                <p key={post.id}>{post.title}</p>
            ))}
            {!isLoading && !error && posts.length === 0 && (
                <p>Keine Posts vorhanden.</p>
            )}
        </div>
    )
}