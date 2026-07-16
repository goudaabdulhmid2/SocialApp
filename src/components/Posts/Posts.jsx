import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import PostServices from "../../services/PostServices";
import { PostContext } from "../../context/PostContext";

export default function Posts({ refreshTrigger }) {
    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(false)
    

    async function getAllPosts(){
        setLoading(true)
        try{
            const data = await PostServices.getPosts()
            setPosts(data.data.posts)

            console.log(data.data.posts);
            
        }catch(err){
            console.log(err);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllPosts()
    }, [refreshTrigger])



  return (
    <section >
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded bg-white shadow-olive-200 sm:py-6 lg:py-10">
                        {isLoading ? (
                            <div className="flex min-h-48 items-center justify-center">
                                <Spinner size="lg" label="Loading posts" />
                            </div>
                        ) : posts.length ? (
                            <PostContext.Provider value={{ 
                                triggerRefresh: (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p)),
                                onPostDeleted: (id) => setPosts(prev => prev.filter(p => p.id !== id)),
                                onCommentDeleted: (commentId) => {
                                    setPosts(prev => prev.map(p => {
                                        if (p.topComment && (p.topComment._id === commentId || p.topComment.id === commentId)) {
                                            return { ...p, topComment: null, commentsCount: Math.max(0, (p.commentsCount || 1) - 1) };
                                        }
                                        return p;
                                    }));
                                }
                            }}>
                                {posts.map(post => <PostCard post={post} key={post.id}/>)}
                            </PostContext.Provider>
                        ) : (
                            <p className="py-12 text-center text-sm text-default-500">No posts found.</p>
                        )}
                </div>

    </section>
  )
}
