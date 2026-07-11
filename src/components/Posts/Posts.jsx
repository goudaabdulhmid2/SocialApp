import axios from "axios";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(false)
    

    async function getAllPosts(){
        setLoading(true)
        try{
            const {data} = await axios.request({
                method:'GET',
                url:'https://route-posts.routemisr.com/posts',
                headers:{
                    Token:localStorage.getItem("userToken")
                },
                params:{
                    limit:20,
                    sort:"-createdAt"
                }

            
            })
            setPosts(data.data.posts)

            console.log(data.data.posts);
            
        }catch(err){
            console.log(err);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        Promise.resolve().then(getAllPosts)
    }, [])



  return (
    <section >
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded bg-white shadow-olive-200 sm:py-6 lg:py-10">
                        {isLoading ? (
                            <div className="flex min-h-48 items-center justify-center">
                                <Spinner size="lg" label="Loading posts" />
                            </div>
                        ) : posts.length ? (
                            posts.map(post => <PostCard post={post} key={post.id}/>)
                        ) : (
                            <p className="py-12 text-center text-sm text-default-500">No posts found.</p>
                        )}
                </div>

    </section>
  )
}
