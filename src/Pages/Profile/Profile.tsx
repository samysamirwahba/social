
import axios from "axios";
import Loader from "../../Componant/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import type { UserType } from "../../Type/ProfileType";
import Post from "../../Componant/post/Post";
import type { PostType } from "../../Type/Posts.type";


  

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Profile() {
  function getMyProfile() {
    return axios.get(` https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  
const user : UserType = data?.data.data.user;
  console.log(data?.data.data.user);

 function getUserPosts() {
    return axios.get(`https://route-posts.routemisr.com/users/${user._id}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
  }
  const { data : UserPostsData , isLoading : UserIsLoading,  isError : UserIsError, error : UserError } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
    enabled : !isLoading && !isError && !!data ,
  });
  

  console.log(UserPostsData?.data.data.posts)

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

   
   if (UserIsLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (UserIsError) {
    return (
      <>
        <p>{UserError.message}</p>
      </>
    );
  }





  return (
    <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-xl bg-white shadow">
      {/* Cover */}
      <div className="h-40 bg-gray-200">
        {user.cover && (
          <img
            src={user.cover}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="px-6 pb-6">
        {/* Photo */}
        <img
          src={user.photo}
          alt={user.username}
          className="-mt-12 h-24 w-24 rounded-full border-4 border-white bg-white object-cover"
        />

        {/* Username */}
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          @{user.username}
        </h1>

        {/* Details */}
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Date of birth</dt>
            <dd className="text-gray-900">{formatDate(user.dateOfBirth)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Gender</dt>
            <dd className="text-gray-900">{user.gender}</dd>
          </div>
        </dl>
      </div>
      {UserPostsData?.data.data.posts.map((currentPost : PostType)=> <Post key={user._id}   post= {currentPost} />)}
    </div>
  );
}
