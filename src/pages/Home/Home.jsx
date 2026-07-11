import Posts from "../../components/Posts/Posts";
import CreatePost from "../../components/Posts/CreatePost";

export default function Home() {
  return (
    <div className="pt-10">
      <CreatePost></CreatePost>
      <Posts/>
    </div>

  )
}
