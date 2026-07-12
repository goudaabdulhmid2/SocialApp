import { useState } from "react";
import Posts from "../../components/Posts/Posts";
import CreatePost from "../../components/Posts/CreatePost";

export default function Home() {
  const [refreshPosts, setRefreshPosts] = useState(0);

  return (
    <div className="pt-10">
      <CreatePost onPostCreated={() => setRefreshPosts((currentValue) => currentValue + 1)} />
      <Posts refreshTrigger={refreshPosts} />
    </div>
  )
}
