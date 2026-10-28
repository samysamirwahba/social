import axios from "axios";
import Loader from "../../Componant/Loader/Loader";
import Post from "../../Componant/post/Post";
import type { PostType } from "../../Type/Posts.type";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../../Componant/PostCreation/PostCreation";


export default function Home() {
  function getAllPosts() {
    return axios.get(" https://route-posts.routemisr.com/posts?sort=-createdAt", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllProduct"],
    queryFn: getAllPosts,
    
  });
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <div className="my-8">


      <div className="w-150 mx-auto">
        <PostCreation />
      </div>

      {data?.data.data.posts.map((post: PostType) => (
        <>
          <Post post={post} key={post._id} isPostDetails ={false} />
        </>
      ))}
    </div>
  );
}
