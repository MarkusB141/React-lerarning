import { useState, useEffect } from "react";
import { getPosts, createPost, deletePost, updatePost } from "../services/postService";
import type { Post, NewPost } from "../types/post";


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
            const data = await getPosts();

            setPosts(data);
        }catch(err){
            console.log('Fehler: ' + err);
            setError('Daten konnten nicht geladen werden.');
        }finally{
            setIsLoading(false);
        }
        
    }

    async function handleCreatePost(){
        setError(null);
        const newPost: NewPost = {
            body: 'Hello',
            title: 'Hello',
            userId: 2333
        }
        try{
            const data = await createPost(newPost);

            setPosts(previousPosts => [
                ...previousPosts,
                data
            ]);
        }catch(err){
            console.log('Fehler: ' + err);
            setError('Daten konnten nicht geladen werden.');
        }
    }

    async function handleDeletePost(id: number) {
        try {
            await deletePost(id);

            setPosts(previousPosts =>
            previousPosts.filter(post => post.id !== id)
            );
        } catch (err) {
            console.log('Fehler: ' + err);
            setError('Post konnte nicht gelöscht werden.');
        }
    }

    async function handleUpdatePost(id: number) {
        const updatedData = {
            title: 'Geänderter Titel'
        };
        setError(null);
        try {
            
            const updatedPost = await updatePost(id, updatedData);

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
            <button onClick={handleCreatePost}>Post erstellen</button>
            
            <button onClick={loadPosts} disabled={isLoading}>Neu laden</button>
            {isLoading && <p>Daten werden geladen...</p>}
            {error && <p>{error}</p>}
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <button onClick={() => handleUpdatePost(post.id)}>
                        Bearbeiten
                    </button>
                    <button onClick={() => handleDeletePost(post.id)}>
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